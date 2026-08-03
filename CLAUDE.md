# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FloraFlow is a dashboard for monitoring and managing smart greenhouses in real time (temperature, humidity, CO₂, water level). It's a monorepo with three independent parts:

- **`client/`** — React (Vite) dashboard, deployed to Netlify/FTP
- **`server/`** — Express API backend, using Neon (Postgres) via Drizzle ORM
- **`FloraFlow v2 Board/`** — PlatformIO/Arduino firmware for the ESP32 devices that report sensor readings

`client` and `server` have independent `package.json`/`node_modules` and must be worked on from their own directory — there is no root-level package.json or workspace tooling tying them together.

See `README.md` for a feature overview, `ROADMAP.md` for planned/in-progress work (also tracked as GitHub issues on the project board), and `docs/HISTORY.md` for the pre-refactor V1 origin story (not reflective of the current codebase).

## Commands

There is no test suite in this repo (no test runner configured in either `client` or `server`).

### Client (`cd client`)
- `npm run dev` — start Vite dev server
- `npm run host` — start Vite dev server bound to `--host` (for LAN/device testing)
- `npm run build` — production build (outputs to `client/dist/`, what CI deploys)
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run dev:doppler` / `host:doppler` — same as above but pull env vars from Doppler instead of a local `.env`

### Server (`cd server`)
- `npm run dev` — run the API with `ts-node` (no watch/rebuild step)
- `npm run start` — run via `nodemon` (uses `nodemon.json`)
- `npm run build` — type-check/compile via `tsc`
- `npm run db:generate` — generate a Drizzle migration from schema changes (`drizzle-kit`, config in `drizzle.config.ts`)
- `npm run db:migrate` — apply migrations (runs `src/db/index.ts`)

There's also `.vscode/tasks.json` with "Start Server" / "Start Client" tasks, and `start_dev.ps1` at the repo root which launches both in separate PowerShell windows (Windows dev convenience script).

Both apps read config from `.env` (see `client/.env.example` and `server/.env.example` for the required variables — Clerk keys, Neon connection string, backend API URL, port).

## Architecture

### Backend (`server/src`)
- `config/express.ts` — Express app setup (JSON body parsing, CORS, mounts the router). Note: Clerk middleware (`clerkMiddleware()`) is currently commented out here and in `index.ts` — routes are not yet Clerk-protected at the middleware level, despite `@clerk/express` being used directly inside route handlers (`clerkClient.users.*`).
- `routes/index.ts` — mounts feature routers under `/api/onboarding` and `/api/greenhouses`. Add new route groups here.
- `routes/onboarding.ts` — sets/completes Clerk `publicMetadata` (`onboardingComplete`, `userSettings`) for the onboarding flow, and writes the new user row via `db/queries/users.ts`.
- `routes/greenhouses.ts` — device initialisation (`/initialise`, validates `GH-XXXXXXXXXXXX` ID format) and claiming (`/claim`, `/update-claim`, `/new-dashboard-claim`). Claiming is currently just "first request wins" by device ID — no passkey/API-key verification yet (see `ROADMAP.md#device-security` and the "Passkey-based device claim security" issue for the planned fix).
- `db/index.ts` — Drizzle client over Neon's serverless driver (HTTP + WebSocket). `db/schemas/*Schema.ts` define tables (`users`, `greenhouses`, `greenhouseReadings`); `db/queries/*.ts` hold the actual query functions route handlers call into — keep DB logic there rather than inline in routes.
- Route handlers currently return `{ success, message }`-shaped JSON rather than throwing/using a shared error-handler middleware; follow that convention unless doing the broader hardening pass described in `ROADMAP.md#security-hardening`.

### Frontend (`client/src`)
- `main.jsx` — all routing is defined here in one `createBrowserRouter` tree (react-router v7), wrapped in `ClerkProvider`. Top-level route groups: `/` (landing/login/register, under `App.jsx`'s `<Outlet />`), `/onboarding` (gated by `auth/OnboardingCheck.jsx`), `/dashboard/*` (gated by `auth/ProtectedRoute.jsx`, wrapped in `Layouts/DashboardLayout.jsx`).
- `auth/ProtectedRoute.jsx` — redirects to `/login` if not signed in.
- `auth/OnboardingCheck.jsx` — reads Clerk `user.publicMetadata.onboardingComplete`; drives users through onboarding vs. straight to `/dashboard`. Uses `hooks/useSetOnboardingRequest.jsx` to call the backend's `/api/onboarding/set-onboarding` on first load.
- `components/ui/` — shadcn/ui primitives (style: "new-york", configured in `client/components.json`); generate/update these via the shadcn CLI rather than hand-rolling, to stay consistent.
- `helpers/` — thin API-call wrappers (`claimDevice.jsx`, `completeOnboarding.jsx`, `updateDeviceClaim.jsx`, `validateDevice.jsx`) that hit the Express backend via axios; `lib/helpers/` holds pure UI helper functions.
- Path alias `@/*` → `client/src/*` (set in both `vite.config.js` and `jsconfig.json`) — use it instead of relative `../../..` imports.
- `index.css` defines the design system as CSS custom properties under `@theme inline` / `:root` / `.dark` (oklch colors), consumed by Tailwind v4's CSS-based theme config — there is no `tailwind.config.js`. When touching colors/spacing, edit the tokens here rather than hardcoding values in components.

### Firmware (`FloraFlow v2 Board/`)
PlatformIO project (`platformio.ini`) for the ESP32 device side — `src/classes/greenhouse.h/.cpp` and `src/configs/connection_config.h` handle sensor reads and backend connectivity. `src/original.cpp` is kept alongside `src/main.cpp` for reference. Not built or linted by the client/server tooling above.

## Notable in-progress state

- Device claim security is a known gap: any request with a valid-looking device ID can claim it (no ownership proof). See `ROADMAP.md#device-security`.
- Clerk auth middleware is wired into individual route handlers but not enabled at the Express middleware level yet.
- CI (`.github/workflows/deploy.yml`) deploys the client build via FTP on push to `floraflow-refactor-main` — note this is a different branch name than `main`/the branches used day-to-day; check which branch is actually wired to deploy before assuming a push will trigger it.

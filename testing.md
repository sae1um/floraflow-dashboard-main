# Testing

## Stack

[Vitest](https://vitest.dev/) in both `client/` and `server/`, each with its own config and
dependencies (same as the rest of the monorepo — no root-level tooling). The ESP32 firmware
(`FloraFlow v2 Board/`) is not covered.

- `client/` — Vitest reuses `vite.config.js` (`test` block); `environment: "node"` because
  every current test is a pure function. `test.env` injects `VITE_BACKEND_API_URL` so the
  `helpers/*` modules can be imported.
- `server/` — `vitest.config.mts`, `environment: "node"`.

## Running

```bash
cd client && npm test          # single run
cd client && npm run test:watch

cd server && npm test
cd server && npm run test:watch
```

## Layout

Test files live next to the module they cover, named `*.test.{js,jsx,ts,tsx}`.

## What's covered today

Pure functions and thin wrappers only:

| Area | Files |
|---|---|
| Chart math | `client/src/features/greenhouses/helpers/chartHelpers.test.js` |
| Greenhouse list filter/sort | `client/src/features/greenhouses/helpers/filterSortGhList.test.js` |
| Add-greenhouse form schema (zod) | `client/src/features/greenhouses/schemas/greenhouseSchema.test.js` |
| Status → badge/colour mapping | `client/src/features/greenhouses/helpers/getStatusConfig.test.js` |
| Device-claim orchestration | `client/src/features/greenhouses/helpers/validateDevice.test.js` |
| API wrappers (axios mocked) | `client/src/features/greenhouses/helpers/claimDevice.test.js`, `updateDeviceClaim.test.js`, `client/src/features/onboarding/helpers/completeOnboarding.test.js` |
| Colour-class table | `client/src/features/greenhouses/classes/DashboardDataCardClasses.test.js` |
| Misc string/path helpers | `client/src/lib/helpers/capitalise.test.ts`, `client/src/features/dashboard-shell/helpers/checkCurrentPath.test.ts` |
| Device-ID validation | `server/src/lib/deviceId.test.ts` |

## Not covered yet (natural next tranches)

- **React component tests** — add `jsdom` + `@testing-library/react` + a Clerk mock
  (`vi.mock("@clerk/clerk-react")` — only `useUser` and a few UI components are used) and a
  `MemoryRouter` wrapper.
- **API route tests** — `supertest` against the `app` exported from
  `server/src/config/express.ts`, with `server/src/db/index.ts` and `@clerk/express` mocked.
- **DB-integration tests** — real Drizzle queries against an ephemeral Postgres.

## Known-bug convention

Some tests assert the behaviour the code *should* have, not what it does today. Those are
marked `it.fails(...)` (or `it.skip`) with a `// TODO(bug): …` comment, so they show up as
"expected fail" without turning the suite red. Current ones:

- `filterAndSortGhList` reads `greenhouse.building`; records only have `location` / `room`, so
  searching the Greenhouses tab throws. (`filterSortGhList.test.js`)
- `claimDeviceOnboarding` / `updateDeviceClaim` / `completeOnboarding` dereference
  `error.response.data` unguarded — a network error throws instead of returning a result
  object (unlike `claimDevice`, which handles it).
- `greenhouseSchema` — `deviceId` min/max are both 15 but the messages say "12 characters";
  `room`'s message says "Location". Tests pin the current text.

Fixed in passing while extracting it: the old inline `idRules` in `routes/greenhouses.ts` threw
a `TypeError` (→ HTTP 500) on an ID with no `-`. The extracted `isValidDeviceId` returns
`false` (→ 400), and `stripNullBytes` now removes *all* NUL bytes, not just the first.

## CI

Dormant — the FTP hosting `deploy.yml` targets is no longer used. A ready-to-enable workflow
is parked at `.github/workflows/test.yml.disabled` (rename to `test.yml` to activate).

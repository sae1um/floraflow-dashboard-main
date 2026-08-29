# FloraFlow

<p align="center">
	<a href="https://github.com/sae1um/floraflow-dashboard-main" target="_blank"><img src="https://see.fontimg.com/api/renderfont4/m2PBm/eyJyIjoiZnMiLCJoIjozNiwidyI6MTAwMCwiZnMiOjM2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UmVwb3NpdG9yeQ/cf-gerrion-bold.png" alt="Repository"></a>
	<a href="https://floraflow.netlify.app/" target="_blank"><img src="https://see.fontimg.com/api/renderfont4/m2PBm/eyJyIjoiZnMiLCJoIjozNiwidyI6MTAwMCwiZnMiOjM2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RGVwbG95bWVudA/cf-gerrion-bold.png" alt="Deployment"></a>
</p>

<p align="center">
	<img src="./floraflow logo.png" alt="FloraFlow Logo">
</p>

FloraFlow is a dashboard for monitoring and managing smart greenhouses in real time. Each greenhouse runs sensors for temperature, humidity, CO₂, and water level, reporting into a web interface where users can track and manage their own devices.

The project was originally built for a computing showcase at UTC Sheffield Olympic Legacy Park, then rebuilt (V2) into a proper multi-user cloud application. See [docs/HISTORY.md](./docs/HISTORY.md) for the original V1 build, and [ROADMAP.md](./ROADMAP.md) for planned work.

## Features

- **Real-time monitoring** — live sensor data from every connected greenhouse
- **User accounts** — each user logs in and manages only their own greenhouses (Clerk)
- **Device claiming** — greenhouses are linked to an owner through a one-time claim process
- **Greenhouse management** — add, rename, and link devices
- **Data visualization** — interactive charts and gauges for sensor history

## Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), TailwindCSS, ShadCN UI, Recharts/ChartJS |
| Auth | Clerk |
| Backend | Express.js |
| Database | Neon (Postgres) via Drizzle ORM |
| Devices | ESP32 / microcontrollers reporting over REST |

## What is changing in V2

- MySQL → PostgreSQL (Neon) with Drizzle ORM
- Added Clerk authentication and multi-user accounts
- Added device claiming (users claim a greenhouse by unique ID)
- Added a 3-step onboarding flow: welcome → connect greenhouse → success
- General restructuring for maintainability

## Testing

Vitest, in both `client/` and `server/`. Run `npm test` in either directory. See
[testing.md](./testing.md) for what's covered and how it's organised.

## Deployment

- **Frontend:** Netlify (eventually `floraflow.godswill.dev`)
- **Backend:** Render
- **Database:** Neon Postgres

## Status

In active rebuild. Core auth, onboarding, and device claiming are done; real-time ESP32 data updates, per-greenhouse detail pages, and device online/offline tracking are in progress — see [ROADMAP.md](./ROADMAP.md) for the full list and priority order.

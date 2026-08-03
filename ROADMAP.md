# Roadmap

Working notes on architecture, planned features, and scaling considerations for FloraFlow V2.

## Current Architecture

```
ESP32 → Express API → Neon PostgreSQL → React Dashboard
Auth: Clerk   ORM: Drizzle
```

No Redis in use — not needed at current scale (see [Redis](#redis) below).

## Build Priority

1. ✅ Device claiming (basic — claim a greenhouse by unique ID)
2. Sensor data ingestion API
3. Historical charts & analytics
4. Passkey-based device claim security (see [Device Security](#device-security))
5. Alerts & greenhouse health scoring
6. Live updates (WebSockets)
7. Redis (only if needed for performance/real-time)

## API Design

Separate device and user endpoints:

```
/api/devices
    POST /heartbeat
    POST /readings

/api/users
    GET /greenhouses
    GET /greenhouses/:id
```

Sensor payload — send all values in a single request per reading, not one request per sensor:

```json
{
  "deviceId": "GH-123",
  "temperature": 24.5,
  "humidity": 65,
  "co2": 420,
  "waterLevel": 82,
  "timestamp": "..."
}
```

## Device Security

**Problem:** device IDs are predictable (MAC-derived), so a device ID alone isn't enough to prove ownership — anyone who guesses an ID could claim it.

**Plan:** add a one-time passkey issued at device setup.

1. **Init** (`POST /api/devices/initialise`) — generate a random 32-char passkey, show it once on device LCD/serial output, store it bcrypt-hashed against `deviceId`, mark unclaimed.
2. **Claim** (`POST /api/greenhouses/claim`) — require `deviceId` + `passkey` + `userId`; bcrypt-compare the passkey; reject if already claimed; on success set `ownerId`, `claimedAt`, mark passkey claimed.
3. **Hardening** — passkey is one-time use, never stored plaintext, claim endpoint is rate-limited, failed attempts are logged.

Schema addition to `greenhousesSchema`:
```sql
passkey_hash VARCHAR(255)
passkey_claimed BOOLEAN DEFAULT FALSE
passkey_claimed_at TIMESTAMP
```

Separately, ongoing device→API auth (per-request, not just at claim time) should eventually move to per-device API keys rather than trusting `deviceId` alone — see [Security Hardening](#security-hardening).

## Device Heartbeat

Not yet implemented. `POST /api/devices/heartbeat` should store `lastSeen = now()`; derive online/offline status from how stale that timestamp is.

## Database

- Add indexes on `greenhouse_id` and `timestamp` on the readings table — needed for chart/history query performance.
- **Retention:** keep raw readings for ~90 days, then delete or roll up into hourly/daily averages to avoid unbounded growth.
- **Dashboard queries:** a greenhouse page needs greenhouse details + latest reading + recent readings for charts — fetch these together, avoid redundant round-trips.

## Redis

Not needed at current scale — traffic estimate below is comfortably handled by Express + Neon directly.

**Traffic estimate (free tier):** up to 5 greenhouses/user, one reading every 30–60s. At 100 users / 500 greenhouses that's ~17 req/sec.

**Where Redis would help later, if the above changes:**
- Device online/offline tracking via key TTL instead of polling Postgres
- Caching latest readings for dashboard reads
- Pub/sub backing for WebSocket live updates
- Backing store for rate limiting across multiple server instances

**Not a fit for:** historical sensor data (stays in Postgres) or user accounts (stay in Clerk/Postgres).

## Security Hardening

Broader hardening pass, independent of the passkey claim flow above — dual auth (Clerk for users, API keys for devices), rate limiting, security headers. Can ship in phases, no breaking changes between them.

1. **Middleware foundation** — add `helmet`, `express-rate-limit`, `express-validator`, `morgan`; create `authMiddleware`, `rateLimitMiddleware`, `validationMiddleware`, `errorHandler`; wire into `src/config/express.ts`.
2. **Auth** — enable Clerk middleware on user routes (`/api/onboarding/*`, `/api/greenhouses/claim*`); add a hashed device API-key system (new `deviceKeysSchema`, `src/lib/deviceAuth.ts`) protecting `/api/devices/*`; enforce `userId === greenhouse.ownerId` on writes (403 otherwise).
3. **Rate limiting** — per-endpoint via `express-rate-limit`, keyed by IP+userId or IP+deviceId, 429 + `Retry-After` on limit:
   ```
   Onboarding:              10 req/min per user
   Greenhouse claim/update: 30 req/min per user
   Device heartbeat/readings: 60 req/min per device
   ```
4. **Input validation** — `express-validator` schemas for `deviceId` (`GH-[A-Z0-9]{12}`), `userId`, and free-text fields (`name`, `room`, `location`: max 255 chars, reject SQL keywords).
5. **Audit & errors** — structured logging (winston/pino) for auth attempts, rate-limit hits, DB/authz errors — never log secrets or full bodies; return generic error messages to clients, log details server-side.

New env vars: `DEVICE_SECRET_KEY`, `CORS_ORIGIN`.

Later: API key rotation (~90-day cycle), an admin panel for key/audit management, HSTS enforcement, moving rate limiting to Redis for multi-instance deployments.

## Other Feature Ideas

- **Dashboard customization** — configurable grid (temperature ranges, reading types, tile position); [Motion Reorder](https://motion.dev/docs/react-reorder) for drag-and-drop layout.
- **Clerk production config** — see [Clerk's production deployment guide](https://clerk.com/docs/guides/development/deployment/production) before launch.
- **Arduino/firmware** — device uptime tracking, API-key auth (ties into Device Security above), WebSocket support for push-based sensor updates.

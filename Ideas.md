## Feature Ideas

### Dashboard Customization
<!-- TODO - Implement grid customization feature (temperature ranges, reading types, positioning) -->
- Add grid customization (change temperature ranges, reading types, item positioning)
- Use [Motion Reorder](https://motion.dev/docs/react-reorder) for drag-and-drop layout

### Data Optimization
<!-- CONSIDER - Implement data averaging/aggregation for readings older than 90 days -->
- Average out older readings to reduce storage (see Notes.md for retention strategy)

### Deployment
<!-- TODO - Configure Clerk for production deployment -->
- Clerk production deployment: https://clerk.com/docs/guides/development/deployment/production

### Arduino Enhancements
<!-- CONSIDER - Future improvements for device firmware -->
- Add device uptime tracking
- Implement API key-based authentication (see Security section below)
- WebSocket support for real-time sensor updates


## Redis Notes for FloraFlow

### Current Status
Redis is **not needed right now**. PostgreSQL (Neon) is sufficient for the current scale of the project.

### Potential Future Uses

#### Device Online/Offline Tracking
<!-- CONSIDER - Evaluate if Redis optimization is needed when scaling -->
- Store the last time a device checked in.
- Faster than constantly querying Postgres.
- Can automatically mark devices as offline using key expiration (TTL).

#### Real-Time Dashboard Updates
<!-- CONSIDER - Implement caching layer for sensor readings when dashboard performance degrades -->
- Cache the latest sensor readings.
- Reduces database queries.
- Improves dashboard responsiveness.

#### WebSocket Support
<!-- CONSIDER - WebSocket implementation after core features complete (Phase 5 priority) -->
- Use Redis as a pub/sub system for live updates.
- Device sends data → Redis → Dashboard updates instantly.

#### Rate Limiting
<!-- TODO - Implement rate limiting (See Security Hardening Phase 3 in this file) -->
- Prevent API abuse.
- Limit requests per device or user.

### What NOT to Use Redis For

#### Historical Sensor Data
Store this in PostgreSQL.
- Redis is memory-based and not ideal for long-term storage.
- Sensor readings should remain in the `greenhouseReadings` table.

#### User Accounts
Keep user data in:
- Clerk
- PostgreSQL

### Current Tech Stack
- **Auth:** Clerk
- **Backend:** Express
- **Database:** Neon PostgreSQL
- **ORM:** Drizzle
- **No Redis needed yet**

### Build Priority
<!-- CONSIDER - Review and update priorities as features are completed -->
1. Device claiming system (with passkey authentication - see Notes.md)
2. Sensor data ingestion API
3. Historical charts and analytics
4. Alerts and greenhouse health scoring
5. WebSocket live updates
6. Redis (only if needed for performance or real-time features)

---

## Security Hardening Plan (Future Implementation)

### Overview
<!-- TODO - Implement security hardening in phases (see Phase 1-5 details below). Start when core features are stable. -->

Implement **dual authentication** (Clerk for users + API keys for IoT devices), **granular rate limiting**, and **security headers** in 5 independent phases. No breaking changes per phase; can be deployed incrementally.

### Phase 1: Foundation & Middleware
<!-- TODO - Install security packages and create middleware framework -->
**Install packages:** `helmet`, `express-rate-limit`, `express-validator`, `cors`, `morgan`

**Create middleware:**
- `src/middleware/authMiddleware.ts` — Clerk + device API key validation
- `src/middleware/rateLimitMiddleware.ts` — Per-endpoint rate limiting
- `src/middleware/validationMiddleware.ts` — Input sanitization
- `src/middleware/errorHandler.ts` — Unified error responses (generic messages)

**Update `src/config/express.ts`:**
- Apply helmet (security headers: CORS, CSP, X-Frame-Options, HSTS)
- Apply CORS middleware (configurable origin)
- Add request logging (morgan)
- Register error handler

### Phase 2: Authentication Implementation
<!-- TODO - Enable Clerk middleware and implement device API key system -->

**2a. Enable Clerk for Users**
- Uncomment Clerk middleware in `src/index.ts`
- Use `getAuth(req)` to extract Clerk user ID in routes
- Mark endpoints as Clerk-protected: `/api/onboarding/*`, `/api/greenhouses/claim*`

**2b. Device API Key System**
- Create schema: `src/db/schemas/deviceKeysSchema.ts` with fields: `id`, `deviceId` (FK), `apiKey` (hashed), `createdAt`, `rotatedAt`
- Create helper: `src/lib/deviceAuth.ts` to hash/verify API keys (use bcrypt)
- Protect device endpoints: `POST /api/devices/heartbeat`, `POST /api/devices/readings`
- Create admin endpoint: `POST /api/admin/devices/generate-key` (Clerk-protected) to issue device keys

**2c. Authorization Checks**
- User operations: Verify `userId === greenhouse.ownerId` before allowing claim/update
- Device operations: Validate API key matches device
- Return 403 Forbidden if authorization fails

### Phase 3: Rate Limiting (Per-Endpoint Strategy)
<!-- TODO - Implement per-endpoint rate limiting with express-rate-limit -->

**Recommended Limits:**
```
Onboarding routes:           10 requests / 1 minute per user
Greenhouse claim/update:     30 requests / 1 minute per user
Device heartbeat/readings:   60 requests / 1 minute per device
Auth attempts (future):      5 requests / 15 minutes per IP
```

**Implementation:**
- Use `express-rate-limit` with in-memory store (sufficient for single server)
- Key by: IP + userId (if authenticated) or IP + deviceId
- Return 429 Too Many Requests with `Retry-After` header
- Log rate limit hits for monitoring

**For multi-server deployments:** Consider Redis-backed rate limiting later

### Phase 4: Input Validation & Sanitization
<!-- TODO - Create validation schemas and apply to all routes -->

**Validation schemas using `express-validator`:**
- `deviceId`: Format check (pattern: `GH-[A-Z0-9]{12}`), trim whitespace, reject null bytes
- `userId`: Non-empty, matches Clerk ID format (optional: callback to Clerk API)
- `name`, `room`, `location`: Max 255 chars, alphanumeric + spaces/hyphens, reject SQL keywords
- Request body: Type coercion, required fields check

**Apply to all routes** before handler execution (middleware chain)

### Phase 5: Audit & Error Handling
<!-- TODO - Add structured logging and unified error responses -->

**Structured Logging:**
- Add logger: `winston` or `pino`
- Log events: Authentication attempts (pass/fail), rate limit hits, DB errors, authorization failures
- **NEVER log:** Passwords, API keys, full request/response bodies, Clerk tokens
- Store logs server-side (consider external service for production: DataDog, Sentry, etc.)

**Error Responses:**
- Return generic messages to clients: `"Operation failed"`, `"Unauthorized"`
- Log full error details server-side for debugging
- Return appropriate HTTP status: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error)

### Environment Variables (New)
```env
DEVICE_SECRET_KEY=<random-32-character-string>  # For hashing device API keys
NODE_ENV=development|production
CORS_ORIGIN=http://localhost:5173,https://yourdomain.com
```

### Files to Modify
- `server/src/config/express.ts` — Register middleware
- `server/src/index.ts` — Uncomment Clerk setup
- `server/src/routes/onboarding.ts` — Add Clerk auth + validation + rate limit
- `server/src/routes/greenhouses.ts` — Add authorization checks + device auth + validation
- `server/package.json` — Add dependencies
- `.env.example` (create) — Document env vars

### New Files to Create
- `src/middleware/authMiddleware.ts`
- `src/middleware/rateLimitMiddleware.ts`
- `src/middleware/validationMiddleware.ts`
- `src/middleware/errorHandler.ts`
- `src/db/schemas/deviceKeysSchema.ts`
- `src/db/queries/deviceKeys.ts`
- `src/lib/deviceAuth.ts`
- `src/lib/schemas/validationSchemas.ts`

### Verification Checklist
- ✓ Endpoints require Clerk token (user) or API key (device); missing auth returns 401
- ✓ Authorization: User A cannot claim/modify User B's greenhouse (returns 403)
- ✓ Rate limiting: Nth request within window returns 429 with `Retry-After` header
- ✓ Input validation: Invalid formats, missing fields, oversized strings rejected with 400
- ✓ Error responses are generic; full details logged server-side

### Future Considerations
<!-- CONSIDER - These enhancements after core security is in place -->
1. **API Key Rotation** — Implement automatic rotation (recommend 90-day cycle with grace period)
2. **Admin Panel** — Create dashboard to revoke keys, view audit logs, manage devices
3. **HTTPS Only** — Enforce in production via helmet's HSTS header
4. **Multi-Instance Scaling** — When needed, migrate rate limiting to Redis
5. **Device Telemetry** — Track device health (failed requests, uptime, last successful update)
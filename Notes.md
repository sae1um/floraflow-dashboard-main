## FloraFlow - Handling Device Traffic
<!-- CONSIDER - Review traffic projections and scalability as user base grows -->

### Expected Traffic
Free tier:
- Up to 5 greenhouses per user
- 1 reading every 30–60 seconds

Even with:
- 100 users
- 500 greenhouses

Traffic would only be around:
- ~17 requests/sec

This is easily handled by Express + Neon.

---

### API Structure
<!-- CONSIDER - Separate endpoints design may need refinement once device authentication (passkeys) is implemented -->

Separate device and user endpoints:

```txt
/api/devices
    POST /heartbeat
    POST /readings

/api/users
    GET /greenhouses
    GET /greenhouses/:id
````

---

### Sensor Data
<!-- CONSIDER - Optimize sensor data format once rate limiting is implemented -->

Send all sensor values in a single request:

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

Avoid multiple requests per sensor.

---

### Device Heartbeat Status
<!-- TODO - Implement device heartbeat endpoint and tracking -->

Use a heartbeat endpoint to track device availability:

```
POST /api/devices/heartbeat
```

Store `lastSeen = current time` and determine online/offline status from this timestamp.

---

### Secure Device Claiming
<!-- TODO - Implement passkey-based device claiming system -->

**Problem:** Device ID (MAC address) is predictable/guessable. Users could claim devices they don't own by guessing IDs.

**Solution:** Add randomly generated passkey authentication.

**Flow:**
1. **Device Initialization** (`POST /api/devices/initialise`)
   - Generate random 32-character alphanumeric passkey (e.g., `A7K9M2X5Q8Z1B3C6D7E9F0G2H4J5K`)
   - Display passkey on device LCD screen (only once) or log to serial output
   - Store passkey (hashed with bcrypt) in database, linked to `deviceId`
   - Mark passkey as unclaimed

2. **Device Claiming** (`POST /api/greenhouses/claim`)
   - Require: `deviceId` + `passkey` + `userId`
   - Verify passkey matches (bcrypt compare) the stored hash for that device
   - Validate device hasn't been claimed already (check `ownerId`)
   - Mark passkey as claimed (set claimed flag, timestamp)
   - Update greenhouse: set `ownerId`, store `claimedAt`

3. **Security Measures**
   - Passkey is one-time use (marked as claimed after successful claim)
   - Only shown/accessible during initial setup on device
   - Hashed in database (never stored plaintext)
   - Rate-limited on claim endpoint to prevent brute force
   - Invalid passkey attempts logged for monitoring

**Database Change:**
Add to `greenhousesSchema`:
```sql
passkey_hash VARCHAR(255)        -- bcrypt hash of 32-char passkey
passkey_claimed BOOLEAN DEFAULT FALSE
passkey_claimed_at TIMESTAMP
```

**Arduino Change:**
```cpp
// On initialization:
String passkey = generateRandomPasskey();  // 32 chars
Serial.println("Passkey: " + passkey);     // Display to user
lcd.print("Key: " + passkey.substring(0, 8) + "...");
POST /api/devices/initialise { deviceId, passkey }
```

---

### Database
<!-- TODO - Add database indexes on greenhouse_id and timestamp -->

Add database indexes on `greenhouse_id` and `timestamp` to keep chart and history queries fast.

---

### Dashboard Queries
<!-- CONSIDER - Optimize query strategy for dashboard performance as data grows -->

When loading a greenhouse page, fetch:
- Greenhouse details
- Latest reading
- Recent readings for charts

Avoid unnecessary duplicate queries.

---

### Data Retention
<!-- TODO - Implement data retention policy and archival strategy -->

Store raw sensor readings for ~90 days. After 90 days, either delete old data or convert to hourly/daily averages to prevent database bloat.

---

### Current Architecture

```txt
ESP32
   ↓
Express API
   ↓
Neon PostgreSQL
   ↓
React Dashboard

Auth: Clerk
ORM: Drizzle
```

No Redis required yet. See Ideas.md for future scaling considerations.

---

### Build Priority

1. ✅ Device claiming system (with passkey authentication - see Secure Device Claiming section)
2. **TODO:** Build sensor data ingestion API
3. **TODO:** Implement historical charts & analytics
4. **CONSIDER:** Add alerts & greenhouse health scoring
5. **CONSIDER:** Implement live updates (WebSockets)
6. **CONSIDER:** Add Redis (if needed for scaling)



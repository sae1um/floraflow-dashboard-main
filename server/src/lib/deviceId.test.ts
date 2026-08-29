import { describe, expect, it } from "vitest";

import { isValidDeviceId, stripNullBytes } from "./deviceId";

describe("stripNullBytes", () => {
    it("removes every embedded NUL byte, not just the first", () => {
        expect(stripNullBytes("GH-ECFABCD511CD\x00")).toBe("GH-ECFABCD511CD");
        expect(stripNullBytes("\x00GH-\x00ECFABCD511CD\x00")).toBe("GH-ECFABCD511CD");
    });

    it("leaves a clean string untouched", () => {
        expect(stripNullBytes("GH-ECFABCD511CD")).toBe("GH-ECFABCD511CD");
    });
});

describe("isValidDeviceId", () => {
    it("accepts a GH- prefix followed by exactly 12 characters", () => {
        expect(isValidDeviceId("GH-ECFABCD511CD")).toBe(true);
        expect(isValidDeviceId("GH-000000000000")).toBe(true);
    });

    it("rejects a wrong prefix", () => {
        expect(isValidDeviceId("XX-ECFABCD511CD")).toBe(false);
        expect(isValidDeviceId("gh-ECFABCD511CD")).toBe(false);
    });

    it("rejects a body that is not exactly 12 characters", () => {
        expect(isValidDeviceId("GH-SHORT")).toBe(false);
        expect(isValidDeviceId("GH-ECFABCD511CDEXTRA")).toBe(false);
    });

    it("rejects an ID with no hyphen instead of throwing", () => {
        // The former inline `idRules` read `split('-')[1].length` and threw a
        // TypeError here (surfacing as a 500). The extracted helper returns false.
        expect(isValidDeviceId("GHECFABCD511CD")).toBe(false);
        expect(isValidDeviceId("")).toBe(false);
    });
});

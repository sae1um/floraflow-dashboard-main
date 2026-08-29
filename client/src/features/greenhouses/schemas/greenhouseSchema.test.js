import { describe, expect, it } from "vitest";

import { greenhouseSchema } from "./greenhouseSchema";

const valid = {
    name: "Orchids",
    location: "North Wing",
    room: "Living Room",
    deviceId: "GH-ECFABCD511CD", // exactly 15 chars, matches ^GH-[A-Z0-9]+$
};

describe("greenhouseSchema", () => {
    it("accepts a well-formed greenhouse", () => {
        expect(greenhouseSchema.safeParse(valid).success).toBe(true);
    });

    it("treats location as optional", () => {
        const withoutLocation = {
            name: valid.name,
            room: valid.room,
            deviceId: valid.deviceId,
        };
        expect(greenhouseSchema.safeParse(withoutLocation).success).toBe(true);
    });

    it("rejects a name shorter than 2 characters", () => {
        const result = greenhouseSchema.safeParse({ ...valid, name: "A" });
        expect(result.success).toBe(false);
        expect(result.error.issues.some((i) => i.path[0] === "name")).toBe(true);
    });

    it("rejects a room shorter than 2 characters", () => {
        const result = greenhouseSchema.safeParse({ ...valid, room: "" });
        expect(result.success).toBe(false);
        expect(result.error.issues.some((i) => i.path[0] === "room")).toBe(true);
    });

    it("rejects a deviceId that is not exactly 15 characters", () => {
        expect(greenhouseSchema.safeParse({ ...valid, deviceId: "GH-SHORT" }).success).toBe(false);
        expect(
            greenhouseSchema.safeParse({ ...valid, deviceId: "GH-WAYTOOLONGVALUE" }).success,
        ).toBe(false);
    });

    it("rejects a deviceId that does not match the GH- prefix / charset", () => {
        // 15 chars but lower-case + wrong prefix
        const result = greenhouseSchema.safeParse({ ...valid, deviceId: "Xy-ecfabcd511cd" });
        expect(result.success).toBe(false);
        expect(result.error.issues.some((i) => i.path[0] === "deviceId")).toBe(true);
    });
});

import { describe, expect, it } from "vitest";

import { getStatusConfig } from "./getStatusConfig";

describe("getStatusConfig", () => {
    it.each([
        ["healthy", "✅ Healthy"],
        ["attention", "⚠️ Needs Attention"],
        ["critical", "🚨 Critical"],
    ])("maps %s to its badge", (status, badge) => {
        expect(getStatusConfig(status).badge).toBe(badge);
    });

    it("returns a colour class string for every known status", () => {
        for (const status of ["healthy", "attention", "critical"]) {
            expect(typeof getStatusConfig(status).color).toBe("string");
            expect(getStatusConfig(status).color.length).toBeGreaterThan(0);
        }
    });

    it.each([undefined, null, "", "offline", "unknown"])(
        "falls back to the Unknown config for %s",
        (status) => {
            expect(getStatusConfig(status)).toEqual({
                badge: "⚪ Unknown",
                color: "bg-muted text-muted-foreground border-border",
            });
        },
    );
});

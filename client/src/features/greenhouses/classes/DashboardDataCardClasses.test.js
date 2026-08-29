import { describe, expect, it } from "vitest";

import { colourClasses } from "./DashboardDataCardClasses";

// StatisticCard and MetricAreaChart index colourClasses[color] with no guard,
// so an unexpected key or a malformed entry crashes those components. Pin the
// shape here.
describe("colourClasses", () => {
    const expectedKeys = ["orange", "blue", "green", "teal"];

    it("exposes exactly the supported colour keys", () => {
        expect(Object.keys(colourClasses).sort()).toEqual([...expectedKeys].sort());
    });

    it.each(expectedKeys)("entry %s has border/iconBg/icon and a valid hex", (key) => {
        const entry = colourClasses[key];
        expect(entry).toMatchObject({
            border: expect.any(String),
            iconBg: expect.any(String),
            icon: expect.any(String),
        });
        expect(entry.hex).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
});

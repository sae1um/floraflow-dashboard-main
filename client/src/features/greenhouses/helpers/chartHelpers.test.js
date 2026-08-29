import { describe, expect, it } from "vitest";

import { computeTrend, getYDomain } from "./chartHelpers";

describe("computeTrend", () => {
    it("returns 0 for missing or too-short series", () => {
        expect(computeTrend(undefined, "temp")).toBe(0);
        expect(computeTrend([], "temp")).toBe(0);
        expect(computeTrend([{ temp: 10 }], "temp")).toBe(0);
    });

    it("returns 0 when the previous value is falsy (avoids divide-by-zero)", () => {
        expect(computeTrend([{ temp: 0 }, { temp: 5 }], "temp")).toBe(0);
    });

    it("computes the percentage change between the last two points, rounded to 1 dp", () => {
        // (110 - 100) / 100 * 100 = 10
        expect(computeTrend([{ temp: 100 }, { temp: 110 }], "temp")).toBe(10);
        // (99 - 100) / 100 * 100 = -1
        expect(computeTrend([{ temp: 100 }, { temp: 99 }], "temp")).toBe(-1);
        // only the final pair matters
        expect(
            computeTrend([{ temp: 1 }, { temp: 100 }, { temp: 105 }], "temp"),
        ).toBe(5);
    });

    it("handles a negative previous value", () => {
        // (-5 - -10) / -10 * 100 = -50
        expect(computeTrend([{ temp: -10 }, { temp: -5 }], "temp")).toBe(-50);
    });
});

describe("getYDomain", () => {
    it("returns [0, 1] when there are no numeric values", () => {
        expect(getYDomain([], "temp")).toEqual([0, 1]);
        expect(getYDomain([{ temp: "n/a" }, { temp: null }], "temp")).toEqual([0, 1]);
    });

    it("ignores non-numeric entries", () => {
        expect(getYDomain([{ temp: 10 }, { temp: "x" }, { temp: 20 }], "temp")).toEqual([
            Math.floor(10 - (20 - 10) * 0.15),
            Math.ceil(20 + (20 - 10) * 0.15),
        ]);
    });

    it("pads the [min, max] range by the padding ratio and rounds outward", () => {
        // range 10, pad 1.5 -> [floor(18.5), ceil(31.5)] = [18, 32]
        expect(getYDomain([{ v: 20 }, { v: 30 }], "v")).toEqual([18, 32]);
    });

    it("falls back to a synthetic range when all values are equal", () => {
        // range 0 -> |max| * 0.1 = 5, pad 0.75 -> [floor(49.25), ceil(50.75)]
        expect(getYDomain([{ v: 50 }, { v: 50 }], "v")).toEqual([49, 51]);
    });

    it("respects a custom padding ratio", () => {
        expect(getYDomain([{ v: 0 }, { v: 100 }], "v", 0)).toEqual([0, 100]);
    });
});

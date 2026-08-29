import { describe, expect, it } from "vitest";

import capitalise from "./capitalise";

describe("capitalise", () => {
    it("returns an empty string for falsy input", () => {
        expect(capitalise("")).toBe("");
        // @ts-expect-error - exercising the runtime guard
        expect(capitalise(undefined)).toBe("");
        // @ts-expect-error - exercising the runtime guard
        expect(capitalise(null)).toBe("");
    });

    it("upper-cases only the first character", () => {
        expect(capitalise("orchid")).toBe("Orchid");
        expect(capitalise("greenhouse a")).toBe("Greenhouse a");
    });

    it("leaves an already-capitalised string unchanged", () => {
        expect(capitalise("Orchid")).toBe("Orchid");
    });

    it("handles a single character", () => {
        expect(capitalise("a")).toBe("A");
    });
});

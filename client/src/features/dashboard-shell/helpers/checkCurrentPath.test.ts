import { describe, expect, it } from "vitest";

import checkCurrentPath from "./checkCurrentPath";

// Sidebar calls this as checkCurrentPath(pathname.split("/"), item.url.split("/")[2]),
// so `pathList` is really an array of path segments and `pathItem` can be undefined.
describe("checkCurrentPath", () => {
    it("returns true when the segment is present in the path", () => {
        expect(checkCurrentPath(["", "dashboard", "greenhouses"], "greenhouses")).toBe(true);
    });

    it("returns false when the segment is absent", () => {
        expect(checkCurrentPath(["", "dashboard", "greenhouses"], "settings")).toBe(false);
    });

    it("returns false when the segment is undefined (the /dashboard index case)", () => {
        expect(checkCurrentPath(["", "dashboard"], undefined as unknown as string)).toBe(false);
    });
});

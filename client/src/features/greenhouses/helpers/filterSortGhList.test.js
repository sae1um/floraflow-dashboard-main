import { describe, expect, it } from "vitest";

import filterAndSortGhList from "./filterSortGhList";

// Minimal records shaped like features/greenhouses/testData/greenhouses.js
const rows = [
    { name: "Greenhouse B", location: "East Wing", room: "Nursery", status: "attention" },
    { name: "greenhouse a", location: "North Wing", room: "Main Area", status: "healthy" },
    { name: "Greenhouse C", location: "South Wing", room: "Herb Garden", status: "healthy" },
];

describe("filterAndSortGhList", () => {
    // Note: an empty search query short-circuits the buggy `.building` access
    // (name.includes("") is always true), so these cases exercise filter + sort
    // without tripping the bug documented below.

    it("keeps every row when status is 'all'", () => {
        expect(filterAndSortGhList(rows, "all", "", "name", "asc")).toHaveLength(3);
    });

    it("filters by an exact status", () => {
        const healthy = filterAndSortGhList(rows, "healthy", "", "name", "asc");
        expect(healthy.map((r) => r.status)).toEqual(["healthy", "healthy"]);
    });

    it("sorts by name ascending, case-insensitively", () => {
        const asc = filterAndSortGhList(rows, "all", "", "name", "asc").map((r) => r.name);
        expect(asc).toEqual(["greenhouse a", "Greenhouse B", "Greenhouse C"]);
    });

    it("sorts by name descending, case-insensitively", () => {
        const desc = filterAndSortGhList(rows, "all", "", "name", "desc").map((r) => r.name);
        expect(desc).toEqual(["Greenhouse C", "Greenhouse B", "greenhouse a"]);
    });

    // TODO(bug): the filter callback reads `greenhouse.building`, but greenhouse
    // records only have `location` and `room`. As soon as a search query fails
    // to match a row's name or location, `building.toLowerCase()` throws a
    // TypeError -- so searching the Greenhouses tab crashes it. This asserts the
    // intended behaviour (a query should also match `room`) and is expected to
    // fail until `building` is corrected to `room`.
    it.fails("matches the search query against name, location, or room", () => {
        const result = filterAndSortGhList(rows, "all", "herb garden", "name", "asc");
        expect(result).toHaveLength(1);
        expect(result[0].room).toBe("Herb Garden");
    });
});

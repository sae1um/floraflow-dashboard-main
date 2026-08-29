import { afterEach, describe, expect, it, vi } from "vitest";

import axios from "axios";

import { updateDeviceClaim } from "./updateDeviceClaim";

vi.mock("axios", () => ({
    default: { post: vi.fn() },
}));

const BASE = "http://test.local/api";

afterEach(() => {
    vi.mocked(axios.post).mockReset();
});

describe("updateDeviceClaim", () => {
    it("posts deviceId/location/room and returns response.data", async () => {
        vi.mocked(axios.post).mockResolvedValue({ data: { success: true } });

        const result = await updateDeviceClaim("GH-ECFABCD511CD", "North Wing", "Nursery");

        expect(result).toEqual({ success: true });
        expect(axios.post).toHaveBeenCalledWith(
            `${BASE}/greenhouses/update-claim`,
            { deviceId: "GH-ECFABCD511CD", location: "North Wing", room: "Nursery" },
            { headers: { "Content-Type": "application/json" } },
        );
    });

    it("returns the server error body when a response is present", async () => {
        vi.mocked(axios.post).mockRejectedValue({
            response: { data: { success: false, message: "nope" } },
        });

        await expect(updateDeviceClaim("GH-X", "l", "r")).resolves.toEqual({
            success: false,
            message: "nope",
        });
    });

    // TODO(bug): `error.response.data` is unguarded, so a network failure throws
    // a TypeError instead of returning a result object.
    it.fails("returns a result object on a network error (no response)", async () => {
        vi.mocked(axios.post).mockRejectedValue(new Error("Network Error"));
        await expect(updateDeviceClaim("GH-X", "l", "r")).resolves.toMatchObject({
            success: false,
        });
    });
});

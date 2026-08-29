import { afterEach, describe, expect, it, vi } from "vitest";

import axios from "axios";

import { claimDevice, claimDeviceOnboarding } from "./claimDevice";

vi.mock("axios", () => ({
    default: { post: vi.fn() },
}));

const BASE = "http://test.local/api"; // vite.config.js -> test.env.VITE_BACKEND_API_URL

afterEach(() => {
    vi.mocked(axios.post).mockReset();
});

describe("claimDeviceOnboarding", () => {
    it("posts the device/username/userId and returns response.data", async () => {
        vi.mocked(axios.post).mockResolvedValue({ data: { success: true, message: "ok" } });

        const result = await claimDeviceOnboarding("GH-ECFABCD511CD", "alice", "user_1");

        expect(result).toEqual({ success: true, message: "ok" });
        expect(axios.post).toHaveBeenCalledWith(
            `${BASE}/greenhouses/onboarding-claim`,
            { deviceId: "GH-ECFABCD511CD", username: "alice", userId: "user_1" },
            { headers: { "Content-Type": "application/json" } },
        );
    });

    it("returns the server error body when the request fails with a response", async () => {
        vi.mocked(axios.post).mockRejectedValue({
            response: { data: { success: false, message: "already claimed" } },
        });

        await expect(claimDeviceOnboarding("GH-X", "a", "u")).resolves.toEqual({
            success: false,
            message: "already claimed",
        });
    });

    // TODO(bug): unlike claimDevice, this handler does `error.response.data` with
    // no guard, so a network failure (no `response`) throws a TypeError instead
    // of returning a result object.
    it.fails("returns a friendly object on a network error (no response)", async () => {
        vi.mocked(axios.post).mockRejectedValue(new Error("Network Error"));
        await expect(claimDeviceOnboarding("GH-X", "a", "u")).resolves.toMatchObject({
            success: false,
        });
    });
});

describe("claimDevice", () => {
    it("posts the flattened greenhouse details and returns response.data", async () => {
        vi.mocked(axios.post).mockResolvedValue({ data: { success: true, message: "claimed" } });

        const result = await claimDevice(
            { deviceId: "GH-ECFABCD511CD", name: "Orchids", location: "N", room: "R" },
            "user_1",
        );

        expect(result).toEqual({ success: true, message: "claimed" });
        expect(axios.post).toHaveBeenCalledWith(
            `${BASE}/greenhouses/new-dashboard-claim`,
            {
                deviceId: "GH-ECFABCD511CD",
                name: "Orchids",
                location: "N",
                room: "R",
                userId: "user_1",
            },
            { headers: { "Content-Type": "application/json" } },
        );
    });

    it("returns a friendly message on a network error (no response)", async () => {
        vi.mocked(axios.post).mockRejectedValue(new Error("Network Error"));

        await expect(claimDevice({}, "user_1")).resolves.toEqual({
            success: false,
            message: "Network error. Please try again later.",
        });
    });

    it("returns the server error body when a response is present", async () => {
        vi.mocked(axios.post).mockRejectedValue({
            response: { data: { success: false, message: "bad request" } },
        });

        await expect(claimDevice({}, "user_1")).resolves.toEqual({
            success: false,
            message: "bad request",
        });
    });
});

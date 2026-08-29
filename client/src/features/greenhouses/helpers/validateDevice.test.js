import { beforeEach, describe, expect, it, vi } from "vitest";

import { claimDevice } from "./claimDevice";
import { validateDevice } from "./validateDevice";

vi.mock("./claimDevice", () => ({
    claimDevice: vi.fn(),
}));

const details = { deviceId: "GH-ECFABCD511CD", name: "Orchids", location: "N", room: "R" };

describe("validateDevice", () => {
    beforeEach(() => {
        vi.mocked(claimDevice).mockReset();
    });

    it("passes through a successful claim", async () => {
        vi.mocked(claimDevice).mockResolvedValue({ success: true, message: "Device claimed" });
        await expect(validateDevice(details, "user_1")).resolves.toEqual({
            success: true,
            message: "Device claimed",
        });
        expect(claimDevice).toHaveBeenCalledWith(details, "user_1");
    });

    it("returns a failure with the upstream message when the claim fails", async () => {
        vi.mocked(claimDevice).mockResolvedValue({ success: false, message: "Already claimed" });
        await expect(validateDevice(details, "user_1")).resolves.toEqual({
            success: false,
            message: "Already claimed",
        });
    });

    it("returns a generic failure when the claim result has no message", async () => {
        vi.mocked(claimDevice).mockResolvedValue({ success: false });
        await expect(validateDevice(details, "user_1")).resolves.toEqual({
            success: false,
            message: "Unknown error",
        });
    });

    it("returns a generic failure when the claim result is null", async () => {
        vi.mocked(claimDevice).mockResolvedValue(null);
        await expect(validateDevice(details, "user_1")).resolves.toEqual({
            success: false,
            message: "Unknown error",
        });
    });
});

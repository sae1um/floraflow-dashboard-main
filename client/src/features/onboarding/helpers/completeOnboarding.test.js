import { afterEach, describe, expect, it, vi } from "vitest";

import axios from "axios";

import { completeOnboarding } from "./completeOnboarding";

vi.mock("axios", () => ({
    default: { post: vi.fn() },
}));

const BASE = "http://test.local/api";

afterEach(() => {
    vi.mocked(axios.post).mockReset();
});

describe("completeOnboarding", () => {
    it("posts userId/namePreference/userName and returns response.data", async () => {
        vi.mocked(axios.post).mockResolvedValue({ data: { success: true } });

        const result = await completeOnboarding("user_1", "fullname", "Alice Smith");

        expect(result).toEqual({ success: true });
        expect(axios.post).toHaveBeenCalledWith(
            `${BASE}/onboarding/complete-onboarding`,
            { userId: "user_1", namePreference: "fullname", userName: "Alice Smith" },
            expect.anything(),
        );
    });

    it("returns the server error body when a response is present", async () => {
        vi.mocked(axios.post).mockRejectedValue({
            response: { data: { error: "clerk exploded" } },
        });

        await expect(completeOnboarding("user_1", "fullname", "Alice")).resolves.toEqual({
            error: "clerk exploded",
        });
    });

    // TODO(bug): `err.response.data` is unguarded, so a network failure throws a
    // TypeError instead of returning a result object.
    it.fails("returns a result object on a network error (no response)", async () => {
        vi.mocked(axios.post).mockRejectedValue(new Error("Network Error"));
        await expect(
            completeOnboarding("user_1", "fullname", "Alice"),
        ).resolves.toBeDefined();
    });
});

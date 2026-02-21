import { claimDevice } from "./claimDevice";

export const validateDevice = async (greenhouseDetails, userId) => {
    // object with success and message e.g. { success: true, message: "Device claimed successfully" }
    const result = await claimDevice(greenhouseDetails, userId);
    if (!result || !result.success) {
        return { success: false, message: result?.message || "Unknown error" };
    }
    return { success: true, message: result.message };
};

import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_API_URL;

export const claimDevice = async (deviceId, username, userId) => {
    // Make API call to claim the device

    const response = await claimDeviceBackend(deviceId, username, userId);
    return response;
};

async function claimDeviceBackend(deviceId, username, id) {
    
    try {
        await axios.post(
            URL + "/greenhouses/claim",
            {
                deviceId: deviceId,
                username: username,
                userId: id,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        // console.error(error.response.data)
        return error.response.data;
    }
}

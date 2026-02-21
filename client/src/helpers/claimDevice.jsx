import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_API_URL;

export const claimDeviceOnboarding = async (deviceId, username, userId) => {
    try {
        const response = await axios.post(
            URL + "/greenhouses/onboarding-claim",
            {
                deviceId,
                username,
                userId,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const claimDevice = async (
    greenhouseDetails,
    userId,
) => {
    const {deviceId, name, location, room} = greenhouseDetails;
    try {
        const response = await axios.post(
            URL + "/greenhouses/new-dashboard-claim",
            {
                deviceId,
                name,
                location,
                room,
                userId,
                
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

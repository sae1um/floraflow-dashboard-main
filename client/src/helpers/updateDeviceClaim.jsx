import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_API_URL;

export const updateDeviceClaim = async (deviceId, location, room) => {
    try {
        const response = await axios.post(
            URL + "/greenhouses/update-claim",
            {
                deviceId,
                location,
                room
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        // console.error(error)
        return error.response.data;
    }
}
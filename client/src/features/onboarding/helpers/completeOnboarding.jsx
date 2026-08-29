import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_API_URL;

export const completeOnboarding = async (userId, namePreference, userName) => {
    console.log(userName);
    try {
        const response = await axios.post(
            URL + "/onboarding/complete-onboarding",
            {
                userId,
                namePreference,
                userName
            },
            { headers: "application/json" },
        );
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

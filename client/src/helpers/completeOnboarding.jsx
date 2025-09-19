import axios from "axios"

const URL = import.meta.env.VITE_BACKEND_API_URL;

export const completeOnboarding = async (userId, namePreference) => {
    if(!namePreference.trim()){
        namePreference = "firstname"
    }
    try{
        const response = await axios.post(URL + "/onboarding/complete-onboarding", {
            userId, namePreference
        },{headers: "application/json"});
        console.log(response);
        return response.data
    }catch(err){
        return err.response.data;
    }
} 
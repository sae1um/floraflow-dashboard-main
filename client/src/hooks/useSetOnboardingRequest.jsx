import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function useSetOnboardingRequest(){
    const { user, isLoaded } = useUser();
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const [result, setResult] = useState();
    const [metadataSet, setMetadataSet] = useState(false); //has new metadata been set?
    const [error, setError] = useState();
    const API_URL = import.meta.env.VITE_BACKEND_API_URL;

    // REFACTOR request with axios
    useEffect(() => {
        const setOnboardingRequest = async () => {
            try {
                setIsRequestLoading(true);
                const response = await fetch(
                    `${API_URL}/onboarding/set-onboarding`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userid: user.id }),
                    }
                );
                const data = await response.json();
                if(data.reponse == "Onboarding set succesfully"){
                    setResult(data);
                    setMetadataSet(true);
                }else{
                    setError(data.error);
                }
            } catch (err) {
                console.error(err);
                setError("There has been an error during onboarding, please try again later.");
            } finally {
                setIsRequestLoading(false);
            }
        };

        // Setting metadata to false 
        // When the user has no "onboardingComplete" metadata
        if (
            isLoaded &&
            user &&
            user.publicMetadata.onboardingComplete === undefined &&
            !metadataSet
        ) {
            setOnboardingRequest()
            //If theres no result then continue 
        }else if(isLoaded && (user.publicMetadata.onboardingComplete || !user.publicMetadata.onboardingComplete)){
            setMetadataSet(true)
        }
    }, [user, isLoaded]);

    
    return {result, error, metadataSet, isRequestLoading}
}
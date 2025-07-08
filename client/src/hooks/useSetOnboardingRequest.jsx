import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function useSetOnboardingRequest(){
    const { user, isLoaded } = useUser();
    const [result, setResult] = useState();
    const [metadataSet, setMetadataSet] = useState(false); //has new metadata been set?
    const [error, setError] = useState();
    const API_URL = import.meta.env.VITE_BACKEND_API_URL;

    useEffect(() => {
        //fetch to backend
        // MOVE API URL TO .ENV FOR PROD PLZZZZ
        const setOnboardingRequest = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/onboarding/set-onboarding`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userid: user.id }),
                    }
                );
                return await response.json();
            } catch (err) {
                console.error(err);
                return err;
            }
        };

        if (
            isLoaded &&
            user &&
            user.publicMetadata.onboardingComplete === undefined &&
            !metadataSet
        ) {
            setResult(setOnboardingRequest())
            // console.log(result)
            if (result.response === "Onboarding set succesfully") {
                setMetadataSet(true);
            } else {
                setError(result.error)
                console.log(result.error);
            }
        }else if(isLoaded && (user.publicMetadata.onboardingComplete || !user.publicMetadata.onboardingComplete)){
            setMetadataSet(true)
        }
    }, [user, isLoaded]);

    
    return {result, error, metadataSet}
}
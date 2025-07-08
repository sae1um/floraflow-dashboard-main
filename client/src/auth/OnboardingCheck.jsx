import useSetOnboardingRequest from "@/hooks/useSetOnboardingRequest";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function OnboardingCheck({ children }) {
    /*
     * this sets the onboarding metadata for clerk when new user registers
     * if metadata set succesfully, then it sets the state to true showing that it has
     * then redirect to onboarding
     *
     * for new user {user.publicMetadata.onboardingComplete will be undefined}
     *
     * But it login with no onboarding
     */
    const { user, isLoaded, isSignedIn } = useUser();
    const { error, metadataSet } = useSetOnboardingRequest("initial");

    if (!isLoaded) {
        //add a loader/spinner/skeleton!!!
        return null;
    } else if (!isSignedIn) {
        return <Navigate to="/" />;
    }
    if(!user.publicMetadata.onboardingComplete && metadataSet){
        return children
    }
    if(user.publicMetadata.onboardingComplete){
        return <Navigate to="/dashboard" />
    }
    
    {error && 
        <div>
            {error}
        </div>
    }
}

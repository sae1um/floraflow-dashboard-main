import { Card, CardContent } from "@/components/ui/card";
import useSetOnboardingRequest from "@/features/onboarding/hooks/useSetOnboardingRequest";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Leaf } from "lucide-react";
import { Navigate } from "react-router";

export default function OnboardingCheck({ children }) {
    /*
     * this sets the onboarding metadata for clerk when new user registers
     * if metadata updated succesfully, then it sets the state to true showing that it has been set
     * then redirect to onboarding
     * for new user user.publicMetadata.onboardingComplete will be undefined
     */
    const { user, isLoaded, isSignedIn } = useUser();
    const { error, metadataSet } = useSetOnboardingRequest();

    if (!isLoaded) {
        return null;
    } else if (!isSignedIn) {
        return <Navigate to="/" />;
    }
    if (!user.publicMetadata.onboardingComplete && metadataSet) {
        return children;
    }
    if (user.publicMetadata.onboardingComplete) {
        return <Navigate to="/dashboard" />;
    }
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-teal-50 flex items-center justify-center p-4">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                </div>

                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Leaf className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-foreground">
                                FloraFlow
                            </span>
                        </div>

                        {/* Main Card */}
                        {error && (
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-8 flex flex-col gap-4 items-center justify-center">
                                    {error}
                                    <SignOutButton className="py-2 px-1 rounded-md w-1/3 cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold" />
                                </CardContent>
                            </Card>
                        )}
                        {error ? console.log(error) : ""}
                        {/* Footer */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-muted-foreground">
                                Need help?{" "}
                                <a
                                    href="#"
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Contact support
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return children;
}

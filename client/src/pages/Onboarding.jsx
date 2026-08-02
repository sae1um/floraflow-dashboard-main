import { useState } from "react";
import { Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    WelcomeStep,
    SetupStep,
    SuccessStep,
    NameStep,
} from "@/components/onboarding/onboardingSteps";
import { useUser } from "@clerk/clerk-react";
import { Link, Navigate, useNavigate } from "react-router";
import { completeOnboarding } from "@/helpers/completeOnboarding";

export default function OnboardingPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [deviceId, setDeviceId] = useState("");
    const [nameType, setNameType] = useState("");
    const completeSetup = async () => {
        setNameType(!nameType.trim() ? "fullname" : "username");
        const userName = nameType === "fullname" ? user.fullName : user.username;
        
        const result = await completeOnboarding(user.id, nameType, userName);
        if (result.success) {
            return navigate("/dashboard");
        }
        return;
    };
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

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 1
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                        <div
                            className={`w-8 h-0.5 ${
                                currentStep >= 2
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 2
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                        <div
                            className={`w-8 h-0.5 ${
                                currentStep >= 3
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 3
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                        <div
                            className={`w-8 h-0.5 ${
                                currentStep >= 4
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 4
                                    ? "bg-primary"
                                    : "bg-muted"
                            }`}
                        />
                    </div>
                </div>

                {/* Main Card */}
                <Card className="border-0 shadow-xl">
                    <CardContent className="p-8">
                        {currentStep === 1 && (
                            <NameStep
                                setCurrentStep={setCurrentStep}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                username={user.username}
                                nameType={nameType}
                                setNameType={setNameType}
                                complete={completeSetup}
                            />
                        )}
                        {currentStep === 2 && (
                            <WelcomeStep
                                setCurrentStep={setCurrentStep}
                                complete={completeSetup}
                            />
                        )}
                        {currentStep === 3 && (
                            <SetupStep
                                setCurrentStep={setCurrentStep}
                                deviceId={deviceId}
                                setDeviceId={setDeviceId}
                                nameType={nameType}
                                user={user}
                                complete={completeSetup}
                            />
                        )}
                        {currentStep === 4 && (
                            <SuccessStep
                                deviceId={deviceId}
                                complete={completeSetup}
                            />
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                        Need help?{" "}
                        <Link
                            to={"/support"}
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

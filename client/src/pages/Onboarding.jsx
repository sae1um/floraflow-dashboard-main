import { useState } from "react";
import { Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    WelcomeStep,
    SetupStep,
    SuccessStep,
} from "@/components/onboarding/onboardingSteps";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router";
export default function OnboardingPage() {
    const { user } = useUser();
    const [currentStep, setCurrentStep] = useState(1);
    const [deviceId, setDeviceId] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            FloraFlow
                        </span>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 1
                                    ? "bg-emerald-500"
                                    : "bg-gray-300"
                            }`}
                        />
                        <div
                            className={`w-8 h-0.5 ${
                                currentStep >= 2
                                    ? "bg-emerald-500"
                                    : "bg-gray-300"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 2
                                    ? "bg-emerald-500"
                                    : "bg-gray-300"
                            }`}
                        />
                        <div
                            className={`w-8 h-0.5 ${
                                currentStep >= 3
                                    ? "bg-emerald-500"
                                    : "bg-gray-300"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full ${
                                currentStep >= 3
                                    ? "bg-emerald-500"
                                    : "bg-gray-300"
                            }`}
                        />
                    </div>
                </div>

                {/* Main Card */}
                <Card className="border-0 shadow-xl">
                    <CardContent className="p-8">
                        {currentStep === 1 && (
                            <WelcomeStep setCurrentStep={setCurrentStep} />
                        )}
                        {currentStep === 2 && (
                            <SetupStep
                                setCurrentStep={setCurrentStep}
                                deviceId={deviceId}
                                setDeviceId={setDeviceId}
                                userId={user.id}
                            />
                        )}
                        {currentStep === 3 && (
                            <SuccessStep deviceId={deviceId} />
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Need help?{" "}
                        <Link
                            to={"/support"}
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import {
    ArrowRight,
    Leaf,
    Wifi,
    AlertCircle,
    CheckCircle,
    Loader2,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Navigate } from "react-router";
import { claimDevice } from "@/helpers/claimDevice";

export const NameStep = ({
    setCurrentStep,
    firstName,
    lastName,
    username,
    nameType,
    setNameType,
}) => {
    const handleRadioChange = (e) => {
        setNameType(e.target.value);
        console.log(e.target.value);
    };

    const handleNameSubmit = () => {
        setCurrentStep(2);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    What should we call you?
                </h2>
                <p className="text-gray-600">
                    Let's personalise your FloraFlow experience.
                </p>
            </div>

            <div className="space-y-6 flex flex-col">
                <fieldset className="space-y-2 m-auto pb-6">
                    <div className="flex space-x-2">
                        <input
                            type="radio"
                            name="nameSelection"
                            value="fullname"
                            id="fullname"
                            onChange={handleRadioChange}
                        />
                        <Label
                            htmlFor="fullname"
                            className="text-sm font-medium text-gray-500"
                        >
                            Use{" "}
                            <span className="text-gray-700">
                                {firstName} {lastName}
                            </span>
                        </Label>
                    </div>
                    <div className="flex space-x-2">
                        <input
                            type="radio"
                            name="nameSelection"
                            value="username"
                            id="username"
                            onChange={handleRadioChange}
                        />
                        <Label
                            htmlFor="username"
                            className="text-sm font-medium text-gray-500 text-center"
                        >
                            Use{" "}
                            <span className="text-gray-700">{username}</span>
                        </Label>
                    </div>
                </fieldset>
                <Button
                    onClick={handleNameSubmit}
                    disabled={!nameType}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export const WelcomeStep = ({ setCurrentStep }) => {
    return (
        <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-10 w-10 text-emerald-600" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to FloraFlow!
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Let's get you started by connecting your first greenhouse.
                    This will only take a minute.
                </p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-semibold text-emerald-900 mb-2">
                    What you'll need:
                </h3>
                <ul className="text-sm text-emerald-800 space-y-1 text-left">
                    <li>• Your greenhouse device ID</li>
                    <li>• Device should be powered on</li>
                    <li>• Stable internet connection</li>
                </ul>
            </div>
            <Button
                onClick={() => setCurrentStep(3)}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>{" "}
        </div>
    );
};

export const SetupStep = ({
    setCurrentStep,
    deviceId,
    setDeviceId,
    userId,
}) => {
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState("");

    const validateDeviceId = () => {
        if (!deviceId.trim()) {
            setValidationError("Please enter a device ID");
            return;
        }

        setIsValidating(true);

        if (deviceId.startsWith("GH-") && deviceId.length >= 8) {
            // If true then do onboarding complete function
            const complete = claimDevice(deviceId, userId);
        } else {
            setValidationError("Unable to validate device. Please try again.");
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wifi className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Connect Your Greenhouse
                </h2>
                <p className="text-gray-600">
                    Enter your greenhouse device ID to establish the connection.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label
                        htmlFor="deviceId"
                        className="text-sm font-medium text-gray-700"
                    >
                        Device ID
                    </Label>
                    <Input
                        id="deviceId"
                        type="text"
                        placeholder="e.g., GH-ABC123XYZ"
                        value={deviceId}
                        onChange={(e) => {
                            setDeviceId(e.target.value.toUpperCase());
                            setValidationError("");
                        }}
                        className="mt-1 h-12 text-center font-mono tracking-wider"
                        disabled={isValidating}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        You can find this on your greenhouse device label
                    </p>
                </div>

                {validationError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                )}

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        disabled={isValidating}
                        className="flex-1 cursor-pointer"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={validateDeviceId}
                        disabled={isValidating || !deviceId.trim()}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                        {isValidating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            "Connect Device"
                        )}
                    </Button>
                </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                    Need help finding your Device ID?
                </h4>
                <p className="text-sm text-blue-800">
                    Look for a label on your greenhouse controller. The Device
                    ID typically starts with "GH-" followed by alphanumeric
                    characters.
                </p>
            </div>
        </div>
    );
};

export const SuccessStep = ({ deviceId }) => {
    const completeSetup = () => {
        return <Navigate to="dashboard" />;
    };
    return (
        <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Greenhouse Connected!
                </h2>
                <p className="text-gray-600 mb-6">
                    Your greenhouse{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {deviceId}
                    </span>{" "}
                    has been successfully connected to FloraFlow.
                </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-semibold text-green-900 mb-3">
                    You're all set! Now you can:
                </h3>
                <ul className="text-sm text-green-800 space-y-2 text-left">
                    <li>• Monitor real-time environmental data</li>
                    <li>• Control greenhouse systems remotely</li>
                    <li>• View historical analytics</li>
                    <li>• Set up automated alerts</li>
                </ul>
            </div>

            <Button
                onClick={completeSetup}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
            >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );
};

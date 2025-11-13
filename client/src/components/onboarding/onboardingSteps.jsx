import React, { useState } from "react";
import {
    ArrowRight,
    Leaf,
    Wifi,
    AlertCircle,
    CheckCircle,
    Loader2,
    User,
    Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { claimDevice } from "@/helpers/claimDevice";
import useSetOnboardingRequest from "@/hooks/useSetOnboardingRequest";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateDeviceClaim } from "@/helpers/updateDeviceClaim";

export const NameStep = ({
    setCurrentStep,
    firstName,
    lastName,
    username,
    nameType,
    setNameType,
    complete,
}) => {
    const { isRequestLoading } = useSetOnboardingRequest();
    const handleRadioChange = (e) => {
        setNameType(e.target.value);
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
                            disabled={isRequestLoading}
                            onChange={handleRadioChange}
                        />
                        <Label
                            htmlFor="fullname"
                            className="text-sm font-medium text-gray-500"
                        >
                            Use{" "}
                            {isRequestLoading ? (
                                <Skeleton>loading...</Skeleton>
                            ) : (
                                <span className="text-gray-700">
                                    {firstName} {lastName}
                                </span>
                            )}
                        </Label>
                    </div>
                    <div className="flex space-x-2">
                        <input
                            type="radio"
                            name="nameSelection"
                            value="username"
                            id="username"
                            disabled={isRequestLoading}
                            onChange={handleRadioChange}
                        />
                        <Label
                            htmlFor="username"
                            className="text-sm font-medium text-gray-500 text-center"
                        >
                            Use{" "}
                            {isRequestLoading ? (
                                <Skeleton>loading...</Skeleton>
                            ) : (
                                <span className="text-gray-700">
                                    {username}
                                </span>
                            )}
                        </Label>
                    </div>
                </fieldset>
                <Button
                    onClick={handleNameSubmit}
                    disabled={!nameType}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                    size="lg"
                >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center justify-center">
                    <button
                        onClick={complete}
                        className="underline pl-2 text-slate-400 cursor-pointer"
                    >
                        Click to skip onboarding
                    </button>
                </div>
            </div>
        </div>
    );
};

export const WelcomeStep = ({ setCurrentStep, complete }) => {
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
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 cursor-pointer"
                >
                    Back
                </Button>
                <Button
                    onClick={() => setCurrentStep(3)}
                    size="lg"
                    className="flex-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
            <div>
                <button
                    onClick={complete}
                    className="underline pl-2 text-slate-400 cursor-pointer"
                >
                    Click to skip onboarding
                </button>
            </div>
        </div>
    );
};

export const SetupStep = ({
    setCurrentStep,
    deviceId,
    setDeviceId,
    nameType,
    user,
    complete,
}) => {
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [location, setLocation] = useState("");
    const [room, setRoom] = useState("");

    const validateDevice = async () => {
        setIsValidating(true);
        setValidationError("");

        if (isConnected) {
            return completeForm();
        }
        // device ID cannot be empty
        if (!deviceId.trim()) {
            setValidationError("Please enter a device ID");
            setIsValidating(false);
            return;
        }

        // device ID must start with GH- and be at least 8 characters long
        if (deviceId.startsWith("GH-") && deviceId.length >= 8) {
            let username;
            if (nameType === "fullname") {
                username = user.firstName + " " + user.lastName;
            } else {
                username = user.username;
            }
            // object with success and message e.g. { success: true, message: "Device claimed successfully" }
            const result = await claimDevice(deviceId, username, user.id);
            if (!result.success) {
                setValidationError(result.message);
                setIsValidating(false);
                return;
            } else if (result.success) {
                setValidationError("");
                setIsValidating(false);
                setIsConnected(true);
            }
        } else {
            setValidationError("Unable to validate device. Please try again.");
            setIsValidating(false);
        }
        setIsValidating(false);
    };

    const completeForm = async () => {
        if (!room.trim()) {
            setValidationError("Please enter a room name");
            return;
        }
        const res = await updateDeviceClaim(deviceId, location, room);
        if (!res.success) {
            setIsValidating(false);
            setValidationError(res.message);
            return;
        }
        setIsValidating(false);
        setCurrentStep(4);
        return;
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
                        disabled={isValidating || isConnected}
                        onChange={(e) => {
                            setDeviceId(e.target.value.toUpperCase());
                            setValidationError("");
                        }}
                        className="mt-1 h-12 text-center font-mono tracking-wider"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        You can find this on your greenhouse device label
                    </p>
                </div>
                {isConnected && (
                    <div className="flex justify-between space-y-2">
                        <div className="">
                            <Label
                                htmlFor="location"
                                className="text-center text-sm font-medium text-gray-700"
                            >
                                Location
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="inline-block ml-1 h-4 w-4 text-gray-400 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">
                                            Example: Mom's house, School, etc
                                            (Optional)
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <Input
                                id="location"
                                disabled={isValidating}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="room"
                                className=" flex flex-row gap-0 text-sm font-medium text-gray-700"
                            >
                                Room<span className="text-red-600 mr-2">*</span>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="inline-block ml-1 h-4 w-4 text-gray-400 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">
                                            Example: Back garden, Timmy's room,
                                            etc. (Required)
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <Input
                                id="room"
                                disabled={isValidating}
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {validationError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                )}

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 cursor-pointer"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={validateDevice}
                        disabled={isValidating || !deviceId.trim()}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                    >
                        {isValidating && (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                            </>
                        )}
                        {!isValidating && !isConnected && "Connect Device"}
                        {!isValidating && isConnected && "Continue"}
                    </Button>
                </div>
                <div>
                    <button
                        onClick={complete}
                        className="underline pl-2 text-slate-400 cursor-pointer"
                    >
                        Click to skip onboarding
                    </button>
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

export const SuccessStep = ({ deviceId, complete }) => {
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
                    <span className="font-mono bg-gray-100 0 px-2 py-1 rounded">
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
                onClick={complete}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );
};

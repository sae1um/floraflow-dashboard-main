import { greenhouseSchema } from "@/lib/schemas/greenhouseSchema";
import "@/index.css";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateDevice } from "@/helpers/validateDevice";
import z from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AddGreenhouseDialog({ children }) {
    const { user } = useUser();
    const [step, setStep] = useState(1); // 1: form, 2: success

    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState([]);
    const [greenhouseFormDetails, setGreenhouseFormDetails] = useState({
        name: "",
        location: "",
        room: "",
        deviceId: "",
    });
    const formContainerStyle = "flex flex-col gap-2";

    // const clickTest = async (e) => {
    //     e.preventDefault();

    //     const result = await validateDevice(
    //         { name: "test", location: "test", room: "test", deviceId: "GH-ECFABCD511CB" },
    //         user?.id
    //     );
    //     if (!result.success) {
    //         setValidationError([result.message]);
    //         setIsValidating(false);
    //         return;
    //     }
    // };

    const submitForm = async (e) => {
        e.preventDefault();

        setValidationError([]);
        setIsValidating(true);

        // Validate form details with Greenhouse schema
        try {
            greenhouseSchema.parse(greenhouseFormDetails);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors = [];
                err.issues.forEach((issue) => {
                    errors.push(issue.message);
                });
                setValidationError(errors);
                setIsValidating(false);
                return;
            }
            setIsValidating(false);
            return;
        }
        const result = await validateDevice(greenhouseFormDetails, user?.id);
        if (!result.success) {
            setValidationError([result.message]);
            setIsValidating(false);
            return;
        }
        setStep(2);
        setIsValidating(false);
    };

    const renderForm = () => (
        <div className="space-y-4">
            <form className="space-y-4">
                <div className={formContainerStyle}>
                    <Label htmlFor="greenhouseName" className="label-style">
                        Greenhouse Name
                        <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="greenhouseName"
                        disabled={isValidating}
                        value={greenhouseFormDetails.name}
                        onChange={(e) =>
                            setGreenhouseFormDetails({
                                ...greenhouseFormDetails,
                                name: e.target.value,
                            })
                        }
                        placeholder="e.g. Orchids"
                        required
                    />
                </div>
                <div className={formContainerStyle}>
                    <Label htmlFor="greenhouseLocation">Location</Label>
                    <Input
                        type="text"
                        id="greenhouseLocation"
                        disabled={isValidating}
                        value={greenhouseFormDetails.location}
                        onChange={(e) =>
                            setGreenhouseFormDetails({
                                ...greenhouseFormDetails,
                                location: e.target.value,
                            })
                        }
                        placeholder="Moms House"
                        required
                    />
                </div>
                <div className={formContainerStyle}>
                    <Label htmlFor="greenhouseRoom">
                        Room
                        <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="greenhouseRoom"
                        disabled={isValidating}
                        value={greenhouseFormDetails.room}
                        onChange={(e) =>
                            setGreenhouseFormDetails({
                                ...greenhouseFormDetails,
                                room: e.target.value,
                            })
                        }
                        placeholder="Living Room"
                    />
                </div>
                <div className={formContainerStyle}>
                    <Label htmlFor="greenhouseId">
                        Greenhouse ID{" "}
                        <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="greenhouseId"
                        disabled={isValidating}
                        value={greenhouseFormDetails.deviceId}
                        onChange={(e) =>
                            setGreenhouseFormDetails({
                                ...greenhouseFormDetails,
                                deviceId: `${e.target.value}`,
                            })
                        }
                        placeholder="e.g. GH-ABC123XYZ456"
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        Find this on your greenhouse controller device label
                    </p>
                </div>
                {validationError.length > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        Error:
                        {validationError.map((err, idx) => (
                            <AlertDescription key={idx}>{err}</AlertDescription>
                        ))}
                    </Alert>
                )}
                <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                setGreenhouseFormDetails({
                                    name: "",
                                    location: "",
                                    room: "",
                                    deviceId: "",
                                });
                                setValidationError([]);
                                setIsValidating(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={(e) => submitForm(e)}
                        disabled={
                            isValidating ||
                            !greenhouseFormDetails.name.trim() ||
                            !greenhouseFormDetails.room.trim() ||
                            !greenhouseFormDetails.deviceId.trim()
                        }
                    >
                        {isValidating && (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                            </>
                        )}
                        {!isValidating && "Connect Device"}
                    </Button>
                    {/* <Button
                        onClick={(e) => {
                            clickTest(e);
                        }}
                    >
                        Test
                    </Button> */}
                </div>
            </form>
        </div>
    );
    const renderSuccessStep = () => {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-success"/>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Greenhouse Connected!</h3>
                <p className="text-sm text-muted-foreground mb-4">{greenhouseFormDetails.deviceId} has been successfully connected to your dashboard.</p>
                <Badge variant="success">Connection Established</Badge>
            </div>
        );
    };
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {step === 1 && "Add new Greenhouse"}
                        {step === 2 && "Success!"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1 &&
                            "Connect a new greenhouse to your dashboard."}
                        {step === 2 &&
                            "Your greenhouse is now ready to monitor and control."}
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && renderForm()}
                {step === 2 && renderSuccessStep()}
            </DialogContent>
        </Dialog>
    );
}

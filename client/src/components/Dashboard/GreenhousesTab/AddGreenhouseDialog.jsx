import { greenhouseSchema } from "@/lib/schemas/greenhouseSchema";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
export default function AddGreenhouseDialog({ onAdd, children }) {
    const [greenhouseName, setGreenhouseName] = useState();
    const [greenhouseLocation, setGreenhouseLocation] = useState();
    const [] = useState();

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: form, 2: connecting, 3: success
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionError, setConnectionError] = useState("");

    const onSubmit = async () => {
        return;
    };

    const renderForm = () => (
        <div className="space-y-4">
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label>Greenhouse Name</label>
                    <input type="text" placeholder="e.g. Orchids" required/>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" placeholder="" required/>
                </div>
                <div>
                    <label>Room</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Greenhouse ID</label>
                    <input type="text"/>
                </div>
            </form>
        </div>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {step === 1 && "Add new Greenhouse"}
                        {step === 2 && "Connecting..."}
                        {step === 3 && "Success!"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1 &&
                            "Connect a new greenhouse to your dashboard."}
                        {step === 2 &&
                            "Please wait while we establish the connection."}
                        {step === 3 &&
                            "Your greenhouse is now ready to monitor and control."}
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && renderForm()}
                {/* {step === 2 && renderConnectingStep()}
                {step === 3 && renderSuccessStep()} */}
            </DialogContent>
        </Dialog>
    );
}

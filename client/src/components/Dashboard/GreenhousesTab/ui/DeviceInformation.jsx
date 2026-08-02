import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import ConnectionBadge from "@/components/Dashboard/ui/badges/ConnectionBadge";

const InfoRow = ({ label, value }) => (
    <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="text-base font-semibold text-foreground">{value}</div>
    </div>
);

export default function DeviceInformation({ greenhouse, highlighting }) {
    return (
        <Card
            id="device-information"
            className="relative border border-border"
        >
            {highlighting && (
                <span className="absolute -top-1 -right-1 inline-flex size-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex size-4 rounded-full bg-primary"></span>
                </span>
            )}
            <CardHeader>
                <CardTitle>Device Information</CardTitle>
                <CardDescription>
                    Key hardware and connection details for this greenhouse
                    device.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label="Device ID" value={greenhouse.deviceId} />
                <InfoRow label="Location" value={greenhouse.location} />
                <InfoRow label="Room / Section" value={greenhouse.room} />
                <InfoRow
                    label="Uptime"
                    value={`${greenhouse.uptimeHours} hrs`}
                />
            </CardContent>
        </Card>
    );
}

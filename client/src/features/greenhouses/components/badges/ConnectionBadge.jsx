import { Badge } from "@/components/ui/badge";

export default function ConnectionBadge({ badgeContent, style }) {
    return (
        <Badge className={`${style}`}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {badgeContent.value === "online" ? "Online" : "Offline"}
        </Badge>
    );
}

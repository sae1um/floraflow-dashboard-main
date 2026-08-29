export const getStatusConfig = (status) => {
    switch (status) {
        case "healthy":
            return {
                badge: "✅ Healthy",
                color: "bg-success/10 text-success border-success/20",
            };
        case "attention":
            return {
                badge: "⚠️ Needs Attention",
                color: "bg-warning/10 text-warning border-warning/20",
            };
        case "critical":
            return {
                badge: "🚨 Critical",
                color: "bg-destructive/10 text-destructive border-destructive/20",
            };
        default:
            return {
                badge: "⚪ Unknown",
                color: "bg-muted text-muted-foreground border-border",
            };
    }
};

export const getStatusConfig = (status) => {
    switch (status) {
        case "healthy":
            return {
                badge: "✅ Healthy",
                color: "bg-green-100 text-green-800 border-green-200",
            };
        case "attention":
            return {
                badge: "⚠️ Needs Attention",
                color: "bg-yellow-100 text-yellow-800 border-yellow-200",
            };
        case "critical":
            return {
                badge: "🚨 Critical",
                color: "bg-red-100 text-red-800 border-red-200",
            };
        default:
            return {
                badge: "⚪ Unknown",
                color: "bg-gray-100 text-gray-800 border-gray-200",
            };
    }
};

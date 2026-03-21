import { colourClasses } from "@/lib/classes/DashboardDataCardClasses";

export default function StatisticCard({
    isLoading,
    label,
    value,
    unit,
    icon: Icon,
    color,
    trend,
}) {
    if (isLoading) {
        return <Skeleton className="h-28" />;
    }
    const isPositive = trend >= 0;
    const classes = colourClasses[color];
    return (
        <div className="relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow overflow-hidden">
            <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${classes.border}`}
            />
            <div className="flex items-start justify-between ml-2">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-semibold text-gray-900">
                            {value}
                        </span>
                        <span className="text-sm text-gray-400">{unit}</span>
                    </div>
                    <div
                        className={`inline-flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
                    >
                        <span>
                            {isPositive ? "+" : ""}
                            {trend}%
                        </span>
                        <span className="text-gray-400">vs last hour</span>
                    </div>
                </div>

                <div className={`p-2.5 rounded-lg ${classes.iconBg}`}>
                    <Icon className={`h-5 w-5 ${classes.icon}`} />
                </div>
            </div>
        </div>
    );
}

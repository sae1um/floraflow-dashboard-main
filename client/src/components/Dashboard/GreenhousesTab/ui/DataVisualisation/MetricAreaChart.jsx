import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { colourClasses } from "@/lib/classes/DashboardDataCardClasses";
import { getYDomain } from "@/lib/helpers/chartHelpers";

export default function MetricAreaChart({
    dataPoints,
    dataKey,
    label,
    unit,
    color,
    isLoading,
}) {
    if (isLoading) {
        return <Skeleton className="h-56" />;
    }

    const hex = colourClasses[color].hex;
    const chartConfig = { [dataKey]: { label, color: hex } };
    const domain = getYDomain(dataPoints, dataKey);
    const gradientId = `metric-gradient-${dataKey}`;
    const rangeLabel = dataPoints.length
        ? `${dataPoints[0].time} – ${dataPoints[dataPoints.length - 1].time}`
        : "";
    const tickInterval = Math.max(0, Math.ceil(dataPoints.length / 6) - 1);

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <CardDescription>{rangeLabel} trend</CardDescription>
            </CardHeader>
            <CardContent className="pl-0 pt-0 pb-2">
                <ChartContainer config={chartConfig} className="w-full h-56">
                    <AreaChart
                        data={dataPoints}
                        margin={{ left: 12, right: 12, top: 8 }}
                    >
                        <defs>
                            <linearGradient
                                id={gradientId}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={`var(--color-${dataKey})`}
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={`var(--color-${dataKey})`}
                                    stopOpacity={0.02}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 3"
                            stroke="var(--color-border)"
                        />
                        <XAxis
                            dataKey="time"
                            tickMargin={8}
                            interval={tickInterval}
                        />
                        <YAxis
                            domain={domain}
                            width={40}
                            tickFormatter={(v) => `${Math.round(v)}${unit}`}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey={dataKey}
                            type="monotone"
                            stroke={`var(--color-${dataKey})`}
                            strokeWidth={2}
                            fill={`url(#${gradientId})`}
                            name={label}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

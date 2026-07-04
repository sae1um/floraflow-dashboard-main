import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Tooltip,
    Legend,
} from "recharts";
import ChartLegendSvg from "./ChartLegendSvg";

export default function LineChartMultiple({
    dataPoints,
    label1,
    color1,
    label2,
    color2,
    isLoading,
    dataKey1,
    dataKey2,
}) {
    if (isLoading) {
        return <Skeleton className="h-64" />;
    }
    const chartConfig = {
        dataPoint1: {
            label: label1,
            color: color1,
        },
        dataPoint2: {
            label: label2,
            color: color2,
        },
    };

    const CustomToolTip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-4">
                    <p className="text-sm font-semibold text-white mb-3">
                        {label}
                    </p>
                    {payload.map((entry, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 text-sm mb-1.5 last:mb-0"
                        >
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-zinc-400">{entry.name}</span>
                            <span className="font-semibold text-white ml-auto">
                                {entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-base font-medium">
                    {label1} & {label2}
                </CardTitle>
                {/* TODO - Add dynamic trend title */}
                <CardDescription>24-hour trend</CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
                <ChartContainer config={chartConfig} className="w-full h-100">
                    <LineChart
                        accessibilityLayer
                        data={dataPoints}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 3"
                            stroke="#cecece"
                        />
                        <XAxis
                            dataKey="time"
                            tickMargin={8}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            dataKey={dataKey1}
                            type="monotone"
                            stroke="var(--color-dataPoint1)"
                            strokeWidth={2}
                        />
                        <Line
                            dataKey={dataKey2}
                            type="monotone"
                            stroke="var(--color-dataPoint2)"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex items-center justify-center flex-row gap-4">
                <div className="flex gap-2 items-center text-sm text-gray-400 font-semibold"><ChartLegendSvg size={15} color={chartConfig.dataPoint1.color}/> {label1}</div>
                <div className="flex gap-2 items-center text-sm text-gray-400 font-semibold"><ChartLegendSvg size={15} color={chartConfig.dataPoint2.color}/>{label2}</div>
            </CardFooter>
        </Card>
    );
}

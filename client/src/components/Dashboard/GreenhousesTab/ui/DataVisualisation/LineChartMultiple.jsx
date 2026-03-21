import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, XAxis, YAxis, CartesianGrid, Line} from "recharts";

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
        return <Skeleton className="h-80" />;
    }
    const chartConfig = {
        dataPoint1: {
            label: "Temperature",
            color: color1,
        },
        dataPoint2: {
            label: label2,
            color: color2,
        },
    };
    console.log(dataPoints, color1, color2);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">
                    {label1} & {label2}
                </CardTitle>
                {/* TODO - Add dynamic trend title */}
                <CardDescription>24-hour trend</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={dataPoints} margin={{left: 12, right: 12}}>
                        <CartesianGrid vertical={false} strokeDasharray="4 3" stroke="#cecece"/>
                        <XAxis 
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
        </Card>
    );
}

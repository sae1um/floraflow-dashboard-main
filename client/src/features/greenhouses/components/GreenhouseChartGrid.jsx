import React from "react";
import DashboardHeading from "components/DashboardHeading";

export default function GreenhouseChartGrid() {
    return (
        <div>
            <DashboardHeading title={"Historical Trends"} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricAreaChart
                    dataPoints={greenhouse.trends}
                    dataKey="temp"
                    label="Temperature"
                    unit="°C"
                    color="orange"
                    isLoading={isLoading}
                />
                <MetricAreaChart
                    dataPoints={greenhouse.trends}
                    dataKey="humidity"
                    label="Humidity"
                    unit="%"
                    color="blue"
                    isLoading={isLoading}
                />
                <MetricAreaChart
                    dataPoints={greenhouse.trends}
                    dataKey="co2"
                    label="CO2 Level"
                    unit="ppm"
                    color="green"
                    isLoading={isLoading}
                />
                <MetricAreaChart
                    dataPoints={greenhouse.trends}
                    dataKey="water"
                    label="Water Level"
                    unit="%"
                    color="teal"
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

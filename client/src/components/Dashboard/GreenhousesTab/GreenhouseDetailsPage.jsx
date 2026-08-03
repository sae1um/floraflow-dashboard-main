import { Link, useParams } from "react-router";
import { mockGreenhouseData } from "@/lib/testData/greenhouseData";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    ChevronLeft,
    Download,
    Droplets,
    Edit2,
    Ellipsis,
    MapPin,
    Thermometer,
    Wind,
    Zap,
} from "lucide-react";
import { getStatusConfig } from "@/lib/helpers/getStatusConfig";
import StatisticCard from "./ui/StatisticCard";
import DashboardHeading from "@/components/DashboardHeading";
import MetricAreaChart from "./ui/DataVisualisation/MetricAreaChart";
import DeviceInformation from "./ui/DeviceInformation";
import { computeTrend } from "@/lib/helpers/chartHelpers";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import ConnectionBadge from "@/components/Dashboard/ui/badges/ConnectionBadge";

export default function GreenhouseDetailsPage() {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [greenhouse, setGreenhouse] = useState(null);
    const [highlighting, setHighlighting] = useState(false);
    const currentStatus = getStatusConfig(greenhouse?.status);

    useEffect(() => {
        setTimeout(() => {
            const ghId = id;
            // TODO - Replace with real greenhouse data, when there is no matching id, should return 404 or similar
            setGreenhouse(
                mockGreenhouseData[ghId] || mockGreenhouseData["greenhouse-1"],
            );
            setIsLoading(false);
        }, 600);
    }, [id]);

    const scrollToDeviceInformation = (event) => {
        event?.preventDefault();
        const element = document.getElementById("device-information");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setHighlighting(true);
            setTimeout(() => setHighlighting(false), 3000);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6 m-4">
                <Skeleton className="h-10 w-48 " />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-56" />
                    ))}
                </div>
                <Skeleton className="h-48" />
            </div>
        );
    }
    return (
        <div className="space-y-6 m-4">
            <motion.div>
                <div className="flex items-center gap-3 mb-4">
                    <Link to="/dashboard/greenhouses">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            Back to Greenhouses
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                {greenhouse.name}
                            </h1>
                            <ConnectionBadge
                                badgeContent={{
                                    value: greenhouse.deviceStatus,
                                }}
                                style={"bg-muted text-foreground"}
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {greenhouse.location} • {greenhouse.room}
                            </div>
                            <div>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href="#device-information"
                                            onClick={scrollToDeviceInformation}
                                            className="hover:bg-transparent"
                                        >
                                            <ChevronDown />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>More details</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="gap-2 bg-transparent"
                        >
                            <Edit2 className="h-4 w-4" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            className="gap-2 bg-transparent"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <Button variant="outline">
                            <Ellipsis />
                        </Button>
                    </div>
                </div>
            </motion.div>
            {/* CONSIDER - Get feedback on styling, I don't really like this atm, specially on mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <DashboardHeading title={"Live Environment Stats"} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatisticCard
                        label="Temperature"
                        value={greenhouse.currentStats.temperature}
                        unit="°C"
                        icon={Thermometer}
                        color="orange"
                        trend={computeTrend(greenhouse.trends, "temp")}
                        isLoading={isLoading}
                    />
                    <StatisticCard
                        label="Humidity"
                        value={greenhouse.currentStats.humidity}
                        unit="%"
                        icon={Droplets}
                        color="blue"
                        trend={computeTrend(greenhouse.trends, "humidity")}
                        isLoading={isLoading}
                    />
                    <StatisticCard
                        label="CO2 Level"
                        value={greenhouse.currentStats.co2}
                        unit="ppm"
                        icon={Wind}
                        color="green"
                        trend={computeTrend(greenhouse.trends, "co2")}
                        isLoading={isLoading}
                    />
                    <StatisticCard
                        label="Water Level"
                        value={greenhouse.currentStats.waterLevel}
                        unit="%"
                        icon={Zap}
                        color="teal"
                        trend={computeTrend(greenhouse.trends, "water")}
                        isLoading={isLoading}
                    />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
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
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <DeviceInformation greenhouse={greenhouse} highlighting={highlighting} />
            </motion.div>
        </div>
    );
}

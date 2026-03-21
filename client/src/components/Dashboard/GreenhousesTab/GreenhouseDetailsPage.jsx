import { Link, useParams } from "react-router";
import { mockGreenhouseData } from "@/lib/testData/greenhouseData";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    Download,
    Droplets,
    Edit2,
    MapPin,
    Thermometer,
    Wind,
    Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "@/lib/helpers/getStatusConfig";
import StatisticCard from "./ui/StatisticCard";
import DashboardHeading from "@/components/DashboardHeading";
import LineChartMultiple from "./ui/DataVisualisation/LineChartMultiple";
import { colourClasses } from "@/lib/classes/DashboardDataCardClasses";

export default function GreenhouseDetailsPage() {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [greenhouse, setGreenhouse] = useState(null);
    const currentStatus = getStatusConfig(greenhouse?.status);

    useEffect(() => {
        setTimeout(() => {
            const ghId = id;
            setGreenhouse(
                mockGreenhouseData[ghId] || mockGreenhouseData["greenhouse-1"],
            );
            setIsLoading(false);
        }, 600);
    }, [id]);

    if (isLoading) {
        return (
            <div className="space-y-6 m-4">
                <Skeleton className="h-10 w-48 " />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {greenhouse.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {greenhouse.location} • {greenhouse.room}

                            </div>
                            <Badge className={currentStatus.color}>
                                {currentStatus.badge}
                            </Badge>
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
                        trend={2.1}
                        isLoading={isLoading}
                    />
                    <StatisticCard
                        label="Humidity"
                        value={greenhouse.currentStats.humidity}
                        unit="%"
                        icon={Droplets}
                        color="blue"
                        trend={-1.5}
                        isLoading={isLoading}
                    />
                    <StatisticCard
                        label="CO2 Level"
                        value={greenhouse.currentStats.co2}
                        unit="ppm"
                        icon={Wind}
                        color="green"
                        trend={0.8}
                        isLoading={isLoading}
                    />
                    <StatisticCard
                        label="Water Level"
                        value={greenhouse.currentStats.waterLevel}
                        unit="%"
                        icon={Zap}
                        color="teal"
                        trend={-3.2}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <LineChartMultiple
                            dataPoints={greenhouse.trends}
                            label1={"Temperature"}
                            label2={"Humidity"}
                            color1={colourClasses.orange.hex}
                            color2={colourClasses.blue.hex}
                            isLoading={isLoading}
                            dataKey1="temp"
                            dataKey2="humidity"
                        />
                    </div>
                    <div className="space-y-6">
                        <LineChartMultiple
                            dataPoints={greenhouse.trends}
                            label1={"CO2 Level"}
                            label2={"Water Level"}
                            color1={colourClasses.green.hex}
                            color2={colourClasses.teal.hex}
                            isLoading={isLoading}
                            dataKey1="co2"
                            dataKey2="water"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStatusConfig } from "@/lib/helpers/getStatusConfig";
import { Droplet, Edit, Eye, MoreVertical, StarOff, Thermometer, Trash2, Wind, Zap } from "lucide-react";
import { Link } from "react-router";

export default function GreenhouseCard({ greenhouse }) {
    const statusConfig = getStatusConfig(greenhouse.status);
    // TODO - Add favourite functionality
    // const isFavourite;
    return (
        <Card className="p-0 border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                {/* TODO - Add a camera snapshot to each, allow uploading with upload thing
                    Change name to cameraUrl or similar
                */}
                <div className="relative">
                    <img
                        src={greenhouse.cameraSnapshot}
                        alt={`${greenhouse.name} camera feed`}
                        className="w-full h-32 object-cover rounded-t-lg bg-gray-100"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70 border-0"
                            onClick={() => toggleDefault(greenhouse.id)}
                        >
                            <StarOff className="h-3 w-3 text-white" />
                            {/* {isDefault ? (
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            ) : (
                                <StarOff className="h-3 w-3 text-white" />
                            )} */}
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70 border-0"
                                >
                                    <MoreVertical className="h-3 w-3 text-white" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link
                                        to={`/dashboard/greenhouses/${greenhouse.id}`}
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                        handleRemoveGreenhouse(greenhouse.id)
                                    }
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="absolute bottom-2 left-2">
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-white bg-black/50 px-1 rounded">
                                LIVE
                            </span>
                        </div>
                    </div>
                </div>
                {/* Content */}
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-semibold text-gray-900 flex items-center">
                                {greenhouse.name}
                                {/* {isDefault && (
                                    <Star className="ml-2 h-4 w-4 text-yellow-500 fill-current" />
                                )} */}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {greenhouse.location} • {greenhouse.room}
                            </p>
                        </div>
                        <Badge
                            className={`${statusConfig.color} border text-xs`}
                        >
                            <span className="mr-1">{statusConfig.badge}</span>
                        </Badge>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="p-1 bg-orange-100 rounded">
                                <Thermometer className="h-3 w-3 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Temp</p>
                                <p className="text-sm font-medium">
                                    {greenhouse.temperature}°C
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="p-1 bg-blue-100 rounded">
                                <Droplet className="h-3 w-3 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Humidity
                                </p>
                                <p className="text-sm font-medium">
                                    {greenhouse.humidity}%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="p-1 bg-green-100 rounded">
                                <Wind className="h-3 w-3 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">CO₂</p>
                                <p className="text-sm font-medium">
                                    {greenhouse.co2} ppm
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="p-1 bg-emerald-100 rounded">
                                <Zap className="h-3 w-3 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Water</p>
                                <p className="text-sm font-medium">
                                    {greenhouse.waterLevel}%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Updated {greenhouse.lastUpdate}
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs bg-transparent"
                        >
                            <Link
                                to={`/dashboard/greenhouses/${greenhouse.id}`}
                            >
                                View Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

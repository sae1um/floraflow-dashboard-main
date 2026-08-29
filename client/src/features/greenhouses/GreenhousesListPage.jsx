import { greenhouses } from "@/features/greenhouses/testData/greenhouses";
import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import AddGreenhouseDialog from "./components/AddGreenhouseDialog";
import filterAndSortGhList from "@/features/greenhouses/helpers/filterSortGhList";
import { Button } from "@/components/ui/button";
import {
    ArrowDown,
    ArrowUp,
    Camera,
    Filter,
    Plus,
    Settings,
    Zap,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GreenhouseGridArea from "./components/GreenhouseGrid";

export default function GreenhousesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    // TODO - Actual data
    /**
     * Implement actual greenhouse data
     * Implement actual count of greenhouses
     */
    const filteredAndSortedGreenhouses = filterAndSortGhList(
        greenhouses,
        filterStatus,
        searchQuery,
        sortBy,
        sortOrder,
    );

    return (
        <div className="space-y-6 m-4">
            {/* Header with Quick Actions */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        My Greenhouses
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {filteredAndSortedGreenhouses.length} of{" "}
                        {greenhouses.length} greenhouse
                        {greenhouses.length !== 1 ? "s" : ""}
                    </p>
                </div>
                {/* Action Buttons*/}
                <div className="flex gap-2 flex-col lg:flex-row lg:gap-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <AddGreenhouseDialog>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Greenhouse
                            </Button>
                        </AddGreenhouseDialog>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={"outline"}
                                className="flex items-center gap-2 text-sm"
                            >
                                <Zap className="" />
                                Quick Actions
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Settings className="h-4 w-4" />
                                Bulk Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Camera className=" h-4 w-4" />
                                View all cameras
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex justify-between flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    {/* CONSIDER - Use the page search bar? */}
                    <SearchBar
                        showIcon={false}
                        searchValue={searchQuery}
                        setSearchValue={setSearchQuery}
                        placeholderText={"Search greenhouses..."}
                        classNameProps="w-full"
                    />
                </div>
                <div className="flex gap-2 ">
                    <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                    >
                        {/* CONSIDER - ServiceNow like filtering? */}
                        <SelectTrigger className="w-[160px] bg-background">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="healthy">Healthy</SelectItem>
                            <SelectItem value="attention">
                                Needs Attention
                            </SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[160px] bg-background rounded-r-none">
                                <div className="flex items-center gap-2">
                                    <Filter className="icon-size-4" />
                                    <SelectValue placeholder="Sort by" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {/* TODO - Add more sorting  */}
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="location">
                                    Location
                                </SelectItem>
                                <SelectItem value="Room">Room</SelectItem>
                                <SelectItem value="status">Status</SelectItem>
                                <SelectItem value="temperature">
                                    Temperature
                                </SelectItem>
                                <SelectItem value="lastUpdated">
                                    Last Updated
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className="rounded-l-none cursor-default"
                            onClick={() =>
                                setSortOrder(
                                    sortOrder === "asc" ? "desc" : "asc",
                                )
                            }
                            title={
                                sortOrder === "asc"
                                    ? "Sort ascending"
                                    : "Sort descending"
                            }
                        >
                            {sortOrder === "asc" ? (
                                <ArrowUp className="h-4 w-4" />
                            ) : (
                                <ArrowDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
            {/* Greenhouse Grid */}
            <GreenhouseGridArea
                filteredAndSortedGreenhouses={filteredAndSortedGreenhouses}
                searchQuery={searchQuery}
                filterStatus={filterStatus}
            />
        </div>
    );
}

import { Link } from "react-router";
import { greenhouses } from "@/lib/testData/greenhouses";
import { useState } from "react";
import SearchBar from "../SearchBar";
import AddGreenhouseDialog from "./AddGreenhouseDialog";
import filterAndSortGhList from "@/helpers/filterSortGhList";
import { Button } from "@/components/ui/button";
import { Bolt, CloudLightning, Plus, Zap } from "lucide-react";
// TODO Actual data
/**
 * Implement actual greenhouse data
 * Implement actual count of greenhouses
 */
export default function GreenhousesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const filteredAndSortedGreenhouses = filterAndSortGhList(
        greenhouses,
        filterStatus,
        searchQuery,
        sortBy,
        sortOrder
    );

    return (
        <div className="space-y-6 mx-4 mt-4">
            {/* Header with Quick Actions */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        My Greenhouses
                    </h1>
                    <p className="text-sm text-gray-500">
                        {filteredAndSortedGreenhouses.length} of{" "}
                        {greenhouses.length} greenhouse
                        {greenhouses.length !== 1 ? "s" : ""} shown
                    </p>
                </div>
                {/* Action Buttons*/}
                <span className="flex gap-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <AddGreenhouseDialog>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Greenhouse
                            </Button>
                        </AddGreenhouseDialog>
                    </div>
                    <Button variant={'outline'} className="flex items-center gap-2 text-sm">
                        <Zap className=""/>
                        Quick Actions
                    </Button>
                </span>

                {/* <SearchBar
                    showIcon={false}
                    searchValue={searchQuery}
                    setSearchValue={setSearchQuery}
                    placeholderText={"Search greenhouses..."}
                /> */}
            </div>
        </div>
    );
}

function EmptyState() {
    return;
}

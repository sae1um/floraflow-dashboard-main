import { Camera, Plus } from "lucide-react";
import AddGreenhouseDialog from "./AddGreenhouseDialog";
import { Button } from "@/components/ui/button";
import GreenhouseCard from "./GrenhouseCard";

export default function GreenhouseGridArea({
    filteredAndSortedGreenhouses,
    isLoading,
    searchQuery,
    filterStatus,
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedGreenhouses.length === 0 && !isLoading ? (
                <EmptyState
                    searchQuery={searchQuery}
                    filterStatus={filterStatus}
                />
            ) : (
                filteredAndSortedGreenhouses.map((greenhouse) => {
                    return(
                        <GreenhouseCard  key={greenhouse.id} greenhouse={greenhouse}/>
                    )
                })
            )}
        </div>
    );
};

const EmptyState = ({ searchQuery, filterStatus }) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Greenhouses Found
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
                {searchQuery || filterStatus !== "all"
                    ? "No greenhouses match your current filters. Try adjusting your search or filter criteria."
                    : "Get started by connecting your first greenhouse to monitor and control your growing environment."}
            </p>
            {!searchQuery && filterStatus === "all" && (
                <AddGreenhouseDialog>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Connect a Greenhouse
                    </Button>
                </AddGreenhouseDialog>
            )}
        </div>
    );
};

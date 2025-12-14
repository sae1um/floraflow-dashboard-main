import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import SearchBar from "./SearchBar";

export default function DashboardHeader() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <header className="flex h-16 flex-row bg-white border-b border-gray-20 px-4 lg:px-6 py-4">
            <div className="flex items-center flex-1 ml-12 lg:ml-0 ">
                <SearchBar
                    showIcon={true}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
            <QuickActionButons />
        </header>
    );
}


function QuickActionButons() {
    return(
        <div>
            <Button variant="ghost" size="sm" className="relative">
                <Bell className="icon-4"/>
                <Badge
                    className="absolute icon-size-5 -top-1 -right-1 rounded-full flex items-center justify-center px-1 bg-red-500 text-white text-xs"
                >
                    2
                </Badge>
            </Button>
        </div>
    )
}

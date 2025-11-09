import { useState } from "react";
import { Input } from "../ui/input";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export default function DashboardHeader() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <header className="flex h-16 flex-row bg-white border-b border-gray-20 px-4 lg:px-6 py-4">
            <div className="flex items-center flex-1 ml-12 lg:ml-0 ">
                <HeaderSearchbar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
            <QuickActionButons />
        </header>
    );
}

function HeaderSearchbar({ searchValue, setSearchValue }) {
    return (
        <div className="relative max-w-md w-max lg:w-full ">
            <Search className="absolute left-3 top-1/2 trasnform -translate-y-1/2 icon-size-4 text-gray-400 "/>
            <Input
                className="pl-10"
                placeholder="Search greenhouses..."
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    console.log(searchValue);
                }}
            />
        </div>
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

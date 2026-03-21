import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({
    showIcon,
    placeholderText,
    searchValue,
    setSearchValue,
    classNameProps
}) {
    return (
        <div className="relative max-w-md w-max lg:w-full ">
            {showIcon && (
                <Search className="absolute left-3 top-1/2 trasnform -translate-y-1/2 icon-size-4 text-gray-400 " />
            )}

            <Input
                className={`${showIcon ? "pl-10": ""} bg-white ${classNameProps}`}
                placeholder={placeholderText}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    console.log(searchValue);
                }}
            />
        </div>
    );
}

import {
    BarChart3,
    Calendar,
    CheckSquare,
    ChevronDown,
    Home,
    LayoutDashboard,
    Leaf,
    LogOut,
    Menu,
    Settings,
    User,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navigation = [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Greenhouses", url: "/dashboard/greenhouses", icon: Home },
    { name: "Schedules", url: "/dashboard/schedules", icon: Calendar },
    { name: "Tasks", url: "/dashboard/tasks", icon: CheckSquare },
    { name: "Reports", url: "/dashboard/reports", icon: BarChart3 },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
];
export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 -z-10 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <MobileSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <DesktopSidebar />
            {/* Mobile menu button */}
            {!sidebarOpen && (
                <div className="lg:hidden fixed top-4 left-4 ">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                        className="bg-white shadow-md"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </>
    );
}
function DesktopSidebar() {
    return (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                <div className="flex items-center h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            FloraFlow
                        </span>
                    </div>
                </div>
                <SidebarContent />
            </div>
        </div>
    );
}

function MobileSidebar({ sidebarOpen, setSidebarOpen }) {
    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                        FloraFlow
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="p-2"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
            <SidebarContent />
        </div>
    );
}
function SidebarContent({ userName, userInitials }) {
    const { user } = useUser();
    const location = useLocation();
    const { pathname } = location;

    const [username, setUsername] = useState("");
    const [userInitial, setUserInitial] = useState("");

    useEffect(() => {
        let nameType = user.publicMetadata.userSettings?.namePreference;
        if (nameType === "fullName") {
            setUserInitial(
                user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()
            );
            setUsername(user.fullName);
        } else {
            setUserInitial(
                user.username.charAt(0).toUpperCase() +
                    user.username.charAt(1).toUpperCase()
            );
            setUsername(user.username);
        }
    }, [user]);
    return (
        <div className="flex flex-col flex-1">
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                        <Link
                            key={item.name}
                            to={item.url}
                            className={`
                                flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                                ${
                                    isActive
                                        ? "bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500"
                                        : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
                                }`}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User menu */}
            <div className="p-4 border-t border-gray-200">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start p-2 h-auto"
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                    {/* Upload pfps to uploadthing and have the url in src */}
                                    {/* <AvatarImage src="https://icij87uwpa.ufs.sh/f/Tq54NAESXBRW2XHPcqpq38VPS1xHcITfmOKGtov7aBXWU0EL" /> */}
                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">
                                        {userInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {username}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Garden Manager
                                    </p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>
                            <Link to={"/profile"} className="flex gap-2">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={"/settings"} className="flex gap-2">
                                <Settings className="mr-2 h-4 w-4" />
                                Account Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <SignOutButton className="w-full flex gap-2 cursor-pointer items-center">
                                <span>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign out
                                </span>
                            </SignOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

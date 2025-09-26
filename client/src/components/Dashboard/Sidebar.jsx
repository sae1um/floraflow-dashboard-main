import { BarChart3, Calendar, CheckSquare, Home, LayoutDashboard, Settings } from "lucide-react"

export default function Sidebar() {
    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Greenhouses", href: "/dashboard/greenhouses", icon: Home },
        { name: "Schedules", href: "/dashboard/schedules", icon: Calendar },
        { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
        { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]
    return(
        <div>
            
        </div>
    )
}
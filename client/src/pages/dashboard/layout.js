import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { Outlet } from "react-router-dom"
import WeatherWidget from "../../components/dashboard/WeatherWidget"

export default function MainDashboardLayout() {
    return (
        <DashboardLayout
            slots={{ sidebarFooter: WeatherWidget }}
        >
            <Outlet />
        </DashboardLayout>
    )
};

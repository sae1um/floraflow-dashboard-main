import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { Outlet } from "react-router-dom"

export default function MainDashboardLayout() {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
};

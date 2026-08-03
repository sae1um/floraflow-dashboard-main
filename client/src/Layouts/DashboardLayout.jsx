import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Sidebar from "@/components/Dashboard/Sidebar";
import React from "react";
import { Outlet } from "react-router";

export const DashboardLayout = () => {
    return (
        // TODO - Update all icons to icon-size-x classes for consistency
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="lg:pl-64">
                <DashboardHeader />
                <Outlet />
            </div>
        </div>
    );
};

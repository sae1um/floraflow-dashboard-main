import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Sidebar from "@/components/Dashboard/Sidebar";
import React from "react";
import { Outlet } from "react-router";

export const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:pl-64">
                <DashboardHeader />
                <Outlet />
            </div>
        </div>
    );
};

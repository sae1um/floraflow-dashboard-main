import Sidebar from "@/components/Dashboard/Sidebar";
import { SignOutButton } from "@clerk/clerk-react";
import React from "react";
import { Link, Navigate, Outlet } from "react-router";

export const DashboardLayout = () => {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <div>
                <Outlet />
                <SignOutButton>Sign out</SignOutButton>
            </div>
        </div>
    );
};

import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({children}) => {
    const { isSignedIn, user } = useUser();
    
    if(!isSignedIn || !user){
        return <Navigate to="/login" />
    }
    return children;
};

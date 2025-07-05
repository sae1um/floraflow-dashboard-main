import { useSignIn, useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({children}) => {
    const { isSignedIn, isLoaded } = useUser();
    
    if(!isSignedIn){
        return <Navigate to="/login" />
    }

    return children
};

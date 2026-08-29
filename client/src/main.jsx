import { StrictMode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";
import Landing from "./features/landing/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { DashboardLayout } from "./features/dashboard-shell/DashboardLayout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import OnboardingCheck from "./features/onboarding/OnboardingCheck";
import OnboardingPage from "./features/onboarding/Onboarding";
import DashboardHome from "./features/dashboard-shell/DashboardHome";
import GreenhousesPage from "./features/greenhouses/GreenhousesListPage";
import GreenhouseDetailsPage from "./features/greenhouses/GreenhouseDetailsPage";
import { TooltipProvider } from "@/components/ui/tooltip";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "*",
                element: <ErrorElement />,
            },
            {
                // Incase someone needs to go back to the landing page ig
                path: "landing",
                element: <Landing />,
            },
        ],
    },
    {
        path: "/onboarding",
        element: (
            <OnboardingCheck>
                <OnboardingPage />
            </OnboardingCheck>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <TooltipProvider>
                    <DashboardLayout />
                </TooltipProvider>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "greenhouses",
                element: <GreenhousesPage />,
            },
            {
                path: "greenhouses/:id",
                element: <GreenhouseDetailsPage />,
            },
        ],
    },
    {
        path: "/support",
        element: <div>Support Page</div>,
    },
    {
        path: "/docs",
        element: <div>Documentation Page</div>,
    },
    {
        path: "/test",
        element: <div> Test Page</div>,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            signInUrl="/login"
            signUpUrl="/register"
            signInFallbackRedirectUrl="/"
            signUpFallbackRedirectUrl="/"
            afterSignOutUrl="/"
            appearance={{
                cssLayerName: "clerk",
            }}
        >
            <RouterProvider router={router} />
        </ClerkProvider>
    </StrictMode>,
);

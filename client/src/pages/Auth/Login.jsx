import {Link} from "react-router"
import { ArrowLeft, Leaf } from "lucide-react"
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
    return (
        <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-primary/10 via-white to-teal-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                {/* Header */}
                <div className="text-center">
                    <Link
                        to={"/"}
                        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to home</span>
                    </Link>

                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                            FloraFlow
                        </span>
                    </div>
                </div>

                {/* Clerk Signin Component */}
                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-primary"
                        }
                    }}
                />
            </div>
        </div>
    );
}

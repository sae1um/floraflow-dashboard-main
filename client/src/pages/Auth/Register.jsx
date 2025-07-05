import { Link } from "react-router";
import { ArrowLeft, Leaf, Check } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SignUp } from "@clerk/clerk-react";

export default function Register() {
    const benefits = [
        "Real-time greenhouse monitoring",
        "Automated climate control",
        "Web acces on Mobile",
        "Cloud data storage",
        "Troubleshooting support",
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="flex min-h-screen">
                {/* Left side - Benefits */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-12">
                    <div className="max-w-md">
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                                <Leaf className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">
                                FloraFlow
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Join thousands of smart growers
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Start your journey to smarter, more efficient
                            greenhouse management today.
                        </p>

                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li
                                    key={index}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <Check className="h-3 w-3 text-emerald-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right side - Registration Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-12">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center">
                            <Link
                                to={"/"}
                                className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to home</span>
                            </Link>

                            <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                                    <Leaf className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    FloraFlow
                                </span>
                            </div>
                        </div>
                        <SignUp 
                            appearance={{
                                elements:{
                                    formButtonPrimary: "bg-emerald-500"
                                }
                            }}     
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

import {Link} from "react-router"
import { ArrowLeft, Leaf } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
    return (
        <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link
                        to={"/"}
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to home</span>
                    </Link>

                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            FloraFlow
                        </span>
                    </div>
                </div>

                {/* Login Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center text-gray-900">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            Sign in to your account to continue
                        </CardDescription>
                    </CardHeader>
                        {/* Auth Form Component */}
                            {"AUTH FORM COMPONENT"}
                        {/* ----------------- */}
                    <CardContent className="pb-8">

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to={"/register"}
                                    className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-xs text-center text-gray-500">
                                By signing in, you agree to our{" "}
                                <Link
                                    to={""}
                                    className="text-emerald-600 hover:text-emerald-500"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    to={""}
                                    className="text-emerald-600 hover:text-emerald-500"
                                >
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

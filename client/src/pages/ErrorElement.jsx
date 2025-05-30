import { Home, ArrowLeft, Leaf, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";


export default function ErrorElement() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            <div className="max-w-2xl mx-auto text-center">
                {/* Logo */}
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Leaf className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900">
                        FloraFlow
                    </span>
                </div>

                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="text-9xl font-bold text-emerald-600 mb-4 leading-none">
                        404
                    </div>
                    <div className="relative">
                        <div className="w-32 h-32 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="h-16 w-16 text-emerald-600" />
                        </div>
                        {/* Floating leaves animation */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                            <Leaf
                                className="h-6 w-6 text-emerald-400 animate-bounce"
                                style={{ animationDelay: "0s" }}
                            />
                        </div>
                        <div className="absolute top-4 right-1/4 transform translate-x-4">
                            <Leaf
                                className="h-4 w-4 text-green-400 animate-bounce"
                                style={{ animationDelay: "0.5s" }}
                            />
                        </div>
                        <div className="absolute top-8 left-1/4 transform -translate-x-4">
                            <Leaf
                                className="h-5 w-5 text-teal-400 animate-bounce"
                                style={{ animationDelay: "1s" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        Oops! It looks like this page has grown out of reach.
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button
                        asChild
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="javascript:history.back()">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Go Back
                        </Link>
                    </Button>
                </div>

                {/* Helpful Links */}
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Maybe you were looking for:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link
                                href="/"
                                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors text-left"
                            >
                                → Home Page
                            </Link>
                            <Link
                                href="/login"
                                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors text-left"
                            >
                                → Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors text-left"
                            >
                                → Create Account
                            </Link>
                            <Link
                                href="/#features"
                                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors text-left"
                            >
                                → Features
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Support */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Still can't find what you're looking for?{" "}
                        <Link
                            href="#"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            Contact our support team
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

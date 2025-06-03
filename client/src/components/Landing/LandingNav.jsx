import { useState } from "react";
import { Link } from "react-router";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
export default function LandingNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to={"/"} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            FloraFlow
                        </span>
                    </Link>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                            onClick={(e) => {
                                e.preventDefault();
                                document
                                    .getElementById("features")
                                    .scrollIntoView({ behavior: "smooth" });
                            }}
                            className="text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            Features
                        </a>
                        <Link
                            href="/docs"
                            className="text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            Docs
                        </Link>
                        <div className="flex flex-row gap-2">
                            <Link to={"/login"}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hover:cursor-pointer"
                                >
                                    Log in
                                </Button>
                            </Link>
                            <Link to={"/register"}>
                                <Button
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer"
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
                {/* Mobile Navigation Menu */}
                <AnimatePresence initial={mobileMenuOpen}>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-emerald-100 bg-white"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link
                                    href="#features"
                                    className="block px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Features
                                </Link>
                                <Link
                                    href="/docs"
                                    className="block px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Docs
                                </Link>
                                <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
                                    <div className="space-y-2">
                                        <Link to={"/login"}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="hover:cursor-pointer"
                                            >
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link to={"/register"}>
                                            <Button
                                                size="sm"
                                                className="bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer"
                                            >
                                                Register
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

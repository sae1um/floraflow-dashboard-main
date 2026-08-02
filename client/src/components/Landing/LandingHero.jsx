import React from "react";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";

function LandingHero() {
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                        <Zap className="w-4 h-4 mr-2" />
                        Next-generation greenhouse monitoring
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                        Smart Agriculture
                        <br />
                        <span className="text-primary">Made Simple</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                        Monitor, control, and optimise your greenhouse
                        environment with our advanced IoT platform. Real-time
                        insights, automated controls, and analytics for maximum
                        yield.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={"/register"}>
                            <Button
                                size="lg"
                                className="text-lg px-8 py-3 cursor-pointer"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to={"/demo"}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-3 cursor-pointer"
                            >
                                Try Demo
                            </Button>
                        </Link>
                    </div>
                    <motion.a
                        href="#features"
                        whileHover={{ scale: 1.05, y: 5 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("features")?.scrollIntoView({behavior: "smooth"})
                        }}
                        className="flex flex-col items-center justify-center mt-4 text-lg font-semibold text-muted-foreground"
                    >
                        Learn More
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1.5,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300 group-hover:scale-125"
                            >
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                            </svg>
                        </motion.div>
                    </motion.a>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
            </div>
        </section>
    );
}

export default LandingHero;

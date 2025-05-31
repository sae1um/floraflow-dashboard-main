import { Card, CardContent } from "@/components/ui/card";
import {
    ChartSpline,
    Cloud,
    Leaf,
    Shield,
    Smartphone,
    Zap,
} from "lucide-react";

export default function LandingFeatures() {
    const featureList = [
        {
            icon: ChartSpline,
            title: "Real-time Analytics",
            description:
                "Monitor temperature, humidity, soil moisture, and light levels with precision sensors and instant alerts.",
            colour: "text-emerald-600",
            bg: "bg-emerald-100",
        },
        {
            icon: Smartphone,
            title: "Access from Anywhere",
            description:
                "Control your greenhouse remotely via our web dashboard, and remote automation features.",
            colour: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            icon: Zap,
            title: "Automated Controls",
            description:
                "Set up automated actions based on sensor data, automatically responding to plants needs.",
            colour: "text-purple-600",
            bg: "bg-purple-100",
        },
        {
            icon: Cloud,
            title: "Cloud Integration",
            description:
                "Secure cloud storage with advanced analytics, historical data viewing.",
            colour: "text-sky-600",
            bg: "bg-sky-100",
        },
        {
            icon: Shield,
            title: "Advanced Security",
            description:
                "Enterprise-grade security with encrypted data transmission, ensuring your data is safe and private.",
            colour: "text-red-600",
            bg: "bg-red-100",
        },
        {
            icon: Leaf,
            title: "Sustainable Growing",
            description:
                "Optimise resource usage, reduce waste, and maximise yield with data driven growing strategies.",
            colour: "text-green-600",
            bg: "bg-green-100",
        },
    ];
    return (
        <section id="features" className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything you need to grow smarter
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive monitoring and control systems designed
                        for modern agriculture
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                className="p-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                key={index}
                            >
                                <CardContent className="p-6">
                                    <div
                                        className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mb-6`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${feature.colour}`}
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

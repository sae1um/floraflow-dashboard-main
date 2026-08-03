import { Activity, BarChart3, Wifi } from "lucide-react";

const features = [
    {
        icon: Wifi,
        bg: "bg-emerald-100",
        fg: "text-emerald-600",
        title: "Live Monitoring",
        description:
            "Real-time readings from every sensor, streamed straight to your dashboard — day or night.",
    },
    {
        icon: Activity,
        bg: "bg-blue-100",
        fg: "text-blue-600",
        title: "Smart Automation",
        description:
            "Schedule irrigation, lighting and ventilation once, then let FloraFlow keep the rhythm.",
    },
    {
        icon: BarChart3,
        bg: "bg-orange-100",
        fg: "text-orange-700",
        title: "Growth Analytics",
        description:
            "Trend charts across every greenhouse show what is working before problems show up.",
    },
];

export default function LandingFeatures() {
    return (
        <section id="features" className="mx-auto max-w-[1100px] px-6 py-24">
            <div className="mx-auto mb-14 max-w-[560px] text-center">
                <div className="text-[13px] font-bold tracking-[.06em] text-emerald-600 uppercase">
                    Why growers choose FloraFlow
                </div>
                <h2 className="mt-2.5 text-[32px] font-extrabold tracking-[-0.01em] text-gray-900">
                    Everything your garden needs to thrive
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className="flex flex-col gap-3.5 rounded-[14px] border border-gray-200 bg-white p-7 transition-all hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                        >
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-[11px] ${feature.bg}`}
                            >
                                <Icon className={`h-5.5 w-5.5 ${feature.fg}`} />
                            </div>
                            <div className="text-[17px] font-bold text-gray-900">
                                {feature.title}
                            </div>
                            <div className="text-sm leading-relaxed text-gray-500">
                                {feature.description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

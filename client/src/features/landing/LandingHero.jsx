import { Leaf, Wifi, Thermometer, Droplet, Wind } from "lucide-react";
import { Link } from "react-router";

const heroStats = [
    {
        icon: Thermometer,
        bg: "bg-orange-100",
        fg: "text-orange-700",
        value: "23.4°C",
        label: "Avg Temp",
    },
    {
        icon: Droplet,
        bg: "bg-blue-100",
        fg: "text-blue-700",
        value: "64%",
        label: "Humidity",
    },
    {
        icon: Wind,
        bg: "bg-emerald-100",
        fg: "text-emerald-700",
        value: "840",
        label: "CO₂ ppm",
    },
    {
        icon: Droplet,
        bg: "bg-emerald-100",
        fg: "text-emerald-600",
        value: "71%",
        label: "Water Level",
    },
];

export default function LandingHero() {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(150deg,#065f46_0%,#047857_45%,#10b981_100%)] px-6 pt-22 pb-[110px]">
            <div className="pointer-events-none absolute -top-15 -right-15 opacity-15 motion-safe:animate-[ff-float_6s_ease-in-out_infinite]">
                <Leaf className="h-[320px] w-[320px] text-white" strokeWidth={1.5} />
            </div>
            <div className="pointer-events-none absolute -bottom-25 -left-10 opacity-10 motion-safe:animate-[ff-float_7s_ease-in-out_infinite_1s]">
                <Leaf className="h-[260px] w-[260px] text-white" strokeWidth={1.5} />
            </div>

            <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-5.5 text-center">
                <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[13px] font-semibold text-emerald-50">
                    <Wifi className="h-3.5 w-3.5 text-emerald-200" />
                    Live sensor monitoring, wherever you garden
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
                    Your greenhouses, watched over like a green thumb never
                    sleeps
                </h1>
                <p className="max-w-[560px] text-base sm:text-[17px] leading-relaxed text-emerald-100">
                    FloraFlow keeps an eye on temperature, humidity, CO₂ and
                    water across every greenhouse you grow in — so small
                    problems never turn into lost harvests.
                </p>
                <div className="mt-1.5 flex flex-wrap justify-center gap-3">
                    <Link
                        to="/register"
                        className="rounded-[9px] bg-white px-6.5 py-3.5 text-[15px] font-bold text-emerald-700 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:bg-emerald-50 transition-colors"
                    >
                        Start growing free
                    </Link>
                    <Link
                        to="/demo"
                        className="rounded-[9px] border border-white/30 bg-white/12 px-6.5 py-3.5 text-[15px] font-bold text-white hover:bg-white/20 transition-colors"
                    >
                        Watch a live feed
                    </Link>
                </div>
            </div>

            <div className="relative z-10 mx-auto mt-14 max-w-[1040px] rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
                <div className="mb-3.5 flex gap-2.5">
                    <span className="h-[11px] w-[11px] rounded-full bg-red-300" />
                    <span className="h-[11px] w-[11px] rounded-full bg-amber-300" />
                    <span className="h-[11px] w-[11px] rounded-full bg-green-300" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {heroStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="flex flex-col gap-2 rounded-[10px] border border-gray-200 bg-gray-50 p-3.5"
                            >
                                <div
                                    className={`flex h-7 w-7 items-center justify-center rounded-[7px] ${stat.bg}`}
                                >
                                    <Icon
                                        className={`h-3.5 w-3.5 ${stat.fg}`}
                                    />
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                                <div className="text-[11.5px] text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

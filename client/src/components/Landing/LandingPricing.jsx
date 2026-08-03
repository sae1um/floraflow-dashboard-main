import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

const tiers = [
    {
        name: "Basic",
        price: "Free",
        period: "/forever",
        description: "For a single greenhouse and the basics.",
        perks: [
            "1 greenhouse",
            "Live sensor readings",
            "Email alerts",
            "7-day history",
        ],
        cta: "Start free",
        to: "/register",
        featured: false,
    },
    {
        name: "Pro",
        price: "$9.99",
        period: "/month",
        description: "For serious growers running multiple houses.",
        perks: [
            "Up to 10 greenhouses",
            "Automation schedules",
            "Live camera feeds",
            "1-year history",
            "Priority support",
        ],
        cta: "Start Pro trial",
        to: "/register",
        featured: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For farms and operations at scale.",
        perks: [
            "Unlimited greenhouses",
            "Custom integrations",
            "Dedicated support",
            "SLA & onboarding",
        ],
        cta: "Contact sales",
        to: "/support",
        featured: false,
    },
];

export default function LandingPricing() {
    return (
        <section id="pricing" className="mx-auto max-w-[1100px] px-6 py-24">
            <div className="mx-auto mb-14 max-w-[560px] text-center">
                <div className="text-[13px] font-bold tracking-[.06em] text-emerald-600 uppercase">
                    Simple pricing
                </div>
                <h2 className="mt-2.5 text-[32px] font-extrabold tracking-[-0.01em] text-gray-900">
                    Grow at your own pace
                </h2>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                {tiers.map((tier) => (
                    <div
                        key={tier.name}
                        className={`relative flex flex-col gap-3.5 rounded-[14px] p-7 ${
                            tier.featured
                                ? "bg-[linear-gradient(160deg,#065f46,#047857)] shadow-[0_16px_40px_rgba(4,120,87,0.3)]"
                                : "border border-gray-200 bg-white"
                        }`}
                    >
                        {tier.featured && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3.5 py-1.5 text-[11.5px] font-bold text-white">
                                Most Popular
                            </div>
                        )}
                        <div
                            className={`text-base font-bold ${
                                tier.featured ? "text-white" : "text-gray-900"
                            }`}
                        >
                            {tier.name}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <div
                                className={`text-4xl font-extrabold ${
                                    tier.featured
                                        ? "text-white"
                                        : "text-gray-900"
                                }`}
                            >
                                {tier.price}
                            </div>
                            <div
                                className={`text-[13px] ${
                                    tier.featured
                                        ? "text-emerald-100"
                                        : "text-gray-500"
                                }`}
                            >
                                {tier.period}
                            </div>
                        </div>
                        <div
                            className={`mb-1.5 text-[13.5px] ${
                                tier.featured
                                    ? "text-emerald-100"
                                    : "text-gray-500"
                            }`}
                        >
                            {tier.description}
                        </div>
                        <div className="flex flex-1 flex-col gap-2.5">
                            {tier.perks.map((perk) => (
                                <div
                                    key={perk}
                                    className={`flex items-center gap-2 text-[13.5px] ${
                                        tier.featured
                                            ? "text-emerald-50"
                                            : "text-gray-700"
                                    }`}
                                >
                                    <CheckCircle2
                                        className={`h-[15px] w-[15px] flex-shrink-0 ${
                                            tier.featured
                                                ? "text-emerald-200"
                                                : "text-emerald-600"
                                        }`}
                                    />
                                    {perk}
                                </div>
                            ))}
                        </div>
                        <Link
                            to={tier.to}
                            className={`rounded-lg p-3 text-center text-sm font-bold transition-colors ${
                                tier.featured
                                    ? "bg-white text-emerald-700 hover:bg-emerald-50"
                                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            }`}
                        >
                            {tier.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

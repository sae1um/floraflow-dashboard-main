const steps = [
    {
        n: 1,
        title: "Pair your greenhouse",
        description:
            "Enter your device ID and FloraFlow connects to your sensors in seconds — no wiring, no fuss.",
    },
    {
        n: 2,
        title: "Watch it grow",
        description:
            "Alerts, schedules and live feeds land in one dashboard, so you always know how your garden is doing.",
    },
];

export default function LandingHowItWorks() {
    return (
        <section id="how" className="bg-emerald-50 px-6 py-24">
            <div className="mx-auto max-w-[1000px]">
                <div className="mx-auto mb-14 max-w-[560px] text-center">
                    <div className="text-[13px] font-bold tracking-[.06em] text-emerald-600 uppercase">
                        Get growing in minutes
                    </div>
                    <h2 className="mt-2.5 text-[32px] font-extrabold tracking-[-0.01em] text-gray-900">
                        How it works
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {steps.map((step) => (
                        <div key={step.n} className="flex items-start gap-4.5">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-extrabold text-white">
                                {step.n}
                            </div>
                            <div>
                                <div className="mb-1.5 text-lg font-bold text-gray-900">
                                    {step.title}
                                </div>
                                <div className="text-sm leading-relaxed text-gray-700">
                                    {step.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

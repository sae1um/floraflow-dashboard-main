import { Leaf } from "lucide-react";
import { Link } from "react-router";

const footerCols = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "How it Works", href: "#how" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Status", href: "#" },
        ],
    },
];

export default function LandingFooter() {
    return (
        <footer className="bg-gray-900 px-6 pt-14 pb-8">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-10">
                <div className="flex flex-wrap justify-between gap-10">
                    <div className="flex max-w-[280px] flex-col gap-3.5">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-emerald-600">
                                <Leaf className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-base font-extrabold text-white">
                                FloraFlow
                            </span>
                        </Link>
                        <div className="text-[13.5px] leading-relaxed text-gray-400">
                            Smart monitoring for greenhouses and growers of
                            every size.
                        </div>
                    </div>
                    {footerCols.map((col) => (
                        <div
                            key={col.title}
                            className="flex min-w-[120px] flex-col gap-3"
                        >
                            <div className="text-[12.5px] font-bold tracking-[.04em] text-white uppercase">
                                {col.title}
                            </div>
                            {col.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-[13.5px] text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap justify-between gap-2.5 border-t border-gray-800 pt-6">
                    <div className="text-[12.5px] text-gray-500">
                        © 2026 FloraFlow. All rights reserved.
                    </div>
                    <div className="text-[12.5px] text-gray-500">
                        Made for growers, by growers.
                    </div>
                </div>
            </div>
        </footer>
    );
}

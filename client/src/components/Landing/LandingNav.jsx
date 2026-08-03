import { useState } from "react";
import { Link } from "react-router";
import { Leaf, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
];

function ScrollLink({ href, className, onClick, children }) {
    return (
        <a
            href={href}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                document
                    .querySelector(href)
                    ?.scrollIntoView({ behavior: "smooth" });
                onClick?.();
            }}
        >
            {children}
        </a>
    );
}

export default function LandingNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="h-[3px] bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-800" />
            <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-8 py-3.5">
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-emerald-600">
                        <Leaf className="h-[19px] w-[19px] text-white" />
                    </div>
                    <span className="text-lg font-extrabold tracking-tight text-gray-900">
                        FloraFlow
                    </span>
                </Link>

                <nav className="hidden min-[860px]:flex items-center gap-7">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors"
                        >
                            {link.label}
                        </ScrollLink>
                    ))}
                </nav>

                <div className="hidden min-[860px]:flex items-center gap-2.5">
                    <Link
                        to="/login"
                        className="rounded-lg px-4 py-2.5 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors just"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="rounded-lg bg-red-600 px-4.5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-emerald-700 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    className="min-[860px]:hidden p-1.5 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-[22px] w-[22px] text-gray-900" />
                    ) : (
                        <Menu className="h-[22px] w-[22px] text-gray-900" />
                    )}
                </button>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="min-[860px]:hidden overflow-hidden border-b border-gray-200 bg-white"
                    >
                        <div className="flex flex-col gap-3.5 px-8 py-4">
                            {navLinks.map((link) => (
                                <ScrollLink
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-[14.5px] font-medium text-gray-700"
                                >
                                    {link.label}
                                </ScrollLink>
                            ))}
                            <div className="h-px bg-gray-100" />
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-semibold text-gray-700"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

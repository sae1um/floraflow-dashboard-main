import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function LandingCTA() {
    return (
        <section className="py-20 bg-primary mt-4">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to revolutionize your greenhouse?</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Join thousands of growers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={"/register"}>
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to={"/support"}>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 py-3 border-white text-black hover:bg-white hover:text-primary"
                        >
                            Contact Support
                        </Button>
                    </Link>
                    </div>
            </div>
        </section>
    );
}

import { Leaf } from "lucide-react";
import { Link } from "react-router";

export default function LandingFooter() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">FloraFlow</span>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-400">
                        <Link
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Support
                        </Link>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 FloraFlow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

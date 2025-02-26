import { Button } from "@mui/material"
import { Leaf, BarChart2, Thermometer, Droplets, Sun } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" to="/">
                    <Leaf className="h-6 w-6 text-green-500" />
                    <span className="ml-2 text-2xl font-bold">FloraFlow</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
                        Log In
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" to="/register">
                        Register
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6 self-center">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Welcome to FloraFlow
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    The smart garden monitoring solution for your greenhouse needs.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link to="/register">
                                    <Button variant="contained" sx={{ backgroundColor: "#22c55e" }}>
                                        Get Started
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outlined" sx={{ borderColor: "#22c55e", color: "black", ":hover": { backgroundColor: "#F1FFEA" } }}>
                                        Log In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Features</h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <BarChart2 className="h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Track temperature, humidity, and light levels in real-time.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Thermometer className="h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-bold">Temperature Control</h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Maintain optimal growing conditions with precise temperature management.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Droplets className="h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-bold">Humidity Management</h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Keep your plants healthy with automated humidity control.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Sun className="h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-bold">Light Optimization</h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Ensure your plants receive the right amount of light at all times.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FloraFlow. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" to="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" to="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}


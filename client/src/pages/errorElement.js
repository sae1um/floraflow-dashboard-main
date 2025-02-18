import { Link } from "react-router-dom";
import floraflowLogo from "../media/images/logos/floraflowLogo.png"
export default function ErrorElementPage(){
    return (
        <main class="grid min-h-screen place-items-center bg-white bg-gradient-to-b from-[#acffcc] to-[#e8fcf1] px-6 py-24 pt-10 sm:py-32 lg:px-8">
            <div class="text-center">
                <img src={floraflowLogo} alt="FloraFlow logo with greenleaf" />
                <p class="text-base font-semibold text-[#49bb1c]">404</p>
                <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <Link to={-1} class="rounded-md bg-[#4276d0] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</Link>
                    <Link to={"/support"} class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </main>
    )
}
import React from "react"
import classNames from "classnames"
import Logo from "../image/Logo.png"
import { Link, useLocation } from "react-router-dom"
import { SIDEBAR_ANALYTICS_LINKS, SIDEBAR_BOTTOM_LINKS, SIDEBAR_CONTROLS_LINKS, SIDEBAR_DASHBOARD } from "./lib/consts/navigation"


const linkClass = 'flex items-center gap-2 font-semibold px-3 py-2 hover:bg-green-200 hover:no-underline hover:rounded-lg active:bg-[#31CF23] rounded-lg text-sm text-[#696D72]'

export default function SideBar(){
    return(
        <div className="flex flex-col w-64 p-3 gap-1 fixed h-screen">
            <div className="flex items-center"><Link to={"/"}><img src={Logo} alt={""}/></Link></div>
            <div className="flex-1 py-2">
                {SIDEBAR_DASHBOARD.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <p className="text-gray-400 text-lg px-4 font-medium mt-2 ">ANALYTICS</p>
                {SIDEBAR_ANALYTICS_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <p className="text-gray-400 text-lg px-4 font-medium mt-2">CONTROLS</p>
                {SIDEBAR_CONTROLS_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-400">
                {SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <div>
                        <SidebarLink key={item.key} item={item}/>
                    </div>
                ))}
            </div>
            {/* <div className={classNames(linkClass, "text-red-700")}>
                <HiOutlineLogout className="text-xl" />
                <p>Logout</p>
            </div> */}
        </div>
    )
}

function SidebarLink({ item }){
    const { pathname } = useLocation()

    return(
        <Link to={item.path} className={classNames(pathname === item.path ? "bg-[#31CF23] rounded-lg text-white ": "" , linkClass)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}
import { Outlet } from "react-router-dom"
import SideBar from "../sidebar"
import Header from "../header";

export default function Layout(){
    return(
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-x-hidden">
            <SideBar />
            <div className="h-screen pb-4 bg-[#E5E5E5] w-full flex flex-col ml-64" >
                <Header/>
                <div className="size-full overflow-y-auto overflow-x-hidden">{<Outlet />}</div> {/*This is the component for the dashboard */}
            </div>
        </div>
    );
} 
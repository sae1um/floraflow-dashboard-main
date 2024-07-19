import { HiOutlineSearch } from "react-icons/hi";

export default function Header(){
    return(
        <div className="bg-neutral-100 h-12">
            <div className="flex flex-row items-center h-full pl-4">
                <input className=" rounded-l-lg p-1" type="text" placeholder="Search..."/> 
                <button className="bg-[#31CF23] p-2 rounded-r-lg hover:bg-green-400">
                    <HiOutlineSearch />       
                </button>
            </div>
        </div>
    )
}
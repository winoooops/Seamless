import { Navbar } from "./Navbar";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

interface Props {
   isCollapsed: boolean;
   toggle: () => void;
}

export function Sidebar({ isCollapsed, toggle }: Props) {
   return (
      <aside
         className={`${
            isCollapsed ? "w-16" : "w-48"
         } flex flex-col border-r border-white/5 bg-black/20 transition-all duration-300 ease-in-out`}
      >
         <Navbar isCollapsed={isCollapsed} />

         <div className="h-14 flex items-center px-4 border-b border-white/5">
            <div className="font-bold text-xl tracking-tight bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
               {isCollapsed ? "S" : "SEAMLESS"}
            </div>
         </div>

         <div className="p-4 border-t border-white/5">
            <button
               onClick={toggle}
               className="p-2 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors w-full flex justify-center"
            >
               {isCollapsed ? <ArrowRightToLine /> : <ArrowLeftToLine />}
            </button>
         </div>
      </aside>
   );
}

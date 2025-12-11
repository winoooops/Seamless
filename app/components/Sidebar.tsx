import Button from "../_components/Button";
import { Navbar } from "./Navbar";
import { PanelLeft } from "lucide-react";

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
         <div className="p-4 border-t border-white/5">
            <Button
               onClick={toggle}
               hasIcon
               color="outline"
               className="border-0"
            >
               <PanelLeft size={16} />
            </Button>
         </div>

         <Navbar isCollapsed={isCollapsed} />

         <div className="h-14 flex items-center px-4 border-b border-white/5">
            <div className="font-bold text-xl tracking-tight bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
               {isCollapsed ? "S" : "SEAMLESS"}
            </div>
         </div>
      </aside>
   );
}

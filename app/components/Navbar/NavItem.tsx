import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<typeof Link> & {
   icon: ReactNode;
   label: string;
   isCollapsed: boolean;
};

export function NavItem({ icon, label, isCollapsed, ...others }: Props) {
   const active = usePathname().startsWith(others.href.toString());

   return (
      <button
         className={`w-full rounded-md transition-all duration-200 ${
            active
               ? "bg-blue-500/10 text-blue-400"
               : "text-gray-400 hover:bg-white/5 hover:text-white"
         }`}
         role="group"
      >
         <Link
            href={others.href}
            className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start"} gap-6 px-6 py-4`}
            role="link"
            aria-label={`Main Menu Item ${label}`}
         >
            <div
               className={`w-5 h-5 flex items-center justify-center ${active ? "text-blue-400" : "text-gray-500 group-hover:text-white"}`}
            >
               {icon}
            </div>

            {!isCollapsed && (
               <span className="text-sm font-medium whitespace-nowrap">
                  {label}
               </span>
            )}
         </Link>
      </button>
   );
}

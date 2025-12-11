import Button from "@/app/_components/Button";
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
      <Button
         isFullWidth
         color={active ? "navActive" : "nav"}
         size="lg"
         role="group"
      >
         <Link
            href={others.href}
            className={`flex space-x-4 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
            role="link"
            aria-label={`Main Menu Item ${label}`}
         >
            <div
               className={`w-5 h-5 flex items-center justify-center`}
            >
               {icon}
            </div>

            {!isCollapsed && (
               <span className="text-sm font-medium whitespace-nowrap">
                  {label}
               </span>
            )}
         </Link>
      </Button>
   );
}

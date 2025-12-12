import {
   LayoutDashboard,
   LineChart,
   Settings,
   Trophy,
   Wallet,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { ComponentProps } from "react";

interface Props {
   isCollapsed: boolean;
}

export function Navbar({ isCollapsed }: Props) {
   const items: ComponentProps<typeof NavItem>[] = [
      {
         icon: <LayoutDashboard />,
         href: "/dashboard",
         label: "Dashboard",
         isCollapsed,
      },
      {
         icon: <LineChart />,
         href: "/career",
         label: "Career",
         isCollapsed,
      },
      {
         icon: <Wallet />,
         href: "/portfolios",
         label: "Portfolios",
         isCollapsed,
      },
      {
         icon: <Trophy />,
         href: "/bounties",
         label: "Bounties",
         isCollapsed,
      },
      {
         icon: <Settings />,
         href: "/settings",
         label: "Settings",
         isCollapsed,
      },
   ];

   return (
      <nav aria-label="Main Menu" className="flex-1 py-4 px-2 space-y-4">
         {items.map((item) => (
            <NavItem key={item.label} {...item} />
         ))}
      </nav>
   );
}

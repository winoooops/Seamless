"use client";

import { PortfolioAllocation } from "./components/PortfolioAllocation";
import { CareerChart } from "./components/CareerChart";
import { AssetsTable } from "../components/AssetsTable";
import { BentoGrid } from "../_components/Bento/BentoGrid";
import { BentoCard } from "../_components/Bento/BentoCard";
import { LayoutDashboard, PieChart, TrendingUp } from "lucide-react";
import { Banner } from "../components/Banner";
import Button from "../_components/Button";
import CurrencyDropdown from "../components/CurrencyDropdown";

export default function Dashboard() {
   return (
      <div className="p-4 md:p-8 min-h-screen">
         <Banner
            className="max-w-1/2"
            username="Will"
            total={123000}
            action={
               <div className="h-full flex flex-col items-start justify-between space-y-4">
                  <CurrencyDropdown />
                  <Button color="primary" className="w-30">
                     Connect Wallet
                  </Button>
               </div>
            }
         />

         <BentoGrid>
            {/* Main Assets Table - Spans 3 columns */}
            <BentoCard
               title="Assets Overview"
               description="Real-time capability tracking"
               icon={<LayoutDashboard className="w-5 h-5" />}
               className="lg:col-span-4 lg:row-span-2 min-h-[400px]"
            >
               <AssetsTable className="h-full" />
            </BentoCard>

            {/* Career Chart - Tall side widget */}
            <BentoCard
               title="Career Growth"
               description="Trajectory analysis"
               icon={<TrendingUp className="w-5 h-5" />}
               className="lg:col-span-2 lg:row-span-2 min-h-[300px]"
            >
               <CareerChart />
            </BentoCard>

            {/* Portfolio Allocation - Bottom strip or additional widget */}
            <BentoCard
               title="Allocation"
               description="Asset distribution"
               icon={<PieChart className="w-5 h-5" />}
               className="lg:col-span-2 min-h-[300px]"
            >
               <PortfolioAllocation />
            </BentoCard>
         </BentoGrid>
      </div>
   );
}

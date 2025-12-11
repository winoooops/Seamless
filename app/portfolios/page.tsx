"use client";

import { AssetsTable } from "../components/AssetsTable";
import { RightSidebar } from "../components/AssetsSidebar";
import { BentoGrid } from "../_components/Bento/BentoGrid";
import { BentoCard } from "../_components/Bento/BentoCard";
import { Wallet as WalletIcon } from "lucide-react";

export default function Wallet() {
   return (
      <div className="p-4 md:p-8 min-h-screen">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-neutral-400">
               Manage your assets and connections.
            </p>
         </div>

         <BentoGrid>
            {/* Main Assets Table */}
            <BentoCard
               title="All Assets"
               icon={<WalletIcon className="w-5 h-5" />}
               className="lg:col-span-3 min-h-[500px]"
            >
               <AssetsTable className="h-full" />
            </BentoCard>

            {/* Sidebar */}
            <BentoCard>
               <RightSidebar className="lg:col-span-1" />
            </BentoCard>
         </BentoGrid>
      </div>
   );
}

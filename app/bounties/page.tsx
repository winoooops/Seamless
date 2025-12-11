"use client";

import { Trophy } from "lucide-react";
import { BentoGrid } from "../_components/Bento/BentoGrid";
import { BentoCard } from "../_components/Bento/BentoCard";

export default function Bounties() {
   return (
      <div className="p-4 md:p-8 min-h-screen">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Bounties</h1>
            <p className="text-neutral-400">Explore and claim rewards.</p>
         </div>

         <BentoGrid>
            <BentoCard
               title="Available Bounties"
               icon={<Trophy className="w-5 h-5" />}
               className="lg:col-span-4 min-h-[400px] flex items-center justify-center"
            >
               <div className="text-neutral-500">Coming Soon</div>
            </BentoCard>
         </BentoGrid>
      </div>
   );
}

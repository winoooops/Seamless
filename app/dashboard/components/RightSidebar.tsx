"use client";

import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import { useState } from "react";
import { IDEWindow } from "../../components/IDEWindow";
import Button from "@/app/_components/Button";

export function RightSidebar() {
   const [selected, setSelected] = useState("all");
   const [search, setSearch] = useState("");

   const assets = [
      { id: "all", label: "All Assets", type: "system" },
      { id: "binance", label: "Binance", type: "cex" },
      { id: "okx", label: "OKX", type: "cex" },
   ];

   return (
      <IDEWindow className="h-full flex flex-col">
         {/* Search & Filter */}
         <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
               <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 pl-9 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
               />
               <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
            <button className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors text-gray-400">
               <SlidersHorizontal className="w-4 h-4" />
            </button>
         </div>

         {/* Asset List */}
         <div className="flex-1 space-y-2 overflow-y-auto">
            {assets.map((asset) => {
               const isSelected = selected === asset.id;
               return (
                  <div
                     key={asset.id}
                     onClick={() => setSelected(asset.id)}
                     className={`group flex items-center justify-between p-3 rounded border cursor-pointer transition-all ${
                        isSelected
                           ? "bg-white/10 border-white/20"
                           : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/5"
                     }`}
                  >
                     <div className="flex items-center gap-3">
                        <div
                           className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                 ? "border-blue-500 bg-blue-500/20"
                                 : "border-gray-600"
                           }`}
                        >
                           {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                           )}
                        </div>
                        <span className="font-medium text-sm text-gray-200">
                           {asset.label}
                        </span>
                     </div>
                     <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                     </button>
                  </div>
               );
            })}
         </div>

         {/* Connect More Button */}
         <div className="mt-4 pt-4 border-t border-white/5">
            <Button size="md" isFullWidth={true}>
               Connect More
            </Button>
         </div>
      </IDEWindow>
   );
}

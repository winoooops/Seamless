"use client";

import React from "react";

interface IDEWindowProps {
   title: string;
   children: React.ReactNode;
   className?: string;
   isActive?: boolean;
   onClose?: () => void;
   actions?: React.ReactNode;
}

export function IDEWindow({
   title,
   children,
   className = "",
   isActive = false,
   onClose,
   actions,
}: IDEWindowProps) {
   return (
      <div
         className={`flex flex-col rounded-lg border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl transition-all duration-200 ${isActive ? "ring-1 ring-blue-500/50" : ""} ${className}`}
      >
         {/* Window Header */}
         <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5 select-none">
            <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {title}
               </span>
            </div>
            <div className="flex items-center gap-3">
               {actions}
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-green-500/50 transition-colors cursor-pointer" />
                  <div
                     className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-red-500/50 transition-colors cursor-pointer"
                     onClick={onClose}
                  />
               </div>
            </div>
         </div>

         {/* Window Content */}
         <div className="flex-1 overflow-auto p-4 relative">{children}</div>
      </div>
   );
}

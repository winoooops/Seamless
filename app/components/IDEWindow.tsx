"use client";

import React from "react";
import Acccordian from "../_components/Accordian/Accordian";
import { twMerge } from "tailwind-merge";

interface IDEWindowProps {
   children: React.ReactNode;
   title?: string;
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
      <Acccordian
         title={title}
         actionSlot={
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
         }
         className={twMerge(
            className,
            `${isActive ? "ring-1 ring-blue-500/50" : ""}`,
         )}
      >
         {children}
      </Acccordian>
   );
}

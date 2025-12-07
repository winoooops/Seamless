"use client";

import { ReactNode, FC, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"div"> & {
   title?: string;
   actionSlot?: ReactNode;
};

const Acccordian: FC<Props> = ({ title, actionSlot, className, children }) => (
   <div
      className={twMerge(
         "flex flex-col rounded-lg border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-xl transition-all duration-200",
         className,
      )}
   >
      {/* Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5 select-none">
         {title && (
            <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {title}
               </span>
            </div>
         )}
         {actionSlot}
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-4 relative">{children}</div>
   </div>
);

export default Acccordian;

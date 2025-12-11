"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BentoCardProps {
   children: ReactNode;
   className?: string;
   title?: string;
   description?: string;
   icon?: ReactNode;
   headerAction?: ReactNode;
}

export const BentoCard = ({
   children,
   className,
   title,
   description,
   icon,
   headerAction,
}: BentoCardProps) => {
   return (
      <div
         className={twMerge(
            "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl",
            "bg-[#0A0A0A] border border-white/5",
            "hover:border-white/10 transition-colors duration-300",
            "shadow-xl shadow-black/20",
            className,
         )}
      >
         {/* Background gradient/glow effect */}
         <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

         <div className="relative z-10 flex flex-col h-full">
            {(title || icon || headerAction) && (
               <div className="flex items-center justify-between p-6 pb-2">
                  <div className="flex items-center gap-2">
                     {icon && <div className="text-emerald-500">{icon}</div>}
                     <div>
                        {title && (
                           <h3 className="font-semibold text-neutral-200">
                              {title}
                           </h3>
                        )}
                        {description && (
                           <p className="text-xs text-neutral-500 mt-0.5">
                              {description}
                           </p>
                        )}
                     </div>
                  </div>
                  {headerAction}
               </div>
            )}
            <div className="flex-1 p-6 pt-2">{children}</div>
         </div>
      </div>
   );
};

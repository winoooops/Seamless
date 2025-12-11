"use client";

import { ComponentProps, FC, ReactNode } from "react";
import formatMoney from "../utilities/formatMoney";
import { UseLocale } from "../localeProvider";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"div"> & {
   username: string;
   total: number;
   action?: ReactNode;
};

export const Banner: FC<Props> = ({ username, total, action, className }) => {
   const { currency, locale } = UseLocale();
   const worth = formatMoney(total, { currency, locale });

   return (
      <div
         className={twMerge(
            "flex items-end",
            action ? "justify-between" : "justify-start",
            className,
         )}
      >
         <div className="space-y-8 mb-6">
            <h1 className="font-bold text-neutral-200 text-3xl">
               Good Morning, {username}
            </h1>
            <div className="flex flex-col items-start space-y-4">
               <h2 className="font-semibold text-neutral-300">Total Worth</h2>
               <p className="text-3xl font-extrabold">{worth}</p>
            </div>
         </div>

         {action && <div className="mb-6">{action}</div>}
      </div>
   );
};

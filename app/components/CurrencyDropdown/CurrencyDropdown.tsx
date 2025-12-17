"use client";

import Dropdown, { Menu, MenuItem, Trigger } from "@/app/_components/Dropdown";
import { UseLocale } from "@/app/localeProvider";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import CurrencyLogo from "./_components/CurrencyLogo";

const CurrencyDropdown: FC = () => {
   const { currencies, currency, updateCurrency } = UseLocale();

   if (!currency) {
      return null;
   }

   return (
      <Dropdown value={currency.label} onSelect={(val) => updateCurrency(val)}>
         <Trigger className="w-32">
            <div className="flex items-center gap-2">
               <CurrencyLogo
                  src={currency.logo}
                  alt={currency.label}
                  onError={(e) => {
                     (e.target as HTMLImageElement).src =
                        "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons/128/color/usd.png";
                  }}
               />
               <span className="uppercase">{currency.label}</span>
               <ChevronDown className="w-4 h-4 ml-auto" />
            </div>
         </Trigger>
         <Menu>
            {currencies.map(({ value, label, logo }) => (
               <MenuItem
                  key={value}
                  value={value}
                  label={label}
                  prefix={
                     <CurrencyLogo
                        src={logo}
                        alt={label}
                        onError={(e) => {
                           (e.target as HTMLImageElement).src =
                              "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons/128/color/usd.png";
                        }}
                     />
                  }
               />
            ))}
         </Menu>
      </Dropdown>
   );
};

export default CurrencyDropdown;

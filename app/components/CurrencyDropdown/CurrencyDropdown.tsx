"use client";

import Dropdown, { Menu, MenuItem, Trigger } from "@/app/_components/Dropdown";
import { UseLocale } from "@/app/localeProvider";
import { ChevronDown, Coins } from "lucide-react";
import { FC, useState } from "react";
import CurrencyLogo from "./_components/CurrencyLogo";
import { getFiatFlagUrl } from "./_utils/currencyMapping";

const CurrencyDropdown: FC = () => {
   const { currencies, currency, updateCurrency } = UseLocale();
   const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

   const getOptimizedIconUrl = (symbol: string) => {
      // 1. Try Fiat First (Map Lookup) - Zero Latency for known Fiats
      const fiatUrl = getFiatFlagUrl(symbol);
      if (fiatUrl) return fiatUrl;

      // 2. Default to Crypto CDN
      return `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons/128/color/${symbol.toLowerCase()}.png`;
   };

   const handleImageError = (symbol: string) => {
      setFailedImages((prev) => {
         const next = new Set(prev);
         next.add(symbol);
         return next;
      });
   };

   if (!currency) {
      return null;
   }

   const renderLogo = (value: string, label: string, priority = false) => {
      if (failedImages.has(value)) {
         return <Coins className="w-5 h-5 text-gray-400 rounded-full" />;
      }
      return (
         <CurrencyLogo
            src={getOptimizedIconUrl(value)}
            alt={label}
            onError={() => handleImageError(value)}
            priority={priority}
         />
      );
   };

   return (
      <Dropdown value={currency.label} onSelect={(val) => updateCurrency(val)}>
         <Trigger className="w-32">
            <div className="flex items-center gap-2">
               {renderLogo(currency.value, currency.label, true)}
               <span className="uppercase">{currency.label}</span>
               <ChevronDown className="w-4 h-4 ml-auto" />
            </div>
         </Trigger>
         <Menu>
            {currencies.map(({ value, label }) => (
               <MenuItem
                  key={value}
                  value={value}
                  label={label}
                  prefix={renderLogo(value, label)}
               />
            ))}
         </Menu>
      </Dropdown>
   );
};

export default CurrencyDropdown;

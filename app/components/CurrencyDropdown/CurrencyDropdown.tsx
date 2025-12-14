"use client";

import Dropdown, { Menu, MenuItem, Trigger } from "@/app/_components/Dropdown";
import { UseLocale } from "@/app/localeProvider";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

const CurrencyDropdown: FC = () => {
   const { currencies, currency, updateCurrency } = UseLocale();

   const selectedLabel = currencies
      .find((option) => option.value === currency)
      ?.label.toLocaleUpperCase();

   return (
      <Dropdown value={currency} onSelect={(val) => updateCurrency(val)}>
         <Trigger className="w-30">
            <span>{selectedLabel}</span>
            <ChevronDown size={16} />
         </Trigger>
         <Menu>
            {currencies.map(({ value, label }) => (
               <MenuItem key={value} value={value} label={label} />
            ))}
         </Menu>
      </Dropdown>
   );
};

export default CurrencyDropdown;

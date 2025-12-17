"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import useCurrencies from "./api/coingecko/_hooks/useCurrencies";

interface LocalContextType {
   locale: string;
   currency: ReturnType<typeof useCurrencies>["data"][number] | undefined;
   currencies: ReturnType<typeof useCurrencies>["data"];
   updateLocale: (locale: string) => void;
   updateCurrency: (currency: string) => void;
}

const LocalContext = createContext<LocalContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
   const { data: currencies } = useCurrencies();
   const [locale, setLocale] = useState<string>("en-us");
   const [currency, setCurrency] = useState<string>("usd");

   const updateLocale = (locale: string) => setLocale(locale);

   const updateCurrency = (currency: string) => setCurrency(currency);

   const activeCurrency = currencies?.find((item) => item.label === currency);

   return (
      <LocalContext.Provider
         value={{
            locale,
            currency: activeCurrency,
            currencies,
            updateCurrency,
            updateLocale,
         }}
      >
         {children}
      </LocalContext.Provider>
   );
}

export function UseLocale() {
   const context = useContext(LocalContext);
   if (context === undefined) {
      throw new Error("UseLocale must be used within a LocaleProvider");
   }

   return context;
}

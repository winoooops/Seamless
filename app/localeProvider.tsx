"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface LocalContextType {
   locale: string;
   currency: string;
   updateLocale: (locale: string) => void;
   updateCurrency: (currency: string) => void;
}

const defaultContext: LocalContextType = {
   locale: "en-us",
   currency: "USD",
   updateLocale: () => {},
   updateCurrency: () => {},
};

const LocalContext = createContext<LocalContextType>(defaultContext);

export function LocaleProvider({ children }: { children: ReactNode }) {
   const [locale, setLocale] = useState<string>("en-us");
   const [currency, setCurrency] = useState<string>("USD");

   const updateLocale = (locale: string) => setLocale(locale);

   const updateCurrency = (currency: string) => setCurrency(currency);

   return (
      <LocalContext.Provider
         value={{ locale, currency, updateCurrency, updateLocale }}
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

import { createContext, useContext } from "react";

interface DropdownContextType {
   id: string;
   open: boolean;
   toggle: () => void;
   close: () => void;
   selectedValue: string;
   onSelect: (value: string) => void;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(
   undefined,
);

export const useDropdown = () => {
   const context = useContext(DropdownContext);

   if (!context) {
      throw new Error("useDropdown must be used within a DropdownProvider");
   }

   return context;
};

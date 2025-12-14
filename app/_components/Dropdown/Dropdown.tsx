"use client";

import { FC, PropsWithChildren, useId, useState } from "react";
import { DropdownContext } from "./_context";

type Props = PropsWithChildren & {
   value: string;
   onSelect: (val: string) => void;
};

const Dropdown: FC<Props> = ({ value, onSelect, children }) => {
   const [open, setOpen] = useState<boolean>(false);
   const id = `listbox-${useId()}`;

   const close = () => setOpen(false);

   const onItemSelect = (val: string) => {
      onSelect(val);
      close();
   };

   return (
      <DropdownContext.Provider
         value={{
            id,
            open,
            toggle: () => setOpen((prev) => !prev),
            close: () => setOpen(false),
            selectedValue: value,
            onSelect: onItemSelect,
         }}
      >
         <div role="group" className="relative">
            {children}
         </div>
      </DropdownContext.Provider>
   );
};

export default Dropdown;

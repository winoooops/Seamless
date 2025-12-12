import { FC, PropsWithChildren, useId, useState } from "react";
import Button from "../Button";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface DropdownOption {
   label: string;
   value: string;
}

type Props = PropsWithChildren & {
   options: DropdownOption[];
   value: string;
   onChange: (value: string) => void;
};

const Dropdown: FC<Props> = ({ options, value, onChange }) => {
   const [open, setOpen] = useState<boolean>(false);
   const id = useId();

   return (
      <div className="relative">
         <Button
            role="button"
            color="transparent"
            hasIcon
            onClick={() => setOpen((prev) => !prev)}
            className="w-30"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={`listbox-${id}`}
         >
            <span>
               {options.find((option) => option.value === value)?.label}
            </span>
            <ChevronDown size={16} />
         </Button>

         {open && (
            <div className="absolute z-50 w-full overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-lg shadow-xl shadow-black/50 animate-in fade-in zoom-in-95 duration-100">
               <div
                  role="listbox"
                  id={`listbox-${id}`}
                  className="max-h-60 overflow-y-auto scrollbar-hover"
               >
                  {options.map((option) => (
                     <Button
                        role="option"
                        aria-selected={value === option.value}
                        key={option.value}
                        color="transparent"
                        className={twMerge(
                           "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer",
                           "hover:bg-white/5 transition-colors",
                           value === option.value
                              ? "text-emerald-500 bg-emerald-500/5"
                              : "text-neutral-300",
                        )}
                        onClick={() => {
                           onChange(option.value);
                           setOpen(false);
                        }}
                     >
                        {option.label}
                     </Button>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default Dropdown;

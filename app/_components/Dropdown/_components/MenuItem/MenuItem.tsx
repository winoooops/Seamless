import { ComponentProps, FC, ReactNode } from "react";
import Button from "../../../Button";
import { twMerge } from "tailwind-merge";
import { useDropdown } from "../../_context";

type Props = ComponentProps<typeof Button> & {
   value: string;
   label: string;
   prefix?: ReactNode;
   suffix?: ReactNode;
};

const MenuItem: FC<Props> = ({
   value,
   label,
   prefix = undefined,
   suffix = undefined,
   ...others
}) => {
   const { close, selectedValue, onSelect } = useDropdown();

   return (
      <Button
         role="option"
         aria-selected={value === selectedValue}
         color="transparent"
         className={twMerge(
            "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer",
            "hover:bg-white/5 transition-colors",
            value === selectedValue
               ? "text-emerald-500 bg-emerald-500/5"
               : "text-neutral-300",
            others.className,
         )}
         onClick={() => {
            onSelect(value);
            close();
         }}
         {...others}
      >
         <div role="presentation">{prefix}</div>
         {label}
         <div role="presentation">{suffix}</div>
      </Button>
   );
};

export default MenuItem;

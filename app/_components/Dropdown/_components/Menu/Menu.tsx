import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";
import { useDropdown } from "../../_context";

type Props = ComponentProps<"ul">;

const Menu: FC<Props> = ({ children, ...props }) => {
   const { id, open } = useDropdown();

   if (!open) return null;

   return (
      <div className="absolute z-50 w-full overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-lg shadow-xl shadow-black/50 animate-in fade-in zoom-in-95 duration-100">
         <ul
            role="listbox"
            id={id}
            className={twMerge(
               "max-h-60 overflow-y-auto scrollbar-hover",
               props.className,
            )}
         >
            {children}
         </ul>
      </div>
   );
};

export default Menu;

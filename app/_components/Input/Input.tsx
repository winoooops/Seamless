import { ComponentProps, FC, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const input = tv({
   base: "flex w-full items-center px-4 py-3 leading-5 border border-b border-white/5 transition-all placeholder:text-slate-400",
   variants: {
      size: {
         large: "text-4.5 h-[50px] px-5",
         default: "h-[42px] px-4",
      },
      variant: {
         outline:
            "rounded-xl border-slate-200 bg-white focus-within:border-slate-400",
         secondary:
            "rounded-2xl border-slate-100 bg-slate-50 text-slate-600 focus-within:border-slate-300",
         transparent:
            "bg-transparent text-white placeholder-gray-500 focus-within:outline-none",
      },
   },
   defaultVariants: {
      size: "default",
      variant: "transparent",
   },
});

type Variants = VariantProps<typeof input> &
   Omit<ComponentProps<"input">, "prefix" | "size">;

type Props = Variants & {
   prefix?: ReactNode;
   suffix?: ReactNode;
};

const Input: FC<Props> = ({
   prefix = undefined,
   suffix = undefined,
   size,
   variant,
   className,
   ...others
}) => {
   return (
      <div
         role="group"
         className={input({ className, size, variant })}
         aria-label="Input"
      >
         <div role="presentation" className="mr-3">
            {prefix}
         </div>
         <input
            {...others}
            className="bg-transparent grow outline-none text-sm"
         />
         <div role="presentation" className="ml-3">
            {suffix}
         </div>
      </div>
   );
};

export default Input;

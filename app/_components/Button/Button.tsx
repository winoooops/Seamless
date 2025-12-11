"use client";

import { ComponentProps, FC } from "react";
import { tv, VariantProps } from "tailwind-variants/lite";

export const button = tv({
   base: "rounded-md cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-60",
   variants: {
      size: {
         sm: "px-3 py-1.5 text-xs font-medium",
         md: "px-4 py-2 text-sm",
         lg: "p-4 text-md font-bold",
      },
      color: {
         primary:
            "bg-gradient-to-r from-cyan-200 to-blue-300 text-black border-none hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-cyan-500/20 font-semibold",
         outline: "bg-transparent border border-white/10",
         transparent: "bg-transparent border-0",
         nav: "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5 border-none justify-start",
         navActive: "texture-active text-white border-none justify-start font-medium",
      },
      isFullWidth: {
         true: "w-full",
      },
      hasIcon: {
         true: "flex items-center justify-between",
      },
   },
   compoundVariants: [
      {
         isFullWidth: true,
         hasIcon: true,
         class: "hover:bg-blue-500/20 border-0",
      },
   ],
   defaultVariants: {
      size: "sm",
      color: "outline",
      isFullWidth: false,
      hasIcon: false,
   },
});

type Props = ComponentProps<"button"> & VariantProps<typeof button>;

const Button: FC<Props> = ({
   size,
   color,
   isFullWidth,
   hasIcon,
   children,
   className,
   ...others
}) => (
   <button
      className={button({ size, color, isFullWidth, hasIcon, className })}
      {...others}
   >
      {children}
   </button>
);

export default Button;

"use client";

import { ComponentProps, FC } from "react";
import { tv, VariantProps } from "tailwind-variants/lite";

const button = tv({
   base: "rounded-md cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-60",
   variants: {
      size: {
         sm: "px-3 py-1.5 text-xs font-medium",
         md: "px-4 py-2 text-sm",
      },
      color: {
         primary:
            "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20",
         outline: "bg-transparent border border-white/10",
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

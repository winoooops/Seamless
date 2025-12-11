"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-min",
        className,
      )}
    >
      {children}
    </div>
  );
};

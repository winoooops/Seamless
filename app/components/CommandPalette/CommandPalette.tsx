import React, { useEffect, useRef } from "react";
import { CommandItem } from "./CommandItem";
import Input from "@/app/_components/Input";
import { Search } from "lucide-react";

interface CommandPaletteProps {
   isOpen: boolean;
   onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (isOpen) {
         inputRef.current?.focus();
      }
   }, [isOpen]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm transition-all duration-200">
         <div className="w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <Input
               prefix={<Search size={16} className="text-gray-400" />}
               suffix={
                  <div className="text-xs text-gray-500 border border-white/10 px-1.5 py-0.5 rounded">
                     ESC
                  </div>
               }
               placeholder="Type a command or search..."
               onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
               }}
            />
            <div className="py-2">
               <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suggested
               </div>
               <CommandItem label="Go to Dashboard" shortcut="Cmd+1" />
               <CommandItem label="View Performance" shortcut="Cmd+2" />
               <CommandItem label="Manage Accounts" shortcut="Cmd+3" />
               <div className="my-2 border-t border-white/5" />
               <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
               </div>
               <CommandItem label="New Transaction" />
               <CommandItem label="Refresh Prices" />
            </div>
         </div>
         <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
   );
}

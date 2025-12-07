import React, { useEffect, useRef } from "react";
import { CommandItem } from "./CommandItem";

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
            <div className="flex items-center px-4 py-3 border-b border-white/5">
               <svg
                  className="w-5 h-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
               </svg>
               <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                  onKeyDown={(e) => {
                     if (e.key === "Escape") onClose();
                  }}
               />
               <div className="text-xs text-gray-500 border border-white/10 px-1.5 py-0.5 rounded">
                  ESC
               </div>
            </div>
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

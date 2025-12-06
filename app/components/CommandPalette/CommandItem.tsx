export function CommandItem({
   icon,
   label,
   shortcut,
}: {
   icon: string;
   label: string;
   shortcut?: string;
}) {
   return (
      <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-blue-500/10 hover:text-blue-400 text-gray-300 transition-colors group text-left">
         <div className="flex items-center gap-3">
            {/* Simple Icon Placeholder */}
            <div className="w-4 h-4 text-gray-500 group-hover:text-blue-400">
               <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
               >
                  <circle cx="12" cy="12" r="10"></circle>
               </svg>
            </div>
            <span className="text-sm">{label}</span>
         </div>
         {shortcut && (
            <span className="text-xs text-gray-500 font-mono">{shortcut}</span>
         )}
      </button>
   );
}

export function PortfolioAllocation() {
   return (
      <div className="h-full w-full flex flex-col items-center justify-center p-4">
         <div className="relative w-32 h-32">
            {/* Mock Donut Chart */}
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
               <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="60 251"
               />{" "}
               {/* Crypto 25% */}
               <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="20"
                  strokeDasharray="100 251"
                  strokeDashoffset="-60"
               />{" "}
               {/* Stocks 40% */}
               <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray="50 251"
                  strokeDashoffset="-160"
               />{" "}
               {/* Real Estate 20% */}
               <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeDasharray="41 251"
                  strokeDashoffset="-210"
               />{" "}
               {/* Cash 15% */}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
               <span className="text-xs text-gray-400">Total</span>
               <span className="text-sm font-bold text-white">$1.2M</span>
            </div>
         </div>

         <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500" />
               <span className="text-gray-400">Crypto</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-purple-500" />
               <span className="text-gray-400">Stocks</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <span className="text-gray-400">Real Estate</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-yellow-500" />
               <span className="text-gray-400">Cash</span>
            </div>
         </div>
      </div>
   );
}

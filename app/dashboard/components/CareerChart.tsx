export function CareerChart() {
   return (
      <div className="h-full w-full flex items-center justify-center p-4">
         {/* Mock Line Chart */}
         <svg
            viewBox="0 0 300 150"
            className="w-full h-full text-blue-500 overflow-visible"
         >
            <defs>
               <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                     offset="0%"
                     stopColor="currentColor"
                     stopOpacity="0.2"
                  />
                  <stop
                     offset="100%"
                     stopColor="currentColor"
                     stopOpacity="0"
                  />
               </linearGradient>
            </defs>
            <path
               d="M0 100 C 50 100, 50 50, 100 80 S 150 20, 200 60 S 250 100, 300 40"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
            />
            <path
               d="M0 100 C 50 100, 50 50, 100 80 S 150 20, 200 60 S 250 100, 300 40 V 150 H 0 Z"
               fill="url(#gradient)"
               stroke="none"
            />
         </svg>
      </div>
   );
}

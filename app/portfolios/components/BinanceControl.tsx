"use client";

import { useState } from "react";
import connectBinanceCex from "../../api/binance/utils/connectBinanceCex";

export function BinanceControl() {
   const [loading, setLoading] = useState(false);
   const [isConnected, setIsConnected] = useState(false);
   const [timestamp, setTimestamp] = useState<string>("");

   // State for credentials
   const [apiKey, setApiKey] = useState("");
   const [apiSecret, setApiSecret] = useState("");

   const handleConnect = async () => {
      setLoading(true);
      try {
         // Pass credentials to the utility
         const res = await connectBinanceCex(apiKey, apiSecret);

         setIsConnected(res.isConnected);
         setTimestamp(res.timestamp);
      } catch (err) {
         alert("Failed to connect: " + (err as Error).message);
         setIsConnected(false);
         setTimestamp("");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="p-4 border fixed bottom-4 right-4 bg-white shadow-xl rounded-lg z-50 w-80">
         <h2 className="text-xl font-bold mb-4">Binance Status</h2>

         <div className="mb-4 space-y-2">
            <div>
               <label className="block text-xs font-medium text-gray-700">
                  API Key
               </label>
               <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full text-sm border rounded p-1"
                  placeholder="Paste API Key"
               />
            </div>
            <div>
               <label className="block text-xs font-medium text-gray-700">
                  API Secret
               </label>
               <input
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  className="w-full text-sm border rounded p-1"
                  placeholder="Paste API Secret"
               />
            </div>
         </div>

         <div className="mb-4">
            Connection:
            <span
               className={
                  isConnected
                     ? "text-green-600 font-bold ml-1"
                     : "text-red-500 ml-1"
               }
            >
               {isConnected ? "ACTIVE" : "INACTIVE"}
            </span>
            <div className="text-xs text-gray-500 mt-1">
               Last check: {timestamp || "Never"}
            </div>
         </div>

         <button
            onClick={handleConnect}
            disabled={loading || isConnected}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded disabled:opacity-50 transition-colors w-full"
         >
            {loading
               ? "Connecting..."
               : isConnected
                 ? "Connected"
                 : "Connect to Testnet"}
         </button>
      </div>
   );
}

"use client";

import React from 'react';

const MOCK_ASSETS = [
  { ticker: 'BTC', price: 96214, change1h: 5, change24h: 5, amount: 2, avg: 83664, pnl: 15, chart: 'up' },
  { ticker: 'ETH', price: 3450, change1h: -1.2, change24h: 2.4, amount: 15, avg: 2100, pnl: 64, chart: 'up' },
  { ticker: 'SOL', price: 145, change1h: 0.5, change24h: -3.2, amount: 500, avg: 45, pnl: 222, chart: 'down' },
  { ticker: 'TSLA', price: 245, change1h: 0.1, change24h: 1.2, amount: 50, avg: 180, pnl: 36, chart: 'up' },
  { ticker: 'NVDA', price: 890, change1h: 1.5, change24h: 4.5, amount: 10, avg: 450, pnl: 97, chart: 'up' },
];

export function AssetsTable() {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs text-gray-500 border-b border-white/5">
            <th className="py-3 px-4 font-medium">Ticker</th>
            <th className="py-3 px-4 font-medium">Chart</th>
            <th className="py-3 px-4 font-medium text-right">Price</th>
            <th className="py-3 px-4 font-medium text-right">1Hr</th>
            <th className="py-3 px-4 font-medium text-right">Daily</th>
            <th className="py-3 px-4 font-medium text-right">Amount</th>
            <th className="py-3 px-4 font-medium text-right">Average</th>
            <th className="py-3 px-4 font-medium text-right">P&L</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MOCK_ASSETS.map((asset) => (
            <tr key={asset.ticker} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
              <td className="py-3 px-4 font-medium text-white">{asset.ticker}</td>
              <td className="py-3 px-4">
                {/* Simple Sparkline SVG */}
                <svg width="60" height="20" viewBox="0 0 60 20" className={asset.chart === 'up' ? 'text-green-500' : 'text-red-500'}>
                  <path
                    d={asset.chart === 'up' ? "M0 15 Q 15 15, 30 5 T 60 2" : "M0 5 Q 15 5, 30 15 T 60 18"}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </td>
              <td className="py-3 px-4 text-right font-mono">${asset.price.toLocaleString()}</td>
              <td className={`py-3 px-4 text-right font-mono ${asset.change1h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change1h > 0 ? '+' : ''}{asset.change1h}%
              </td>
              <td className={`py-3 px-4 text-right font-mono ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className={`px-1.5 py-0.5 rounded ${asset.change24h >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                </span>
              </td>
              <td className="py-3 px-4 text-right text-gray-400">{asset.amount}</td>
              <td className="py-3 px-4 text-right text-gray-400">${asset.avg.toLocaleString()}</td>
              <td className={`py-3 px-4 text-right font-mono ${asset.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.pnl > 0 ? '+' : ''}{asset.pnl}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

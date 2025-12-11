"use client";

import {
   ColumnPinningState,
   SortingState,
   createColumnHelper,
   flexRender,
   getCoreRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { ComponentProps, Dispatch, FC, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ITicker {
   name: string;
   price: number;
   change1h: number;
   change24h: number;
   amount: number;
   positionAt: number;
   pnl: number;
   chart: "up" | "down";
}

const MOCK_ASSETS: ITicker[] = [
   {
      name: "BTC",
      price: 96214,
      change1h: 5,
      change24h: 5,
      amount: 2,
      positionAt: 83664,
      pnl: 15,
      chart: "up",
   },
   {
      name: "ETH",
      price: 3450,
      change1h: -1.2,
      change24h: 2.4,
      amount: 15,
      positionAt: 2100,
      pnl: 64,
      chart: "up",
   },
   {
      name: "SOL",
      price: 145,
      change1h: 0.5,
      change24h: -3.2,
      amount: 500,
      positionAt: 45,
      pnl: 222,
      chart: "down",
   },
   {
      name: "TSLA",
      price: 245,
      change1h: 0.1,
      change24h: 1.2,
      amount: 50,
      positionAt: 180,
      pnl: 36,
      chart: "up",
   },
   {
      name: "NVDA",
      price: 890,
      change1h: 1.5,
      change24h: 4.5,
      amount: 10,
      positionAt: 450,
      pnl: 97,
      chart: "up",
   },
];

const formatCurrency = (val: number) =>
   new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(val);

const formatPercent = (val: number) => `${val > 0 ? "+" : ""}${val}%`;

const columnHelper = createColumnHelper<ITicker>();
const columns = [
   columnHelper.accessor("name", {
      header: "Asset",
      cell: (info) => (
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
               {info.getValue()[0]}
            </div>
            <span className="font-semibold text-white">{info.getValue()}</span>
         </div>
      ),
   }),
   columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => formatCurrency(info.getValue()),
   }),
   columnHelper.accessor("change1h", {
      header: "1H Change",
      cell: ({ getValue }) => {
         const val = getValue();
         const color =
            val > 0
               ? "text-green-500"
               : val < 0
                 ? "text-red-500"
                 : "text-gray-400";
         return <span className={color}>{formatPercent(val)}</span>;
      },
   }),
   columnHelper.accessor("change24h", {
      header: "24H Change",
      cell: ({ getValue }) => {
         const val = getValue();
         const color =
            val > 0
               ? "text-green-500"
               : val < 0
                 ? "text-red-500"
                 : "text-gray-400";
         return <span className={color}>{formatPercent(val)}</span>;
      },
   }),
   columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue().toLocaleString(),
   }),
   columnHelper.accessor("positionAt", {
      header: "Avg. Buy",
      cell: (info) => formatCurrency(info.getValue()),
   }),
   columnHelper.accessor("pnl", {
      header: "PNL",
      cell: ({ getValue }) => {
         const val = getValue();
         const color =
            val > 0
               ? "text-green-500"
               : val < 0
                 ? "text-red-500"
                 : "text-gray-400";
         return <span className={color}>{formatCurrency(val)}</span>;
      },
   }),
   columnHelper.display({
      id: "chart",
      header: "Trend",
      cell: (props) => (
         <svg
            width="60"
            height="20"
            viewBox="0 0 60 20"
            className={
               props.row.original.chart === "up"
                  ? "text-green-500"
                  : "text-red-500"
            }
         >
            <path
               d={
                  props.row.original.chart === "up"
                     ? "M0 15 Q 15 15, 30 5 T 60 2"
                     : "M0 5 Q 15 5, 30 15 T 60 18"
               }
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
            />
         </svg>
      ),
   }),
];

type Props = ComponentProps<"table">;

export const AssetsTable: FC<Props> = ({ className }) => {
   // TODO: implement drag and drop of the columns here
   const [columnOrder, setColumnOrder] = useState<(keyof ITicker)[]>([
      "name",
      "chart",
      "price",
      "change1h",
      "change24h",
      "amount",
      "positionAt",
      "pnl",
   ]);
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
      left: ["name"],
      right: [],
   });

   // eslint-disable-next-line react-hooks/incompatible-library
   const table = useReactTable({
      data: MOCK_ASSETS,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
         columnOrder,
         columnPinning,
         sorting,
      },
      onSortingChange: setSorting,
      onColumnOrderChange: setColumnOrder as unknown as Dispatch<
         SetStateAction<string[]>
      >,
      onColumnPinningChange: setColumnPinning,
   });

   return (
      <div
         className={twMerge(
            "w-full overflow-x-auto scrollbar-hover",
            className,
         )}
      >
         <table className="w-full text-left border-collapse">
            <thead>
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <th
                           key={header.id}
                           className="py-3 px-4 font-medium whitespace-nowrap"
                           style={{
                              position: header.column.getIsPinned()
                                 ? "sticky"
                                 : undefined,
                              left:
                                 header.column.getIsPinned() === "left"
                                    ? header.column.getStart("left")
                                    : undefined,
                              right:
                                 header.column.getIsPinned() === "right"
                                    ? header.column.getAfter("right")
                                    : undefined,
                              backgroundColor: header.column.getIsPinned()
                                 ? "var(--foreground)"
                                 : undefined,
                              zIndex: header.column.getIsPinned() ? 1 : 0,
                           }}
                        >
                           {header.isPlaceholder ? null : (
                              <div
                                 className={`${
                                    header.column.getCanSort()
                                       ? "cursor-pointer select-none"
                                       : ""
                                 } flex flex-nowrap items-center gap-1`}
                                 onClick={header.column.getToggleSortingHandler()}
                              >
                                 {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                 )}
                                 {{
                                    asc: <ArrowUpNarrowWide />,
                                    desc: <ArrowDownNarrowWide />,
                                 }[header.column.getIsSorted() as string] ?? (
                                    <ArrowUpNarrowWide className="opacity-0" />
                                 )}
                              </div>
                           )}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>

            <tbody className="text-sm">
               {table.getRowModel().rows.map((row) => (
                  <tr
                     key={row.id}
                     className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                     {row.getVisibleCells().map((cell) => (
                        <td
                           key={cell.id}
                           className="py-3 px-4 font-medium text-slate-300"
                           style={{
                              position: cell.column.getIsPinned()
                                 ? "sticky"
                                 : undefined,
                              left:
                                 cell.column.getIsPinned() === "left"
                                    ? cell.column.getStart("left")
                                    : undefined,
                              right:
                                 cell.column.getIsPinned() === "right"
                                    ? cell.column.getAfter("right")
                                    : undefined,
                              backgroundColor: cell.column.getIsPinned()
                                 ? "var(--foreground)"
                                 : undefined,
                              zIndex: cell.column.getIsPinned() ? 1 : 0,
                           }}
                        >
                           {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                           )}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

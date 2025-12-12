"use client";

import React, { useState } from "react";
import { CommandPalette } from "./CommandPalette/CommandPalette";
import { Sidebar } from "./Sidebar";
import { useKeyMap } from "../hooks/useKeymap";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

interface LayoutProps {
   children: React.ReactNode;
}

export function AppShell({ children }: LayoutProps) {
   const [isSidebarCollapsed, setIsSidebarOpen] = useState(false);
   const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

   useKeyMap(() => setIsSidebarOpen((prev) => !prev), "k", true);
   useKeyMap(() => setIsCommandPaletteOpen((prev) => !prev), "b", true);
   useKeyMap(() => setIsCommandPaletteOpen(false), "Escape");

   return (
      <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
         <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggle={() => setIsSidebarOpen((prev) => !prev)}
         >
            <Navbar isCollapsed={isSidebarCollapsed} />
         </Sidebar>

         <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 overflow-hidden p-6 relative">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px] pointer-events-none" />
               <div className="relative h-full z-10">{children}</div>
            </main>
         </div>

         <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
         />
      </div>
   );
}

import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-mesh px-4 py-4 text-text-primary print:bg-white print:px-0 print:py-0 lg:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 print:block lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="print:hidden lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <Sidebar />
        </div>
        <div className="space-y-4">
          <div className="print:hidden">
            <Topbar />
          </div>
          <main className="space-y-6 print:space-y-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

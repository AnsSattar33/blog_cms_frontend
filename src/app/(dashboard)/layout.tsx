"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardAuthGuard } from "@/components/dashboard/auth-guard";
import "@/features/dashboard/dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-shell flex h-screen overflow-hidden bg-(--dash-bg)">
      <Sidebar className="hidden lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex h-[60px] items-center gap-3 border-b border-(--dash-border) bg-(--dash-chrome) px-4 lg:hidden">
          <Sheet>
            <SheetTrigger
              className="inline-flex"
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-(--dash-border) bg-(--dash-surface) text-(--dash-text)"
                />
              }
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] border-(--dash-border) bg-(--dash-chrome) p-0">
              <Sidebar className="border-0" />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold text-(--dash-text)">Blog CMS</span>
        </div>

        <DashboardHeader />

        <main className="dash-main flex-1 overflow-y-auto px-6 py-8 lg:px-8">
          <DashboardAuthGuard>{children}</DashboardAuthGuard>
        </main>
      </div>
    </div>
  );
}

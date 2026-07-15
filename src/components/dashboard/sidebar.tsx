"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  PenSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/blogs/create", label: "Create Blog", icon: PenSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "dash-sidebar flex h-full w-[260px] shrink-0 flex-col",
        className
      )}
    >
      <div className="dash-sidebar-brand flex h-[60px] items-center px-5">
        <Link href="/dashboard" className="dash-brand-mark">
          <span className="dash-brand-icon">B</span>
          <span className="text-sm font-semibold tracking-tight text-(--dash-text)">
            {APP_NAME}
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-(--dash-text-subtle)">
          Menu
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "dash-nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium",
                isActive && "dash-nav-item-active"
              )}
            >
              <Icon className="dash-nav-icon h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-(--dash-border) p-4">
        <Link
          href="/"
          className="text-[13px] text-(--dash-text-muted) transition-colors hover:text-(--dash-text)"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}

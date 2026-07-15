"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, LogOut, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/use-auth";
import { parseApiError } from "@/lib/api-error";

export function DashboardHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user } = useAuth();

  const initials =
    user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) ?? "?";

  const handleLogout = async () => {
    try {
      await authService.logout();
      queryClient.setQueryData(["auth", "me"], null);
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(parseApiError(error).message);
    }
  };

  return (
    <header className="dash-topbar flex h-[60px] items-center justify-between gap-4 px-6">
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--dash-text-subtle)" />
        <Input
          placeholder="Search blogs..."
          className="h-9 border-(--dash-border) bg-(--dash-surface) pl-9 text-sm text-(--dash-text) placeholder:text-(--dash-text-subtle) focus-visible:border-(--dash-accent-muted) focus-visible:ring-(--dash-accent-soft)"
          disabled
        />
      </div>

      <div className="flex items-center gap-3 sm:ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-(--dash-text-muted) hover:bg-(--dash-surface) hover:text-(--dash-text)"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-(--dash-surface)"
              />
            }
          >
            <Avatar className="h-8 w-8">
              {user?.avatar && (
                <AvatarImage src={user.avatar} alt={user.name} />
              )}
              <AvatarFallback className="bg-(--dash-accent-soft) text-xs font-medium text-(--dash-accent)">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-[13px] font-medium leading-none text-(--dash-text)">
                {user?.name}
              </p>
              <p className="mt-0.5 text-[11px] text-(--dash-text-muted)">
                {user?.email}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
              Admin account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { isAdmin } from "@/lib/auth-roles";
import { TableSkeleton } from "@/components/common/loading-skeleton";

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, isError } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      const redirect = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirect}`);
      return;
    }

    if (!isAdmin(user)) {
      toast.error("Access denied. Administrator account required.");
      router.replace("/login");
    }
  }, [user, isLoading, isError, pathname, router]);

  if (isLoading) {
    return (
      <div className="py-8">
        <TableSkeleton rows={4} />
      </div>
    );
  }

  if (!user || !isAdmin(user)) {
    return null;
  }

  return <>{children}</>;
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import type { DashboardStats } from "@/types";

export function useDashboardStats(enabled: boolean) {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await blogService.getDashboardStats();
      return response.data;
    },
    enabled,
    retry: 1,
  });
}

export type { DashboardStats };

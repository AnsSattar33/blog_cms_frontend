"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";

export function useBlog(identifier: string, by: "slug" | "id" = "slug") {
  return useQuery({
    queryKey: ["blog", by, identifier],
    queryFn: async () => {
      const response =
        by === "slug"
          ? await blogService.getBySlug(identifier)
          : await blogService.getById(identifier);
      return response.data;
    },
    enabled: !!identifier,
  });
}

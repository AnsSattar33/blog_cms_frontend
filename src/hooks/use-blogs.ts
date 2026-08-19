"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { toPublishedBlogQuery } from "@/lib/blog-sort";
import type { Blog, BlogQueryParams, PaginatedResponse } from "@/types";

export function useBlogs(params: BlogQueryParams = {}) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => blogService.getAll(toPublishedBlogQuery(params)),
  });
}

export function usePublishedBlogs(
  params: BlogQueryParams = {},
  options?: { initialData?: PaginatedResponse<Blog> }
) {
  return useQuery({
    queryKey: ["blogs", "published", params],
    queryFn: () => blogService.getPublished(toPublishedBlogQuery(params)),
    initialData: options?.initialData,
  });
}

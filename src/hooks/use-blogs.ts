"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { sortValueToApiParam } from "@/components/common/sort-select";
import type { BlogQueryParams } from "@/types";

function mapParams(params: BlogQueryParams = {}) {
  const { sort, ...rest } = params;
  return {
    ...rest,
    sort: sort ? sortValueToApiParam(sort) : undefined,
  };
}

export function useBlogs(params: BlogQueryParams = {}) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => blogService.getAll(mapParams(params)),
  });
}

export function usePublishedBlogs(params: BlogQueryParams = {}) {
  return useQuery({
    queryKey: ["blogs", "published", params],
    queryFn: () => blogService.getPublished(mapParams(params)),
  });
}

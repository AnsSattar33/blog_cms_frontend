import type { BlogQueryParams } from "@/types";

const SORT_API_PARAMS: Record<string, string> = {
  newest: "-createdAt",
  oldest: "createdAt",
  title: "title",
  "title-desc": "-title",
};

export function sortValueToApiParam(value: string): string {
  return SORT_API_PARAMS[value] ?? "-createdAt";
}

export function toPublishedBlogQuery(
  params: BlogQueryParams = {}
): BlogQueryParams {
  const { sort, ...rest } = params;
  return {
    ...rest,
    sort: sort ? sortValueToApiParam(sort) : undefined,
  };
}

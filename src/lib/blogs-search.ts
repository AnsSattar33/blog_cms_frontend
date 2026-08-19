export type BlogsSearchValues = {
  search: string;
  category: string;
  tag: string;
  sort: string;
  page: number;
};

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function parseBlogsSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): BlogsSearchValues {
  const pageValue = Number(first(searchParams.page) || "1");

  return {
    search: first(searchParams.q),
    category: first(searchParams.category),
    tag: first(searchParams.tag),
    sort: first(searchParams.sort) || "newest",
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
  };
}

export function hasBlogsQueryString(
  searchParams: Record<string, string | string[] | undefined>
): boolean {
  return Object.keys(searchParams).some((key) => first(searchParams[key]) !== "");
}

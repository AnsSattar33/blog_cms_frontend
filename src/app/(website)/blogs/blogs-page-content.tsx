"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/common/empty-state";
import { BlogGridSkeleton } from "@/components/common/loading-skeleton";
import { usePublishedBlogs } from "@/hooks/use-blogs";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { LANDING_EMPTY_CLASS } from "@/features/landing/landing-classes";
import { PublicPageHero } from "@/features/landing/public-page-hero";
import { LandingSectionHeader } from "@/features/landing/landing-section-header";
import { LandingBlogGrid } from "@/features/landing/landing-blog-grid";
import {
  LandingCategoryFilter,
  LandingPagination,
  LandingSearchInput,
  LandingSortSelect,
  LandingTagFilter,
} from "@/features/landing/landing-controls";

export function BlogsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const sort = searchParams.get("sort") ?? "newest";
  const page = Number(searchParams.get("page") ?? "1");

  const params = useMemo(
    () => ({ search, category, tag, sort, page, limit: DEFAULT_PAGE_SIZE }),
    [search, category, tag, sort, page]
  );

  const { data, isLoading, isError } = usePublishedBlogs(params);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      if (!updates.page) next.delete("page");
      router.push(`/blogs?${next.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <>
      <PublicPageHero
        badge="Our blog"
        title="All"
        highlight="articles"
        description="Explore articles across technology, design, business, and more — written for curious readers."
      />

      <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
        <Container>
          <LandingSectionHeader
            title="Browse the collection"
            description="Search, filter, and discover stories that match your interests"
            align="left"
          />

          <div className="mb-8 space-y-4">
            <LandingSearchInput
              key={`search-${search}`}
              value={search}
              onChange={(q) => updateParams({ q, page: "" })}
              className="max-w-md"
            />
            <div className="flex flex-wrap items-center gap-4">
              <LandingCategoryFilter
                value={category}
                onChange={(cat) => updateParams({ category: cat, page: "" })}
              />
              <LandingTagFilter
                value={tag}
                onChange={(t) => updateParams({ tag: t, page: "" })}
              />
              <LandingSortSelect
                value={sort}
                onChange={(s) => updateParams({ sort: s, page: "" })}
              />
            </div>
          </div>

          {isLoading ? (
            <BlogGridSkeleton />
          ) : isError ? (
            <EmptyState
              title="Something went wrong"
              description="We couldn't load blogs. Please try again later."
              className={LANDING_EMPTY_CLASS}
            />
          ) : data?.data.length ? (
            <>
              <LandingBlogGrid blogs={data.data} animated />
              <LandingPagination
                page={data.pagination.page}
                totalPages={data.pagination.totalPages}
                onPageChange={(p) => updateParams({ page: String(p) })}
                className="mt-12"
              />
            </>
          ) : (
            <EmptyState
              title="No blogs found"
              description="Try a different search term, category, or tag."
              className={LANDING_EMPTY_CLASS}
            />
          )}
        </Container>
      </section>
    </>
  );
}

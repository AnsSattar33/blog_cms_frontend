import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogGridSkeleton } from "@/components/common/loading-skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { blogService } from "@/services/blog.service";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { toPublishedBlogQuery } from "@/lib/blog-sort";
import {
  hasBlogsQueryString,
  parseBlogsSearchParams,
} from "@/lib/blogs-search";
import { buildPageMetadata, webPageJsonLd } from "@/lib/site";
import type { PaginatedResponse, Blog } from "@/types";
import { BlogsPageContent } from "./blogs-page-content";

const BLOGS_TITLE = "Articles on technology, design, business, and lifestyle";
const BLOGS_DESCRIPTION =
  "Browse every published Blog CMS article. Search and filter when you need to, or read the full archive from this page.";

interface BlogsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: BlogsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const isQueryVariant = hasBlogsQueryString(params);

  return buildPageMetadata({
    title: BLOGS_TITLE,
    description: BLOGS_DESCRIPTION,
    path: "/blogs",
    index: !isQueryVariant,
    follow: true,
  });
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const rawParams = await searchParams;
  const parsed = parseBlogsSearchParams(rawParams);
  const queryKey = `${parsed.search}|${parsed.category}|${parsed.tag}|${parsed.sort}|${parsed.page}`;

  let initialData: PaginatedResponse<Blog> | undefined;

  try {
    initialData = await blogService.getPublished(
      toPublishedBlogQuery({
        search: parsed.search,
        category: parsed.category,
        tag: parsed.tag,
        sort: parsed.sort,
        page: parsed.page,
        limit: DEFAULT_PAGE_SIZE,
      })
    );
  } catch {
    initialData = undefined;
  }

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: BLOGS_TITLE,
          description: BLOGS_DESCRIPTION,
          path: "/blogs",
        })}
      />
      <Suspense
        fallback={
          <div className="py-16 md:py-24">
            <Container>
              <BlogGridSkeleton />
            </Container>
          </div>
        }
      >
        <BlogsPageContent key={queryKey} initialData={initialData} />
      </Suspense>
    </>
  );
}

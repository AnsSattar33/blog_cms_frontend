import type { MetadataRoute } from "next";
import { blogService } from "@/services/blog.service";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

const SITEMAP_PAGE_SIZE = 100;

const STATIC_PATHS = ["/", "/blogs", "/about", "/contact", "/privacy"] as const;

async function getPublishedArticleEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  let page = 1;

  try {
    while (true) {
      const response = await blogService.getPublished({
        page,
        limit: SITEMAP_PAGE_SIZE,
      });

      for (const blog of response.data) {
        if (blog.status !== "published" || !blog.slug) continue;
        entries.push({
          url: absoluteUrl(`/blogs/${blog.slug}`),
          lastModified: blog.updatedAt ? new Date(blog.updatedAt) : undefined,
        });
      }

      if (page >= response.pagination.totalPages) break;
      page += 1;
    }
  } catch {
    return entries;
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));

  const articleEntries = await getPublishedArticleEntries();

  return [...staticEntries, ...articleEntries];
}

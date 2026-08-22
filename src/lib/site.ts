import type { Metadata } from "next";
import type { Blog } from "@/types";

export const SITE_NAME = "Blog CMS";

export const SITE_DESCRIPTION =
  "Read thoughtful articles on technology, design, business, and culture — published on Blog CMS.";

export const DEFAULT_OG_PATH = "/opengraph-image";

const LOCAL_FALLBACK_URL = "http://localhost:3000";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? LOCAL_FALLBACK_URL
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  follow?: boolean;
  ogImage?: string;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authors?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
  follow = true,
  ogImage = DEFAULT_OG_PATH,
  absoluteTitle = false,
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : ogImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: { index, follow },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: ogType,
      images: [{ url: imageUrl }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors?.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function articleJsonLd(blog: Blog) {
  const pageUrl = absoluteUrl(`/blogs/${blog.slug}`);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.shortDescription,
    url: pageUrl,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (blog.thumbnail) {
    data.image = blog.thumbnail;
  }

  if (blog.author?.name) {
    data.author = {
      "@type": "Person",
      name: blog.author.name,
    };
  }

  if (blog.publishedAt) {
    data.datePublished = blog.publishedAt;
  }

  if (blog.tags.length) {
    data.about = blog.tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    }));
    data.keywords = blog.tags.join(", ");
  }

  return data;
}

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

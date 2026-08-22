import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import { blogService } from "@/services/blog.service";
import { BlogMeta } from "@/components/blog/blog-meta";
import { ArticleBreadcrumbs } from "@/components/blog/article-breadcrumbs";
import { RelatedBlogs } from "@/components/blog/related-blogs";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqPageJsonLd,
} from "@/lib/site";
import { extractFaqFromHtml } from "@/lib/extract-faq";
import type { Blog } from "@/types";

const AI_STOCKS_FAQ_FALLBACK = [
  {
    question: "What are the best AI stocks to buy in 2026?",
    answer:
      "Commonly cited leaders include Nvidia, Microsoft, Alphabet, Broadcom, Amazon, and Palantir, spanning chips, cloud, and AI software.",
  },
  {
    question: "Is AI a bubble in 2026?",
    answer:
      "Experts are divided. Bulls point to strong earnings growth at major AI companies, while bears point to stretched valuations and rising debt-financed capital spending.",
  },
  {
    question: "Will the AI bubble burst?",
    answer:
      "No one can predict this with certainty; most analysts expect a gradual, segmented correction in overpriced areas rather than a single market-wide crash.",
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getPublishedBlog = cache(async (slug: string): Promise<Blog> => {
  const { data: blog } = await blogService.getBySlug(slug);
  if (!blog || blog.status !== "published") {
    notFound();
  }
  return blog;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlog(slug);

  return buildPageMetadata({
    title: blog.title,
    description: blog.shortDescription,
    path: `/blogs/${blog.slug}`,
    ogImage: blog.thumbnail || undefined,
    ogType: "article",
    publishedTime: blog.publishedAt,
    modifiedTime: blog.updatedAt,
    authors: blog.author?.name ? [blog.author.name] : undefined,
  });
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getPublishedBlog(slug);
  const extractedFaqs = extractFaqFromHtml(blog.content);
  const faqs =
    extractedFaqs.length > 0
      ? extractedFaqs
      : blog.slug === "best-ai-stocks-2026-ai-bubble-debate"
        ? AI_STOCKS_FAQ_FALLBACK
        : [];

  return (
    <article className="py-12 md:py-16">
      <JsonLd data={articleJsonLd(blog)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Articles", path: "/blogs" },
          { name: blog.title, path: `/blogs/${blog.slug}` },
        ])}
      />
      {faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
      <Container className="max-w-4xl">
        <ArticleBreadcrumbs title={blog.title} />

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-(--lp-border)">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="landing-badge inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium">
            {blog.category}
          </span>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-md border border-(--lp-border) bg-(--lp-surface) px-2.5 py-0.5 text-xs font-medium text-(--lp-text-muted)"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight text-(--lp-text) md:text-4xl lg:text-5xl">
          {blog.title}
        </h1>

        <div className="mt-6 mb-10">
          <BlogMeta blog={blog} tone="landing" />
        </div>

        <div
          className="prose-blog landing-prose"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <RelatedBlogs slug={blog.slug} />
      </Container>
    </article>
  );
}

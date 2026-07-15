import Image from "next/image";
import { notFound } from "next/navigation";
import { blogService } from "@/services/blog.service";
import { BlogMeta } from "@/components/blog/blog-meta";
import { RelatedBlogs } from "@/components/blog/related-blogs";
import { Container } from "@/components/layout/container";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await blogService.getBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.shortDescription,
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: blog } = await blogService.getBySlug(slug);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  return (
    <article className="py-12 md:py-16">
      <Container className="max-w-4xl">
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

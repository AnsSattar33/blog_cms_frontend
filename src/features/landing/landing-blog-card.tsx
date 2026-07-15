"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { staggerItem } from "@/lib/motion";
import type { Blog } from "@/types";

interface LandingBlogCardProps {
  blog: Blog;
  animated?: boolean;
}

function formatDate(date: string | null) {
  if (!date) return "Draft";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LandingBlogCard({ blog, animated = false }: LandingBlogCardProps) {
  const Wrapper = animated ? motion.article : "article";
  const wrapperProps = animated ? { variants: staggerItem } : {};

  return (
    <Wrapper {...wrapperProps}>
      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
        <article className="landing-card flex h-full flex-col overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--lp-surface) via-transparent to-transparent opacity-60" />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <span className="landing-badge mb-3 inline-flex w-fit rounded-md px-2.5 py-0.5 text-xs font-medium">
              {blog.category}
            </span>

            <h3 className="font-display line-clamp-2 text-lg font-semibold leading-snug text-(--lp-text) transition-colors group-hover:text-(--lp-accent-hover)">
              {blog.title}
            </h3>

            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-(--lp-text-muted)">
              {blog.shortDescription}
            </p>

            <div className="mt-4 flex items-center gap-4 border-t border-(--lp-border) pt-4 text-xs text-(--lp-text-subtle)">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {blog.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    </Wrapper>
  );
}

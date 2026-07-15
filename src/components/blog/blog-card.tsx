"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { staggerItem } from "@/lib/motion";
import type { Blog } from "@/types";

interface BlogCardProps {
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

export function BlogCard({ blog, animated = false }: BlogCardProps) {
  const Wrapper = animated ? motion.article : "article";
  const wrapperProps = animated ? { variants: staggerItem } : {};

  return (
    <Wrapper {...wrapperProps}>
      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden rounded-xl border-hairline bg-surface-indigo transition-transform hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-5">
            <Badge className="mb-3">{blog.category}</Badge>
            <h3 className="font-display line-clamp-2 text-lg font-bold leading-snug group-hover:text-discord-link">
              {blog.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {blog.shortDescription}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {blog.readingTimeMinutes} min read
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Wrapper>
  );
}

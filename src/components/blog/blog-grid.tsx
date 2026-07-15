"use client";

import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog/blog-card";
import { staggerContainer } from "@/lib/motion";
import type { Blog } from "@/types";

interface BlogGridProps {
  blogs: Blog[];
  animated?: boolean;
}

export function BlogGrid({ blogs, animated = false }: BlogGridProps) {
  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
    : {};

  return (
    <Wrapper className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" {...wrapperProps}>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} animated={animated} />
      ))}
    </Wrapper>
  );
}

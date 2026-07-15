"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { LandingBlogCard } from "@/features/landing/landing-blog-card";
import type { Blog } from "@/types";

interface LandingBlogGridProps {
  blogs: Blog[];
  animated?: boolean;
}

export function LandingBlogGrid({ blogs, animated = false }: LandingBlogGridProps) {
  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
    : {};

  return (
    <Wrapper
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      {...wrapperProps}
    >
      {blogs.map((blog) => (
        <LandingBlogCard key={blog.id} blog={blog} animated={animated} />
      ))}
    </Wrapper>
  );
}

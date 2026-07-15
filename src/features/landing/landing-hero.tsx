"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { fadeInUp } from "@/lib/motion";

export function LandingHero() {
  return (
    <section className="landing-hero-bg relative overflow-hidden py-24 md:py-36">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-(--lp-border) bg-(--lp-accent-soft) px-4 py-1.5 text-sm text-(--lp-accent-hover)">
            <Sparkles className="h-3.5 w-3.5" />
            Stories worth reading
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-(--lp-text) md:text-5xl lg:text-6xl">
            Ideas, insights, and inspiration —{" "}
            <span className="text-(--lp-accent-hover)">all in one place</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-(--lp-text-muted) md:text-lg">
            Discover thoughtful articles on technology, design, and business.
            Written by creators, curated for curious minds.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/blogs"
              className="landing-btn-primary inline-flex h-11 items-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors"
            >
              Explore articles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="landing-btn-ghost inline-flex h-11 items-center rounded-lg px-6 text-sm font-medium transition-colors"
            >
              About us
            </Link>
          </div>
        </motion.div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-(--lp-border-strong) to-transparent"
        aria-hidden
      />
    </section>
  );
}

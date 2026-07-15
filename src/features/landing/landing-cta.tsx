"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import { Container } from "@/components/layout/container";
import { fadeInUp } from "@/lib/motion";

export function LandingCta() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          className="landing-cta-glow rounded-2xl px-8 py-12 text-center md:px-16 md:py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="font-display text-2xl font-semibold text-(--lp-text) md:text-3xl">
            Discover more stories
          </h2>
          <p className="mx-auto mt-3 max-w-md text-(--lp-text-muted)">
            Browse our full collection of articles on technology, design, business,
            and more.
          </p>
          <Link
            href="/blogs"
            className="landing-btn-primary mt-8 inline-flex h-11 items-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors"
          >
            <PenLine className="h-4 w-4" />
            Browse all articles
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

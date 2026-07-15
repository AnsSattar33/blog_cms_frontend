"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { fadeInUp } from "@/lib/motion";

export function HeroSection() {
  return (
    <section className="discord-gradient-mesh relative overflow-hidden py-20 md:py-32">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-indigo/80 px-4 py-1.5 text-sm">
            <BookOpen className="h-4 w-4 text-discord-green" />
            Modern Blog CMS Platform
          </div>
          <h1 className="font-display text-display-xl uppercase tracking-tight">
            Share your stories with the world
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            A clean, scalable platform for publishing beautiful blog content.
            Write, manage, and grow your audience — all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="green">
              <Link href="/blogs">
                Read Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-hairline bg-surface-indigo">
              <Link href="/about">About us</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

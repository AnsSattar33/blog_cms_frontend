"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { fadeInUp } from "@/lib/motion";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          className="rounded-[40px] bg-primary p-10 text-center md:p-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="font-display text-display-md uppercase">
            Discover more stories
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
            Browse our full collection of articles on technology, design, and more.
          </p>
          <Button asChild size="lg" variant="green" className="mt-8">
            <Link href="/blogs">
              <PenSquare className="mr-2 h-4 w-4" />
              Browse all articles
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

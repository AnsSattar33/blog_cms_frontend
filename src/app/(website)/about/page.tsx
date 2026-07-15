import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PublicPageHero } from "@/features/landing/public-page-hero";

export default function AboutPage() {
  return (
    <>
      <PublicPageHero
        badge="Who we are"
        title="About"
        highlight="us"
        description="A modern blog platform for thoughtful articles on technology, design, business, and culture."
      />

      <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="landing-card rounded-2xl p-8 md:p-10">
              <p className="text-base leading-relaxed text-(--lp-text-muted) md:text-lg">
                Welcome to our blog platform. We publish articles on technology,
                design, business, and more — curated for readers who want
                thoughtful, practical content.
              </p>
              <p className="mt-4 leading-relaxed text-(--lp-text-muted)">
                Our mission is to share ideas that inspire, inform, and help you
                stay ahead in a fast-moving world. Every article is written with
                clarity and purpose.
              </p>
              <p className="mt-4 text-sm text-(--lp-text-subtle)">
                This page is a placeholder. More information about our mission
                and team will be added soon.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blogs"
                className="landing-btn-primary inline-flex h-11 items-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors"
              >
                Explore articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="landing-btn-ghost inline-flex h-11 items-center rounded-lg px-6 text-sm font-medium transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

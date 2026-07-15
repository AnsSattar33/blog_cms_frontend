import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogService } from "@/services/blog.service";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/common/empty-state";
import { LANDING_EMPTY_CLASS } from "@/features/landing/landing-classes";
import { LandingHero } from "@/features/landing/landing-hero";
import { LandingCta } from "@/features/landing/landing-cta";
import { LandingBlogGrid } from "@/features/landing/landing-blog-grid";
import { LandingSectionHeader } from "@/features/landing/landing-section-header";
import {
  LandingLeaderboardAd,
  LandingMediumRectangleAd,
} from "@/components/ads/landing-ads";

export default async function LandingPage() {
  let featured: Awaited<ReturnType<typeof blogService.getFeatured>>["data"] = [];
  let latest: Awaited<ReturnType<typeof blogService.getLatest>>["data"] = [];
  let hasError = false;

  try {
    const [featuredRes, latestRes] = await Promise.all([
      blogService.getFeatured(),
      blogService.getLatest(6),
    ]);
    featured = featuredRes.data;
    latest = latestRes.data;
  } catch {
    hasError = true;
  }

  return (
    <>
      <LandingHero />

      <LandingLeaderboardAd />

      <section className="py-16 md:py-24">
        <Container>
          <LandingSectionHeader
            title="Featured articles"
            description="Hand-picked stories from our editorial team"
          />
          {hasError ? (
            <EmptyState
              title="Unable to load featured articles"
              description="Please try again later."
              className={LANDING_EMPTY_CLASS}
            />
          ) : featured.length ? (
            <LandingBlogGrid blogs={featured} animated />
          ) : (
            <EmptyState
              title="No featured articles yet"
              description="Check back soon for new content."
              className={LANDING_EMPTY_CLASS}
            />
          )}
        </Container>
      </section>

      <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <LandingSectionHeader
              title="Latest from the blog"
              description="Fresh perspectives on tech, design, and culture"
              align="left"
              className="mb-0"
            />
            <Link
              href="/blogs"
              className="landing-btn-ghost inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {hasError ? (
            <EmptyState
              title="Unable to load latest blogs"
              description="Please try again later."
              className={LANDING_EMPTY_CLASS}
            />
          ) : latest.length ? (
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
              <LandingBlogGrid blogs={latest} animated />
              <aside className="mx-auto w-full max-w-[300px] shrink-0 xl:mx-0 xl:sticky xl:top-28">
                <LandingMediumRectangleAd />
              </aside>
            </div>
          ) : (
            <EmptyState
              title="No blogs published yet"
              description="Be the first to share a story."
              className={LANDING_EMPTY_CLASS}
            />
          )}
        </Container>
      </section>

      <LandingCta />
    </>
  );
}

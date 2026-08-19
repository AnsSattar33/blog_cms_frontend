import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PublicPageHero } from "@/features/landing/public-page-hero";
import { SITE_NAME, buildPageMetadata, webPageJsonLd } from "@/lib/site";

const ABOUT_TITLE = `About ${SITE_NAME}`;
const ABOUT_DESCRIPTION =
  "Blog CMS publishes practical articles on technology, design, business, and culture. Learn what this site is and how we approach editorial content.";

export const metadata = buildPageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: ABOUT_TITLE,
          description: ABOUT_DESCRIPTION,
          path: "/about",
        })}
      />
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
                Blog CMS is a publishing platform for articles on technology,
                design, business, lifestyle, and software development. The public
                site is for reading; editors manage posts from a private
                dashboard.
              </p>
              <p className="mt-4 leading-relaxed text-(--lp-text-muted)">
                Featured and latest stories appear on the homepage. The full
                archive lives on the articles page, where you can browse by topic
                when you need to narrow the list.
              </p>
              <p className="mt-4 text-sm text-(--lp-text-subtle)">
                Team biographies and a longer mission statement are not published
                on this site yet.
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

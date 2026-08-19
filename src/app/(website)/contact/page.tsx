import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PublicPageHero } from "@/features/landing/public-page-hero";
import { SITE_NAME, buildPageMetadata, webPageJsonLd } from "@/lib/site";

const CONTACT_TITLE = `Contact ${SITE_NAME}`;
const CONTACT_DESCRIPTION =
  "Questions, topic ideas, or feedback about Blog CMS articles? This page explains how to reach the editorial team.";

export const metadata = buildPageMetadata({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  absoluteTitle: true,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: CONTACT_TITLE,
          description: CONTACT_DESCRIPTION,
          path: "/contact",
        })}
      />
      <PublicPageHero
        badge="Reach out"
        title="Contact"
        highlight="us"
        description="Have a question, feedback, or collaboration idea? We would love to hear from you."
      />

      <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="landing-card rounded-2xl p-8 md:p-10">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-(--lp-accent-soft) text-(--lp-accent-hover)">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                We are here to help
              </h2>
              <p className="mt-3 leading-relaxed text-(--lp-text-muted)">
                Whether you have a question about our content, want to suggest a
                topic, or share feedback, we welcome it. There is no public
                contact form on this page yet, so a dedicated email address and
                form have not been published.
              </p>
              <p className="mt-4 text-sm text-(--lp-text-subtle)">
                Until a form is added, use the articles archive to keep reading,
                or check back here for contact details.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blogs"
                className="landing-btn-primary inline-flex h-11 items-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors"
              >
                Browse articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="landing-btn-ghost inline-flex h-11 items-center rounded-lg px-6 text-sm font-medium transition-colors"
              >
                About us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

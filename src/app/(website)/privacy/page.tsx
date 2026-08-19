import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PublicPageHero } from "@/features/landing/public-page-hero";
import { SITE_NAME, buildPageMetadata, webPageJsonLd } from "@/lib/site";

const PRIVACY_TITLE = "Privacy policy";
const PRIVACY_DESCRIPTION =
  "How Blog CMS handles accounts, cookies, uploaded images, and third-party scripts on this website.";

export const metadata = buildPageMetadata({
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: PRIVACY_TITLE,
          description: PRIVACY_DESCRIPTION,
          path: "/privacy",
        })}
      />
      <PublicPageHero
        badge="Legal"
        title="Privacy"
        highlight="policy"
        description="This page describes data practices that are actually present in this application."
      />

      <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl space-y-8 text-(--lp-text-muted)">
            <p className="text-sm text-(--lp-text-subtle)">
              Last updated: 19 August 2026
            </p>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                Who this applies to
              </h2>
              <p>
                {SITE_NAME} is a public blog with a private administrator
                dashboard. Readers can browse published articles without creating
                an account. There is no public registration.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                Accounts and authentication
              </h2>
              <p>
                Administrators sign in with an email address and password. After
                a successful login, the site stores a session cookie named{" "}
                <code className="text-(--lp-text)">blog-cms-session</code> so the
                dashboard can confirm that the browser is authenticated. The
                login page and dashboard are for operators of this site, not for
                public user accounts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                Cookies and local storage
              </h2>
              <p>
                The session cookie above is used for administrator authentication.
                Theme preference (dark or light) is stored in the browser through
                the site&apos;s theme library so your chosen appearance can persist
                between visits. This site does not implement a first-party
                analytics product.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                Content and image storage
              </h2>
              <p>
                Blog posts, including titles, body content, categories, and tags,
                are stored by the site&apos;s backend database. Cover images that
                administrators upload are stored with Cloudinary so they can be
                displayed on article pages.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                Third-party scripts and advertising
              </h2>
              <p>
                The public site loads advertising scripts from third-party
                hosts (including 5gvci.com and quge5.com) and includes a Monetag
                verification meta tag. Those providers may set their own cookies
                or collect data according to their policies. A Google Search
                Console verification tag is also present so the site owner can
                prove ownership to Google.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                Contact and forms
              </h2>
              <p>
                The public contact page does not currently include a form or a
                published email address, so this site does not collect contact
                messages through the website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-(--lp-text)">
                APIs
              </h2>
              <p>
                The website talks to its own backend API (including through a
                same-origin <code className="text-(--lp-text)">/api</code> proxy)
                to load and, for administrators, manage blog content. Those
                endpoints are application infrastructure, not public profile
                pages.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}

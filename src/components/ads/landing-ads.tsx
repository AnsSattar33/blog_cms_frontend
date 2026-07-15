import { ExternalAdScript } from "@/components/ads/external-ad-script";
import { HighPerformanceAd } from "@/components/ads/high-performance-ad";

export function LandingBodyAds() {
  return (
    <ExternalAdScript
      id="landing-social-bar-ad"
      src="https://pl30382435.effectivecpmnetwork.com/8b/fe/ec/8bfeecabdcc3619a633ff204ed23abcd.js"
      delayMs={300}
    />
  );
}

export function LandingLeaderboardAd() {
  return (
    <section className="w-full overflow-x-auto border-y border-(--lp-border) bg-(--lp-bg-elevated) py-4">
      <div className="flex min-w-[728px] justify-center px-4">
        <HighPerformanceAd
          adKey="fe19dd730355ab646cc2e9aa46d68a0b"
          width={728}
          height={90}
        />
      </div>
    </section>
  );
}

export function LandingMediumRectangleAd() {
  return (
    <HighPerformanceAd
      adKey="4968ee11dd23ea96ed34342d73039c5a"
      width={300}
      height={250}
    />
  );
}

export function LandingSkyscraperAd() {
  return (
    <aside className="pointer-events-none fixed top-28 right-2 z-40 hidden lg:block">
      <div className="pointer-events-auto">
        <HighPerformanceAd
          adKey="d418a736efb618fabdf2bfbca17d371a"
          width={160}
          height={600}
        />
      </div>
    </aside>
  );
}

export function LandingInlineAdRow() {
  return (
    <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-10 px-4">
        <HighPerformanceAd
          adKey="1c83f203a30b84fdebc366f0846f4c84"
          width={468}
          height={60}
        />
        <HighPerformanceAd
          adKey="0d0291b5394e885a5eaa6b1ad74a7507"
          width={320}
          height={50}
        />
      </div>
    </section>
  );
}

import "@/features/landing/landing.css";
import { PublicShell } from "@/app/(website)/public-shell";
import { LandingBodyAds, LandingInlineAdRow, LandingSkyscraperAd } from "@/components/ads/landing-ads";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicShell variant="landing">
      <LandingBodyAds />
      <LandingSkyscraperAd />
      {children}
      <LandingInlineAdRow />
    </PublicShell>
  );
}

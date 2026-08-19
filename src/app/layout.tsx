import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import {
  DEFAULT_OG_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Articles on Technology, Design, and Business`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Articles on Technology, Design, and Business`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_PATH }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Articles on Technology, Design, and Business`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_PATH],
  },
  verification: {
    google: "iwga6og7ZBusx-R1A29T1MPqBwLLKP5nE0ciKMg6AuI",
  },
  other: {
    monetag: "befe852014d38235d88f971377a68740",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-canvas text-foreground">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
              { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            ],
          }}
        />
        <Script
          src="https://5gvci.com/act/files/tag.min.js?z=11605850"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <Script
          src="https://5gvci.com/act/files/tag.min.js?z=11605855"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <ThemeProvider>
          <QueryProvider>
            {children}
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </ThemeProvider>
        <Script
          src="https://quge5.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="271253"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}

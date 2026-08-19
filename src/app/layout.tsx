import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
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
  title: {
    default: "Blog CMS",
    template: "%s | Blog CMS",
  },
  description: "A modern blog content management system",
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

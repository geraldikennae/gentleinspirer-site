import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { getHomeContent } from "@/lib/content";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  return {
    title: settings?.seo.title ?? "gentleinspirer.com · Clarity precedes movement",
    description: settings?.seo.description ?? "Growth is designed, not desired. Structured growth systems, leadership development and disciplined execution with Gerald I. Egeonu, founder of The Growth Circle.",
    icons: {
      icon: [
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon-180.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000080",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Every page under this layout is already dynamic, so fetching here (used
  // by both the hero slider on / and the footer quote everywhere) costs
  // nothing extra in caching behavior.
  const [content, settings] = await Promise.all([getHomeContent().catch(() => null), getSiteSettings().catch(() => null)]);
  const footerQuotes = content?.heroQuotes.map((q) => `${q.line1} ${q.line2}`);

  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <Footer quotes={footerQuotes} contactEmail={settings?.contactEmail} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Magnetic } from "@/components/motion/Magnetic";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Medical Billing & Revenue Cycle Management`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: true, address: false, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Emitted only when a code is actually set — see site.verification.
  ...(site.verification.google || site.verification.bing
    ? {
        verification: {
          ...(site.verification.google ? { google: site.verification.google } : {}),
          ...(site.verification.bing
            ? { other: { "msvalidate.01": site.verification.bing } }
            : {}),
        },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: site.url,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: [`${site.url}/og.png`] },
};

export const viewport = {
  themeColor: "#05080F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ScrollProgress />
        <Magnetic />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}

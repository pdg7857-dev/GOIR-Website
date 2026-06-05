import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { SITE } from "@/lib/site/config";
import { JsonLd, organizationJsonLd } from "@/lib/site/seo";
import { SiteAnalytics } from "@/components/site/analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Phil Dave | I find the government bids worth winning",
    template: "%s | Phil Dave",
  },
  description:
    "Phil Dave monitors every procurement platform, reads the documents and qualifies the fit, so contractors across Canada and the U.S. stop searching portals and start bidding the work that is worth winning.",
  applicationName: SITE.brandFull,
  authors: [{ name: "Phil Dave" }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <SiteAnalytics />
      </body>
    </html>
  );
}

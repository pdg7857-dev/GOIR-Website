import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Site analytics, all opt-in via env so nothing loads (or slows the site) until
 * the IDs are set in the deployment environment:
 *
 *  - Microsoft Clarity  -> click/scroll heatmaps + session recordings + geo.
 *    Set NEXT_PUBLIC_CLARITY_ID to your Clarity project ID.
 *  - Vercel Analytics    -> cookie-free traffic dashboard (top pages, countries,
 *    referrers, devices). Auto-enabled on Vercel; harmless elsewhere.
 *  - Vercel Speed Insights -> Core Web Vitals (mobile + desktop).
 */
export function SiteAnalytics() {
  // Public Clarity project ID. Committed so heatmaps/recordings work on deploy;
  // override per-environment with NEXT_PUBLIC_CLARITY_ID if ever needed.
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || "wzymksdq10";
  return (
    <>
      {clarityId ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

import Link from "next/link";
import { FileBarChart, ArrowRight } from "lucide-react";
import { REPORT_URL, GOIR_ENABLED, SITE } from "@/lib/site/config";

// When the report app URL is external, open it in a new tab.
const reportExternal = /^https?:\/\//.test(REPORT_URL);
const reportLinkProps = reportExternal ? { target: "_blank" as const, rel: "noopener" } : {};

// While the lead magnet is off, this CTA promotes a discovery call instead.
const ctaHref = GOIR_ENABLED ? REPORT_URL : SITE.bookingUrl;
const ctaHeading = GOIR_ENABLED
  ? "Get your free Government Opportunity Intelligence Report"
  : "See real government opportunities, before you pay a cent";
const ctaBody = GOIR_ENABLED
  ? "In one report you will see exactly where your team is wasting estimator time, which platforms you are under-covering, and which contracts are about to rebid in your market."
  : "Book a 20-minute discovery call and I'll bring live, qualified opportunities in your trade and jurisdictions, already found and read for you.";
const ctaButton = GOIR_ENABLED ? "Get your free report" : "Book a discovery call";
const ctaEyebrow = GOIR_ENABLED ? "Free assessment" : "Free discovery call";

/**
 * Government Opportunity Intelligence Report (GOIR) call to action. The GOIR is
 * the site's primary lead magnet: every money page, platform page and blog post
 * funnels toward it.
 */
export const GOIR_INCLUDES = [
  "Your GOII Score (Government Opportunity Intelligence Index)",
  "An Opportunity Waste Estimate for your current process",
  "A Platform Coverage Analysis across the systems your buyers use",
  "A Renewal Opportunity Analysis of contracts likely to rebid",
  "A Government Contracting Maturity Assessment",
];

// Shown on the CTA while the lead magnet is off, what you get on the call.
export const CALL_INCLUDES = [
  "Live opportunities in your trade and jurisdictions",
  "Already found, read and qualified before the call",
  "An honest read on coverage gaps in your market",
  "Twenty minutes, no cost, no obligation",
];

export function GoirCta({
  className = "",
  variant = "band",
}: {
  className?: string;
  variant?: "band" | "inline";
}) {
  if (variant === "inline") {
    return (
      <div className={`rounded-2xl border-l-4 border-warn bg-warn-soft/20 p-6 ${className}`}>
        <div className="flex items-start gap-3">
          <FileBarChart className="mt-0.5 h-6 w-6 shrink-0 text-warn" />
          <div>
            <h3 className="text-lg font-semibold text-fg">{ctaHeading}</h3>
            <p className="mt-1.5 text-fg-muted">{ctaBody}</p>
            <Link
              href={ctaHref}
              {...(GOIR_ENABLED ? reportLinkProps : {})}
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent"
            >
              {ctaButton} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`bg-bg ${className}`}>
      <div className="container py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg-panel to-bg px-6 py-12 sm:px-12">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow text-accent">{ctaEyebrow}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold text-fg sm:text-4xl">
                {ctaHeading}
              </h2>
              <p className="mt-4 text-lg leading-8 text-fg-muted">{ctaBody}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={ctaHref} {...(GOIR_ENABLED ? reportLinkProps : {})} className="btn-gold px-6 py-3 text-base">
                  {ctaButton}
                </Link>
                <Link
                  href="/opportunity-waste-calculator"
                  className="btn-ghost border-white/20 bg-white/5 px-6 py-3 text-base text-fg hover:border-white/40 hover:text-fg"
                >
                  Calculate your opportunity waste
                </Link>
              </div>
            </div>
            <ul className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              {(GOIR_ENABLED ? GOIR_INCLUDES : CALL_INCLUDES).map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-fg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

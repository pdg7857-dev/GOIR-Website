import type { Metadata } from "next";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";
import { SITE } from "@/lib/site/config";

const meta = pageMeta({
  title: "Free Competitive Position Report for Government Contractors",
  description:
    "Find out who is winning the government contracts you should be bidding. I pull the public award record for your trade and jurisdictions and send back a deep dive on your competitors, the buyers, and the gaps you are missing. Free, no obligation.",
  path: "/free-opportunities",
  keywords: [
    "government contract competitor analysis",
    "who wins government contracts",
    "public procurement award data",
    "government contract market analysis",
    "competitor bid intelligence",
  ],
});

export const metadata: Metadata = {
  ...meta,
  alternates: {
    canonical: SITE.domain + "/free-opportunities",
    languages: {
      en: SITE.domain + "/free-opportunities",
      "fr-CA": SITE.domain + "/fr/free-opportunities",
    },
  },
};

const FAQS = [
  { q: "Is it really free?", a: "Yes. No cost and no obligation. I build it from the public award record, so it costs me research time rather than anything you need to pay for. You keep the report either way." },
  { q: "Where does the information come from?", a: "Public sources. Government buyers publish who won a contract, what it was for and what it was worth. Most contractors never look at that record. I pull it for your category and jurisdictions and turn it into something you can act on." },
  { q: "What exactly will I get?", a: "A deep dive on your corner of the market: the companies winning the work you should be bidding, how often they win and at what values, the buyers who award it repeatedly, and where work is being awarded that you are not showing up for. Plus an honest read on your best opening." },
  { q: "How soon will I get it?", a: "Within 5 business days. I build each one by hand, so it is real research on your trade and your jurisdictions, not an automated export." },
];

const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;
const accent = "var(--color-accent)";

const STEPS = [
  { n: "01", t: "You tell me the basics", b: "Your trade, where you work, and roughly the size of contract you can deliver. Takes a minute." },
  { n: "02", t: "I pull the public award record", b: "Who won what in your category, from which buyers, at what values, across the platforms serving your footprint." },
  { n: "03", t: "You get the deep dive, inside 5 business days", b: "Your competitors named, the buyers who keep buying, and the gaps where you should be bidding and are not." },
];

const INCLUDES = [
  "The companies winning contracts in your category, how often, and at what values",
  "The buyers who award this work repeatedly, and what they actually buy",
  "Where work is being awarded that you are not showing up for",
  "An honest read on where your best opening is, and what it would take",
];

export default function FreeOpportunitiesPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Free competitive position report", path: "/free-opportunities" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />
      <div className="nz-gridwash" />

      <main
        className="relative mx-auto grid max-w-[1100px] items-start gap-14 px-4 sm:px-7"
        style={{ zIndex: 1, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", padding: "clamp(40px, 7vw, 80px) clamp(16px, 4vw, 28px) 80px" }}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span className="blip" />
            <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Free competitive position report · no obligation</span>
          </div>
          <h1 className="mt-5" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: "17ch" }}>
            See who is winning the contracts you should be bidding.
          </h1>
          <div className="rule mt-6" />
          <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "48ch" }}>
            Government buyers publish who won, what for, and what it was worth. Almost nobody reads
            that record. Tell me your trade and where you work, and I will pull it for your category
            and send back a deep dive on your competitors, the buyers behind them, and the work you
            are not showing up for.
          </p>

          <div className="mt-9 grid gap-5 pt-7" style={{ borderTop: `1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)` }}>
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span style={{ flex: "none", fontSize: 11, letterSpacing: "0.16em", color: accent, paddingTop: 3 }}>{s.n}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 5, color: "var(--color-text)" }}>{s.t}</div>
                  <p className="text-sm" style={{ color: muted(66), lineHeight: 1.55 }}>{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="panel mt-8 p-5">
            <p className="hud" style={{ color: accent }}>What is in it</p>
            <ul className="mt-3 space-y-2">
              {INCLUDES.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: muted(72), lineHeight: 1.5 }}>
                  <span aria-hidden style={{ color: accent }}>&rsaquo;</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs" style={{ color: muted(50), lineHeight: 1.5 }}>
              Built entirely from published award records. Nothing confidential, nothing you could
              not find yourself with enough hours.
            </p>
          </div>
        </div>

        <IntelLeadForm />
      </main>
    </div>
  );
}

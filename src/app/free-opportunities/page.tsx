import type { Metadata } from "next";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";
import { SITE } from "@/lib/site/config";

const meta = pageMeta({
  title: "Get Free Government Bid Opportunities for Your Trade",
  description:
    "Tell me your trade and where you bid, and I'll send you a short list of real, current government opportunities you have not found, already qualified with source links. Free, no obligation, no spam.",
  path: "/free-opportunities",
  keywords: [
    "free government bid opportunities",
    "government contract leads",
    "bid opportunities for contractors",
    "find government tenders",
    "government RFP leads",
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
  { q: "Is it really free?", a: "Yes. No cost and no obligation. I send you real opportunities so you can see the quality of what I do before you ever consider paying for ongoing coverage." },
  { q: "What exactly will I get?", a: "A short list of current government opportunities that fit your trade and where you bid, each with a link to the source bid on the issuing platform. The full document review and qualification is what I do for paying clients." },
  { q: "How soon will I hear back?", a: "Within 3 business days. I prepare each list personally, so it is real research on your trade and jurisdictions, not an automated email." },
];

const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;
const accent = "var(--color-accent)";

const STEPS = [
  { n: "01", t: "You tell me the basics", b: "Your trade, where you bid, and a few quick details about your shop. Takes a minute." },
  { n: "02", t: "I run the sweep", b: "Every platform in your footprint, documents opened, fit judged against what you told me." },
  { n: "03", t: "You get the short list, inside 3 business days", b: "Plain language summaries and direct links. Bid them yourself, with or without me. No pitch attached." },
];

export default function FreeOpportunitiesPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Request your free opportunities", path: "/free-opportunities" },
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
            <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Free intel report · no obligation</span>
          </div>
          <h1 className="mt-5" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: "15ch" }}>
            See the bids you are missing.
          </h1>
          <div className="rule mt-6" />
          <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "46ch" }}>
            Tell me your trade and where you bid. I will go through the platforms serving your
            footprint and send back a short list of real, currently open opportunities you have not
            seen, read, qualified and linked.
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
        </div>

        <IntelLeadForm />
      </main>
    </div>
  );
}

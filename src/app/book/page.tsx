import type { Metadata } from "next";
import { Clock, Eye, ShieldCheck } from "lucide-react";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { FaqAccordion } from "@/components/site/faq";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Book a 20-Minute Discovery Call",
  description:
    "Book a 20-minute discovery call. Before you pay a cent, I will show you real, qualified government opportunities in your trade and jurisdictions, so you can see the quality for yourself.",
  path: "/book",
  keywords: [
    "book government bid discovery call",
    "government opportunity consultation",
    "free procurement opportunity review",
    "government contract opportunity call",
  ],
});

const accent = "var(--color-accent)";
const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

const FAQS = [
  { q: "Is the call free, and is there any pressure?", a: "Yes, it is free, and no, there is no pressure. The point of the call is to show you the quality of what I find. If it is obviously useful, we talk about coverage. If it is not a fit, you walk away with real opportunities you can pursue anyway." },
  { q: "Will you really show me live opportunities before I pay?", a: "I will. Tell me your trade and where you bid when you book, and I will come to the call with actual, current opportunities in your jurisdictions, already read and qualified. There is no better way to judge what I do than to see it on your own work." },
  { q: "Do you write or submit the bid for me?", a: "No. I find, read and qualify opportunities so your team spends time only on the ones worth pursuing. You own the pricing, the proposal and the submission. I am the discovery and qualification side, not a proposal shop." },
  { q: "What does coverage cost after the call?", a: "Coverage is billed once a year, never monthly, and priced by the geography you need rather than per opportunity or per platform. You can start with a sixty day pilot. I quote it on the call, and only if the opportunities I show you make it worth your while." },
];

const STEPS = [
  { n: "01", t: "You tell me what you chase", b: "Your trades, your jurisdictions, the size and type of work you want more of. A couple of minutes is enough to point me in the right direction." },
  { n: "02", t: "I show you real, current opportunities", b: "Live notices in your area that fit your trade, already read and qualified the way I do it for clients. This is the part most people are surprised by." },
  { n: "03", t: "You decide if it is worth continuing", b: "If the opportunities are clearly worth it, I explain coverage for your area. If not, you keep what I showed you and we shake hands. No pressure either way." },
];

const BRING = [
  "The trades or services you want more government work in",
  "The provinces, states or cities where you can actually deliver",
  "Any bonding, licensing or capacity limits worth knowing up front",
  "A sense of the contract size that fits your shop",
];

export default function BookPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book a call", path: "/book" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />
      <div className="nz-gridwash" />

      <main className="relative mx-auto max-w-[1360px] px-4 sm:px-7" style={{ zIndex: 1, padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 28px) 80px" }}>
        <div className="flex items-center gap-2.5">
          <span className="blip" />
          <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Discovery call · 20 minutes · no cost</span>
        </div>
        <h1 className="mt-5" style={{ fontSize: "clamp(30px, 4.4vw, 50px)", lineHeight: 1.02, letterSpacing: "-0.035em", maxWidth: "20ch" }}>
          See real opportunities in your jurisdictions, before you pay a cent.
        </h1>
        <div className="rule mt-6" />
        <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "56ch" }}>
          Twenty minutes. You tell me your trade and where you bid. I come to the call with live,
          qualified government opportunities I have already found and read for your area. No slides,
          no pitch you have heard before, just the work, on your screen.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" style={{ color: muted(70) }}>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" style={{ color: accent }} /> 20 minutes</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" style={{ color: accent }} /> No cost, no obligation</span>
          <span className="inline-flex items-center gap-2"><Eye className="h-4 w-4" style={{ color: accent }} /> Real opportunities, not a demo</span>
        </div>

        <div className="mt-12 grid items-start gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
          <div>
            <p className="idx">How the twenty minutes go</p>
            <div className="mt-6 grid gap-5">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span style={{ flex: "none", fontSize: 11, letterSpacing: "0.16em", color: accent, paddingTop: 3 }}>{s.n}</span>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: "var(--color-text)" }}>{s.t}</div>
                    <p className="mt-1.5 text-sm" style={{ color: muted(66), lineHeight: 1.55 }}>{s.b}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="panel mt-8 p-5">
              <p className="hud" style={{ color: accent }}>What to bring</p>
              <ul className="mt-3 space-y-2">
                {BRING.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: muted(72), lineHeight: 1.5 }}>
                    <span aria-hidden style={{ color: accent }}>&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24" id="book">
            <CalendlyEmbed url={SITE.calendlyUrl} />
          </div>
        </div>

        <div className="mt-20">
          <p className="idx">Before you book</p>
          <div className="mt-6 max-w-3xl">
            <FaqAccordion faqs={FAQS} />
          </div>
        </div>
      </main>
    </div>
  );
}

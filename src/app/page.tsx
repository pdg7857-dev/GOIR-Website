import type { Metadata } from "next";
import Link from "next/link";
import { IntelScripts, IntelGlobe, CoverageMap } from "@/components/intel/intel-scripts";
import {
  ScrollReveal,
  InterceptTicker,
  ScreeningEngine,
  CostBand,
  ChannelLog,
} from "@/components/intel/console";
import { IntelLeadForm } from "@/components/intel/lead-form";
import {
  PLATFORM_CARDS,
  STREAMS,
  JURISDICTIONS,
  SECTION_CHIPS,
} from "@/lib/intel/data";
import { SITE } from "@/lib/site/config";
import { JsonLd, faqJsonLd } from "@/lib/site/seo";

/**
 * The homepage previously had no metadata of its own and inherited the layout
 * defaults. It is the most linked page on the site, so it gets a title and
 * description written for it, plus reciprocal hreflang with the French home.
 */
export const metadata: Metadata = {
  title: { absolute: "Government Bid Monitoring and Opportunity Intelligence | Phil Dave" },
  description:
    "I monitor every government procurement platform across Canada and the United States, read the bid documents and qualify the fit, so contractors only work the opportunities worth winning. Start with a free competitive position report.",
  keywords: [
    "government bid monitoring",
    "government opportunity intelligence",
    "government contract opportunities Canada",
    "bid qualification service",
    "defence contract opportunities",
    "MERX CanadaBuys SAM.gov monitoring",
  ],
  alternates: {
    canonical: SITE.domain + "/",
    languages: { en: SITE.domain + "/", "fr-CA": SITE.domain + "/fr" },
  },
  openGraph: {
    title: "Government Bid Monitoring and Opportunity Intelligence",
    description:
      "I find, read and qualify the government contracts worth your time, across Canada and the United States.",
    url: SITE.domain + "/",
    siteName: SITE.brandFull,
    type: "website",
  },
};

const accent = "var(--color-accent)";
const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const accent22 = "color-mix(in srgb, var(--color-accent) 22%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

const FAQS = [
  {
    q: "Do you write or submit the proposal?",
    a: "No. I am not a bid writer and I do not submit anything on your behalf. I find, read and qualify the opportunities. Pricing and proposals stay with your team, where they belong.",
  },
  {
    q: "What if I do not get enough out of it?",
    a: "Then I keep working for free. Every term carries a guaranteed minimum of qualified opportunities, agreed with you in writing before you pay. If I have not reached that number by the end of the term, coverage continues at no charge until I do. The risk of the first year sits with me.",
  },
  {
    q: "How is this different from the alerts I already get?",
    a: "Alerts fire on keywords and qualify nothing. I read the documents, judge the fit against your trade and capacity, and hand you a short list with a verdict, not a full inbox you still have to triage.",
  },
  {
    q: "What if you miss a bid?",
    a: "Every term carries a guaranteed minimum of qualified opportunities, set with you when we scope your coverage, since every industry is different. If I do not deliver it, I keep working at no charge until I do.",
  },
  {
    q: "We already have someone in house. Why you?",
    a: "Then you already know how many hours the search eats. I take the monitoring, reading and qualification off their plate so those hours go into pricing and winning instead of living in portals.",
  },
  {
    q: "How is pricing set, and what is the guarantee?",
    a: "Coverage is quoted, not published. It is billed once a year, never monthly, and the figure is set by your industry and which stream you need, public sector or defence, so I quote it on a short call once I know what you actually need. Every term carries a guaranteed minimum of qualified opportunities, agreed with you when we scope it. If I do not reach that number, I keep working at no charge until I do.",
  },
];

const VECTORS = [
  { n: "01", t: "Fragmented surveillance", b: "A different login, search and alert setup for nearly every platform and municipality. No one is watching all of them at once." },
  { n: "02", t: "Noise not signal", b: "Keyword alerts fire on everything and qualify nothing. The one bid that mattered slips past, unread, in a full inbox." },
  { n: "03", t: "Buried detail", b: "The mandatory site meeting on page 14. The addendum that moved the close date. The catch you only find by opening the documents." },
  { n: "04", t: "Titles you would never search", b: "The work that fits you best is often filed under a heading you would never think to look under. If you are not watching the way buyers write, you never see it." },
];

const PHASES = [
  { n: "01", t: "Monitor", b: "I watch every platform serving your jurisdictions, continuously, so nothing depends on you remembering to log in.", lead: true },
  { n: "02", t: "Read", b: "I open the documents: scope, requirements, evaluation criteria, site meetings, addenda, the catch.", lead: true },
  { n: "03", t: "Qualify", b: "I judge fit against your trade, capacity and footprint, and set aside the bids that were never right for you.", lead: true },
  { n: "04", t: "You bid", b: "You get a short, plain language summary and a link to the source bid. Your team prices and submits. That part stays yours.", lead: false },
];

const CHANNELS = [
  "Daily qualified brief",
  "Real time alerts on new postings",
  "Shared dashboard",
  "Call or text when a bid cannot wait",
];

/** Section shell with the numbered index the design uses as a language. */
function Section({ id, index, children }: { id?: string; index?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "0 clamp(16px, 4vw, 28px) 96px" }}>
      <div className="mx-auto max-w-[1360px]">
        {index && <p className="idx" data-reveal style={{ marginBottom: 20 }}>{index}</p>}
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden" }}>
      <JsonLd data={faqJsonLd(FAQS.map((f) => ({ q: f.q, a: f.a })))} />
      <IntelScripts />
      <ScrollReveal />
      <div className="nz-gridwash" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section style={{ padding: "24px clamp(16px, 4vw, 28px) 36px" }}>
          <div
            className="mx-auto grid max-w-[1360px] items-center gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", minHeight: "calc(100vh - 96px)" }}
          >
            {/* Left */}
            <div data-reveal>
              <div className="flex items-center gap-2.5">
                <span className="blip" />
                <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>
                  Station active · 18 platforms · CAN / USA
                </span>
              </div>
              <h1 className="mt-5" style={{ fontSize: "clamp(34px, 5.2vw, 58px)", lineHeight: 0.99, letterSpacing: "-0.035em", maxWidth: "13ch" }}>
                Bid intelligence, not bid alerts.
              </h1>
              <div className="rule mt-5" />
              <p className="mt-6" style={{ maxWidth: "46ch", fontSize: 17, lineHeight: 1.6, color: muted(78) }}>
                I am Phil Dave. I watch every procurement platform that matters, read the bid
                documents, and qualify the fit, so your estimators stop drowning in portals and
                work only the opportunities worth pursuing. Public sector and defence, nationwide
                across Canada and the United States.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/free-opportunities" className="btn btn-primary" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Free position report
                </Link>
                <Link href="#pricing" className="btn btn-secondary" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Coverage streams
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 pt-6" style={{ borderTop: `1px solid ${accent22}` }}>
                {[
                  ["17,500+", "Accounts handled"],
                  ["3.5 yrs", "Inside the industry"],
                  ["18+", "Platforms monitored"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="tabular-nums" style={{ fontSize: 24, letterSpacing: "-0.02em", color: "var(--color-accent-200)" }}>{v}</div>
                    <div className="hud mt-1" style={{ fontSize: 9 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: track picture */}
            <div data-reveal>
              <div className="flex items-center justify-between px-3 py-2" style={{ border: `1px solid color-mix(in srgb, var(--color-accent) 26%, transparent)`, borderRadius: 4 }}>
                <span className="hud" style={{ fontSize: 9 }}>Live track picture</span>
                <span className="hud" style={{ fontSize: 9 }}>Hover a track · click to open section</span>
              </div>
              <div className="brackets relative mt-3 overflow-hidden" style={{ minHeight: "min(580px, 74vw)", border: `1px solid ${accent20}`, borderRadius: 4 }}>
                <IntelGlobe style={{ position: "absolute", inset: 0 }} />
                {/* radar sweep */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: 0.5 }}>
                  <div className="nz-sweep" style={{ position: "absolute", left: 0, right: 0, height: "32%", background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent)", animation: "nz-sweep 7s linear infinite" }} />
                </div>
              </div>
              {/* section chips: accessible equivalent of clicking a craft */}
              <div className="mt-3 flex flex-wrap gap-2">
                {SECTION_CHIPS.map((c) => (
                  <a key={c.code} href={c.target} className="group inline-flex items-center gap-2 rounded px-3 py-1.5 transition-colors" style={{ border: `1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)`, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: muted(62), textDecoration: "none" }}>
                    <span style={{ color: accent }}>{c.code}</span>
                    <span>{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Intercept ticker ─────────────────────────────────── */}
        <InterceptTicker />

        {/* ── 01 Threat ────────────────────────────────────────── */}
        <div style={{ height: 96 }} />
        <Section id="service">
          <div className="grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
            <div data-reveal>
              <p className="idx">01 / Threat assessment</p>
              <h2 className="mt-4" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em" }}>
                Bids are not lost at the proposal. They are lost at the search.
              </h2>
              <p className="mt-5" style={{ maxWidth: "46ch", color: muted(76), lineHeight: 1.6 }}>
                By the time most contractors sit down to write, they have already lost hours to the
                part of the job nobody trained them for: finding the right work, on the right
                platform, before it closes.
              </p>
            </div>
            <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
              {VECTORS.map((v) => (
                <div key={v.n} className="panel p-5" data-reveal>
                  <p className="hud" style={{ color: accent }}>Vector {v.n}</p>
                  <h3 className="mt-2" style={{ fontSize: 17 }}>{v.t}</h3>
                  <p className="mt-2 text-sm" style={{ color: muted(70), lineHeight: 1.55 }}>{v.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 02 Doctrine ──────────────────────────────────────── */}
        <Section id="process" index="02 / Doctrine">
          <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "18ch" }}>
            Four phases. I run the first three.
          </h2>
          <div className="mt-10 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
            {PHASES.map((p) => (
              <div
                key={p.n}
                data-reveal
                className="p-6"
                style={{
                  borderRadius: 4,
                  borderTop: p.lead ? `2px solid ${accent}` : `1px solid ${muted(30)}`,
                  border: p.lead ? undefined : `1px solid ${muted(12)}`,
                  borderTopWidth: p.lead ? 2 : 1,
                  borderTopColor: p.lead ? accent : muted(30),
                  background: p.lead ? "color-mix(in srgb, var(--color-accent) 7%, transparent)" : "transparent",
                }}
              >
                <p className="hud" style={{ color: p.lead ? accent : muted(40) }}>Phase {p.n}</p>
                <h3 className="mt-2" style={{ fontSize: 20, color: p.lead ? "var(--color-text)" : muted(60) }}>{p.t}</h3>
                <p className="mt-2 text-sm" style={{ color: muted(p.lead ? 72 : 45), lineHeight: 1.55 }}>{p.b}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4" style={{ border: `1px solid ${accent20}`, borderRadius: 4 }}>
            <span className="hud" style={{ color: accent }}>Delivery channels</span>
            {CHANNELS.map((c) => (
              <span key={c} className="text-sm" style={{ color: muted(70) }}>{c}</span>
            ))}
          </div>
        </Section>

        {/* ── 03 Screening engine ──────────────────────────────── */}
        <Section id="screening" index="03 / Screening engine">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "20ch" }}>
              Watch a bid qualify itself against your profile.
            </h2>
            <p data-reveal className="hud" style={{ fontSize: 10, color: muted(50) }}>Illustrative demonstration</p>
          </div>
          <div className="mt-10" data-reveal>
            <ScreeningEngine />
          </div>
        </Section>
      </div>

      {/* ── 04 Cost band (full bleed, outside the zIndex wrapper padding) ── */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 96 }} data-reveal>
        <CostBand />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── 05 Coverage board ────────────────────────────────── */}
        <Section id="coverage" index="05 / Coverage board">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div data-reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em" }}>Where I am already watching.</h2>
              <p className="mt-4" style={{ maxWidth: "50ch", color: muted(76), lineHeight: 1.6 }}>
                Twenty jurisdictions on the board, every Canadian province and the biggest US state
                markets, plus federal on both sides. Node size is the number of platforms I monitor there.
              </p>
            </div>
            <div className="hud" data-reveal style={{ textAlign: "right", lineHeight: 2 }}>
              20 jurisdictions<br />18 platforms monitored<br />Node size = platform count
            </div>
          </div>

          <div className="brackets relative mt-8 overflow-hidden" data-reveal style={{ height: "clamp(380px, 48vw, 560px)", border: `1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)`, borderRadius: 4, background: "color-mix(in srgb, #161826 66%, transparent)" }}>
            <CoverageMap style={{ position: "absolute", inset: 0 }} />
          </div>

          {/* Accessible, non-canvas equivalent of the board. */}
          <details data-reveal className="mt-4">
            <summary className="hud" style={{ cursor: "pointer", color: accent }}>View the jurisdiction list</summary>
            <div className="mt-4 overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: muted(60) }}>
                    <th style={{ padding: "6px 10px" }} className="hud">Jurisdiction</th>
                    <th style={{ padding: "6px 10px" }} className="hud">Type</th>
                    <th style={{ padding: "6px 10px" }} className="hud">Platforms monitored</th>
                  </tr>
                </thead>
                <tbody>
                  {JURISDICTIONS.map((j) => (
                    <tr key={j.id} style={{ borderTop: `1px solid ${muted(10)}` }}>
                      <td style={{ padding: "6px 10px", color: "var(--color-text)" }}>{j.name}</td>
                      <td style={{ padding: "6px 10px", color: muted(60) }}>{j.kind}</td>
                      <td style={{ padding: "6px 10px", color: muted(70) }}>{j.platforms.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Section>

        {/* ── 06 Platform expertise ────────────────────────────── */}
        <Section id="platforms" index="06 / Platform expertise">
          <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "22ch" }}>
            Every Canadian portal, plus the US when you bid south of the border.
          </h2>
          <div className="mt-10 grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {PLATFORM_CARDS.map((p) => (
              <div key={p.name} className="panel p-5" data-reveal>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 style={{ fontSize: 19 }}>{p.name}</h3>
                  <span className="hud" style={{ fontSize: 9 }}>{p.qualifier}</span>
                </div>
                <p className="mt-2 text-sm" style={{ color: muted(70), lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
          <p data-reveal className="mt-6 text-sm" style={{ color: muted(60) }}>
            Plus Alberta Purchasing Connection, SaskTenders, NBON, the Ontario Tenders Portal and
            every state system in your footprint.{" "}
            <Link href="/platforms" style={{ color: accent }}>See all platforms covered</Link>.
          </p>
        </Section>

        {/* ── 07 Coverage streams ──────────────────────────────── */}
        <Section id="pricing" index="07 / Coverage streams">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "20ch" }}>
              Coverage that runs nationwide, across Canada and the United States.
            </h2>
            <p data-reveal style={{ color: muted(76), lineHeight: 1.6 }}>
              I do not sell you a map. Coverage runs nationwide across Canada and the United States
              either way, and what you choose is the kind of contract you want watched: public
              sector, defence, or both. Each stream is quoted on a short call against your industry
              and the access you actually need. There is no per opportunity charge. I review as many
              as it takes.
            </p>
          </div>

          {/* The guarantee is the offer. No published count: the number is set per industry. */}
          <div
            data-reveal
            className="mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center"
            style={{ border: `1px solid ${accent}`, background: "color-mix(in srgb, var(--color-accent) 11%, transparent)", borderRadius: 4, boxShadow: "0 0 60px color-mix(in srgb, var(--color-accent) 18%, transparent)" }}
          >
            <div>
              <p className="hud" style={{ color: "var(--color-accent-200)", letterSpacing: "0.2em" }}>The guarantee</p>
              <h3 className="mt-2" style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}>
                A contract opportunity guarantee, set to your industry.
              </h3>
              <p className="mt-3 text-sm" style={{ color: muted(80), lineHeight: 1.6, maxWidth: "60ch" }}>
                Every term carries a guaranteed minimum of qualified opportunities. Because a
                janitorial contractor in one province and a national supplier do not see the same
                market, I set that number with you when we scope your coverage, not off a chart.
                If I do not reach it, I keep working at no charge until I do.
              </p>
              <ul className="mt-4 grid gap-1.5 text-sm">
                {[
                  "The number is agreed with you up front, in writing, before you pay",
                  "Every opportunity delivered with a verdict and a link to the source bid",
                  "Miss the number and the work continues free until it is met",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2" style={{ color: muted(72) }}>
                    <span aria-hidden style={{ color: accent, lineHeight: 1.5 }}>&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
              <p className="text-sm" style={{ color: muted(70), lineHeight: 1.6, maxWidth: "30ch" }}>
                The risk of the first year sits with me, not with you.
              </p>
              <Link href="/book" className="btn btn-primary mt-1" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>Set your number</Link>
            </div>
          </div>

          {/* Streams, not geographic tiers: coverage is nationwide in each. */}
          <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
            {STREAMS.map((stream) => {
              const featured = stream.featured;
              return (
                <div
                  key={stream.name}
                  data-reveal
                  className="relative flex flex-col p-6"
                  style={{
                    borderRadius: 4,
                    border: featured ? `1px solid ${accent}` : `1px solid ${accent20}`,
                    background: featured ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "color-mix(in srgb, #161826 66%, transparent)",
                    boxShadow: featured ? "0 0 40px color-mix(in srgb, var(--color-accent) 14%, transparent)" : undefined,
                  }}
                >
                  {featured && (
                    <span className="tag tag-accent" style={{ position: "absolute", top: 24, right: 24 }}>MOST CHOSEN</span>
                  )}
                  <p className="hud" style={{ color: featured ? "var(--color-accent-200)" : accent }}>{stream.name}</p>
                  <p className="mt-2 text-sm" style={{ color: muted(60) }}>{stream.scope}</p>
                  <p className="mt-4 tabular-nums" style={{ fontSize: 30, letterSpacing: "-0.02em", color: "var(--color-text)" }}>
                    {stream.price}{!stream.quote && <span style={{ fontSize: 14, color: muted(55) }}> / year</span>}
                  </p>
                  <p className="hud mt-1" style={{ fontSize: 9 }}>Scoped and quoted to your footprint. Billed annually.</p>
                  <p className="mt-4 text-sm" style={{ color: muted(76), lineHeight: 1.55 }}>{stream.blurb}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {stream.features.map((f) => (
                      <li key={f} className="flex items-start gap-2" style={{ color: muted(72), lineHeight: 1.5 }}>
                        <span aria-hidden style={{ color: accent }}>&rsaquo;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={stream.cta.href}
                    className={`btn ${featured ? "btn-primary" : "btn-secondary"} mt-6`}
                    style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
                  >
                    {stream.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>

          <p data-reveal className="mt-4 text-xs" style={{ color: muted(45) }}>
            Take one stream or both. Each is scoped and quoted on its own, and if you want both you
            pay for both. Terms are annual, never monthly. I do not
            publish figures because the right number for a single trade contractor and a national
            supplier are not comparable. The guaranteed opportunity number is agreed with you at
            scoping and written into the term.
          </p>
        </Section>

        {/* ── 08 Operator file ─────────────────────────────────── */}
        <Section id="about" index="08 / Operator file">
          <div className="grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
            <div data-reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "16ch" }}>
                I came up inside the platforms themselves.
              </h2>
              <p className="mt-5" style={{ color: muted(78), lineHeight: 1.6, maxWidth: "52ch" }}>
                I did not come to this from the outside. For three and a half years I worked inside
                the eprocurement industry, handling more than 17,500 contractor accounts across a
                portfolio of major procurement platforms in Canada and the United States.
              </p>
              <p className="mt-4" style={{ color: muted(70), lineHeight: 1.6, maxWidth: "52ch" }}>
                My job was keeping contractors getting real value from those platforms, which means
                I saw exactly where they lose bids: not at the proposal, at the search. Now I do
                that part for you, from your side of the table.
              </p>
            </div>
            <div className="grid gap-4 self-start sm:grid-cols-3">
              {[
                ["17,500+", "Accounts handled"],
                ["3.5 yrs", "Inside the industry"],
                ["18+", "Platforms monitored"],
              ].map(([v, l]) => (
                <div key={l} data-reveal className="p-5" style={{ border: `1px solid ${accent22}`, borderLeft: `2px solid ${accent}`, borderRadius: 4 }}>
                  <div className="tabular-nums" style={{ fontSize: 32, letterSpacing: "-0.02em", color: "var(--color-accent-200)" }}>{v}</div>
                  <div className="hud mt-1" style={{ fontSize: 10 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 09 Debrief ───────────────────────────────────────── */}
        <Section id="questions" index="09 / Debrief">
          <div className="grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "14ch" }}>
              The things contractors ask me first.
            </h2>
            <div data-reveal className="space-y-2">
              {FAQS.map((f) => (
                <details key={f.q} className="p-4" style={{ border: `1px solid ${accent20}`, borderRadius: 4 }}>
                  <summary style={{ listStyle: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: "var(--color-text)" }}>{f.q}</summary>
                  <p className="mt-3 text-sm" style={{ color: muted(70), lineHeight: 1.6 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 10 Request intel ─────────────────────────────────── */}
        <Section id="contact" index="10 / Request intel">
          <div className="grid gap-14 pt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}>
            <div data-reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "12ch" }}>
                See who is winning your work. Free.
              </h2>
              <p className="mt-5" style={{ color: muted(76), lineHeight: 1.6, maxWidth: "44ch" }}>
                Tell me your trade and where you work. I pull the public award record for your
                category and send back a deep dive: who is winning this work, which buyers keep
                awarding it, and where you are not showing up. Free, and no obligation.
              </p>
              <div className="mt-8">
                <ChannelLog />
              </div>
            </div>
            <div data-reveal className="lg:pt-4">
              <IntelLeadForm source="home" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

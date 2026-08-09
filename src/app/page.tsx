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
  TIERS,
  JURISDICTIONS,
  SECTION_CHIPS,
} from "@/lib/intel/data";
import { SITE } from "@/lib/site/config";
import { JsonLd, faqJsonLd } from "@/lib/site/seo";

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
    q: "Can I try it before committing to a full year?",
    a: "Yes. A sixty day pilot is $2,000, one time, and runs at full scope, same monitoring, same document review, same qualification a full term gets. If you continue, the entire $2,000 is credited against your annual coverage. If you do not, you keep every opportunity I sent you.",
  },
  {
    q: "How is this different from the alerts I already get?",
    a: "Alerts fire on keywords and qualify nothing. I read the documents, judge the fit against your trade and capacity, and hand you a short list with a verdict, not a full inbox you still have to triage.",
  },
  {
    q: "What if you miss a bid?",
    a: "Every term carries a guaranteed minimum of qualified opportunities, set against your trade and footprint when we start. If I do not deliver it, I keep working at no charge until I do.",
  },
  {
    q: "We already have someone in house. Why you?",
    a: "Then you already know how many hours the search eats. I take the monitoring, reading and qualification off their plate so those hours go into pricing and winning instead of living in portals.",
  },
  {
    q: "How is pricing set, and what is the guarantee?",
    a: "Coverage is scoped to your footprint and billed once a year, never monthly. The figure is set by your industry and the number of jurisdictions. Each tier carries a guaranteed minimum of qualified opportunities, agreed with you at intake.",
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
                work only the opportunities worth pursuing. Across Canada and the United States.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/free-opportunities" className="btn btn-primary" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Request free intel report
                </Link>
                <Link href="#pricing" className="btn btn-secondary" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Coverage &amp; pricing
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

        {/* ── 07 Coverage & pricing ────────────────────────────── */}
        <Section id="pricing" index="07 / Coverage & pricing">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "18ch" }}>
              Coverage, scoped to your footprint. Billed once a year.
            </h2>
            <p data-reveal style={{ color: muted(76), lineHeight: 1.6 }}>
              Coverage is billed once a year, never as a monthly plan. Start with a sixty day pilot
              or go straight to a full term. The figure is set by your industry and how many
              jurisdictions you bid. There is no per opportunity charge. I review as many as it takes.
            </p>
          </div>

          {/* 60-day pilot: the entry point to the tiers below */}
          <div
            data-reveal
            className="mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center"
            style={{ border: `1px solid ${accent}`, background: "color-mix(in srgb, var(--color-accent) 11%, transparent)", borderRadius: 4, boxShadow: "0 0 60px color-mix(in srgb, var(--color-accent) 18%, transparent)" }}
          >
            <div>
              <p className="hud" style={{ color: "var(--color-accent-200)", letterSpacing: "0.2em" }}>Start here</p>
              <h3 className="mt-2" style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}>Run a 60 day pilot first.</h3>
              <p className="mt-3 text-sm" style={{ color: muted(80), lineHeight: 1.6, maxWidth: "60ch" }}>
                Sixty days of live coverage across your trade and jurisdictions, run exactly as a full
                term is run: platforms monitored, documents opened, fit qualified, opportunities
                delivered. If you continue, the full $2,000 comes off your first year. If you do not,
                you keep everything I sent and we part ways.
              </p>
              <ul className="mt-4 grid gap-1.5 text-sm sm:grid-cols-1">
                {[
                  "Full monitoring and qualification, no reduced scope",
                  "Every qualified opportunity delivered with a verdict and a source link",
                  "Credited in full toward Tier I, II or III",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2" style={{ color: muted(72) }}>
                    <span aria-hidden style={{ color: accent, lineHeight: 1.5 }}>&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
              <div>
                <p className="tabular-nums" style={{ fontSize: 44, letterSpacing: "-0.03em", color: "var(--color-accent-200)", lineHeight: 1 }}>$2,000</p>
                <p className="mt-2 text-xs" style={{ color: muted(60), maxWidth: "26ch" }}>One time. Credited in full against your annual coverage.</p>
              </div>
              <Link href="/book" className="btn btn-primary mt-1" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>Start a pilot</Link>
            </div>
          </div>

          {/* Guarantee callout */}
          <div data-reveal className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 p-5" style={{ maxWidth: 900, border: `1px solid ${accent}`, background: "color-mix(in srgb, var(--color-accent) 10%, transparent)", borderRadius: 4 }}>
            <span className="hud" style={{ color: "var(--color-accent-200)" }}>Guarantee</span>
            <span style={{ fontSize: 15, color: muted(84), lineHeight: 1.5 }}>
              Every term carries a guaranteed minimum of qualified opportunities, set against your
              trade and footprint at intake. If I do not deliver it, work continues at no charge
              until I do.
            </span>
          </div>

          <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
            {TIERS.map((tier) => {
              const featured = tier.featured;
              return (
                <div
                  key={tier.name}
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
                  <p className="hud" style={{ color: featured ? "var(--color-accent-200)" : accent }}>{tier.name}</p>
                  <p className="mt-2 text-sm" style={{ color: muted(60) }}>{tier.scope}</p>
                  <p className="mt-4 tabular-nums" style={{ fontSize: 30, letterSpacing: "-0.02em", color: "var(--color-text)" }}>
                    {tier.price} <span style={{ fontSize: 14, color: muted(55) }}>/ year</span>
                  </p>
                  <p className="hud mt-1" style={{ fontSize: 9 }}>Billed annually. Figure set by your industry.</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {tier.features.map((f, i) => (
                      <li key={f} style={{ color: i === 0 ? "var(--color-accent-200)" : muted(72), lineHeight: 1.5 }}>{f}</li>
                    ))}
                  </ul>
                  <Link
                    href={tier.cta.href}
                    className={`btn ${featured ? "btn-primary" : "btn-secondary"} mt-6`}
                    style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>
          <p data-reveal className="mt-4 text-xs" style={{ color: muted(45) }}>
            Guaranteed opportunity counts are set with you at intake, per trade and footprint.
            Full terms are annual. There is no monthly plan.
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
                See what you are missing. Free.
              </h2>
              <p className="mt-5" style={{ color: muted(76), lineHeight: 1.6, maxWidth: "44ch" }}>
                Tell me your trade and where you bid. I go through the platforms serving your
                footprint and send back a short list of real, currently open opportunities you have
                not seen, read, qualified and linked.
              </p>
              <div className="mt-8">
                <ChannelLog />
              </div>
            </div>
            <div data-reveal className="lg:pt-4">
              <IntelLeadForm />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

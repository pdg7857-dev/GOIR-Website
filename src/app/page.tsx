import Link from "next/link";
import { platformPath, industryPath } from "@/lib/site/links";
import {
  Search, FileSearch, Filter, Send, Bell, Layers, Clock, AlertTriangle,
  Building2, Sparkles, ArrowRight, CheckCircle2, BadgeCheck,
} from "lucide-react";
import { Section, SectionHead, StatStrip, CtaBand, FeatureCard, CredentialBadge } from "@/components/site/ui";
import { CostCalculator } from "@/components/site/cost-calculator";
import { VideoEmbed } from "@/components/site/video-embed";
import { FaqAccordion } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { GENERAL_FAQS } from "@/lib/site/faqs";
import { CORNERSTONE_PLATFORMS, PLATFORMS } from "@/lib/site/platforms";
import { PRIMARY_INDUSTRIES } from "@/lib/site/industries";
import { SITE, BACKGROUND } from "@/lib/site/config";
import { JsonLd, faqJsonLd } from "@/lib/site/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(GENERAL_FAQS.map((f) => ({ q: f.q, a: f.a })))} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-bg">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="container relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Government Opportunity Intelligence
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] text-fg sm:text-5xl lg:text-[3.4rem]">
              You focus on winning contracts.
              <span className="block text-accent">I focus on finding them.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-fg-muted">
              I am Phil Dave. I watch every procurement platform that matters, read the bid documents,
              and qualify the fit, so your estimators stop drowning in portals and notifications
              and start working only the opportunities worth pursuing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={SITE.bookingUrl} className="btn-gold px-6 py-3.5 text-base">
                Book a meeting <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/opportunity-waste-calculator"
                className="btn-ghost border-white/20 bg-white/5 px-6 py-3.5 text-base text-fg hover:border-white/40 hover:text-fg"
              >
                Calculate your opportunity waste
              </Link>
            </div>
            <p className="mt-5 text-sm text-fg-subtle">
              Twenty-minute discovery call, no cost. Coverage is scoped to your footprint and quoted on the call.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-warn/30 bg-warn-soft/30 px-4 py-2">
              <CredentialBadge lg />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                What lands in your inbox
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { t: "Custodial services, 3 schools", s: "MERX, closes in 18 days", fit: "Strong fit" },
                  { t: "Roof replacement, county facility", s: "Bonfire, mandatory site visit Tue", fit: "Worth a look" },
                  { t: "HVAC controls upgrade", s: "SAM.gov, filed under \"energy retrofit\"", fit: "Strong fit" },
                ].map((c) => (
                  <div key={c.t} className="rounded-xl border border-white/10 bg-ink-800/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-fg">{c.t}</p>
                        <p className="mt-0.5 text-xs text-fg-subtle">{c.s}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        {c.fit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-fg-muted">
                Reviewed, qualified, linked. Sample illustration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2-minute overview video, right below the hero */}
      {SITE.youtubeId && (
        <Section muted>
          <SectionHead center eyebrow="In 2 minutes" title="See how I find the work worth winning" />
          <div className="mt-8">
            <VideoEmbed id={SITE.youtubeId} />
          </div>
          <div className="mt-6 flex justify-center">
            <Link href={SITE.bookingUrl} className="btn-gold px-6 py-3.5 text-base">
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* Authority / logos band */}
      <section className="border-b border-border bg-bg-subtle">
        <div className="container py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-fg-muted">
            Fluent in the platforms your buyers actually use
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-fg-muted">
            {["MERX", "BidNet Direct", "CanadaBuys", "SAM.gov", "Bonfire", "Biddingo", "bids&tenders", "PlanetBids", "GSA eBuy"].map(
              (n) => (
                <span key={n} className="opacity-80">{n}</span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section muted>
        <SectionHead
          eyebrow="The problem"
          title="Bidding does not fail at the proposal. It fails at the search."
          lede="By the time most contractors sit down to write, they have already lost hours to the part of the job nobody trained them for: finding the right work in the first place."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Layers} title="Too many portals">
            MERX, CanadaBuys, SAM.gov, a different SaaS portal for nearly every municipality. Each
            one has its own login, its own search, its own notification settings.
          </FeatureCard>
          <FeatureCard icon={Bell} title="Too many notifications">
            Keyword alerts fire on everything and qualify nothing. Your inbox fills with work that
            was never in your lane, and the one bid that mattered slips by unread.
          </FeatureCard>
          <FeatureCard icon={Filter} title="Too many poor fits">
            Estimators spend their best hours reading documents for opportunities you were never
            going to win, instead of the handful you actually should.
          </FeatureCard>
          <FeatureCard icon={Clock} title="Not enough time">
            Nobody has time to open every PDF, find the mandatory site meeting on page 14, and
            check the addenda that quietly moved the close date.
          </FeatureCard>
          <FeatureCard icon={AlertTriangle} title="Missed opportunities">
            The work that fits you best is often filed under a title you would never search. If you
            are not watching the way buyers write, you never see it.
          </FeatureCard>
          <FeatureCard icon={Search} title="Opportunity overload">
            More data has not made bidding easier. It has made it noisier. Volume is not the
            problem. Knowing what is worth your time is.
          </FeatureCard>
        </div>
      </Section>

      {/* Positioning: platforms vs Phil */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="The difference"
              title="Platforms show you everything. I show you what matters."
              lede="Government Opportunity Intelligence is a different job than running a portal. The platforms hand you data. I hand you a decision."
            />
            <Link href="/government-opportunity-intelligence" className="btn-ghost mt-6 px-5 py-2.5 text-sm">
              What is opportunity intelligence? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            {[
              ["Platforms show opportunities.", "I identify the ones worth pursuing."],
              ["Platforms provide data.", "I provide intelligence."],
              ["Platforms send alerts.", "I qualify the fit."],
              ["Platforms show everything.", "I show what matters."],
            ].map(([a, b], i) => (
              <div
                key={i}
                className={`grid grid-cols-2 divide-x divide-border ${i % 2 ? "bg-bg-panel" : "bg-bg-subtle"}`}
              >
                <div className="p-4 text-sm text-fg-muted">{a}</div>
                <div className="flex items-center gap-2 p-4 text-sm font-semibold text-fg">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Cost of doing it yourself + calculator */}
      <Section muted>
        <SectionHead
          center
          eyebrow="The cost of doing it yourself"
          title="The search has a price. You are already paying it."
          lede="Every hour an estimator or proposal manager spends monitoring portals, opening documents and triaging alerts is an hour not spent winning. Here is what that hour is worth."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <CostCalculator />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-fg-muted">
          Want the long version, with bid-preparation cost and a printable worksheet? Use the{" "}
          <Link href="/opportunity-waste-calculator" className="font-medium text-accent underline">
            full Opportunity Cost Calculator
          </Link>
          .
        </p>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHead
          center
          eyebrow="How it works"
          title="Four steps. I run the first three."
          lede="You stay focused on pricing and proposals. I take care of everything that happens before a bid is worth your team's time."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, n: "01", t: "Monitor", d: "I watch every platform that serves your jurisdictions, continuously, so nothing depends on you remembering to log in." },
            { icon: FileSearch, n: "02", t: "Review", d: "I open the documents and read them: scope, requirements, evaluation criteria, site meetings, addenda, the catch." },
            { icon: Filter, n: "03", t: "Qualify", d: "I judge fit against your trades, capacity and footprint, and set aside the bids that were never right for you." },
            { icon: Send, n: "04", t: "Deliver", d: "You get a short, plain-language summary and a direct link to the source bid. Your team prices and submits." },
          ].map((s) => (
            <div key={s.n} className="card relative p-6">
              <span className="text-xs font-bold text-accent">{s.n}</span>
              <div className="mt-3 grid h-11 w-11 place-items-center rounded-xl bg-bg-panel text-fg">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-fg">{s.t}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/how-it-works" className="btn-dark px-6 py-3">
            See the full process <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Platform expertise */}
      <Section dark>
        <SectionHead
          dark
          eyebrow="Platform expertise"
          title="I know where opportunities live and how they hide."
          lede="Each platform categorizes, titles and notifies differently. Knowing those quirks is the difference between seeing a fit and missing it."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORNERSTONE_PLATFORMS.map((p) => (
            <Link
              key={p.slug}
              href={platformPath(p.slug)}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-400/50 hover:bg-white/[0.06]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{p.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-fg">{p.shortName} expert</h3>
              <p className="mt-2 text-sm leading-6 text-fg-subtle">{p.oneLiner}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read the guide <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/platforms" className="text-sm font-semibold text-accent hover:text-fg">
            View all {PLATFORMS.length} platforms covered &rarr;
          </Link>
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHead
          eyebrow="Industries"
          title="Built around how your trade actually gets bid."
          lede="Your work hides under different titles and inside larger packages depending on the trade. I learn how buyers describe yours."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={industryPath(ind.slug)}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-bg-panel p-5 transition hover:border-accent hover:shadow-card"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-fg group-hover:text-accent">{ind.name}</h3>
                <p className="mt-1 text-sm leading-6 text-fg-muted">{ind.oneLiner}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/industries" className="text-sm font-semibold text-accent hover:text-accent">
            See every industry I cover &rarr;
          </Link>
        </div>
      </Section>

      {/* Stats */}
      <Section muted>
        <SectionHead
          center
          eyebrow="By the numbers"
          title="A big, noisy market. That is exactly the point."
          lede="Government buyers spend enormous sums across thousands of opportunities and dozens of platforms. The scale is the opportunity, and the reason no team can watch it all alone."
        />
        <div className="mx-auto mt-10 max-w-5xl">
          <StatStrip />
          <p className="mt-4 text-center text-xs text-fg-subtle">
            See{" "}
            <Link href="/government-procurement-statistics" className="font-medium text-accent underline">
              Government Contracting by the Numbers
            </Link>{" "}
            for the market data behind this.
          </p>
        </div>
      </Section>

      {/* Background credential. Replaces borrowed reviews: states only what I did,
          never a client outcome. No testimonials until real, permissioned ones exist. */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-center">Where this comes from</p>
          <h2 className="mt-3 text-center text-3xl font-semibold text-fg sm:text-4xl">
            I came up inside the platforms themselves.
          </h2>
          <div className="prose-site mt-6 max-w-none">
            <p>
              I did not come to this from the outside. For {BACKGROUND.yearsInSector} I worked inside
              the eprocurement industry, handling more than {BACKGROUND.accountsHandled.replace("+", "")}{" "}
              contractor accounts across a portfolio of major procurement platforms in Canada and the
              US. My job was keeping contractors getting real value from those platforms, which means
              I saw exactly where they lose bids: not at the proposal, at the search. Now I do that
              part for you, from your side of the table.
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {BACKGROUND.points.map((p) => (
              <li key={p} className="card flex items-start gap-2 p-4 text-sm text-fg-muted">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Coverage */}
      <Section>
        <SectionHead
          center
          eyebrow="Coverage"
          title="Structured as coverage, not per opportunity."
          lede="Not per portal. Not hourly. Coverage is scoped to your footprint, a single province or state, several, or nationwide and cross-border including federal, and quoted on a short discovery call."
        />
        <div className="mt-10 flex justify-center">
          <Link href={SITE.bookingUrl} className="btn-gold px-6 py-3.5 text-base">
            Book a discovery call
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-fg-muted">
          How coverage works and what is included on the{" "}
          <Link href="/pricing" className="font-medium text-accent underline">
            coverage page
          </Link>
          .
        </p>
      </Section>

      {/* FAQ + lead form */}
      <Section muted>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHead eyebrow="Questions" title="The things contractors ask me first." />
            <div className="mt-8">
              <FaqAccordion faqs={GENERAL_FAQS.slice(0, 6)} />
            </div>
            <Link href="/faq" className="mt-6 inline-block text-sm font-semibold text-accent">
              Read every question &rarr;
            </Link>
          </div>
          <div className="lg:pt-16">
            <LeadForm variant="call" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

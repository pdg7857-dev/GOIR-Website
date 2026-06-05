import Link from "next/link";
import type { Metadata } from "next";
import { Search, FileSearch, Filter, Send, ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { LeadForm } from "@/components/site/lead-form";
import { FaqAccordion } from "@/components/site/faq";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

const STEPS = [
  {
    icon: Search,
    n: "01",
    t: "I monitor",
    lead: "Continuously, across every platform that serves your jurisdictions.",
    points: [
      "I cover the national aggregators, the official government systems, and the SaaS portal behind nearly every agency you sell to.",
      "Coverage follows your footprint, not a fixed list, so nothing depends on you remembering to log in.",
      "I watch the way buyers file and title work, not just the keywords you would search, so the mis-labelled fits still get caught.",
    ],
  },
  {
    icon: FileSearch,
    n: "02",
    t: "I review",
    lead: "I open the documents and actually read them.",
    points: [
      "Scope, requirements, evaluation criteria, the things that decide whether you can win.",
      "Mandatory site meetings, registration steps, bonding and insurance, the details buried on page 14.",
      "Addenda and amendments that quietly change scope or move the closing date after the first notice.",
    ],
  },
  {
    icon: Filter,
    n: "03",
    t: "I qualify",
    lead: "I judge fit against your shop, and set aside what was never right for you.",
    points: [
      "Your trades, your capacity, your geography, your appetite for the work.",
      "A clear read on why something fits, or why it does not, so you are not guessing.",
      "The noise is gone before anything reaches your team. No firehose, just a short list.",
    ],
  },
  {
    icon: Send,
    n: "04",
    t: "You decide and bid",
    lead: "You get a plain-language summary and a direct link to the source bid.",
    points: [
      "A short summary you can scan in under a minute and forward to your estimator.",
      "A direct link to the opportunity on the issuing platform, so you act on the source of truth.",
      "Your team prices and submits. The part you are best at is the part you keep.",
    ],
  },
];

const FAQS = [
  {
    q: "What do I still do myself?",
    a: "Everything that wins the job: pricing, the proposal, the relationships, the submission. I take care of the front of the funnel, finding and qualifying the work, so your team's hours go to bids you can actually win.",
  },
  {
    q: "How do opportunities reach me?",
    a: "However suits your team: a running feed, a regular digest, or both. Each opportunity comes as a short summary plus a direct link to the source. We set the cadence on the discovery call.",
  },
  {
    q: "How is this different from a bid-alert subscription?",
    a: "An alert is automated and fires on keywords. It tells you something exists and stops there. I am a person who reads the documents and tells you whether it is worth your time, which is the part software cannot do.",
  },
  {
    q: "How fast do you get up to speed on my business?",
    a: "Quickly. A short onboarding covers your trades, your sweet-spot project size, your geography and the work you want more of. From there I tune what I send you as we go.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "How It Works: From Portal Noise to Qualified Opportunities",
  description:
    "I monitor every platform, read the documents, and qualify the fit. You get a short list of qualified government opportunities with direct bid links. Here is the full process.",
  path: "/how-it-works",
  keywords: ["how government bid monitoring works", "opportunity qualification process", "government bid screening"],
});

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]),
          serviceJsonLd("Government Opportunity Intelligence", "Monitoring, review, qualification and delivery of government contract opportunities.", "/how-it-works"),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "How It Works" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">How it works</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Four steps. I run the first three.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Bidding does not fail at the proposal. It fails at the search, long before anyone
              writes a word. So I take the whole front half off your plate: the monitoring, the
              reading, the qualifying. You keep the part that wins the job.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">Book a discovery call</Link>
              <Link href="/pricing" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">See pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <Section>
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="grid items-start gap-6 rounded-2xl border border-border bg-bg-panel p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-bg-panel text-fg">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-accent">{s.n}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-fg">{s.t}</h2>
                <p className="mt-1 text-lg text-accent">{s.lead}</p>
                <ul className="mt-4 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-fg-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                {i === 3 && (
                  <Link href={SITE.sampleUrl} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    See a real qualified opportunity <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Division of labour */}
      <Section muted>
        <SectionHead center eyebrow="Who does what" title="A clean division of labour" lede="You do not hand over control. You hand over the searching." />
        <div className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-bg-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">I handle</p>
            <ul className="mt-4 space-y-2 text-fg-muted">
              {["Monitoring every platform", "Discovery and screening", "Reading the documents", "Fit qualification", "Plain-language summaries"].map((t) => (
                <li key={t} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="bg-bg-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fg">You handle</p>
            <ul className="mt-4 space-y-2 text-fg-muted">
              {["Bid/no-bid decision", "Pricing and estimating", "Proposal writing", "Submission", "Winning the work"].map((t) => (
                <li key={t} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bg-panel" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Onboarding + form */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><Clock className="h-3.5 w-3.5" /> Getting started</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">From call to qualified opportunities, fast</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              On the discovery call I will already have looked at your jurisdictions, so you see
              real, current opportunities before you decide anything. We agree on coverage and
              cadence, I learn your sweet spot, and the qualified work starts flowing.
            </p>
          </div>
          <LeadForm variant="call" />
        </div>
      </Section>

      {/* FAQ */}
      <Section muted>
        <SectionHead title="How it works, in detail" />
        <div className="mt-8 max-w-3xl"><FaqAccordion faqs={FAQS} /></div>
      </Section>

      <CtaBand />
    </>
  );
}

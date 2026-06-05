import Link from "next/link";
import { platformPath, industryPath } from "@/lib/site/links";
import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { LongFormBody, TableOfContents } from "@/components/site/longform";
import { FaqAccordion } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import type { Section as Sec } from "@/lib/site/content/types";
import { CORNERSTONE_PLATFORMS } from "@/lib/site/platforms";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

const SECTIONS: Sec[] = [
  {
    id: "what-it-is",
    heading: "What government opportunity intelligence is",
    blocks: [
      { type: "p", text: "Government opportunity intelligence is the discipline of finding, reading and qualifying public-sector opportunities before they ever reach a contractor's desk. It is not a portal, not an alert, and not a piece of software. It is the judgment layer that sits on top of all of those and answers the only question that matters to a busy estimator: is this worth my time?" },
      { type: "p", text: "I coined the way I describe this work because the market did not have a clean name for it. Contractors were told their choices were a procurement platform, a bid-alert subscription, or a proposal writer. None of those does the actual job, which is sorting the handful of winnable opportunities out of the thousands that post each month. That sorting is opportunity intelligence, and it is what I do." },
      { type: "callout", text: "Platforms show you everything. Alerts tell you something exists. Intelligence tells you what is worth pursuing, and why. That last step is the whole game." },
    ],
  },
  {
    id: "vs-platforms",
    heading: "Why platforms and alerts are not intelligence",
    blocks: [
      { type: "p", text: "A procurement platform is a system of record. Its job is to publish notices and store documents, and it does that well. But a system of record has no opinion. It cannot tell you that the bid titled \"facility renewal\" is really the roofing work you specialize in, or that the closing date moved in an addendum, or that a mandatory site visit is buried on page 14." },
      { type: "p", text: "A bid alert is a tripwire. It fires when a keyword or a category code matches, and then it goes quiet. The trouble is that buyers do not write notices the way you search for them. The alert floods you with work outside your lane and stays silent on the one bid that fit you best, because the buyer filed it under a word you would never have guessed." },
      { type: "p", text: "Neither of those is a failure of the tools. They are just not built to make a decision. Decisions need a person who has read the documents and knows your shop. That is the gap." },
      { type: "h3", text: "The four jobs intelligence does that tools cannot" },
      { type: "ul", items: [
        "Reads the actual scope inside the attachments, not just the title the buyer typed.",
        "Catches work that is mis-titled, bundled into a larger package, or filed under an adjacent category.",
        "Weighs the opportunity against your trades, capacity and geography, so fit is judged before you spend an hour on it.",
        "Tracks the moving parts (addenda, site meetings, registration steps) that quietly disqualify the unprepared.",
      ] },
    ],
  },
  {
    id: "discipline",
    heading: "The discipline, step by step",
    blocks: [
      { type: "p", text: "Opportunity intelligence is a repeatable practice, not a lucky find. Here is the loop I run, every week, for every client." },
      { type: "ol", items: [
        "Monitor. I watch every platform that serves your jurisdictions, the way buyers file, not just the way you would search.",
        "Discover. I surface the opportunities, including the ones your alerts never show you because of how they were titled or coded.",
        "Review. I open the documents and read them: scope, requirements, evaluation criteria, the catch.",
        "Qualify. I judge fit against your business and set aside what was never right for you.",
        "Summarize. I write a short, plain-language summary you can scan in under a minute.",
        "Deliver. You get the summary and a direct link to the source bid, ready to act on.",
      ] },
      { type: "p", text: "The output is not more data. It is less. A short list of qualified opportunities, each one already understood, instead of a tab full of portals and an inbox full of noise." },
    ],
  },
  {
    id: "why-it-matters",
    heading: "Why it matters for mid-market contractors",
    blocks: [
      { type: "p", text: "If you are already bidding, already using platforms, and already getting alerts, you do not have a discovery problem in the sense of too few notices. You have the opposite problem: opportunity overload. More data has not made bidding easier. It has made it noisier." },
      { type: "p", text: "Every hour your estimators spend logging into portals, clearing notifications and opening documents for bids that were never a fit is an hour not spent winning. That is the real cost, and most contractors never put a number on it. The day-to-day searching feels like part of the job, so nobody questions it." },
      { type: "p", text: "Opportunity intelligence flips that. The searching becomes someone else's job, done by a person who is good at it, and your team's hours go back to the work that actually wins contracts." },
    ],
  },
  {
    id: "category",
    heading: "A category, not a feature",
    blocks: [
      { type: "p", text: "Plenty of companies will sell you a piece of this. A platform sells access. An aggregator sells reach. An alert tool sells notifications. A proposal shop sells the writing. What nobody sells, as its own thing done well, is the judgment in the middle: the reading and the qualifying that turns a flood of notices into a short list of winnable work." },
      { type: "p", text: "That is the category I work in, and I treat it as the whole job rather than a feature bolted onto something else. If you are still manually searching procurement portals, you are doing work I have already mastered." },
    ],
  },
];

const FAQS = [
  { q: "Is government opportunity intelligence the same as a bid-writing service?", a: "No. Bid writers help you respond to an opportunity. I help you find and qualify the right opportunities in the first place. The two are complementary: I hand you a qualified shortlist, and you (or your writer) prepare the winning response." },
  { q: "Do I still need my procurement platforms and alerts?", a: "Usually yes. They stay your systems of record and the place you ultimately act. I sit on top of them and do the part they were never built to do: read, judge and qualify. You keep the tools and lose the noise." },
  { q: "Who is this for?", a: "Mid-market contractors who already bid public work and already feel the overload: construction, janitorial, facilities, HVAC, electrical, plumbing, landscaping, security, engineering, environmental, and industrial and MRO suppliers." },
  { q: "How do I see it in action?", a: "Book a discovery call or request a sample opportunity. I will show you real, current opportunities in your jurisdictions, already read and qualified, so you can judge the quality for yourself before paying anything." },
];

export const metadata: Metadata = pageMeta({
  title: "Government Opportunity Intelligence: The Category, Explained",
  description:
    "Platforms show opportunities. Alerts tell you they exist. Government opportunity intelligence tells you what is worth pursuing. Here is what it is, why it beats portals and alerts, and how I do it.",
  path: "/government-opportunity-intelligence",
  keywords: [
    "government opportunity intelligence", "government bid qualification", "government bid screening",
    "government bid monitoring", "government contract leads",
  ],
});

export default function GoiPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Government Opportunity Intelligence", path: "/government-opportunity-intelligence" }]),
          serviceJsonLd("Government Opportunity Intelligence", "Monitoring, discovery, review and qualification of government contract opportunities.", "/government-opportunity-intelligence"),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Government Opportunity Intelligence" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">The category</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">Government Opportunity Intelligence</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Platforms provide data. Alerts provide notifications. I provide intelligence: the
              judgment that turns thousands of public-sector notices into the handful actually worth
              your team's time. This is what that means, and why it is its own discipline.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">Book a discovery call</Link>
              <span className="inline-flex items-center gap-1.5 text-sm text-fg-subtle"><Clock className="h-4 w-4" /> 8 min read</span>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={SECTIONS} />
            </div>
          </aside>
          <div className="min-w-0 max-w-3xl">
            <LongFormBody sections={SECTIONS} />

            <div className="mt-12 rounded-2xl border border-border bg-bg-subtle p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Go deeper on the platforms</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {CORNERSTONE_PLATFORMS.map((p) => (
                  <Link key={p.slug} href={platformPath(p.slug)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-panel px-3 py-1.5 text-sm font-medium text-fg-muted hover:border-accent hover:text-accent">
                    {p.shortName} <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-fg sm:text-3xl">Common questions</h2>
              <div className="mt-6"><FaqAccordion faqs={FAQS} /></div>
            </div>
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">See it for yourself</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">Intelligence beats data. Let me prove it.</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Request a sample and I will send back a live opportunity in your trade and territory,
              read and qualified, so you can feel the difference between a notice and an intelligent
              shortlist.
            </p>
          </div>
          <LeadForm variant="sample" />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

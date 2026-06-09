import Link from "next/link";
import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { CredentialBadge } from "@/components/site/ui";
import { FaqAccordion } from "@/components/site/faq";
import { INCLUDED_EVERYWHERE, COVERAGE_PRINCIPLES, GUARANTEE } from "@/lib/site/pricing";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

const PRICING_FAQS = [
  {
    q: "Why structure it as coverage instead of per opportunity?",
    a: "Because counting opportunities would punish you for the thing you want most. The whole point is that I surface more winnable work, so charging per bid would be backwards. You pick the coverage you need (a province, a state, a region, or national) and I cover everything inside it, however many opportunities that turns out to be.",
  },
  {
    q: "How is it priced, and where do I see the price?",
    a: "Coverage is scoped to your footprint, so the right number depends on how much of the map you bid in and which programs you chase. I quote it on a short discovery call once I understand where you work. Book a call and I will walk you through it.",
  },
  {
    q: "What counts as a jurisdiction?",
    a: "A province or a state. Federal opportunities (CanadaBuys and SAM.gov, GSA eBuy and the rest) can be added in each country, and I can fold federal into a smaller footprint when it makes sense for you.",
  },
  {
    q: "Can I cover both Canada and the United States?",
    a: "Yes. National and cross-border coverage takes in every province, territory and state, plus federal on both sides of the border, in one consolidated feed. Specialized federal, military or municipal programs are scoped the same way. Book a call and I will quote it to your footprint.",
  },
  {
    q: "What is not included?",
    a: "I do not write your proposals, build your pricing, or submit your bids. That is your edge and I do not get in the middle of it. I find, read and qualify the opportunities so your team spends its hours on the bids worth winning.",
  },
  {
    q: "How do I know it is worth it before committing?",
    a: "Book a discovery call. I will already have looked at your jurisdictions, so you will see real, current opportunities I have found and qualified before you commit to anything. You can also request a sample opportunity and judge the quality for yourself.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "Coverage: How Government Opportunity Intelligence Works",
  description:
    "Coverage is structured to your footprint: a single province or state, several, or nationwide and cross-border including federal. Backed by the Qualified Opportunity Guarantee. No per-opportunity fees. Quoted on a discovery call.",
  path: "/pricing",
  keywords: ["government bid monitoring coverage", "opportunity intelligence coverage", "bid alert service"],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Coverage", path: "/pricing" }]),
          faqJsonLd(PRICING_FAQS),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Coverage" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Opportunity intelligence coverage</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Structured as coverage, scoped to your footprint.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              One plan covers the geography you choose: every relevant platform, every opportunity I
              find inside it, read and qualified. No per-portal fees. No per-opportunity charges. No
              clock to watch. Coverage runs from a single province or state up to nationwide and
              cross-border, including federal. I scope it to where you actually bid and quote it on a
              short discovery call.
            </p>
            <div className="mt-6">
              <CredentialBadge />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-6 py-3.5 text-base">
                Book a discovery call
              </Link>
              <Link href={SITE.sampleUrl} className="btn-ghost px-6 py-3.5 text-base">
                Request a sample first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How coverage works */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-bg-subtle p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {COVERAGE_PRINCIPLES.map((p) => (
              <div key={p} className="flex gap-2.5 text-sm text-fg-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What's included */}
      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Included in your coverage"
              title="What you get, in every jurisdiction you cover"
              lede="The work is the same whether you cover one state or twelve. Only the footprint changes."
            />
          </div>
          <ul className="space-y-3">
            {INCLUDED_EVERYWHERE.map((f) => (
              <li key={f} className="flex gap-3 rounded-xl border border-border bg-bg-panel p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-fg-muted">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* The guarantee */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-bg-panel p-8 text-center">
          <p className="eyebrow justify-center text-accent">{GUARANTEE.title}</p>
          <p className="mt-4 text-lg text-fg-muted">{GUARANTEE.body}</p>
          <p className="mt-4 text-sm text-fg-subtle">{GUARANTEE.definition}</p>
        </div>
      </Section>

      {/* What it replaces */}
      <Section muted>
        <SectionHead
          center
          eyebrow="The math"
          title="One plan replaces a job's worth of searching"
          lede="Compare coverage against what manual monitoring and triage actually cost in estimator time."
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-bg-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Doing it yourself</p>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
              {["Estimator hours lost to portals", "Notifications to triage daily", "Documents nobody has time to read", "Good bids missed under odd titles", "Bid/no-bid guesswork"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg p-6 text-fg">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">With coverage</p>
            <ul className="mt-4 space-y-2.5 text-sm text-fg">
              {["Every platform watched for you", "A short list, not a firehose", "Documents read and summarized", "Mis-titled fits caught", "Fit qualified before you bid"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-fg-muted">
          Run your own numbers with the{" "}
          <Link href="/opportunity-waste-calculator" className="font-medium text-accent underline">
            Opportunity Cost Calculator
          </Link>
          .
        </p>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead title="Coverage questions" />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <FaqAccordion faqs={PRICING_FAQS} />
          <div className="rounded-2xl border border-border bg-bg-panel p-8">
            <h3 className="text-xl font-semibold text-fg">Not sure what you need?</h3>
            <p className="mt-2 text-fg-muted">
              Tell me where you bid and what you chase. I will recommend the smallest footprint that
              actually covers you, show you live opportunities on the call, and quote it from there.
            </p>
            <Link href={SITE.bookingUrl} className="btn-primary mt-6 w-full py-3">
              Book a discovery call
            </Link>
            <Link href={SITE.sampleUrl} className="btn-ghost mt-3 w-full py-3">
              Request a sample first
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

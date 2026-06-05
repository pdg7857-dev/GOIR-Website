import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { CostCalculator } from "@/components/site/cost-calculator";
import { StatCallout, References } from "@/components/site/cite";
import { GoirCta } from "@/components/site/goir-cta";
import { FaqAccordion } from "@/components/site/faq";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

const FAQS = [
  { q: "What is opportunity waste?", a: "The estimator and proposal-team time your organization spends finding, reading and triaging government opportunities that were never a fit. It is real money, and it rarely shows up on any budget line." },
  { q: "How is the estimate calculated?", a: "From your own inputs: your fully-loaded estimator rate, the hours per week spent monitoring and reviewing bids, and the number of jurisdictions you watch. It is a starting estimate, not a quote." },
  { q: "How do I reduce it?", a: "By moving the monitoring, reading and qualifying off your team so their hours go only to bids worth pursuing. That is exactly what coverage does, from $599 a month." },
  { q: "Can I get a tailored number?", a: "Yes. Request a free Government Opportunity Intelligence Report for a figure specific to your trades, team and jurisdictions." },
];

export const metadata: Metadata = pageMeta({
  title: "Opportunity Waste Calculator: What Is Searching Costing You?",
  description:
    "Estimate the estimator time your team wastes monitoring portals and reviewing poor-fit government bids, then compare it to coverage from $599/month.",
  path: "/opportunity-waste-calculator",
  keywords: ["opportunity waste calculator", "bid cost calculator", "estimator time cost", "cost of government bidding"],
});

export default function OpportunityWasteCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Opportunity Waste Calculator", path: "/opportunity-waste-calculator" }]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Opportunity Waste Calculator" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Free tool</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">Opportunity Waste Calculator</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Every hour your team spends monitoring portals and reading poor-fit bids is opportunity
              waste. Put a number on it, then see how it compares to coverage.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <CostCalculator />
        </div>
      </Section>

      <Section muted>
        <SectionHead
          center
          eyebrow="Why it adds up"
          title="The hidden cost of doing it yourself"
          lede="Opportunity waste hides across several roles and tasks. Together they add up to a real, recurring cost."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <StatCallout id="labor-shortage" />
          <StatCallout id="estimator-hiring" />
          <ul className="mt-2 grid gap-3 sm:grid-cols-2">
            {[
              "Estimator time spent monitoring portals",
              "Proposal-manager time triaging alerts",
              "Reviewing documents for poor-fit bids",
              "Re-checking addenda and changed dates",
              "Qualifying opportunities by hand",
              "Context-switching across many platforms",
            ].map((t) => (
              <li key={t} className="rounded-xl border border-border bg-bg-panel p-4 text-sm text-fg-muted">{t}</li>
            ))}
          </ul>
          <References ids={["labor-shortage", "estimator-hiring"]} />
        </div>
      </Section>

      <GoirCta />

      <Section>
        <SectionHead title="Questions" />
        <div className="mt-8 max-w-3xl"><FaqAccordion faqs={FAQS} /></div>
        <p className="mt-8 text-sm text-fg-muted">
          Want the full picture? Get your{" "}
          <Link href="/government-opportunity-intelligence-report" className="font-medium text-accent underline">
            free Government Opportunity Intelligence Report
          </Link>{" "}
          for a tailored opportunity-waste figure.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}

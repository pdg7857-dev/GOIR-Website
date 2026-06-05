import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Panel } from "@/components/ui/card";
import { IntakeForm } from "@/components/goir/intake-form";
import { GOIR_ENABLED, SITE } from "@/lib/site/config";
import {
  Gauge, TrendingDown, Layers, Award, Building2, RefreshCw,
  BarChart3, DollarSign, ListChecks, Sparkles, ArrowDown, KeyRound,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Generate your free Government Opportunity Intelligence Report™",
  description:
    "Score your company across eight dimensions of government-contracting maturity, estimate your opportunity waste, and get a prioritized action plan, free, in about 15 seconds.",
  alternates: { canonical: "/report" },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { icon: Gauge, title: "Intelligence Index™", body: "A single 0-100 score across eight weighted dimensions of contractor maturity." },
  { icon: TrendingDown, title: "Opportunity Waste Analysis™", body: "Where bid effort and budget are leaking, in dollars, with recoverable savings." },
  { icon: Gauge, title: "Contracting Maturity", body: "Beginner to Elite, with strengths, weaknesses and prioritized recommendations." },
  { icon: Layers, title: "Platform Coverage Analysis™", body: "Which procurement platforms matter for you, and where your coverage gaps are." },
  { icon: Award, title: "Award Intelligence™", body: "Modeled award history, momentum, categories and comparable suppliers." },
  { icon: Building2, title: "Buyer Intelligence™", body: "The agencies, boards, municipalities and authorities most likely to buy from you." },
  { icon: RefreshCw, title: "Renewal Opportunity Analysis™", body: "Likely renewals and rebids over the next 3, 6 and 12 months." },
  { icon: BarChart3, title: "Industry Benchmarking™", body: "How you compare to peers across construction, janitorial, facilities and more." },
  { icon: DollarSign, title: "Revenue Opportunity Analysis™", body: "Estimated contract potential, missed value and pipeline opportunity." },
  { icon: ListChecks, title: "Action Plan™", body: "Immediate, 30-day, 90-day and 12-month moves, ranked by impact and effort." },
];

export default function GoirLanding() {
  if (!GOIR_ENABLED) redirect(SITE.bookingUrl);
  return (
    <div className="goir-dark">
    <div className="mx-auto max-w-6xl px-4 lg:px-6 py-6">
      {/* Access-code shortcut for prospects who already received one */}
      <Link
        href="/access"
        className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent-soft/20 px-4 py-2.5 text-sm text-fg-muted transition-colors hover:bg-accent-soft/30"
      >
        <KeyRound className="h-4 w-4 text-accent" />
        Already have your access code? <span className="font-medium text-accent">Use it here →</span>
      </Link>
      {/* Hero */}
      <section className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium text-accent ring-1 ring-accent/30">
            <Sparkles className="h-3.5 w-3.5" />
            Free · Personally prepared · 24-hour delivery
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            How strong is your{" "}
            <span className="text-gradient-accent">government contracting</span>?
          </h1>
          <p className="mt-4 max-w-xl text-base text-fg-muted">
            The <strong className="text-fg">Government Opportunity Intelligence Report™</strong> scores your
            company across eight dimensions, estimates how much opportunity you&apos;re wasting, maps the
            platforms and buyers that matter, and hands you a prioritized action plan, personally
            prepared and delivered within 24 hours.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-fg-muted">
            {[
              "Your Government Opportunity Intelligence Index™ (0-100)",
              "A dollar figure for your likely annual opportunity waste",
              "The procurement platforms you're probably missing",
              "A 4-phase action plan ranked by ROI",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-2 text-xs text-fg-subtle lg:hidden">
            <ArrowDown className="h-4 w-4 animate-bounce" /> Fill this out to get your report
          </div>
        </div>

        <Panel className="p-6 ring-1 ring-accent/30 lg:p-7 self-start">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-fg">Get your free report</h2>
            <p className="mt-1 text-sm text-fg-subtle">Five fields. Optional details make it sharper.</p>
          </div>
          <IntakeForm />
        </Panel>
      </section>

      {/* What's inside */}
      <section className="border-t border-border-subtle py-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">What&apos;s inside your report</h2>
          <p className="mt-2 text-sm text-fg-muted">
            Ten sections of personalized intelligence, the kind most contractors pay consultants for.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ icon: Icon, title, body }) => (
            <Panel key={title} className="p-5 lift">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-bg-raised ring-1 ring-border text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-semibold text-fg">{title}</div>
              <div className="mt-1 text-[13px] text-fg-muted">{body}</div>
            </Panel>
          ))}
        </div>
      </section>

      {/* Reassurance / category framing */}
      <section className="border-t border-border-subtle py-12">
        <Panel className="p-7 lg:p-9 bg-grid-fade">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">
            Think credit score, for government contractors.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-fg-muted">
            The Government Opportunity Intelligence Index™ does for public-sector pursuit what a credit
            score does for lending: a single, comparable number, built from real signals, that tells you
            exactly where you stand and what to fix first. Every report is unique to your company, industry
            and region. No generic templates.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["0-100", "Intelligence Index™"],
              ["8", "Scored dimensions"],
              ["10", "Report sections"],
              ["24h", "To your report"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="stat-value text-gradient-accent">{v}</div>
                <div className="mt-1 text-xs text-fg-subtle">{l}</div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
    </div>
  );
}

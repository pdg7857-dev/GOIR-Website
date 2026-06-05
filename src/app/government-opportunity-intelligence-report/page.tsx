import Link from "next/link";
import type { Metadata } from "next";
import { Check, FileBarChart, Gauge, Layers, RefreshCw, Timer } from "lucide-react";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { FaqAccordion } from "@/components/site/faq";
import { GOIR_INCLUDES } from "@/components/site/goir-cta";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

const DELIVERABLES = [
  { icon: Gauge, title: "GOII Score", body: "Your Government Opportunity Intelligence Index: a single, honest read on how well you find, qualify and pursue public work." },
  { icon: Timer, title: "Opportunity Waste Estimate", body: "An estimate of the estimator hours your current process loses to poor-fit opportunities, in dollars." },
  { icon: Layers, title: "Platform Coverage Analysis", body: "Which of the platforms your buyers use you are actually covering, and where the blind spots are." },
  { icon: RefreshCw, title: "Renewal Opportunity Analysis", body: "Recurring contracts in your space likely to rebid, so you can position before they post." },
  { icon: FileBarChart, title: "Maturity Assessment", body: "A clear view of your government-contracting maturity and the highest-leverage gaps to close first." },
];

const FAQS = [
  { q: "Is the call really free?", a: "Yes. The discovery call is free and there is no obligation. It is how I show the value of this work before you ever pay for coverage." },
  { q: "What do you need from me?", a: "Just the basics: your trades, where you bid, and the platforms you use today. The more you share, the sharper the call." },
  { q: "How long is the call?", a: "About twenty minutes. You will hear from me directly, and I'll come ready with live opportunities in your jurisdictions." },
  { q: "Will this turn into a sales pitch?", a: "You get genuinely useful opportunities either way. If it makes sense to work together, we can talk. If not, what I show you is still yours to pursue." },
];

export const metadata: Metadata = pageMeta({
  title: "Government Opportunity Intelligence",
  description:
    "Book a discovery call to see your opportunity-waste, platform coverage gaps and upcoming renewals, with live, qualified government opportunities specific to your business.",
  path: "/government-opportunity-intelligence-report",
  keywords: ["government opportunity intelligence", "government bid discovery call", "procurement coverage analysis"],
});

export default function GoirPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Government Opportunity Intelligence Report", path: "/government-opportunity-intelligence-report" }]),
          serviceJsonLd("Government Opportunity Intelligence", "A free discovery call covering opportunity waste, platform coverage and renewal opportunities.", "/government-opportunity-intelligence-report"),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border bg-bg">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.16]" />
        <div className="container relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Opportunity Intelligence" }]} />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-warn">
              <FileBarChart className="h-3.5 w-3.5" /> Discovery call
            </p>
            <h1 className="mt-4 text-4xl font-bold text-fg sm:text-5xl">
              Government Opportunity Intelligence, on a call
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              On a 20-minute call, I&apos;ll show you exactly where your team wastes estimator time, which
              platforms you are under-covering, and which contracts in your market are about to rebid,
              with live opportunities specific to your business.
            </p>
            <ul className="mt-7 space-y-2.5">
              {GOIR_INCLUDES.map((i) => (
                <li key={i} className="flex gap-2.5 text-fg">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href={SITE.bookingUrl} className="btn-gold px-6 py-3 text-base">
                Book a meeting
              </Link>
              <p className="mt-2 text-sm text-fg-subtle">
                Twenty minutes, no cost. I&apos;ll walk you through your opportunities directly.
              </p>
            </div>
          </div>
          <div className="lg:pt-10">
            <CalendlyEmbed url={SITE.calendlyUrl} />
          </div>
        </div>
      </section>

      <Section>
        <SectionHead center eyebrow="What you receive" title="Five things most contractors have never measured" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d) => (
            <div key={d.title} className="card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <d.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-fg">{d.title}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHead center eyebrow="How it works" title="Three steps to your call" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            ["01", "Book a time", "Pick a 20-minute slot and tell me your trades, jurisdictions and platforms."],
            ["02", "I do the analysis", "Before we talk, I assess your coverage, estimate your waste, and scan your market for renewals."],
            ["03", "We meet", "I walk you through live, qualified opportunities you can act on, with or without working together."],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-border bg-bg-panel p-6">
              <span className="text-2xl font-bold text-accent">{n}</span>
              <h3 className="mt-2 text-lg font-semibold text-fg">{t}</h3>
              <p className="mt-1.5 text-sm leading-6 text-fg-muted">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-fg-muted">
          Prefer to estimate it yourself first? Try the{" "}
          <Link href="/opportunity-waste-calculator" className="font-medium text-accent underline">
            Opportunity Waste Calculator
          </Link>
          .
        </p>
      </Section>

      <Section>
        <SectionHead title="Common questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <CtaBand
        title="Book a meeting. See what you are missing."
        sub="It is free, it is specific to your business, and it is the fastest way to understand your opportunity waste and coverage gaps."
      />
    </>
  );
}

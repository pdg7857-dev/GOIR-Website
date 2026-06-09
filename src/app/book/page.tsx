import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Eye, ListChecks, ShieldCheck, CalendarCheck } from "lucide-react";
import {
  Breadcrumbs,
  CtaBand,
  Section,
  SectionHead,
} from "@/components/site/ui";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { CredentialBadge } from "@/components/site/ui";
import { FaqAccordion } from "@/components/site/faq";
import { SITE } from "@/lib/site/config";
import {
  pageMeta,
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/site/seo";

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

const faqs = [
  {
    q: "Is the call free, and is there any pressure?",
    a: "Yes, it is free, and no, there is no pressure. The point of the call is to show you the quality of what I find. If it is obviously useful, we talk about coverage. If it is not a fit, you walk away with real opportunities you can pursue anyway.",
  },
  {
    q: "Will you really show me live opportunities before I pay?",
    a: "I will. Tell me your trade and where you bid when you book, and I will come to the call with actual, current opportunities in your jurisdictions, already read and qualified. There is no better way to judge what I do than to see it on your own work.",
  },
  {
    q: "Do you write or submit the bid for me?",
    a: "No. I find, read and qualify opportunities so your team spends time only on the ones worth pursuing. You own the pricing, the proposal and the submission. I am the discovery and qualification side, not a proposal shop.",
  },
  {
    q: "What does coverage cost after the call?",
    a: "Flat monthly coverage, priced by the geography you need rather than per opportunity or per platform. Coverage is scoped to your footprint and I quote it on the call. We only get into pricing if the opportunities I show you make it worth your while.",
  },
];

export default function BookPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book a call", path: "/book" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book a call" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Discovery call</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              See real opportunities in your jurisdictions, before you pay a cent
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Twenty minutes. You tell me your trade and where you bid. I come to the call with
              live, qualified government opportunities I have already found and read for your area.
              No slides, no pitch you have heard before, just the work, on your screen.
            </p>
            <div className="mt-5">
              <CredentialBadge />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-muted">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-warn" /> 20 minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-warn" /> No cost, no obligation
              </span>
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4 text-warn" /> Real opportunities, not a demo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Value prop + what happens + form */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What happens on the call</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">
              I prove the value first, then we talk
            </h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Most discovery calls are a sales script. This one is a working session. Here is exactly
              how the twenty minutes go.
            </p>

            <ol className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-fg">You tell me what you chase</h3>
                  <p className="mt-1 text-sm leading-6 text-fg-muted">
                    Your trades, your jurisdictions, the size and type of work you want more of. A
                    couple of minutes is enough to point me in the right direction.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-fg">I show you real, current opportunities</h3>
                  <p className="mt-1 text-sm leading-6 text-fg-muted">
                    Live notices in your area that fit your trade, already read and qualified the way
                    I do it for clients. This is the part most people are surprised by.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-fg">You decide if it is worth continuing</h3>
                  <p className="mt-1 text-sm leading-6 text-fg-muted">
                    If the opportunities are clearly worth it, I explain coverage for your area. If
                    not, you keep what I showed you and we shake hands. No pressure either way.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-10 rounded-2xl border border-border bg-bg-subtle p-6">
              <div className="flex items-center gap-2 text-accent">
                <ListChecks className="h-5 w-5" />
                <h3 className="font-semibold text-fg">What to bring</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {[
                  "The trades or services you want more government work in",
                  "The provinces, states or cities where you can actually deliver",
                  "Any bonding, licensing or capacity limits worth knowing up front",
                  "A sense of the contract size that fits your shop",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24" id="book">
            <CalendlyEmbed url={SITE.calendlyUrl} />
          </div>
        </div>
      </Section>

      {/* Reassurance band */}
      <Section muted>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-semibold text-fg sm:text-3xl">
            Twenty minutes to find out what you have been missing
          </h2>
          <p className="text-lg leading-8 text-fg-muted">
            The contractors I work with almost always see at least one opportunity on the call they
            would have missed on their own. That is the whole point. Worst case, you spend twenty
            minutes and leave with real leads. Best case, you stop searching portals for good.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead title="Before you book" center />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Pick a time. I will bring the opportunities."
        sub="Tell me your trade and your jurisdictions, and our first call will be a working session, not a sales pitch."
      />
    </>
  );
}

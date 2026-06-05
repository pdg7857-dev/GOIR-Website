import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { FaqAccordion, type Faq } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { GENERAL_FAQS } from "@/lib/site/faqs";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

const GROUPS: { title: string; faqs: Faq[] }[] = [
  {
    title: "The service",
    faqs: [
      GENERAL_FAQS[0],
      GENERAL_FAQS[2],
      {
        q: "Are you a procurement consultant?",
        a: "Not in the usual sense. I am not here to advise on procurement strategy, write proposals, or teach you to use a platform. I do one thing and do it well: find, read and qualify government opportunities so your team only spends time on the bids worth winning.",
      },
      {
        q: "Do you work with my existing bid writer or proposal team?",
        a: "Happily. I sit upstream of them. I deliver a qualified shortlist; they turn it into winning responses. Most clients find their writers get far more productive when they are only working bids that were qualified first.",
      },
    ],
  },
  {
    title: "Platforms and coverage",
    faqs: [
      GENERAL_FAQS[3],
      {
        q: "What if my buyers use a portal you have not mentioned?",
        a: "Then I add it. The named platforms are the common ones, but coverage follows your buyers. If an agency you sell to posts somewhere specific, that becomes part of what I watch.",
      },
      {
        q: "Do you cover both Canada and the United States?",
        a: "Yes. I work across all Canadian provinces and territories and all 50 U.S. states, plus federal procurement in both countries. Coverage is built around your real footprint, on either side of the border.",
      },
    ],
  },
  {
    title: "Getting opportunities",
    faqs: [GENERAL_FAQS[5], GENERAL_FAQS[6], GENERAL_FAQS[1]],
  },
  {
    title: "Pricing and commitment",
    faqs: [
      GENERAL_FAQS[4],
      GENERAL_FAQS[7],
      {
        q: "Is there a free trial?",
        a: "Rather than a trial, I show you the work upfront. On a discovery call you see real opportunities in your jurisdictions, and you can request a sample opportunity any time. You judge the quality before you commit a dollar.",
      },
    ],
  },
];

export const metadata: Metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Answers about how government opportunity intelligence works, which platforms I monitor, pricing and coverage, and how qualified opportunities reach you.",
  path: "/faq",
  keywords: ["government bid monitoring faq", "opportunity intelligence questions"],
});

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
          faqJsonLd(all.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">Questions, answered plainly</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              The things contractors ask me before we start. If yours is not here, just ask. I read
              and reply to every message myself.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <SectionHead title={g.title} />
                <div className="mt-6"><FaqAccordion faqs={g.faqs} /></div>
              </div>
            ))}
          </div>
          <aside className="lg:pt-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-bg-subtle p-6">
                <h3 className="text-lg font-semibold text-fg">Still have a question?</h3>
                <p className="mt-2 text-sm text-fg-muted">Ask me directly. I answer personally, usually the same business day.</p>
                <Link href={SITE.bookingUrl} className="btn-primary mt-4 w-full py-2.5 text-sm">Book a discovery call</Link>
                <Link href="/contact" className="btn-ghost mt-2 w-full py-2.5 text-sm">Send a message</Link>
              </div>
              <LeadForm variant="guide" />
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

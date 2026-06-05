import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/site/resources";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Free Guides & Tools for Government Contractors",
  description:
    "Calculators, checklists, platform guides and reports to help you find and qualify government opportunities. Built from how I do the work for clients.",
  path: "/resources",
  keywords: [
    "government contracting resources",
    "bid qualification checklist",
    "government bid cost calculator",
    "MERX BidNet guides",
  ],
});

export default function ResourcesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">
              Free guides and tools for contractors
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              These are the same tools and frameworks I use to find and qualify government work for
              clients, packaged so you can use them yourself. No fabricated numbers, no fluff. Pick
              one and I will send it over.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="Free resources" title="Take what helps" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link key={r.slug} href={`/resources/${r.slug}`} className="card group flex flex-col p-6">
              <span className="self-start rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                {r.kind}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-fg group-hover:text-accent">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{r.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {r.cta} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

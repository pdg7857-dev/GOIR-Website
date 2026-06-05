import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { STATES, REGIONS } from "@/lib/site/locations";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "U.S. Government Procurement Coverage by State",
  description:
    "How I find and qualify government opportunities across all 50 U.S. states, state eProcurement systems, BidNet Direct, Bonfire, DemandStar and thousands of local agencies.",
  path: "/coverage/usa",
  keywords: ["us government procurement", "government bids by state", "state procurement systems", "sam.gov bidnet coverage"],
});

export default function UsaCoverage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Coverage", path: "/coverage" },
          { name: "United States", path: "/coverage/usa" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Coverage", href: "/coverage" }, { name: "United States" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">United States</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Government procurement across all 50 states
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Federal work runs through SAM.gov, but most addressable opportunity is state, county
              and municipal, each state with its own eProcurement system, plus aggregators like
              BidNet Direct, Bonfire and DemandStar covering thousands of local agencies. Pick a
              state to see where the work lives.
            </p>
          </div>
        </div>
      </section>

      {REGIONS.map((region, i) => (
        <Section key={region} muted={i % 2 === 1}>
          <SectionHead eyebrow="Region" title={region} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STATES.filter((s) => s.region === region).map((s) => (
              <Link key={s.slug} href={`/coverage/usa/${s.slug}`} className="card group p-5 transition hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">{s.abbr}</span>
                    <span className="text-base font-semibold text-fg">{s.name}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="mt-3 text-sm leading-6 text-fg-muted">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <CtaBand title="Bidding across multiple states?" />
    </>
  );
}

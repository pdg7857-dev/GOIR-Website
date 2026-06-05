import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, ArrowRight, Flag } from "lucide-react";
import { PROVINCES, STATES, REGIONS } from "@/lib/site/locations";
import { Breadcrumbs, CtaBand, Section, SectionHead, StatStrip } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Coverage Map: Government Procurement Across Canada and the U.S.",
  description:
    "Where I find and qualify government opportunities, every Canadian province and territory and all 50 U.S. states, with the procurement platforms that matter in each.",
  path: "/coverage",
  keywords: ["government procurement coverage", "government bids by province", "government bids by state", "north american procurement"],
});

export default function CoverageHub() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Coverage", path: "/coverage" }])} />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Coverage" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Coverage map</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Government opportunities, coast to coast
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Public work is posted on different systems in every jurisdiction. I monitor the
              platforms that matter in each, across every Canadian province and territory and all
              fifty U.S. states, so nothing relevant slips past you. Pick your region to see where
              the work lives.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/coverage/canada" className="btn-gold px-5 py-3">
                <Flag className="h-4 w-4" /> Canada coverage
              </Link>
              <Link href="/coverage/usa" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">
                <Flag className="h-4 w-4" /> U.S. coverage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="Canada" title="Provinces & territories" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROVINCES.map((p) => (
            <Link
              key={p.slug}
              href={`/coverage/canada/${p.slug}`}
              className="card group flex items-center justify-between p-4 transition hover:border-accent/40"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-accent">{p.abbr}</span>
                <span className="text-sm font-semibold text-fg">{p.name}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHead eyebrow="United States" title="All 50 states" />
        <div className="mt-8 space-y-8">
          {REGIONS.map((region) => (
            <div key={region}>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fg-subtle">
                <MapPin className="h-4 w-4 text-accent" /> {region}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {STATES.filter((s) => s.region === region).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/coverage/usa/${s.slug}`}
                    className="card group flex items-center justify-between p-3 transition hover:border-accent/40"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">{s.abbr}</span>
                      <span className="text-sm font-medium text-fg">{s.name}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-5xl">
          <StatStrip />
        </div>
      </Section>

      <CtaBand title="Not sure which platforms cover your area?" />
    </>
  );
}

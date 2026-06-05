import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PROVINCES } from "@/lib/site/locations";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Canada Government Procurement Coverage by Province & Territory",
  description:
    "How I find and qualify government opportunities across every Canadian province and territory, CanadaBuys, MERX, provincial systems and municipal portals.",
  path: "/coverage/canada",
  keywords: ["canada government procurement", "government bids canada", "provincial procurement", "canadabuys merx coverage"],
});

export default function CanadaCoverage() {
  const provinces = PROVINCES.filter((p) => p.type === "province");
  const territories = PROVINCES.filter((p) => p.type === "territory");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Coverage", path: "/coverage" },
          { name: "Canada", path: "/coverage/canada" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Coverage", href: "/coverage" }, { name: "Canada" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Canada</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Government procurement across Canada
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Federal opportunities run through CanadaBuys and MERX, but the real volume lives in
              the provinces, each with its own mandatory system and a deep municipal, school-board
              and health-authority (MASH) base. Pick a province or territory to see where the work
              lives.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="Provinces" title="Choose a province" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {provinces.map((p) => (
            <Link key={p.slug} href={`/coverage/canada/${p.slug}`} className="card group p-5 transition hover:border-accent/40">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-accent">{p.abbr}</span>
                  <span className="text-base font-semibold text-fg">{p.name}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <p className="mt-3 text-sm leading-6 text-fg-muted">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>

      {territories.length > 0 && (
        <Section muted>
          <SectionHead eyebrow="Territories" title="Northern territories" />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {territories.map((p) => (
              <Link key={p.slug} href={`/coverage/canada/${p.slug}`} className="card group flex items-center justify-between p-4 transition hover:border-accent/40">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-accent">{p.abbr}</span>
                  <span className="text-sm font-semibold text-fg">{p.name}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Bidding across multiple provinces?" />
    </>
  );
}

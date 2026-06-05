import Link from "next/link";
import { platformPath, industryPath } from "@/lib/site/links";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PLATFORMS, platformsByCategory } from "@/lib/site/platforms";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Government Procurement Platforms I Monitor",
  description:
    "MERX, BidNet Direct, CanadaBuys, SAM.gov, Bonfire and more. I monitor every platform your buyers use, read the documents and qualify the fit. Browse the platform guides.",
  path: "/platforms",
  keywords: [
    "government procurement platforms", "merx bidnet canadabuys sam.gov",
    "bid monitoring platforms", "procurement portal monitoring",
  ],
});

export default function PlatformsIndex() {
  const byCat = platformsByCategory();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Platforms", path: "/platforms" }])} />
      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Platforms" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">
              The platforms your buyers use, all watched in one place
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              There is no single front door to government work. Opportunities are scattered across
              national aggregators, official government systems, and a different SaaS portal for
              nearly every agency. I know all {PLATFORMS.length} of these, how each one categorizes
              and notifies, and where each one lets good bids slip past. Pick a platform to see how
              it really works.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="space-y-14">
          {Array.from(byCat.entries()).map(([cat, list]) => (
            <div key={cat}>
              <SectionHead title={cat} />
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <Link
                    key={p.slug}
                    href={platformPath(p.slug)}
                    className="card group flex flex-col p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-fg group-hover:text-accent">
                        {p.name}
                      </h3>
                      {p.priority === 1 && (
                        <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-semibold text-warn">
                          Cornerstone
                        </span>
                      )}
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{p.oneLiner}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      {p.shortName} guide <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

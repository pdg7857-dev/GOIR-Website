import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { STAT_GROUPS } from "@/lib/site/stats";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { StatCallout, References } from "@/components/site/cite";
import { GoirCta } from "@/components/site/goir-cta";
import { ALL_CITATIONS } from "@/lib/site/citations";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Government Procurement Statistics (Canada & U.S.)",
  description:
    "Government procurement statistics on market size, opportunity volume, proposal workload, competition and opportunity waste. Every figure is cited, never invented.",
  path: "/government-procurement-statistics",
  keywords: [
    "government procurement statistics",
    "government contracting statistics",
    "proposal workload statistics",
    "bid competition statistics",
    "government procurement market size",
  ],
});

export default function GovernmentProcurementStatisticsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Government procurement statistics", path: "/government-procurement-statistics" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Government procurement statistics" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">Government procurement statistics</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              How big is the government market, how heavy is the proposal workload, and how thin is
              the competition once you find the right bids? These are the questions every contractor
              asks me. Here is how I answer them: with figures you can check, not numbers I made up.
            </p>
          </div>
        </div>
      </section>

      <Section muted>
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-bg-panel p-6 sm:flex-row sm:items-start sm:p-8">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="prose-site max-w-3xl">
            <p>
              I cite every number I publish. Where a figure is backed by a confirmed source, it links
              to the reference. Where a figure is still being verified against its primary source, you
              will see a clear "source pending" marker instead of a guess.
            </p>
            <p>
              That is deliberate. Government procurement is full of round numbers that get repeated
              until they sound official. I will not pad this page with figures I cannot stand behind.
            </p>
          </div>
        </div>
      </Section>

      {/* Research highlights from the citations registry */}
      <Section>
        <SectionHead
          eyebrow="Research highlights"
          title="The squeeze contractors actually feel"
          lede="The hard evidence is not about finding more bids. It is about how thin the staffing is to chase them, and how often competition is weaker than it looks."
        />
        <div className="mx-auto mt-8 max-w-3xl">
          {ALL_CITATIONS.map((c) => (
            <StatCallout key={c.id} id={c.id} />
          ))}
          <References />
        </div>
      </Section>

      {/* Structured market figures (placeholder-driven) */}
      <Section muted>
        <div className="space-y-14">
          {STAT_GROUPS.map((group) => (
            <div key={group.group}>
              <SectionHead eyebrow="By the numbers" title={group.group} />
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.claims.map((claim) => {
                  const verified = claim.value != null;
                  return (
                    <div key={claim.label} className="card flex flex-col p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        {verified ? (
                          <span className="text-3xl font-bold tabular-nums text-fg">{claim.value}</span>
                        ) : (
                          <span className="rounded-full bg-warn-soft px-3 py-1 text-xs font-semibold text-warn">
                            Pending verified source
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-fg">{claim.label}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{claim.context}</p>
                      <p className="mt-4 text-xs text-fg-subtle">
                        {claim.sourceUrl ? (
                          <a href={claim.sourceUrl} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
                            Source: {claim.sourceType}
                          </a>
                        ) : (
                          <>Source: {claim.sourceType} (citation needed, pending verified source)</>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <GoirCta />

      <CtaBand
        title="Numbers are the start. Your opportunities are the point."
        sub="Get a free Government Opportunity Intelligence Report and see the figures that matter for your business."
      />
    </>
  );
}

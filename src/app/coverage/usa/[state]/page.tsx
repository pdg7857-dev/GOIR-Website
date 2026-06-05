import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Building2, Check } from "lucide-react";
import { STATES, getState } from "@/lib/site/locations";
import { getPlatform } from "@/lib/site/platforms";
import { platformPath } from "@/lib/site/links";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/site/seo";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }): Metadata {
  const s = getState(params.state);
  if (!s) return { title: "Not found" };
  return pageMeta({
    title: `${s.name} Government Contracts & Procurement Coverage`,
    description: `How I find and qualify government opportunities in ${s.name}: ${s.blurb}`,
    path: `/coverage/usa/${s.slug}`,
    keywords: [`${s.name} government contracts`, `${s.name} government bids`, `${s.name} procurement`, `${s.name} solicitations`],
  });
}

export default function StatePage({ params }: { params: { state: string } }) {
  const s = getState(params.state);
  if (!s) notFound();

  // Only cross-link platforms that have authority pages.
  const platforms = s.platforms.map((slug) => getPlatform(slug)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Coverage", path: "/coverage" },
            { name: "United States", path: "/coverage/usa" },
            { name: s.name, path: `/coverage/usa/${s.slug}` },
          ]),
          serviceJsonLd(`${s.name} Government Opportunity Intelligence`, s.blurb, `/coverage/usa/${s.slug}`),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Coverage", href: "/coverage" },
              { name: "United States", href: "/coverage/usa" },
              { name: s.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">{s.region} · Capital: {s.capital}</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              {s.name} Government Contracts
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">{s.blurb}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/book" className="btn-gold px-5 py-3">Book a meeting</Link>
              <Link href="/opportunity-waste-calculator" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">
                Calculate your opportunity waste
              </Link>
            </div>
          </div>
        </div>
      </section>

      {platforms.length > 0 && (
        <Section>
          <SectionHead eyebrow="Where the work lives" title={`Platforms that matter in ${s.name}`} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((pf) => (
              <Link key={pf!.slug} href={platformPath(pf!.slug)} className="card group p-5 transition hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-fg">{pf!.name}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="mt-2 text-sm leading-6 text-fg-muted">{pf!.oneLiner}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-fg-muted">
            On top of the state system, I cover the aggregators and SaaS portals your local agencies
            post on, so postings come to you instead of you hunting across portals.
          </p>
        </Section>
      )}

      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-fg">What I do for {s.name} contractors</h2>
            <ul className="mt-5 space-y-3">
              {[
                `Monitor the ${s.name} state system plus every relevant local portal`,
                "Read the solicitations and qualify the fit before you spend a minute",
                "Flag renewals and rebids before they hit the open market",
                "Surface only the opportunities worth your estimator's time",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-fg-muted">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="text-sm font-semibold text-fg">Bidding in {s.name}?</p>
            <p className="mt-1.5 text-sm text-fg-muted">
              Book a 20-minute call and I&apos;ll bring real, current opportunities in your trade and
              region, already found and qualified.
            </p>
            <Link href="/book" className="btn-primary mt-4 w-full py-2.5 text-sm">Book a meeting</Link>
          </div>
        </div>
      </Section>

      <CtaBand title={`Stop missing ${s.name} opportunities meant for you.`} />
    </>
  );
}

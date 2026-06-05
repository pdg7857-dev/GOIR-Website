import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Building2, Check } from "lucide-react";
import { PROVINCES, getProvince } from "@/lib/site/locations";
import { getPlatform } from "@/lib/site/platforms";
import { platformPath } from "@/lib/site/links";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/site/seo";

export function generateStaticParams() {
  return PROVINCES.map((p) => ({ province: p.slug }));
}

export function generateMetadata({ params }: { params: { province: string } }): Metadata {
  const p = getProvince(params.province);
  if (!p) return { title: "Not found" };
  return pageMeta({
    title: `${p.name} Government Contracts & Procurement Coverage`,
    description: `How I find and qualify government opportunities in ${p.name}: ${p.blurb}`,
    path: `/coverage/canada/${p.slug}`,
    keywords: [`${p.name} government contracts`, `${p.name} government bids`, `${p.name} procurement`, `${p.name} tenders`],
  });
}

export default function ProvincePage({ params }: { params: { province: string } }) {
  const p = getProvince(params.province);
  if (!p) notFound();

  const platforms = Array.from(new Set(p.platforms)).map((slug) => getPlatform(slug)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Coverage", path: "/coverage" },
            { name: "Canada", path: "/coverage/canada" },
            { name: p.name, path: `/coverage/canada/${p.slug}` },
          ]),
          serviceJsonLd(`${p.name} Government Opportunity Intelligence`, p.blurb, `/coverage/canada/${p.slug}`),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Coverage", href: "/coverage" },
              { name: "Canada", href: "/coverage/canada" },
              { name: p.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">{p.type === "territory" ? "Territory" : "Province"} · Capital: {p.capital}</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              {p.name} Government Contracts
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">{p.blurb}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/book" className="btn-gold px-5 py-3">Book a meeting</Link>
              <Link href="/opportunity-waste-calculator" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">
                Calculate your opportunity waste
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="Where the work lives" title={`Platforms that matter in ${p.name}`} />
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/30 bg-bg-panel p-5 ring-1 ring-accent/20">
          <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm leading-6 text-fg-muted">
            <span className="font-semibold text-fg">Primary {p.type === "territory" ? "territorial" : "provincial"} system:</span>{" "}
            {p.primaryPortal}. I watch it alongside the national aggregators and municipal portals below,
            so a posting on any one of them still reaches you.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          I monitor these so you don&apos;t have to log into each one. Postings that match your trade
          and qualify on fit come to you, not the other way around.
        </p>
      </Section>

      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-fg">What I do for {p.name} contractors</h2>
            <ul className="mt-5 space-y-3">
              {[
                `Monitor every relevant ${p.name} platform, daily`,
                "Read the documents and qualify the fit before you spend a minute",
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
            <p className="text-sm font-semibold text-fg">Bidding in {p.name}?</p>
            <p className="mt-1.5 text-sm text-fg-muted">
              Book a 20-minute call and I&apos;ll bring real, current opportunities in your trade and
              region, already found and qualified.
            </p>
            <Link href="/book" className="btn-primary mt-4 w-full py-2.5 text-sm">Book a meeting</Link>
          </div>
        </div>
      </Section>

      <CtaBand title={`Stop missing ${p.name} opportunities meant for you.`} />
    </>
  );
}

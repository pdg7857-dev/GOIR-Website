import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Building2, AlertTriangle, Tag, ListChecks, ArrowRight, RefreshCw } from "lucide-react";
import { getIndustry } from "@/lib/site/industries";
import { getPlatform } from "@/lib/site/platforms";
import { platformPath, industryPath } from "@/lib/site/links";
import { Breadcrumbs, CtaBand, Section, SectionHead, CredentialBadge } from "@/components/site/ui";
import { LeadForm } from "@/components/site/lead-form";
import { FaqAccordion } from "@/components/site/faq";
import { GoirCta } from "@/components/site/goir-cta";
import { StatCallout } from "@/components/site/cite";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

export function industryMetadata(slug: string): Metadata {
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMeta({
    title: `${ind.name} Government Contracts: Qualify & Win More Bids`,
    description: `${ind.oneLiner} I monitor every platform, read the documents and qualify fit for ${ind.plural}, so you stop wasting estimator time on poor-fit government ${ind.name.toLowerCase()} bids.`,
    path: industryPath(ind.slug),
    keywords: ind.keywords,
  });
}

export function IndustryAuthority({ slug }: { slug: string }) {
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const platforms = ind.platforms.map(getPlatform).filter(Boolean);
  const path = industryPath(ind.slug);
  const faqs = [
    {
      q: `Which platforms carry ${ind.name.toLowerCase()} government work?`,
      a: `Your work shows up across ${platforms.slice(0, 4).map((p) => p!.name).join(", ")} and the state, provincial and municipal systems behind them. I watch the ones that serve your jurisdictions, not a fixed list.`,
    },
    {
      q: `My ${ind.name.toLowerCase()} work is specialized. Does this still help?`,
      a: `Especially then. The more specialized your trade, the more your work hides under generic titles and inside larger packages, and the more a keyword alert misses. I learn how buyers describe your scope and watch for it everywhere.`,
    },
    {
      q: "Do you bid or price the work for me?",
      a: "No. You own pricing and proposals. I find, read and qualify the opportunities so your estimators only spend time on the ones worth pursuing.",
    },
    {
      q: "How much does coverage cost?",
      a: "Flat monthly coverage from $599, priced by the geography you need rather than per opportunity or per platform. National and cross-border coverage is scoped to your footprint, from $1,499. See the pricing page for details.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: ind.name, path },
          ]),
          serviceJsonLd(`${ind.name} Government Opportunity Intelligence`, ind.oneLiner, path),
          faqJsonLd(faqs),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Industries", href: "/industries" }, { name: ind.name }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Industry</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">{ind.name} Government Contracts</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              {ind.oneLiner} I find, read and qualify government opportunities for {ind.plural}, so
              your estimators stop burning hours on poor-fit bids and only work the ones worth
              winning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/book" className="btn-gold px-5 py-3">
                Book a meeting
              </Link>
              <Link href="/opportunity-waste-calculator" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">
                Calculate your opportunity waste
              </Link>
            </div>
            <div className="mt-6">
              <CredentialBadge />
            </div>
          </div>
        </div>
      </section>

      {/* Buyers + work types */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-accent">
              <Building2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold text-fg">Who buys this work</h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {ind.buyers.map((b) => (
                <li key={b} className="flex gap-2.5 text-fg-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 text-accent">
              <ListChecks className="h-5 w-5" />
              <h2 className="text-xl font-semibold text-fg">The work you will see</h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {ind.workTypes.map((w) => (
                <li key={w} className="flex gap-2.5 text-fg-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-bg-subtle p-4 text-sm text-fg-muted">
              <Tag className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" />
              <span>
                Buyers usually file this under {ind.codes.join(" and ")}. Knowing the codes is half
                the battle. Knowing how each buyer bends them is the other half.
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Opportunity waste / qualification angle */}
      <Section muted>
        <SectionHead
          eyebrow="The real cost"
          title={`Where ${ind.plural} lose time, not just bids`}
          lede="The problem is rarely too few notices. It is estimator hours spent reviewing work that was never a fit, and good opportunities filed under titles you would never search."
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <StatCallout id="estimator-hiring" />
          <StatCallout id="labor-shortage" />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {ind.missedBecause.map((m) => (
            <div key={m} className="flex gap-3 rounded-2xl border border-border bg-bg-panel p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
              <p className="text-fg-muted">{m}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Platforms */}
      <Section>
        <SectionHead
          eyebrow="Where to watch"
          title={`Platforms that carry ${ind.name.toLowerCase()} work`}
          lede="These are the systems where your buyers post. I monitor the ones that serve your jurisdictions."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {platforms.map(
            (p) =>
              p && (
                <Link
                  key={p.slug}
                  href={platformPath(p.slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-panel px-4 py-2 text-sm font-medium text-fg-muted hover:border-accent hover:text-accent"
                >
                  {p.name}
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </Link>
              ),
          )}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-bg-subtle p-6">
          <div className="flex items-start gap-3">
            <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-fg">Renewal intelligence for {ind.plural}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">
                Much of the best {ind.name.toLowerCase()} work is already held by an incumbent and
                will rebid on a cycle you cannot see from a portal. I track those expirations so you
                can position before the solicitation posts.
              </p>
              <Link href="/government-contract-renewals" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                How renewal intelligence works <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <GoirCta />

      {/* Lead form */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Try it</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">Get a real {ind.name.toLowerCase()} opportunity, qualified</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Tell me your scope and where you work. I will send back a live opportunity for {ind.plural},
              already read and qualified, so you can see exactly what this looks like.
            </p>
          </div>
          <LeadForm variant="sample" />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead title={`${ind.name} questions`} />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <CtaBand title={`Stop wasting estimator time on poor-fit ${ind.name.toLowerCase()} bids.`} />
    </>
  );
}

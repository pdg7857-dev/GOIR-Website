import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, Quote, ExternalLink } from "lucide-react";
import { PLATFORMS, getPlatform, getPlatformHomepage, platformHomepageLabel } from "@/lib/site/platforms";
import { getIndustry } from "@/lib/site/industries";
import { getPlatformLongForm } from "@/lib/site/content";
import { platformPath, industryPath } from "@/lib/site/links";
import { Breadcrumbs, CtaBand, Section, CredentialBadge } from "@/components/site/ui";
import { LongFormBody, TableOfContents } from "@/components/site/longform";
import { FaqAccordion } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { PricingTables } from "@/components/site/pricing-tables";
import { GoirCta } from "@/components/site/goir-cta";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

export function platformMetadata(slug: string): Metadata {
  const p = getPlatform(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.shortName} Expert: Monitoring, Discovery & Bid Qualification`,
    description: `${p.oneLiner} See how I monitor ${p.name}, read the documents and qualify fit so you stop wasting estimator time and only pursue ${p.shortName} opportunities worth winning.`,
    path: platformPath(p.slug),
    keywords: p.keywords,
  });
}

export function PlatformAuthority({ slug }: { slug: string }) {
  const platform = getPlatform(slug);
  const content = getPlatformLongForm(slug);
  if (!platform || !content) notFound();

  const related = PLATFORMS.filter((x) => x.slug !== platform.slug && x.country === platform.country).slice(0, 3);
  const homepage = getPlatformHomepage(slug);
  const homepageLabel = platformHomepageLabel(slug);
  const industries = platform.industries.map(getIndustry).filter(Boolean).slice(0, 5);
  const path = platformPath(platform.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Platforms", path: "/platforms" },
            { name: platform.shortName, path },
          ]),
          serviceJsonLd(`${platform.name} Opportunity Intelligence`, content.intro, path),
          faqJsonLd(content.faqs.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Platforms", href: "/platforms" },
              { name: `${platform.shortName} expert` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">{platform.category}</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">The {platform.shortName} Expert</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">{content.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">
                Book a meeting
              </Link>
              <Link
                href="/opportunity-waste-calculator"
                className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg"
              >
                Calculate your opportunity waste
              </Link>
              <span className="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
                <Clock className="h-4 w-4" /> {content.readMins} min read
              </span>
            </div>
            {homepage && (
              <p className="mt-4 text-sm text-fg-subtle">
                Official site:{" "}
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                >
                  {homepageLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </p>
            )}
            <div className="mt-5">
              <CredentialBadge />
            </div>
          </div>
        </div>
      </section>

      {/* Body + TOC */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={content.sections} />
              <div className="mt-8 rounded-2xl border border-border bg-bg-subtle p-5">
                <p className="text-sm font-semibold text-fg">Skip the reading</p>
                <p className="mt-1.5 text-sm text-fg-muted">
                  Book a call and I&apos;ll show you what your {platform.shortName} coverage is missing,
                  with live opportunities in your market.
                </p>
                <Link href="/book" className="btn-primary mt-4 w-full py-2.5 text-sm">
                  Book a meeting
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <LongFormBody sections={content.sections} />

            <GoirCta className="mt-12" variant="inline" />

            {/* Case studies */}
            <div className="mt-14">
              <h2 className="text-2xl font-semibold text-fg sm:text-3xl">What this looks like in practice</h2>
              <p className="mt-2 text-sm text-fg-muted">Illustrative examples of the kind of result this work produces.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {content.caseStudies.map((c) => (
                  <div key={c.title} className="card p-6">
                    <Quote className="h-6 w-6 text-accent" />
                    <p className="mt-3 text-base font-semibold text-fg">{c.result}</p>
                    <p className="mt-2 text-sm leading-6 text-fg-muted">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-14">
              <h2 className="text-2xl font-semibold text-fg sm:text-3xl">{platform.shortName} questions, answered</h2>
              <div className="mt-6">
                <FaqAccordion faqs={content.faqs} />
              </div>
            </div>

            {/* Cross-links */}
            {industries.length > 0 && (
              <div className="mt-14 rounded-2xl border border-border bg-bg-subtle p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
                  Industries that bid most on {platform.shortName}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industries.map(
                    (i) =>
                      i && (
                        <Link
                          key={i.slug}
                          href={industryPath(i.slug)}
                          className="rounded-full border border-border bg-bg-panel px-3 py-1.5 text-sm font-medium text-fg-muted hover:border-accent hover:text-accent"
                        >
                          {i.name}
                        </Link>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* GOIR lead form */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">See what your {platform.shortName} setup is missing</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Request your free Government Opportunity Intelligence Report. I will assess your{" "}
              {platform.shortName} coverage, estimate the opportunity waste in your current process,
              and flag the renewals and fits you are not seeing.
            </p>
          </div>
          <LeadForm variant="sample" />
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Coverage</p>
          <h2 className="mt-3 text-3xl font-semibold text-fg">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-fg-muted">
            {platform.shortName} monitoring is included in every coverage plan for the jurisdictions
            you choose. No per-platform fees.
          </p>
        </div>
        <div className="mt-12">
          <PricingTables />
        </div>
      </Section>

      {/* Related platforms */}
      <Section muted>
        <h2 className="text-2xl font-semibold text-fg">More platforms I cover</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={platformPath(r.slug)} className="card group p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{r.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-fg group-hover:text-accent">{r.shortName} expert</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{r.oneLiner}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand title={`Stop wasting estimator time on the wrong ${platform.shortName} bids.`} />
    </>
  );
}

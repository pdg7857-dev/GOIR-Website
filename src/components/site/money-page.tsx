import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getMoneyPage } from "@/lib/site/money-pages";
import { Breadcrumbs, CtaBand, Section, CredentialBadge } from "@/components/site/ui";
import { LongFormBody, TableOfContents } from "@/components/site/longform";
import { FaqAccordion } from "@/components/site/faq";
import { StatCallout, References } from "@/components/site/cite";
import { GoirCta } from "@/components/site/goir-cta";
import { LeadForm } from "@/components/site/lead-form";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

const GROUP_LABEL: Record<string, string> = {
  money: "Service",
  renewal: "Renewal intelligence",
  authority: "Research & authority",
};

export function moneyPageMetadata(slug: string): Metadata {
  const p = getMoneyPage(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/${p.slug}`, keywords: p.keywords });
}

export function MoneyPageView({ slug }: { slug: string }) {
  const p = getMoneyPage(slug);
  if (!p) notFound();
  const path = `/${p.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: p.h1, path }]),
          serviceJsonLd(p.h1, p.description, path),
          faqJsonLd(p.faqs.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: p.h1 }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">{p.eyebrow || GROUP_LABEL[p.group]}</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">{p.h1}</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">{p.lede}</p>
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

      <Section>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={p.sections} />
              <div className="mt-8 rounded-2xl border border-border bg-bg-subtle p-5">
                <p className="text-sm font-semibold text-fg">Free discovery call</p>
                <p className="mt-1.5 text-sm text-fg-muted">
                  Twenty minutes. I&apos;ll bring real, qualified opportunities in your trade and jurisdictions.
                </p>
                <Link href="/book" className="btn-primary mt-4 w-full py-2.5 text-sm">
                  Book a meeting
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">
            {p.statIds && p.statIds.length > 0 && (
              <div className="mb-8">
                {p.statIds.map((id) => (
                  <StatCallout key={id} id={id} />
                ))}
              </div>
            )}

            <LongFormBody sections={p.sections} />

            <GoirCta className="mt-12" variant="inline" />

            <div className="mt-14">
              <h2 className="text-2xl font-semibold text-fg sm:text-3xl">Common questions</h2>
              <div className="mt-6">
                <FaqAccordion faqs={p.faqs} />
              </div>
            </div>

            {p.statIds && p.statIds.length > 0 && <References ids={p.statIds} />}

            <div className="mt-12 rounded-2xl border border-border bg-bg-subtle p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Related</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-panel px-3 py-1.5 text-sm font-medium text-fg-muted hover:border-accent hover:text-accent"
                  >
                    {r.label} <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">See it in your market</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Request your free Government Opportunity Intelligence Report and I will show you the
              opportunity waste, coverage gaps and renewals specific to your trades and
              jurisdictions.
            </p>
          </div>
          <LeadForm variant="call" />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

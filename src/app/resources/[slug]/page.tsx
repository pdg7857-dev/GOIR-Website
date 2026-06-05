import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calculator, Check } from "lucide-react";
import { RESOURCES, getResource } from "@/lib/site/resources";
import { LeadForm } from "@/components/site/lead-form";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/site/seo";

const CALCULATOR_SLUG = "government-bid-cost-calculator";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug);
  if (!r) return {};
  return pageMeta({
    title: `${r.title}: Free ${r.kind} for Government Contractors`,
    description: r.summary,
    path: `/resources/${r.slug}`,
    keywords: [r.title.toLowerCase(), "government contracting", `government bid ${r.kind.toLowerCase()}`],
  });
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = getResource(params.slug);
  if (!resource) notFound();

  const isCalculator = resource.slug === CALCULATOR_SLUG;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: resource.title, path: `/resources/${resource.slug}` },
          ]),
          serviceJsonLd(resource.title, resource.summary, `/resources/${resource.slug}`),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: resource.title },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent">
              {resource.kind}
            </span>
            <h1 className="mt-4 text-4xl font-bold text-fg sm:text-5xl">{resource.title}</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">{resource.summary}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="What's inside" title={`Inside the ${resource.kind.toLowerCase()}`} />
            <ul className="mt-6 space-y-4">
              {resource.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-[0.975rem] leading-7 text-fg-muted">{b}</span>
                </li>
              ))}
            </ul>

            <div className="prose-site mt-8 max-w-xl">
              <p>
                I built this out of the work I do for clients every week: monitoring the platforms
                your buyers use, reading the documents and qualifying the fit. It is practical, and
                every figure in it is either yours or one I can cite.
              </p>
            </div>

            {isCalculator && (
              <Link
                href="/opportunity-waste-calculator"
                className="btn-primary mt-8 inline-flex items-center gap-2 px-5 py-3"
              >
                <Calculator className="h-4 w-4" />
                Use the interactive calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="lg:sticky lg:top-24">
            <LeadForm variant="guide" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

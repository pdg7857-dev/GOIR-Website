import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_TOPICS, getTopic, topicsByCategory } from "@/lib/site/blog";
import { getBlogBody } from "@/lib/site/content/blog-bodies";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { LongFormBody, TableOfContents } from "@/components/site/longform";
import { FaqAccordion } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

export function generateStaticParams() {
  return BLOG_TOPICS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const topic = getTopic(params.slug);
  if (!topic) return {};
  return pageMeta({
    title: topic.title,
    description: topic.excerpt,
    path: `/blog/${topic.slug}`,
    keywords: [topic.category.toLowerCase(), "government contracts", "government opportunity intelligence"],
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) notFound();
  const body = getBlogBody(topic);

  // Related posts: a few others from the same category, then top up if needed.
  const sameCat = topicsByCategory().get(topic.category) ?? [];
  const related = sameCat.filter((t) => t.slug !== topic.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: topic.title, path: `/blog/${topic.slug}` },
          ]),
          serviceJsonLd(
            "Government Opportunity Intelligence",
            topic.excerpt,
            `/blog/${topic.slug}`,
          ),
          faqJsonLd(body.faqs.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: topic.category, href: "/blog" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">{topic.category}</p>
            <h1 className="mt-3 text-3xl font-bold text-fg sm:text-4xl lg:text-5xl">
              {topic.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">{topic.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">
                Book a discovery call
              </Link>
              <Link
                href={SITE.sampleUrl}
                className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg"
              >
                Request a sample opportunity
              </Link>
              <span className="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
                <Clock className="h-4 w-4" /> {body.readMins} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body + TOC */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={body.sections} />
              <div className="mt-8 rounded-2xl border border-border bg-bg-subtle p-5">
                <p className="text-sm font-semibold text-fg">Want to skip the reading?</p>
                <p className="mt-1.5 text-sm text-fg-muted">
                  I will show you live, qualified opportunities in your trade and jurisdictions on a
                  call.
                </p>
                <Link href={SITE.bookingUrl} className="btn-primary mt-4 w-full py-2.5 text-sm">
                  Book a call
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <LongFormBody sections={body.sections} />

            {/* Cross-links */}
            {body.related && body.related.length > 0 && (
              <div className="mt-14 rounded-2xl border border-border bg-bg-subtle p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
                  Keep reading
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {body.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="rounded-full border border-border bg-bg-panel px-3 py-1.5 text-sm font-medium text-fg-muted hover:border-accent hover:text-accent"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="mt-14">
              <h2 className="text-2xl font-semibold text-fg sm:text-3xl">
                Questions I hear about this
              </h2>
              <div className="mt-6">
                <FaqAccordion faqs={body.faqs} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lead form */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">
              See what your setup is missing
            </h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Reading is a good start. Seeing real opportunities in your own trade and jurisdictions
              is better. Tell me where you bid and what you chase, and I will show you the picture as
              it actually looks for you.
            </p>
          </div>
          <LeadForm variant={body.leadVariant} />
        </div>
      </Section>

      {/* Related posts */}
      {related.length > 0 && (
        <Section>
          <h2 className="text-2xl font-semibold text-fg">More on {topic.category.toLowerCase()}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="card group flex flex-col p-6">
                <h3 className="text-base font-semibold leading-snug text-fg group-hover:text-accent">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{r.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}

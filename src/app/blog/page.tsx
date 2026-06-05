import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BLOG_TOPICS, topicsByCategory } from "@/lib/site/blog";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Blog: Government Opportunity Intelligence, Explained",
  description:
    "Plain-English guides to government procurement platforms, industries, bid qualification and where opportunities hide across Canada and the U.S. Written from how I actually do the work.",
  path: "/blog",
  keywords: [
    "government procurement blog",
    "how to find government contracts",
    "bid qualification guide",
    "merx canadabuys sam.gov guides",
  ],
});

const CATEGORY_BLURBS: Record<string, string> = {
  Platforms:
    "How each portal really works, where the good opportunities hide and where every one of them lets bids slip past.",
  Industries:
    "Where the public-sector work is posted for the trades I cover, and how I read a scope for fit before you chase it.",
  States: "Where state and local opportunities live, and how I watch the whole picture as one feed.",
  Provinces:
    "Provincial and MASH-sector procurement, mapped so the right opportunities reach you on time.",
  Statistics: "What the public spending and award data actually tells you about where the work is.",
  "Bid qualification":
    "How I turn a long solicitation into a clear go or no-go before you invest a single hour.",
  "Opportunity monitoring":
    "How I tune coverage so the right opportunities surface and the rest stay out of your inbox.",
  "Government procurement": "The rules, terms and mechanics of public buying, in plain English.",
  Competition: "Using public data to understand the field before you decide to enter it.",
  "No-bid analysis": "Knowing what to skip is half the value of good intelligence.",
  "Contract awards": "Reading award history to sharpen qualification on the next opportunity.",
};

export default function BlogIndex() {
  const byCat = topicsByCategory();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Resources</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Government opportunity intelligence, explained
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              No fluff and no theory. These are {BLOG_TOPICS.length} plain-English guides drawn from
              how I actually monitor portals, read bid documents and qualify fit for the people I
              work with. Pick a topic and dig in.
            </p>
          </div>
        </div>
      </section>

      {/* Category sections */}
      <Section>
        <div className="space-y-16">
          {Array.from(byCat.entries()).map(([cat, list]) =>
            list.length === 0 ? null : (
              <div key={cat}>
                <SectionHead title={cat} lede={CATEGORY_BLURBS[cat]} />
                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/blog/${t.slug}`}
                      className="card group flex flex-col p-6"
                    >
                      <h3 className="text-base font-semibold leading-snug text-fg group-hover:text-accent">
                        {t.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{t.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                        Read{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </Section>

      <CtaBand title="Reading is good. Live opportunities are better." />
    </>
  );
}

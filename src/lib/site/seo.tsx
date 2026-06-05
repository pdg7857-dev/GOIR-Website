import type { Metadata } from "next";
import { SITE } from "./config";

/** Build page metadata with sensible canonical + Open Graph defaults. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = SITE.domain + opts.path;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.brandFull,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

type Json = Record<string, unknown>;

/** Person/Organization schema describing Phil's practice. */
export function organizationJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.brandFull,
    description:
      "Government Opportunity Intelligence: monitoring, discovery, bid-document review and fit qualification of government contract opportunities across Canada and the United States.",
    url: SITE.domain,
    email: SITE.email,
    areaServed: ["Canada", "United States"],
    knowsAbout: [
      "Government procurement", "Bid monitoring", "MERX", "BidNet Direct",
      "CanadaBuys", "SAM.gov", "Government opportunity intelligence",
    ],
    founder: { "@type": "Person", name: SITE.person },
  };
}

export function serviceJsonLd(name: string, description: string, path: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    url: SITE.domain + path,
    provider: { "@type": "ProfessionalService", name: SITE.brandFull, url: SITE.domain },
    areaServed: ["Canada", "United States"],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.domain + it.path,
    })),
  };
}

/** Render one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
    </>
  );
}

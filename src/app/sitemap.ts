import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site/config";
import { PLATFORMS } from "@/lib/site/platforms";
import { INDUSTRIES } from "@/lib/site/industries";
import { PROVINCES, STATES } from "@/lib/site/locations";
import { BLOG_TOPICS } from "@/lib/site/blog";
import { RESOURCES } from "@/lib/site/resources";
import { MONEY_PAGES } from "@/lib/site/money-pages";
import { platformPath, industryPath } from "@/lib/site/links";

/**
 * Full XML sitemap. Static cornerstone routes are enumerated by hand with
 * intent-based priorities; dynamic platform/industry/geo/blog/resource and
 * money-page routes are generated from the same data files the pages render
 * from, so the sitemap can never drift out of sync with what is published.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain;
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  const cornerstone: MetadataRoute.Sitemap = [
    entry("", 1.0, "weekly"),
    entry("/government-opportunity-intelligence", 0.95, "monthly"),
    entry("/government-opportunity-intelligence-report", 0.95, "weekly"),
    entry("/how-it-works", 0.9, "monthly"),
    entry("/pricing", 0.9, "monthly"),
    entry("/opportunity-waste-calculator", 0.85, "monthly"),
    entry("/government-procurement-statistics", 0.8, "monthly"),
    entry("/platforms", 0.8, "weekly"),
    entry("/industries", 0.8, "weekly"),
    entry("/coverage", 0.7, "weekly"),
    entry("/coverage/canada", 0.7, "weekly"),
    entry("/coverage/usa", 0.7, "weekly"),
  ];

  const supporting: MetadataRoute.Sitemap = [
    entry("/book", 0.8, "monthly"),
    entry("/sample-opportunity", 0.8, "monthly"),
    entry("/contact", 0.6, "monthly"),
    entry("/faq", 0.6, "monthly"),
    entry("/about", 0.6, "monthly"),
    entry("/resources", 0.7, "weekly"),
    entry("/blog", 0.7, "daily"),
  ];

  const legal: MetadataRoute.Sitemap = [
    entry("/privacy", 0.3, "yearly"),
    entry("/terms", 0.3, "yearly"),
  ];

  // Money, renewal and authority pages (flat URLs).
  const moneyPriority: Record<string, number> = { money: 0.85, renewal: 0.8, authority: 0.75 };
  const money: MetadataRoute.Sitemap = MONEY_PAGES.map((p) =>
    entry(`/${p.slug}`, moneyPriority[p.group] ?? 0.7, "monthly"),
  );

  // Platform authority pages (flat /{slug}-expert).
  const platforms: MetadataRoute.Sitemap = PLATFORMS.map((p) =>
    entry(platformPath(p.slug), 0.85, "monthly"),
  );
  // Industry pages (flat /{slug}-government-contracts).
  const industries: MetadataRoute.Sitemap = INDUSTRIES.map((i) =>
    entry(industryPath(i.slug), 0.8, "monthly"),
  );

  const provinces: MetadataRoute.Sitemap = PROVINCES.map((p) =>
    entry(`/coverage/canada/${p.slug}`, 0.6, "monthly"),
  );
  const states: MetadataRoute.Sitemap = STATES.map((s) =>
    entry(`/coverage/usa/${s.slug}`, 0.6, "monthly"),
  );

  const blog: MetadataRoute.Sitemap = BLOG_TOPICS.map((b) =>
    entry(`/blog/${b.slug}`, 0.6, "weekly"),
  );
  const resources: MetadataRoute.Sitemap = RESOURCES.map((r) =>
    entry(`/resources/${r.slug}`, 0.7, "monthly"),
  );

  return [
    ...cornerstone,
    ...supporting,
    ...legal,
    ...money,
    ...platforms,
    ...industries,
    ...provinces,
    ...states,
    ...blog,
    ...resources,
  ];
}

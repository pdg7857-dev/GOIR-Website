/**
 * Canonical URL helpers. The site uses flat, keyword-rich URLs:
 *   platform authority pages -> /{slug}-expert        (e.g. /merx-expert)
 *   industry pages           -> /{slug}-government-contracts
 * Old nested paths (/platforms/:slug, /industries/:slug) 301-redirect here
 * via next.config.js.
 */

/** A few industries use a shorter URL slug than their data slug. */
const INDUSTRY_URL_OVERRIDES: Record<string, string> = {
  "facilities-maintenance": "facilities",
};

export function platformPath(slug: string): string {
  return `/${slug}-expert`;
}

export function industryUrlSlug(slug: string): string {
  return INDUSTRY_URL_OVERRIDES[slug] ?? slug;
}

export function industryPath(slug: string): string {
  return `/${industryUrlSlug(slug)}-government-contracts`;
}

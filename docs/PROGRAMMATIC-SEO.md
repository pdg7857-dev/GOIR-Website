# Programmatic SEO Strategy

The site scales through programmatic generation: a small number of templates render a large number of unique, useful pages from typed data files. The advantage is reach across the long tail of platform, industry, and geography searches. The discipline required is that every generated page must be genuinely useful, never a thin doorway. This document explains how the model works, how to extend it, and the guardrails that keep it from drifting into spam.

## The three templates

| Template | Route | Data source | Count today |
| --- | --- | --- | --- |
| Platform | `/platforms/[slug]` | `src/lib/site/platforms.ts` (`PLATFORMS`) | 18 |
| Industry | `/industries/[slug]` | `src/lib/site/industries.ts` (`INDUSTRIES`) | 12 |
| Province | `/coverage/canada/[province]` | `src/lib/site/locations.ts` (`PROVINCES`) | 13 |
| State | `/coverage/usa/[state]` | `src/lib/site/locations.ts` (`STATES`) | 50 |

Each template uses Next.js `generateStaticParams` to statically build one page per data entry at build time. The site is fully SSG, so every programmatic page ships as static HTML with excellent Core Web Vitals.

## The data-driven model

The data files are the single source of truth. They do more than supply a name and a slug; each entry carries the raw material for unique, substantive content:

- **Platforms** carry `category`, `country`, `priority`, `oneLiner`, a `keywords` array, and an `industries` array (which trades bid most on that platform). This drives the H1, the metadata, the body, and the cross-links to industry pages.
- **Industries** carry `oneLiner`, `keywords`, `buyers` (who issues the work), `workTypes` (the solicitation categories you actually see), `codes` (NAICS / UNSPSC families), `missedBecause` (how opportunities slip past in that trade), and a `platforms` array. The `missedBecause` and `workTypes` arrays are what make each industry page read like operator knowledge rather than a filled-in template.
- **Provinces and states** carry `capital`, `region` or `type`, a `platforms` array that includes the jurisdiction's own procurement system (for example BC Bid, SEAO, Cal eProcure, COMMBUYS, eVA), and a `blurb` describing that market. The per-jurisdiction system names are the unique, non-duplicable substance of each geo page.

Because the same data files feed navigation, internal links (`config.ts` nav plus the cross-cluster arrays), the JSON-LD in `seo.tsx`, and the XML sitemap (`sitemap.ts`), adding one data entry wires up the page everywhere at once.

## How to add a new page

### Add a state, province, platform, or industry

1. Add one object to the relevant array in the data file (`STATES`, `PROVINCES`, `PLATFORMS`, or `INDUSTRIES`), filling in every field, including the descriptive arrays (`platforms`, `missedBecause`, `workTypes`, `codes`, `buyers`, `keywords`, `blurb`).
2. Build. `generateStaticParams` produces the new static page automatically. The hub page (`/platforms`, `/industries`, `/coverage/...`) lists it because hubs render the full array. The sitemap includes it because `sitemap.ts` maps over the same array. Cross-cluster links appear automatically wherever another entry references the new slug.
3. Confirm the new slug is referenced by other entries where it belongs (for example, if you add a new platform, add its slug to the `platforms` arrays of the industries and jurisdictions where that platform is used) so the page is not orphaned.

No template code changes are needed for a routine addition. That is the point of the model.

## Quality guardrails: avoiding thin and doorway pages

Programmatic pages earn their place only if each is uniquely useful. Enforce these rules:

1. **Substance per page, not just substitution.** A page that only swaps a name into a boilerplate sentence is a doorway page and a liability. Every page must lead with content unique to that entity: the platform's real quirks, the trade's real document gotchas, the jurisdiction's actual procurement system. The data files are structured to force this (the `missedBecause`, `workTypes`, and per-jurisdiction `platforms` fields cannot be filled generically).
2. **Real, verifiable specifics.** Use the actual procurement systems (BC Bid, SEAO, NJSTART, COMMBUYS, eVA, MyFloridaMarketPlace, and so on already encoded in `locations.ts`), real codes, and real buyer types. Never invent statistics or platforms.
3. **Tiered depth.** Not every page deserves equal length. Cornerstone platforms (`priority: 1`: MERX, BidNet Direct, CanadaBuys, SAM.gov) and primary industries (`primary: true`) get the deepest hand-authored bodies. Lower-priority entries get shorter but still unique pages. This concentrates effort where search demand is highest.
4. **Distinct titles and meta.** The metadata patterns in the SEO strategy ensure each page has a unique title and description. Never let two pages share a title.
5. **Internal links prove relatedness.** Each page links to its related platforms, industries, and jurisdictions, so it sits inside a topical cluster rather than standing alone. Crawlers read isolated near-duplicate pages as low quality; densely interlinked, differentiated pages read as authority.
6. **Conversion, not just ranking.** Every programmatic page carries a real CTA (sample opportunity, then discovery call). A page that ranks but offers no next step wastes the traffic.
7. **Refresh with reality.** Geo and platform pages should be updated as procurement systems change and as real award data accumulates (see the content-moat doc). Stale programmatic pages decay.

## Future expansion: geo by industry by platform

The current model is one dimension per page (a platform, an industry, or a jurisdiction). The data already encodes the relationships for a second-dimension expansion when demand and content depth justify it:

- **Industry by geography:** `/coverage/usa/[state]/[industry]` or `/industries/[slug]/[state]`, for example "janitorial government contracts in California". There are 12 industries times 63 jurisdictions, which is a large surface; expand selectively, starting with the highest-demand combinations (primary industries in the largest markets).
- **Industry by platform:** "construction bids on MERX", supported by the existing `industries` and `platforms` cross-references.

The hard rule for any expansion: a combination page ships only if it can say something true and specific that the single-dimension pages do not already say. If "janitorial in California" would just concatenate the janitorial page and the California page, do not build it. Build it when there is real, distinct content (specific California janitorial buyers, the relevant Cal eProcure and PlanetBids behavior for custodial RFPs, the local wage-rate rules). Combinatorial expansion without incremental substance is exactly how a programmatic site collapses into doorway pages, so the substance test gates every new tier.

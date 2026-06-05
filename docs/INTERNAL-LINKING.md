# Internal Linking Strategy

Internal linking does three jobs for this site: it distributes authority from high-traffic hubs to deep money pages, it tells crawlers how the four keyword clusters relate, and it moves a reader from an informational page toward a conversion. The model is hub-and-spoke, reinforced by deliberate cross-cluster links.

## The hub-and-spoke model

### Level 0: Home

`/` is the top of the pyramid. It links to every cornerstone:

- `/how-it-works`
- `/government-opportunity-intelligence` (the category page)
- `/pricing`
- `/platforms`, `/industries`, `/coverage` (the three programmatic hubs)
- `/book` and `/sample-opportunity` (the conversion routes)

The home page should pass authority broadly but not dilute it: link once to each hub with descriptive anchor text, not a wall of links.

### Level 1: Cornerstone hubs

Three programmatic hubs each link down to their spokes and across to the other clusters:

| Hub | Links down to | Links across to |
| --- | --- | --- |
| `/platforms` | all 18 `/platforms/[slug]` pages | `/industries`, `/coverage` |
| `/industries` | all 12 `/industries/[slug]` pages | `/platforms`, `/coverage` |
| `/coverage` | `/coverage/canada`, `/coverage/usa`, then each `[province]` and `[state]` | `/platforms`, `/industries` |

`/government-opportunity-intelligence` is the conceptual hub for Cluster 1 and should link to `/how-it-works`, `/pricing`, and at least the four cornerstone platform pages as proof of depth.

### Level 2: Spoke pages

Spoke pages are where the cross-cluster web is woven. This is the most important part of the strategy because it is what makes the programmatic pages feel connected rather than orphaned.

## Cross-cluster linking: platform, industry, geo

The data files already encode the relationships needed to generate these links automatically. Use them.

- **Platform page to industries.** Each platform in `platforms.ts` carries an `industries` array. A platform page should link to those industry pages ("contractors who bid most on MERX: construction, janitorial, facilities maintenance..."). Example: `/platforms/merx` links to `/industries/construction`, `/industries/janitorial`, `/industries/facilities-maintenance`, `/industries/hvac`, `/industries/electrical`.
- **Industry page to platforms.** Each industry in `industries.ts` carries a `platforms` array. An industry page should link to those platform pages ("where this work shows up: MERX, CanadaBuys, SAM.gov..."). Example: `/industries/construction` links to `/platforms/merx`, `/platforms/canadabuys`, `/platforms/sam-gov`, `/platforms/bids-and-tenders`, `/platforms/bonfire`, `/platforms/planetbids`, `/platforms/bidnet-direct`.
- **Geo page to platforms.** Each province and state in `locations.ts` carries a `platforms` array (the national aggregators plus that jurisdiction's own system). The geo page links to the platform pages that exist on the site. Example: `/coverage/canada/ontario` links to `/platforms/merx`, `/platforms/bids-and-tenders`, `/platforms/biddingo`, `/platforms/bonfire`, `/platforms/canadabuys`, `/platforms/bidnet-direct`.
- **Platform and industry pages back up to geo.** Cornerstone pages should link to `/coverage/canada` and `/coverage/usa` so the geography cluster receives authority from the stronger clusters.

This produces a dense, bidirectional graph: platform links to industry links to geo links back to platform. A crawler arriving on any single page can reach the whole money-page network in two or three clicks.

## Blog to money pages

Blog posts (`/blog/[slug]`) are link sources, not link destinations to be hoarded. Every post should link out to the relevant money pages:

- A post about reading a SAM.gov solicitation links to `/platforms/sam-gov` and `/sample-opportunity`.
- A post about winning janitorial RFPs links to `/industries/janitorial` and `/pricing`.
- A post about a province's procurement reform links to that `/coverage/canada/[province]` page.
- Every post links at least once to a conversion route (`/book` or `/sample-opportunity`).

Blog posts pass freshness and topical authority up to the evergreen money pages. The money pages rarely need to link back to individual posts; a "related reading" block that surfaces two or three recent relevant posts is enough.

## Anchor-text guidance

- **Use descriptive, keyword-relevant anchors**, not "click here" or bare URLs. Prefer "how MERX really works" or "janitorial government contracts" over "this page".
- **Vary the anchor text** across the many pages that link to the same target so it reads naturally and avoids an over-optimized footprint. For `/platforms/merx`, rotate among "MERX", "MERX monitoring", "the MERX guide", "how MERX works".
- **Match anchor to the destination's primary keyword** for the most important hub links, and use longer natural phrases for in-body links.
- **Keep navigation anchors stable** (the header and footer in `config.ts` already provide consistent sitewide links to the hubs and conversion routes).

## Orphan-page avoidance

A page is orphaned if nothing internal links to it. With programmatic generation this is the main risk. Guardrails:

1. **Every spoke is linked from its hub.** The hub pages render the full list from the data file, so adding a new platform, industry, province, or state automatically creates the inbound link. Never hand-curate a partial list on a hub.
2. **Every spoke is in the sitemap.** `src/app/sitemap.ts` enumerates dynamic routes from the same data files, so the XML sitemap can never miss a page.
3. **Cross-cluster links give every spoke multiple inbound paths.** A platform page is reachable from its hub, from every industry that lists it, and from every geo that lists it.
4. **Footer carries the four cornerstone platforms, three primary industries, and both country hubs** on every page, guaranteeing baseline inbound links to the most valuable spokes.
5. **The conversion routes** (`/book`, `/sample-opportunity`) are linked from every page through CTA bands and the footer, so they are never orphaned and always one click away.

## Link depth target

No money page should sit more than three clicks from the home page. The hubs put every spoke at depth two; cross-cluster links and the footer keep effective depth at two for the cornerstones. Audit periodically by crawling from `/` and confirming every URL in the sitemap is reachable.

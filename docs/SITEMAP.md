# Site Map and Information Architecture

This is the human-readable map of the entire site: every route, what it is for, and how it fits the four-cluster, hub-and-spoke architecture. The machine-readable equivalent is generated at `/sitemap.xml` by `src/app/sitemap.ts`, which enumerates the same routes from the data files.

## Positioning: category creation

The whole architecture exists to establish and own a category: **Government Opportunity Intelligence**. The brand is positioned above commodity bid-alert tools and bid-listing databases. The product is monitoring plus document review plus fit qualification, delivered by a named operator (Phil). The promise threaded through every page: "You focus on winning contracts. I focus on finding them." The literal category page at `/government-opportunity-intelligence` is the canonical definition and the conceptual center of the site.

## Top-level structure

```
/                                       Home (cluster 1 entry, links to all hubs)
|
+-- /how-it-works                        The service explained
+-- /government-opportunity-intelligence Category definition page
+-- /pricing                             Plans and cost
+-- /faq                                 Objection handling (FAQPage schema)
+-- /about                               Phil, the named expert
|
+-- Conversion routes
|   +-- /book                            PRIMARY CTA: book a discovery call
|   +-- /sample-opportunity              SECONDARY CTA: request a sample
|   +-- /contact                         General contact
|
+-- /platforms                           Cluster 2 hub
|   +-- /platforms/[slug]                18 platform authority pages
|
+-- /industries                          Cluster 3 hub
|   +-- /industries/[slug]               12 industry pages
|
+-- /coverage                            Cluster 4 hub
|   +-- /coverage/canada                 Canada hub
|   |   +-- /coverage/canada/[province]  13 provinces and territories
|   +-- /coverage/usa                    USA hub
|       +-- /coverage/usa/[state]        50 states
|
+-- Resources (cluster 1 / list growth)
|   +-- /resources                       Lead-magnet hub (TERTIARY goal)
|   |   +-- /resources/[slug]            7 lead magnets
|   +-- /blog                            Blog hub
|   |   +-- /blog/[slug]                 Articles
|   +-- /statistics                      Government contracting by the numbers
|   +-- /tools/opportunity-cost-calculator  Interactive CRO tool
|
+-- Legal
    +-- /privacy
    +-- /terms
```

## Route reference

### Cornerstone and intelligence (Cluster 1)

| Route | Purpose |
| --- | --- |
| `/` | Home. States the promise, links to all hubs and both primary CTAs. |
| `/how-it-works` | Explains monitoring, discovery, document review, and fit qualification. |
| `/government-opportunity-intelligence` | Defines the category; the topical center of the site. |
| `/pricing` | Recurring monthly plans and coverage; framed against the cost of missing work. |
| `/faq` | Answers common objections; emits FAQPage JSON-LD. |
| `/about` | Establishes Phil as the named, credible expert (E-E-A-T). |

### Conversion routes

| Route | Goal | Purpose |
| --- | --- | --- |
| `/book` | Primary | Book a discovery call (`bookingUrl` in config; form fallback until a calendar is wired). |
| `/sample-opportunity` | Secondary | Request a real, qualified sample opportunity; the proof asset. |
| `/contact` | Support | General contact route. |

### Platforms (Cluster 2)

`/platforms` (hub) plus `/platforms/[slug]` for all 18 platforms in `src/lib/site/platforms.ts`:

| Slug | Platform | Slug | Platform |
| --- | --- | --- | --- |
| `merx` | MERX | `coupa` | Coupa |
| `bidnet-direct` | BidNet Direct | `planetbids` | PlanetBids |
| `canadabuys` | CanadaBuys | `opengov` | OpenGov (ProcureNow) |
| `sam-gov` | SAM.gov | `demandstar` | DemandStar |
| `bonfire` | Bonfire | `ionwave` | Ion Wave |
| `biddingo` | Biddingo | `govwin` | GovWin IQ |
| `bids-and-tenders` | bids&tenders | `periscope` | Periscope S2G |
| `jaggaer` | Jaggaer | `gsa-ebuy` | GSA eBuy |
| `sap-ariba` | SAP Ariba | `usaspending` | USASpending |

The four cornerstone platforms (priority 1) are MERX, BidNet Direct, CanadaBuys, and SAM.gov; they get the deepest pages and top-nav placement.

### Industries (Cluster 3)

`/industries` (hub) plus `/industries/[slug]` for all 12 industries in `src/lib/site/industries.ts`: construction, janitorial, facilities-maintenance, hvac, electrical, plumbing, landscaping, security, engineering, environmental, industrial-supplies, mro. Primary industries (deepest pages): construction, janitorial, facilities-maintenance, industrial-supplies, mro.

### Coverage / geography (Cluster 4)

| Route | Purpose |
| --- | --- |
| `/coverage` | Geography hub; links to both countries and the platform/industry clusters. |
| `/coverage/canada` | Canada hub; lists provinces and territories. |
| `/coverage/canada/[province]` | 13 pages: Ontario, Alberta, British Columbia, Quebec, Manitoba, Saskatchewan, Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland and Labrador, Yukon, Northwest Territories, Nunavut. |
| `/coverage/usa` | USA hub; lists states by region. |
| `/coverage/usa/[state]` | 50 state pages, each referencing the state's procurement system. |

### Resources, blog, tools (Cluster 1 / list growth)

| Route | Purpose |
| --- | --- |
| `/resources` | Lead-magnet hub; the tertiary conversion goal (email list). |
| `/resources/[slug]` | 7 lead magnets (calculator, qualification checklist, opportunity report, MERX guide, BidNet Direct guide, intelligence report, scorecard). |
| `/blog` | Blog hub; topical authority and links into money pages. |
| `/blog/[slug]` | Articles authored by Phil. |
| `/statistics` | Government contracting by the numbers; supports digital PR. |
| `/tools/opportunity-cost-calculator` | Interactive calculator; CRO tool and lead magnet. |

### Legal

| Route | Purpose |
| --- | --- |
| `/privacy` | Privacy policy. |
| `/terms` | Terms. |

### System routes

| Route | Purpose |
| --- | --- |
| `/sitemap.xml` | Generated XML sitemap (`src/app/sitemap.ts`). |
| `/robots.txt` | Generated robots directives (`src/app/robots.ts`). |
| 404 | Friendly not-found page in Phil's voice (`src/app/not-found.tsx`). |

## Route counts at a glance

| Group | Count |
| --- | --- |
| Static cornerstone, conversion, resources, legal | 21 |
| Platforms (hub already counted; spokes) | 18 |
| Industries (spokes) | 12 |
| Provinces and territories | 13 |
| States | 50 |
| Blog and resource detail pages | data-driven (`blog.ts`, `resources.ts`) |

Every route above is reachable from the home page within three clicks through the hubs, the cross-cluster links, and the sitewide footer, and every route is included in the generated XML sitemap.

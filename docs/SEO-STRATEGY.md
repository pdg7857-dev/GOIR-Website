# SEO Strategy

The site's organic strategy is built on four keyword clusters, each mapped to a distinct part of the URL structure. The goal is to own the long tail of every way a contractor or buyer might describe a government procurement platform, an industry, a jurisdiction, or the act of finding bids, and to funnel all of that traffic toward the three conversion goals (book a discovery call, request a sample opportunity, join the email list).

## The four keyword clusters

### Cluster 1: Bid monitoring, alerts, leads, and intelligence

This is the category-defining cluster. It targets the core service intent: people searching for help finding government work rather than a specific platform or trade.

- **Representative queries:** government bid monitoring, government bid alerts, government contract leads, bid opportunity intelligence, government tender alerts, RFP monitoring service, procurement opportunity discovery, government bid finder.
- **Primary landing routes:** `/` (home), `/how-it-works`, `/government-opportunity-intelligence` (the category page), `/pricing`, `/sample-opportunity`.
- **Intent:** mid-to-high commercial intent. These visitors are evaluating whether to outsource the watching. They go straight to the conversion narrative.

### Cluster 2: Platform keywords

The deepest and most defensible cluster. Each procurement platform has its own demand, its own quirks, and very little authoritative content written from an operator's point of view.

- **Platforms covered:** MERX, BidNet Direct, CanadaBuys, SAM.gov, Bonfire, Biddingo, bids&tenders, Jaggaer, SAP Ariba, Coupa, PlanetBids, OpenGov (ProcureNow), DemandStar, Ion Wave, GovWin IQ, Periscope S2G, GSA eBuy, USASpending.
- **Representative queries:** "merx expert", "sam.gov bid alerts", "how to find bids on bonfire", "canadabuys monitoring", "planetbids vendor registration", "gsa ebuy opportunities", "govwin alternative".
- **Primary landing routes:** `/platforms` (hub) and `/platforms/[slug]` for all 18 platforms. Slugs and keyword targets live in `src/lib/site/platforms.ts`.
- **Intent:** informational shading into commercial. A contractor researching "how MERX really works" is a strong prospect; the page answers the question and then offers to do the watching for them.

### Cluster 3: Industries

Targets the trade-specific way contractors describe themselves and the work they bid.

- **Industries covered:** construction, janitorial, facilities maintenance, HVAC, electrical, plumbing, landscaping, security, engineering, environmental services, industrial supplies, MRO supplies.
- **Representative queries:** "janitorial government contracts", "government construction bids", "hvac government contracts", "snow removal government contracts", "mro supplier government".
- **Primary landing routes:** `/industries` (hub) and `/industries/[slug]`. Keyword targets live in `src/lib/site/industries.ts`.
- **Intent:** commercial. These visitors self-identify by trade and want work in that trade.

### Cluster 4: Geography

Canadian provinces and territories, plus all 50 US states. Captures location-qualified demand.

- **Representative queries:** "ontario government contracts", "california public bids", "texas state procurement", "alberta tenders", "government contracts new york".
- **Primary landing routes:** `/coverage` (hub), `/coverage/canada`, `/coverage/usa`, `/coverage/canada/[province]` (13 jurisdictions), `/coverage/usa/[state]` (50 states). Data lives in `src/lib/site/locations.ts`, including the state and provincial procurement systems each page references.
- **Intent:** commercial, location-qualified. Each geo page cross-links to the platforms used in that jurisdiction (Cluster 2) and can be filtered by trade (Cluster 3).

## Cluster-to-URL map

| Cluster | Hub route | Spoke routes | Target priority in sitemap |
| --- | --- | --- | --- |
| 1 Intelligence | `/government-opportunity-intelligence`, `/how-it-works` | `/pricing`, `/sample-opportunity`, `/book` | 0.9 to 1.0 |
| 2 Platforms | `/platforms` | `/platforms/[slug]` (18) | 0.8 |
| 3 Industries | `/industries` | `/industries/[slug]` (12) | 0.8 |
| 4 Geography | `/coverage` | `/coverage/canada/[province]` (13), `/coverage/usa/[state]` (50) | 0.6 |

## On-page SEO

- **One primary intent per page.** Platform pages answer "how does this platform work and how do I not miss its bids". Industry pages answer "how do I find government work in this trade". Geo pages answer "what does government procurement look like here".
- **H1 mirrors the head term** in the operator's voice (for example, "MERX Expert" style H1s from the `shortName` field), and the first paragraph restates the primary keyword naturally and states the promise.
- **Subheads target the related long tail** (registration, notifications, document gotchas, codes, missed-because reasons). The `missedBecause`, `workTypes`, `codes`, and `buyers` arrays in the data files supply genuinely useful, unique subsection content per page.
- **Every page ends with a conversion band** (book a call or request a sample), so ranking pages convert rather than just inform.

## Title and meta patterns

Titles use the root layout template `%s | Phil, Government Opportunity Intelligence`. Page-level patterns:

| Page type | Title pattern | Meta description pattern |
| --- | --- | --- |
| Platform | `{Platform} Expert and Monitoring` | "I monitor {Platform}, read the documents and qualify the fit so you never miss a winnable bid. Here is how {Platform} really works." |
| Industry | `{Industry} Government Contracts` | "Government {industry} bids across Canada and the U.S., found, read and qualified for fit. Stop searching portals and start bidding." |
| Province/State | `{Jurisdiction} Government Contracts and Bids` | "How public procurement works in {Jurisdiction}, the systems buyers post on, and how I make sure you see every fit." |
| Intelligence | benefit-led, category-owning | restate the promise and the difference from bid alerts. |

Keep titles under roughly 60 characters before the brand suffix and descriptions near 150 to 160 characters. Each page sets its own keywords array via the `pageMeta` helper in `src/lib/site/seo.tsx`.

## Schema usage

The site already emits structured data through `src/lib/site/seo.tsx`:

- **Organization** on every page (root layout), establishing the brand entity.
- **Service** on the intelligence and pricing pages, describing the monitoring/review/qualification service.
- **FAQPage** wherever an FAQ block appears (`/faq` and inline FAQs sourced from `src/lib/site/faqs.ts`).
- **BreadcrumbList** on every deep page, reinforcing the hub-and-spoke hierarchy to crawlers.

Maintain a single JSON-LD block per type per page. As award data and original research are published, layer Article schema onto `/blog/[slug]` posts with a named author (Phil) to support E-E-A-T.

## Site speed

The site is fully static (SSG), which is the largest single lever for Core Web Vitals. Hold the line: ship server components by default, avoid client-side JavaScript except where interaction demands it (the opportunity cost calculator at `/tools/opportunity-cost-calculator` is the obvious exception), keep images sized and lazy-loaded, and avoid third-party scripts that block rendering. Fast static pages compound the ranking advantage of the deep platform content.

## Search-intent mapping

| Intent stage | Example query | Route | Next action offered |
| --- | --- | --- | --- |
| Unaware / informational | "how does sam.gov work" | `/platforms/sam-gov` | request a sample opportunity |
| Problem-aware | "why do i keep missing government bids" | `/government-opportunity-intelligence`, blog | join the list, book a call |
| Solution-aware | "government bid monitoring service" | `/how-it-works`, `/pricing` | book a discovery call |
| Trade-qualified | "janitorial government contracts" | `/industries/janitorial` | request a sample, book a call |
| Geo-qualified | "ontario government tenders" | `/coverage/canada/ontario` | book a call |
| Comparison | "govwin alternative" | `/platforms/govwin` | book a call |

Every cluster ultimately routes to `/book`. Informational and trade pages also offer the lower-friction `/sample-opportunity` and the email-list lead magnets at `/resources` so visitors who are not ready to book still enter the funnel.

# Documentation Index: Government Opportunity Intelligence

This folder holds the strategy and reference documentation for the marketing website of **Phil, Government Opportunity Intelligence**. The site is the personal authority brand of Phil, who provides Government Opportunity Intelligence: monitoring, discovery, bid-document review, and fit qualification of government contract opportunities across Canada and the United States.

## Site overview

Contractors lose winnable government work for one reason above all others: nobody is watching. Opportunities are scattered across national aggregators, official government systems, and a different SaaS portal for nearly every agency. Phil watches all of them, reads the documents, and qualifies the fit, so a contractor can stop hunting through portals and start bidding the work that is actually worth winning. The site exists to rank organically for the searches contractors and procurement-aware buyers make, to generate inbound leads, and to convert those leads into recurring monthly clients.

## Brand positioning

The brand creates and owns a category: **Government Opportunity Intelligence**. This is positioned one level above commodity "bid alert" tools and bid-listing databases. The difference the site sells is judgment: not a fire-hose of notifications, but monitoring plus document review plus fit qualification delivered by a named human operator (Phil) with first-person voice throughout. The promise running through the whole site is: "You focus on winning contracts. I focus on finding them."

The audience is contractors in construction, janitorial, facilities maintenance, HVAC, electrical, plumbing, landscaping, security, engineering, environmental, industrial supplies, and MRO.

## The three conversion goals

| Priority | Goal | Route |
| --- | --- | --- |
| 1 (primary) | Book a discovery call | `/book` |
| 2 (secondary) | Request a sample opportunity | `/sample-opportunity` |
| 3 (tertiary) | Join the email list via a lead magnet | `/resources` |

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (utility classes plus a small set of component classes such as `.btn-primary`, `.btn-ghost`, `.container`, `.card`, `.prose-site` in `globals.css`)
- **Rendering:** fully static / SSG. Every route is statically generated, including the programmatic platform, industry, and geography pages.
- **Data model:** the site reads from typed data files in `src/lib/site/` (`config.ts`, `platforms.ts`, `industries.ts`, `locations.ts`, `faqs.ts`, `pricing.ts`, plus `blog.ts` and `resources.ts`). This is the single source of truth for navigation, cross-linking, and SEO metadata.
- **Structured data:** the site emits Organization, Service, FAQPage, and BreadcrumbList JSON-LD (see `src/lib/site/seo.tsx`).
- **SEO infrastructure:** `src/app/sitemap.ts`, `src/app/robots.ts`, and a friendly `src/app/not-found.tsx`.

## How to run it

```bash
npm install      # install dependencies
npm run dev      # local development server
npm run build    # production build (static export of all routes)
```

## The documents

| File | What it covers |
| --- | --- |
| `SEO-STRATEGY.md` | The four keyword clusters mapped to the URL structure, on-page patterns, schema, and intent mapping. |
| `INTERNAL-LINKING.md` | The hub-and-spoke linking model and anchor-text guidance. |
| `CRO-STRATEGY.md` | Conversion paths to the three goals, offers, trust, forms, and CTA placement. |
| `LEAD-MAGNET-STRATEGY.md` | The seven lead magnets, the funnel stage each serves, and how each feeds the list and the call. |
| `PROGRAMMATIC-SEO.md` | How the data-driven templates scale and the guardrails against thin pages. |
| `CONTENT-MOAT.md` | The defensible content strategy and category creation. |
| `AUTHORITY-BUILDING.md` | E-E-A-T for a named personal brand. |
| `BACKLINK-STRATEGY.md` | Realistic link-building for a procurement-services brand. |
| `SITEMAP.md` | Human-readable information architecture: every route and its purpose. |

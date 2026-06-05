# Lead Magnet Strategy

Lead magnets serve the third conversion goal (email-list growth) and feed the first (the discovery call). They live under `/resources` and are generated from `src/lib/site/resources.ts`, each at `/resources/[slug]`. Every magnet exists to capture an email from a visitor who is not yet ready to book, then nurture them toward the call. None is an end in itself.

## The seven lead magnets

| # | Lead magnet | Format | Audience | Funnel stage |
| --- | --- | --- | --- | --- |
| 1 | Government Bid Cost Calculator | Interactive tool / download | All contractors | Awareness to consideration |
| 2 | Bid Qualification Checklist | Checklist (PDF) | Contractors already bidding | Consideration |
| 3 | Government Opportunity Report | Sample report | Skeptics / comparison | Consideration to decision |
| 4 | MERX Guide | Guide (PDF) | Canada-focused contractors | Awareness to consideration |
| 5 | BidNet Direct Guide | Guide (PDF) | US and Canada regional bidders | Awareness to consideration |
| 6 | Government Opportunity Intelligence Report | Flagship report | Solution-aware decision-makers | Decision |
| 7 | Contractor Opportunity Scorecard | Self-assessment | All contractors | Awareness (diagnostic) |

## How each one works

### 1. Government Bid Cost Calculator

The same engine as `/tools/opportunity-cost-calculator`, packaged as a takeaway. **Audience:** every contractor, broadest top-of-funnel appeal. **Stage:** awareness to consideration. It quantifies the cost of missed bids and wasted search time in the visitor's own numbers. **Feeds the list and call:** email-gate the saved or emailed results; the follow-up sequence says "you calculated what missing work costs, here is how I stop it" and routes to `/book`. Promote it on `/pricing` and the intelligence page where cost is top of mind.

### 2. Bid Qualification Checklist

A checklist of what to verify in a solicitation before committing to bid (scope, codes, mandatory site meetings, wage-rate clauses, addenda, closing logistics, the document gotchas the industry pages reference in their `missedBecause` fields). **Audience:** contractors already bidding but losing time on bad-fit opportunities. **Stage:** consideration. **Feeds the list and call:** it demonstrates the qualification discipline that is the heart of the service; the natural next thought is "or I could have Phil do this", routing to `/sample-opportunity` and `/book`.

### 3. Government Opportunity Report

A de-identified example of the actual deliverable: a real opportunity, read and qualified, with fit notes. **Audience:** skeptics and comparison-stage visitors who want proof. **Stage:** consideration to decision. This is the downloadable cousin of the `/sample-opportunity` offer. **Feeds the list and call:** it is proof of product; the email captured is high-intent, and the follow-up offers a sample tailored to the visitor's own trade, then the call.

### 4. MERX Guide

A practical guide to Canada's best-known aggregator: how it categorizes, how notifications work, where bids slip past. **Audience:** Canada-focused contractors, especially construction, janitorial, facilities, HVAC, and electrical (the industries `platforms.ts` ties to MERX). **Stage:** awareness to consideration. **Feeds the list and call:** pairs with `/platforms/merx`; the guide download is the conversion on that high-traffic platform page, and the sequence positions monitoring as the upgrade from doing it yourself.

### 5. BidNet Direct Guide

The same treatment for the BidNet Direct regional purchasing-group network spanning the US and Canada. **Audience:** regional bidders, including janitorial, landscaping, and security firms. **Stage:** awareness to consideration. **Feeds the list and call:** pairs with `/platforms/bidnet-direct`; captures cross-border regional contractors and nurtures toward a sample and a call.

### 6. Government Opportunity Intelligence Report

The flagship, category-defining asset. A substantive report framing the difference between raw bid data and qualified intelligence, with original observations from real procurement activity. **Audience:** solution-aware decision-makers comparing approaches. **Stage:** decision. **Feeds the list and call:** it is the strongest authority piece, owning the category name; readers who download it are evaluating seriously, so the follow-up goes directly to `/book`. It also doubles as a digital-PR and backlink asset (see the backlink strategy).

### 7. Contractor Opportunity Scorecard

A short self-assessment that scores how well a contractor currently finds and qualifies government work (platforms watched, time spent, win rate on bids pursued, bad-fit bids chased). **Audience:** all contractors; works as a diagnostic top-of-funnel hook. **Stage:** awareness. **Feeds the list and call:** a low score creates felt need; the result page recommends the relevant next step (a platform guide, the calculator, or a discovery call) based on the answers, segmenting the lead for the email sequence.

## Mapping magnets to funnel stage

```
Awareness        Consideration            Decision
---------        -------------            --------
Scorecard (7)    Qualification Check (2)  Opportunity Intelligence Report (6)
Cost Calc (1)    Opportunity Report (3)
MERX Guide (4)   Cost Calc (1)
BidNet Guide (5)
```

## How magnets feed the list and the call

1. **Capture.** Each magnet is email-gated. The form is minimal (email, trade, region) so it can segment the subscriber.
2. **Segment.** Trade and region tag the subscriber, so platform guides, industry pages, and geo pages can be referenced in nurture emails that are actually relevant.
3. **Nurture.** A short sequence per magnet delivers the asset, reinforces the intelligence-versus-data category, shares a relevant blog post or money page, and presents the next step.
4. **Convert.** Every sequence escalates toward the two real offers: request a sample opportunity (`/sample-opportunity`), then book a discovery call (`/book`). Decision-stage magnets (3 and 6) point at the call sooner; awareness magnets (1, 4, 5, 7) warm the relationship first.

## Placement

- The `/resources` hub lists all seven and is linked from the primary nav and footer.
- Each guide (4, 5) is the conversion offer on its matching platform page.
- The calculator (1) lives at `/tools/opportunity-cost-calculator` and is linked from pricing.
- The report assets (3, 6) appear on the intelligence and how-it-works pages as proof.
- The scorecard (7) is a strong home-page and blog CTA because it is a fast, curiosity-driven entry point.

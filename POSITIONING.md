# Positioning and Claims: Legally Safer Rewrite

This document is the source of truth for how the Phil Dave site should describe
the service, the background, and the proof. It exists because some current
claims carry avoidable risk (borrowed reviews, results the service does not
control, and references that could touch a prior employer). Apply this copy when
the site code lands in this repo.

## Style rules (apply to all copy below)

- First-person Phil Dave voice.
- No em dashes, no en dashes, no ellipsis. Use hyphens, commas, periods, colons.
- Never fabricate statistics. Use only numbers that can be substantiated.
- Natural human variation, grammatically correct.

## The core principle

Claim only what I did and what I deliver, never what the client achieved. The
risky claims are the ones that imply results I do not control, or that borrow
proof I do not own. Every rule below follows from this.

---

## 1. Credentials section (highest-priority fix)

REMOVE the "4.8/5 from 44 client reviews" claim. Those reviews came from prior
employment doing a different service. Presenting them as reviews of this service
is the clearest misrepresentation risk.

REPLACE with an honest, attributable background block:

> I did not come to this from the outside. For three years I worked inside the
> eprocurement industry, handling more than 17,500 contractor accounts across a
> portfolio of major procurement platforms in Canada and the US. My job was
> keeping contractors getting real value from those platforms, which means I saw
> exactly where they lose bids: not at the proposal, at the search. Now I do that
> part for you, from your side of the table.

Stat strip (replaces "20,000+ accounts managed" and the review stars):

> - 17,500+ contractor accounts handled across Canada and the US
> - A portfolio of major procurement platforms, learned from the inside
> - 18+ platforms monitored for clients today

What changed and why:
- 17,500, not 20,000: defensible number (15,000 Canada in 2025 plus 2,500 US in
  2023-2024).
- "Handled," not "managed": broad, neutral, easy to defend.
- No retention rate and no win rate: only responsibility, not unprovable results.
- No employer name and no client names: anonymized until a lawyer clears naming.
- A clear line between past experience and the current service.

---

## 2. Remove "help you win" causal claims

Anywhere the site implies the service helps clients win or keep winning
contracts, soften to the actual deliverable. The service finds and qualifies.
The win belongs to the client.

- Before: "so they could see the bids and keep winning"
- After: "so they stopped missing the bids they should have been seeing"

The headline "You focus on winning contracts. I focus on finding them." is fine
as written. It puts winning on the client and finding on me. Keep it.

---

## 3. Tighten the guarantee to cover the deliverable, not the outcome

The "3 qualified opportunities in 90 days or it extends free" guarantee is safe
because it promises my output, not their awards. Add a definition so it cannot be
read as promising wins:

> Qualified opportunity: an open solicitation I have matched to the trades,
> capacity, and coverage area you give me, summarized in plain language with a
> source link. The guarantee covers delivery of qualified opportunities, not
> contract awards, which depend on your bid. It assumes an active subscription
> and an accurate profile from you.

---

## 4. Anonymize background, avoid disparagement of named platforms

Describing platforms factually is fine. Two guardrails:

- In the background claim, keep it generic ("a portfolio of major procurement
  platforms"), not the former employer by name, until a lawyer clears naming.
- In the differentiator copy, describe the gap neutrally ("platforms show
  everything and tell you nothing") rather than knocking a named product.
  Criticizing the category is fine. Singling out a named former employer's
  product as deficient is where disparagement risk lives.

The specific detail (12 platforms, 9 Canadian and 3 US) is more identifying than
anonymous. Reserve it for one-on-one sales conversations, not public pages.

---

## 5. Frame the calculator as an estimate

The Opportunity Waste Calculator shows dollar figures. Add one line so it reads
as illustrative, not a promise:

> This is an estimate based on the numbers you enter. Your actual time and cost
> will vary.

---

## 6. Handle the testimonial gap honestly

There are currently zero first-party reviews for this service. Until real ones
are collected from actual clients, with their permission, do not display
testimonials. Let the background credential carry the trust. Add genuine client
results later, with a name or company and permission on file.

---

## 7. Footer disclaimer

> Phil Dave provides opportunity monitoring and qualification. I do not write or
> submit proposals, and I do not guarantee contract awards. Background figures
> reflect prior industry experience.

---

## 8. Remove all pricing from the site

Per the client, remove all public pricing. This fits the sales model: pricing is
revealed at the end of an in-person meeting, not on the website. The conversion
flow becomes GOIR (primary), then the Opportunity Waste Calculator (secondary),
then book a discovery call, which is now also where pricing is discussed.

Scope, touch all of these:

- Remove the pricing tables from the home page (drop the Pricing section from the
  home order) and anywhere else they render.
- Repurpose the `/pricing` route (recommended) to a short "how pricing works"
  page with no dollar figures that routes to book a call for a custom quote. If
  instead the route is deleted, add a redirect so `/pricing` does not 404.
- Stop rendering anything from `src/lib/site/pricing.ts` (CANADA_PLANS,
  USA_PLANS, tier dollar amounts, "from $599/mo", commitment terms). Do not
  display any prices.
- Remove all dollar figures and tier names site-wide (Essential, Growth, Canada,
  USA, North America, the $599 to $3,999 range, and the 3-month or 12-month
  commitment language tied to price).
- Update the cost and waste calculator copy so it no longer compares to a stated
  subscription price (drop lines like "that price is a fraction of what searching
  costs you"). Keep it framed as the cost of doing nothing, then route to a call.
- Remove or rework pricing-specific FAQ entries and footnotes (Atlantic Canada
  counts as one province, US federal and military is National plan only), since
  those describe tiers that are no longer shown.
- Remove "Pricing" from the header nav and footer nav.
- Remove any pricing, Offer, or PriceSpecification JSON-LD.
- Update the sitemap and any internal links or CTAs that point to `/pricing`,
  replacing pricing CTAs with the booking or discovery-call CTA.

Decision needed from client: fully delete the `/pricing` page (with a redirect),
or repurpose it to a no-numbers "pricing is custom, book a call" page.
Recommended: repurpose, to preserve SEO and give the CTA a destination.

---

## Locked number set (use everywhere, keep consistent)

- 17,500+ contractor accounts handled (15,000 Canada in 2025 plus 2,500 US in
  2023-2024). Retire "20,000+".
- 3 years in the eprocurement industry.
- A portfolio of major procurement platforms (the specific 12, and the 9-3
  split, are reserved for live sales conversations only).
- 18+ platforms monitored today (current service, kept distinct from the past
  experience number).
- 13 provinces and territories, 50 states (coverage).

Frame the two platform numbers as a progression, not a contradiction: "I came up
inside the platforms themselves. Today I monitor 18+ on your behalf."

---

## What this does and does not cover

This lowers website risk: misrepresentation, borrowed proof, naming, and
disparagement. It is clearly safer, not formally cleared. I am not a lawyer.

The larger exposure is conduct, not copy. The non-solicit, non-compete, and
confidentiality terms in the prior employment agreement govern who can be
contacted (especially former accounts) and whether the former employer can be
named. A short review of that agreement is the real protection.

---

## Appendix: questions to take to a lawyer

Bring the prior employment agreement and ask:

1. Does the agreement contain a non-solicit clause? If so, who does it cover
   (former clients, former accounts I personally handled, all of the employer's
   clients), and for how long after leaving?
2. Does it contain a non-compete? What activities and what geography does it
   restrict, and for how long? Is operating an independent opportunity
   intelligence service a breach?
3. What confidentiality obligations survive employment? Do they cover account
   figures, client lists, or platform knowledge I want to reference?
4. Can I name the former employer or its platforms in marketing, or should I keep
   all references generic?
5. Can I contact contractors who were accounts I handled, or must I limit
   outreach to businesses with no prior relationship through that employment?
6. Is there a non-disparagement clause that affects how I can describe the
   platforms or the industry?

Outcome to get from the review: a clear yes or no on (a) who I can call, (b)
whether I can name the employer, and (c) whether the independent service itself
is restricted during any non-compete period.

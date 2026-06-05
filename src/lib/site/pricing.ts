/**
 * Public coverage pricing. Positioned as Opportunity Intelligence Coverage,
 * never per-province, per-state, per-opportunity, or hourly. The two entry
 * tiers (Essential, Growth) are public; national and cross-border coverage is
 * scoped to the client's footprint and priced by quote (anchored "from $1,499").
 */

export type Plan = {
  name: string;
  price: string;
  priceNote?: string;
  scope: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  startingAt?: boolean;
  /** Custom-priced tier (Enterprise): no fixed price or commitment line. */
  custom?: boolean;
};

/** Headline promise shown above the plans. */
export const GUARANTEE = {
  title: "Qualified Opportunity Guarantee",
  body:
    "If I don't identify at least 3 opportunities that match your approved targeting criteria within the first 90 days, I'll extend your subscription at no cost until the guarantee is fulfilled.",
  // Definition that keeps the guarantee tied to my deliverable, not the client's
  // award. Rendered alongside the guarantee wherever it appears. See POSITIONING.md.
  definition:
    "Qualified opportunity: an open solicitation I have matched to the trades, capacity, and coverage area you give me, summarized in plain language with a source link. The guarantee covers delivery of qualified opportunities, not contract awards, which depend on your bid. It assumes an active subscription and an accurate profile from you.",
};

export const INCLUDED_EVERYWHERE: string[] = [
  "Continuous monitoring across every relevant platform",
  "Opportunity discovery, including bids your alerts never surface",
  "Bid document review (scope, requirements, evaluation criteria)",
  "Fit qualification against your trades, capacity and footprint",
  "Plain-language opportunity summaries",
  "Direct links to the source bid on the issuing platform",
];

export const PLANS: Plan[] = [
  {
    name: "Essential",
    price: "$599",
    priceNote: "/month",
    scope: "Up to 1 province / state",
    blurb: "Best for companies doing occasional government work.",
    features: [
      "Opportunity monitoring",
      "Opportunity qualification",
      "Weekly delivery",
      "Up to 1 province/state (Atlantic Canada counts as 1)",
    ],
  },
  {
    name: "Growth",
    price: "$999",
    priceNote: "/month",
    scope: "Up to 3 provinces / states",
    blurb: "Best for companies actively pursuing government contracts.",
    featured: true,
    features: [
      "Everything in Essential",
      "Up to 3 provinces/states",
      "Daily delivery",
      "Priority opportunity matching",
    ],
  },
  {
    name: "National & cross-border",
    price: "$1,499",
    priceNote: "/month",
    startingAt: true,
    custom: true,
    scope: "All of Canada, the U.S., or both",
    blurb: "Coast-to-coast or cross-border coverage, including federal. Priced to your footprint.",
    features: [
      "Everything in Growth",
      "Nationwide coverage: all 13 provinces and territories, all 50 states, or both",
      "Federal on both sides of the border (CanadaBuys, MERX, SAM.gov, GSA eBuy)",
      "Unlimited opportunities, cross-border de-duplication, one point of contact",
      "Custom performance dashboard and bid pipeline reviews",
      "Specialized federal, military and municipal programs scoped to you",
    ],
  },
];

export const PRICING_PRINCIPLES = [
  "Priced as coverage, not per opportunity. Review as many as it takes.",
  "A 12-month commitment, it takes a full year to catch your complete opportunity cycle, including annual renewals and seasonal bids that only come around once.",
  "Backed by the Qualified Opportunity Guarantee, so the first 90 days are on me to prove out.",
];

/**
 * Public coverage pricing. Positioned as Opportunity Intelligence Coverage,
 * never per-province, per-state, per-opportunity, or hourly. One unified ladder
 * (Essential → Growth → Partner → Enterprise) covering Canada and the U.S.
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
    name: "Canada",
    price: "$1,499",
    priceNote: "/month",
    scope: "All of Canada",
    blurb: "Coast-to-coast Canadian coverage, including federal.",
    features: [
      "Everything in Growth",
      "All 13 provinces & territories",
      "Federal procurement (CanadaBuys & MERX)",
      "Unlimited opportunities",
      "Custom performance dashboard",
      "Bid pipeline reviews",
    ],
  },
  {
    name: "USA",
    price: "$2,999",
    priceNote: "/month",
    scope: "All of the United States",
    blurb: "Nationwide U.S. coverage, including federal.",
    features: [
      "Everything in Growth",
      "All 50 states",
      "Federal procurement (SAM.gov, GSA eBuy & more)",
      "Unlimited opportunities",
      "Custom performance dashboard",
      "Bid pipeline reviews",
    ],
  },
  {
    name: "North America",
    price: "$3,999",
    priceNote: "/month",
    scope: "Canada + United States",
    blurb: "Full cross-border coverage in one consolidated feed.",
    features: [
      "Everything in Canada & USA",
      "Every province, territory and state",
      "Federal on both sides of the border",
      "Cross-border de-duplication",
      "One point of contact for all of North America",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    custom: true,
    scope: "Federal, military & municipal programs",
    blurb: "For organizations with the largest and most specialized public-sector footprints.",
    features: [
      "Federal",
      "Military",
      "Municipal",
      "Custom dashboards",
    ],
  },
];

export const PRICING_PRINCIPLES = [
  "Priced as coverage, not per opportunity. Review as many as it takes.",
  "A 12-month commitment, it takes a full year to catch your complete opportunity cycle, including annual renewals and seasonal bids that only come around once.",
  "Backed by the Qualified Opportunity Guarantee, so the first 90 days are on me to prove out.",
];

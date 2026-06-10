/**
 * Coverage model and guarantee. Pricing is not published on the site. It is
 * structured as coverage scoped to the client's footprint and discussed on a
 * discovery call. Keep dollar figures, tier names, and commitment terms off
 * public pages. See POSITIONING.md.
 */

/** Headline promise shown wherever coverage is described. */
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

/**
 * How coverage is structured, described without prices. Pricing itself is
 * scoped to the client's footprint and discussed on a discovery call.
 */
export const COVERAGE_PRINCIPLES = [
  "One payment for a full year of coverage, not a monthly plan. You are covered for the whole opportunity cycle.",
  "Structured as coverage, not per opportunity. I review as many as it takes.",
  "Scoped to your footprint: a single province or state, several, or nationwide and cross-border, including federal.",
  "Backed by the Qualified Opportunity Guarantee, so the first 90 days are on me to prove out.",
];

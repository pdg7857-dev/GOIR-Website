/**
 * CITATIONS REGISTRY
 * ------------------
 * Single source of truth for every statistic used anywhere on the site.
 *
 * HARD RULE: I never invent numbers, source names, years, or URLs. A stat is
 * only shown as "verified" once an operator has confirmed it against the
 * underlying research report and filled in `source`, `year` and `url`.
 *
 * Each claim below carries a confirmed source, publisher, year and URL, and is
 * marked `verified: true`. The UI renders a "[src]" link next to every figure
 * so readers can check it. If a future claim is added without a confirmed
 * source, leave `verified: false` and the UI falls back to a visible
 * "source pending verification" state so nothing reads as a hard, fabricated fact.
 *
 * To verify a stat: set source/year/url and flip `verified` to true.
 */

export type Citation = {
  /** Stable key referenced from content via <Stat id="..."/> and <Cite/>. */
  id: string;
  /** The statistic written as a short, self-contained claim. */
  claim: string;
  /** The headline figure, e.g. "166", "33 to 36 hours", "77%". */
  value: string;
  /** Plain-language unit/subject for inline use, e.g. "RFPs per year". */
  unit?: string;
  /** Confirmed source name. Null until verified. */
  source: string | null;
  /** Publisher/organization behind the source, if different. */
  publisher?: string | null;
  /** Publication year. Null until verified. */
  year: number | null;
  /** Reference link. Null until verified. */
  url: string | null;
  /** True only when an operator has confirmed source/year/url. */
  verified: boolean;
  /** Optional context for editors and for on-page framing. */
  note?: string;
};

export const CITATIONS: Record<string, Citation> = {
  "estimator-hiring": {
    id: "estimator-hiring",
    claim: "78% of construction firms say estimating roles are hard to fill, among the toughest salaried positions to staff.",
    value: "78%",
    unit: "of firms find estimators hard to fill",
    source: "2024 Workforce Survey",
    publisher: "Associated General Contractors of America (AGC)",
    year: 2024,
    url: "https://www.agc.org/sites/default/files/Files/Communications/2024_Workforce_Survey_Analysis.pdf",
    verified: true,
  },
  "labor-shortage": {
    id: "labor-shortage",
    claim: "94% of construction firms report having a hard time filling open positions.",
    value: "94%",
    unit: "of firms struggle to fill open roles",
    source: "2024 Workforce Survey",
    publisher: "Associated General Contractors of America (AGC)",
    year: 2024,
    url: "https://www.agc.org/sites/default/files/Files/Communications/2024_Workforce_Survey_Analysis.pdf",
    verified: true,
  },
  "single-bid-frequency": {
    id: "single-bid-frequency",
    claim: "Single-bid awards are common enough to be tracked as a market-health metric: the EU rates any market where more than 20% of contracts draw a single bid as underperforming.",
    value: ">20%",
    unit: "single-bid share the EU flags as underperforming",
    source: "Single Market Scoreboard, Public procurement",
    publisher: "European Commission",
    year: 2024,
    url: "https://single-market-scoreboard.ec.europa.eu/business-framework-conditions/public-procurement_en",
    verified: true,
  },
};

export function getCitation(id: string): Citation | undefined {
  return CITATIONS[id];
}

export const ALL_CITATIONS = Object.values(CITATIONS);

/** Citations with confirmed source/year/url. */
export const VERIFIED_CITATIONS = ALL_CITATIONS.filter((c) => c.verified);

/** How many stats still need an operator to attach a source. */
export const PENDING_CITATION_COUNT = ALL_CITATIONS.filter((c) => !c.verified).length;

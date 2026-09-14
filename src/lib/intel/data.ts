/**
 * Data for the intelligence-console rebuild. Kept free of client/server
 * directives so the accessible fallbacks (tables, lists) can render on the
 * server while the canvas widgets consume the same source on the client.
 *
 * House rule: no hyphens or dashes in visible copy.
 */

export type Jurisdiction = {
  id: string;
  name: string;
  kind: "Federal" | "Province" | "State";
  coord: [number, number];
  platforms: string[];
  buyers: number;
  note: string;
};

/** The 20 monitored jurisdictions, mirroring coverage-map.js exactly. */
export const JURISDICTIONS: Jurisdiction[] = [
  { id: "ca-fed", name: "Canada, Federal", kind: "Federal", coord: [-75.70, 45.41], platforms: ["CanadaBuys", "MERX", "Bonfire"], buyers: 190, note: "Federal departments, agencies and Crown corporations." },
  { id: "on", name: "Ontario", kind: "Province", coord: [-79.38, 43.65], platforms: ["MERX", "Biddingo", "bids&tenders", "Ontario Tenders Portal"], buyers: 640, note: "Densest MASH market on the continent: school boards, hospitals, 444 municipalities." },
  { id: "qc", name: "Quebec", kind: "Province", coord: [-71.21, 46.81], platforms: ["SEAO", "MERX", "Bonfire"], buyers: 410, note: "SEAO is mandatory for public bodies, French language documents throughout." },
  { id: "bc", name: "British Columbia", kind: "Province", coord: [-123.37, 48.43], platforms: ["BC Bid", "MERX", "Bonfire"], buyers: 280, note: "BC Bid plus a long tail of regional districts posting on their own portals." },
  { id: "ab", name: "Alberta", kind: "Province", coord: [-113.49, 53.55], platforms: ["Alberta Purchasing Connection", "bids&tenders", "MERX"], buyers: 250, note: "APC carries provincial and municipal work, heavy civil and facilities volume." },
  { id: "mb", name: "Manitoba", kind: "Province", coord: [-97.14, 49.90], platforms: ["MERX", "Bonfire"], buyers: 95, note: "Provincial tenders plus City of Winnipeg on its own system." },
  { id: "sk", name: "Saskatchewan", kind: "Province", coord: [-106.65, 52.13], platforms: ["SaskTenders", "MERX"], buyers: 88, note: "SaskTenders aggregates provincial, health and education buyers." },
  { id: "ns", name: "Nova Scotia", kind: "Province", coord: [-63.57, 44.65], platforms: ["NS Tenders", "MERX"], buyers: 70, note: "Provincial procurement plus Halifax Regional Municipality." },
  { id: "nb", name: "New Brunswick", kind: "Province", coord: [-66.63, 45.96], platforms: ["NBON", "MERX"], buyers: 62, note: "NBON posts provincial, health and municipal opportunities." },
  { id: "us-fed", name: "United States, Federal", kind: "Federal", coord: [-77.04, 38.91], platforms: ["SAM.gov", "GSA eBuy", "DIBBS"], buyers: 220, note: "SAM.gov is the front door, set asides and IDIQ vehicles matter more than keywords." },
  { id: "ca-st", name: "California", kind: "State", coord: [-121.49, 38.58], platforms: ["Cal eProcure", "BidNet Direct", "Bonfire"], buyers: 480, note: "State plus 58 counties and 480+ cities, most on their own systems." },
  { id: "tx", name: "Texas", kind: "State", coord: [-97.74, 30.27], platforms: ["ESBD", "BidNet Direct"], buyers: 390, note: "ESBD for state agencies, large independent school district volume." },
  { id: "ny", name: "New York", kind: "State", coord: [-73.76, 42.65], platforms: ["NYS Contract Reporter", "BidNet Direct"], buyers: 350, note: "Contract Reporter plus authorities that post nowhere else." },
  { id: "il", name: "Illinois", kind: "State", coord: [-89.65, 39.80], platforms: ["BidBuy", "BidNet Direct"], buyers: 240, note: "BidBuy for state, Chicago and Cook County run separate portals." },
  { id: "ga", name: "Georgia", kind: "State", coord: [-84.39, 33.75], platforms: ["Georgia Procurement Registry", "BidNet Direct"], buyers: 210, note: "GPR plus a heavy university system buyer base." },
  { id: "wa", name: "Washington", kind: "State", coord: [-122.90, 47.04], platforms: ["WEBS", "BidNet Direct"], buyers: 180, note: "WEBS registration drives notification, ports and transit buy separately." },
  { id: "co", name: "Colorado", kind: "State", coord: [-104.99, 39.74], platforms: ["Colorado BIDS", "Rocky Mountain e-Purchasing"], buyers: 165, note: "RMEPS carries most Front Range municipal work." },
  { id: "fl", name: "Florida", kind: "State", coord: [-84.28, 30.44], platforms: ["MyFloridaMarketPlace", "DemandStar"], buyers: 300, note: "State marketplace plus 67 counties on mixed systems." },
  { id: "ma", name: "Massachusetts", kind: "State", coord: [-71.06, 42.36], platforms: ["COMMBUYS", "BidNet Direct"], buyers: 190, note: "COMMBUYS covers state and many municipal buyers." },
  { id: "mi", name: "Michigan", kind: "State", coord: [-84.55, 42.73], platforms: ["SIGMA VSS", "BidNet Direct"], buyers: 175, note: "SIGMA for state, counties and districts post independently." },
];

/** Section chips: the accessible, no JS equivalent of clicking a craft on the globe. */
export const SECTION_CHIPS = [
  { code: "SIG-01", label: "Threat", target: "#service" },
  { code: "OPS-02", label: "Doctrine", target: "#process" },
  { code: "QAL-06", label: "Screening", target: "#screening" },
  { code: "CVG-03", label: "Coverage", target: "#coverage" },
  { code: "REC-04", label: "Operator", target: "#about" },
  { code: "REQ-05", label: "Request", target: "#contact" },
];

/** Intercept ticker samples: PLATFORM · TITLE · VERDICT. */
export const TICKER_INTERCEPTS = [
  { platform: "MERX", title: "Custodial services, 3 elementary schools", verdict: "Strong fit" },
  { platform: "BC Bid", title: "HVAC controls upgrade, 4 sites", verdict: "Conditional" },
  { platform: "Biddingo", title: "Roof replacement, municipal depot", verdict: "No bid" },
  { platform: "bids&tenders", title: "Grounds maintenance, 2 year term", verdict: "Strong fit" },
  { platform: "SEAO", title: "Snow removal, regional roads", verdict: "Worth a look" },
  { platform: "CanadaBuys", title: "Facility condition assessments", verdict: "Strong fit" },
];

/** Platform expertise cards. */
export const PLATFORM_CARDS = [
  { name: "MERX", qualifier: "Aggregator · CAN", body: "The best known Canadian aggregator, but its categories mislead and its notifications miss the work filed under the wrong heading." },
  { name: "CanadaBuys", qualifier: "Government · CAN", body: "The Government of Canada tender service. The front door for federal work, where the real detail lives in the attached documents, not the notice." },
  { name: "SAM.gov", qualifier: "Government · USA", body: "The United States federal front door. Set asides, NAICS codes and IDIQ vehicles decide who is eligible long before the keywords do." },
  { name: "BC Bid", qualifier: "Province · BC", body: "British Columbia provincial work, plus a long tail of regional districts and health authorities posting where a saved search never looks." },
  { name: "Biddingo", qualifier: "SaaS portal · CAN", body: "Heavy in Ontario MASH: municipalities, school boards and hospitals. Good work hides under generic titles and inside larger packages." },
  { name: "bids&tenders", qualifier: "SaaS portal · CAN/USA", body: "One SaaS portal per buyer, each with its own login and alert quirks. The volume is real, the categorization is not consistent." },
  { name: "SEAO", qualifier: "Province · QC", body: "Mandatory for Quebec public bodies, with French language documents throughout and rules a keyword alert was never built to read." },
  { name: "BidNet Direct", qualifier: "Purchasing groups · USA", body: "Regional purchasing groups across hundreds of state and local agencies. Registration and notification quirks quietly cost you bids." },
  { name: "Bonfire", qualifier: "SaaS portal · CAN/USA", body: "A submission portal as much as a discovery one. Buyers post here and nowhere else, so the only way to see it is to watch it." },
];

/**
 * Screening samples for the interactive fit engine. Values are illustrative
 * and labelled as such in the UI. Do not present as real solicitations.
 */
export type ScreeningSample = {
  title: string;
  buyer: string;
  platform: string;
  region: string;
  trade: "janitorial" | "hvac" | "roofing" | "grounds";
  value: string;
  bond: boolean;
  closes: number;
  note: string;
};

export const SCREENING_SAMPLES: ScreeningSample[] = [
  { title: "Custodial services, 3 elementary schools", buyer: "District School Board", platform: "MERX", region: "Ontario", trade: "janitorial", value: "$1.2M / 3 years", bond: false, closes: 18, note: "Recurring term work, incumbent leaving. Clean fit for a janitorial contractor." },
  { title: "HVAC controls upgrade, 4 sites", buyer: "Regional Health Authority", platform: "BC Bid", region: "British Columbia", trade: "hvac", value: "$780K", bond: true, closes: 11, note: "Bonded, tight timeline, mandatory site visit. Doable but move fast." },
  { title: "Roof replacement, municipal depot", buyer: "City Public Works", platform: "Biddingo", region: "Ontario", trade: "roofing", value: "$2.4M", bond: true, closes: 9, note: "Large, bonded, closes soon. Only worth it if roofing is in your profile." },
  { title: "Grounds maintenance, 2 year term", buyer: "Provincial Facilities", platform: "bids&tenders", region: "Ontario", trade: "grounds", value: "$640K / 2 years", bond: false, closes: 21, note: "Steady term work with a long runway to prepare a strong response." },
];

export const SCREENING_TRADES: { key: ScreeningSample["trade"]; label: string; on: boolean }[] = [
  { key: "janitorial", label: "Janitorial", on: true },
  { key: "hvac", label: "HVAC", on: true },
  { key: "roofing", label: "Roofing", on: false },
  { key: "grounds", label: "Grounds", on: true },
];

/**
 * Pricing tiers. Premium level, matching the design handoff and the pricing
 * decision to price at the designer's level. Annual only, no monthly plan.
 *
 * The guaranteed opportunity counts are PLACEHOLDERS. They are a contractual
 * promise and must be replaced with Phil's real per trade numbers before this
 * goes public. See README open item 1.
 */
export type Tier = {
  name: string;
  scope: string;
  price: string;
  /** When true, no figure is shown; the tier is quoted individually. */
  quote?: boolean;
  features: string[];
  featured?: boolean;
  cta: { label: string; href: string };
};

export const TIERS: Tier[] = [
  {
    name: "Tier I · Single jurisdiction",
    scope: "One province or state",
    price: "By quote",
    quote: true,
    features: [
      "Every platform serving one province or state",
      "Documents opened, read and summarized",
      "Fit qualified against your trade and capacity",
      "Direct links to the source bid",
    ],
    cta: { label: "Discuss coverage", href: "/book" },
  },
  {
    name: "Tier II · Regional",
    scope: "Up to five jurisdictions plus federal",
    price: "By quote",
    quote: true,
    features: [
      "Up to five provinces or states, plus federal",
      "Everything in Tier I, across your whole region",
      "Priority alerts when a bid cannot wait",
      "Shared dashboard and a weekly brief",
    ],
    featured: true,
    cta: { label: "Free position report", href: "/free-opportunities" },
  },
  {
    name: "Tier III · National & cross border",
    scope: "Canada, the US, or both",
    price: "By quote",
    quote: true,
    features: [
      "Nationwide coverage, Canada, the US, or both",
      "Federal, provincial, state and local, end to end",
      "Everything in Tier II, at national scale",
      "A standing line to me when a bid cannot wait",
    ],
    cta: { label: "Request a quote", href: "/book" },
  },
];

/**
 * Defence contracting coverage. Deliberately not a fourth region tier: it is a
 * vertical that cuts across jurisdictions, with its own platforms (PSPC,
 * CanadaBuys, DND, SAM.gov, DIBBS, GSA eBuy) and its own eligibility gates
 * (Controlled Goods, security clearance, NAICS and set-asides). Sold standalone
 * or added to any region tier. Both are paid for if both are wanted.
 *
 * The guarantee here is completeness rather than a count: defence volume is low
 * and value is high, so promising a number is the wrong shape of promise.
 */
export const DEFENCE = {
  name: "Defence contracting coverage",
  scope: "Standalone, or added to any region tier",
  options: [
    {
      label: "Canada",
      price: "By quote",
      quote: true,
      body: "PSPC, CanadaBuys, DND and MERX federal, plus the prime flow-down work Canadian suppliers are meant to be found for.",
    },
    {
      label: "Canada and the United States",
      price: "By quote",
      quote: true,
      body: "Everything above, plus SAM.gov, DIBBS and GSA eBuy for US federal defence and the cross border work that comes with it. Scoped to your NAICS codes and clearance level, then quoted.",
    },
  ],
  features: [
    "Every open solicitation matching your NAICS codes, clearance level and capability, reviewed",
    "Eligibility screened before it reaches you: Controlled Goods, clearance, set-asides",
    "Prime flow-down and ITB driven opportunities, not just direct awards",
    "Delivered with a verdict and a link to the source solicitation",
  ],
  cta: { label: "Request a quote", href: "/book" },
};

/**
 * Tier label for the cost calculator. No fee function: coverage is quoted to
 * the client's footprint and no figure is published anywhere on the site.
 */
export function calcTier(jurisdictions: number): string {
  return jurisdictions <= 1
    ? "Tier I · Single jurisdiction"
    : jurisdictions <= 5
      ? "Tier II · Regional"
      : "Tier III · National";
}

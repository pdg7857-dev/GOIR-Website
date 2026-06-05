// Industry profiles. These shape every estimate so two companies in different
// sectors receive materially different intelligence. Money in cents.

export type IndustryProfile = {
  key: string;
  label: string;
  // Typical value of a single public contract in this sector.
  contractValueLowCents: number;
  contractValueHighCents: number;
  // Funnel rates (of opportunities reviewed).
  qualifyRate: number; // share worth qualifying
  pursueRate: number; // share of reviewed that become real bids
  winRate: number; // share of pursued that are won
  // Effort per item.
  reviewMinutes: number; // to triage one posted opportunity
  estimatorHours: number; // estimating one pursued bid
  proposalHours: number; // writing one proposal
  mgmtHours: number; // management/coordination per pursued bid
  // Recommended platforms (keys) by country, most-relevant first.
  recommended: { CA: string[]; US: string[] };
  awardCategories: string[];
  // Buyer archetypes, localized with the region label by the engine.
  buyerTypes: { template: string; type: string; weight: number }[];
  // Peer benchmarks (0-100) used in Industry Benchmarking™.
  peer: { government: number; award: number; platform: number; maturity: number };
  comparableSuppliers: string[];
  blurb: string;
};

const PROFILES: IndustryProfile[] = [
  {
    key: "construction",
    label: "Construction",
    contractValueLowCents: 0, contractValueHighCents: 0, // set from VALUE_RANGES below
    qualifyRate: 0.35, pursueRate: 0.16, winRate: 0.22,
    reviewMinutes: 22, estimatorHours: 14, proposalHours: 10, mgmtHours: 6,
    recommended: { CA: ["merx", "bidsandtenders", "biddingo", "bonfire", "canadabuys"], US: ["bidnet", "planetbids", "demandstar", "samgov", "bonfire"] },
    awardCategories: ["General contracting", "Roads & infrastructure", "Building renovation", "Site servicing", "Bridges & structures"],
    buyerTypes: [
      { template: "{region} Ministry of Transportation", type: "Provincial / State agency", weight: 1.0 },
      { template: "City of {city}, Infrastructure & Engineering", type: "Municipal", weight: 0.95 },
      { template: "{region} Infrastructure Authority", type: "Crown / State agency", weight: 0.8 },
      { template: "{city} District School Board, Capital", type: "Education", weight: 0.6 },
    ],
    peer: { government: 64, award: 58, platform: 55, maturity: 61 },
    comparableSuppliers: ["Regional general contractors", "Civil & site-works firms", "Design-build joint ventures"],
    blurb: "construction and infrastructure delivery",
  },
  {
    key: "janitorial",
    label: "Janitorial",
    contractValueLowCents: 0, contractValueHighCents: 0,
    qualifyRate: 0.5, pursueRate: 0.28, winRate: 0.3,
    reviewMinutes: 14, estimatorHours: 5, proposalHours: 7, mgmtHours: 3,
    recommended: { CA: ["bidsandtenders", "biddingo", "merx", "bonfire", "canadabuys"], US: ["bonfire", "demandstar", "ionwave", "bidnet", "samgov"] },
    awardCategories: ["Custodial services", "Day & night cleaning", "Window & high cleaning", "Disinfection", "Waste & recycling"],
    buyerTypes: [
      { template: "{city} District School Board", type: "Education", weight: 1.0 },
      { template: "{region} Health Authority", type: "Healthcare", weight: 0.9 },
      { template: "City of {city}, Facilities", type: "Municipal", weight: 0.85 },
      { template: "{region} Housing Corporation", type: "Crown / State agency", weight: 0.6 },
    ],
    peer: { government: 57, award: 52, platform: 49, maturity: 54 },
    comparableSuppliers: ["Regional janitorial contractors", "Integrated facilities-services firms", "Specialty disinfection providers"],
    blurb: "janitorial and custodial services",
  },
  {
    key: "facilities",
    label: "Facilities Management",
    contractValueLowCents: 0, contractValueHighCents: 0,
    qualifyRate: 0.42, pursueRate: 0.2, winRate: 0.26,
    reviewMinutes: 18, estimatorHours: 9, proposalHours: 9, mgmtHours: 5,
    recommended: { CA: ["merx", "bidsandtenders", "biddingo", "bonfire", "canadabuys"], US: ["bonfire", "demandstar", "planetbids", "bidnet", "samgov"] },
    awardCategories: ["Integrated FM", "HVAC & mechanical", "Building maintenance", "Grounds & operations", "Energy & controls"],
    buyerTypes: [
      { template: "{region} Health Authority", type: "Healthcare", weight: 1.0 },
      { template: "City of {city}, Real Estate & Facilities", type: "Municipal", weight: 0.9 },
      { template: "{region} Ministry of Government Services", type: "Provincial / State agency", weight: 0.8 },
      { template: "{city} University, Facilities", type: "Higher education", weight: 0.7 },
    ],
    peer: { government: 60, award: 55, platform: 58, maturity: 59 },
    comparableSuppliers: ["Integrated FM providers", "Mechanical-services contractors", "Building-operations specialists"],
    blurb: "integrated facilities management",
  },
  {
    key: "industrial_supplies",
    label: "Industrial Supplies",
    contractValueLowCents: 0, contractValueHighCents: 0,
    qualifyRate: 0.55, pursueRate: 0.32, winRate: 0.34,
    reviewMinutes: 10, estimatorHours: 4, proposalHours: 5, mgmtHours: 2,
    recommended: { CA: ["merx", "canadabuys", "bidsandtenders", "bonfire", "biddingo"], US: ["samgov", "bonfire", "demandstar", "ionwave", "bidnet"] },
    awardCategories: ["MRO supplies", "Safety equipment", "Tools & hardware", "Fasteners & fittings", "Janitorial consumables"],
    buyerTypes: [
      { template: "{region} Ministry of Transportation", type: "Provincial / State agency", weight: 1.0 },
      { template: "City of {city}, Procurement", type: "Municipal", weight: 0.9 },
      { template: "{region} Health Authority, Supply Chain", type: "Healthcare", weight: 0.85 },
      { template: "{region} Power / Utilities", type: "Crown / Utility", weight: 0.7 },
    ],
    peer: { government: 62, award: 60, platform: 61, maturity: 60 },
    comparableSuppliers: ["Industrial distributors", "MRO suppliers", "Safety-equipment vendors"],
    blurb: "industrial supply and distribution",
  },
  {
    key: "security",
    label: "Security Services",
    contractValueLowCents: 0, contractValueHighCents: 0,
    qualifyRate: 0.46, pursueRate: 0.24, winRate: 0.28,
    reviewMinutes: 15, estimatorHours: 6, proposalHours: 8, mgmtHours: 4,
    recommended: { CA: ["merx", "bidsandtenders", "biddingo", "bonfire", "canadabuys"], US: ["bonfire", "demandstar", "ionwave", "samgov", "bidnet"] },
    awardCategories: ["Guarding services", "Mobile patrol", "Electronic security", "Access control", "Event security"],
    buyerTypes: [
      { template: "{region} Housing Corporation", type: "Crown / State agency", weight: 1.0 },
      { template: "City of {city}, Protective Services", type: "Municipal", weight: 0.9 },
      { template: "{region} Health Authority", type: "Healthcare", weight: 0.85 },
      { template: "{city} Transit Commission", type: "Transit", weight: 0.7 },
    ],
    peer: { government: 58, award: 53, platform: 51, maturity: 55 },
    comparableSuppliers: ["Regional guarding firms", "Integrated security providers", "Electronic-security integrators"],
    blurb: "physical and electronic security services",
  },
  {
    key: "landscaping",
    label: "Landscaping & Grounds",
    contractValueLowCents: 0, contractValueHighCents: 0,
    qualifyRate: 0.52, pursueRate: 0.3, winRate: 0.32,
    reviewMinutes: 12, estimatorHours: 5, proposalHours: 5, mgmtHours: 3,
    recommended: { CA: ["bidsandtenders", "biddingo", "merx", "bonfire", "canadabuys"], US: ["bonfire", "demandstar", "ionwave", "planetbids", "bidnet"] },
    awardCategories: ["Grounds maintenance", "Winter / snow & ice", "Tree & forestry", "Sports turf", "Landscape construction"],
    buyerTypes: [
      { template: "City of {city}, Parks & Recreation", type: "Municipal", weight: 1.0 },
      { template: "{city} District School Board", type: "Education", weight: 0.85 },
      { template: "{region} Ministry of Transportation", type: "Provincial / State agency", weight: 0.8 },
      { template: "{region} Housing Corporation", type: "Crown / State agency", weight: 0.6 },
    ],
    peer: { government: 55, award: 50, platform: 47, maturity: 52 },
    comparableSuppliers: ["Commercial landscapers", "Snow & ice management firms", "Grounds-maintenance contractors"],
    blurb: "landscaping and grounds maintenance",
  },
  {
    key: "other",
    label: "General / Other",
    contractValueLowCents: 0, contractValueHighCents: 0,
    qualifyRate: 0.45, pursueRate: 0.24, winRate: 0.28,
    reviewMinutes: 16, estimatorHours: 7, proposalHours: 8, mgmtHours: 4,
    recommended: { CA: ["merx", "canadabuys", "bidsandtenders", "bonfire", "biddingo"], US: ["samgov", "bonfire", "demandstar", "bidnet", "ionwave"] },
    awardCategories: ["Goods & services", "Professional services", "Operations & maintenance", "Specialty supply", "Technical services"],
    buyerTypes: [
      { template: "City of {city}, Procurement", type: "Municipal", weight: 1.0 },
      { template: "{region} Ministry of Government Services", type: "Provincial / State agency", weight: 0.9 },
      { template: "{region} Health Authority", type: "Healthcare", weight: 0.8 },
      { template: "{city} District School Board", type: "Education", weight: 0.7 },
    ],
    peer: { government: 56, award: 52, platform: 52, maturity: 55 },
    comparableSuppliers: ["Regional service providers", "Specialty suppliers", "Established public-sector vendors"],
    blurb: "public-sector goods and services",
  },
];

// Realistic annualized value of a single public award by sector (cents).
const VALUE_RANGES: Record<string, [number, number]> = {
  construction: [120_000_00, 1_800_000_00],
  janitorial: [40_000_00, 350_000_00],
  facilities: [90_000_00, 900_000_00],
  industrial_supplies: [25_000_00, 300_000_00],
  security: [60_000_00, 500_000_00],
  landscaping: [30_000_00, 280_000_00],
  other: [50_000_00, 500_000_00],
};
for (const p of PROFILES) {
  const [lo, hi] = VALUE_RANGES[p.key];
  p.contractValueLowCents = lo;
  p.contractValueHighCents = hi;
}

export const INDUSTRIES = PROFILES;
export const INDUSTRY_BY_KEY: Record<string, IndustryProfile> =
  Object.fromEntries(PROFILES.map((p) => [p.key, p]));

export function resolveIndustry(input: string): IndustryProfile {
  const s = (input || "").trim().toLowerCase();
  if (INDUSTRY_BY_KEY[s]) return INDUSTRY_BY_KEY[s];
  // fuzzy match on label / keywords
  for (const p of PROFILES) {
    if (p.label.toLowerCase().includes(s) || s.includes(p.key.replace("_", " "))) return p;
  }
  if (/clean|custod|janit/.test(s)) return INDUSTRY_BY_KEY.janitorial;
  if (/build|construct|civil|road|concrete/.test(s)) return INDUSTRY_BY_KEY.construction;
  if (/facilit|hvac|mainten|building oper/.test(s)) return INDUSTRY_BY_KEY.facilities;
  if (/suppl|distribut|mro|equipment|product/.test(s)) return INDUSTRY_BY_KEY.industrial_supplies;
  if (/secur|guard|patrol|surveil/.test(s)) return INDUSTRY_BY_KEY.security;
  if (/landscap|grounds|snow|turf|lawn/.test(s)) return INDUSTRY_BY_KEY.landscaping;
  return INDUSTRY_BY_KEY.other;
}

// The six sectors shown in Industry Benchmarking™.
export const BENCHMARK_INDUSTRIES = [
  "construction", "janitorial", "facilities", "industrial_supplies", "security", "landscaping",
];

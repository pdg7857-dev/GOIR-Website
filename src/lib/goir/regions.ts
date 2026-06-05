// Region detection + procurement context. Canada vs US drives which platforms
// and buyers are relevant. Accepts codes ("ON", "CA-ON") or full names.

export type Country = "CA" | "US";

const CA_PROVINCES: Record<string, string> = {
  ON: "Ontario",
  QC: "Quebec",
  BC: "British Columbia",
  AB: "Alberta",
  MB: "Manitoba",
  SK: "Saskatchewan",
  NS: "Nova Scotia",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  PE: "Prince Edward Island",
  NT: "Northwest Territories",
  YT: "Yukon",
  NU: "Nunavut",
};

const US_STATES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "District of Columbia",
};

const NAME_TO_CODE = (table: Record<string, string>) => {
  const m: Record<string, string> = {};
  for (const [code, name] of Object.entries(table)) m[name.toLowerCase()] = code;
  return m;
};
const CA_NAMES = NAME_TO_CODE(CA_PROVINCES);
const US_NAMES = NAME_TO_CODE(US_STATES);

export type RegionInfo = { country: Country; code: string; label: string };

export function resolveRegion(input: string): RegionInfo {
  const raw = (input || "").trim();
  if (!raw) return { country: "CA", code: "ON", label: "Ontario" };
  // Strip "CA-"/"US-"/"Canada"/"United States" qualifiers.
  let s = raw.replace(/^(ca|can|canada|us|usa|united states)[\s\-,]+/i, "").trim();
  const upper = s.toUpperCase();
  const lower = s.toLowerCase();

  if (CA_PROVINCES[upper]) return { country: "CA", code: upper, label: CA_PROVINCES[upper] };
  if (CA_NAMES[lower]) return { country: "CA", code: CA_NAMES[lower], label: CA_PROVINCES[CA_NAMES[lower]] };
  if (US_STATES[upper]) return { country: "US", code: upper, label: US_STATES[upper] };
  if (US_NAMES[lower]) return { country: "US", code: US_NAMES[lower], label: US_STATES[US_NAMES[lower]] };

  // Bare "Canada"/"US" with no sub-region.
  if (/^(canada|can|ca)$/i.test(raw)) return { country: "CA", code: "ON", label: "Canada (national)" };
  if (/^(usa|us|united states)$/i.test(raw)) return { country: "US", code: "DC", label: "United States (national)" };

  // Unknown, default to Canada and echo what they typed.
  return { country: "CA", code: "ON", label: raw };
}

// Relative size of the addressable public market by region, feeds revenue
// and geographic-reach estimates. 1.0 = baseline mid-size jurisdiction.
const CA_MARKET: Record<string, number> = {
  ON: 1.35, QC: 1.15, BC: 1.1, AB: 1.05, MB: 0.8, SK: 0.75, NS: 0.75,
  NB: 0.7, NL: 0.65, PE: 0.55, NT: 0.5, YT: 0.5, NU: 0.5,
};
const US_BIG = new Set(["CA", "TX", "NY", "FL", "IL", "PA", "OH", "GA", "NC", "MI", "WA", "VA", "NJ"]);

export function marketMultiplier(r: RegionInfo): number {
  if (r.country === "CA") return CA_MARKET[r.code] ?? 0.9;
  return US_BIG.has(r.code) ? 1.3 : 0.95;
}

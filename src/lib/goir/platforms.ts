// Procurement platform catalog. `scope` controls regional relevance.
import type { Country } from "./regions";

export type PlatformDef = {
  key: string;
  name: string;
  scope: "CA" | "US" | "BOTH";
  tier: "core" | "broad" | "enterprise";
  note: string;
};

export const PLATFORMS: PlatformDef[] = [
  { key: "merx",         name: "MERX",          scope: "CA", tier: "core",  note: "Largest Canadian public-tender aggregator, federal, provincial, MASH." },
  { key: "canadabuys",   name: "CanadaBuys",    scope: "CA", tier: "core",  note: "Government of Canada's official tendering service (replaced Buyandsell)." },
  { key: "bidnet",       name: "BidNet Direct", scope: "US", tier: "broad", note: "Regional purchasing groups across U.S. state and local agencies." },
  { key: "samgov",       name: "SAM.gov",       scope: "US", tier: "core",  note: "US federal contracting system of record." },
  { key: "bonfire",      name: "Bonfire",       scope: "BOTH", tier: "core", note: "Sourcing portal used by hundreds of municipalities and institutions." },
  { key: "biddingo",     name: "Biddingo",      scope: "CA", tier: "broad", note: "Strong in Ontario MASH, municipalities, school boards, hospitals." },
  { key: "bidsandtenders", name: "bids&tenders", scope: "CA", tier: "core", note: "Dominant municipal e-bidding platform in Canada." },
  { key: "opengov",      name: "OpenGov",       scope: "US", tier: "broad", note: "US local-government procurement (formerly ProcureNow)." },
  { key: "planetbids",   name: "PlanetBids",    scope: "US", tier: "broad", note: "Widely used by California and western US agencies." },
  { key: "demandstar",   name: "DemandStar",    scope: "US", tier: "broad", note: "Aggregates thousands of US local agencies." },
  { key: "ionwave",      name: "Ion Wave",      scope: "US", tier: "broad", note: "e-Procurement for US states, counties and school districts." },
  { key: "govwin",       name: "GovWin",        scope: "BOTH", tier: "enterprise", note: "Deltek market intelligence, pre-RFP pipeline visibility." },
  { key: "ariba",        name: "SAP Ariba",     scope: "BOTH", tier: "enterprise", note: "Enterprise/agency e-sourcing network." },
  { key: "jaggaer",      name: "JAGGAER",       scope: "BOTH", tier: "enterprise", note: "Higher-ed and large-institution sourcing suite." },
];

export const PLATFORM_BY_KEY: Record<string, PlatformDef> = Object.fromEntries(
  PLATFORMS.map((p) => [p.key, p])
);

// Normalize a free-text or key platform reference to a known key.
export function normalizePlatform(raw: string): string | null {
  const s = raw.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!s) return null;
  for (const p of PLATFORMS) {
    const pk = p.key.replace(/[^a-z0-9]/g, "");
    const pn = p.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (s === pk || s === pn || s.includes(pk) || pk.includes(s)) return p.key;
    if (s === pn || s.includes(pn)) return p.key;
  }
  return null;
}

export function platformsForCountry(country: Country): PlatformDef[] {
  return PLATFORMS.filter((p) => p.scope === country || p.scope === "BOTH");
}

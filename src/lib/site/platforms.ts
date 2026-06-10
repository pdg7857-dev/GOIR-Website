/**
 * Procurement-platform metadata for every authority page. Long-form page
 * content (the 1,500 to 4,000+ word bodies) lives in ./platform-content so
 * this file stays a clean, scannable index that the rest of the site reads
 * for navigation, cross-linking and SEO.
 */

export type PlatformCategory =
  | "Canadian aggregator"
  | "Canadian government"
  | "U.S. aggregator"
  | "U.S. federal"
  | "eProcurement SaaS"
  | "Market intelligence";

export type Platform = {
  slug: string;
  name: string;
  /** How people actually type it. Used for "MERX Expert" style H1s. */
  shortName: string;
  category: PlatformCategory;
  country: "Canada" | "United States" | "Both";
  /** Cornerstone pages get the deepest treatment and top nav placement. */
  priority: 1 | 2 | 3;
  oneLiner: string;
  /** Primary keyword targets for the page. */
  keywords: string[];
  /** Industry slugs that bid most often on this platform. */
  industries: string[];
};

export const PLATFORMS: Platform[] = [
  {
    slug: "merx",
    name: "MERX",
    shortName: "MERX",
    category: "Canadian aggregator",
    country: "Canada",
    priority: 1,
    oneLiner:
      "Canada's best-known tender aggregator, carrying federal, provincial, MASH and private opportunities in one place.",
    keywords: [
      "merx expert", "merx consultant", "merx monitoring", "merx opportunities",
      "merx bid alerts", "merx contracts", "merx tenders", "merx government contracts",
      "merx opportunity discovery",
    ],
    industries: ["construction", "janitorial", "facilities-maintenance", "hvac", "electrical"],
  },
  {
    slug: "bidnet-direct",
    name: "BidNet Direct",
    shortName: "BidNet Direct",
    category: "U.S. aggregator",
    country: "United States",
    priority: 1,
    oneLiner:
      "A regional purchasing-group network used by hundreds of U.S. state and local agencies to post solicitations.",
    keywords: [
      "bidnet direct consultant", "bidnet direct expert", "bidnet monitoring",
      "bidnet opportunities", "bidnet contract opportunities", "bidnet alerts",
      "bidnet opportunity intelligence",
    ],
    industries: ["construction", "janitorial", "facilities-maintenance", "landscaping", "security"],
  },
  {
    slug: "canadabuys",
    name: "CanadaBuys",
    shortName: "CanadaBuys",
    category: "Canadian government",
    country: "Canada",
    priority: 1,
    oneLiner:
      "The Government of Canada's official tendering service, the front door to federal procurement since it replaced Buyandsell.",
    keywords: [
      "canadabuys expert", "canadabuys consultant", "canadabuys monitoring",
      "canadabuys opportunities", "canadabuys tenders", "federal government contracts canada",
      "canadabuys bid alerts",
    ],
    industries: ["construction", "facilities-maintenance", "industrial-supplies", "mro", "engineering"],
  },
  {
    slug: "sam-gov",
    name: "SAM.gov",
    shortName: "SAM.gov",
    category: "U.S. federal",
    country: "United States",
    priority: 1,
    oneLiner:
      "The U.S. federal government's official system for contract opportunities, entity registration and award data.",
    keywords: [
      "sam.gov expert", "sam.gov opportunities", "sam.gov consultant",
      "federal contract opportunities", "sam.gov bid alerts", "sam.gov monitoring",
      "government contract opportunities usa",
    ],
    industries: ["construction", "facilities-maintenance", "industrial-supplies", "mro", "security"],
  },
  {
    slug: "bonfire",
    name: "Bonfire",
    shortName: "Bonfire",
    category: "eProcurement SaaS",
    country: "Both",
    priority: 2,
    oneLiner:
      "A widely adopted sourcing platform agencies use to run RFPs and evaluations, each on its own buyer portal.",
    keywords: ["bonfire procurement", "bonfirehub opportunities", "bonfire bid portal", "bonfire rfp"],
    industries: ["construction", "facilities-maintenance", "engineering", "environmental"],
  },
  {
    slug: "biddingo",
    name: "Biddingo",
    shortName: "Biddingo",
    category: "Canadian aggregator",
    country: "Canada",
    priority: 2,
    oneLiner:
      "A long-running Canadian bid distribution service strong in education, housing and municipal buyers.",
    keywords: ["biddingo opportunities", "biddingo tenders", "biddingo bid alerts", "biddingo construction"],
    industries: ["construction", "janitorial", "facilities-maintenance"],
  },
  {
    slug: "bids-and-tenders",
    name: "bids&tenders",
    shortName: "bids&tenders",
    category: "eProcurement SaaS",
    country: "Canada",
    priority: 2,
    oneLiner:
      "The eProcurement system behind a large share of Canadian municipalities, each running its own portal.",
    keywords: ["bids and tenders portal", "bidsandtenders opportunities", "municipal bids canada"],
    industries: ["construction", "janitorial", "facilities-maintenance", "landscaping"],
  },
  {
    slug: "jaggaer",
    name: "Jaggaer",
    shortName: "Jaggaer",
    category: "eProcurement SaaS",
    country: "Both",
    priority: 3,
    oneLiner:
      "An enterprise source-to-pay suite used by universities, health systems and large agencies.",
    keywords: ["jaggaer supplier", "jaggaer bids", "jaggaer rfp", "jaggaer procurement"],
    industries: ["facilities-maintenance", "mro", "industrial-supplies"],
  },
  {
    slug: "sap-ariba",
    name: "SAP Ariba",
    shortName: "SAP Ariba",
    category: "eProcurement SaaS",
    country: "Both",
    priority: 3,
    oneLiner:
      "A global procurement network where many large public and institutional buyers run sourcing events.",
    keywords: ["sap ariba supplier", "ariba opportunities", "ariba network bids", "ariba rfp"],
    industries: ["mro", "industrial-supplies", "facilities-maintenance"],
  },
  {
    slug: "planetbids",
    name: "PlanetBids",
    shortName: "PlanetBids",
    category: "eProcurement SaaS",
    country: "United States",
    priority: 2,
    oneLiner:
      "The portal behind a large share of California public agencies and many municipalities nationwide.",
    keywords: ["planetbids portal", "planetbids opportunities", "planetbids california", "planetbids vendor"],
    industries: ["construction", "facilities-maintenance", "landscaping", "engineering"],
  },
  {
    slug: "opengov",
    name: "OpenGov (ProcureNow)",
    shortName: "OpenGov",
    category: "eProcurement SaaS",
    country: "United States",
    priority: 3,
    oneLiner:
      "A modern procurement suite (formerly ProcureNow) used by a growing roster of U.S. local governments.",
    keywords: ["opengov procurement", "procurenow bids", "opengov rfp", "opengov vendor"],
    industries: ["construction", "facilities-maintenance", "engineering"],
  },
  {
    slug: "demandstar",
    name: "DemandStar",
    shortName: "DemandStar",
    category: "eProcurement SaaS",
    country: "United States",
    priority: 3,
    oneLiner:
      "A bid-notification network connecting suppliers to thousands of U.S. local-government agencies.",
    keywords: ["demandstar bids", "demandstar opportunities", "demandstar vendor", "demandstar notifications"],
    industries: ["construction", "janitorial", "facilities-maintenance", "mro"],
  },
  {
    slug: "ionwave",
    name: "Ion Wave",
    shortName: "Ion Wave",
    category: "eProcurement SaaS",
    country: "United States",
    priority: 3,
    oneLiner:
      "An eProcurement platform behind many state and local buyer portals across the U.S.",
    keywords: ["ion wave bids", "ionwave opportunities", "ion wave vendor registration"],
    industries: ["construction", "facilities-maintenance", "mro", "industrial-supplies"],
  },
  {
    slug: "govwin",
    name: "GovWin IQ",
    shortName: "GovWin",
    category: "Market intelligence",
    country: "Both",
    priority: 3,
    oneLiner:
      "A market-intelligence service tracking opportunities, pre-RFP activity and awards across government.",
    keywords: ["govwin iq", "govwin opportunities", "deltek govwin", "govwin alternative"],
    industries: ["construction", "engineering", "security", "industrial-supplies"],
  },
  {
    slug: "periscope",
    name: "Periscope S2G / BidSync",
    shortName: "Periscope S2G",
    category: "eProcurement SaaS",
    country: "United States",
    priority: 3,
    oneLiner:
      "The supplier network behind Periscope S2G and BidSync, tied to many state and local eProcurement systems.",
    keywords: ["periscope s2g", "bidsync", "periscope holdings bids", "bidsync opportunities", "periscope supplier network"],
    industries: ["construction", "facilities-maintenance", "mro"],
  },
  {
    slug: "constructconnect",
    name: "ConstructConnect",
    shortName: "ConstructConnect",
    category: "Market intelligence",
    country: "Both",
    priority: 2,
    oneLiner:
      "A construction project-intelligence network that surfaces public and private projects, plans and bidding data early.",
    keywords: [
      "constructconnect", "constructconnect bids", "construction project leads",
      "constructconnect vs dodge", "construction bid opportunities",
    ],
    industries: ["construction", "hvac", "electrical", "plumbing", "facilities-maintenance"],
  },
  {
    slug: "gsa-ebuy",
    name: "GSA eBuy",
    shortName: "GSA eBuy",
    category: "U.S. federal",
    country: "United States",
    priority: 2,
    oneLiner:
      "The federal RFQ system where Schedule holders receive and respond to agency requests.",
    keywords: ["gsa ebuy", "gsa schedule rfq", "gsa ebuy opportunities", "gsa multiple award schedule"],
    industries: ["facilities-maintenance", "mro", "industrial-supplies", "security"],
  },
  {
    slug: "usaspending",
    name: "USASpending",
    shortName: "USASpending",
    category: "Market intelligence",
    country: "United States",
    priority: 3,
    oneLiner:
      "The federal award-data system that reveals who is winning, how much and where, before you ever bid.",
    keywords: ["usaspending", "federal award data", "government contract awards", "usaspending api"],
    industries: ["construction", "facilities-maintenance", "industrial-supplies", "engineering"],
  },
];

export const PLATFORM_SLUGS = PLATFORMS.map((p) => p.slug);

export function getPlatform(slug: string) {
  return PLATFORMS.find((p) => p.slug === slug);
}

/**
 * Official homepage for each platform I cover, so authority pages can link out
 * to the real system. Kept here as one map rather than on every Platform object.
 */
export const PLATFORM_HOMEPAGE: Record<string, string> = {
  merx: "https://www.merx.com",
  "bidnet-direct": "https://www.bidnetdirect.com",
  canadabuys: "https://canadabuys.canada.ca",
  "sam-gov": "https://sam.gov",
  bonfire: "https://www.bonfirehub.com",
  biddingo: "https://www.biddingo.com",
  "bids-and-tenders": "https://www.bidsandtenders.ca",
  jaggaer: "https://www.jaggaer.com",
  "sap-ariba": "https://www.ariba.com",
  planetbids: "https://www.planetbids.com",
  opengov: "https://www.opengov.com",
  demandstar: "https://www.demandstar.com",
  ionwave: "https://www.ionwave.net",
  govwin: "https://iq.govwin.com",
  periscope: "https://www.bidsync.com",
  constructconnect: "https://www.constructconnect.com",
  "gsa-ebuy": "https://www.ebuy.gsa.gov",
  usaspending: "https://www.usaspending.gov",
};

/** Returns the platform's official homepage URL, or undefined if unknown. */
export function getPlatformHomepage(slug: string): string | undefined {
  return PLATFORM_HOMEPAGE[slug];
}

/** "www.merx.com", the homepage URL with scheme/trailing slash stripped, for display. */
export function platformHomepageLabel(slug: string): string | undefined {
  const url = PLATFORM_HOMEPAGE[slug];
  return url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : undefined;
}

/** Platforms that have hand-authored long-form bodies (cornerstones first). */
export const CORNERSTONE_PLATFORMS = PLATFORMS.filter((p) => p.priority === 1);

/**
 * The platforms featured in the homepage and authority showcases. Canada-forward
 * by design: we lead with the Canadian portals contractors here actually use
 * (MERX, CanadaBuys, Biddingo) and keep a U.S. portal present to show that side
 * is covered too. Provincial portals are advertised in copy alongside these.
 */
export const FEATURED_PLATFORMS: Platform[] = [
  "merx",
  "canadabuys",
  "biddingo",
  "bidnet-direct",
]
  .map((slug) => getPlatform(slug))
  .filter((p): p is Platform => Boolean(p));

export function platformsByCategory() {
  const map = new Map<PlatformCategory, Platform[]>();
  for (const p of PLATFORMS) {
    const arr = map.get(p.category) ?? [];
    arr.push(p);
    map.set(p.category, arr);
  }
  return map;
}

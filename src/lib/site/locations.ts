/**
 * Geographic coverage data powering the programmatic /coverage pages.
 * Each jurisdiction lists the procurement platforms most relevant to it so
 * the location template can cross-link to the platform authority pages.
 */

export type Province = {
  slug: string;
  name: string;
  abbr: string;
  type: "province" | "territory";
  capital: string;
  /** The primary government procurement system for this jurisdiction, by name.
   *  Some jurisdictions (Manitoba, NWT, Nunavut) carry their postings through
   *  MERX rather than a standalone portal. */
  primaryPortal: string;
  platforms: string[]; // platform slugs (real, cross-linkable platforms only)
  blurb: string;
};

export type State = {
  slug: string;
  name: string;
  abbr: string;
  region: "Northeast" | "Midwest" | "South" | "West";
  capital: string;
  platforms: string[]; // platform slugs
  blurb: string;
};

const CA_FEDERAL = ["canadabuys", "merx"];

export const PROVINCES: Province[] = [
  {
    slug: "ontario", name: "Ontario", abbr: "ON", type: "province", capital: "Toronto",
    primaryPortal: "Ontario Tenders Portal",
    platforms: ["merx", "bids-and-tenders", "biddingo", "bonfire", ...CA_FEDERAL],
    blurb: "Canada's largest procurement market: broader public sector (MASH), provincial ministries and hundreds of municipalities. The Ontario Tenders Portal anchors provincial buying.",
  },
  {
    slug: "alberta", name: "Alberta", abbr: "AB", type: "province", capital: "Edmonton",
    primaryPortal: "Alberta Purchasing Connection (APC)",
    platforms: ["bids-and-tenders", "bonfire", ...CA_FEDERAL],
    blurb: "Energy, infrastructure and a large municipal base across Calgary and Edmonton. Alberta Purchasing Connection (APC) is the provincial system.",
  },
  {
    slug: "british-columbia", name: "British Columbia", abbr: "BC", type: "province", capital: "Victoria",
    primaryPortal: "BC Bid",
    platforms: ["bids-and-tenders", "bonfire", ...CA_FEDERAL],
    blurb: "BC Bid plus a deep municipal and health-authority procurement landscape.",
  },
  {
    slug: "quebec", name: "Quebec", abbr: "QC", type: "province", capital: "Quebec City",
    primaryPortal: "SEAO",
    platforms: ["merx", ...CA_FEDERAL],
    blurb: "SEAO is the mandatory provincial system, with French-language documents and distinct rules.",
  },
  {
    slug: "manitoba", name: "Manitoba", abbr: "MB", type: "province", capital: "Winnipeg",
    primaryPortal: "MERX (Manitoba government postings)",
    platforms: ["merx", "bids-and-tenders", ...CA_FEDERAL],
    blurb: "Provincial and municipal buyers across a compact but active market. Manitoba government postings are carried through MERX.",
  },
  {
    slug: "saskatchewan", name: "Saskatchewan", abbr: "SK", type: "province", capital: "Regina",
    primaryPortal: "SaskTenders",
    platforms: ["bids-and-tenders", ...CA_FEDERAL],
    blurb: "SaskTenders centralizes provincial opportunities; municipalities run their own portals.",
  },
  {
    slug: "nova-scotia", name: "Nova Scotia", abbr: "NS", type: "province", capital: "Halifax",
    primaryPortal: "Nova Scotia Tenders",
    platforms: ["bids-and-tenders", ...CA_FEDERAL],
    blurb: "Atlantic Canada's largest market, anchored by Halifax and provincial buyers, with the province posting through Nova Scotia Tenders.",
  },
  {
    slug: "new-brunswick", name: "New Brunswick", abbr: "NB", type: "province", capital: "Fredericton",
    primaryPortal: "New Brunswick Opportunities Network (NBON)",
    platforms: ["bids-and-tenders", ...CA_FEDERAL],
    blurb: "NBON (New Brunswick Opportunities Network) plus municipal portals.",
  },
  {
    slug: "prince-edward-island", name: "Prince Edward Island", abbr: "PE", type: "province", capital: "Charlottetown",
    primaryPortal: "PEI Tenders",
    platforms: ["bids-and-tenders", ...CA_FEDERAL],
    blurb: "A small but consistent provincial and municipal opportunity stream, posted through PEI Tenders.",
  },
  {
    slug: "newfoundland-and-labrador", name: "Newfoundland and Labrador", abbr: "NL", type: "province", capital: "St. John's",
    primaryPortal: "NL Public Procurement Agency",
    platforms: ["bids-and-tenders", ...CA_FEDERAL],
    blurb: "Provincial public procurement through the NL Public Procurement Agency, plus municipal and health-authority buyers.",
  },
  {
    slug: "yukon", name: "Yukon", abbr: "YT", type: "territory", capital: "Whitehorse",
    primaryPortal: "bids&tenders (Yukon government)",
    platforms: ["bids-and-tenders", ...CA_FEDERAL],
    blurb: "The territorial government is the dominant buyer and posts through bids&tenders; remote logistics matter.",
  },
  {
    slug: "northwest-territories", name: "Northwest Territories", abbr: "NT", type: "territory", capital: "Yellowknife",
    primaryPortal: "MERX (NWT government postings)",
    platforms: [...CA_FEDERAL],
    blurb: "Territorial and Indigenous-government procurement across a vast region, with postings carried through MERX.",
  },
  {
    slug: "nunavut", name: "Nunavut", abbr: "NU", type: "territory", capital: "Iqaluit",
    primaryPortal: "MERX (Nunavut government postings)",
    platforms: [...CA_FEDERAL],
    blurb: "NNI policy and remote delivery shape a specialized opportunity set, with government postings carried through MERX.",
  },
];

// Helper to keep state entries terse. Most states surface opportunities through
// a state eProcurement system plus the national aggregators and SaaS portals.
const US_FED = ["sam-gov", "gsa-ebuy", "usaspending"];
const COMMON_SAAS = ["bonfire", "demandstar", "planetbids", "ionwave", "opengov", "bidnet-direct"];

function st(
  slug: string, name: string, abbr: string,
  region: State["region"], capital: string, extra: string[], blurb: string,
): State {
  // De-duplicate platform slugs while preserving order.
  const platforms = Array.from(new Set([...extra, ...US_FED]));
  return { slug, name, abbr, region, capital, platforms, blurb };
}

export const STATES: State[] = [
  st("alabama","Alabama","AL","South","Montgomery",["bidnet-direct","bonfire"],"Statewide and municipal buyers across the Gulf South."),
  st("alaska","Alaska","AK","West","Juneau",["ionwave","bonfire"],"State agencies and remote municipal work with logistics premiums."),
  st("arizona","Arizona","AZ","West","Phoenix",["planetbids","bonfire","opengov"],"Fast-growing Phoenix metro and state university systems."),
  st("arkansas","Arkansas","AR","South","Little Rock",["bonfire","demandstar"],"State agencies plus a broad rural municipal base."),
  st("california","California","CA","West","Sacramento",["planetbids","bidnet-direct","bonfire","opengov"],"The largest U.S. subnational market: Cal eProcure plus hundreds of PlanetBids agencies."),
  st("colorado","Colorado","CO","West","Denver",["bidnet-direct","rocky-mountain-bidnet","bonfire"],"Rocky Mountain BidNet anchors a strong Front Range market."),
  st("connecticut","Connecticut","CT","Northeast","Hartford",["bidnet-direct","bonfire"],"State and dense municipal procurement across New England."),
  st("delaware","Delaware","DE","South","Dover",["bidnet-direct","ionwave"],"Compact state with steady agency and school-district demand."),
  st("florida","Florida","FL","South","Tallahassee",["bonfire","demandstar","planetbids","myfloridamarketplace"],"MyFloridaMarketPlace plus a huge county and municipal landscape."),
  st("georgia","Georgia","GA","South","Atlanta",["georgia-procurement","bonfire","demandstar"],"Georgia Procurement Registry plus Atlanta-metro buyers."),
  st("hawaii","Hawaii","HI","West","Honolulu",["hands","bonfire"],"HIePRO/HANDS state system and island logistics."),
  st("idaho","Idaho","ID","West","Boise",["ionwave","bonfire"],"State agencies and a fast-growing Treasure Valley."),
  st("illinois","Illinois","IL","Midwest","Springfield",["bidbuy","demandstar","bonfire"],"BidBuy state system plus Chicago-area public buyers."),
  st("indiana","Indiana","IN","Midwest","Indianapolis",["bonfire","demandstar"],"State agencies, universities and municipal buyers."),
  st("iowa","Iowa","IA","Midwest","Des Moines",["bonfire","ionwave"],"State and a dense network of county/municipal buyers."),
  st("kansas","Kansas","KS","Midwest","Topeka",["ionwave","bonfire"],"State agencies plus regional municipal demand."),
  st("kentucky","Kentucky","KY","South","Frankfort",["bonfire","demandstar"],"Statewide eMARS-linked buying and municipal portals."),
  st("louisiana","Louisiana","LA","South","Baton Rouge",["lapac","bonfire"],"LaPAC state system plus parish and municipal buyers."),
  st("maine","Maine","ME","Northeast","Augusta",["bidnet-direct","bonfire"],"State and municipal procurement across northern New England."),
  st("maryland","Maryland","MD","South","Annapolis",["emaryland","bidnet-direct","bonfire"],"eMaryland Marketplace Advantage plus dense metro buyers."),
  st("massachusetts","Massachusetts","MA","Northeast","Boston",["commbuys","bidnet-direct","bonfire"],"COMMBUYS state system plus a deep municipal base."),
  st("michigan","Michigan","MI","Midwest","Lansing",["sigma-vss","bonfire","demandstar"],"SIGMA VSS state system plus municipal and education buyers."),
  st("minnesota","Minnesota","MN","Midwest","Saint Paul",["bonfire","demandstar"],"State SWIFT-linked buying plus Twin Cities metro demand."),
  st("mississippi","Mississippi","MS","South","Jackson",["bonfire","ionwave"],"State agencies and municipal buyers across the region."),
  st("missouri","Missouri","MO","Midwest","Jefferson City",["bonfire","demandstar"],"MissouriBUYS state system plus metro buyers."),
  st("montana","Montana","MT","West","Helena",["emacs","bonfire"],"State agencies and rural municipal procurement."),
  st("nebraska","Nebraska","NE","Midwest","Lincoln",["bonfire","ionwave"],"State and a steady municipal/county base."),
  st("nevada","Nevada","NV","West","Carson City",["nevadaepro","bonfire"],"NevadaEPro plus fast-growing Las Vegas and Reno metros."),
  st("new-hampshire","New Hampshire","NH","Northeast","Concord",["bidnet-direct","bonfire"],"State and municipal buyers across New England."),
  st("new-jersey","New Jersey","NJ","Northeast","Trenton",["njstart","bidnet-direct","bonfire"],"NJSTART state system plus dense municipal demand."),
  st("new-mexico","New Mexico","NM","West","Santa Fe",["bonfire","ionwave"],"State agencies and a broad rural base."),
  st("new-york","New York","NY","Northeast","Albany",["nyscr","empire-state-bidnet","bidnet-direct","bonfire"],"NYS Contract Reporter plus NYC and statewide municipal buyers."),
  st("north-carolina","North Carolina","NC","South","Raleigh",["nc-eprocurement","ips","bonfire"],"NC eProcurement / IPS plus fast-growing metro buyers."),
  st("north-dakota","North Dakota","ND","Midwest","Bismarck",["bonfire","ionwave"],"State agencies and energy-sector municipal demand."),
  st("ohio","Ohio","OH","Midwest","Columbus",["ohio-procurement","bonfire","demandstar"],"State agencies, universities and a deep municipal base."),
  st("oklahoma","Oklahoma","OK","South","Oklahoma City",["bonfire","ionwave"],"State agencies plus municipal and tribal buyers."),
  st("oregon","Oregon","OR","West","Salem",["oregonbuys","bonfire"],"OregonBuys state system plus Portland-metro demand."),
  st("pennsylvania","Pennsylvania","PA","Northeast","Harrisburg",["emarketplace","bidnet-direct","bonfire"],"PA eMarketplace plus dense municipal and school buyers."),
  st("rhode-island","Rhode Island","RI","Northeast","Providence",["ri-ocean-state","bidnet-direct","bonfire"],"Ocean State Procures plus municipal buyers."),
  st("south-carolina","South Carolina","SC","South","Columbia",["scbo","bonfire","demandstar"],"SCBO state system plus growing coastal metros."),
  st("south-dakota","South Dakota","SD","Midwest","Pierre",["bonfire","ionwave"],"State and rural municipal procurement."),
  st("tennessee","Tennessee","TN","South","Nashville",["edison","bonfire","demandstar"],"Edison state system plus fast-growing metro buyers."),
  st("texas","Texas","TX","South","Austin",["esbd","bonfire","ionwave","demandstar"],"Electronic State Business Daily plus a vast county/municipal landscape."),
  st("utah","Utah","UT","West","Salt Lake City",["sciquest-utah","bonfire"],"State agencies and a booming Wasatch Front."),
  st("vermont","Vermont","VT","Northeast","Montpelier",["bidnet-direct","bonfire"],"State and small-municipal procurement."),
  st("virginia","Virginia","VA","South","Richmond",["eva","bonfire","demandstar"],"eVA state system plus dense Northern Virginia demand."),
  st("washington","Washington","WA","West","Olympia",["webs","bonfire","opengov"],"WEBS state system plus Seattle-metro buyers."),
  st("west-virginia","West Virginia","WV","South","Charleston",["wvoasis","bonfire"],"wvOASIS state system plus municipal demand."),
  st("wisconsin","Wisconsin","WI","Midwest","Madison",["vendornet","bonfire","demandstar"],"VendorNet state system plus municipal and education buyers."),
  st("wyoming","Wyoming","WY","West","Cheyenne",["wyoming-procurement","bonfire"],"State agencies and energy-sector municipal demand."),
];

export const REGIONS: State["region"][] = ["Northeast", "Midwest", "South", "West"];

export function getProvince(slug: string) {
  return PROVINCES.find((p) => p.slug === slug);
}
export function getState(slug: string) {
  return STATES.find((s) => s.slug === slug);
}

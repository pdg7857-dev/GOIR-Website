/**
 * Industry data for the /industries landing pages. Each entry carries enough
 * texture for a genuinely useful page (where the work lives, what buyers ask
 * for, the codes that matter, the way opportunities get missed) rather than a
 * thin template.
 */

export type Industry = {
  slug: string;
  name: string;
  /** "construction companies", used mid-sentence. */
  plural: string;
  primary: boolean;
  oneLiner: string;
  keywords: string[];
  /** Plain-language buyer types that issue this work. */
  buyers: string[];
  /** Typical solicitation categories you will actually see. */
  workTypes: string[];
  /** The codes a buyer files this under (NAICS / UNSPSC families). */
  codes: string[];
  /** How opportunities in this trade slip past contractors. */
  missedBecause: string[];
  /** Platform slugs where this work shows up most. */
  platforms: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    plural: "construction companies",
    primary: true,
    oneLiner:
      "General and trade contractors bidding public buildings, roads, renovations and capital projects.",
    keywords: [
      "construction government contracts", "government construction bids",
      "public construction tenders", "general contractor government contracts",
    ],
    buyers: ["School boards and districts", "Municipalities and counties", "Provincial and state agencies", "Federal departments", "Universities and colleges", "Hospitals and health authorities"],
    workTypes: ["New builds and additions", "Renovations and retrofits", "Roads, sitework and paving", "Roofing and envelope", "Demolition and abatement", "Design-build packages"],
    codes: ["NAICS 236, 237, 238", "UNSPSC 72xx (building & facility construction)"],
    missedBecause: [
      "Capital projects are posted on a municipal portal you do not check daily",
      "Addenda quietly change scope or move the closing date after you saw the first notice",
      "The title says \"facility upgrade\" when it is really the trade you specialize in",
      "Mandatory site meetings are buried on page 14 of the documents",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "bids-and-tenders", "bonfire", "planetbids", "bidnet-direct"],
  },
  {
    slug: "janitorial",
    name: "Janitorial",
    plural: "janitorial companies",
    primary: true,
    oneLiner:
      "Commercial cleaning contractors bidding recurring custodial work for public buildings and schools.",
    keywords: [
      "janitorial government contracts", "government cleaning contracts",
      "custodial services bids", "commercial cleaning government tenders",
    ],
    buyers: ["School boards and districts", "Municipalities", "Provincial and state agencies", "Federal buildings", "Transit authorities", "Libraries and rec centres"],
    workTypes: ["Daily custodial services", "Floor care and carpet programs", "Window cleaning", "Post-construction cleaning", "Day porter and event cleaning", "Disinfection programs"],
    codes: ["NAICS 561720", "UNSPSC 7610xx (cleaning & janitorial services)"],
    missedBecause: [
      "Custodial RFPs run on multi-year cycles you cannot time without watching every buyer",
      "Square-footage and frequency tables that decide pricing sit in an appendix",
      "Wage-rate and prevailing-wage requirements are easy to miss until they sink your number",
      "Re-bids of incumbent contracts surface with little warning",
    ],
    platforms: ["merx", "bidnet-direct", "biddingo", "bids-and-tenders", "demandstar", "bonfire"],
  },
  {
    slug: "facilities-maintenance",
    name: "Facilities Maintenance",
    plural: "facilities maintenance companies",
    primary: true,
    oneLiner:
      "Integrated and trade-specific maintenance providers bidding building-operations contracts.",
    keywords: [
      "facilities maintenance government contracts", "building maintenance bids",
      "facility management government tenders", "preventive maintenance contracts",
    ],
    buyers: ["Property and real-estate divisions", "School boards", "Municipalities", "Health authorities", "Federal real property", "Airports and transit"],
    workTypes: ["Integrated facilities management", "Preventive maintenance programs", "On-demand repair", "Building automation service", "Grounds and snow bundled with FM", "Life-safety inspections"],
    codes: ["NAICS 561210, 238xxx", "UNSPSC 72101xxx (building maintenance)"],
    missedBecause: [
      "Bundled FM scopes hide your trade inside a larger package",
      "Multi-site contracts list locations in a separate spreadsheet attachment",
      "Service-level and response-time terms decide feasibility and are easy to skim past",
      "Renewals get re-competed on schedules you cannot predict from one portal",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "jaggaer", "bonfire", "gsa-ebuy"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    plural: "HVAC contractors",
    primary: false,
    oneLiner: "Mechanical contractors bidding heating, ventilation, cooling and controls work.",
    keywords: ["hvac government contracts", "government hvac bids", "mechanical contractor tenders"],
    buyers: ["School boards", "Municipalities", "Health authorities", "Federal buildings", "Universities"],
    workTypes: ["Equipment replacement", "Controls and BAS upgrades", "Preventive maintenance", "Ventilation and IAQ projects", "Chiller and boiler work"],
    codes: ["NAICS 238220", "UNSPSC 7211xx, 401xx"],
    missedBecause: [
      "HVAC scope is often a line item inside a larger building project",
      "Energy-retrofit programs use language that does not say \"HVAC\"",
      "Manufacturer or controls-standard requirements can quietly disqualify you",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "bonfire", "planetbids"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    plural: "electrical contractors",
    primary: false,
    oneLiner: "Electrical contractors bidding power, lighting, low-voltage and systems work.",
    keywords: ["electrical government contracts", "government electrical bids", "electrical contractor tenders"],
    buyers: ["School boards", "Municipalities", "State and provincial agencies", "Federal real property", "Transit and airports"],
    workTypes: ["Service upgrades", "Lighting and LED retrofits", "Fire alarm and life safety", "Low-voltage and data", "Generator and standby power"],
    codes: ["NAICS 238210", "UNSPSC 7211xx, 39xx"],
    missedBecause: [
      "Lighting retrofits are filed under energy or sustainability, not electrical",
      "Low-voltage scope rides inside security or IT solicitations",
      "Certification and licensing requirements differ by jurisdiction",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "bonfire", "ionwave"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    plural: "plumbing contractors",
    primary: false,
    oneLiner: "Plumbing and mechanical contractors bidding water, drainage and fixture work.",
    keywords: ["plumbing government contracts", "government plumbing bids", "plumbing contractor tenders"],
    buyers: ["School boards", "Municipalities", "Health authorities", "Federal buildings", "Water and wastewater utilities"],
    workTypes: ["Fixture replacement programs", "Water and drainage repair", "Backflow and testing", "Lead-line and water-quality projects", "Mechanical room upgrades"],
    codes: ["NAICS 238220", "UNSPSC 7211xx, 401xx"],
    missedBecause: [
      "Water-quality and lead-line work is posted under public-health programs",
      "Fixture upgrades hide inside renovation packages",
      "Backflow and testing contracts run on quiet annual cycles",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "bonfire", "bids-and-tenders"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    plural: "landscaping and grounds companies",
    primary: false,
    oneLiner: "Grounds, landscape and snow contractors bidding seasonal and year-round work.",
    keywords: ["landscaping government contracts", "grounds maintenance bids", "snow removal government contracts"],
    buyers: ["Municipalities and parks", "School boards", "Transportation departments", "Universities", "Housing authorities"],
    workTypes: ["Grounds maintenance", "Snow and ice management", "Tree and turf programs", "Irrigation", "Landscape construction"],
    codes: ["NAICS 561730", "UNSPSC 7011xx"],
    missedBecause: [
      "Snow contracts post in late summer for the coming winter, easy to miss off-season",
      "Grounds work bundles with facilities or parks scopes",
      "Multi-site route lists live in spreadsheet attachments",
    ],
    platforms: ["bidnet-direct", "bids-and-tenders", "demandstar", "planetbids", "bonfire"],
  },
  {
    slug: "security",
    name: "Security",
    plural: "security services companies",
    primary: false,
    oneLiner: "Guard, electronic-security and monitoring providers bidding public-sector contracts.",
    keywords: ["security guard government contracts", "security services bids", "physical security government tenders"],
    buyers: ["Municipalities", "School boards", "Transit authorities", "Federal facilities", "Hospitals"],
    workTypes: ["Guard services", "Access control and CCTV", "Monitoring", "Event and transit security", "Security assessments"],
    codes: ["NAICS 561612, 561621", "UNSPSC 9210xx, 461xx"],
    missedBecause: [
      "Electronic-security scope hides inside construction or IT projects",
      "Guard contracts re-compete on staggered multi-year cycles",
      "Clearance and licensing requirements vary by jurisdiction",
    ],
    platforms: ["sam-gov", "merx", "bidnet-direct", "gsa-ebuy", "bonfire"],
  },
  {
    slug: "engineering",
    name: "Engineering",
    plural: "engineering firms",
    primary: false,
    oneLiner: "Consulting engineers and design firms responding to RFQs and qualifications-based selections.",
    keywords: ["engineering government contracts", "engineering rfq government", "consulting engineer tenders"],
    buyers: ["Municipalities", "Transportation departments", "Water utilities", "Federal agencies", "School boards"],
    workTypes: ["Civil and structural design", "Mechanical and electrical design", "Studies and assessments", "Construction administration", "Standing-offer rosters"],
    codes: ["NAICS 5413xx", "UNSPSC 8110xx"],
    missedBecause: [
      "Qualifications-based RFQs have short windows and heavy submission rules",
      "Standing-offer rosters open briefly and rarely re-open",
      "Sub-consulting opportunities sit inside larger prime solicitations",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "bonfire", "opengov"],
  },
  {
    slug: "environmental",
    name: "Environmental Services",
    plural: "environmental services companies",
    primary: false,
    oneLiner: "Remediation, abatement and environmental contractors bidding regulated public work.",
    keywords: ["environmental government contracts", "remediation government bids", "abatement contracts government"],
    buyers: ["Municipalities", "Provincial and state environment agencies", "Federal real property", "School boards", "Transportation departments"],
    workTypes: ["Site remediation", "Hazardous-material abatement", "Environmental assessments", "Waste and recycling", "Spill response"],
    codes: ["NAICS 562xxx, 5416xx", "UNSPSC 7711xx"],
    missedBecause: [
      "Abatement rides inside demolition and renovation packages",
      "Regulatory thresholds change who is eligible to bid",
      "Emergency and standing-offer work posts with little notice",
    ],
    platforms: ["merx", "canadabuys", "sam-gov", "bonfire", "bidnet-direct"],
  },
  {
    slug: "industrial-supplies",
    name: "Industrial Supplies",
    plural: "industrial suppliers",
    primary: true,
    oneLiner: "Distributors and suppliers bidding commodity, equipment and consumable contracts.",
    keywords: ["industrial supplies government contracts", "government supply contracts", "industrial distributor bids"],
    buyers: ["Public works departments", "School boards", "Health authorities", "Federal agencies", "Utilities"],
    workTypes: ["Standing offers and supply arrangements", "Equipment and parts", "Consumables", "Catalogue and punch-out awards", "Just-in-time supply"],
    codes: ["NAICS 423xxx, 424xxx", "UNSPSC broad commodity families"],
    missedBecause: [
      "Supply arrangements award once and run for years if you miss the window",
      "Line-item commodity lists hide inside long attachments",
      "Catalogue and punch-out setups favour incumbents unless you are watching",
    ],
    platforms: ["canadabuys", "sam-gov", "gsa-ebuy", "sap-ariba", "jaggaer", "demandstar"],
  },
  {
    slug: "mro",
    name: "MRO Supplies",
    plural: "MRO suppliers",
    primary: true,
    oneLiner: "Maintenance, repair and operations suppliers bidding recurring public-sector supply work.",
    keywords: ["mro government contracts", "mro supplier government", "maintenance repair operations bids"],
    buyers: ["Facilities divisions", "School boards", "Transit and fleet", "Federal real property", "Health authorities"],
    workTypes: ["MRO supply arrangements", "Fleet and parts", "Safety and PPE", "Tools and hardware", "Vendor-managed inventory"],
    codes: ["NAICS 423xxx, 424xxx", "UNSPSC 31xx, 46xx, 27xx"],
    missedBecause: [
      "MRO contracts award as multi-year standing offers, easy to miss once",
      "Category bundles span dozens of commodity codes",
      "Catalogue refreshes and renewals favour the incumbent unless monitored",
    ],
    platforms: ["canadabuys", "sam-gov", "gsa-ebuy", "sap-ariba", "ionwave", "demandstar"],
  },
];

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);
export const PRIMARY_INDUSTRIES = INDUSTRIES.filter((i) => i.primary);

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

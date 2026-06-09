/**
 * Single source of truth for brand, contact, navigation, pricing and
 * social-proof placeholders. Personal site for Phil Dave.
 *
 * Anything a future operator might want to rename (brand name, email,
 * booking URL, prices) lives here so it can be changed in one place.
 */

export const SITE = {
  // Brand wordmark shown in the header/footer.
  brand: "Phil Dave",
  brandFull: "Phil Dave",
  // The person who runs the practice (used in first-person copy and schema).
  person: "Phil Dave",
  tagline: "Government Opportunity Intelligence",
  // First-person promise that runs through the whole site.
  promise: "You focus on winning contracts. I focus on finding them.",
  // Canonical origin. Apex domain, set phildave.com as the Primary Domain in
  // Vercel so www.phildave.com redirects here.
  domain: "https://phildave.com",
  email: "phil@phildave.com",
  // Internal booking page (renders the Calendly embed below). All CTAs point here.
  bookingUrl: "/book",
  // Phil Dave's Calendly scheduling link, embedded on /book.
  calendlyUrl: "https://calendly.com/pdg7857/phil-dave-government-opportunity-intelligence",
  sampleUrl: "/sample-opportunity",
  // 2-minute overview video. Paste the 11-char unlisted-YouTube video ID here
  // (from youtu.be/XXXXXXXXXXX) and the video section appears automatically.
  youtubeId: "25cfoJsZ0QA",
  // Year Phil Dave started working in government procurement.
  sectorSince: 2023,
} as const;

/**
 * GOIR lead-magnet master switch.
 *
 * OFF (default): the interactive report is hidden, /report, /report/[id] and
 * /access redirect to the booking page, and every "free report" CTA points to
 * booking instead. The SEO/marketing pages stay up. Flip back on by setting
 * NEXT_PUBLIC_GOIR_ENABLED="true" in the environment (no code change).
 */
export const GOIR_ENABLED = process.env.NEXT_PUBLIC_GOIR_ENABLED === "true";

/**
 * The interactive GOIR assessment lives on this same site at /report.
 * REPORT_LANDING is the SEO explainer page; REPORT_URL is where the primary
 * CTAs send people. While the lead magnet is OFF, CTAs go to booking.
 */
export const REPORT_LANDING = "/government-opportunity-intelligence-report";
export const REPORT_URL = GOIR_ENABLED
  ? process.env.NEXT_PUBLIC_REPORT_URL || "/report"
  : SITE.bookingUrl;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Services",
    href: "/government-opportunity-intelligence",
    children: [
      { label: "Government Opportunity Intelligence", href: "/government-opportunity-intelligence" },
      { label: "Government Bid Monitoring", href: "/government-bid-monitoring" },
      { label: "Government Bid Alerts", href: "/government-bid-alerts" },
      { label: "Bid Qualification", href: "/government-bid-qualification" },
      { label: "Bid / No-Bid Analysis", href: "/bid-no-bid-analysis" },
      { label: "Tender Review Service", href: "/tender-review-service" },
      { label: "Opportunity Screening", href: "/opportunity-screening" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    label: "Platforms",
    href: "/platforms",
    children: [
      { label: "MERX Expert", href: "/merx-expert" },
      { label: "BidNet Direct Expert", href: "/bidnet-direct-expert" },
      { label: "CanadaBuys Expert", href: "/canadabuys-expert" },
      { label: "SAM.gov Expert", href: "/sam-gov-expert" },
      { label: "All platforms", href: "/platforms" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Construction", href: "/construction-government-contracts" },
      { label: "Janitorial", href: "/janitorial-government-contracts" },
      { label: "Facilities", href: "/facilities-government-contracts" },
      { label: "Industrial Supplies", href: "/industrial-supplies-government-contracts" },
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    label: "Renewals",
    href: "/government-contract-renewals",
    children: [
      { label: "Government Contract Renewals", href: "/government-contract-renewals" },
      { label: "Renewal Alerts", href: "/government-contract-renewal-alerts" },
      { label: "Upcoming Renewals", href: "/upcoming-government-contract-renewals" },
      { label: "Incumbent Contract Tracking", href: "/incumbent-contract-tracking" },
      { label: "Contract Expirations", href: "/government-contract-expirations" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Opportunity Waste Calculator", href: "/opportunity-waste-calculator" },
      { label: "Procurement Statistics", href: "/government-procurement-statistics" },
      { label: "The GOII Index", href: "/government-opportunity-intelligence-index" },
      { label: "Coverage map", href: "/coverage" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Government Opportunity Intelligence", href: "/government-opportunity-intelligence" },
      { label: "Bid monitoring", href: "/government-bid-monitoring" },
      { label: "Bid qualification", href: "/government-bid-qualification" },
      { label: "Bid / no-bid analysis", href: "/bid-no-bid-analysis" },
      { label: "Tender review", href: "/tender-review-service" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "MERX expert", href: "/merx-expert" },
      { label: "BidNet Direct expert", href: "/bidnet-direct-expert" },
      { label: "CanadaBuys expert", href: "/canadabuys-expert" },
      { label: "SAM.gov expert", href: "/sam-gov-expert" },
      { label: "Bonfire, Biddingo, bids&tenders...", href: "/platforms" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Construction", href: "/construction-government-contracts" },
      { label: "Janitorial", href: "/janitorial-government-contracts" },
      { label: "Facilities maintenance", href: "/facilities-government-contracts" },
      { label: "HVAC, electrical, plumbing...", href: "/industries" },
    ],
  },
  {
    title: "Renewals",
    links: [
      { label: "Contract renewals", href: "/government-contract-renewals" },
      { label: "Renewal alerts", href: "/government-contract-renewal-alerts" },
      { label: "Upcoming renewals", href: "/upcoming-government-contract-renewals" },
      { label: "Incumbent tracking", href: "/incumbent-contract-tracking" },
      { label: "Contract expirations", href: "/government-contract-expirations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Opportunity waste calculator", href: "/opportunity-waste-calculator" },
      { label: "Procurement statistics", href: "/government-procurement-statistics" },
      { label: "Coverage map", href: "/coverage" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

/**
 * Social-proof placeholders. DO NOT fabricate numbers. These are clearly
 * marked placeholders an operator fills in with verified figures before
 * launch. `value: null` renders as a neutral placeholder in the UI.
 */
export type Stat = { value: string | null; label: string; placeholder: string };

// Verifiable coverage facts (true from the site's own platform/coverage data).
// No fabricated track-record numbers.
export const SOCIAL_PROOF: Stat[] = [
  { value: "18", label: "Procurement platforms monitored", placeholder: "18" },
  { value: "12", label: "Industries served", placeholder: "12" },
  { value: "50", label: "U.S. states covered", placeholder: "50" },
  { value: "13", label: "Canadian provinces & territories", placeholder: "13" },
];

/**
 * Anonymized background credential from prior industry experience. This replaces
 * the borrowed "4.8/5 from 44 client reviews" claim, which came from a different
 * service at a former employer. See POSITIONING.md.
 *
 * The numbers are deliberately defensible: 15,000 Canada (2025) plus 2,500 US
 * (2023-2024) is more than 17,500. "Handled," not "managed." No retention rate,
 * no win rate, no employer or client names. The current-service platform count
 * (18+) is kept distinct from the past-experience account count.
 */
export const BACKGROUND = {
  accountsHandled: "17,500+",
  yearsInSector: "three and a half years",
  // Short trust line for inline credential badges across the site.
  credentialLine: "17,500+ contractor accounts handled across Canada and the US",
  // The three-point background strip from POSITIONING.md.
  points: [
    "17,500+ contractor accounts handled across Canada and the US",
    "A portfolio of major procurement platforms, learned from the inside",
    "18+ platforms monitored for clients today",
  ],
} as const;

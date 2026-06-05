/**
 * Blog topic registry. The single source of truth for every blog post on the
 * site. Each topic renders both on the /blog index and at /blog/[slug].
 *
 * Voice: first-person Phil. Phil finds and qualifies government opportunities;
 * he does not write proposals or submit bids. Excerpts and titles reflect that.
 */

export type BlogCategory =
  | "Platforms"
  | "Industries"
  | "States"
  | "Provinces"
  | "Statistics"
  | "Bid qualification"
  | "Opportunity monitoring"
  | "Government procurement"
  | "Competition"
  | "No-bid analysis"
  | "Contract awards";

export type BlogTopic = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
};

/** Display order for category sections on the index. */
export const BLOG_CATEGORIES: BlogCategory[] = [
  "Platforms",
  "Industries",
  "States",
  "Provinces",
  "Statistics",
  "Bid qualification",
  "Opportunity monitoring",
  "Government procurement",
  "Competition",
  "No-bid analysis",
  "Contract awards",
];

export const BLOG_TOPICS: BlogTopic[] = [
  // ---------------------------------------------------------------- Platforms (20)
  {
    slug: "merx-complete-guide",
    title: "MERX: The Complete Guide to Canada's Largest Tender Portal (2026)",
    category: "Platforms",
    excerpt:
      "I live in MERX every day, so here is how it actually works: where the good opportunities hide, which notification settings miss things, and how I read a posting before deciding if it is worth your time.",
  },
  {
    slug: "bidnet-direct-explained",
    title: "BidNet Direct Explained: How Regional Bid Networks Really Work",
    category: "Platforms",
    excerpt:
      "BidNet Direct stitches together hundreds of local agencies. I show you how the regional networks overlap, where registration gets you free access, and what the paid tiers actually change.",
  },
  {
    slug: "canadabuys-guide",
    title: "CanadaBuys: A Practical Guide to the Federal Tender System",
    category: "Platforms",
    excerpt:
      "CanadaBuys replaced Buyandsell, and the migration left a lot of people confused. I walk through how I monitor federal opportunities there without drowning in irrelevant notices.",
  },
  {
    slug: "sam-gov-for-beginners",
    title: "SAM.gov for Beginners: Registration, Search and Daily Monitoring",
    category: "Platforms",
    excerpt:
      "SAM.gov is the front door to U.S. federal contracting and it is not friendly. Here is how I register, search and qualify federal opportunities without missing the ones that matter.",
  },
  {
    slug: "merx-vs-bidnet-direct",
    title: "MERX vs BidNet Direct: Which Canadian Portal Should You Watch?",
    category: "Platforms",
    excerpt:
      "They overlap more than people think, and they miss each other in ways that cost you bids. I compare coverage, notifications and pricing so you know which one (or both) you need.",
  },
  {
    slug: "bonfire-portal-guide",
    title: "How Bonfire Works: A Buyer-Side Portal You Need to Monitor",
    category: "Platforms",
    excerpt:
      "Bonfire is built for the buyer, not the vendor, which is exactly why opportunities slip past on it. I explain how I track agencies that run their procurements through Bonfire.",
  },
  {
    slug: "biddingo-guide",
    title: "Biddingo: Monitoring Ontario's MASH Sector Opportunities",
    category: "Platforms",
    excerpt:
      "Municipalities, academic institutions, school boards and hospitals run a lot of work through Biddingo. Here is how I keep eyes on the MASH sector without checking five portals a day.",
  },
  {
    slug: "bids-and-tenders-guide",
    title: "bids&tenders: How Canadian Municipalities Post (and Hide) Work",
    category: "Platforms",
    excerpt:
      "bids&tenders powers procurement for a huge swath of Canadian cities and towns. I break down how each instance is configured differently and what that means for catching opportunities.",
  },
  {
    slug: "jaggaer-procurement-guide",
    title: "JAGGAER for Vendors: What the Supplier Portal Actually Does",
    category: "Platforms",
    excerpt:
      "JAGGAER runs sourcing for large public buyers, and the supplier experience is its own learning curve. I cover what to register for and how I watch it for live solicitations.",
  },
  {
    slug: "sap-ariba-public-sector",
    title: "SAP Ariba in the Public Sector: A Vendor's Field Guide",
    category: "Platforms",
    excerpt:
      "Ariba is enterprise procurement software that public buyers also use. I explain the network, the registration friction, and how I separate real opportunities from noise.",
  },
  {
    slug: "planetbids-explained",
    title: "PlanetBids Explained: California Agencies and Beyond",
    category: "Platforms",
    excerpt:
      "PlanetBids is everywhere in California public works. I show you how vendor profiles, commodity codes and bid notifications fit together so the right opportunities reach you.",
  },
  {
    slug: "opengov-procurement-guide",
    title: "OpenGov Procurement: How Modern Local Buyers Run Bids",
    category: "Platforms",
    excerpt:
      "OpenGov is winning a lot of city and county procurement teams. I explain how the portal works for vendors and how I monitor the agencies migrating to it.",
  },
  {
    slug: "demandstar-guide",
    title: "DemandStar: Is the Paid Tier Worth It for Bid Notifications?",
    category: "Platforms",
    excerpt:
      "DemandStar aggregates a lot of local government work and charges for broader reach. I lay out what the free and paid levels cover and how I treat it inside a wider monitoring setup.",
  },
  {
    slug: "ionwave-bid-portal",
    title: "IonWave Bid Portals: A Guide for Texas and Midwest Vendors",
    category: "Platforms",
    excerpt:
      "IonWave powers procurement for a lot of school districts and municipalities. I cover registration, document downloads and how I keep these scattered instances on one radar.",
  },
  {
    slug: "govwin-iq-guide",
    title: "GovWin IQ: Is It Worth It, and What It Cannot Tell You",
    category: "Platforms",
    excerpt:
      "GovWin sells pre-RFP intelligence on federal and SLED work. I give an honest read on what it is good for, what it overstates, and why coverage still needs a human reading the documents.",
  },
  {
    slug: "periscope-bidsync-guide",
    title: "Periscope and BidSync: Tracking SLED Opportunities at Scale",
    category: "Platforms",
    excerpt:
      "Periscope's network reaches a lot of state and local buyers. Here is how I use it for state, local and education (SLED) monitoring without trusting it as the only source.",
  },
  {
    slug: "gsa-ebuy-guide",
    title: "GSA eBuy: How Schedule Holders Get RFQs (and Miss Them)",
    category: "Platforms",
    excerpt:
      "If you hold a GSA Schedule, eBuy is where the targeted RFQs land. I explain how the system routes opportunities by SIN and why so many holders never see the ones meant for them.",
  },
  {
    slug: "usaspending-research-guide",
    title: "Using USAspending.gov to Research Buyers Before You Bid",
    category: "Platforms",
    excerpt:
      "USAspending is a goldmine for understanding who buys what, from whom, and for how much. I show you how I use award history to judge whether an opportunity is realistic.",
  },
  {
    slug: "procurement-platform-overload",
    title: "Why There Are 18+ Government Procurement Platforms (and What to Do)",
    category: "Platforms",
    excerpt:
      "There is no single front door to government work, and that fragmentation is the whole problem. I explain why the landscape looks this way and how I consolidate it into one feed.",
  },

  // ---------------------------------------------------------------- Industries (15)
  {
    slug: "government-construction-contracts-guide",
    title: "How to Find Government Construction Contracts Across Canada and the U.S.",
    category: "Industries",
    excerpt:
      "Construction is posted across more portals than almost any other trade. I walk through where public construction work appears and how I qualify a project before you chase it.",
  },
  {
    slug: "janitorial-government-contracts",
    title: "Winning Government Janitorial Contracts: Where the Work Is Posted",
    category: "Industries",
    excerpt:
      "Public buyers tender cleaning and custodial work constantly, often on a recurring cycle. I show you how I track janitorial RFPs and read the scope before recommending a bid.",
  },
  {
    slug: "facilities-maintenance-contracts",
    title: "Facilities Maintenance Contracts: A Guide to Public-Sector Demand",
    category: "Industries",
    excerpt:
      "Facilities maintenance covers a wide scope and a lot of recurring spend. Here is how I separate genuine multi-year opportunities from one-off repairs in the postings.",
  },
  {
    slug: "hvac-government-bids",
    title: "HVAC Government Bids: Service, Retrofit and New-Build Opportunities",
    category: "Industries",
    excerpt:
      "Public buildings need heating and cooling work on every cycle imaginable. I explain how I categorize HVAC opportunities and qualify which ones are realistic for your shop.",
  },
  {
    slug: "electrical-contractor-government-work",
    title: "Government Work for Electrical Contractors: Finding the Right Bids",
    category: "Industries",
    excerpt:
      "Electrical scopes show up inside construction packages and as standalone service contracts. I cover how I find both and how I read the documents for fit before you invest time.",
  },
  {
    slug: "plumbing-government-contracts",
    title: "Plumbing Contracts in the Public Sector: A Practical Overview",
    category: "Industries",
    excerpt:
      "Plumbing work is steady in government, but it is buried in larger solicitations. I show you how I surface the standalone opportunities and qualify the scope.",
  },
  {
    slug: "landscaping-grounds-maintenance-contracts",
    title: "Landscaping and Grounds Maintenance Government Contracts",
    category: "Industries",
    excerpt:
      "Parks, schools and facilities tender seasonal and multi-year grounds work. I explain how I track these recurring contracts and judge whether the terms suit your operation.",
  },
  {
    slug: "security-services-government-bids",
    title: "Security Services Government Bids: Guarding, Systems and Monitoring",
    category: "Industries",
    excerpt:
      "Security covers manned guarding, electronic systems and monitoring, and buyers tender them differently. I break down how I categorize and qualify each kind of opportunity.",
  },
  {
    slug: "engineering-services-government-rfps",
    title: "Engineering Services Government RFPs: How to Spot the Fit",
    category: "Industries",
    excerpt:
      "Engineering RFPs lean on qualifications and methodology, not just price. I explain what I read for in the documents and how I judge whether your firm matches the evaluation.",
  },
  {
    slug: "environmental-services-contracts",
    title: "Environmental Services Contracts: Remediation, Testing and Compliance",
    category: "Industries",
    excerpt:
      "Environmental work spans remediation, monitoring and compliance, often with strict certifications. Here is how I qualify these opportunities against what your firm can actually deliver.",
  },
  {
    slug: "industrial-supplies-government-contracts",
    title: "Selling Industrial Supplies to Government: Where Opportunities Hide",
    category: "Industries",
    excerpt:
      "Supplies move through standing offers, catalogs and one-time RFQs. I show you how I monitor each channel so you stop missing the recurring orders that add up.",
  },
  {
    slug: "mro-government-contracts",
    title: "MRO Government Contracts: Maintenance, Repair and Operations Demand",
    category: "Industries",
    excerpt:
      "MRO buying is high-volume and easy to miss because it rarely looks glamorous in a posting. I explain how I catch these opportunities and qualify the recurring ones.",
  },
  {
    slug: "snow-removal-government-contracts",
    title: "Snow Removal Government Contracts: Seasonal Bids Worth Watching",
    category: "Industries",
    excerpt:
      "Snow and ice management is tendered on a tight seasonal window across northern jurisdictions. I cover when these post and how I qualify route-based scopes for your equipment.",
  },
  {
    slug: "it-services-government-contracts",
    title: "IT Services Government Contracts: Beyond the Big Federal Awards",
    category: "Industries",
    excerpt:
      "Most public IT spend is not the headline federal contract. I show you how I find the mid-size and local IT opportunities and qualify them against your capabilities.",
  },
  {
    slug: "professional-services-government-rfps",
    title: "Professional Services Government RFPs: Consulting, Training and More",
    category: "Industries",
    excerpt:
      "Professional services RFPs are won on methodology and team. I explain how I read the evaluation criteria and qualify whether your firm is a credible fit before you commit.",
  },

  // ---------------------------------------------------------------- States (12)
  {
    slug: "california-government-contracts-guide",
    title: "California Government Contracts: Where to Find State and Local Bids",
    category: "States",
    excerpt:
      "California's procurement is split across Cal eProcure, PlanetBids instances and hundreds of local agencies. I map where the work lives and how I monitor it as one feed.",
  },
  {
    slug: "texas-government-contracts-guide",
    title: "Texas Government Contracts: A Guide to State and Local Procurement",
    category: "States",
    excerpt:
      "Texas runs the ESBD plus a sprawl of district and city portals. Here is how I cover state and local opportunities without missing the IonWave-driven school work.",
  },
  {
    slug: "florida-government-contracts-guide",
    title: "Florida Government Contracts: MyFloridaMarketPlace and Local Bids",
    category: "States",
    excerpt:
      "Florida centralizes a lot through MyFloridaMarketPlace, but counties and cities do their own thing. I explain how I track both layers for the trades I cover.",
  },
  {
    slug: "new-york-government-contracts-guide",
    title: "New York Government Contracts: State, City and Authority Procurement",
    category: "States",
    excerpt:
      "New York has the state system, NYC's own portals and a thicket of public authorities. I walk through how I monitor all three so opportunities do not slip through the gaps.",
  },
  {
    slug: "pennsylvania-government-contracts-guide",
    title: "Pennsylvania Government Contracts: eMarketplace and COSTARS",
    category: "States",
    excerpt:
      "Pennsylvania's eMarketplace and the COSTARS cooperative open a lot of doors. I show you how I use them and where local procurement still posts outside the state system.",
  },
  {
    slug: "illinois-government-contracts-guide",
    title: "Illinois Government Contracts: BidBuy and Local Opportunities",
    category: "States",
    excerpt:
      "Illinois runs state buying through BidBuy while municipalities and schools post elsewhere. Here is how I keep the whole picture on one radar for my clients.",
  },
  {
    slug: "ohio-government-contracts-guide",
    title: "Ohio Government Contracts: Where State and Local Work Is Posted",
    category: "States",
    excerpt:
      "Ohio's procurement spreads across state systems and a long list of local portals. I explain how I monitor it so the recurring trade work reaches you on time.",
  },
  {
    slug: "georgia-government-contracts-guide",
    title: "Georgia Government Contracts: The Georgia Procurement Registry",
    category: "States",
    excerpt:
      "Georgia's registry is the starting point, but it is far from the whole story. I cover how I track state, county and city opportunities across the trades I follow.",
  },
  {
    slug: "north-carolina-government-contracts-guide",
    title: "North Carolina Government Contracts: eVP and Local Procurement",
    category: "States",
    excerpt:
      "North Carolina's electronic Vendor Portal handles state buying while locals run their own bids. I show how I qualify opportunities across both for my clients.",
  },
  {
    slug: "michigan-government-contracts-guide",
    title: "Michigan Government Contracts: SIGMA VSS and Beyond",
    category: "States",
    excerpt:
      "Michigan routes state procurement through SIGMA VSS, with municipalities and schools posting separately. Here is how I consolidate the view and read for fit.",
  },
  {
    slug: "virginia-government-contracts-guide",
    title: "Virginia Government Contracts: eVA and the Local Layer",
    category: "States",
    excerpt:
      "Virginia's eVA is one of the more centralized systems, but coverage still leaks at the local level. I explain how I monitor it and qualify the opportunities worth your time.",
  },
  {
    slug: "washington-government-contracts-guide",
    title: "Washington State Government Contracts: WEBS and Local Bids",
    category: "States",
    excerpt:
      "Washington uses WEBS for state registration while cities and counties run their own portals. I cover how I track both and qualify the trade opportunities that come up.",
  },

  // ---------------------------------------------------------------- Provinces (10)
  {
    slug: "ontario-government-contracts-guide",
    title: "Ontario Government Contracts: Where Provincial and MASH Work Lives",
    category: "Provinces",
    excerpt:
      "Ontario spreads tenders across the provincial system, Biddingo and a long list of municipal portals. I explain how I cover provincial and MASH-sector work as one feed.",
  },
  {
    slug: "quebec-government-contracts-guide",
    title: "Quebec Government Contracts: A Guide to SEAO Opportunities",
    category: "Provinces",
    excerpt:
      "SEAO is the hub for Quebec public tenders, and it has its own rules and language. Here is how I monitor it and qualify opportunities for clients bidding into the province.",
  },
  {
    slug: "british-columbia-government-contracts-guide",
    title: "British Columbia Government Contracts: BC Bid and Local Procurement",
    category: "Provinces",
    excerpt:
      "BC Bid anchors provincial procurement while municipalities and health authorities post elsewhere. I show you how I keep the whole picture covered.",
  },
  {
    slug: "alberta-government-contracts-guide",
    title: "Alberta Government Contracts: Alberta Purchasing Connection Explained",
    category: "Provinces",
    excerpt:
      "The Alberta Purchasing Connection is the starting point, but it is not the finish line. I explain how I track provincial, municipal and institutional work across the province.",
  },
  {
    slug: "manitoba-government-contracts-guide",
    title: "Manitoba Government Contracts: MERX, MERX and More MERX",
    category: "Provinces",
    excerpt:
      "Manitoba leans heavily on MERX for public tenders, with locals scattered around it. Here is how I monitor the province and qualify what is genuinely worth bidding.",
  },
  {
    slug: "saskatchewan-government-contracts-guide",
    title: "Saskatchewan Government Contracts: SaskTenders and Local Bids",
    category: "Provinces",
    excerpt:
      "SaskTenders carries provincial postings while cities and Crown corporations run their own. I cover how I watch all of it for the trades I follow.",
  },
  {
    slug: "nova-scotia-government-contracts-guide",
    title: "Nova Scotia Government Contracts: A Guide to Provincial Procurement",
    category: "Provinces",
    excerpt:
      "Nova Scotia's procurement is smaller but no less fragmented across provincial and municipal sources. I explain how I qualify opportunities here for my clients.",
  },
  {
    slug: "new-brunswick-government-contracts-guide",
    title: "New Brunswick Government Contracts: Where to Watch for Bids",
    category: "Provinces",
    excerpt:
      "New Brunswick posts across provincial systems and a handful of municipal portals. Here is how I keep eyes on it without checking each one by hand.",
  },
  {
    slug: "newfoundland-government-contracts-guide",
    title: "Newfoundland and Labrador Government Contracts: A Practical Guide",
    category: "Provinces",
    excerpt:
      "Public tendering in Newfoundland and Labrador runs through provincial and local channels. I cover how I monitor them and read the documents for fit.",
  },
  {
    slug: "atlantic-canada-government-contracts",
    title: "Atlantic Canada Government Contracts: Watching Four Provinces at Once",
    category: "Provinces",
    excerpt:
      "If you bid across the Atlantic provinces, the portal sprawl multiplies fast. I explain how I cover the region as one picture instead of four separate searches.",
  },

  // ---------------------------------------------------------------- Statistics (8)
  {
    slug: "government-contracting-by-the-numbers",
    title: "Government Contracting by the Numbers: What the Spending Data Shows",
    category: "Statistics",
    excerpt:
      "Public buyers spend enormous sums every year, and the data is more accessible than people assume. I walk through what the published figures tell you about where the work is.",
  },
  {
    slug: "how-much-government-spends-on-contracts",
    title: "How Much Do Governments Actually Spend on Contracts Each Year?",
    category: "Statistics",
    excerpt:
      "I pull from public award data to put real context around contract spending, and explain why the headline numbers can mislead you about your own opportunity.",
  },
  {
    slug: "small-business-government-contracting-stats",
    title: "Small Business Government Contracting: What the Numbers Reveal",
    category: "Statistics",
    excerpt:
      "There are set-asides and goals, and there is what actually gets awarded. I look at what the public data says about small-business participation and how to read it honestly.",
  },
  {
    slug: "average-number-of-bidders-per-contract",
    title: "How Many Bidders Compete for a Typical Government Contract?",
    category: "Statistics",
    excerpt:
      "Competition varies wildly by scope, region and dollar value. I explain what award records reveal about bidder counts and what that means for your odds.",
  },
  {
    slug: "government-contract-award-trends",
    title: "Government Contract Award Trends Worth Tracking This Year",
    category: "Statistics",
    excerpt:
      "Spending patterns shift with budgets, infrastructure programs and policy. I cover the trends I watch in the public data and how they shape where I look for opportunities.",
  },
  {
    slug: "procurement-cycle-timing-data",
    title: "When Do Governments Buy? Seasonal Timing in Procurement Data",
    category: "Statistics",
    excerpt:
      "Fiscal year-ends and budget cycles create predictable surges. I show you what the timing data suggests about when certain opportunities tend to appear.",
  },
  {
    slug: "set-aside-contract-statistics",
    title: "Set-Aside Contract Statistics: What the Public Record Tells Us",
    category: "Statistics",
    excerpt:
      "Set-asides shape a meaningful slice of public spending. I walk through what the published numbers show and how I factor eligibility into qualifying an opportunity.",
  },
  {
    slug: "government-contract-size-distribution",
    title: "The Size Distribution of Government Contracts (and Why It Matters)",
    category: "Statistics",
    excerpt:
      "Most public contracts are smaller than the headlines suggest, and that is good news for many vendors. I explain what the distribution looks like and how I use it to target fit.",
  },

  // ---------------------------------------------------------------- Bid qualification (10)
  {
    slug: "how-to-qualify-a-government-bid",
    title: "How to Qualify a Government Bid: My Step-by-Step Process",
    category: "Bid qualification",
    excerpt:
      "Before you spend a single hour on a proposal, the opportunity has to clear a few gates. I walk through exactly how I read a solicitation and decide whether it is worth pursuing.",
  },
  {
    slug: "reading-an-rfp-what-matters",
    title: "Reading an RFP: The Sections That Actually Decide Fit",
    category: "Bid qualification",
    excerpt:
      "An RFP can run a hundred pages, but a handful of sections tell you almost everything. I show you where I look first and why the rest can wait.",
  },
  {
    slug: "mandatory-requirements-explained",
    title: "Mandatory Requirements: The Fastest Way to Disqualify a Bid",
    category: "Bid qualification",
    excerpt:
      "Mandatories are pass or fail, and missing one wastes the whole effort. I explain how I find every mandatory in a document and check it against what you can prove.",
  },
  {
    slug: "evaluation-criteria-decoded",
    title: "Evaluation Criteria Decoded: How Buyers Actually Score Bids",
    category: "Bid qualification",
    excerpt:
      "Price is rarely the whole story. I break down how scoring schemes work and how I read them to judge whether you can realistically place high enough to win.",
  },
  {
    slug: "go-no-go-decision-framework",
    title: "The Go / No-Go Decision: A Framework for Qualifying Opportunities",
    category: "Bid qualification",
    excerpt:
      "Chasing the wrong bids is more expensive than missing them. Here is the framework I use to turn a posting into a clear go or no-go before you invest time.",
  },
  {
    slug: "bid-document-red-flags",
    title: "Red Flags in Bid Documents That Signal a Wired Contract",
    category: "Bid qualification",
    excerpt:
      "Some solicitations are written for an incumbent. I show you the language and structure I watch for so you do not pour effort into a bid that was decided before it posted.",
  },
  {
    slug: "understanding-bid-bonds-and-insurance",
    title: "Bid Bonds, Performance Bonds and Insurance: Qualifying the Requirements",
    category: "Bid qualification",
    excerpt:
      "Bonding and insurance thresholds quietly eliminate a lot of bidders. I explain how I check these early so a requirement does not sink you after you have done the work.",
  },
  {
    slug: "scope-of-work-questions-to-ask",
    title: "Scope of Work: The Questions to Ask Before You Commit",
    category: "Bid qualification",
    excerpt:
      "A vague scope hides risk and a tight scope hides opportunity. I cover the questions I ask of every scope of work to judge whether it truly fits your operation.",
  },
  {
    slug: "qualifying-incumbent-held-contracts",
    title: "Should You Bid Against an Incumbent? How I Qualify the Odds",
    category: "Bid qualification",
    excerpt:
      "An entrenched incumbent changes the math on a bid. I explain how I read award history and document signals to estimate whether a challenge is worth your effort.",
  },
  {
    slug: "small-contract-vs-large-contract-fit",
    title: "Small Contract or Large? Qualifying for the Right Size of Work",
    category: "Bid qualification",
    excerpt:
      "Bidding above your capacity is as risky as bidding below your margins. I show how I match opportunity size to what your operation can deliver and sustain.",
  },

  // ---------------------------------------------------------------- Opportunity monitoring (8)
  {
    slug: "how-to-monitor-government-opportunities",
    title: "How to Monitor Government Opportunities Without Drowning in Noise",
    category: "Opportunity monitoring",
    excerpt:
      "Most monitoring setups fail by sending you everything or nothing. I explain how I tune coverage so the right opportunities surface and the rest stay out of your inbox.",
  },
  {
    slug: "keyword-monitoring-mistakes",
    title: "Keyword Monitoring Mistakes That Make You Miss Good Bids",
    category: "Opportunity monitoring",
    excerpt:
      "Relying on a few keywords is how opportunities slip past on a technicality of wording. I cover the traps and how I monitor by intent rather than exact terms.",
  },
  {
    slug: "commodity-codes-explained",
    title: "Commodity Codes Explained: NIGP, UNSPSC and Why They Miss Things",
    category: "Opportunity monitoring",
    excerpt:
      "Codes are how portals route notifications, and they are imperfect. I explain how the major coding systems work and why I never trust codes alone to catch your opportunities.",
  },
  {
    slug: "setting-up-bid-alerts-the-right-way",
    title: "Setting Up Bid Alerts the Right Way (and Their Limits)",
    category: "Opportunity monitoring",
    excerpt:
      "Portal alerts are a start, not a strategy. I walk through how I configure them, where they fall short, and what human review adds that no alert can.",
  },
  {
    slug: "multi-platform-monitoring-strategy",
    title: "A Multi-Platform Monitoring Strategy for Vendors Who Bid Widely",
    category: "Opportunity monitoring",
    excerpt:
      "If your buyers use a dozen portals, checking them by hand does not scale. I explain how I consolidate many sources into one reviewed feed of qualified opportunities.",
  },
  {
    slug: "why-you-miss-opportunities",
    title: "Why You Keep Missing Government Opportunities (and How to Stop)",
    category: "Opportunity monitoring",
    excerpt:
      "Missed bids usually trace back to a handful of fixable gaps. I lay out the common reasons opportunities slip past and how I close each one.",
  },
  {
    slug: "amendments-and-addenda-tracking",
    title: "Tracking Amendments and Addenda: The Changes That Sink Bids",
    category: "Opportunity monitoring",
    excerpt:
      "An addendum can change the scope, the deadline or the mandatories after you start. I explain how I track every change so nothing surprises you late in the process.",
  },
  {
    slug: "monitoring-pre-solicitation-signals",
    title: "Reading Pre-Solicitation Signals Before an RFP Ever Posts",
    category: "Opportunity monitoring",
    excerpt:
      "By the time an RFP posts, the lead time is short. I cover the public signals I watch to spot demand forming before the formal opportunity appears.",
  },

  // ---------------------------------------------------------------- Government procurement (7)
  {
    slug: "how-government-procurement-works",
    title: "How Government Procurement Works: A Plain-English Overview",
    category: "Government procurement",
    excerpt:
      "Public buying follows rules that look strange until you understand the why. I give a clear overview of how procurement works so the opportunities make sense.",
  },
  {
    slug: "rfp-rfq-rfi-ifb-differences",
    title: "RFP, RFQ, RFI, IFB: What the Acronyms Mean for Your Bid",
    category: "Government procurement",
    excerpt:
      "Each solicitation type changes how you compete and how you are evaluated. I explain the differences plainly so you know what you are actually responding to.",
  },
  {
    slug: "standing-offers-and-supply-arrangements",
    title: "Standing Offers and Supply Arrangements: Recurring Revenue Explained",
    category: "Government procurement",
    excerpt:
      "Getting on the right standing offer can mean steady orders for years. I explain how these arrangements work and how I spot the ones worth qualifying for.",
  },
  {
    slug: "sole-source-and-direct-awards",
    title: "Sole-Source and Direct Awards: When Competition Is Skipped",
    category: "Government procurement",
    excerpt:
      "Not every contract goes to open competition, and that affects your strategy. I cover when buyers can sole-source and what the public record reveals about it.",
  },
  {
    slug: "trade-agreements-and-procurement-thresholds",
    title: "Trade Agreements and Procurement Thresholds: Why They Matter to You",
    category: "Government procurement",
    excerpt:
      "Thresholds under trade agreements decide how openly a contract must be tendered. I explain how this shapes which opportunities you can realistically reach.",
  },
  {
    slug: "vendor-registration-guide",
    title: "Vendor Registration: The Setup Work That Unlocks Opportunities",
    category: "Government procurement",
    excerpt:
      "Half the battle is being registered and findable before the opportunity posts. I walk through the registrations that matter and the order I tackle them in.",
  },
  {
    slug: "debriefs-and-bid-protests-explained",
    title: "Debriefs and Bid Protests: Learning From a Loss the Right Way",
    category: "Government procurement",
    excerpt:
      "A debrief is free intelligence most vendors waste. I explain how debriefs and protests work and how the lessons feed back into qualifying the next opportunity.",
  },

  // ---------------------------------------------------------------- Competition (4)
  {
    slug: "researching-your-competition-public-data",
    title: "Researching Your Competition Using Public Award Data",
    category: "Competition",
    excerpt:
      "Award records tell you who wins, where and at what scale. I show you how I use public data to understand the field before you decide to enter it.",
  },
  {
    slug: "beating-the-incumbent-realistically",
    title: "Beating the Incumbent: When It Is Realistic and When It Is Not",
    category: "Competition",
    excerpt:
      "Incumbents have real advantages and real vulnerabilities. I explain how I read the signals to estimate whether challenging one is worth your effort.",
  },
  {
    slug: "understanding-your-competitors-pricing",
    title: "Understanding Competitor Pricing From Historical Awards",
    category: "Competition",
    excerpt:
      "Past awards leak useful pricing context if you know how to read them. I cover how I use that history to set realistic expectations on an opportunity.",
  },
  {
    slug: "niche-vs-broad-bidding-strategy",
    title: "Niche or Broad? Choosing Where to Compete for Government Work",
    category: "Competition",
    excerpt:
      "Competing everywhere usually means winning nowhere. I explain how I help clients pick the lanes where their odds are genuinely strongest.",
  },

  // ---------------------------------------------------------------- No-bid analysis (3)
  {
    slug: "when-not-to-bid",
    title: "When Not to Bid: The Opportunities Worth Walking Away From",
    category: "No-bid analysis",
    excerpt:
      "Knowing what to skip is half the value of good intelligence. I lay out the signals that tell me an opportunity is not worth your time, no matter how attractive it looks.",
  },
  {
    slug: "cost-of-chasing-bad-bids",
    title: "The Real Cost of Chasing Bad Bids (and How to Stop)",
    category: "No-bid analysis",
    excerpt:
      "Every wasted pursuit is time stolen from a winnable one. I break down the true cost of bidding the wrong work and how disciplined qualification pays for itself.",
  },
  {
    slug: "no-bid-but-track-it",
    title: "No-Bid Now, Track It Later: Opportunities Worth Watching",
    category: "No-bid analysis",
    excerpt:
      "Some contracts are not right today but worth watching for the recompete. I explain how I flag these so you are ready when the timing finally fits.",
  },

  // ---------------------------------------------------------------- Contract awards (3)
  {
    slug: "reading-contract-award-notices",
    title: "Reading Contract Award Notices: What They Tell You for Next Time",
    category: "Contract awards",
    excerpt:
      "Award notices are not just closure, they are a map of who buys what. I show you how I read them to sharpen qualification on the next opportunity.",
  },
  {
    slug: "recompete-timing-from-award-data",
    title: "Predicting Recompetes From Award Data and Contract Terms",
    category: "Contract awards",
    excerpt:
      "Most contracts come back around, and the timing is often hiding in the award record. I explain how I estimate recompete windows so you can prepare early.",
  },
  {
    slug: "what-award-history-reveals-about-buyers",
    title: "What a Buyer's Award History Reveals Before You Bid",
    category: "Contract awards",
    excerpt:
      "How an agency has bought in the past predicts how it will buy next. I cover how I read a buyer's award history to qualify whether you are a realistic fit.",
  },
];

/** Group topics by category, preserving BLOG_CATEGORIES display order. */
export function topicsByCategory(): Map<BlogCategory, BlogTopic[]> {
  const map = new Map<BlogCategory, BlogTopic[]>();
  for (const cat of BLOG_CATEGORIES) {
    map.set(cat, []);
  }
  for (const topic of BLOG_TOPICS) {
    const bucket = map.get(topic.category);
    if (bucket) bucket.push(topic);
    else map.set(topic.category, [topic]);
  }
  return map;
}

/** Find a single topic by slug. */
export function getTopic(slug: string): BlogTopic | undefined {
  return BLOG_TOPICS.find((t) => t.slug === slug);
}

/**
 * Per-platform specifics that feed the long-form generator. Keeping the facts
 * structured (rather than as prose) lets every platform page read as genuine,
 * platform-aware content while staying consistent and easy to correct.
 *
 * Cornerstone platforms (MERX, BidNet Direct, CanadaBuys, SAM.gov) also have
 * hand-authored deep bodies in ./cornerstones that take precedence; their
 * facts here act as a fallback and as cross-page source data.
 */

export type PlatformFacts = {
  whatItIs: string;
  whoUses: string[];
  categorization: string;
  alertLimits: string[];
  searchLimits: string[];
  howPhilHelps: string[];
  missTitleExample: string;
};

export const PLATFORM_FACTS: Record<string, PlatformFacts> = {
  merx: {
    whatItIs:
      "MERX is Canada's longest-running tender aggregator. It pulls opportunities from federal, provincial, broader-public-sector and private buyers into one searchable service, and many contractors treat it as their default window onto the market.",
    whoUses: [
      "Federal departments and agencies", "Provincial ministries and Crown corporations",
      "MASH buyers (municipalities, academic, school boards, hospitals)", "Private buyers posting public-style tenders",
    ],
    categorization:
      "Opportunities are filed by category codes, region and buyer, and surfaced through saved searches and matched email alerts. The category a buyer chooses, and the words they put in the title, decide whether your saved search ever sees it.",
    alertLimits: [
      "Matched email alerts fire on the category and keywords you set, so a mis-categorized bid never reaches you",
      "Alert volume is high enough that real fits get skimmed past with the noise",
      "An alert tells you a notice exists; it never tells you whether the scope, site visit or bonding fits your shop",
    ],
    searchLimits: [
      "Search leans on the buyer's chosen category and title wording, not on what the job actually is",
      "Regional and category filters that trim the noise also quietly hide adjacent work you could win",
      "Document-level detail (the real scope) lives inside attachments the search does not read",
    ],
    howPhilHelps: [
      "I watch MERX the way a buyer files, not just the way you would search, so the mis-titled bids still reach you",
      "I open the attachments and read the scope, evaluation criteria, mandatory meetings and addenda",
      "I qualify fit against your trades and capacity before it ever reaches your estimators",
    ],
    missTitleExample:
      "A roof-replacement project posted as a \"facility renewal\" under a buyer category your saved search does not cover.",
  },
  "bidnet-direct": {
    whatItIs:
      "BidNet Direct runs regional purchasing groups that hundreds of state, provincial, county and municipal agencies use to post solicitations and notify registered vendors. Many buyers post there exclusively.",
    whoUses: [
      "Regional purchasing groups and cooperatives", "Counties and municipalities",
      "School districts and special districts", "Some state and provincial agencies",
    ],
    categorization:
      "Vendors register against commodity codes and a region, and notifications are driven off that match. The codes a buyer tags, and the codes you registered under, have to line up for the alert to fire.",
    alertLimits: [
      "Notifications depend on commodity-code overlap, so a bid coded loosely never reaches you",
      "Free vendor tiers limit which regions and notifications you actually receive",
      "Volume across a multi-region group buries the handful of bids that fit",
    ],
    searchLimits: [
      "Code-driven search misses work a buyer tagged under a neighbouring commodity",
      "Region boundaries can hide opportunities just across a line you would happily serve",
      "The real scope sits in documents the keyword search never opens",
    ],
    howPhilHelps: [
      "I track the purchasing groups your buyers post to, across every region you serve",
      "I read past the commodity code to the actual scope and requirements",
      "I qualify fit and flag the prevailing-wage, bonding and site-visit catches before you commit",
    ],
    missTitleExample:
      "A custodial re-bid coded under \"building services\" instead of the cleaning code you registered against.",
  },
  canadabuys: {
    whatItIs:
      "CanadaBuys is the Government of Canada's official tendering service and the front door to federal procurement, the system that replaced Buyandsell. If you sell to the federal government, this is where the opportunities and standing offers live.",
    whoUses: [
      "Federal departments and agencies", "Public Services and Procurement Canada (PSPC)",
      "Standing-offer and supply-arrangement holders", "Suppliers chasing federal set-asides",
    ],
    categorization:
      "Opportunities use GSIN codes and UNSPSC-style categories, with interest matching driven off your registration. The federal coding scheme is precise, which also means a single wrong code can keep a fit out of your matches.",
    alertLimits: [
      "Interest matching is only as good as the GSIN codes you selected when you registered",
      "Federal notices use formal language that a plain keyword alert reads literally",
      "Amendments and addenda change scope and dates after the first notice and are easy to miss",
    ],
    searchLimits: [
      "GSIN-driven search rewards exact coding and punishes broad or mis-coded notices",
      "Standing offers and supply arrangements award once and then run for years if you miss the window",
      "Bilingual documents and federal clause language slow down a fast scan",
    ],
    howPhilHelps: [
      "I map your offering to the GSIN codes that actually surface your work, not just the obvious one",
      "I read the federal documents, clauses and amendments and translate them into plain language",
      "I watch for the standing-offer and supply-arrangement windows that only open occasionally",
    ],
    missTitleExample:
      "A multi-year MRO supply arrangement coded under a GSIN family you did not register for.",
  },
  "sam-gov": {
    whatItIs:
      "SAM.gov is the U.S. federal government's official system for contract opportunities, entity registration and award data. Every serious federal vendor lives here, and so does the noise of the entire federal market.",
    whoUses: [
      "Federal agencies and contracting offices", "Prime contractors and subcontractors",
      "Small-business and set-aside vendors", "Schedule and IDIQ holders",
    ],
    categorization:
      "Opportunities are organized by NAICS and PSC codes, set-aside type and agency, with saved searches and follow notifications. The NAICS and PSC a contracting officer assigns decide whether your saved search ever surfaces it.",
    alertLimits: [
      "Saved-search alerts hinge on NAICS/PSC codes a contracting officer may assign loosely",
      "Federal volume is enormous, so genuine fits scroll past with sources-sought and notices you cannot use",
      "Set-aside and eligibility rules decide whether you can bid at all, and an alert does not check them",
    ],
    searchLimits: [
      "Code-and-keyword search misses work filed under an adjacent NAICS or a generic PSC",
      "Sources-sought and pre-solicitation notices need interpreting, not just reading",
      "The real requirement lives in attachments and SOWs the search index does not weigh",
    ],
    howPhilHelps: [
      "I track the NAICS and PSC codes that actually carry your work, plus the agencies that buy it",
      "I read the SOW, evaluation factors, set-aside type and eligibility before it reaches you",
      "I separate the real solicitations from the sources-sought noise so your team only sees bids you can pursue",
    ],
    missTitleExample:
      "An HVAC controls upgrade posted as an \"energy retrofit\" under a PSC your saved search ignores.",
  },
  bonfire: {
    whatItIs:
      "Bonfire is a sourcing and evaluation platform that agencies use to run RFPs, RFQs and qualifications. Each buyer runs its own Bonfire portal, so the opportunities are spread across hundreds of separate front doors.",
    whoUses: ["Municipalities and counties", "Universities and colleges", "Health and special districts", "State and provincial agencies"],
    categorization:
      "Each agency portal has its own categories and vendor registration. Notifications come from the individual buyer you registered with, not from one central feed.",
    alertLimits: [
      "You only hear from buyers whose individual portals you found and registered on",
      "There is no single Bonfire feed, so coverage depends on knowing every buyer in your area",
      "Category tagging varies portal to portal",
    ],
    searchLimits: [
      "No unified search across all Bonfire buyers",
      "Each portal hides scope inside its own document set",
      "New buyers adopt Bonfire constantly, and you will not know unless you are watching",
    ],
    howPhilHelps: [
      "I maintain the list of Bonfire buyers active in your jurisdictions and register where needed",
      "I read each solicitation's documents and evaluation criteria",
      "I qualify fit so a scattered set of portals becomes one clean shortlist",
    ],
    missTitleExample: "A facilities RFP on a county's standalone Bonfire portal you never knew existed.",
  },
  biddingo: {
    whatItIs:
      "Biddingo is a long-running Canadian bid-distribution service with particular strength in education, social housing and municipal buyers across Ontario and beyond.",
    whoUses: ["School boards", "Social-housing providers", "Municipalities", "Public agencies in Ontario and other provinces"],
    categorization:
      "Opportunities are organized by category and buyer, with email notification tied to your registered interests.",
    alertLimits: [
      "Notifications depend on the categories you selected and how the buyer tagged the work",
      "Education and housing buyers use sector language a generic alert misreads",
      "Volume in active regions buries the fits",
    ],
    searchLimits: [
      "Category-driven search misses adjacent work",
      "Document-level scope is not what the search ranks on",
      "Re-bids of incumbent contracts surface with little warning",
    ],
    howPhilHelps: [
      "I watch the education, housing and municipal buyers that post on Biddingo in your area",
      "I read the documents and translate sector language into plain fit",
      "I flag re-bid cycles before they close",
    ],
    missTitleExample: "A school-board cleaning contract tagged under \"building services\" rather than janitorial.",
  },
  "bids-and-tenders": {
    whatItIs:
      "bids&tenders is the eProcurement system behind a large share of Canadian municipalities. Like other SaaS portals, each municipality runs its own instance, so there is no single national feed.",
    whoUses: ["Municipalities and regions", "Some school boards and agencies", "Local public buyers across Canada"],
    categorization:
      "Each municipal portal has its own categories and bidder registration, with notifications from that municipality only.",
    alertLimits: [
      "You only get notices from the municipalities you registered with one by one",
      "No central feed across all bids&tenders municipalities",
      "Category wording varies by municipality",
    ],
    searchLimits: [
      "No unified cross-municipality search",
      "Scope lives in each portal's documents",
      "New municipalities adopt the platform and you will not know unless you watch",
    ],
    howPhilHelps: [
      "I keep the list of bids&tenders municipalities in your footprint and register as needed",
      "I read each solicitation and its addenda",
      "I qualify fit so dozens of municipal portals become one shortlist",
    ],
    missTitleExample: "A road or sitework package on a town's bids&tenders portal outside your usual list.",
  },
  jaggaer: {
    whatItIs:
      "Jaggaer is an enterprise source-to-pay suite used by universities, health systems and large agencies to run sourcing events and manage suppliers.",
    whoUses: ["Universities and research institutions", "Health systems", "Large public agencies"],
    categorization:
      "Buyers run sourcing events and invite or open registration by commodity. Visibility depends on supplier registration with each institution.",
    alertLimits: [
      "Event invitations depend on being a registered supplier in the right commodity",
      "Institutions run their own instances, so coverage is fragmented",
      "Some events are invitation-only and never broadcast",
    ],
    searchLimits: [
      "No single public feed across Jaggaer buyers",
      "Commodity registration drives who sees what",
      "Scope sits inside each event's documents",
    ],
    howPhilHelps: [
      "I track the institutions in your area that source through Jaggaer and keep your registrations current",
      "I read the event scope and requirements",
      "I qualify fit and flag the registration steps that gate eligibility",
    ],
    missTitleExample: "A university MRO sourcing event open only to suppliers registered under the right commodity.",
  },
  "sap-ariba": {
    whatItIs:
      "SAP Ariba is a global procurement network where many large public and institutional buyers run sourcing events and manage their supplier base.",
    whoUses: ["Large institutions and agencies", "Quasi-public buyers", "Enterprises with public-style procurement"],
    categorization:
      "Buyers post events to the Ariba Network; suppliers respond through their Ariba account. Visibility depends on network registration and buyer relationships.",
    alertLimits: [
      "Event visibility depends on Ariba Network registration and buyer settings",
      "Some events are targeted to existing suppliers",
      "The network is broad, so relevant public events are easy to miss",
    ],
    searchLimits: [
      "Discovery favours established network suppliers",
      "Scope lives in each event's documents",
      "Public-sector events mix with private ones",
    ],
    howPhilHelps: [
      "I watch for the public and institutional buyers in your space running Ariba events",
      "I read the event requirements and timelines",
      "I qualify fit so the network noise turns into a shortlist",
    ],
    missTitleExample: "An institutional supply event posted to the Ariba Network outside your existing buyer relationships.",
  },
  planetbids: {
    whatItIs:
      "PlanetBids is the portal behind a large share of California public agencies and many municipalities elsewhere. Each agency runs its own PlanetBids vendor portal.",
    whoUses: ["California cities, counties and districts", "Municipalities nationwide", "Special districts and authorities"],
    categorization:
      "Vendors register per agency against category codes; notifications come from each agency you registered with.",
    alertLimits: [
      "You only hear from the agencies whose portals you registered on",
      "No single feed across all PlanetBids agencies",
      "Category codes vary by agency",
    ],
    searchLimits: [
      "No unified cross-agency search",
      "Each agency hides scope in its own documents",
      "California's density means many agencies you have not found yet",
    ],
    howPhilHelps: [
      "I maintain the PlanetBids agencies active in your footprint and register where needed",
      "I read each solicitation, including addenda and bid results",
      "I qualify fit so a sea of agency portals becomes one shortlist",
    ],
    missTitleExample: "A paving project on a California city's PlanetBids portal you had not registered with.",
  },
  opengov: {
    whatItIs:
      "OpenGov Procurement (formerly ProcureNow) is a modern procurement suite used by a growing roster of U.S. local governments to run solicitations.",
    whoUses: ["Cities and counties", "Special districts", "Local agencies modernizing procurement"],
    categorization: "Each government runs its own portal with its own categories and vendor notifications.",
    alertLimits: ["Notices come per government you registered with", "No single feed", "Adoption is growing fast"],
    searchLimits: ["No unified search", "Scope sits in each portal", "New buyers adopt it constantly"],
    howPhilHelps: [
      "I track the OpenGov governments in your area and register as needed",
      "I read each solicitation and its documents",
      "I qualify fit so new portals do not mean missed work",
    ],
    missTitleExample: "An engineering RFQ on a city's OpenGov portal that just went live.",
  },
  demandstar: {
    whatItIs:
      "DemandStar is a bid-notification network connecting suppliers to thousands of U.S. local-government agencies through a single registration.",
    whoUses: ["Cities, counties and districts", "Local agencies nationwide", "Suppliers wanting broad local coverage"],
    categorization:
      "You register by commodity and geography; notifications fire on agency postings that match. Free tiers limit how many agencies you receive.",
    alertLimits: [
      "Free-tier limits cap the agencies and notices you actually get",
      "Commodity matching misses loosely coded work",
      "Volume across many agencies buries the fits",
    ],
    searchLimits: [
      "Commodity-driven search misses adjacent codes",
      "Scope lives in each agency's documents",
      "Geography settings can hide nearby work",
    ],
    howPhilHelps: [
      "I use the network the way a buyer codes, not just the way you registered",
      "I read the documents behind the notice",
      "I qualify fit so the notification stream becomes a shortlist",
    ],
    missTitleExample: "A janitorial bid coded under a commodity outside your DemandStar registration.",
  },
  ionwave: {
    whatItIs:
      "Ion Wave powers many state and local buyer portals across the U.S., each running its own supplier registration and notifications.",
    whoUses: ["State agencies", "Cities and counties", "Special districts"],
    categorization: "Per-portal commodity registration drives notifications from each buyer.",
    alertLimits: ["Notices per buyer you registered with", "No single feed", "Commodity coding varies"],
    searchLimits: ["No unified search", "Scope in each portal's documents", "Many buyers to find"],
    howPhilHelps: [
      "I keep your registrations current across the Ion Wave buyers in your footprint",
      "I read each solicitation",
      "I qualify fit so coverage does not depend on you finding every portal",
    ],
    missTitleExample: "A supply contract on a state Ion Wave portal under a commodity you did not select.",
  },
  govwin: {
    whatItIs:
      "GovWin IQ is a market-intelligence service that tracks opportunities, pre-RFP activity, teaming and awards across federal, state and local government. It is intelligence about the market, not a place buyers post.",
    whoUses: ["Larger contractors and primes", "Business-development teams", "Firms doing capture planning"],
    categorization:
      "Opportunities are tracked and forecast across agencies and stages, often well before a formal solicitation.",
    alertLimits: [
      "The value is in interpretation, which the tool leaves to you",
      "Forecast data is broad and needs filtering to your real lane",
      "It is a research subscription, not a qualified shortlist",
    ],
    searchLimits: [
      "Volume of tracked opportunities is overwhelming without a filter",
      "Pre-RFP signals need judgment to act on",
      "It does not tell you which to pursue",
    ],
    howPhilHelps: [
      "I turn early market signals into a short list of opportunities that actually fit you",
      "I read the eventual solicitations and qualify them",
      "I keep your team focused on pursuit, not research",
    ],
    missTitleExample: "A forecasted recompete you would have pursued, lost in a sea of tracked opportunities.",
  },
  constructconnect: {
    whatItIs:
      "ConstructConnect is a construction project-intelligence network. Rather than a single bid portal, it aggregates public and private projects, plan rooms and bidding data, often surfacing work earlier in the lifecycle than a tender notice would.",
    whoUses: ["General contractors and subs", "Trade contractors (HVAC, electrical, plumbing)", "Suppliers and distributors", "Estimators tracking plan rooms"],
    categorization:
      "Projects are organized by stage, type, region and value, with leads and plan documents tied to your profile and filters. The breadth is the point, and also the noise: it tracks far more than you can pursue.",
    alertLimits: [
      "Lead volume is enormous and needs heavy filtering to your real lane",
      "Early-stage project signals require judgment to act on, not just receipt",
      "It surfaces activity, not a qualified decision about what to chase",
    ],
    searchLimits: [
      "Filtering to genuinely winnable public work takes practice",
      "Public solicitations still live on the issuing platforms you must also watch",
      "Plan-room detail is deep, and reading it is the real work",
    ],
    howPhilHelps: [
      "I turn ConstructConnect's early signals into a short list of public opportunities that fit you",
      "I cross-check against the issuing platform so you act on the real solicitation",
      "I qualify scope, timing and fit so your estimators are not buried in leads",
    ],
    missTitleExample: "An early-stage public project you could have positioned for, lost in a flood of untriaged leads.",
  },
  periscope: {
    whatItIs:
      "Periscope (the S2G and BidSync supplier network) underpins many state and local eProcurement systems, connecting suppliers to public buyers. BidSync is the long-running notification side of the same lineage.",
    whoUses: ["State and local agencies", "Suppliers on connected systems"],
    categorization: "Supplier-network registration and commodity matching drive notifications from connected buyers.",
    alertLimits: ["Notices depend on network registration and codes", "Coverage varies by connected system", "Volume buries fits"],
    searchLimits: ["Commodity-driven discovery", "Scope in documents", "Connected systems differ"],
    howPhilHelps: [
      "I track the connected systems your buyers use",
      "I read the solicitations behind the notices",
      "I qualify fit so the network becomes a shortlist",
    ],
    missTitleExample: "A state supply solicitation routed through the network under a commodity you missed.",
  },
  "gsa-ebuy": {
    whatItIs:
      "GSA eBuy is the federal RFQ system where Multiple Award Schedule holders receive and respond to agency requests for quotes. If you hold a Schedule, this is where a lot of your day-to-day federal work flows.",
    whoUses: ["GSA Schedule holders", "Federal agencies buying off Schedule", "Schedule-based resellers and service firms"],
    categorization:
      "RFQs are routed by Schedule, SIN and category to holders; you only see what your Schedule and SINs cover.",
    alertLimits: [
      "You only receive RFQs your Schedule and SINs make you eligible for",
      "Short response windows punish anyone not watching daily",
      "Coverage gaps in your SINs mean invisible work",
    ],
    searchLimits: [
      "Visibility is gated by your Schedule and SIN coverage",
      "RFQ requirements live in attachments",
      "Quotes turn around fast",
    ],
    howPhilHelps: [
      "I watch eBuy daily against your Schedule and SINs",
      "I read each RFQ's requirements and timeline",
      "I qualify fit and flag the fast-closing ones first",
    ],
    missTitleExample: "A facilities RFQ routed to a SIN adjacent to the ones you hold.",
  },
  usaspending: {
    whatItIs:
      "USASpending is the federal award-data system. It does not post opportunities; it shows who won, how much, from which agency and when, which is exactly the intelligence that tells you where to aim.",
    whoUses: ["Contractors researching a market", "Capture and BD teams", "Anyone sizing competition before bidding"],
    categorization:
      "Awards are organized by agency, recipient, NAICS/PSC and time, queryable through the site and its API.",
    alertLimits: [
      "It is historical award data, not a notice feed",
      "Raw data needs interpretation to be useful",
      "It tells you what happened, not what is open",
    ],
    searchLimits: [
      "Querying award data well takes practice",
      "Patterns (incumbents, recompete timing) are not handed to you",
      "It complements, rather than replaces, opportunity monitoring",
    ],
    howPhilHelps: [
      "I read award history to see who holds the work and when it likely recompetes",
      "I use it to size competition and time your pursuit",
      "I fold that intelligence into the opportunities I send you",
    ],
    missTitleExample: "A recompete you could have prepared for months earlier if you had read the award history.",
  },
};

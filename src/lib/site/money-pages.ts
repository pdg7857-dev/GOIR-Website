import type { Section } from "./content/types";
import type { Faq } from "@/components/site/faq";

/**
 * Data-driven "money pages" and authority/renewal pages. Each renders through
 * the shared MoneyPage template at a flat, keyword-rich URL. Content leads with
 * the research-backed angles the owner asked to emphasize: opportunity waste,
 * qualification discipline, proposal-team workload, platform fragmentation and
 * renewal intelligence. Statistics are referenced by citation id (see
 * lib/site/citations) and render with a visible source state.
 */

export type MoneyPage = {
  slug: string;
  group: "money" | "renewal" | "authority";
  title: string; // <title>
  description: string; // meta description
  keywords: string[];
  eyebrow: string;
  h1: string;
  lede: string;
  /** Citation ids surfaced as StatCallouts near the top. */
  statIds?: string[];
  sections: Section[];
  faqs: Faq[];
  /** Related flat links shown at the foot of the page. */
  related: { label: string; href: string }[];
};

const RELATED_CORE = [
  { label: "Government Opportunity Intelligence", href: "/government-opportunity-intelligence" },
  { label: "Book a meeting", href: "/book" },
  { label: "Opportunity Waste Calculator", href: "/opportunity-waste-calculator" },
];

export const MONEY_PAGES: MoneyPage[] = [
  // ------------------------------------------------------------------ MONEY
  {
    slug: "government-bid-monitoring",
    group: "money",
    title: "Government Bid Monitoring That Qualifies, Not Just Alerts",
    description:
      "Most government bid monitoring just forwards notices. I monitor every platform your buyers use, read the documents, and qualify the fit so your estimators stop wasting time on poor-fit bids.",
    keywords: ["government bid monitoring", "government tender monitoring", "procurement monitoring", "government opportunity monitoring"],
    eyebrow: "Money page",
    h1: "Government Bid Monitoring, Done Right",
    lede:
      "Monitoring is not the hard part. Judgment is. I watch every procurement platform your buyers post to, then read and qualify what surfaces, so your team only sees the opportunities worth pursuing.",
    statIds: ["labor-shortage", "single-bid-frequency"],
    sections: [
      {
        id: "problem",
        heading: "Why most bid monitoring fails contractors",
        blocks: [
          { type: "p", text: "Conventional bid monitoring sets up keyword and category alerts on a handful of platforms and forwards whatever matches. That sounds efficient. In practice it produces a firehose of notices that are mostly irrelevant, while the bids that fit you best stay invisible because a buyer filed them under a title you would never search." },
          { type: "p", text: "The cost is not theoretical. Every alert your estimator opens, reads and discards is time taken from the proposals you could actually win. As proposal workloads rise and skilled estimators get harder to hire, that wasted time gets more expensive every year." },
          { type: "callout", text: "More alerts do not mean more wins. They mean more triage. The goal is fewer, better opportunities, not a bigger inbox." },
        ],
      },
      {
        id: "approach",
        heading: "Monitoring across the whole ecosystem",
        blocks: [
          { type: "p", text: "Government work is scattered across national aggregators, official government systems, and a different SaaS portal for nearly every agency. No single platform shows you everything, and watching them all manually is a full-time job nobody on your team has time for." },
          { type: "p", text: "I cover the platforms that serve your jurisdictions, the way buyers actually file and title work, not just the way you would search. That is how the mis-categorized fits still reach you." },
          { type: "ul", items: [
            "National aggregators and official systems like MERX, CanadaBuys and SAM.gov.",
            "SaaS portals behind individual agencies, including Bonfire, bids&tenders, PlanetBids and more.",
            "The state, provincial and municipal systems your specific buyers use.",
          ] },
        ],
      },
      {
        id: "difference",
        heading: "Monitoring plus qualification, in one service",
        blocks: [
          { type: "p", text: "The difference between what I do and a monitoring subscription is that I read the documents and judge fit before anything reaches you. You get a short, plain-language summary and a direct link to the source, not a raw notice you still have to assess." },
          { type: "p", text: "That is the whole point of opportunity intelligence: turning monitoring into a decision instead of a to-do list." },
        ],
      },
    ],
    faqs: [
      { q: "How is this different from a bid-alert tool?", a: "An alert tool forwards notices that match keywords. I read the documents, qualify fit against your shop, and send you only what is worth pursuing, with a summary and a source link." },
      { q: "Which platforms do you monitor?", a: "The ones your buyers actually use in your jurisdictions: MERX, BidNet Direct, CanadaBuys, SAM.gov and the many SaaS and government systems behind them. Coverage follows your footprint." },
      { q: "What does it cost?", a: "Flat monthly coverage from $599, priced by geography rather than per opportunity. See the pricing page for details." },
    ],
    related: [
      { label: "Government bid alerts", href: "/government-bid-alerts" },
      { label: "Opportunity screening", href: "/opportunity-screening" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "government-bid-alerts",
    group: "money",
    title: "Government Bid Alerts, Qualified Before They Reach You",
    description:
      "Raw government bid alerts bury you in noise. I turn alerts into a qualified shortlist: read, screened and fit-checked, so your estimators stop chasing poor-fit opportunities.",
    keywords: ["government bid alerts", "government contract alerts", "tender alerts", "bid notification service"],
    eyebrow: "Money page",
    h1: "Government Bid Alerts Without the Noise",
    lede:
      "A keyword alert tells you a notice exists. It does not tell you whether it is worth your time. I qualify every alert before it reaches you, so your inbox becomes a shortlist instead of a chore.",
    statIds: ["single-bid-frequency", "estimator-hiring"],
    sections: [
      {
        id: "noise",
        heading: "The trouble with raw alerts",
        blocks: [
          { type: "p", text: "Bid alerts fire on the keywords and categories you set. They over-trigger on work outside your lane and stay silent on the fits a buyer happened to title differently. The result is an inbox full of noise and a false sense that you are covered." },
          { type: "p", text: "Worse, alerts are blind to the details that decide a bid: mandatory site visits, bonding, prevailing wage, evaluation criteria, and addenda that move the goalposts after the notice posts." },
        ],
      },
      {
        id: "qualified",
        heading: "Qualified alerts, not raw ones",
        blocks: [
          { type: "p", text: "I take the alerting off your plate and add the step software cannot do: I read each opportunity and judge whether it fits you. What reaches you is a short, qualified list with a plain-language summary and a direct link to the source." },
          { type: "ul", items: [
            "Fit checked against your trades, capacity and geography.",
            "The catch flagged: site meetings, bonding, eligibility, timelines.",
            "A direct link to the source so you act on the system of record.",
          ] },
        ],
      },
    ],
    faqs: [
      { q: "Do I still get my own platform alerts?", a: "You can keep them. The point is that you no longer have to triage them, because I do the reading and qualifying for you." },
      { q: "How fast will I get opportunities?", a: "On a steady cadence as they post and close. On a discovery call I will already have looked at your jurisdictions so you see real examples first." },
    ],
    related: [
      { label: "Government bid monitoring", href: "/government-bid-monitoring" },
      { label: "Opportunity screening", href: "/opportunity-screening" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "government-contract-leads",
    group: "money",
    title: "Government Contract Leads, Read and Qualified",
    description:
      "Government contract leads are only useful if they fit. I deliver qualified government contract leads across Canada and the U.S., already read and fit-checked, so your team bids what it can win.",
    keywords: ["government contract leads", "government contract opportunities", "public sector leads", "government sales leads"],
    eyebrow: "Money page",
    h1: "Government Contract Leads That Actually Fit",
    lede:
      "A lead you cannot win is not a lead, it is a distraction. I deliver government contract opportunities that have already been read and qualified against your business.",
    sections: [
      {
        id: "what",
        heading: "What a qualified lead looks like",
        blocks: [
          { type: "p", text: "Most lead lists are raw exports: a title, a buyer, a closing date. They leave the hard part, deciding whether to pursue, entirely to you. A qualified lead is different. It comes with the scope read, the fit judged, and the catch flagged." },
          { type: "p", text: "That means your business development and estimating time goes into pursuing and winning, not into triaging a spreadsheet." },
        ],
      },
      {
        id: "coverage",
        heading: "Across every platform and jurisdiction you serve",
        blocks: [
          { type: "p", text: "Because I monitor the whole ecosystem rather than one portal, the leads you get are not limited to what a single platform happens to surface. They are drawn from wherever your buyers actually post, on either side of the border." },
        ],
      },
    ],
    faqs: [
      { q: "Are these exclusive leads?", a: "These are public opportunities, so they are open to all bidders. The edge is not exclusivity, it is that yours are already qualified, so you act faster and waste less time." },
      { q: "Do you generate private-sector leads too?", a: "My focus is government and broader-public-sector work, where platform fragmentation and qualification are the real bottleneck." },
    ],
    related: [
      { label: "Government bid monitoring", href: "/government-bid-monitoring" },
      { label: "Bid/no-bid analysis", href: "/bid-no-bid-analysis" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "government-bid-qualification",
    group: "money",
    title: "Government Bid Qualification: Bid Less, Win More",
    description:
      "Bid qualification is where wins are made or wasted. I qualify government opportunities against your business so your proposal team spends its hours on bids you can actually win.",
    keywords: ["government bid qualification", "bid qualification", "opportunity qualification", "bid screening"],
    eyebrow: "Money page",
    h1: "Government Bid Qualification",
    lede:
      "Qualification is the highest-leverage discipline in public bidding. Done well, it is the difference between a busy proposal team and a winning one.",
    statIds: ["estimator-hiring", "labor-shortage"],
    sections: [
      {
        id: "why",
        heading: "Why qualification beats volume",
        blocks: [
          { type: "p", text: "Responding to more opportunities is not a strategy. With each response demanding significant hours, chasing everything simply burns out your team and lowers your win rate. The firms that win consistently are disciplined about what they decline." },
          { type: "p", text: "Qualification is how you protect your estimators' time and your proposal quality at the same time. Fewer, better-fit bids mean more attention on each, and a higher hit rate." },
          { type: "callout", text: "The cheapest bid to lose is the one you never wrote because you qualified it out early." },
        ],
      },
      {
        id: "how",
        heading: "How I qualify an opportunity",
        blocks: [
          { type: "p", text: "I read each opportunity in full and weigh it against the things that actually decide a pursuit:" },
          { type: "ul", items: [
            "Scope fit against your trades and your sweet-spot project size.",
            "Capacity and timing against your current pipeline.",
            "Eligibility: licensing, bonding, set-asides, prequalification.",
            "Competitive signals, including incumbents and likely field size.",
            "The practical catches: mandatory meetings, onerous terms, thin margins.",
          ] },
        ],
      },
    ],
    faqs: [
      { q: "Do you make the bid/no-bid decision for me?", a: "I give you a clear, reasoned fit assessment so the decision is fast and informed. The final call stays yours, because you know your shop best." },
      { q: "Can you qualify against my specific criteria?", a: "Yes. Onboarding captures your trades, geography, sweet-spot size and dealbreakers, and I tune qualification to them." },
    ],
    related: [
      { label: "Bid/no-bid analysis", href: "/bid-no-bid-analysis" },
      { label: "Opportunity screening", href: "/opportunity-screening" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "bid-no-bid-analysis",
    group: "money",
    title: "Bid/No-Bid Analysis for Government Contracts",
    description:
      "A disciplined bid/no-bid analysis protects your estimators' time and focus. I assess each government opportunity so you can decide fast and pursue only what fits.",
    keywords: ["bid no bid analysis", "bid no bid decision", "government bid decision", "pursuit decision"],
    eyebrow: "Money page",
    h1: "Bid/No-Bid Analysis",
    lede:
      "The bid/no-bid decision is where opportunity waste is created or avoided. I give you the read you need to make it quickly and well.",
    statIds: ["estimator-hiring"],
    sections: [
      {
        id: "stakes",
        heading: "The stakes of a bad bid/no-bid call",
        blocks: [
          { type: "p", text: "Say yes to the wrong opportunity and you sink dozens of estimator hours into a bid you were never positioned to win. Say no to the right one and a competitor takes work that fit you perfectly. Both errors are expensive, and both come from deciding without reading the documents." },
        ],
      },
      {
        id: "framework",
        heading: "A consistent framework, applied every time",
        blocks: [
          { type: "p", text: "I apply the same disciplined read to every opportunity so your decisions are consistent rather than mood- or workload-driven: scope fit, eligibility, competition, capacity and the practical catches. You get a recommendation with the reasoning, not just a gut feel." },
        ],
      },
    ],
    faqs: [
      { q: "How quickly can you turn around an analysis?", a: "Fit assessments come with each qualified opportunity I send. For a specific bid you are weighing, I can turn around a focused read quickly." },
      { q: "Is this consulting?", a: "It is an ongoing service, not a one-off consult. Qualification and bid/no-bid support are part of coverage." },
    ],
    related: [
      { label: "Government bid qualification", href: "/government-bid-qualification" },
      { label: "Tender review service", href: "/tender-review-service" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "tender-review-service",
    group: "money",
    title: "Tender Review Service: The Documents, Read for You",
    description:
      "A tender review service that reads the documents so you do not have to. I review scope, requirements, evaluation criteria and the catches in every government tender that fits you.",
    keywords: ["tender review service", "bid document review", "rfp review", "solicitation review"],
    eyebrow: "Money page",
    h1: "Tender Review Service",
    lede:
      "The decisive details of a public tender live deep in the documents. I read them for you, so nothing important is missed and nothing irrelevant wastes your time.",
    statIds: ["labor-shortage"],
    sections: [
      {
        id: "read",
        heading: "What I read in every tender",
        blocks: [
          { type: "p", text: "A tender notice is the cover of a book. The story, the part that decides whether you can win, is in the attachments. I read all of it:" },
          { type: "ul", items: [
            "Scope and specifications, in full.",
            "Evaluation criteria and weightings.",
            "Mandatory site meetings, deadlines and submission rules.",
            "Bonding, insurance, licensing and eligibility.",
            "Addenda and amendments as they post.",
          ] },
        ],
      },
      {
        id: "summary",
        heading: "A plain-language summary you can act on",
        blocks: [
          { type: "p", text: "You do not get a forty-page PDF back. You get a short summary that tells you what the work is, whether it fits, what the catch is, and a direct link to the source so you can move." },
        ],
      },
    ],
    faqs: [
      { q: "Do you review tenders I find myself?", a: "Yes. Bring me anything you are weighing and I will read it and give you a clear assessment." },
      { q: "What about French-language or federal documents?", a: "Federal, bilingual and clause-heavy documents are part of the work. I translate them into a plain-language read." },
    ],
    related: [
      { label: "Bid/no-bid analysis", href: "/bid-no-bid-analysis" },
      { label: "Government bid qualification", href: "/government-bid-qualification" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "opportunity-screening",
    group: "money",
    title: "Opportunity Screening for Government Contractors",
    description:
      "Opportunity screening that filters thousands of notices down to the few worth pursuing. I screen government opportunities against your business so your team stops sifting.",
    keywords: ["opportunity screening", "bid screening", "government opportunity screening", "rfp screening"],
    eyebrow: "Money page",
    h1: "Opportunity Screening",
    lede:
      "Screening is the first filter that protects your team's time. I run it across every platform so the noise never reaches your estimators in the first place.",
    sections: [
      {
        id: "filter",
        heading: "The filter your team should not have to be",
        blocks: [
          { type: "p", text: "Right now, your estimators are the filter. They open the alerts, scan the portals, and decide what is worth a closer look. That is expensive work to hand to your most skilled people, and it is the first thing I take off their plate." },
        ],
      },
      {
        id: "how",
        heading: "How screening works",
        blocks: [
          { type: "p", text: "I screen every opportunity that surfaces across your jurisdictions against your profile, set aside what does not fit, and pass through what does for a full review and qualification. The output is a clean, short list, refreshed on a steady cadence." },
        ],
      },
    ],
    faqs: [
      { q: "Is screening the same as qualification?", a: "Screening is the first pass that removes the obvious non-fits. Qualification is the deeper read on what survives. I do both." },
      { q: "How many opportunities will I see?", a: "As many as genuinely fit, and no more. The aim is signal, not volume." },
    ],
    related: [
      { label: "Government bid qualification", href: "/government-bid-qualification" },
      { label: "Government bid monitoring", href: "/government-bid-monitoring" },
      ...RELATED_CORE,
    ],
  },

  // ---------------------------------------------------------------- RENEWAL
  {
    slug: "government-contract-renewals",
    group: "renewal",
    title: "Government Contract Renewals: Win Work Before It Is Posted",
    description:
      "The best government opportunities are already held by an incumbent. I track contract renewals and expirations so you can position before the rebid is ever posted.",
    keywords: ["government contract renewals", "contract rebid", "renewal intelligence", "incumbent contracts"],
    eyebrow: "Renewal intelligence",
    h1: "Government Contract Renewals",
    lede:
      "Most contractors find an opportunity when it posts. By then, the incumbent has had years to prepare. Renewal intelligence flips that, so you are the prepared one.",
    statIds: ["single-bid-frequency"],
    sections: [
      {
        id: "why",
        heading: "Why renewals are the real opportunity",
        blocks: [
          { type: "p", text: "A huge share of public work is recurring. Cleaning, maintenance, supply, security and service contracts are awarded for a term and then rebid. The firm that knows when a contract expires can build a relationship, understand the scope and position itself long before the solicitation appears." },
          { type: "p", text: "Wait for the posting and you are reacting on a tight clock against an incumbent who has known about it for years. Track the renewal and you are the one with the head start." },
          { type: "callout", text: "The opportunity is not the posting. The opportunity is the expiration that comes before it." },
        ],
      },
      {
        id: "how",
        heading: "How I track renewals",
        blocks: [
          { type: "p", text: "I combine award data, contract terms and historical posting patterns to identify the contracts in your space that are likely to rebid, and roughly when. That becomes a forward-looking pipeline you can act on, not just a feed of what posted today." },
        ],
      },
    ],
    faqs: [
      { q: "Can you really predict when a contract will rebid?", a: "Not to the day, but award histories and contract terms make timing reasonably foreseeable for most recurring work. That window is enough to position." },
      { q: "What do I do with a renewal lead?", a: "Build the relationship, understand the scope, and be ready to respond strongly the moment it posts, instead of scrambling." },
    ],
    related: [
      { label: "Upcoming renewals", href: "/upcoming-government-contract-renewals" },
      { label: "Incumbent contract tracking", href: "/incumbent-contract-tracking" },
      { label: "Renewal alerts", href: "/government-contract-renewal-alerts" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "government-contract-renewal-alerts",
    group: "renewal",
    title: "Government Contract Renewal Alerts",
    description:
      "Renewal alerts that warn you before a contract rebids, not after it posts. I flag upcoming government contract expirations in your space so you can prepare early.",
    keywords: ["government contract renewal alerts", "contract expiration alerts", "rebid alerts", "renewal notifications"],
    eyebrow: "Renewal intelligence",
    h1: "Government Contract Renewal Alerts",
    lede:
      "Standard alerts tell you when work posts. Renewal alerts tell you when it is about to, which is the only warning that gives you time to win.",
    sections: [
      {
        id: "early",
        heading: "An early-warning system for rebids",
        blocks: [
          { type: "p", text: "Renewal alerts watch the back end of the contract lifecycle: the expirations and term-ends that precede a rebid. When a contract in your space is approaching its end, you hear about it with enough runway to act." },
        ],
      },
    ],
    faqs: [
      { q: "How far in advance will I hear?", a: "As early as the data allows, often months ahead, which is the whole point. The earlier the warning, the better you can position." },
      { q: "Is this included in coverage?", a: "Renewal intelligence is part of how I cover your market, alongside live opportunity monitoring." },
    ],
    related: [
      { label: "Government contract renewals", href: "/government-contract-renewals" },
      { label: "Upcoming renewals", href: "/upcoming-government-contract-renewals" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "upcoming-government-contract-renewals",
    group: "renewal",
    title: "Upcoming Government Contract Renewals",
    description:
      "A forward-looking view of upcoming government contract renewals in your industry and jurisdictions, so you can position before the rebid posts.",
    keywords: ["upcoming government contract renewals", "contracts expiring soon", "upcoming rebids", "contract pipeline"],
    eyebrow: "Renewal intelligence",
    h1: "Upcoming Government Contract Renewals",
    lede:
      "Imagine a pipeline of the contracts in your space that are about to rebid. That is what renewal intelligence builds.",
    sections: [
      {
        id: "pipeline",
        heading: "A pipeline of future opportunities",
        blocks: [
          { type: "p", text: "Instead of only seeing what posted today, you get a forward view: the recurring contracts in your trades and territories that are nearing their end, ranked by fit and timing. It turns bidding from reactive to planned." },
        ],
      },
    ],
    faqs: [
      { q: "Which contracts can you track?", a: "Recurring public work in your industries and jurisdictions: maintenance, custodial, supply, security, service and similar term contracts." },
      { q: "How do I see my upcoming renewals?", a: "Request a Government Opportunity Intelligence Report and I will include a renewal view for your market." },
    ],
    related: [
      { label: "Government contract renewals", href: "/government-contract-renewals" },
      { label: "Incumbent contract tracking", href: "/incumbent-contract-tracking" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "incumbent-contract-tracking",
    group: "renewal",
    title: "Incumbent Contract Tracking",
    description:
      "Know who holds the contracts you want and when they expire. Incumbent contract tracking helps you position to take work at the next rebid.",
    keywords: ["incumbent contract tracking", "incumbent contractor", "contract award tracking", "competitor tracking"],
    eyebrow: "Renewal intelligence",
    h1: "Incumbent Contract Tracking",
    lede:
      "Every contract you want is held by someone today. Knowing who, on what terms and until when is how you plan to take it.",
    sections: [
      {
        id: "who",
        heading: "Turning award data into a plan",
        blocks: [
          { type: "p", text: "Public award data shows who won, how much and when. Read well, it reveals the incumbents in your space, the size of the work, and the likely timing of the next competition. That is the raw material for a deliberate pursuit plan." },
        ],
      },
    ],
    faqs: [
      { q: "Where does the data come from?", a: "Public award and contract data, read and interpreted. I fold it into the opportunities and renewals I track for you." },
      { q: "Is this just for large contractors?", a: "No. Mid-market contractors benefit most, because incumbent tracking lets a smaller team focus its energy where it counts." },
    ],
    related: [
      { label: "Government contract renewals", href: "/government-contract-renewals" },
      { label: "Contract expirations", href: "/government-contract-expirations" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "government-contract-expirations",
    group: "renewal",
    title: "Government Contract Expirations",
    description:
      "Government contract expirations are tomorrow's opportunities. I track when contracts in your space end so you can be ready for the rebid.",
    keywords: ["government contract expirations", "expiring contracts", "contract end dates", "rebid timing"],
    eyebrow: "Renewal intelligence",
    h1: "Government Contract Expirations",
    lede:
      "An expiration is a rebid waiting to happen. Track the end dates in your market and you control the clock instead of racing it.",
    sections: [
      {
        id: "track",
        heading: "Why expirations matter more than postings",
        blocks: [
          { type: "p", text: "By the time a contract is reposted, the window to prepare is closing. The expiration that precedes it is the real signal. Tracking end dates in your trades and jurisdictions gives you the lead time to build relationships and refine your approach." },
        ],
      },
    ],
    faqs: [
      { q: "How do you know contract end dates?", a: "From award terms and public contract data, read in context. Combined with posting history, it gives a workable forecast of rebid timing." },
      { q: "What should I do with an expiration date?", a: "Use the runway: understand the scope, position with the buyer, and be ready to respond strongly when it posts." },
    ],
    related: [
      { label: "Incumbent contract tracking", href: "/incumbent-contract-tracking" },
      { label: "Government contract renewals", href: "/government-contract-renewals" },
      ...RELATED_CORE,
    ],
  },

  // -------------------------------------------------------------- AUTHORITY
  {
    slug: "government-opportunity-intelligence-index",
    group: "authority",
    title: "The Government Opportunity Intelligence Index (GOII)",
    description:
      "The GOII measures how well your organization finds, qualifies and pursues government opportunities. Learn what the index covers and how to improve your score.",
    keywords: ["government opportunity intelligence index", "GOII", "procurement maturity", "bid maturity assessment"],
    eyebrow: "Authority",
    h1: "The Government Opportunity Intelligence Index",
    lede:
      "The GOII is a simple way to measure something most contractors never quantify: how well your organization turns the chaos of public procurement into won work.",
    sections: [
      {
        id: "dimensions",
        heading: "What the index measures",
        blocks: [
          { type: "p", text: "The GOII scores your organization across the dimensions that actually drive results in public bidding:" },
          { type: "ul", items: [
            "Platform coverage: how much of the ecosystem you actually watch.",
            "Discovery: whether you find the fits that hide under odd titles.",
            "Qualification discipline: how well you separate winnable from unwinnable.",
            "Opportunity waste: how much estimator time goes to poor-fit bids.",
            "Renewal awareness: whether you see rebids coming or react to postings.",
          ] },
        ],
      },
      {
        id: "use",
        heading: "How to get your score",
        blocks: [
          { type: "p", text: "Your GOII score is part of the free Government Opportunity Intelligence Report. It gives you a clear, honest baseline and shows the specific gaps that are costing you time and work." },
        ],
      },
    ],
    faqs: [
      { q: "How do I get my GOII score?", a: "Book a discovery call. I'll walk you through where you stand and the gaps behind your score." },
      { q: "Is the index a sales gimmick?", a: "It is a genuine diagnostic. Even firms that never work with me find the gaps it surfaces useful." },
    ],
    related: [
      { label: "Book a meeting", href: "/book" },
      { label: "Opportunity waste report", href: "/opportunity-waste-report" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "opportunity-waste-report",
    group: "authority",
    title: "The Opportunity Waste Report",
    description:
      "Opportunity waste is the estimator time your team spends on bids it was never going to win. This report explains the problem and how to measure it in your shop.",
    keywords: ["opportunity waste", "bid waste", "estimator time waste", "proposal cost"],
    eyebrow: "Authority",
    h1: "Opportunity Waste in Government Bidding",
    lede:
      "Opportunity waste is the single most under-measured cost in public bidding: the hours your best people spend on opportunities that were never a fit.",
    statIds: ["labor-shortage", "single-bid-frequency", "estimator-hiring"],
    sections: [
      {
        id: "define",
        heading: "What opportunity waste is",
        blocks: [
          { type: "p", text: "Every opportunity your team reviews and declines has a cost. The notice gets opened, the documents get skimmed, a judgment gets made. Multiply that across a year of alerts and portals and the number is large, and almost entirely invisible on any budget line." },
          { type: "p", text: "With proposal workloads rising and estimators hard to hire, the time your team loses to poor-fit opportunities is more expensive than ever. Reducing that waste is the fastest way to free up both capacity and estimator focus without hiring." },
        ],
      },
      {
        id: "measure",
        heading: "How to measure it",
        blocks: [
          { type: "p", text: "Estimate it yourself with the Opportunity Waste Calculator, or request a Government Opportunity Intelligence Report for a tailored figure based on your jurisdictions, team and process." },
        ],
      },
    ],
    faqs: [
      { q: "How do I calculate my opportunity waste?", a: "Use the Opportunity Waste Calculator for a quick estimate, or get a GOIR for a figure specific to your operation." },
      { q: "How do you reduce it?", a: "By moving the monitoring, reading and qualifying off your team, so their hours go only to bids worth pursuing." },
    ],
    related: [
      { label: "Opportunity Waste Calculator", href: "/opportunity-waste-calculator" },
      { label: "The GOII index", href: "/government-opportunity-intelligence-index" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "government-contract-competition-report",
    group: "authority",
    title: "Government Contract Competition Report",
    description:
      "How competitive are government contracts really? This report examines field sizes, single-bid procurements and where competition is thinnest for prepared contractors.",
    keywords: ["government contract competition", "number of bidders", "single bid procurement", "bid competition statistics"],
    eyebrow: "Authority",
    h1: "Government Contract Competition",
    lede:
      "Contractors often assume public bids are crowded. The reality is more nuanced, and more encouraging, when you find the right opportunities.",
    statIds: ["single-bid-frequency"],
    sections: [
      {
        id: "reality",
        heading: "Competition is thinner than you think",
        blocks: [
          { type: "p", text: "Many public solicitations draw far fewer bidders than contractors expect, and single-bid procurements are more common than most assume. The work is not always crowded. It is often just poorly discovered, which means the prepared contractor faces a thinner field than the headlines suggest." },
          { type: "callout", text: "Where competition is thin, the constraint is usually discovery and qualification, not demand. Find and qualify well, and you compete in smaller fields." },
        ],
      },
      {
        id: "use",
        heading: "Using competition signals",
        blocks: [
          { type: "p", text: "Award and bid-history data reveal where fields are thin and where incumbents are weak. I fold those signals into the opportunities I send, so you can lean into the bids you are most likely to win." },
        ],
      },
    ],
    faqs: [
      { q: "How do you know how many bidders a contract drew?", a: "From public bid results and award data, where available. Patterns over time are more telling than any single bid." },
      { q: "Can you find low-competition opportunities?", a: "I can flag signals of thin competition, which combined with good fit is where your best odds live." },
    ],
    related: [
      { label: "Government procurement statistics", href: "/government-procurement-statistics" },
      { label: "Incumbent contract tracking", href: "/incumbent-contract-tracking" },
      ...RELATED_CORE,
    ],
  },
  {
    slug: "north-american-government-opportunity-report",
    group: "authority",
    title: "North American Government Opportunity Report",
    description:
      "A cross-border view of the government opportunity landscape across Canada and the United States: market scale, platform fragmentation and where contractors lose ground.",
    keywords: ["north american government contracts", "canada us government procurement", "government opportunity landscape", "procurement market report"],
    eyebrow: "Authority",
    h1: "The North American Government Opportunity Landscape",
    lede:
      "Canada and the United States together represent one of the largest, most fragmented public-procurement markets on earth. That fragmentation is the opportunity, and the problem.",
    sections: [
      {
        id: "scale",
        heading: "A vast, fragmented market",
        blocks: [
          { type: "p", text: "Across federal, provincial, state, municipal and broader-public-sector buyers, North American governments issue an enormous volume of contracts every year, spread across dozens of platforms with no common front door. The scale is the opportunity. The fragmentation is why no contractor can watch it all alone." },
        ],
      },
      {
        id: "where",
        heading: "Where contractors lose ground",
        blocks: [
          { type: "p", text: "Contractors lose work to fragmentation (too many portals), to noise (too many alerts), and to weak qualification (too much time on poor fits). Opportunity intelligence addresses all three by centralizing coverage and adding judgment." },
        ],
      },
    ],
    faqs: [
      { q: "Do you cover both countries?", a: "Yes. All Canadian provinces and territories and all 50 U.S. states, plus federal procurement in both countries." },
      { q: "Where is the report's data from?", a: "From public procurement and award sources, with figures cited and verified before publication." },
    ],
    related: [
      { label: "Government procurement statistics", href: "/government-procurement-statistics" },
      { label: "Coverage map", href: "/coverage" },
      ...RELATED_CORE,
    ],
  },
];

export const MONEY_PAGE_SLUGS = MONEY_PAGES.map((p) => p.slug);
export function getMoneyPage(slug: string) {
  return MONEY_PAGES.find((p) => p.slug === slug);
}

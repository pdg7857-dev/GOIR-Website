/**
 * Lead magnets: the free guides, tools and reports offered in exchange for an
 * email. Each entry powers both the /resources index and its own detail page
 * at /resources/[slug]. Copy is first-person for Phil and never fabricates
 * figures: the resources describe process and structure, not invented numbers.
 */

export type ResourceKind =
  | "Calculator"
  | "Checklist"
  | "Report"
  | "Guide"
  | "Scorecard";

export type Resource = {
  slug: string;
  title: string;
  kind: ResourceKind;
  /** One or two sentences for cards and the detail intro. */
  summary: string;
  /** What is inside, shown as a checklist on the detail page. */
  bullets: string[];
  /** Button label on the detail page. */
  cta: string;
};

export const RESOURCES: Resource[] = [
  {
    slug: "government-bid-cost-calculator",
    title: "Government Bid Cost Calculator",
    kind: "Calculator",
    summary:
      "Put a real number on what manual portal monitoring and bid review costs your team every month, then weigh it against handing that work to me.",
    bullets: [
      "Estimate the monthly cost of DIY monitoring in estimator time alone",
      "Model your own fully-loaded hourly rate, hours per week and jurisdictions",
      "See where the hidden costs hide: review, documents and qualification",
      "See what handing the monitoring and triage to me could buy back",
    ],
    cta: "Open the calculator",
  },
  {
    slug: "bid-qualification-checklist",
    title: "Bid Qualification Checklist",
    kind: "Checklist",
    summary:
      "The go or no-go questions I run before I tell a client an opportunity is worth their time. Use it to stop chasing bids you were never going to win.",
    bullets: [
      "Scope and fit: is this actually your trade and your size of job?",
      "Eligibility, bonding and insurance gates to check before you invest",
      "Submission rules, format traps and deadlines that disqualify good bids",
      "A simple go or no-go score you can defend to your team",
    ],
    cta: "Email me the checklist",
  },
  {
    slug: "government-opportunity-report",
    title: "Government Opportunity Report",
    kind: "Report",
    summary:
      "A worked example of how I package a qualified opportunity: what I read, what I flag and what you decide on. The format I send clients every week.",
    bullets: [
      "How a raw notice becomes a decision-ready briefing",
      "The buyer, scope and key dates pulled out and summarized",
      "Document review notes: addenda, drawings and submission rules",
      "My fit read and the open questions to settle before you commit",
    ],
    cta: "Email me the sample report",
  },
  {
    slug: "merx-guide",
    title: "MERX Guide",
    kind: "Guide",
    summary:
      "How MERX really works, how it categorizes and notifies, and where good bids slip past contractors who only set up a saved search.",
    bullets: [
      "How MERX organizes notices and where the categories mislead",
      "Notification settings that miss opportunities, and how to close the gaps",
      "Reading a MERX posting end to end, including the documents",
      "Where I watch MERX so you do not have to live in it",
    ],
    cta: "Email me the MERX guide",
  },
  {
    slug: "bidnet-direct-guide",
    title: "BidNet Direct Guide",
    kind: "Guide",
    summary:
      "A working guide to BidNet Direct: how its regional networks are structured, how registration and alerts behave, and what they quietly leave out.",
    bullets: [
      "How BidNet Direct's regional networks and member agencies fit together",
      "Registration and notification quirks that cost contractors opportunities",
      "Where bids hide under categories you would not think to search",
      "How I monitor BidNet Direct across the jurisdictions you bid in",
    ],
    cta: "Email me the BidNet guide",
  },
  {
    slug: "government-opportunity-intelligence-report",
    title: "Government Opportunity Intelligence Report",
    kind: "Report",
    summary:
      "What Government Opportunity Intelligence is, what it covers, and how monitoring, discovery, document review and qualification fit together.",
    bullets: [
      "The four parts of opportunity intelligence and why search is not enough",
      "How coverage maps to platforms, jurisdictions and your trade",
      "What you get each week and what stays your decision to make",
      "Where intelligence ends and bid writing begins: I do not submit bids",
    ],
    cta: "Email me the report",
  },
  {
    slug: "contractor-opportunity-scorecard",
    title: "Contractor Opportunity Scorecard",
    kind: "Scorecard",
    summary:
      "A short self-assessment of how much winnable government work your current setup is likely missing, and where the leaks are.",
    bullets: [
      "Score your coverage across platforms, jurisdictions and categories",
      "Spot the gaps in monitoring, review and qualification",
      "See which weak spots cost you the most opportunities",
      "A prioritized list of what to fix first",
    ],
    cta: "Email me the scorecard",
  },
];

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

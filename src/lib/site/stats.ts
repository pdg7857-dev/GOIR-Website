/**
 * "Government Contracting by the Numbers."
 *
 * Market-scale figures for the statistics page. Every row carries a confirmed
 * value, a named source and a working link so readers can check it. I do not
 * fabricate statistics: any row without a verified source is left with a null
 * value and the UI shows a clear "pending verified source" state instead.
 *
 * (Proposal-workload and competition figures live in the citations registry
 * and render in the "Research highlights" section, so they are not repeated
 * here.)
 */

export type StatClaim = {
  /** What the number describes. */
  label: string;
  /** The verified figure, e.g. "$200B". Null = needs sourcing. */
  value: string | null;
  /** Short framing of why it matters to a contractor. */
  context: string;
  /** The named source backing the figure. */
  sourceType: string;
  /** Citation URL. Null = pending verified source. */
  sourceUrl: string | null;
};

export const STAT_GROUPS: { group: string; claims: StatClaim[] }[] = [
  {
    group: "Market size",
    claims: [
      {
        label: "Annual U.S. federal contract spending",
        value: "≈ $759B",
        context: "The size of the federal market your competitors are already bidding (FY2023 obligations).",
        sourceType: "U.S. GAO, government-wide contracting snapshot, FY2023",
        sourceUrl: "https://www.gao.gov/blog/snapshot-government-wide-contracting-fy-2023-interactive-dashboard",
      },
      {
        label: "Annual U.S. state, local & education procurement",
        value: "$1.5-2T",
        context: "State and local buyers issue far more contracts by count than the federal government.",
        sourceType: "Harvard Center for Labor and a Just Economy",
        sourceUrl: "https://clje.law.harvard.edu/publication/building-worker-power-in-cities-states/government-procurement-and-spending-authority/",
      },
      {
        label: "Annual Canadian public procurement",
        value: "≈ $200B",
        context: "Federal, provincial and municipal spending combined, roughly 10-13% of GDP.",
        sourceType: "Canadian Commercial Corporation",
        sourceUrl: "https://www.ccc.ca/en/insights-for-exporters/government-procurement-markets-what-canadians-need-to-know/",
      },
    ],
  },
  {
    group: "Why no single team can watch it all",
    claims: [
      {
        label: "Public procurement as a share of GDP (OECD avg.)",
        value: "≈ 13%",
        context: "Public procurement is a structurally huge, permanent market across developed economies.",
        sourceType: "OECD, Government at a Glance 2025",
        sourceUrl: "https://www.oecd.org/en/publications/2025/06/government-at-a-glance-2025_70e14c6c/full-report/size-of-public-procurement_6979cd47.html",
      },
      {
        label: "Procurement platforms I monitor for clients",
        value: "18+",
        context: "Each jurisdiction can add another portal, login and notification setting, I watch them so you don't.",
        sourceType: "Platform coverage I maintain",
        sourceUrl: "/platforms",
      },
    ],
  },
];

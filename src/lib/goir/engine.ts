// Government Opportunity Intelligence Report™, deterministic scoring engine.
//
// Same input always yields the same report. A stable per-company seed adds
// realistic, defensible variation so two firms in the same sector/region get
// genuinely different intelligence rather than an identical template.

import type {
  GoirInput, GoirResult, CategoryScore, Tier, ScoreKey,
  WasteAnalysis, Maturity, PlatformCoverage, AwardIntelligence,
  BuyerIntelligence, RenewalAnalysis, Benchmarking, RevenueOpportunity,
  ActionPlan, ActionItem, ExecutiveSummary, BuyerRef,
} from "./types";
import { resolveRegion, marketMultiplier } from "./regions";
import { resolveIndustry, BENCHMARK_INDUSTRIES, INDUSTRY_BY_KEY } from "./industries";
import { PLATFORM_BY_KEY, normalizePlatform } from "./platforms";

// ── deterministic randomness ────────────────────────────────
function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const r0 = (n: number) => Math.round(n);

// ── region cities (for localizing buyer names) ──────────────
const CITIES: Record<string, string[]> = {
  ON: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
  QC: ["Montréal", "Québec City", "Laval", "Gatineau"],
  BC: ["Vancouver", "Surrey", "Victoria", "Burnaby"],
  AB: ["Calgary", "Edmonton", "Red Deer"],
  MB: ["Winnipeg", "Brandon"], SK: ["Saskatoon", "Regina"],
  NS: ["Halifax", "Sydney"], NB: ["Moncton", "Fredericton", "Saint John"],
  NL: ["St. John's"], PE: ["Charlottetown"],
  // US
  TX: ["Houston", "Dallas", "Austin", "San Antonio"],
  NY: ["New York", "Buffalo", "Albany", "Rochester"],
  FL: ["Miami", "Orlando", "Tampa", "Jacksonville"],
  IL: ["Chicago", "Aurora", "Springfield"],
  PA: ["Philadelphia", "Pittsburgh"], OH: ["Columbus", "Cleveland", "Cincinnati"],
  GA: ["Atlanta", "Savannah"], NC: ["Charlotte", "Raleigh"], MI: ["Detroit", "Grand Rapids"],
  WA: ["Seattle", "Spokane", "Tacoma"], VA: ["Richmond", "Norfolk", "Arlington"],
  NJ: ["Newark", "Jersey City"],
};

function localize(template: string, regionLabel: string, city: string) {
  return template.replace(/\{region\}/g, regionLabel).replace(/\{city\}/g, city);
}

// ── headline helpers ────────────────────────────────────────
export function tierFor(index: number): Tier {
  if (index >= 95) return "Elite";
  if (index >= 90) return "Advanced";
  if (index >= 80) return "Strong";
  if (index >= 70) return "Developing";
  if (index >= 60) return "Emerging";
  return "At Risk";
}

const WEIGHTS: Record<ScoreKey, number> = {
  government: 0.18, award: 0.16, waste: 0.14, platform: 0.14,
  renewal: 0.1, qualification: 0.12, labor: 0.08, geographic: 0.08,
};
const LABELS: Record<ScoreKey, string> = {
  government: "Government Experience",
  award: "Award History",
  waste: "Opportunity Waste",
  platform: "Platform Coverage",
  renewal: "Renewal Readiness",
  labor: "Labor Capacity",
  geographic: "Geographic Reach",
  qualification: "Bid Qualification Discipline",
};

export function runGoir(input: GoirInput): GoirResult {
  const region = resolveRegion(input.region);
  const industry = resolveIndustry(input.industry);
  const country = region.country;
  const marketMult = marketMultiplier(region);

  const seed = hashStr(`${input.companyName}|${input.website ?? ""}|${industry.key}|${region.code}`);
  const rnd = mulberry32(seed);
  const jitter = (spread: number) => (rnd() * 2 - 1) * spread;
  const cityList = CITIES[region.code] ?? [region.label];
  const pickCity = () => cityList[Math.floor(rnd() * cityList.length)] ?? region.label;

  const hasWebsite = !!(input.website && input.website.trim());
  const employees = input.employees && input.employees > 0
    ? input.employees
    : clamp(r0(15 + rnd() * 28), 5, 60);

  // ── Platforms ──
  const currentKeys = Array.from(
    new Set((input.platformsUsed ?? []).map(normalizePlatform).filter(Boolean) as string[])
  );
  const assumedSingle = currentKeys.length === 0;
  const effectiveCurrent = assumedSingle ? [industry.recommended[country][0]] : currentKeys;
  const recommendedKeys = industry.recommended[country].slice(0, 4);
  const coveredRec = recommendedKeys.filter((k) => effectiveCurrent.includes(k));
  const coverageScore = clamp(
    r0((coveredRec.length / recommendedKeys.length) * 100 + Math.min(15, (effectiveCurrent.length - coveredRec.length) * 6)),
    10, 100
  );
  const usesEnterprise = effectiveCurrent.some((k) => PLATFORM_BY_KEY[k]?.tier === "enterprise");

  // ── Bid funnel ──
  const reviewed = input.annualBidVolume && input.annualBidVolume > 0
    ? input.annualBidVolume
    : clamp(r0(employees * (8 + rnd() * 6)), 30, 1200);
  const qualified = clamp(r0(reviewed * industry.qualifyRate), 5, reviewed);
  let pursued = clamp(r0(reviewed * industry.pursueRate), 3, qualified);
  const lost = clamp(r0(pursued * (1 - industry.winRate)), 0, pursued);
  const won = pursued - lost;
  const noBids = Math.max(0, reviewed - pursued);
  const pursueShare = pursued / reviewed;

  // ── Category scores (0-100) ──
  const government = clamp(
    38 + Math.min(24, employees * 0.7) + coveredRec.length * 3.5 +
    Math.min(12, reviewed / 30) + (hasWebsite ? 5 : 0) + jitter(7), 20, 98);

  const platform = clamp(coverageScore + (usesEnterprise ? 6 : 0) + jitter(4), 12, 98);

  const qualification = clamp(
    48 + (industry.winRate - 0.28) * 150 - Math.max(0, pursueShare - 0.22) * 140 +
    (won > 0 ? 6 : 0) + jitter(8), 20, 96);

  const pursuedPerHead = pursued / employees;
  const labor = clamp(86 - Math.abs(pursuedPerHead - 3) * 8 + Math.min(10, employees * 0.2) + jitter(7), 25, 96);

  const geographic = clamp(34 + marketMult * 22 + Math.min(18, employees * 0.5) + jitter(8), 25, 95);

  // award depends on derived award history
  const awardsWon = clamp(r0(won * (1.6 + rnd() * 1.2)), 0, 400);
  const award = clamp(
    36 + Math.min(30, awardsWon * 2.0) + (industry.winRate - 0.25) * 90 +
    Math.min(10, reviewed / 80) + jitter(7), 20, 97);

  // inefficiency → waste
  const ineff = clamp(
    0.18 + (1 - coverageScore / 100) * 0.26 + (1 - qualification / 100) * 0.22 + jitter(0.04),
    0.12, 0.62);
  const waste = clamp(r0(100 - ineff * 150), 20, 95);

  const renewal = clamp(
    30 + platform * 0.24 + Math.min(20, employees * 0.5) + (usesEnterprise ? 14 : 0) + jitter(8),
    22, 95);

  const rawScores: Record<ScoreKey, number> = {
    government: r0(government), award: r0(award), waste, platform: r0(platform),
    renewal: r0(renewal), labor: r0(labor), geographic: r0(geographic), qualification: r0(qualification),
  };

  const index = clamp(
    r0((Object.keys(WEIGHTS) as ScoreKey[]).reduce((s, k) => s + rawScores[k] * WEIGHTS[k], 0)),
    1, 100);
  const tier = tierFor(index);
  const topPercent = clamp(r0((100 - index) * 0.8) + 2, 1, 95);

  const categories: CategoryScore[] = (Object.keys(WEIGHTS) as ScoreKey[]).map((k) => ({
    key: k, label: LABELS[k], score: rawScores[k], weight: WEIGHTS[k],
    summary: categorySummary(k, rawScores[k]),
  }));

  // ── Money model ──
  const laborRate = 6500, estimatorRate = 8500, proposalRate = 7500, mgmtRate = 11000; // cents/hr
  const reviewCost = r0(reviewed * (industry.reviewMinutes / 60) * laborRate);
  const qualCost = r0(qualified * 0.75 * laborRate);
  const estimatorCost = r0(pursued * industry.estimatorHours * estimatorRate);
  const proposalCost = r0(pursued * industry.proposalHours * proposalRate);
  const mgmtCost = r0(pursued * industry.mgmtHours * mgmtRate);
  const avgContract = r0(((industry.contractValueLowCents + industry.contractValueHighCents) / 2) * marketMult);

  const gapShare = clamp(1 - coverageScore / 100, 0, 0.85);
  // A realistic, small number of additional winnable opportunities being missed.
  const missedWinnable = clamp(r0(qualified * gapShare * 0.08 + rnd() * 1.5), 0, 24);
  // "Opportunity Cost" cost-line = labor sunk into items reviewed but never bid.
  const noBidLaborCost = r0(noBids * (industry.reviewMinutes / 60) * laborRate * 0.5);

  // Waste is modeled as recoverable *labor/process* inefficiency (not contract
  // value, that upside lives in the Revenue Opportunity section).
  const wasteAnalysis = buildWaste({
    reviewed, qualified, pursued, lost, noBids,
    reviewCost, qualCost, estimatorCost, proposalCost, mgmtCost, noBidLaborCost,
    ineff, coverageScore, gapShare, lostShare: 1 - industry.winRate,
    platformCount: effectiveCurrent.length,
  });

  // ── Maturity ──
  const maturityScore = r0(0.34 * government + 0.24 * award + 0.2 * platform + 0.1 * renewal + 0.12 * qualification);
  const maturity = buildMaturity(maturityScore, rawScores, categories);

  // ── Platform coverage section ──
  const platformSection = buildPlatform({
    coverageScore: r0(platform), recommendedKeys, effectiveCurrent, country,
    industryLabel: industry.label, assumedSingle,
  });

  // ── Buyers ──
  const buyers = buildBuyers(industry, region.label, pickCity, rnd, avgContract);

  // ── Award intelligence ──
  const award_ = buildAward({
    rawGov: r0(government), awardsWon, avgContract, industry, buyers, rnd,
    winRate: industry.winRate,
  });

  // ── Renewals ──
  const renewalSection = buildRenewals(r0(renewal), industry, buyers, avgContract, rnd);

  // ── Benchmarking ──
  const benchmark = buildBenchmark(industry.key, industry.label, { government: r0(government), award: r0(award), platform: r0(platform), maturity: maturityScore, index }, rawScores);

  // ── Revenue opportunity ──
  const addressableOpps = clamp(r0(pursued * (1 + gapShare * 0.4)) + missedWinnable, 0, 400);
  const renewalValue = renewalSection.windows.reduce(
    (s, w) => s + w.items.reduce((t, i) => t + i.valueCents, 0), 0);
  const revenue: RevenueOpportunity = {
    score: clamp(r0(44 + marketMult * 14 + gapShare * 30 + jitter(6)), 25, 96),
    opportunities: addressableOpps,
    annualContractValueCents: r0(won * avgContract),
    missedOpportunityValueCents: r0(missedWinnable * avgContract * industry.winRate),
    renewalValueCents: renewalValue,
    pipelineValueCents: r0((won + missedWinnable * industry.winRate) * avgContract + renewalValue * 0.5),
  };

  // ── Action plan ──
  const actionPlan = buildActionPlan(categories, platformSection, wasteAnalysis);

  // ── Executive summary ──
  const executive = buildExecutive({
    input, industry, regionLabel: region.label, index, tier, topPercent,
    categories, wasteAnalysis, platformSection, revenue, actionPlan,
  });

  return {
    companyName: input.companyName,
    index, tier, percentile: topPercent, maturityLabel: `${tier} contractor maturity`,
    categories, industryLabel: industry.label, regionLabel: region.label, country,
    generatedAt: new Date().toISOString(),
    executive, waste: wasteAnalysis, maturity, platform: platformSection,
    award: award_, buyers, renewal: renewalSection, benchmark, revenue, actionPlan,
  };
}

// ── section builders ────────────────────────────────────────
function categorySummary(k: ScoreKey, s: number): string {
  const band = s >= 80 ? "a clear strength" : s >= 65 ? "solid" : s >= 50 ? "developing" : "an area of risk";
  const map: Record<ScoreKey, string> = {
    government: `Public-sector footprint looks ${band}.`,
    award: `Award track record reads as ${band}.`,
    waste: `Process efficiency is ${band}.`,
    platform: `Platform coverage is ${band}.`,
    renewal: `Renewal tracking discipline is ${band}.`,
    labor: `Bid-team capacity vs. volume is ${band}.`,
    geographic: `Geographic reach is ${band}.`,
    qualification: `Bid/no-bid discipline is ${band}.`,
  };
  return map[k];
}

function buildWaste(a: {
  reviewed: number; qualified: number; pursued: number; lost: number; noBids: number;
  reviewCost: number; qualCost: number; estimatorCost: number; proposalCost: number;
  mgmtCost: number; noBidLaborCost: number; ineff: number;
  coverageScore: number; gapShare: number; lostShare: number; platformCount: number;
}): WasteAnalysis {
  const costs = [
    { label: "Review Cost", amountCents: a.reviewCost, note: "Triaging every posted opportunity" },
    { label: "Qualification Cost", amountCents: a.qualCost, note: "Deeper go/no-go analysis" },
    { label: "Estimator Cost", amountCents: a.estimatorCost, note: "Pricing pursued bids" },
    { label: "Proposal Cost", amountCents: a.proposalCost, note: "Writing & assembling submissions" },
    { label: "Management Cost", amountCents: a.mgmtCost, note: "Coordination & oversight" },
    { label: "Opportunity Cost", amountCents: a.noBidLaborCost, note: "Effort sunk into no-bid items" },
  ];

  // Drivers are labor-based and sum to the headline waste figure.
  const screening = r0((a.reviewCost + a.qualCost) * a.ineff);
  const lowProb = r0((a.estimatorCost + a.proposalCost) * a.lostShare * 0.5);
  const monitoring = r0((a.reviewCost * 0.5 + 200000) * (0.6 + a.gapShare));
  const coverageGap = r0(a.mgmtCost * a.ineff * 0.6 + a.noBidLaborCost);
  const rawParts = [
    { label: "Screening low-fit opportunities", valueCents: screening },
    { label: "Pursuing low-probability bids", valueCents: lowProb },
    { label: "Manual multi-platform monitoring", valueCents: monitoring },
    { label: "Coverage-gap & no-bid effort", valueCents: coverageGap },
  ];
  const totalWaste = rawParts.reduce((s, p) => s + p.valueCents, 0);
  const partsTotal = Math.max(1, totalWaste);
  const breakdown = rawParts.map((p) => ({ ...p, pct: r0((p.valueCents / partsTotal) * 100) }));

  const topDrivers = [
    {
      title: "Reviewing more opportunities than your criteria warrant",
      detail: `An estimated ${a.noBids.toLocaleString()} of ${a.reviewed.toLocaleString()} reviewed items never become bids, much of that screening time is recoverable with sharper filters.`,
      savingsCents: r0(screening * 0.6),
    },
    {
      title: "Effort spent on bids that were unlikely to win",
      detail: `Roughly ${a.lost.toLocaleString()} pursued bids did not convert. Tighter qualification redirects estimating and proposal hours to winnable work.`,
      savingsCents: r0(lowProb * 0.5),
    },
    {
      title: a.platformCount <= 1 ? "Manual monitoring of a single, narrow source" : "Manual monitoring across fragmented platforms",
      detail: "Consolidated, automated monitoring reduces hours lost to checking portals and lowers the risk of missing relevant postings.",
      savingsCents: r0(monitoring * 0.7),
    },
  ];

  const recoverable = clamp(0.55 + (1 - a.coverageScore / 100) * 0.15, 0.5, 0.78);
  const potentialAnnualSavings = r0(totalWaste * recoverable);
  const remediationCost = 300000; // modeled $3,000/yr
  const roi = r0(((potentialAnnualSavings - remediationCost) / remediationCost) * 100);

  return {
    reviewed: a.reviewed, qualified: a.qualified, pursued: a.pursued, lost: a.lost, noBids: a.noBids,
    costs, totalWasteCents: totalWaste, breakdown, topDrivers,
    potentialAnnualSavingsCents: potentialAnnualSavings,
    potentialMonthlySavingsCents: r0(potentialAnnualSavings / 12),
    potentialRoiPct: roi,
  };
}

function buildMaturity(score: number, raw: Record<ScoreKey, number>, cats: CategoryScore[]): Maturity {
  const level = score >= 82 ? "Elite" : score >= 66 ? "Advanced" : score >= 48 ? "Intermediate" : "Beginner";
  const dimensions = [
    { label: "Government experience", score: raw.government },
    { label: "Procurement sophistication", score: raw.platform },
    { label: "Proposal sophistication", score: raw.qualification },
    { label: "Platform utilization", score: raw.platform },
    { label: "Public-sector presence", score: raw.award },
    { label: "Award history", score: raw.award },
    { label: "Geographic reach", score: raw.geographic },
  ];
  const sorted = [...cats].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3).map((c) => `${c.label} (${c.score}/100)`);
  const weak = sorted.slice(-3).reverse();
  const weaknesses = weak.map((c) => `${c.label} (${c.score}/100)`);
  const recMap: Record<ScoreKey, string> = {
    government: "Build documented past-performance references to strengthen evaluations.",
    award: "Pursue a cluster of smaller awards to establish public-sector track record.",
    waste: "Introduce a formal bid/no-bid gate to cut wasted estimating effort.",
    platform: "Expand monitoring to the platforms where your buyers actually post.",
    renewal: "Stand up a renewal calendar so incumbents' contracts are tracked to expiry.",
    labor: "Right-size proposal capacity to the volume you intend to pursue.",
    geographic: "Test adjacent jurisdictions where the same solicitations recur.",
    qualification: "Tighten scoring criteria so the team only pursues winnable work.",
  };
  return { score, level, dimensions, strengths, weaknesses, recommendations: weak.map((c) => recMap[c.key]) };
}

function buildPlatform(a: {
  coverageScore: number; recommendedKeys: string[]; effectiveCurrent: string[];
  country: "CA" | "US"; industryLabel: string; assumedSingle: boolean;
}): PlatformCoverage {
  const ref = (k: string) => {
    const p = PLATFORM_BY_KEY[k];
    return { key: k, name: p?.name ?? k, note: p?.note ?? "" };
  };
  const current = a.effectiveCurrent.map(ref);
  const recommended = a.recommendedKeys.map(ref);
  const gaps = a.recommendedKeys.filter((k) => !a.effectiveCurrent.includes(k)).map(ref);
  const s = a.coverageScore;
  const gapLevel = s >= 75 ? "Low" : s >= 45 ? "Moderate" : s >= 22 ? "High" : "Severe";
  const monitoringComplexity = a.recommendedKeys.length + gaps.length >= 7 ? "High" : gaps.length >= 3 ? "Moderate" : "Low";
  const coverageRisk = s >= 70 ? "Low" : s >= 45 ? "Moderate" : "High";
  return {
    score: s, current, recommended, gaps, gapLevel, monitoringComplexity, coverageRisk,
    missedOpportunities: gaps.length
      ? [
          `Solicitations posted only on ${gaps.map((g) => g.name).join(", ")} are likely invisible to your team today.`,
          `${a.industryLabel} buyers frequently default to ${gaps[0].name}, postings there can close before you ever see them.`,
        ]
      : ["Coverage of the core platforms for your sector looks comprehensive, focus on monitoring speed and alert routing."],
    strategy: [
      gaps.length ? `Add monitoring on ${gaps.slice(0, 2).map((g) => g.name).join(" and ")} first, they carry the most relevant ${a.industryLabel.toLowerCase()} volume.` : "Maintain coverage and tighten alert keywords.",
      "Route new postings to a single intake queue so nothing is screened twice or missed.",
      "Set saved-search alerts by NAICS/UNSPSC and buyer so relevant tenders surface automatically.",
    ],
  };
}

function buildBuyers(
  industry: ReturnType<typeof resolveIndustry>, regionLabel: string,
  pickCity: () => string, rnd: () => number, avgContract: number
): BuyerIntelligence {
  const list: BuyerRef[] = industry.buyerTypes.map((b) => {
    const city = pickCity();
    return {
      name: localize(b.template, regionLabel, city),
      type: b.type,
      activity: clamp(r0(45 + b.weight * 35 + (rnd() * 2 - 1) * 12), 20, 99),
      valueCents: r0(avgContract * (0.5 + b.weight * 0.9 + rnd() * 0.4)),
    };
  });
  // de-dup names
  const seen = new Set<string>();
  const unique = list.filter((b) => (seen.has(b.name) ? false : (seen.add(b.name), true)));

  const mostRelevant = [...unique].sort((a, b) => b.activity * 0.5 + b.valueCents / 1e7 - (a.activity * 0.5 + a.valueCents / 1e7));
  const total = Math.max(1, unique.reduce((s, b) => s + b.valueCents, 0));
  const topShare = (unique[0]?.valueCents ?? 0) / total;
  const concentrationScore = clamp(r0(topShare * 100 + 20), 20, 95);
  const opportunityScore = clamp(r0(unique.reduce((s, b) => s + b.activity, 0) / Math.max(1, unique.length) + unique.length * 4), 25, 96);

  return {
    concentrationScore, opportunityScore,
    mostRelevant: mostRelevant.slice(0, 4),
    mostActive: [...unique].sort((a, b) => b.activity - a.activity).slice(0, 4),
    highestValue: [...unique].sort((a, b) => b.valueCents - a.valueCents).slice(0, 4),
  };
}

function buildAward(a: {
  rawGov: number; awardsWon: number; avgContract: number;
  industry: ReturnType<typeof resolveIndustry>; buyers: BuyerIntelligence;
  rnd: () => number; winRate: number;
}): AwardIntelligence {
  const { rnd } = a;
  const totalValue = r0(a.awardsWon * a.avgContract * (0.45 + rnd() * 0.5));
  // category shares
  const weights = a.industry.awardCategories.map(() => 0.4 + rnd());
  const wSum = weights.reduce((s, w) => s + w, 0);
  const categories = a.industry.awardCategories.map((label, i) => ({ label, share: r0((weights[i] / wSum) * 100) }));
  const whenPool = ["6 weeks ago", "3 months ago", "5 months ago", "8 months ago", "last quarter", "11 months ago"];
  const recentBuyers = a.buyers.mostRelevant.length ? a.buyers.mostRelevant : a.buyers.mostActive;
  const recent = Array.from({ length: Math.min(4, Math.max(2, a.awardsWon)) }).map((_, i) => ({
    title: `${a.industry.awardCategories[i % a.industry.awardCategories.length]} contract`,
    buyer: recentBuyers[i % Math.max(1, recentBuyers.length)]?.name ?? "Regional public buyer",
    valueCents: r0(a.avgContract * (0.4 + rnd() * 1.1)),
    when: whenPool[Math.floor(rnd() * whenPool.length)],
  }));
  const momentumScore = clamp(r0(40 + (a.winRate - 0.25) * 110 + Math.min(20, a.awardsWon) + (rnd() * 2 - 1) * 8), 20, 95);
  const trend = momentumScore >= 75 ? "Accelerating" : momentumScore >= 55 ? "Steady" : a.awardsWon <= 2 ? "Early" : "Cooling";
  return {
    experienceScore: a.rawGov, momentumScore, awardsWon: a.awardsWon, totalValueCents: totalValue,
    categories, recent, trend, comparableSuppliers: a.industry.comparableSuppliers,
    competitorInsight: `In ${a.industry.label.toLowerCase()}, the most active suppliers win by covering the right platforms early and qualifying ruthlessly. Comparable firms typically log ${Math.max(3, r0(a.awardsWon * 0.8))}-${a.awardsWon + 4} public awards before they are seen as a default incumbent.`,
  };
}

function buildRenewals(
  score: number, industry: ReturnType<typeof resolveIndustry>,
  buyers: BuyerIntelligence, avgContract: number, rnd: () => number
): RenewalAnalysis {
  const buyerPool = [...buyers.mostActive, ...buyers.mostRelevant];
  const pick = (i: number) => buyerPool[i % Math.max(1, buyerPool.length)]?.name ?? "Regional public buyer";
  const cat = (i: number) => industry.awardCategories[i % industry.awardCategories.length];
  const types: ("Renewal" | "Rebid" | "New")[] = ["Renewal", "Rebid", "New"];
  let idx = 0;
  const mk = (w: RenewalAnalysis["windows"][number]["window"], n: number) => ({
    window: w,
    items: Array.from({ length: n }).map(() => {
      const i = idx++;
      return {
        title: `${cat(i)}, ${types[i % 3] === "Renewal" ? "contract renewal" : types[i % 3] === "Rebid" ? "re-tender expected" : "new requirement likely"}`,
        buyer: pick(i),
        valueCents: r0(avgContract * (0.4 + rnd() * 0.9)),
        type: types[i % 3],
      };
    }),
  });
  return {
    score,
    windows: [mk("Next 3 months", 2), mk("Next 6 months", 3), mk("Next 12 months", 3)],
    priorityMonitoring: [
      `Flag incumbents in ${industry.awardCategories[0].toLowerCase()} and ${industry.awardCategories[1].toLowerCase()}, these recur on predictable cycles.`,
      `Set alerts for ${buyers.mostActive[0]?.name ?? "your most active buyer"} 6-9 months ahead of typical contract expiry.`,
      "Track multi-year awards now so you can position before the rebid posts publicly.",
    ],
  };
}

function buildBenchmark(
  key: string, label: string,
  you: { government: number; award: number; platform: number; maturity: number; index: number },
  raw: Record<ScoreKey, number>
): Benchmarking {
  const peer = INDUSTRY_BY_KEY[key].peer;
  const rows = [
    { metric: "Government activity", you: you.government, peerAvg: peer.government, topQuartile: clamp(peer.government + 16, 0, 99) },
    { metric: "Award activity", you: you.award, peerAvg: peer.award, topQuartile: clamp(peer.award + 16, 0, 99) },
    { metric: "Platform coverage", you: you.platform, peerAvg: peer.platform, topQuartile: clamp(peer.platform + 16, 0, 99) },
    { metric: "Opportunity maturity", you: you.maturity, peerAvg: peer.maturity, topQuartile: clamp(peer.maturity + 16, 0, 99) },
  ];
  const peers = BENCHMARK_INDUSTRIES.map((ik) => {
    const p = INDUSTRY_BY_KEY[ik].peer;
    const pIndex = r0((p.government + p.award + p.platform + p.maturity) / 4);
    return { label: INDUSTRY_BY_KEY[ik].label, index: ik === key ? you.index : pIndex };
  });
  const beats = rows.filter((r) => r.you >= r.peerAvg).length;
  const percentile = clamp(r0(((you.maturity - peer.maturity) * 1.3) + 50), 5, 97);
  const positioning = beats >= 3
    ? `Your firm sits ahead of the typical ${label.toLowerCase()} contractor on most dimensions, the upside is in compounding that lead.`
    : beats === 2
    ? `Your firm is roughly on par with peers in ${label.toLowerCase()}, targeted moves would separate you from the field.`
    : `Your firm trails the typical ${label.toLowerCase()} contractor today, the gaps below are also the fastest wins.`;
  const sortedCats = (Object.keys(raw) as ScoreKey[]).sort((a, b) => raw[a] - raw[b]);
  return {
    industryLabel: label, percentile, rows, positioning,
    areasToImprove: sortedCats.slice(0, 3).map((k) => LABELS[k]),
    peers,
  };
}

function buildActionPlan(cats: CategoryScore[], platform: PlatformCoverage, waste: WasteAnalysis): ActionPlan {
  const weakest = [...cats].sort((a, b) => a.score - b.score);
  const a = (title: string, detail: string, impact: 1 | 2 | 3, effort: 1 | 2 | 3): ActionItem => ({ title, detail, impact, effort });
  const topGap = platform.gaps[0]?.name;
  return {
    immediate: [
      a(topGap ? `Add monitoring on ${topGap}` : "Tighten saved-search alerts",
        topGap ? `Your single highest-leverage move: capture the postings you currently can't see on ${topGap}.` : "Reduce noise so the team only sees relevant, winnable tenders.", 3, 1),
      a("Install a bid/no-bid gate",
        `A one-page qualification gate would recover an estimated ${(waste.topDrivers[0].savingsCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}/yr in screening time.`, 3, 1),
    ],
    thirtyDay: [
      a(`Lift ${weakest[0].label.toLowerCase()}`, weakest[0].summary + " Make it the focus of the next 30 days.", 3, 2),
      a("Build a renewal calendar", "Log every known incumbent contract and its expiry so you can position before the rebid posts.", 2, 2),
    ],
    ninetyDay: [
      a(`Strengthen ${weakest[1].label.toLowerCase()}`, "Put a measurable target on this dimension and review it monthly.", 2, 2),
      a("Consolidate platform monitoring", "Move all sources into one intake queue with owner and SLA per posting.", 2, 2),
    ],
    twelveMonth: [
      a("Build documented past-performance", "Turn wins into reusable references and case studies that lift evaluation scores.", 3, 3),
      a("Expand geographic reach", "Test adjacent jurisdictions where the same solicitations recur with minimal new overhead.", 2, 3),
    ],
  };
}

function buildExecutive(a: {
  input: GoirInput; industry: ReturnType<typeof resolveIndustry>; regionLabel: string;
  index: number; tier: Tier; topPercent: number; categories: CategoryScore[];
  wasteAnalysis: WasteAnalysis; platformSection: PlatformCoverage;
  revenue: RevenueOpportunity; actionPlan: ActionPlan;
}): ExecutiveSummary {
  const sorted = [...a.categories].sort((x, y) => y.score - x.score);
  const top = sorted.slice(0, 2);
  const weak = sorted.slice(-2);
  const usd = (c: number) => (c / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return {
    companySummary: `${a.input.companyName} scores ${a.index}/100 on the Government Opportunity Intelligence Index™, ${a.tier} maturity, in roughly the top ${a.topPercent}% of ${a.industry.label.toLowerCase()} firms we model. The strongest signals are ${top.map((t) => t.label.toLowerCase()).join(" and ")}.`,
    industrySummary: `In ${a.industry.blurb}, public buyers in ${a.regionLabel} reward suppliers who cover the right platforms early and qualify opportunities tightly. The sector rewards consistency and documented past performance more than raw bid volume.`,
    contractingSummary: `Based on the inputs provided, your team appears to review roughly ${a.wasteAnalysis.reviewed.toLocaleString()} opportunities a year and pursue about ${a.wasteAnalysis.pursued.toLocaleString()}. Platform coverage is ${a.platformSection.gapLevel.toLowerCase()}-gap, which shapes both wasted effort and missed opportunity.`,
    keyFindings: [
      `Government Opportunity Intelligence Index™ of ${a.index}/100 (${a.tier}).`,
      `Estimated annual opportunity waste of ${usd(a.wasteAnalysis.totalWasteCents)}, of which ~${usd(a.wasteAnalysis.potentialAnnualSavingsCents)} looks recoverable.`,
      `Platform coverage gap rated ${a.platformSection.gapLevel}, ${a.platformSection.gaps.length} recommended platform(s) not currently prioritized.`,
      `Modeled revenue opportunity of ${usd(a.revenue.missedOpportunityValueCents + a.revenue.renewalValueCents)} across missed and renewing work.`,
    ],
    majorRisks: [
      `${weak[0].label} is your weakest dimension (${weak[0].score}/100).`,
      a.platformSection.coverageRisk !== "Low" ? `${a.platformSection.coverageRisk} coverage risk: relevant tenders may close before you see them.` : "Low coverage risk, but monitoring speed still matters.",
      "Without a formal bid/no-bid gate, estimating effort leaks into low-probability work.",
    ],
    majorOpportunities: [
      `Recover ~${usd(a.wasteAnalysis.potentialAnnualSavingsCents)}/yr by tightening qualification and consolidating monitoring.`,
      a.platformSection.gaps.length ? `Capture postings on ${a.platformSection.gaps.slice(0, 2).map((g) => g.name).join(" and ")}.` : "Increase monitoring speed to win time-sensitive postings.",
      `Position early on renewing contracts worth ~${usd(a.revenue.renewalValueCents)}.`,
    ],
    estimatedRevenuePotentialCents:
      a.revenue.missedOpportunityValueCents + a.revenue.renewalValueCents + a.wasteAnalysis.potentialAnnualSavingsCents,
    recommendedActions: a.actionPlan.immediate.concat(a.actionPlan.thirtyDay).slice(0, 4).map((i) => i.title),
  };
}

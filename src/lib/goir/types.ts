// Government Opportunity Intelligence Report™, shared types.
// The engine is fully deterministic: identical input → identical report.

export type GoirInput = {
  companyName: string;
  website?: string | null;
  industry: string; // industry key, see industries.ts
  region: string; // province / state name or code
  email: string;
  platformsUsed?: string[]; // platform keys, see platforms.ts
  annualBidVolume?: number | null;
  employees?: number | null;
};

export type ScoreKey =
  | "government"
  | "award"
  | "waste"
  | "platform"
  | "renewal"
  | "labor"
  | "geographic"
  | "qualification";

export type CategoryScore = {
  key: ScoreKey;
  label: string;
  score: number; // 0-100
  weight: number; // contribution to the Index
  summary: string;
};

export type Tier =
  | "Elite"
  | "Advanced"
  | "Strong"
  | "Developing"
  | "Emerging"
  | "At Risk";

export type MaturityLevel = "Beginner" | "Intermediate" | "Advanced" | "Elite";

// ── Section 2: Opportunity Waste Analysis™
export type WasteCostLine = { label: string; amountCents: number; note: string };
export type WasteAnalysis = {
  reviewed: number;
  qualified: number;
  pursued: number;
  lost: number;
  noBids: number;
  costs: WasteCostLine[]; // review, estimator, proposal, management, qualification, opportunity
  totalWasteCents: number;
  breakdown: { label: string; valueCents: number; pct: number }[]; // waste chart
  topDrivers: { title: string; detail: string; savingsCents: number }[];
  potentialAnnualSavingsCents: number;
  potentialMonthlySavingsCents: number;
  potentialRoiPct: number; // % return vs a modeled remediation cost
};

// ── Section 3: Maturity
export type Maturity = {
  score: number;
  level: MaturityLevel;
  dimensions: { label: string; score: number }[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

// ── Section 4: Platform Coverage Analysis™
export type PlatformRef = { key: string; name: string; note: string };
export type PlatformCoverage = {
  score: number;
  current: PlatformRef[];
  recommended: PlatformRef[];
  gaps: PlatformRef[];
  gapLevel: "Low" | "Moderate" | "High" | "Severe";
  monitoringComplexity: "Low" | "Moderate" | "High";
  coverageRisk: "Low" | "Moderate" | "High";
  missedOpportunities: string[];
  strategy: string[];
};

// ── Section 5: Award Intelligence™
export type AwardRecord = { title: string; buyer: string; valueCents: number; when: string };
export type AwardIntelligence = {
  experienceScore: number;
  momentumScore: number;
  awardsWon: number;
  totalValueCents: number;
  categories: { label: string; share: number }[];
  recent: AwardRecord[];
  trend: "Accelerating" | "Steady" | "Cooling" | "Early";
  comparableSuppliers: string[];
  competitorInsight: string;
};

// ── Section 6: Buyer Intelligence™
export type BuyerRef = { name: string; type: string; activity: number; valueCents: number };
export type BuyerIntelligence = {
  concentrationScore: number;
  opportunityScore: number;
  mostRelevant: BuyerRef[];
  mostActive: BuyerRef[];
  highestValue: BuyerRef[];
};

// ── Section 7: Renewal Opportunity Analysis™
export type RenewalWindow = {
  window: "Next 3 months" | "Next 6 months" | "Next 12 months";
  items: { title: string; buyer: string; valueCents: number; type: "Renewal" | "Rebid" | "New" }[];
};
export type RenewalAnalysis = {
  score: number;
  windows: RenewalWindow[];
  priorityMonitoring: string[];
};

// ── Section 8: Industry Benchmarking™
export type BenchmarkRow = {
  metric: string;
  you: number;
  peerAvg: number;
  topQuartile: number;
};
export type Benchmarking = {
  industryLabel: string;
  percentile: number; // where the company sits vs peers, 0-100
  rows: BenchmarkRow[];
  positioning: string;
  areasToImprove: string[];
  peers: { label: string; index: number }[]; // the 6 comparison industries
};

// ── Section 9: Revenue Opportunity Analysis™
export type RevenueOpportunity = {
  score: number;
  opportunities: number;
  annualContractValueCents: number;
  missedOpportunityValueCents: number;
  renewalValueCents: number;
  pipelineValueCents: number;
};

// ── Section 10: Action Plan™
export type ActionItem = { title: string; detail: string; impact: 1 | 2 | 3; effort: 1 | 2 | 3 };
export type ActionPlan = {
  immediate: ActionItem[];
  thirtyDay: ActionItem[];
  ninetyDay: ActionItem[];
  twelveMonth: ActionItem[];
};

// ── Section 1: Executive Summary
export type ExecutiveSummary = {
  companySummary: string;
  industrySummary: string;
  contractingSummary: string;
  keyFindings: string[];
  majorRisks: string[];
  majorOpportunities: string[];
  estimatedRevenuePotentialCents: number;
  recommendedActions: string[];
};

export type GoirResult = {
  companyName: string;
  // headline
  index: number;
  tier: Tier;
  percentile: number; // "Top X%"
  maturityLabel: string;
  categories: CategoryScore[];
  // context
  industryLabel: string;
  regionLabel: string;
  country: "CA" | "US";
  generatedAt: string;
  // sections
  executive: ExecutiveSummary;
  waste: WasteAnalysis;
  maturity: Maturity;
  platform: PlatformCoverage;
  award: AwardIntelligence;
  buyers: BuyerIntelligence;
  renewal: RenewalAnalysis;
  benchmark: Benchmarking;
  revenue: RevenueOpportunity;
  actionPlan: ActionPlan;
};

// AI-written prose layered on top of the deterministic result.
export type GoirNarrative = {
  headline?: string;
  executive?: string;
  wasteInsight?: string;
  platformInsight?: string;
  closingInsight?: string;
};

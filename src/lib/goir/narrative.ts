// Optional AI prose layered on top of the deterministic GOIR result.
// Returns null when no API key is configured, the report renders fully
// from the deterministic engine either way.
import { complete } from "@/lib/ai/client";
import type { GoirInput, GoirResult, GoirNarrative } from "./types";

const SYSTEM = `You are a senior government-procurement intelligence analyst writing the narrative layer of a "Government Opportunity Intelligence Report™" for a company pursuing public-sector contracts.

Voice: authoritative, specific, consultative, never salesy. You are demonstrating expertise, not pitching. Use the supplied numbers; never invent new statistics. Write in second person ("your team"). Each field must be 2-4 sentences of tight, insight-dense prose. Output ONLY minified JSON with exactly these string keys: headline, executive, wasteInsight, platformInsight, closingInsight. No markdown, no preamble.`;

export async function generateNarrative(
  input: GoirInput,
  result: GoirResult
): Promise<GoirNarrative | null> {
  const usd = (c: number) => Math.round(c / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const facts = {
    company: input.companyName,
    industry: result.industryLabel,
    region: result.regionLabel,
    index: result.index,
    tier: result.tier,
    topPercent: result.percentile,
    weakest: result.maturity.weaknesses[0],
    strongest: result.maturity.strengths[0],
    annualWaste: usd(result.waste.totalWasteCents),
    recoverable: usd(result.waste.potentialAnnualSavingsCents),
    roiPct: result.waste.potentialRoiPct,
    coverageGap: result.platform.gapLevel,
    platformGaps: result.platform.gaps.map((g) => g.name),
    missedValue: usd(result.revenue.missedOpportunityValueCents),
    renewalValue: usd(result.revenue.renewalValueCents),
    reviewed: result.waste.reviewed,
    pursued: result.waste.pursued,
  };

  const prompt = `Write the narrative layer using only these facts. Return minified JSON with keys headline, executive, wasteInsight, platformInsight, closingInsight.

FACTS:
${JSON.stringify(facts, null, 2)}

Guidance:
- headline: one punchy sentence capturing where this company stands.
- executive: the situation and what matters most.
- wasteInsight: interpret the opportunity-waste numbers and what they imply.
- platformInsight: interpret the platform coverage gap and the risk it creates.
- closingInsight: a forward-looking strategic note that makes them want the full consultation (no hard sell).`;

  try {
    const raw = await complete({ system: SYSTEM, prompt, maxTokens: 900 });
    if (!raw) return null;
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as GoirNarrative;
    // keep only string fields
    const out: GoirNarrative = {};
    for (const k of ["headline", "executive", "wasteInsight", "platformInsight", "closingInsight"] as const) {
      if (typeof parsed[k] === "string") out[k] = parsed[k];
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

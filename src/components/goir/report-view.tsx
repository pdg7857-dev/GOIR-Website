import { Panel, PanelHeader, PanelBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { IndexGauge } from "./index-gauge";
import { WasteDonut, BenchmarkBars, PeerIndexBars } from "./charts";
import { ConsultCta } from "./consult-cta";
import { fmtCents, cn } from "@/lib/utils";
import type { GoirResult, GoirNarrative } from "@/lib/goir/types";
import {
  Gauge, TrendingDown, Layers, Award, Building2, RefreshCw, BarChart3,
  DollarSign, ListChecks, AlertTriangle, Lightbulb, CheckCircle2, ArrowUpRight,
  Sparkles, Quote, Target, Zap,
} from "lucide-react";

const usd = (c: number) => fmtCents(c);

function scoreTone(s: number): "success" | "accent" | "warn" | "danger" {
  if (s >= 80) return "success";
  if (s >= 60) return "accent";
  if (s >= 45) return "warn";
  return "danger";
}

function SectionTitle({ n, title, icon: Icon, sub }: { n: number; title: string; icon: any; sub?: string }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bg-raised ring-1 ring-border text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle">Section {n}</div>
        <h2 className="text-xl font-semibold tracking-tight text-fg">{title}</h2>
        {sub ? <p className="mt-0.5 text-sm text-fg-subtle">{sub}</p> : null}
      </div>
    </div>
  );
}

function Insight({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="mb-4 flex gap-3 rounded-xl border border-accent/25 bg-accent-soft/20 p-4">
      <Quote className="h-4 w-4 shrink-0 text-accent" />
      <p className="text-sm leading-relaxed text-fg-muted italic">{text}</p>
    </div>
  );
}

function Stat({ label, value, tone = "default", hint }: { label: string; value: string; tone?: string; hint?: string }) {
  const tint: Record<string, string> = {
    default: "text-fg", success: "text-success", accent: "text-accent", warn: "text-warn", danger: "text-danger", violet: "text-violet",
  };
  return (
    <div className="rounded-xl border border-border-subtle bg-bg-raised/40 p-4">
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-fg-subtle">{label}</div>
      <div className={cn("mt-2 stat-value", tint[tone])}>{value}</div>
      {hint ? <div className="mt-1 text-[11px] text-fg-subtle">{hint}</div> : null}
    </div>
  );
}

function List({ items, icon: Icon, tone }: { items: string[]; icon: any; tone: string }) {
  const tint: Record<string, string> = { success: "text-success", warn: "text-warn", danger: "text-danger", accent: "text-accent", violet: "text-violet" };
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-fg-muted">
          <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tint[tone])} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function ActionGroup({ title, items, tone }: { title: string; items: GoirResult["actionPlan"]["immediate"]; tone: string }) {
  const dots = (n: number) => "●".repeat(n) + "○".repeat(3 - n);
  return (
    <Panel>
      <PanelHeader title={title} />
      <PanelBody className="space-y-3">
        {items.map((a, i) => (
          <div key={i} className="rounded-lg border border-border-subtle bg-bg-raised/30 p-3">
            <div className="text-sm font-medium text-fg">{a.title}</div>
            <div className="mt-1 text-[13px] text-fg-muted">{a.detail}</div>
            <div className="mt-2 flex gap-3 text-[10px] uppercase tracking-wider text-fg-subtle">
              <span>Impact <span className="font-mono text-accent">{dots(a.impact)}</span></span>
              <span>Effort <span className="font-mono text-warn">{dots(a.effort)}</span></span>
            </div>
          </div>
        ))}
      </PanelBody>
    </Panel>
  );
}

export function GoirReportView({
  id,
  result: r,
  narrative,
  requested,
}: {
  id: string;
  result: GoirResult;
  narrative: GoirNarrative | null;
  requested: boolean;
}) {
  const w = r.waste;
  const date = new Date(r.generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6 space-y-12">
      {/* ── Headline ── */}
      <section>
        <div className="flex flex-col items-center gap-1 text-center">
          <Badge tone="accent" className="mb-2">Government Opportunity Intelligence Report™</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{r.companyName ?? "Your company"}</h1>
          <p className="text-sm text-fg-subtle">{r.industryLabel} · {r.regionLabel} · Generated {date}</p>
        </div>

        <Panel className="mt-6 p-6 lg:p-8 bg-grid-fade">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto,1fr]">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle text-center">
                Government Opportunity<br />Intelligence Index™
              </div>
              <IndexGauge value={r.index} tier={r.tier} />
              <div className="mt-2 text-sm text-fg-muted">
                Top <span className="font-semibold text-accent">{r.percentile}%</span> · {r.maturityLabel}
              </div>
            </div>

            <div>
              {narrative?.headline ? (
                <p className="mb-4 text-base font-medium text-fg">{narrative.headline}</p>
              ) : null}
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-fg-subtle mb-3">Index breakdown</div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {r.categories.map((c) => {
                  const tone = scoreTone(c.score);
                  return (
                    <div key={c.key}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-fg-muted">{c.label}</span>
                        <span className="font-mono tabular-nums text-fg">{c.score}</span>
                      </div>
                      <Progress value={c.score} tone={tone} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── 1. Executive Summary ── */}
      <section>
        <SectionTitle n={1} title="Executive Summary" icon={Sparkles} />
        <Insight text={narrative?.executive} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Panel className="lg:col-span-3">
            <PanelBody className="space-y-3">
              <p className="text-sm text-fg-muted"><strong className="text-fg">Company.</strong> {r.executive.companySummary}</p>
              <p className="text-sm text-fg-muted"><strong className="text-fg">Industry.</strong> {r.executive.industrySummary}</p>
              <p className="text-sm text-fg-muted"><strong className="text-fg">Government contracting.</strong> {r.executive.contractingSummary}</p>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader title="Key findings" />
            <PanelBody><List items={r.executive.keyFindings} icon={CheckCircle2} tone="accent" /></PanelBody>
          </Panel>
          <Panel>
            <PanelHeader title="Major risks" />
            <PanelBody><List items={r.executive.majorRisks} icon={AlertTriangle} tone="warn" /></PanelBody>
          </Panel>
          <Panel>
            <PanelHeader title="Major opportunities" />
            <PanelBody><List items={r.executive.majorOpportunities} icon={Lightbulb} tone="success" /></PanelBody>
          </Panel>
        </div>
        <Panel className="mt-3 ring-1 ring-accent/30">
          <PanelBody className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-fg-subtle">Estimated revenue potential</div>
              <div className="mt-1 text-3xl font-semibold text-gradient-accent">{usd(r.executive.estimatedRevenuePotentialCents)}</div>
              <div className="mt-0.5 text-[11px] text-fg-subtle">Recoverable waste + missed + renewing work (annualized)</div>
            </div>
            <div className="text-sm text-fg-muted max-w-xs">
              <div className="mb-1 font-medium text-fg">Recommended next moves</div>
              <ul className="list-disc pl-4 space-y-0.5">
                {r.executive.recommendedActions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </PanelBody>
        </Panel>
      </section>

      {/* ── 2. Opportunity Waste Analysis ── */}
      <section>
        <SectionTitle n={2} title="Opportunity Waste Analysis™" icon={TrendingDown} sub="Where bid effort and budget are leaking, and what's recoverable." />
        <Insight text={narrative?.wasteInsight} />
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Stat label="Reviewed / yr" value={w.reviewed.toLocaleString()} />
          <Stat label="Qualified" value={w.qualified.toLocaleString()} />
          <Stat label="Pursued" value={w.pursued.toLocaleString()} />
          <Stat label="Lost" value={w.lost.toLocaleString()} tone="warn" />
          <Stat label="No-bids" value={w.noBids.toLocaleString()} />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel>
            <PanelHeader title="Estimated annual opportunity waste" hint="Modeled inefficiency across the bid lifecycle" />
            <PanelBody>
              <div className="mb-2 text-4xl font-semibold text-danger">{usd(w.totalWasteCents)}</div>
              <WasteDonut data={w.breakdown} />
              <div className="mt-3 space-y-1.5">
                {w.breakdown.map((b, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-fg-muted">{b.label}</span>
                    <span className="font-mono text-fg">{usd(b.valueCents)} · {b.pct}%</span>
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>
          <div className="space-y-3">
            <Panel>
              <PanelHeader title="Cost stack" hint="Annual effort by phase" />
              <PanelBody className="space-y-1.5">
                {w.costs.map((c, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border-subtle pb-1.5 last:border-0 text-sm">
                    <div><div className="text-fg-muted">{c.label}</div><div className="text-[11px] text-fg-subtle">{c.note}</div></div>
                    <span className="font-mono text-fg">{usd(c.amountCents)}</span>
                  </div>
                ))}
              </PanelBody>
            </Panel>
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Potential annual savings" value={usd(w.potentialAnnualSavingsCents)} tone="success" />
              <Stat label="Per month" value={usd(w.potentialMonthlySavingsCents)} tone="success" />
              <Stat label="Modeled ROI" value={`${w.potentialRoiPct.toLocaleString()}%`} tone="accent" />
            </div>
          </div>
        </div>
        <Panel className="mt-3">
          <PanelHeader title="Top waste drivers" />
          <PanelBody className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {w.topDrivers.map((d, i) => (
              <div key={i} className="rounded-lg border border-border-subtle bg-bg-raised/30 p-3">
                <div className="text-sm font-medium text-fg">{d.title}</div>
                <div className="mt-1 text-[13px] text-fg-muted">{d.detail}</div>
                <div className="mt-2 text-xs text-success">≈ {usd(d.savingsCents)}/yr recoverable</div>
              </div>
            ))}
          </PanelBody>
        </Panel>
      </section>

      {/* ── 3. Maturity ── */}
      <section>
        <SectionTitle n={3} title="Government Contracting Maturity" icon={Gauge} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Panel className="lg:col-span-1">
            <PanelBody className="flex flex-col items-center justify-center text-center">
              <div className="text-[10px] uppercase tracking-[0.16em] text-fg-subtle">Maturity score</div>
              <div className="my-1 text-5xl font-semibold text-accent">{r.maturity.score}</div>
              <Badge tone="accent">{r.maturity.level}</Badge>
              <div className="mt-4 w-full space-y-2">
                {r.maturity.dimensions.slice(0, 7).map((d, i) => (
                  <div key={i}>
                    <div className="mb-0.5 flex justify-between text-[11px]"><span className="text-fg-subtle">{d.label}</span><span className="font-mono text-fg">{d.score}</span></div>
                    <Progress value={d.score} tone={scoreTone(d.score)} />
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>
          <Panel><PanelHeader title="Strengths" /><PanelBody><List items={r.maturity.strengths} icon={CheckCircle2} tone="success" /></PanelBody></Panel>
          <Panel><PanelHeader title="Weaknesses" /><PanelBody><List items={r.maturity.weaknesses} icon={AlertTriangle} tone="warn" /></PanelBody></Panel>
        </div>
        <Panel className="mt-3"><PanelHeader title="Recommendations" /><PanelBody><List items={r.maturity.recommendations} icon={ArrowUpRight} tone="accent" /></PanelBody></Panel>
      </section>

      {/* ── 4. Platform Coverage ── */}
      <section>
        <SectionTitle n={4} title="Platform Coverage Analysis™" icon={Layers} sub="The procurement platforms that matter, and where you're exposed." />
        <Insight text={narrative?.platformInsight} />
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Coverage score" value={`${r.platform.score}`} tone={scoreTone(r.platform.score)} />
          <Stat label="Coverage gap" value={r.platform.gapLevel} tone={r.platform.gapLevel === "Low" ? "success" : r.platform.gapLevel === "Moderate" ? "warn" : "danger"} />
          <Stat label="Monitoring complexity" value={r.platform.monitoringComplexity} />
          <Stat label="Coverage risk" value={r.platform.coverageRisk} tone={r.platform.coverageRisk === "Low" ? "success" : r.platform.coverageRisk === "Moderate" ? "warn" : "danger"} />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Panel>
            <PanelHeader title="Current coverage" />
            <PanelBody className="space-y-2">
              {r.platform.current.map((p) => (
                <div key={p.key} className="rounded-lg bg-success-soft/20 p-2 ring-1 ring-success/20">
                  <div className="text-sm font-medium text-fg">{p.name}</div>
                  <div className="text-[11px] text-fg-subtle">{p.note}</div>
                </div>
              ))}
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader title="Recommended coverage" />
            <PanelBody className="space-y-2">
              {r.platform.recommended.map((p) => (
                <div key={p.key} className="rounded-lg bg-bg-raised/40 p-2 ring-1 ring-border">
                  <div className="text-sm font-medium text-fg">{p.name}</div>
                  <div className="text-[11px] text-fg-subtle">{p.note}</div>
                </div>
              ))}
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader title="Coverage gaps" hint="Add these first" />
            <PanelBody className="space-y-2">
              {r.platform.gaps.length ? r.platform.gaps.map((p) => (
                <div key={p.key} className="rounded-lg bg-warn-soft/20 p-2 ring-1 ring-warn/20">
                  <div className="text-sm font-medium text-fg">{p.name}</div>
                  <div className="text-[11px] text-fg-subtle">{p.note}</div>
                </div>
              )) : <div className="text-sm text-fg-subtle">No core gaps detected.</div>}
            </PanelBody>
          </Panel>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel><PanelHeader title="What may be missed" /><PanelBody><List items={r.platform.missedOpportunities} icon={AlertTriangle} tone="warn" /></PanelBody></Panel>
          <Panel><PanelHeader title="Recommended monitoring strategy" /><PanelBody><List items={r.platform.strategy} icon={Target} tone="accent" /></PanelBody></Panel>
        </div>
      </section>

      {/* ── 5. Award Intelligence ── */}
      <section>
        <SectionTitle n={5} title="Award Intelligence™" icon={Award} sub="Modeled from public award patterns for your sector and region." />
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Government experience" value={`${r.award.experienceScore}`} tone={scoreTone(r.award.experienceScore)} />
          <Stat label="Award momentum" value={`${r.award.momentumScore}`} tone={scoreTone(r.award.momentumScore)} />
          <Stat label="Modeled awards" value={r.award.awardsWon.toLocaleString()} />
          <Stat label="Award value" value={usd(r.award.totalValueCents)} tone="accent" hint={`Trend: ${r.award.trend}`} />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel>
            <PanelHeader title="Award categories" />
            <PanelBody className="space-y-2">
              {r.award.categories.map((c, i) => (
                <div key={i}>
                  <div className="mb-0.5 flex justify-between text-xs"><span className="text-fg-muted">{c.label}</span><span className="font-mono text-fg">{c.share}%</span></div>
                  <Progress value={c.share} tone="violet" />
                </div>
              ))}
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader title="Recent awards (modeled)" />
            <PanelBody className="space-y-2">
              {r.award.recent.map((a, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border-subtle pb-2 last:border-0">
                  <div className="min-w-0"><div className="truncate text-sm text-fg">{a.title}</div><div className="truncate text-[11px] text-fg-subtle">{a.buyer} · {a.when}</div></div>
                  <span className="font-mono text-sm text-fg">{usd(a.valueCents)}</span>
                </div>
              ))}
            </PanelBody>
          </Panel>
        </div>
        <Panel className="mt-3">
          <PanelHeader title="Competitor insight" />
          <PanelBody>
            <p className="text-sm text-fg-muted">{r.award.competitorInsight}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.award.comparableSuppliers.map((s) => <Badge key={s} tone="muted">{s}</Badge>)}
            </div>
          </PanelBody>
        </Panel>
      </section>

      {/* ── 6. Buyer Intelligence ── */}
      <section>
        <SectionTitle n={6} title="Buyer Intelligence™" icon={Building2} sub="The public buyers most likely to put work in front of you." />
        <div className="mb-3 grid grid-cols-2 gap-3">
          <Stat label="Buyer opportunity score" value={`${r.buyers.opportunityScore}`} tone={scoreTone(r.buyers.opportunityScore)} hint="Breadth × activity of relevant buyers" />
          <Stat label="Buyer concentration" value={`${r.buyers.concentrationScore}`} tone={r.buyers.concentrationScore > 65 ? "warn" : "success"} hint="Higher = more dependent on few buyers" />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {([["Most relevant", r.buyers.mostRelevant], ["Most active", r.buyers.mostActive], ["Highest value", r.buyers.highestValue]] as const).map(([title, list]) => (
            <Panel key={title}>
              <PanelHeader title={title} />
              <PanelBody className="space-y-2">
                {list.map((b, i) => (
                  <div key={i} className="rounded-lg border border-border-subtle bg-bg-raised/30 p-2.5">
                    <div className="text-sm font-medium text-fg">{b.name}</div>
                    <div className="mt-0.5 flex items-center justify-between text-[11px] text-fg-subtle">
                      <span>{b.type}</span>
                      <span className="font-mono">{usd(b.valueCents)} · {b.activity}%</span>
                    </div>
                  </div>
                ))}
              </PanelBody>
            </Panel>
          ))}
        </div>
      </section>

      {/* ── 7. Renewal Opportunity ── */}
      <section>
        <SectionTitle n={7} title="Renewal Opportunity Analysis™" icon={RefreshCw} sub="Renewals and rebids likely to come to market." />
        <div className="mb-3"><Stat label="Renewal opportunity score" value={`${r.renewal.score}`} tone={scoreTone(r.renewal.score)} /></div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {r.renewal.windows.map((win) => (
            <Panel key={win.window}>
              <PanelHeader title={win.window} hint={`${win.items.length} likely`} />
              <PanelBody className="space-y-2">
                {win.items.map((it, i) => (
                  <div key={i} className="rounded-lg border border-border-subtle bg-bg-raised/30 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm text-fg">{it.title}</div>
                      <Badge tone={it.type === "Renewal" ? "accent" : it.type === "Rebid" ? "violet" : "success"}>{it.type}</Badge>
                    </div>
                    <div className="mt-0.5 flex justify-between text-[11px] text-fg-subtle">
                      <span className="truncate">{it.buyer}</span>
                      <span className="font-mono">{usd(it.valueCents)}</span>
                    </div>
                  </div>
                ))}
              </PanelBody>
            </Panel>
          ))}
        </div>
        <Panel className="mt-3"><PanelHeader title="Priority monitoring" /><PanelBody><List items={r.renewal.priorityMonitoring} icon={Target} tone="accent" /></PanelBody></Panel>
      </section>

      {/* ── 8. Industry Benchmarking ── */}
      <section>
        <SectionTitle n={8} title="Industry Benchmarking™" icon={BarChart3} sub={`How you compare in ${r.benchmark.industryLabel.toLowerCase()} and across sectors.`} />
        <Panel className="mb-3">
          <PanelBody><p className="text-sm text-fg-muted">{r.benchmark.positioning}</p>
            <div className="mt-2 text-xs text-fg-subtle">Estimated peer percentile: <span className="font-mono text-accent">{r.benchmark.percentile}th</span></div>
          </PanelBody>
        </Panel>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel><PanelHeader title="You vs. peers" /><PanelBody><BenchmarkBars data={r.benchmark.rows} /></PanelBody></Panel>
          <Panel><PanelHeader title="Index by sector" hint="Your sector highlighted" /><PanelBody><PeerIndexBars data={r.benchmark.peers} highlight={r.benchmark.industryLabel} /></PanelBody></Panel>
        </div>
        <Panel className="mt-3"><PanelHeader title="Areas to improve" /><PanelBody>
          <div className="flex flex-wrap gap-1.5">{r.benchmark.areasToImprove.map((a) => <Badge key={a} tone="warn">{a}</Badge>)}</div>
        </PanelBody></Panel>
      </section>

      {/* ── 9. Revenue Opportunity ── */}
      <section>
        <SectionTitle n={9} title="Revenue Opportunity Analysis™" icon={DollarSign} />
        <div className="mb-3"><Stat label="Revenue opportunity score" value={`${r.revenue.score}`} tone={scoreTone(r.revenue.score)} /></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="Addressable opportunities" value={r.revenue.opportunities.toLocaleString()} />
          <Stat label="Annual contract value" value={usd(r.revenue.annualContractValueCents)} tone="accent" />
          <Stat label="Missed opportunity value" value={usd(r.revenue.missedOpportunityValueCents)} tone="warn" />
          <Stat label="Renewal value" value={usd(r.revenue.renewalValueCents)} tone="violet" />
          <Stat label="Pipeline potential" value={usd(r.revenue.pipelineValueCents)} tone="success" />
        </div>
      </section>

      {/* ── 10. Action Plan ── */}
      <section>
        <SectionTitle n={10} title="Action Plan™" icon={ListChecks} sub="Prioritized by impact and effort." />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ActionGroup title="Immediate" items={r.actionPlan.immediate} tone="danger" />
          <ActionGroup title="Next 30 days" items={r.actionPlan.thirtyDay} tone="warn" />
          <ActionGroup title="Next 90 days" items={r.actionPlan.ninetyDay} tone="accent" />
          <ActionGroup title="Next 12 months" items={r.actionPlan.twelveMonth} tone="success" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <Panel className="p-7 lg:p-9 ring-1 ring-accent/30 bg-grid-fade text-center">
          <Zap className="mx-auto mb-3 h-7 w-7 text-accent" />
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Free Government Opportunity Intelligence Consultation</h2>
          {narrative?.closingInsight ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-fg-muted italic">{narrative.closingInsight}</p>
          ) : (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-fg-muted">
              This is the free report. In a 30-minute strategy session we&apos;ll walk through your full
              analysis, validate these estimates against live data, and map the fastest path to recovering
              wasted effort and winning more public work.
            </p>
          )}
          <div className="mt-6"><ConsultCta id={id} requested={requested} /></div>
        </Panel>
      </section>
    </div>
  );
}

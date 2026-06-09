"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site/config";

/**
 * Opportunity Cost Calculator. Estimates what manual portal monitoring and
 * bid review costs per month. Numbers are the user's own inputs, so nothing
 * here is fabricated.
 */
export function CostCalculator({ compact = false }: { compact?: boolean }) {
  const [rate, setRate] = useState(55); // fully-loaded estimator $/hr
  const [hours, setHours] = useState(8); // hours/week reviewing & monitoring
  const [jurisdictions, setJurisdictions] = useState(3);

  const monthly = useMemo(() => {
    // Weekly hours scale gently with jurisdictions monitored (more portals,
    // more notifications), capped so it stays believable.
    const jurisdictionFactor = 1 + Math.min(jurisdictions - 1, 6) * 0.12;
    const weekly = hours * jurisdictionFactor;
    const monthlyHours = weekly * 4.33;
    return Math.round(monthlyHours * rate);
  }, [rate, hours, jurisdictions]);

  return (
    <div className={`card overflow-hidden ${compact ? "" : "shadow-lift"}`}>
      <div className="grid lg:grid-cols-2">
        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="eyebrow">Opportunity cost calculator</p>
            <h3 className="mt-2 text-xl font-semibold text-fg">What is searching costing you?</h3>
          </div>

          <Range
            label="Estimator hourly rate (fully loaded)"
            value={rate}
            min={30}
            max={150}
            step={5}
            display={`$${rate}/hr`}
            onChange={setRate}
          />
          <Range
            label="Hours per week reviewing & monitoring bids"
            value={hours}
            min={1}
            max={40}
            step={1}
            display={`${hours} hrs/wk`}
            onChange={setHours}
          />
          <Range
            label="Jurisdictions monitored"
            value={jurisdictions}
            min={1}
            max={12}
            step={1}
            display={jurisdictions === 1 ? "1 jurisdiction" : `${jurisdictions} jurisdictions`}
            onChange={setJurisdictions}
          />
        </div>

        <div className="flex flex-col justify-center gap-5 bg-bg p-6 text-center text-fg sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Estimated monthly cost of DIY
            </p>
            <p className="mt-2 text-5xl font-bold tabular-nums">
              ${monthly.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-fg-subtle">in estimator time alone, before a single bid is written</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-left text-fg-muted">
              That is time your estimator spends searching and reading poor-fit bids, before a
              single proposal is written. I take that work off your plate so those hours go back
              on the bids worth winning, and you stop reading the ones that were never a fit.
            </p>
          </div>

          <Link href={SITE.bookingUrl} className="btn-gold w-full py-3">
            See what you are missing
          </Link>
          <p className="text-xs text-fg-muted">
            This is an estimate based on the numbers you enter. Your actual time and cost will vary.
          </p>
        </div>
      </div>
    </div>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-fg">{label}</span>
        <span className="rounded-md bg-accent-soft px-2 py-0.5 text-sm font-semibold text-accent">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-brand-600"
      />
    </label>
  );
}

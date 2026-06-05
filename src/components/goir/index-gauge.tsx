import { cn } from "@/lib/utils";

// Tier → color (HSL strings matching the Tailwind palette).
const TIER_COLOR: Record<string, string> = {
  Elite: "hsl(150 80% 50%)",
  Advanced: "hsl(184 100% 52%)",
  Strong: "hsl(184 100% 52%)",
  Developing: "hsl(210 92% 62%)",
  Emerging: "hsl(38 92% 58%)",
  "At Risk": "hsl(0 84% 62%)",
};

export function IndexGauge({
  value,
  tier,
  size = 240,
  className,
}: {
  value: number;
  tier: string;
  size?: number;
  className?: string;
}) {
  const stroke = 16;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  // 270° sweep gauge (gap at the bottom)
  const sweep = 0.75; // 270/360
  const arc = circumference * sweep;
  const filled = arc * (Math.max(0, Math.min(100, value)) / 100);
  const color = TIER_COLOR[tier] ?? "hsl(184 100% 52%)";

  return (
    <div className={cn("relative grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-[225deg]">
        <circle
          cx={cx} cy={cx} r={r}
          fill="none" stroke="hsl(221 30% 9.5%)" strokeWidth={stroke}
          strokeDasharray={`${arc} ${circumference}`} strokeLinecap="round"
        />
        <circle
          cx={cx} cy={cx} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${filled} ${circumference}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <div className="font-mono text-5xl font-semibold tabular-nums" style={{ color }}>{value}</div>
        <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-fg-subtle">out of 100</div>
        <div className="mt-2 text-sm font-semibold" style={{ color }}>{tier}</div>
      </div>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  max = 100,
  tone = "accent",
  className,
}: {
  value: number;
  max?: number;
  tone?: "accent" | "success" | "warn" | "danger" | "violet";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const tones: Record<string, string> = {
    accent: "bg-accent",
    success: "bg-success",
    warn: "bg-warn",
    danger: "bg-danger",
    violet: "bg-violet",
  };
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-bg-raised ring-1 ring-border-subtle", className)}>
      <div
        className={cn("h-full rounded-full transition-all", tones[tone])}
        style={{ width: `${pct}%`, boxShadow: pct > 0 ? "0 0 12px -2px currentColor" : undefined }}
      />
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "default",
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "violet" | "success" | "warn" | "danger" | "info" | "muted";
}) {
  const tones: Record<string, string> = {
    default: "bg-bg-raised text-fg ring-1 ring-border",
    accent: "bg-accent-soft text-accent ring-1 ring-accent/30",
    violet: "bg-violet-soft text-violet ring-1 ring-violet/30",
    success: "bg-success-soft text-success ring-1 ring-success/30",
    warn: "bg-warn-soft text-warn ring-1 ring-warn/30",
    danger: "bg-danger-soft text-danger ring-1 ring-danger/30",
    info: "bg-info-soft text-info ring-1 ring-info/30",
    muted: "bg-bg-raised text-fg-muted ring-1 ring-border",
  };
  return <span className={cn("pill", tones[tone], className)} {...rest} />;
}

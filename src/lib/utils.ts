import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fmtCents = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format((cents ?? 0) / 100);

export const fmtCentsPrecise = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format((cents ?? 0) / 100);

export const fmtPct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;

export const fmtCompact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export function relTime(date: Date | null | undefined) {
  if (!date) return "-";
  const d = new Date(date).getTime();
  const diff = d - Date.now();
  const abs = Math.abs(diff);
  const m = 60_000, h = 3_600_000, day = 86_400_000;
  const sign = diff < 0 ? "ago" : "from now";
  if (abs < h) return `${Math.max(1, Math.round(abs / m))}m ${sign}`;
  if (abs < day) return `${Math.round(abs / h)}h ${sign}`;
  if (abs < 7 * day) return `${Math.round(abs / day)}d ${sign}`;
  return new Date(date).toLocaleDateString();
}

export function isOverdue(date: Date | null | undefined) {
  return !!date && new Date(date).getTime() < Date.now();
}

export const priorityRank: Record<string, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export const priorityTone: Record<string, string> = {
  URGENT: "bg-danger-soft text-danger ring-1 ring-danger/40",
  HIGH: "bg-warn-soft text-warn ring-1 ring-warn/40",
  MEDIUM: "bg-info-soft text-info ring-1 ring-info/40",
  LOW: "bg-bg-raised text-fg-muted ring-1 ring-border",
};

export const businessTone: Record<string, string> = {
  lexus: "text-biz-lexus",
  fitness: "text-biz-fitness",
  content: "text-biz-content",
  phone_repair: "text-biz-phone",
  supplements: "text-biz-supplements",
  eprocurement: "text-biz-eprocurement",
  personal: "text-biz-personal",
};

export const businessDotBg: Record<string, string> = {
  lexus: "bg-biz-lexus",
  fitness: "bg-biz-fitness",
  content: "bg-biz-content",
  phone_repair: "bg-biz-phone",
  supplements: "bg-biz-supplements",
  eprocurement: "bg-biz-eprocurement",
  personal: "bg-biz-personal",
};

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/lib/goir/industries";
import { PLATFORMS } from "@/lib/goir/platforms";
import { Loader2, ArrowRight, ShieldCheck, ChevronDown, CheckCircle2 } from "lucide-react";

const REGIONS = [
  { group: "Canada", items: [
    ["Ontario", "Ontario"], ["Quebec", "Quebec"], ["British Columbia", "British Columbia"], ["Alberta", "Alberta"],
    ["Manitoba", "Manitoba"], ["Saskatchewan", "Saskatchewan"], ["Nova Scotia", "Nova Scotia"], ["New Brunswick", "New Brunswick"],
    ["Newfoundland & Labrador", "Newfoundland & Labrador"], ["Prince Edward Island", "Prince Edward Island"],
    ["Northwest Territories", "Northwest Territories"], ["Yukon", "Yukon"], ["Nunavut", "Nunavut"],
    ["Across Canada", "Across Canada"],
  ] },
  { group: "United States", items: [
    ["California", "California"], ["Texas", "Texas"], ["New York", "New York"], ["Florida", "Florida"],
    ["Illinois", "Illinois"], ["Pennsylvania", "Pennsylvania"], ["Ohio", "Ohio"], ["Georgia", "Georgia"],
    ["Washington", "Washington"], ["Across the US", "Across the US"],
  ] },
  { group: "Both", items: [["Canada and the US", "Canada and the US"]] },
];

const EXPERIENCE = [
  ["new", "New to government bidding"],
  ["some", "Some experience"],
  ["experienced", "Experienced bidder"],
];

export function RequestOpportunitiesForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [experience, setExperience] = useState<string>("");
  const [showOptional, setShowOptional] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>([]);

  function togglePlatform(name: string) {
    setPlatforms((p) => (p.includes(name) ? p.filter((k) => k !== name) : [...p, name]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!experience) {
      setError("Let me know how much bidding experience you have.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const payload = {
      contactName: String(fd.get("contactName") ?? ""),
      companyName: String(fd.get("companyName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      website: String(fd.get("website") ?? ""),
      trade: String(fd.get("trade") ?? ""),
      region: String(fd.get("region") ?? ""),
      experience,
      platformsUsed: platforms,
      notes: String(fd.get("notes") ?? ""),
    };
    setPending(true);
    try {
      const res = await fetch("/api/free-opportunities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setPending(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      setPending(false);
    }
  }

  const labelCls = "block text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle mb-1.5";
  const selectCls =
    "h-9 w-full rounded-lg bg-bg-raised px-3 text-sm text-fg ring-1 ring-border focus:ring-accent focus:outline-none transition-shadow appearance-none";

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl bg-success-soft/30 px-6 py-10 text-center ring-1 ring-success/30">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h3 className="text-xl font-semibold text-fg">Request received</h3>
        <p className="max-w-md text-sm text-fg-muted">
          I&apos;ll look at where you bid and pull a short list of real, current opportunities that
          fit your trade, already found and qualified. You&apos;ll hear from me within{" "}
          <strong className="text-fg">1 to 2 business days</strong>.
        </p>
        <p className="text-[11px] text-fg-subtle">Check your inbox for a confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="contactName">Your name *</label>
          <Input id="contactName" name="contactName" required placeholder="First & last name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="companyName">Company name *</label>
          <Input id="companyName" name="companyName" required placeholder="e.g. Northgate Facility Services" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Work email *</label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <Input id="phone" name="phone" type="tel" placeholder="Best number to reach you" />
        </div>
        <div>
          <label className={labelCls} htmlFor="website">Website</label>
          <Input id="website" name="website" placeholder="company.com" />
        </div>
        <div>
          <label className={labelCls} htmlFor="trade">What do you do? *</label>
          <div className="relative">
            <select id="trade" name="trade" required defaultValue="" className={selectCls}>
              <option value="" disabled>Select your trade</option>
              {INDUSTRIES.map((i) => (
                <option key={i.key} value={i.label}>{i.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="region">Where do you bid? *</label>
          <div className="relative">
            <select id="region" name="region" required defaultValue="" className={selectCls}>
              <option value="" disabled>Select a province, state or region</option>
              {REGIONS.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map(([code, name]) => (
                    <option key={g.group + code} value={code}>{name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </div>
      </div>

      <div>
        <span className={labelCls}>Are you new to government bidding? *</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {EXPERIENCE.map(([value, label]) => {
            const on = experience === value;
            return (
              <button
                type="button"
                key={value}
                onClick={() => setExperience(value)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm text-left ring-1 transition-colors",
                  on ? "bg-accent-soft text-accent ring-accent/40" : "bg-bg-panel/60 text-fg-muted ring-border hover:bg-bg-hover"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowOptional((s) => !s)}
        className="flex items-center gap-1.5 text-xs text-accent hover:underline"
      >
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showOptional && "rotate-180")} />
        {showOptional ? "Hide" : "Add"} optional details so I can target it better
      </button>

      {showOptional && (
        <div className="space-y-4 rounded-xl border border-border-subtle bg-bg-raised/30 p-4">
          <div>
            <span className={labelCls}>Procurement platforms you use today</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {PLATFORMS.map((p) => {
                const on = platforms.includes(p.name);
                return (
                  <button
                    type="button"
                    key={p.key}
                    onClick={() => togglePlatform(p.name)}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-xs text-left ring-1 transition-colors",
                      on ? "bg-accent-soft text-accent ring-accent/40" : "bg-bg-panel/60 text-fg-muted ring-border hover:bg-bg-hover"
                    )}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="notes">Anything else I should know?</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="What you chase, what you avoid, capacity, anything that helps me target."
              className="w-full rounded-lg bg-bg-raised px-3 py-2 text-sm text-fg ring-1 ring-border focus:ring-accent focus:outline-none"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger ring-1 ring-danger/30">{error}</div>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {pending ? "Sending your request" : "Request my free opportunities"}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-fg-subtle">
        <ShieldCheck className="h-3.5 w-3.5 text-success" />
        Free · No obligation · I reply within 1 to 2 business days
      </p>
    </form>
  );
}

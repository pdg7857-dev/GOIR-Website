"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/lib/goir/industries";
import { PLATFORMS } from "@/lib/goir/platforms";
import { Loader2, ArrowRight, ShieldCheck, ChevronDown, CheckCircle2 } from "lucide-react";

type Lang = "en" | "fr";

const REGIONS = [
  { groupEn: "Canada", groupFr: "Canada", items: [
    ["Ontario", "Ontario"], ["Quebec", "Quebec"], ["British Columbia", "British Columbia"], ["Alberta", "Alberta"],
    ["Manitoba", "Manitoba"], ["Saskatchewan", "Saskatchewan"], ["Nova Scotia", "Nova Scotia"], ["New Brunswick", "New Brunswick"],
    ["Newfoundland & Labrador", "Newfoundland & Labrador"], ["Prince Edward Island", "Prince Edward Island"],
    ["Northwest Territories", "Northwest Territories"], ["Yukon", "Yukon"], ["Nunavut", "Nunavut"],
    ["Across Canada", "Across Canada"],
  ] },
  { groupEn: "United States", groupFr: "États-Unis", items: [
    ["California", "California"], ["Texas", "Texas"], ["New York", "New York"], ["Florida", "Florida"],
    ["Illinois", "Illinois"], ["Pennsylvania", "Pennsylvania"], ["Ohio", "Ohio"], ["Georgia", "Georgia"],
    ["Washington", "Washington"], ["Across the US", "Across the US"],
  ] },
  { groupEn: "Both", groupFr: "Les deux", items: [["Canada and the US", "Canada and the US"]] },
];

const T = {
  en: {
    name: "Your name *", namePh: "First & last name",
    company: "Company name *", companyPh: "e.g. Northgate Facility Services",
    email: "Work email *", emailPh: "you@company.com",
    phone: "Phone", phonePh: "Best number to reach you",
    website: "Website", websitePh: "company.com",
    trade: "What do you do? *", tradePh: "Select your trade",
    region: "Where do you bid? *", regionPh: "Select a province, state or region",
    experience: "Are you new to government bidding? *",
    exp: { new: "New to government bidding", some: "Some experience", experienced: "Experienced bidder" },
    expError: "Let me know how much bidding experience you have.",
    optionalShow: "Add", optionalHide: "Hide", optionalRest: "optional details so I can target it better",
    platforms: "Procurement platforms you use today",
    notes: "Anything else I should know?",
    notesPh: "What you chase, what you avoid, capacity, anything that helps me target.",
    submit: "Request my free opportunities", submitting: "Sending your request",
    trust: "Free · No obligation · I reply within 1 to 2 business days",
    okTitle: "Request received",
    okBody1: "I'll look at where you bid and pull a short list of real, current opportunities that fit your trade, already found and qualified. You'll hear from me within",
    okBody2: "1 to 2 business days", okBody3: ".",
    okNote: "Check your inbox for a confirmation.",
    netError: "Network error. Please try again.",
    genError: "Something went wrong. Please try again.",
  },
  fr: {
    name: "Votre nom *", namePh: "Prénom et nom",
    company: "Nom de l'entreprise *", companyPh: "ex. Services d'immeubles Northgate",
    email: "Courriel professionnel *", emailPh: "vous@entreprise.com",
    phone: "Téléphone", phonePh: "Meilleur numéro pour vous joindre",
    website: "Site web", websitePh: "entreprise.com",
    trade: "Que faites-vous? *", tradePh: "Choisissez votre métier",
    region: "Où soumissionnez-vous? *", regionPh: "Choisissez une province, un état ou une région",
    experience: "Êtes-vous nouveau dans les appels d'offres publics? *",
    exp: { new: "Nouveau dans les appels d'offres", some: "Une certaine expérience", experienced: "Soumissionnaire expérimenté" },
    expError: "Dites-moi votre niveau d'expérience en soumission.",
    optionalShow: "Ajouter", optionalHide: "Masquer", optionalRest: "des détails pour mieux cibler",
    platforms: "Plateformes d'approvisionnement que vous utilisez",
    notes: "Autre chose à savoir?",
    notesPh: "Ce que vous visez, ce que vous évitez, votre capacité, tout ce qui aide à cibler.",
    submit: "Obtenir mes opportunités gratuites", submitting: "Envoi de votre demande",
    trust: "Gratuit · Sans engagement · Je réponds en 1 à 2 jours ouvrables",
    okTitle: "Demande reçue",
    okBody1: "Je vais regarder où vous soumissionnez et préparer une courte liste d'opportunités réelles et actuelles qui correspondent à votre métier, déjà trouvées et qualifiées. Vous aurez de mes nouvelles dans",
    okBody2: "1 à 2 jours ouvrables", okBody3: ".",
    okNote: "Vérifiez votre boîte de réception pour la confirmation.",
    netError: "Erreur réseau. Veuillez réessayer.",
    genError: "Une erreur est survenue. Veuillez réessayer.",
  },
} as const;

export function RequestOpportunitiesForm({ lang = "en" }: { lang?: Lang }) {
  const L = T[lang];
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
      setError(L.expError);
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
        setError(json.error ?? L.genError);
        setPending(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError(L.netError);
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
        <h3 className="text-xl font-semibold text-fg">{L.okTitle}</h3>
        <p className="max-w-md text-sm text-fg-muted">
          {L.okBody1} <strong className="text-fg">{L.okBody2}</strong>{L.okBody3}
        </p>
        <p className="text-[11px] text-fg-subtle">{L.okNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="contactName">{L.name}</label>
          <Input id="contactName" name="contactName" required placeholder={L.namePh} />
        </div>
        <div>
          <label className={labelCls} htmlFor="companyName">{L.company}</label>
          <Input id="companyName" name="companyName" required placeholder={L.companyPh} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">{L.email}</label>
          <Input id="email" name="email" type="email" required placeholder={L.emailPh} />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">{L.phone}</label>
          <Input id="phone" name="phone" type="tel" placeholder={L.phonePh} />
        </div>
        <div>
          <label className={labelCls} htmlFor="website">{L.website}</label>
          <Input id="website" name="website" placeholder={L.websitePh} />
        </div>
        <div>
          <label className={labelCls} htmlFor="trade">{L.trade}</label>
          <div className="relative">
            <select id="trade" name="trade" required defaultValue="" className={selectCls}>
              <option value="" disabled>{L.tradePh}</option>
              {INDUSTRIES.map((i) => (
                <option key={i.key} value={i.label}>{i.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="region">{L.region}</label>
          <div className="relative">
            <select id="region" name="region" required defaultValue="" className={selectCls}>
              <option value="" disabled>{L.regionPh}</option>
              {REGIONS.map((g) => (
                <optgroup key={g.groupEn} label={lang === "fr" ? g.groupFr : g.groupEn}>
                  {g.items.map(([code, name]) => (
                    <option key={g.groupEn + code} value={code}>{name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </div>
      </div>

      <div>
        <span className={labelCls}>{L.experience}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(["new", "some", "experienced"] as const).map((value) => {
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
                {L.exp[value]}
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
        {showOptional ? L.optionalHide : L.optionalShow} {L.optionalRest}
      </button>

      {showOptional && (
        <div className="space-y-4 rounded-xl border border-border-subtle bg-bg-raised/30 p-4">
          <div>
            <span className={labelCls}>{L.platforms}</span>
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
            <label className={labelCls} htmlFor="notes">{L.notes}</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder={L.notesPh}
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
        {pending ? L.submitting : L.submit}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-fg-subtle">
        <ShieldCheck className="h-3.5 w-3.5 text-success" />
        {L.trust}
      </p>
    </form>
  );
}

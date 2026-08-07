"use client";

import { useState } from "react";

type Lang = "en" | "fr";

/**
 * The three-field intel intake used on the free-report page and the homepage
 * request section. Trade and jurisdictions, work email, company. Posts to the
 * shared /api/free-opportunities route (CRM + email to win@phildave.com).
 * Three fields is the point of the page; do not add more.
 */
export function IntelLeadForm({ lang = "en", formLabel }: { lang?: Lang; formLabel?: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const L = lang === "fr"
    ? {
        label: formLabel ?? "Formulaire · 3 champs",
        trade: "Votre métier et où vous soumissionnez",
        tradePh: "ex. Conciergerie commerciale, Ontario et Quebec, plus fédéral",
        email: "Courriel professionnel",
        emailPh: "vous@entreprise.com",
        company: "Entreprise",
        companyPh: "Nom de l'entreprise",
        submit: "Envoyez-moi le rapport",
        sending: "Envoi en cours",
        note: "Arrive directement chez moi, phil@phildave.com. Gratuit, sans engagement.",
        okTitle: "Demande reçue",
        okBody: "Je passe en revue vos territoires et je reviens avec une courte liste, en 3 jours ouvrables.",
        err: "Une erreur est survenue. Veuillez réessayer.",
        net: "Erreur réseau. Veuillez réessayer.",
      }
    : {
        label: formLabel ?? "Request form · 3 fields",
        trade: "Your trade and where you bid",
        tradePh: "e.g. Commercial janitorial, Ontario and Quebec, plus federal",
        email: "Work email",
        emailPh: "you@company.com",
        company: "Company",
        companyPh: "Company name",
        submit: "Send me the report",
        sending: "Sending",
        note: "Goes straight to me, phil@phildave.com. Free, and there is no obligation.",
        okTitle: "Request received",
        okBody: "I will go through your footprint and come back with a short list, inside 3 business days.",
        err: "Something went wrong. Please try again.",
        net: "Network error. Please try again.",
      };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      trade: String(fd.get("trade") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      companyName: String(fd.get("company") ?? "").trim(),
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
        setError(json.error ?? L.err);
        setPending(false);
        return;
      }
      setDone(true);
    } catch {
      setError(L.net);
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="panel-accent flex flex-col items-start gap-2 p-7">
        <span className="hud" style={{ color: "var(--color-accent-200)" }}>{L.okTitle}</span>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)", lineHeight: 1.6 }}>{L.okBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="panel-accent grid gap-4 p-7"
    >
      <div className="hud" style={{ color: "var(--color-accent-200)" }}>{L.label}</div>
      <div className="field">
        <label htmlFor="lf-trade">{L.trade}</label>
        <textarea className="input" id="lf-trade" name="trade" required placeholder={L.tradePh} />
      </div>
      <div className="field">
        <label htmlFor="lf-email">{L.email}</label>
        <input className="input" id="lf-email" name="email" type="email" required placeholder={L.emailPh} />
      </div>
      <div className="field">
        <label htmlFor="lf-company">{L.company}</label>
        <input className="input" id="lf-company" name="company" type="text" required placeholder={L.companyPh} />
      </div>
      {error && (
        <p className="text-sm" style={{ color: "#f0a5a5" }}>{error}</p>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={pending} style={{ padding: 12, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        {pending ? L.sending : L.submit}
      </button>
      <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)", lineHeight: 1.5 }}>{L.note}</span>
    </form>
  );
}

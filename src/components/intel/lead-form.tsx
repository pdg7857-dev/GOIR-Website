"use client";

import { useState } from "react";

type Lang = "en" | "fr";

/**
 * Lead intake used on the free-report page, the homepage request section and
 * the contact page. Collects the full lead the notification email reports:
 * name, title, company, work email, phone, website, trade, where they bid,
 * bidding experience and notes. Posts to /api/free-opportunities (CRM capture +
 * email to win@phildave.com + a durable server log).
 */
export function IntelLeadForm({ lang = "en", formLabel }: { lang?: Lang; formLabel?: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const L = lang === "fr"
    ? {
        label: formLabel ?? "Formulaire de demande",
        name: "Votre nom", namePh: "Prénom et nom",
        title: "Titre / poste", titlePh: "ex. Propriétaire, estimateur",
        company: "Entreprise", companyPh: "Nom de l'entreprise",
        email: "Courriel professionnel", emailPh: "vous@entreprise.com",
        phone: "Téléphone", phonePh: "Meilleur numéro",
        website: "Site web", websitePh: "entreprise.com",
        trade: "Ce que vous faites", tradePh: "ex. Conciergerie commerciale, CVC, toiture",
        region: "Où vous soumissionnez", regionPh: "ex. Ontario et Quebec, plus fédéral",
        exp: "Expérience en appels d'offres publics",
        expOpts: { "": "Choisir…", new: "Nouveau", some: "Une certaine expérience", experienced: "Expérimenté" },
        notes: "Autre chose?", notesPh: "Ce que vous visez, votre capacité, tout ce qui aide à cibler.",
        optional: "facultatif",
        submit: "Envoyer", sending: "Envoi en cours",
        note: "Arrive directement chez moi, phil@phildave.com. Gratuit, sans engagement.",
        okTitle: "Demande reçue",
        okBody: "Je passe en revue vos territoires et je reviens avec une courte liste, en 3 jours ouvrables.",
        err: "Une erreur est survenue. Veuillez réessayer.",
        net: "Erreur réseau. Veuillez réessayer.",
      }
    : {
        label: formLabel ?? "Request form",
        name: "Your name", namePh: "First and last name",
        title: "Job title", titlePh: "e.g. Owner, estimator",
        company: "Company", companyPh: "Company name",
        email: "Work email", emailPh: "you@company.com",
        phone: "Phone", phonePh: "Best number to reach you",
        website: "Website", websitePh: "company.com",
        trade: "What you do", tradePh: "e.g. Commercial janitorial, HVAC, roofing",
        region: "Where you bid", regionPh: "e.g. Ontario and Quebec, plus federal",
        exp: "Government bidding experience",
        expOpts: { "": "Select…", new: "New to it", some: "Some experience", experienced: "Experienced" },
        notes: "Anything else?", notesPh: "What you chase, your capacity, anything that helps me target.",
        optional: "optional",
        submit: "Send", sending: "Sending",
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
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const experience = get("experience");
    const payload: Record<string, unknown> = {
      contactName: get("contactName"),
      title: get("title"),
      companyName: get("company"),
      email: get("email"),
      phone: get("phone"),
      website: get("website"),
      trade: get("trade"),
      region: get("region"),
      notes: get("notes"),
    };
    if (experience) payload.experience = experience;

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

  const opt = (s: string) => `${s} (${L.optional})`;

  return (
    <form onSubmit={onSubmit} className="panel-accent grid gap-4 p-7">
      <div className="hud" style={{ color: "var(--color-accent-200)" }}>{L.label}</div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="lf-name">{L.name}</label>
          <input className="input" id="lf-name" name="contactName" required placeholder={L.namePh} />
        </div>
        <div className="field">
          <label htmlFor="lf-title">{opt(L.title)}</label>
          <input className="input" id="lf-title" name="title" placeholder={L.titlePh} />
        </div>
        <div className="field">
          <label htmlFor="lf-company">{L.company}</label>
          <input className="input" id="lf-company" name="company" required placeholder={L.companyPh} />
        </div>
        <div className="field">
          <label htmlFor="lf-email">{L.email}</label>
          <input className="input" id="lf-email" name="email" type="email" required placeholder={L.emailPh} />
        </div>
        <div className="field">
          <label htmlFor="lf-phone">{opt(L.phone)}</label>
          <input className="input" id="lf-phone" name="phone" type="tel" placeholder={L.phonePh} />
        </div>
        <div className="field">
          <label htmlFor="lf-website">{opt(L.website)}</label>
          <input className="input" id="lf-website" name="website" placeholder={L.websitePh} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="lf-trade">{L.trade}</label>
        <input className="input" id="lf-trade" name="trade" required placeholder={L.tradePh} />
      </div>
      <div className="field">
        <label htmlFor="lf-region">{L.region}</label>
        <input className="input" id="lf-region" name="region" required placeholder={L.regionPh} />
      </div>
      <div className="field">
        <label htmlFor="lf-exp">{opt(L.exp)}</label>
        <select className="input" id="lf-exp" name="experience" defaultValue="">
          {Object.entries(L.expOpts).map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="lf-notes">{opt(L.notes)}</label>
        <textarea className="input" id="lf-notes" name="notes" placeholder={L.notesPh} />
      </div>

      {error && <p className="text-sm" style={{ color: "#f0a5a5" }}>{error}</p>}
      <button type="submit" className="btn btn-primary btn-block" disabled={pending} style={{ padding: 12, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        {pending ? L.sending : L.submit}
      </button>
      <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)", lineHeight: 1.5 }}>{L.note}</span>
    </form>
  );
}

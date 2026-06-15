"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight, ShieldCheck, ChevronDown, CheckCircle2 } from "lucide-react";
import { INDUSTRY_SERVICES, type Section } from "@/lib/site/questionnaires";

type Lang = "en" | "fr";
const CONTACT_IDS = ["companyName", "contactName", "email", "phone", "website"];

const UI = {
  en: {
    submit: "Send", sending: "Sending", required: "Please fill in the required fields.",
    netError: "Network error. Please try again.", genError: "Something went wrong. Please try again.",
    okTitle: "Thank you", okBody: "I have your answers. I will use them to find opportunities that actually fit your size and your trade, and I will be in touch.",
    okNote: "Check your inbox for a confirmation.", trust: "Your details come straight to me. No spam, no list-selling.",
    select: "Select", pickIndustry: "Pick your industry above first.", servicesOther: "List the services you offer",
  },
  fr: {
    submit: "Envoyer", sending: "Envoi en cours", required: "Veuillez remplir les champs obligatoires.",
    netError: "Erreur réseau. Veuillez réessayer.", genError: "Une erreur est survenue. Veuillez réessayer.",
    okTitle: "Merci", okBody: "J'ai vos réponses. Je vais les utiliser pour trouver des opportunités qui correspondent vraiment à votre taille et à votre métier, et je vous reviendrai.",
    okNote: "Vérifiez votre boîte de réception pour la confirmation.", trust: "Vos coordonnées me parviennent directement. Pas de pourriel, pas de revente.",
    select: "Choisir", pickIndustry: "Choisissez d'abord votre secteur ci-dessus.", servicesOther: "Énumérez les services que vous offrez",
  },
} as const;

export function QuestionnaireForm({
  sections,
  kind,
  lang = "en",
}: {
  sections: Section[];
  kind: "quick" | "full";
  lang?: Lang;
}) {
  const U = UI[lang];
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const allFields = sections.flatMap((s) => s.fields);

  function setVal(id: string, v: string | string[]) {
    setValues((prev) => {
      const next = { ...prev, [id]: v };
      // Services depend on the chosen industry, so reset them when it changes.
      if (id === "trade") next["services"] = [];
      return next;
    });
  }
  function toggleMulti(id: string, opt: string) {
    setValues((prev) => {
      const cur = (prev[id] as string[]) ?? [];
      return { ...prev, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });
  }
  function asString(id: string) {
    const v = values[id];
    return Array.isArray(v) ? v.join(", ") : (v ?? "");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    for (const f of allFields) {
      if (f.required && !asString(f.id).trim()) {
        setError(U.required);
        return;
      }
    }
    const responses = allFields
      .filter((f) => !CONTACT_IDS.includes(f.id) && asString(f.id).trim())
      .map((f) => ({ label: f.label[lang], value: asString(f.id).trim() }));

    // Id-keyed answers so the API can map them to structured columns.
    const answers: Record<string, string> = {};
    for (const f of allFields) {
      const v = asString(f.id).trim();
      if (v) answers[f.id] = v;
    }

    const payload = {
      kind,
      companyName: asString("companyName"),
      contactName: asString("contactName"),
      email: asString("email"),
      phone: asString("phone"),
      website: asString("website"),
      trade: asString("trade"),
      region: asString("region"),
      answers,
      responses,
    };
    setPending(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? U.genError);
        setPending(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError(U.netError);
      setPending(false);
    }
  }

  const labelCls = "block text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle mb-1.5";
  const selectCls =
    "h-9 w-full rounded-lg bg-bg-raised px-3 text-sm text-fg ring-1 ring-border focus:ring-accent focus:outline-none transition-shadow appearance-none";

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl bg-success-soft/30 px-6 py-12 text-center ring-1 ring-success/30">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h3 className="text-xl font-semibold text-fg">{U.okTitle}</h3>
        <p className="max-w-md text-sm text-fg-muted">{U.okBody}</p>
        <p className="text-[11px] text-fg-subtle">{U.okNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {sections.map((section) => (
        <div key={section.title[lang]}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{section.title[lang]}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.fields.map((f) => {
              const span = f.type === "textarea" || f.type === "multi" || f.type === "services" ? "sm:col-span-2" : "";
              return (
                <div key={f.id} className={span}>
                  <label className={labelCls} htmlFor={f.id}>
                    {f.label[lang]} {f.required && <span className="text-accent">*</span>}
                  </label>

                  {(f.type === "text" || f.type === "email" || f.type === "tel") && (
                    <Input
                      id={f.id}
                      name={f.id}
                      type={f.type === "text" ? "text" : f.type}
                      required={f.required}
                      value={asString(f.id)}
                      onChange={(e) => setVal(f.id, e.target.value)}
                    />
                  )}

                  {f.type === "textarea" && (
                    <textarea
                      id={f.id}
                      name={f.id}
                      rows={3}
                      value={asString(f.id)}
                      onChange={(e) => setVal(f.id, e.target.value)}
                      className="w-full rounded-lg bg-bg-raised px-3 py-2 text-sm text-fg ring-1 ring-border focus:ring-accent focus:outline-none"
                    />
                  )}

                  {f.type === "select" && f.options && (
                    <div className="relative">
                      <select
                        id={f.id}
                        name={f.id}
                        value={asString(f.id)}
                        onChange={(e) => setVal(f.id, e.target.value)}
                        className={selectCls}
                      >
                        <option value="">{U.select}</option>
                        {f.options.map((o) => (
                          <option key={o.en} value={o.en}>{o[lang]}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
                    </div>
                  )}

                  {f.type === "multi" && f.options && (
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                      {f.options.map((o) => {
                        const on = ((values[f.id] as string[]) ?? []).includes(o.en);
                        return (
                          <button
                            type="button"
                            key={o.en}
                            onClick={() => toggleMulti(f.id, o.en)}
                            className={cn(
                              "rounded-lg px-2.5 py-1.5 text-xs text-left ring-1 transition-colors",
                              on ? "bg-accent-soft text-accent ring-accent/40" : "bg-bg-panel/60 text-fg-muted ring-border hover:bg-bg-hover"
                            )}
                          >
                            {o[lang]}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {f.type === "services" && (() => {
                    const industry = asString("trade");
                    if (!industry) {
                      return <p className="text-sm text-fg-subtle">{U.pickIndustry}</p>;
                    }
                    const svc = INDUSTRY_SERVICES[industry];
                    if (!svc) {
                      return (
                        <Input
                          id={f.id}
                          name={f.id}
                          value={asString(f.id)}
                          onChange={(e) => setVal(f.id, e.target.value)}
                          placeholder={U.servicesOther}
                        />
                      );
                    }
                    const selected = (values[f.id] as string[]) ?? [];
                    return (
                      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                        {svc.map((o) => {
                          const on = selected.includes(o.en);
                          return (
                            <button
                              type="button"
                              key={o.en}
                              onClick={() => toggleMulti(f.id, o.en)}
                              className={cn(
                                "rounded-lg px-2.5 py-1.5 text-xs text-left ring-1 transition-colors",
                                on ? "bg-accent-soft text-accent ring-accent/40" : "bg-bg-panel/60 text-fg-muted ring-border hover:bg-bg-hover"
                              )}
                            >
                              {o[lang]}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {error && (
        <div className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger ring-1 ring-danger/30">{error}</div>
      )}

      <div>
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto sm:px-10">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          {pending ? U.sending : U.submit}
        </Button>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-fg-subtle">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          {U.trust}
        </p>
      </div>
    </form>
  );
}

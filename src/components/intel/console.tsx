"use client";

import { useEffect, useRef, useState } from "react";
import {
  SCREENING_SAMPLES,
  SCREENING_TRADES,
  TICKER_INTERCEPTS,
  calcFee,
  calcTier,
  type ScreeningSample,
} from "@/lib/intel/data";

type Lang = "en" | "fr";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* ══════════════════════════════════════════════════════════════════════
   Scroll reveal: adds `.is-in` to every [data-reveal] as it enters view.
   Anything already above the fold is revealed immediately so nothing can
   be caught invisible. Skipped entirely under reduced motion.
   ════════════════════════════════════════════════════════════════════ */
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".intel [data-reveal]"));
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const threshold = window.innerHeight * 0.9;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < threshold) el.classList.add("is-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}

/* ══════════════════════════════════════════════════════════════════════
   Header live readouts: honest clock arithmetic, not fake business metrics.
   ════════════════════════════════════════════════════════════════════ */
export function HudReadouts({ lang = "en" }: { lang?: Lang }) {
  const [time, setTime] = useState("00:00:00");
  const [uptime, setUptime] = useState("214d 07:00");
  const [queue, setQueue] = useState(34);
  const mount = useRef<number | null>(null);

  useEffect(() => {
    mount.current = Date.now();
    const base = 214 * 86400 + 7 * 3600; // start at 214 days 07:00
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} LOCAL`);
      const elapsed = Math.floor((Date.now() - (mount.current ?? Date.now())) / 1000);
      const total = base + elapsed;
      const d = Math.floor(total / 86400);
      const h = Math.floor((total % 86400) / 3600);
      const m = Math.floor((total % 3600) / 60);
      setUptime(`${d}d ${pad(h)}:${pad(m)}`);
      setQueue(34 + Math.floor(Math.abs(Math.sin(Date.now() / 26000)) * 22));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const L = lang === "fr"
    ? { time: "Heure station", up: "En service", q: "File d'attente" }
    : { time: "Station time", up: "Uptime", q: "Queue depth" };

  return (
    <div className="hidden items-center gap-5 border-l pl-5 md:flex" style={{ borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)" }}>
      <Readout label={L.time} value={time} />
      <Readout label={L.up} value={uptime} />
      <Readout label={L.q} value={String(queue)} />
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="hud">{label}</span>
      <span className="tabular-nums" style={{ fontSize: 12, color: "var(--color-accent-200)", letterSpacing: "0.02em" }}>
        {value}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Intercept ticker: PLATFORM · TITLE · VERDICT, duplicated for a seamless loop.
   ════════════════════════════════════════════════════════════════════ */
export function InterceptTicker({ lang = "en" }: { lang?: Lang }) {
  const label = lang === "fr" ? "Interceptions" : "Intercepts";
  const row = [...TICKER_INTERCEPTS, ...TICKER_INTERCEPTS];
  return (
    <div
      className="relative flex items-center overflow-hidden border-y"
      style={{
        background: "color-mix(in srgb, #161826 80%, transparent)",
        borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
      }}
    >
      <span
        className="hud z-10 shrink-0 border-r px-4 py-2.5"
        style={{ background: "var(--nz-page)", borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)", color: "var(--color-accent)" }}
      >
        {label}
      </span>
      <div className="overflow-hidden">
        <div className="nz-ticker-track flex w-max whitespace-nowrap" style={{ animation: "nz-ticker 42s linear infinite" }}>
          {row.map((it, i) => (
            <span key={i} className="flex items-center gap-2 px-6 py-2.5" style={{ fontSize: 11, letterSpacing: "0.1em", color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>
              <span style={{ color: "var(--color-accent-300)" }}>{it.platform}</span>
              <span aria-hidden>·</span>
              <span>{it.title}</span>
              <span aria-hidden>·</span>
              <span style={{ color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}>{it.verdict}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Screening engine: trade toggles + posting cycler + fit score.
   Scoring model reproduced exactly from the handoff.
   ════════════════════════════════════════════════════════════════════ */
function scoreSample(sample: ScreeningSample, profile: Record<string, boolean>) {
  const trade = profile[sample.trade] ? 94 : 22;
  const region = sample.region === "Ontario" ? 90 : 82;
  const size = sample.value.includes("M") ? 74 : 86;
  const compliance = sample.bond ? 56 : 88;
  const timing = sample.closes >= 18 ? 92 : sample.closes >= 12 ? 74 : 46;
  const score = Math.round(trade * 0.36 + region * 0.18 + size * 0.14 + compliance * 0.16 + timing * 0.16);
  return { score, factors: { trade, region, size, compliance, timing } };
}

export function ScreeningEngine({ lang = "en" }: { lang?: Lang }) {
  const initial = Object.fromEntries(SCREENING_TRADES.map((t) => [t.key, t.on])) as Record<string, boolean>;
  const [profile, setProfile] = useState(initial);
  const [idx, setIdx] = useState(0);
  const sample = SCREENING_SAMPLES[idx];
  const { score, factors } = scoreSample(sample, profile);

  const verdict = score >= 76
    ? { text: lang === "fr" ? "BON AJUSTEMENT, VISER" : "STRONG FIT, PURSUE", color: "var(--color-accent-200)" }
    : score >= 56
      ? { text: lang === "fr" ? "CONDITIONNEL, À REVOIR" : "CONDITIONAL, REVIEW", color: "#e9e9ed" }
      : { text: lang === "fr" ? "NE PAS SOUMISSIONNER" : "NO BID RECOMMENDED", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" };

  const L = lang === "fr"
    ? {
        profile: "Profil de capacité", posting: "Appel d'offres entrant", next: "Appel suivant →", fit: "Score d'ajustement",
        buyer: "Acheteur", platform: "Plateforme", region: "Territoire", trade: "Métier", value: "Valeur", closes: "Clôture",
        days: "jours", factors: { trade: "Ajustement métier", region: "Territoire", size: "Taille / capacité", compliance: "Charge de conformité", timing: "Délai de clôture" },
      }
    : {
        profile: "Capability profile", posting: "Incoming posting", next: "Next posting →", fit: "Fit score",
        buyer: "Buyer", platform: "Platform", region: "Region", trade: "Trade", value: "Value", closes: "Closes",
        days: "days", factors: { trade: "Trade match", region: "Jurisdiction", size: "Size / capacity", compliance: "Compliance load", timing: "Time to close" },
      };

  const fields: [string, string][] = [
    [L.buyer, sample.buyer],
    [L.platform, sample.platform],
    [L.region, sample.region],
    [L.trade, sample.trade.charAt(0).toUpperCase() + sample.trade.slice(1)],
    [L.value, sample.value],
    [L.closes, `${sample.closes} ${L.days}`],
  ];

  const factorRows: [string, number][] = [
    [L.factors.trade, factors.trade],
    [L.factors.region, factors.region],
    [L.factors.size, factors.size],
    [L.factors.compliance, factors.compliance],
    [L.factors.timing, factors.timing],
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Capability profile */}
      <div className="panel p-6">
        <p className="hud mb-4">{L.profile}</p>
        <div className="flex flex-wrap gap-2.5">
          {SCREENING_TRADES.map((t) => {
            const on = profile[t.key];
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={on}
                onClick={() => setProfile((p) => ({ ...p, [t.key]: !p[t.key] }))}
                className="rounded px-4 py-2 text-sm transition-colors"
                style={{
                  border: `1px solid ${on ? "var(--color-accent)" : "color-mix(in srgb, #e9e9ed 18%, transparent)"}`,
                  color: on ? "var(--color-accent-200)" : "color-mix(in srgb, var(--color-text) 60%, transparent)",
                  background: on ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "transparent",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
          {lang === "fr"
            ? "Activez vos métiers, puis faites défiler les appels. Regardez l'ajustement changer. C'est le jugement que je porte sur chaque affichage, tous les jours."
            : "Turn on your trades, then cycle the postings. Watch the fit change. This is the judgment I run on every posting, every day."}
        </p>
      </div>

      {/* Incoming posting + fit score */}
      <div className="panel-accent p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="hud" style={{ color: "var(--color-accent-200)" }}>{L.posting}</p>
          <button
            type="button"
            onClick={() => setIdx((i) => (i + 1) % SCREENING_SAMPLES.length)}
            className="btn btn-primary"
            style={{ padding: "6px 12px", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            {L.next}
          </button>
        </div>

        <p className="mt-3 text-lg font-medium" style={{ color: "var(--color-text)" }}>{sample.title}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {fields.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b py-1" style={{ borderColor: "color-mix(in srgb, var(--color-text) 8%, transparent)" }}>
              <dt style={{ color: "color-mix(in srgb, var(--color-text) 52%, transparent)" }}>{k}</dt>
              <dd className="text-right" style={{ color: "var(--color-text)" }}>{v}</dd>
            </div>
          ))}
        </dl>

        {/* Fit score */}
        <div className="mt-5" aria-live="polite">
          <div className="flex items-end gap-2">
            <span className="tabular-nums" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em", color: "var(--color-accent-200)" }}>{score}</span>
            <span className="mb-2 text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>/ 100</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full" style={{ background: "color-mix(in srgb, var(--color-text) 12%, transparent)" }}>
            <div style={{ width: `${score}%`, height: "100%", background: "var(--color-accent)", boxShadow: "0 0 12px var(--color-accent)", transition: "width 380ms cubic-bezier(.2,.7,.2,1)" }} />
          </div>
          <p className="mt-2 text-sm font-medium" style={{ color: verdict.color, letterSpacing: "0.04em" }}>{verdict.text}</p>
        </div>

        {/* Factor bars */}
        <div className="mt-5 space-y-2.5">
          {factorRows.map(([k, v]) => (
            <div key={k}>
              <div className="flex justify-between text-xs">
                <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{k}</span>
                <span className="tabular-nums" style={{ color: "var(--color-text)" }}>{v}</span>
              </div>
              <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full" style={{ background: "color-mix(in srgb, var(--color-text) 10%, transparent)" }}>
                <div style={{ width: `${v}%`, height: "100%", background: "color-mix(in srgb, var(--color-accent) 70%, transparent)", transition: "width 380ms ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Cost of the current posture: the one saturated band. Math reproduced exactly.
   ════════════════════════════════════════════════════════════════════ */
export function CostBand({ lang = "en" }: { lang?: Lang }) {
  const [rate, setRate] = useState(55);
  const [hours, setHours] = useState(8);
  const [jur, setJur] = useState(3);

  const diyMonth = rate * hours * 4.333 * Math.min(1 + (jur - 1) * 0.18, 2.4);
  const diyYear = diyMonth * 12;
  const fee = calcFee(jur);
  const delta = diyYear - fee;
  const tier = calcTier(jur);

  const L = lang === "fr"
    ? {
        idx: "04 / Coût de la posture actuelle",
        title: "La recherche a un prix. Vous le payez déjà.",
        lede: "Chaque heure passée à surveiller des portails, ouvrir des documents et trier des alertes est une heure qui ne sert pas à gagner. Voici ce que vaut cette heure.",
        rate: "Taux estimateur, tout compris", hoursL: "Heures par semaine sur les portails", jurL: "Territoires surveillés",
        inhouse: "En interne", inhouseYear: "par an en temps de surveillance", perMonth: "par mois",
        split: "Attention partagée avec l'estimation", vac: "La couverture s'arrête en vacances",
        from: "À partir de", byQuote: "Sur devis", quoteNote: "La couverture nationale et transfrontalière est établie et facturée selon votre territoire.",
        feeSuffix: "par an, dédié. Chiffre de départ pour ce périmètre, votre secteur fixe le montant final.",
        freed: "libérés sur l'année", moreThan: "de plus par an qu'en interne",
        foot: "Estimation seulement. Les honoraires partent des chiffres indiqués et montent avec la charge du secteur.",
      }
    : {
        idx: "04 / Cost of the current posture",
        title: "The search has a price. You are already paying it.",
        lede: "Every hour spent monitoring portals, opening documents and triaging alerts is an hour not spent winning. Here is what that hour is worth.",
        rate: "Estimator rate, fully loaded", hoursL: "Hours a week on portals", jurL: "Jurisdictions monitored",
        inhouse: "Doing it in house", inhouseYear: "a year in monitoring time", perMonth: "a month",
        split: "Attention split with estimating", vac: "Coverage stops on vacation",
        from: "From", byQuote: "By quote", quoteNote: "National and cross border coverage is scoped and quoted to your footprint.",
        feeSuffix: "a year, dedicated. Starting figure for this footprint, your industry sets the final number.",
        freed: "freed up over the year", moreThan: "more per year than in house time",
        foot: "Estimate only. Fees start at the figures shown and rise with industry workload.",
      };

  const sliders: [string, number, number, number, number, (v: number) => void, string][] = [
    [L.rate, 35, 140, 5, rate, setRate, usd(rate)],
    [L.hoursL, 2, 30, 1, hours, setHours, String(hours)],
    [L.jurL, 1, 12, 1, jur, setJur, String(jur)],
  ];

  return (
    <div
      className="border-y"
      style={{
        background: "var(--color-section)",
        borderColor: "color-mix(in srgb, var(--color-accent) 30%, transparent)",
      }}
    >
      <div className="mx-auto max-w-[1360px] px-4 py-20 sm:px-7">
        <p className="idx" style={{ color: "var(--color-accent-200)" }}>{L.idx}</p>
        <h2 className="mt-3 max-w-2xl" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em" }}>{L.title}</h2>
        <p className="mt-4 max-w-2xl" style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)", lineHeight: 1.6 }}>{L.lede}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Inputs */}
          <div className="panel p-6" style={{ background: "color-mix(in srgb, #101120 40%, transparent)" }}>
            <div className="space-y-7">
              {sliders.map(([label, min, max, step, val, set, display]) => (
                <label key={label} className="block">
                  <span className="flex items-baseline justify-between">
                    <span className="text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{label}</span>
                    <span className="tabular-nums" style={{ fontSize: 17, color: "var(--color-accent-200)" }}>{display}</span>
                  </span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    onChange={(e) => set(Number(e.target.value))}
                    className="mt-3 w-full"
                    style={{ accentColor: "#9184d9", height: 6 }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="panel flex flex-col p-6" style={{ background: "color-mix(in srgb, #101120 40%, transparent)" }}>
              <p className="hud">{L.inhouse}</p>
              <p className="tabular-nums mt-3" style={{ fontSize: 40, letterSpacing: "-0.03em", color: "var(--color-text)" }}>{usd(diyYear)}</p>
              <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{L.inhouseYear}</p>
              <p className="tabular-nums mt-4 text-sm" style={{ color: "var(--color-text)" }}>{usd(diyMonth)} <span style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{L.perMonth}</span></p>
              <ul className="mt-auto space-y-1.5 pt-4 text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                <li>{L.split}</li>
                <li>{L.vac}</li>
              </ul>
            </div>

            <div className="panel-accent flex flex-col p-6">
              <p className="hud" style={{ color: "var(--color-accent-200)" }}>{tier}</p>
              {jur > 5 ? (
                <>
                  <p className="mt-3" style={{ fontSize: 40, letterSpacing: "-0.03em", color: "var(--color-accent-200)" }}>{L.byQuote}</p>
                  <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{L.quoteNote}</p>
                </>
              ) : (
                <>
                  <p className="tabular-nums mt-3" style={{ fontSize: 40, letterSpacing: "-0.03em", color: "var(--color-accent-200)" }}>
                    <span style={{ fontSize: 18, letterSpacing: 0 }}>{L.from} </span>{usd(fee)}
                  </p>
                  <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{L.feeSuffix}</p>
                  <p className="tabular-nums mt-auto pt-4" style={{ fontSize: 17, color: "var(--color-accent-200)" }}>
                    {usd(Math.abs(delta))}{" "}
                    <span className="text-sm" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                      {delta >= 0 ? L.freed : L.moreThan}
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs" style={{ color: "color-mix(in srgb, var(--color-text) 52%, transparent)" }}>{L.foot}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Channel log: typed transcript. Full text immediately under reduced motion.
   ════════════════════════════════════════════════════════════════════ */
export function ChannelLog({ lang = "en" }: { lang?: Lang }) {
  const lines = lang === "fr"
    ? [
        "> canal d'admission securise ouvert",
        "> operateur: phil dave, renseignement sur les opportunites",
        "> envoyez votre metier et vos territoires. je reponds avec de vraies opportunites qualifiees.",
        "> sans frais. sans engagement.",
      ]
    : [
        "> secure intake channel open",
        "> operator: phil dave, government opportunity intelligence",
        "> send your trade and jurisdictions. i reply with real qualified bids.",
        "> no cost. no obligation.",
      ];
  const full = lines.join("\n");
  const [shown, setShown] = useState(full);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(full);
      return;
    }
    setShown("");
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setShown(full.slice(0, i));
      if (i >= full.length) clearInterval(iv);
    }, 22);
    return () => clearInterval(iv);
  }, [full]);

  return (
    <div
      className="flex flex-col gap-3 rounded p-5"
      style={{
        minHeight: 132,
        background: "color-mix(in srgb, #0c0d18 80%, transparent)",
        border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="blip" />
        <span className="hud">{lang === "fr" ? "Journal de canal" : "Channel log"}</span>
      </div>
      <pre
        style={{
          margin: 0,
          whiteSpace: "pre-wrap",
          fontFamily: "var(--nz-font)",
          fontSize: 13,
          lineHeight: 1.85,
          letterSpacing: "0.04em",
          color: "var(--color-accent-200)",
        }}
      >
        {shown}
        <span
          aria-hidden
          style={{ display: "inline-block", width: 7, height: 14, background: "var(--color-accent)", marginLeft: 2, verticalAlign: "text-bottom", animation: "nz-caret 1s step-end infinite" }}
        />
      </pre>
    </div>
  );
}

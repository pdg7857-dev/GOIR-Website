import type { Metadata } from "next";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";
import { SITE } from "@/lib/site/config";

const base = pageMeta({
  title: "Rapport de position concurrentielle gratuit",
  description:
    "Découvrez qui remporte les contrats publics que vous devriez soumissionner. Je consulte le registre public des adjudications pour votre métier et vos territoires, et je renvoie une analyse de vos concurrents, des acheteurs et de ce qui vous échappe. Gratuit, sans engagement.",
  path: "/fr/free-opportunities",
  keywords: ["analyse concurrentielle contrats publics", "qui remporte les appels d'offres", "adjudications publiques"],
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: SITE.domain + "/fr/free-opportunities",
    languages: {
      en: SITE.domain + "/free-opportunities",
      "fr-CA": SITE.domain + "/fr/free-opportunities",
    },
  },
};

const FAQS = [
  { q: "Est-ce vraiment gratuit?", a: "Oui. Sans frais et sans engagement. Je le bâtis à partir du registre public des adjudications, cela me coûte du temps de recherche et rien à vous. Vous gardez le rapport dans tous les cas." },
  { q: "D'où viennent les informations?", a: "De sources publiques. Les acheteurs publics publient qui a remporté un contrat, pour quoi et pour quel montant. Presque aucun entrepreneur ne consulte ce registre. Je le consulte pour votre catégorie et vos territoires et j'en tire quelque chose d'utilisable." },
  { q: "Qu'est-ce que je reçois exactement?", a: "Une analyse de votre coin de marché: les entreprises qui remportent le travail que vous devriez soumissionner, à quelle fréquence et à quels montants, les acheteurs qui l'adjugent régulièrement, et les endroits où du travail est adjugé sans que vous y soyez présent. Plus une lecture honnête de votre meilleure ouverture." },
  { q: "Quand vais-je le recevoir?", a: "En 5 jours ouvrables. Je prépare chacun à la main, c'est de la vraie recherche sur votre métier et vos territoires, pas une extraction automatisée." },
];

const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;
const accent = "var(--color-accent)";

const STEPS = [
  { n: "01", t: "Vous me donnez les bases", b: "Votre métier, où vous travaillez, et l'ordre de grandeur des contrats que vous pouvez livrer. Une minute." },
  { n: "02", t: "Je consulte le registre public des adjudications", b: "Qui a remporté quoi dans votre catégorie, auprès de quels acheteurs, à quels montants, sur les plateformes qui desservent votre territoire." },
  { n: "03", t: "Vous recevez l'analyse, en 5 jours ouvrables", b: "Vos concurrents nommés, les acheteurs qui achètent sans arrêt, et les écarts où vous devriez soumissionner sans le faire." },
];

const INCLUDES = [
  "Les entreprises qui remportent des contrats dans votre catégorie, à quelle fréquence et à quels montants",
  "Les acheteurs qui adjugent ce travail régulièrement, et ce qu'ils achètent réellement",
  "Les endroits où du travail est adjugé sans que vous y soyez présent",
  "Une lecture honnête de votre meilleure ouverture, et de ce qu'elle exigerait",
];

export default function FreeOpportunitiesFrPage() {
  return (
    <div className="intel" lang="fr-CA" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/fr" },
            { name: "Rapport de position concurrentielle", path: "/fr/free-opportunities" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />
      <div className="nz-gridwash" />

      <main
        className="relative mx-auto grid max-w-[1100px] items-start gap-14 px-4 sm:px-7"
        style={{ zIndex: 1, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", padding: "clamp(40px, 7vw, 80px) clamp(16px, 4vw, 28px) 80px" }}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span className="blip" />
            <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Rapport de position concurrentielle gratuit · sans engagement</span>
          </div>
          <h1 className="mt-5" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: "18ch" }}>
            Voyez qui remporte les contrats que vous devriez soumissionner.
          </h1>
          <div className="rule mt-6" />
          <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "50ch" }}>
            Les acheteurs publics publient qui a gagné, pour quoi, et pour combien. Presque personne
            ne lit ce registre. Dites-moi votre métier et où vous travaillez, et je le consulte pour
            votre catégorie, puis je renvoie une analyse de vos concurrents, des acheteurs derrière
            eux, et du travail où vous n'êtes pas présent.
          </p>

          <div className="mt-9 grid gap-5 pt-7" style={{ borderTop: `1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)` }}>
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span style={{ flex: "none", fontSize: 11, letterSpacing: "0.16em", color: accent, paddingTop: 3 }}>{s.n}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 5, color: "var(--color-text)" }}>{s.t}</div>
                  <p className="text-sm" style={{ color: muted(66), lineHeight: 1.55 }}>{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="panel mt-8 p-5">
            <p className="hud" style={{ color: accent }}>Ce qu'il contient</p>
            <ul className="mt-3 space-y-2">
              {INCLUDES.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: muted(72), lineHeight: 1.5 }}>
                  <span aria-hidden style={{ color: accent }}>&rsaquo;</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs" style={{ color: muted(50), lineHeight: 1.5 }}>
              Bâti entièrement à partir des adjudications publiées. Rien de confidentiel, rien que
              vous ne pourriez trouver vous-même avec assez d'heures.
            </p>
          </div>
        </div>

        <IntelLeadForm lang="fr" />
      </main>
    </div>
  );
}

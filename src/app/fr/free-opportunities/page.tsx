import type { Metadata } from "next";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";
import { SITE } from "@/lib/site/config";

const base = pageMeta({
  title: "Obtenez des opportunités gouvernementales gratuites pour votre métier",
  description:
    "Dites-moi votre métier et où vous soumissionnez, et je vous enverrai une courte liste d'opportunités gouvernementales réelles et actuelles que vous n'avez pas trouvées, déjà qualifiées avec les liens source. Gratuit, sans engagement.",
  path: "/fr/free-opportunities",
  keywords: ["appels d'offres gouvernementaux", "opportunités de contrats publics", "soumissions gouvernementales"],
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
  { q: "Est-ce vraiment gratuit?", a: "Oui. Sans frais et sans engagement. Je vous envoie de vraies opportunités pour que vous voyiez la qualité de mon travail avant même d'envisager une couverture payante." },
  { q: "Qu'est-ce que je reçois exactement?", a: "Une courte liste d'opportunités gouvernementales actuelles qui correspondent à votre métier et à l'endroit où vous soumissionnez, chacune avec un lien vers l'appel d'offres d'origine. L'examen complet des documents et la qualification, c'est ce que je fais pour mes clients payants." },
  { q: "Quand vais-je avoir de vos nouvelles?", a: "En 3 jours ouvrables. Je prépare chaque liste personnellement, c'est de la vraie recherche sur votre métier et vos territoires, pas un courriel automatisé." },
];

const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;
const accent = "var(--color-accent)";

const STEPS = [
  { n: "01", t: "Vous me donnez les bases", b: "Votre métier, où vous soumissionnez, et quelques détails sur votre entreprise. Une minute." },
  { n: "02", t: "Je fais le balayage", b: "Chaque plateforme de votre territoire, documents ouverts, ajustement jugé selon ce que vous m'avez dit." },
  { n: "03", t: "Vous recevez la courte liste, en 3 jours ouvrables", b: "Résumés en langage clair et liens directs. Soumissionnez vous-même, avec ou sans moi. Aucun argumentaire." },
];

export default function FreeOpportunitiesFrPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/fr" },
            { name: "Opportunités gratuites", path: "/fr/free-opportunities" },
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
            <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Rapport de renseignement gratuit · sans engagement</span>
          </div>
          <h1 className="mt-5" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: "16ch" }}>
            Voyez les soumissions qui vous échappent.
          </h1>
          <div className="rule mt-6" />
          <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "46ch" }}>
            Dites-moi votre métier et où vous soumissionnez. Je passe en revue les plateformes
            desservant votre territoire et je renvoie une courte liste de vraies opportunités
            ouvertes que vous n'avez pas vues, lues, qualifiées et liées.
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
        </div>

        <IntelLeadForm lang="fr" />
      </main>
    </div>
  );
}

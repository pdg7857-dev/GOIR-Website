import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { CostCalculator } from "@/components/site/cost-calculator";
import { FaqAccordion } from "@/components/site/faq";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

const FAQS = [
  { q: "Qu'est-ce que le gaspillage d'opportunités?", a: "Le temps que vos estimateurs et votre équipe de propositions consacrent à trouver, lire et trier des opportunités gouvernementales qui n'étaient jamais un bon ajustement. C'est de l'argent réel, et cela apparaît rarement sur une ligne budgétaire." },
  { q: "Comment l'estimation est-elle calculée?", a: "À partir de vos propres données: le taux tout compris de votre estimateur, les heures par semaine passées à surveiller et examiner les soumissions, et le nombre de territoires que vous surveillez. C'est une estimation de départ, pas un prix." },
  { q: "Comment le réduire?", a: "En retirant la surveillance, la lecture et la qualification de votre équipe pour que ses heures aillent seulement aux soumissions qui valent la peine. C'est exactement ce que fait la couverture, ajustée à votre territoire et établie lors d'un appel." },
  { q: "Puis-je obtenir un chiffre sur mesure?", a: "Oui. Demandez vos opportunités gratuites et je regarderai votre métier et vos territoires en personne." },
];

export const metadata: Metadata = {
  ...pageMeta({
    title: "Calculateur de gaspillage d'opportunités: combien la recherche vous coûte-t-elle?",
    description:
      "Estimez le temps d'estimateur que votre équipe gaspille à surveiller des portails et à examiner des soumissions mal adaptées, puis voyez ce que confier ce travail à un service de renseignement dédié pourrait vous redonner.",
    path: "/fr/opportunity-waste-calculator",
    keywords: ["calculateur de gaspillage d'opportunités", "coût des appels d'offres", "temps d'estimateur"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/opportunity-waste-calculator",
    languages: {
      en: SITE.domain + "/opportunity-waste-calculator",
      "fr-CA": SITE.domain + "/fr/opportunity-waste-calculator",
    },
  },
};

export default function OpportunityWasteCalculatorFrPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Accueil", path: "/fr" }, { name: "Calculateur de gaspillage d'opportunités", path: "/fr/opportunity-waste-calculator" }]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "Calculateur de gaspillage" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Outil gratuit</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">Calculateur de gaspillage d'opportunités</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Chaque heure que votre équipe passe à surveiller des portails et à lire des soumissions
              mal adaptées est du gaspillage d'opportunités. Mettez-y un chiffre, puis voyez ce que
              la couverture peut vous redonner.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <CostCalculator lang="fr" />
        </div>
      </Section>

      <Section muted>
        <SectionHead
          center
          eyebrow="Pourquoi ça s'accumule"
          title="Le coût caché de tout faire soi-même"
          lede="Le gaspillage d'opportunités se cache dans plusieurs rôles et tâches. Ensemble, ils représentent un coût réel et récurrent."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Temps d'estimateur passé à surveiller les portails",
              "Temps du gestionnaire de propositions à trier les alertes",
              "Examen de documents pour des soumissions mal adaptées",
              "Revérification des addenda et des dates modifiées",
              "Qualification des opportunités à la main",
              "Changements de contexte entre de nombreuses plateformes",
            ].map((t) => (
              <li key={t} className="rounded-xl border border-border bg-bg-panel p-4 text-sm text-fg-muted">{t}</li>
            ))}
          </ul>
        </div>
        <div className="mt-10 text-center">
          <Link href="/fr/free-opportunities" className="btn-gold px-6 py-3.5 text-base">
            Obtenez des opportunités gratuites
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHead title="Questions" />
        <div className="mt-8 max-w-3xl"><FaqAccordion faqs={FAQS} /></div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

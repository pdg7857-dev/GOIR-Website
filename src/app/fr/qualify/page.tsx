import type { Metadata } from "next";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { QuestionnaireForm } from "@/components/site/questionnaire-form";
import { QUICK_FORM } from "@/lib/site/questionnaires";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Des opportunités à votre taille",
    description:
      "Quelques questions rapides sur votre métier, où vous soumissionnez et la taille des contrats que vous prenez, pour que je trouve des opportunités gouvernementales qui vous conviennent vraiment. Environ 5 minutes.",
    path: "/fr/qualify",
    keywords: ["appariement d'appels d'offres", "trouver des contrats publics"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/qualify",
    languages: { en: SITE.domain + "/qualify", "fr-CA": SITE.domain + "/fr/qualify" },
  },
};

export default function QualifyFrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/fr" }, { name: "Trouvez vos opportunités", path: "/fr/qualify" }])} />

      <section className="border-b border-border bg-ink-900 text-white">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "Trouvez vos opportunités" }]} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow text-accent">Trouvez les bonnes opportunités</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Des opportunités à votre taille, pas un déluge.</h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Quelques questions rapides sur votre métier, où vous soumissionnez et la taille des
              contrats que vous prenez. Plus vous êtes honnête sur votre créneau idéal, mieux les
              opportunités que je vous apporte vous conviendront. Environ 5 minutes, et je lis chaque
              réponse moi-même.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <QuestionnaireForm sections={QUICK_FORM} kind="quick" lang="fr" />
        </div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

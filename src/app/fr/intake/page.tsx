import type { Metadata } from "next";
import { Breadcrumbs, Section } from "@/components/site/ui";
import { QuestionnaireForm } from "@/components/site/questionnaire-form";
import { FULL_FORM } from "@/lib/site/questionnaires";

export const metadata: Metadata = {
  title: "Questionnaire client",
  description: "Parlez-moi de votre entreprise pour que je trouve le travail public qui correspond à votre taille et à votre métier.",
  robots: { index: false, follow: false },
};

export default function IntakeFrPage() {
  return (
    <>
      <section className="border-b border-border bg-ink-900 text-white">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "Questionnaire client" }]} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow text-accent">Questionnaire client</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Laissez-moi connaître votre entreprise.</h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Quelques questions pour que je trouve les bonnes opportunités pour vous, pas seulement
              plus d'opportunités. La plupart des gens terminent en environ cinq minutes. Plus vous
              êtes honnête sur votre taille et votre créneau idéal, mieux les soumissions que je vous
              apporte vous conviendront. Je lis chaque réponse moi-même.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <QuestionnaireForm sections={FULL_FORM} kind="full" lang="fr" />
        </div>
      </Section>
    </>
  );
}

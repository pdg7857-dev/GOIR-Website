import type { Metadata } from "next";
import { Search, FileSearch, Filter, Send } from "lucide-react";
import { Breadcrumbs, CtaBand, Section, SectionHead, CredentialBadge } from "@/components/site/ui";
import { RequestOpportunitiesForm } from "@/components/site/request-opportunities-form";
import { FaqAccordion } from "@/components/site/faq";
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

const STEPS = [
  { icon: Search, title: "Je cherche là où vous soumissionnez", body: "Sur les plateformes qui comptent dans votre province ou région, pas seulement celle que vous surveillez." },
  { icon: FileSearch, title: "Je lis les documents", body: "Portée, exigences et critères d'évaluation, pour que le bon ajustement soit réel et non un simple mot-clé." },
  { icon: Filter, title: "Je qualifie l'ajustement", body: "Selon votre métier et votre territoire, pour que vous ne voyiez que des opportunités qui valent votre temps." },
  { icon: Send, title: "Je vous envoie la liste", body: "Des opportunités réelles et actuelles, avec un résumé en langage clair et un lien vers l'appel d'offres source." },
];

const FAQS = [
  {
    q: "Est-ce vraiment gratuit?",
    a: "Oui. Sans frais et sans engagement. Je vous envoie de vraies opportunités pour que vous voyiez la qualité de mon travail avant même d'envisager une couverture payante.",
  },
  {
    q: "Qu'est-ce que je reçois exactement?",
    a: "Une courte liste d'opportunités gouvernementales actuelles qui correspondent à votre métier et à l'endroit où vous soumissionnez. Chacune est trouvée et qualifiée, avec un résumé en langage clair et un lien vers l'appel d'offres sur la plateforme d'origine.",
  },
  {
    q: "Je suis nouveau dans les appels d'offres publics. Est-ce pour moi?",
    a: "Oui. Que vous n'ayez jamais soumissionné ou que vous le fassiez chaque semaine, je m'adapte à votre situation et vous montre ce qui est ouvert et réellement digne d'intérêt dans votre métier.",
  },
  {
    q: "Quand vais-je avoir de vos nouvelles?",
    a: "En 1 à 2 jours ouvrables. Je prépare chaque liste personnellement, c'est de la vraie recherche sur votre métier et vos territoires, pas un courriel automatisé.",
  },
  {
    q: "Que faites-vous de mes coordonnées?",
    a: "Elles me parviennent directement pour que je prépare vos opportunités et fasse un suivi. Pas de pourriel, pas de revente de listes.",
  },
];

export default function FreeOpportunitiesFrPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/fr" },
            { name: "Opportunités gratuites", path: "/fr/free-opportunities" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-ink-900 text-white">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "Opportunités gratuites" }]} />
          <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-xl">
              <p className="eyebrow text-accent">Demandez vos opportunités gratuites</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                Laissez-moi vous montrer ce qui vous échappe.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Dites-moi ce que vous faites et où vous soumissionnez. Je vais chercher sur les
                plateformes qui comptent dans votre région, lire les documents, qualifier
                l'ajustement, et vous envoyer une courte liste d'opportunités réelles et actuelles qui
                conviennent à votre métier. Trouvées et qualifiées comme je le fais pour mes clients.
                Gratuit, et sans engagement.
              </p>
              <div className="mt-7">
                <CredentialBadge lg />
              </div>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                <li>De vraies opportunités, pas un argumentaire de vente.</li>
                <li>Nouveau ou expérimenté, je m'adapte à votre situation.</li>
                <li>Vos coordonnées me parviennent directement. Pas de pourriel, pas de revente.</li>
              </ul>
            </div>

            <div className="card bg-bg p-6 text-fg sm:p-8">
              <h2 className="text-xl font-semibold text-fg">Où dois-je les envoyer?</h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Quelques détails rapides pour que je cible votre liste.
              </p>
              <div className="mt-6">
                <RequestOpportunitiesForm lang="fr" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          center
          eyebrow="Comment ça fonctionne"
          title="Ce qui se passe après l'envoi du formulaire"
          lede="Le même processus que je mène pour mes clients payants, sur un échantillon de vos vraies opportunités."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.title} className="card p-6">
              <s.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl">
          <SectionHead center title="Questions fréquentes" />
          <div className="mt-8">
            <FaqAccordion faqs={FAQS} />
          </div>
        </div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

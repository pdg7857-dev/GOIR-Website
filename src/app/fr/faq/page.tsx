import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { FaqAccordion, type Faq } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

const GROUPS: { title: string; faqs: Faq[] }[] = [
  {
    title: "Le service",
    faqs: [
      {
        q: "Que faites-vous exactement?",
        a: "Je surveille chaque plateforme d'appels d'offres qui dessert vos territoires, je lis les documents et je qualifie l'ajustement selon votre métier. Vous recevez une courte liste d'opportunités qui valent la peine, avec un résumé en langage clair et un lien vers la source. Je ne rédige pas et ne déposes pas vos soumissions.",
      },
      {
        q: "En quoi est-ce différent d'un abonnement aux alertes?",
        a: "Une alerte est automatisée et se déclenche sur des mots-clés. Elle vous dit que quelque chose existe et s'arrête là. Moi, je suis une personne qui lit les documents et vous dit si cela vaut votre temps, la partie que le logiciel ne peut pas faire.",
      },
      {
        q: "Êtes-vous un consultant en approvisionnement?",
        a: "Pas au sens habituel. Je ne suis pas là pour conseiller sur la stratégie d'approvisionnement, rédiger des propositions ou vous apprendre à utiliser une plateforme. Je fais une chose et je la fais bien: trouver, lire et qualifier les opportunités gouvernementales pour que votre équipe ne consacre du temps qu'aux soumissions qui valent la peine d'être gagnées.",
      },
      {
        q: "Travaillez-vous avec mon rédacteur de soumissions existant?",
        a: "Avec plaisir. Je me place en amont. Je livre une liste qualifiée; il la transforme en réponses gagnantes. La plupart des clients constatent que leurs rédacteurs deviennent beaucoup plus productifs lorsqu'ils ne travaillent que des soumissions déjà qualifiées.",
      },
    ],
  },
  {
    title: "Plateformes et couverture",
    faqs: [
      {
        q: "Quelles plateformes surveillez-vous?",
        a: "Celles que vos acheteurs utilisent réellement: MERX, CanadaBuys, Biddingo, bids&tenders, SEAO, BC Bid et chaque portail provincial et territorial, plus les plateformes américaines quand vous soumissionnez au sud de la frontière. La couverture suit vos territoires, pas une liste figée.",
      },
      {
        q: "Et si mes acheteurs utilisent un portail que vous n'avez pas mentionné?",
        a: "Alors je l'ajoute. Les plateformes nommées sont les plus courantes, mais la couverture suit vos acheteurs. Si un organisme auquel vous vendez publie à un endroit précis, cela devient une partie de ce que je surveille.",
      },
      {
        q: "Couvrez-vous le Canada et les États-Unis?",
        a: "Oui. Je travaille dans toutes les provinces et territoires du Canada et dans les 50 États américains, plus l'approvisionnement fédéral des deux pays. La couverture est bâtie autour de votre territoire réel, des deux côtés de la frontière.",
      },
    ],
  },
  {
    title: "Recevoir les opportunités",
    faqs: [
      {
        q: "À quelle vitesse vais-je voir des opportunités?",
        a: "Rapidement. Lors d'un appel de découverte, j'aurai déjà regardé vos territoires, vous verrez donc de vrais exemples avant même de payer. Une fois lancés, vous recevez les opportunités à un rythme régulier, au fil de leur publication et de leur clôture.",
      },
      {
        q: "Comment les opportunités me parviennent-elles?",
        a: "Comme il convient à votre équipe: un fil continu, un sommaire régulier, ou les deux. Chaque opportunité arrive sous forme de court résumé avec un lien direct vers la source. On fixe le rythme lors de l'appel de découverte.",
      },
      {
        q: "Et si mon métier est de niche?",
        a: "La niche, c'est là que cela rapporte le plus. Plus votre créneau est étroit, plus votre travail se cache sous des titres génériques et dans de plus gros lots, et plus une alerte par mot-clé le manque. J'apprends comment les acheteurs décrivent réellement votre métier, puis je le surveille partout.",
      },
    ],
  },
  {
    title: "Prix et paiement",
    faqs: [
      {
        q: "Comment se passe le paiement?",
        a: "Un seul paiement couvre une année complète de couverture, ce n'est pas un forfait mensuel. Pas par opportunité, pas par portail, pas à l'heure. Vous choisissez la couverture géographique dont vous avez besoin et je couvre tout ce qui s'y trouve pour l'année. Le prix est ajusté à votre territoire et je l'établis lors d'un appel de découverte.",
      },
      {
        q: "Qu'est-ce qui n'est pas inclus?",
        a: "Je ne rédige pas vos soumissions, je n'établis pas vos prix et je ne déposes pas vos offres. C'est votre force et je ne m'en mêle pas. Je trouve, je lis et je qualifie les opportunités pour que votre équipe consacre ses heures aux soumissions qui valent la peine d'être gagnées.",
      },
      {
        q: "Y a-t-il un essai gratuit?",
        a: "Plutôt qu'un essai, je vous montre le travail d'avance. Lors d'un appel de découverte, vous voyez de vraies opportunités dans vos territoires, et vous pouvez demander un exemple d'opportunité en tout temps. Vous jugez la qualité avant d'engager le moindre dollar.",
      },
    ],
  },
];

export const metadata: Metadata = {
  ...pageMeta({
    title: "Foire aux questions",
    description:
      "Des réponses sur le fonctionnement du renseignement sur les opportunités gouvernementales, les plateformes que je surveille, le prix et la couverture, et comment les opportunités qualifiées vous parviennent.",
    path: "/fr/faq",
    keywords: ["foire aux questions appels d'offres", "questions renseignement opportunités"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/faq",
    languages: { en: SITE.domain + "/faq", "fr-CA": SITE.domain + "/fr/faq" },
  },
};

export default function FaqFrPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Accueil", path: "/fr" }, { name: "FAQ", path: "/fr/faq" }]),
          faqJsonLd(all.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "FAQ" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">Des réponses claires</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Ce que les entrepreneurs me demandent avant de commencer. Si la vôtre n'y est pas,
              demandez-la. Je lis et réponds à chaque message moi-même.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <SectionHead title={g.title} />
                <div className="mt-6"><FaqAccordion faqs={g.faqs} /></div>
              </div>
            ))}
          </div>
          <aside className="lg:pt-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-bg-subtle p-6">
                <h3 className="text-lg font-semibold text-fg">Une autre question?</h3>
                <p className="mt-2 text-sm text-fg-muted">Demandez-moi directement. Je réponds personnellement, habituellement le jour ouvrable même.</p>
                <Link href={SITE.bookingUrl} className="btn-primary mt-4 w-full py-2.5 text-sm">Réserver un appel de découverte</Link>
                <Link href="/fr/contact" className="btn-ghost mt-2 w-full py-2.5 text-sm">Envoyer un message</Link>
              </div>
              <LeadForm variant="guide" lang="fr" />
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

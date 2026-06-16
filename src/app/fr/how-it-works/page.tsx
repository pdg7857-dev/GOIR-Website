import type { Metadata } from "next";
import Link from "next/link";
import { Search, FileSearch, Filter, Send, ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs, CtaBand, Section, SectionHead } from "@/components/site/ui";
import { LeadForm } from "@/components/site/lead-form";
import { FaqAccordion } from "@/components/site/faq";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/site/seo";

const STEPS = [
  {
    icon: Search,
    n: "01",
    t: "Je surveille",
    lead: "En continu, sur chaque plateforme qui dessert vos territoires.",
    points: [
      "Je couvre les agrégateurs nationaux, les systèmes gouvernementaux officiels et le portail propre à presque chaque organisme auquel vous vendez.",
      "La couverture suit votre territoire, pas une liste figée, pour que rien ne dépende de votre mémoire de vous connecter.",
      "Je surveille la façon dont les acheteurs classent et intitulent le travail, pas seulement les mots-clés, pour que les ajustements mal étiquetés soient quand même captés.",
    ],
  },
  {
    icon: FileSearch,
    n: "02",
    t: "J'examine",
    lead: "J'ouvre les documents et je les lis vraiment.",
    points: [
      "Portée, exigences, critères d'évaluation, les éléments qui décident si vous pouvez gagner.",
      "Visites de chantier obligatoires, étapes d'inscription, cautionnement et assurance, les détails enfouis à la page 14.",
      "Addenda et modifications qui changent discrètement la portée ou repoussent la date de clôture après le premier avis.",
    ],
  },
  {
    icon: Filter,
    n: "03",
    t: "Je qualifie",
    lead: "Je juge l'ajustement selon votre entreprise, et j'écarte ce qui ne vous convenait jamais.",
    points: [
      "Vos métiers, votre capacité, votre géographie, votre appétit pour le travail.",
      "Une lecture claire de la raison pour laquelle quelque chose convient, ou non, pour que vous ne deviniez pas.",
      "Le bruit disparaît avant que quoi que ce soit n'atteigne votre équipe. Pas de déluge, juste une courte liste.",
    ],
  },
  {
    icon: Send,
    n: "04",
    t: "Vous décidez et soumissionnez",
    lead: "Vous recevez un résumé en langage clair et un lien direct vers l'appel d'offres source.",
    points: [
      "Un court résumé que vous parcourez en moins d'une minute et transmettez à votre estimateur.",
      "Un lien direct vers l'opportunité sur la plateforme d'origine, pour agir sur la source fiable.",
      "Votre équipe chiffre et dépose. La partie où vous excellez est celle que vous gardez.",
    ],
  },
];

const FAQS = [
  {
    q: "Qu'est-ce que je fais moi-même?",
    a: "Tout ce qui gagne le contrat: le prix, la proposition, les relations, le dépôt. Je m'occupe du haut de l'entonnoir, trouver et qualifier le travail, pour que les heures de votre équipe aillent aux soumissions que vous pouvez réellement gagner.",
  },
  {
    q: "Comment les opportunités me parviennent-elles?",
    a: "Comme il convient à votre équipe: un fil continu, un sommaire régulier, ou les deux. Chaque opportunité arrive sous forme de court résumé avec un lien direct vers la source. On fixe le rythme lors de l'appel de découverte.",
  },
  {
    q: "En quoi est-ce différent d'un abonnement aux alertes?",
    a: "Une alerte est automatisée et se déclenche sur des mots-clés. Elle vous dit que quelque chose existe et s'arrête là. Moi, je suis une personne qui lit les documents et vous dit si cela vaut votre temps, la partie que le logiciel ne peut pas faire.",
  },
  {
    q: "À quelle vitesse comprenez-vous mon entreprise?",
    a: "Rapidement. Une courte intégration couvre vos métiers, la taille de projet idéale pour vous, votre géographie et le travail que vous voulez davantage. À partir de là, j'ajuste ce que je vous envoie au fil du temps.",
  },
];

export const metadata: Metadata = {
  ...pageMeta({
    title: "Comment ça fonctionne: du bruit des portails aux opportunités qualifiées",
    description:
      "Je surveille chaque plateforme, je lis les documents et je qualifie l'ajustement. Vous recevez une courte liste d'opportunités gouvernementales qualifiées avec des liens directs. Voici le processus complet.",
    path: "/fr/how-it-works",
    keywords: ["comment fonctionne la surveillance des appels d'offres", "qualification des opportunités"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/how-it-works",
    languages: { en: SITE.domain + "/how-it-works", "fr-CA": SITE.domain + "/fr/how-it-works" },
  },
};

export default function HowItWorksFrPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Accueil", path: "/fr" }, { name: "Comment ça fonctionne", path: "/fr/how-it-works" }]),
          serviceJsonLd("Renseignement sur les opportunités gouvernementales", "Surveillance, examen, qualification et livraison des opportunités de contrats gouvernementaux.", "/fr/how-it-works"),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "Comment ça fonctionne" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Comment ça fonctionne</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Quatre étapes. Je fais les trois premières.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              La soumission n'échoue pas à la rédaction. Elle échoue à la recherche, bien avant que
              quiconque n'écrive un mot. Alors je prends toute la première moitié en charge: la
              surveillance, la lecture, la qualification. Vous gardez la partie qui gagne le contrat.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">Réserver un appel de découverte</Link>
              <Link href="/fr/free-opportunities" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">Obtenez des opportunités gratuites</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <Section>
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="grid items-start gap-6 rounded-2xl border border-border bg-bg-panel p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-bg-panel text-fg">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-accent">{s.n}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-fg">{s.t}</h2>
                <p className="mt-1 text-lg text-accent">{s.lead}</p>
                <ul className="mt-4 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-fg-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                {i === 3 && (
                  <Link href={SITE.sampleUrl} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Voir une vraie opportunité qualifiée <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Répartition des tâches */}
      <Section muted>
        <SectionHead center eyebrow="Qui fait quoi" title="Une répartition claire des tâches" lede="Vous ne cédez pas le contrôle. Vous cédez la recherche." />
        <div className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-bg-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Je m'occupe de</p>
            <ul className="mt-4 space-y-2 text-fg-muted">
              {["Surveiller chaque plateforme", "Découverte et tri", "Lire les documents", "Qualification de l'ajustement", "Résumés en langage clair"].map((t) => (
                <li key={t} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="bg-bg-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-fg">Vous vous occupez de</p>
            <ul className="mt-4 space-y-2 text-fg-muted">
              {["La décision de soumissionner ou non", "Le prix et l'estimation", "La rédaction de la proposition", "Le dépôt", "Gagner le contrat"].map((t) => (
                <li key={t} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bg-panel" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Intégration + formulaire */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><Clock className="h-3.5 w-3.5" /> Pour commencer</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">De l'appel aux opportunités qualifiées, vite</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Lors de l'appel de découverte, j'aurai déjà regardé vos territoires, vous voyez donc de
              vraies opportunités actuelles avant de décider quoi que ce soit. On convient de la
              couverture et du rythme, j'apprends votre créneau, et le travail qualifié se met à couler.
            </p>
          </div>
          <LeadForm variant="call" lang="fr" />
        </div>
      </Section>

      {/* FAQ */}
      <Section muted>
        <SectionHead title="Comment ça fonctionne, en détail" />
        <div className="mt-8 max-w-3xl"><FaqAccordion faqs={FAQS} /></div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

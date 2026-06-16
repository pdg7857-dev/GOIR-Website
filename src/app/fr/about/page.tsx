import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Search, FileText, Filter, Bell, Building2, ArrowRight } from "lucide-react";
import { FEATURED_PLATFORMS, PLATFORMS } from "@/lib/site/platforms";
import { PRIMARY_INDUSTRIES } from "@/lib/site/industries";
import { Breadcrumbs, CtaBand, Section, SectionHead, FeatureCard, StatStrip, Pill } from "@/components/site/ui";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/site/seo";

// Portal names stay in English; French descriptions for the featured set.
const PLATFORM_FR: Record<string, string> = {
  merx: "L'agrégateur d'appels d'offres le plus connu au Canada: fédéral, provincial, MASH et privé au même endroit.",
  canadabuys: "Le service d'appels d'offres officiel du gouvernement du Canada, qui a remplacé Achatsetventes.",
  biddingo: "Utilisé par de nombreuses municipalités, commissions scolaires et organismes publics partout au Canada.",
  "bidnet-direct": "Réseau de groupes d'achats régionaux utilisé par des centaines d'agences d'État et locales aux États-Unis.",
};

const INDUSTRY_FR: Record<string, { name: string; oneLiner: string }> = {
  construction: { name: "Construction", oneLiner: "Entrepreneurs généraux et spécialisés qui soumissionnent sur des projets publics." },
  janitorial: { name: "Conciergerie", oneLiner: "Services d'entretien ménager pour écoles, bureaux et installations publiques." },
  "facilities-maintenance": { name: "Entretien des installations", oneLiner: "Entretien, CVC, électricité et plomberie pour le secteur public." },
  "industrial-supplies": { name: "Fournitures industrielles", oneLiner: "Distributeurs et fournisseurs soumissionnant des contrats de produits, d'équipement et de consommables." },
  mro: { name: "Fournitures MRO", oneLiner: "Fournisseurs d'entretien, de réparation et d'exploitation soumissionnant du travail récurrent." },
};

export const metadata: Metadata = {
  ...pageMeta({
    title: "À propos de Phil Dave",
    description:
      "Je suis Phil Dave. Je trouve, je lis et je qualifie les opportunités de contrats gouvernementaux au Canada et aux États-Unis pour que vous soumissionniez le travail qui vaut la peine, au lieu de fouiller des portails toute la journée.",
    path: "/fr/about",
    keywords: ["renseignement sur les opportunités gouvernementales", "expert en découverte d'appels d'offres"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/about",
    languages: { en: SITE.domain + "/about", "fr-CA": SITE.domain + "/fr/about" },
  },
};

export default function AboutFrPage() {
  const others = PLATFORMS.filter((p) => p.priority !== 1);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/fr" },
            { name: "À propos", path: "/fr/about" },
          ]),
          organizationJsonLd(),
        ]}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "À propos" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">À propos</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Je trouve le travail public qui vaut la peine. Vous allez le gagner.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Je suis Phil Dave. Je travaille dans l'approvisionnement gouvernemental depuis {SITE.sectorSince}, et
              je passe mes journées à l'intérieur des plateformes où les gouvernements publient leur
              travail, à apprendre comment chacune se comporte vraiment. Je les surveille, je lis les
              documents et je qualifie l'ajustement, pour que les opportunités qui arrivent sur votre
              bureau soient celles qui valent réellement le temps de votre estimateur.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={SITE.bookingUrl} className="btn-gold px-5 py-3">
                Réserver un appel de découverte
              </Link>
              <Link href="/fr/free-opportunities" className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg">
                Obtenez des opportunités gratuites
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qui je suis */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Qui je suis</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">
              Un service de renseignement sur les opportunités, mené par une personne qui le connaît à fond
            </h2>
            <div className="prose-site mt-5 max-w-none">
              <p>
                Le travail public n'a pas une seule porte d'entrée. Le même acheteur peut publier sur
                un agrégateur national une semaine et sur un petit portail municipal la suivante, sous
                un titre qui ne ressemble en rien au métier que vous faites. La plupart des
                entrepreneurs gèrent cela en assignant quelqu'un à vérifier une poignée de sites en
                boucle, en espérant que rien ne passe. Beaucoup passe.
              </p>
              <p>
                C'est le problème autour duquel j'ai bâti mon service. Je ne suis pas un rédacteur de
                soumissions, un atelier de propositions, ni un consultant en approvisionnement qui
                assiste à vos réunions de stratégie. Je fais une chose, et je la fais mieux qu'un
                généraliste ne le pourrait jamais: je découvre les opportunités qui vous conviennent,
                je lis les documents pour que vous n'ayez pas à le faire, et je vous dis lesquelles
                valent la peine d'être poursuivies. Vous préparez et déposez la soumission. Cette
                ligne reste nette, volontairement.
              </p>
              <p>
                Avant de devenir indépendant, j'ai passé des années dans la vente et la gestion de
                comptes en approvisionnement gouvernemental, à travailler directement avec des
                entreprises canadiennes et américaines pour les installer et gagner du travail public.
                C'est l'expérience que j'apporte à votre compte aujourd'hui.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FeatureCard icon={Search} title="Je découvre">
              Sur chaque plateforme que vos acheteurs utilisent, y compris les portails d'organismes
              obscurs qu'une alerte par mot-clé n'atteint jamais.
            </FeatureCard>
            <FeatureCard icon={FileText} title="Je lis">
              L'appel d'offres complet, les addenda, les dates de visite enfouies et les petits
              caractères qui décident si vous pouvez même soumissionner.
            </FeatureCard>
            <FeatureCard icon={Filter} title="Je qualifie">
              Selon votre métier, votre géographie et votre capacité, pour que vous ne voyiez que des
              opportunités qui conviennent vraiment à votre entreprise.
            </FeatureCard>
            <FeatureCard icon={Bell} title="J'avertis">
              Avant la fermeture de la fenêtre, avec le contexte nécessaire pour décider vite, oui ou non.
            </FeatureCard>
          </div>
        </div>
      </Section>

      {/* Chiffres */}
      <Section muted>
        <SectionHead
          center
          eyebrow="Le travail, en chiffres"
          title="Ce que ce service couvre"
          lede="Ces chiffres sont tenus à jour à mesure que le service grandit. Ils sont gardés honnêtes plutôt que gonflés."
        />
        <div className="mt-10">
          <StatStrip lang="fr" />
        </div>
      </Section>

      {/* Philosophie */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">La philosophie</p>
          <h2 className="mt-3 text-3xl font-semibold text-fg sm:text-4xl">
            Les plateformes montrent tout. Moi, je montre ce qui compte.
          </h2>
          <div className="prose-site mt-6 max-w-none">
            <p>
              Un portail d'approvisionnement est conçu pour être complet, pas utile. Il vous montrera
              volontiers chaque avis du système, ce qui veut dire qu'il vous montre des milliers
              d'opportunités qui n'ont rien à voir avec votre entreprise. L'exhaustivité n'est pas la
              clarté. Ce déluge de résultats est exactement pourquoi de bonnes soumissions sont
              manquées: celle qui vous convient est à la page neuf, sous un titre que vous ne
              chercheriez jamais.
            </p>
            <p>
              Mon travail est l'inverse de celui de la plateforme. Je n'essaie pas de tout vous
              montrer. J'essaie de vous montrer la poignée de choses qui méritent une décision. C'est
              toute la discipline: transformer le bruit en une courte liste qualifiée sur laquelle
              vous pouvez agir le jour même.
            </p>
            <p>
              <strong>
                Si vous fouillez encore les portails à la main, vous faites un travail que j'ai déjà
                maîtrisé.
              </strong>{" "}
              Pas un travail que vous devriez continuer à payer une personne pour répéter. Les heures
              que votre équipe passe à rafraîchir des pages de recherche sont des heures qu'elle ne
              passe pas sur les soumissions qui valent la peine.
            </p>
          </div>
        </div>
      </Section>

      {/* Comment je travaille */}
      <Section muted>
        <SectionHead
          eyebrow="Comment je travaille"
          title="Discrètement, en arrière-plan, avec une vraie personne qui lit"
          lede="Aucun tableau de bord à apprendre, aucun logiciel à ouvrir. Vous me dites ce que vous visez. Je fais la surveillance et la lecture, et je vous apporte la courte liste."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <div className="text-sm font-semibold text-accent">Étape un</div>
            <h3 className="mt-2 text-lg font-semibold text-fg">Je cartographie votre ajustement</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Lors d'un court appel, vous me dites vos métiers, vos territoires, votre cautionnement
              et votre capacité. Je traduis cela en la façon dont les acheteurs décrivent réellement
              le travail, codes inclus.
            </p>
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold text-accent">Étape deux</div>
            <h3 className="mt-2 text-lg font-semibold text-fg">Je surveille et je lis</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Chaque plateforme qui dessert votre région, chaque jour. Quand quelque chose convient,
              j'ouvre les documents et je vérifie les parties qui décident si une soumission est même
              possible pour vous.
            </p>
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold text-accent">Étape trois</div>
            <h3 className="mt-2 text-lg font-semibold text-fg">Vous recevez la courte liste</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Des opportunités qualifiées, avec le contexte qui compte et du temps au compteur. Vous
              décidez oui ou non. Vous préparez et déposez. Je continue de surveiller.
            </p>
          </div>
        </div>
      </Section>

      {/* Plateformes */}
      <Section>
        <SectionHead
          eyebrow="Ce que je connais à fond"
          title="Les plateformes et écosystèmes où je vis"
          lede="Les principales portent la majeure partie du travail. Le reste, ce sont les portails propres aux organismes et les systèmes de renseignement qu'une alerte par mot-clé manque discrètement."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PLATFORMS.map((p) => (
            <Link key={p.slug} href={`/${p.slug}-expert`} className="card group flex flex-col p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-fg group-hover:text-accent">{p.name}</h3>
                <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-semibold text-warn">
                  Pilier
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-6 text-fg-muted">{PLATFORM_FR[p.slug] ?? p.oneLiner}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Guide {p.shortName}{" "}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium text-fg-muted">Plus le reste de l'écosystème:</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {others.map((p) => (
              <Pill key={p.slug}>{p.name}</Pill>
            ))}
          </div>
          <Link href="/platforms" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent">
            Voyez comment je les lis toutes{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Qui j'aide */}
      <Section muted>
        <SectionHead
          eyebrow="Qui j'aide"
          title="Des entrepreneurs forts au travail, pas à la surveillance"
          lede="Si votre entreprise gagne lorsqu'elle se trouve devant la bonne opportunité à temps, vous êtes celui pour qui je travaille. Les métiers ci-dessous sont ceux où je passe le plus de temps."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_INDUSTRIES.map((ind) => {
            const fr = INDUSTRY_FR[ind.slug];
            return (
              <Link key={ind.slug} href={`/${ind.slug}-government-contracts`} className="card group flex items-start gap-3 p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg group-hover:text-accent">{fr?.name ?? ind.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-fg-muted">{fr?.oneLiner ?? ind.oneLiner}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-fg-muted">
          Pas sur cette liste? Je couvre plus de métiers que je ne peux en afficher ici.{" "}
          <Link href="/industries" className="font-medium text-accent hover:text-accent">
            Voir tous les secteurs que je sers
          </Link>
          .
        </p>
      </Section>

      {/* Pourquoi je fais ça */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-accent">
            <Eye className="h-5 w-5" />
            <p className="eyebrow">Pourquoi je fais ça</p>
          </div>
          <div className="prose-site mt-5 max-w-none">
            <p>
              Je me suis lancé dans ce métier parce que je voyais sans cesse des entreprises capables
              perdre du travail dont elles ignoraient l'existence. Pas parce que leur soumission était
              faible, mais parce qu'elles n'ont jamais vu l'avis à temps, ou qu'il était classé sous
              un titre qu'elles n'auraient jamais cherché. C'est une façon discrète et coûteuse de
              perdre, et elle est tout à fait évitable.
            </p>
            <p>
              Alors j'ai fait de la surveillance mon métier. Quand vous travaillez avec moi, vous avez
              une personne qui connaît votre métier, connaît les plateformes et lit chaque mot, pas un
              outil qui vous enterre sous les alertes. Je lis chaque message qui entre et j'y réponds
              moi-même. C'est ainsi que j'aime travailler, et je pense que c'est pour ça que ça marche.
            </p>
            <p>
              Si vous en avez assez de rafraîchir des portails en vous demandant ce qui vous échappe,
              laissez-moi vous le montrer. J'apporterai de vraies opportunités dans vos territoires à
              notre premier appel, avant que vous ne m'ayez versé un sou.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={SITE.bookingUrl} className="btn-primary px-5 py-3">
              Réserver un appel de découverte
            </Link>
            <Link href="/fr/how-it-works" className="btn-ghost px-5 py-3">
              Voir comment ça fonctionne
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

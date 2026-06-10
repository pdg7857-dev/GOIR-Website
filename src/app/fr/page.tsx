import type { Metadata } from "next";
import Link from "next/link";
import {
  Search, FileSearch, Filter, Send, Bell, Layers, Clock,
  Building2, ArrowRight, CheckCircle2, BadgeCheck,
} from "lucide-react";
import { Section, SectionHead, StatStrip, CtaBand, FeatureCard, CredentialBadge } from "@/components/site/ui";
import { CostCalculator } from "@/components/site/cost-calculator";
import { VideoEmbed } from "@/components/site/video-embed";
import { FaqAccordion } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { FEATURED_PLATFORMS, PLATFORMS } from "@/lib/site/platforms";
import { PRIMARY_INDUSTRIES } from "@/lib/site/industries";
import { platformPath, industryPath } from "@/lib/site/links";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, faqJsonLd } from "@/lib/site/seo";

const base = pageMeta({
  title: "Renseignement sur les opportunités gouvernementales",
  description:
    "Je surveille chaque plateforme d'appels d'offres qui compte, je lis les documents et je qualifie l'ajustement, pour que vos estimateurs ne travaillent que les opportunités qui valent la peine. Au Canada et aux États-Unis.",
  path: "/fr",
  keywords: ["appels d'offres gouvernementaux", "opportunités de contrats publics", "MERX", "SEAO", "CanadaBuys"],
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: SITE.domain + "/fr",
    languages: { en: SITE.domain + "/", "fr-CA": SITE.domain + "/fr" },
  },
};

// Portal names stay in English. French descriptions for the featured set.
const PLATFORM_FR: Record<string, { category: string; oneLiner: string }> = {
  merx: { category: "Agrégateur canadien", oneLiner: "L'agrégateur d'appels d'offres le plus connu au Canada: fédéral, provincial, MASH et privé au même endroit." },
  canadabuys: { category: "Gouvernement du Canada", oneLiner: "Le service d'appels d'offres officiel du gouvernement du Canada, qui a remplacé Achatsetventes." },
  biddingo: { category: "Agrégateur canadien", oneLiner: "Utilisé par de nombreuses municipalités, commissions scolaires et organismes publics partout au Canada." },
  "bidnet-direct": { category: "Agrégateur américain", oneLiner: "Réseau de groupes d'achats régionaux utilisé par des centaines d'agences d'État et locales aux États-Unis." },
};

const INDUSTRY_FR: Record<string, { name: string; oneLiner: string }> = {
  construction: { name: "Construction", oneLiner: "Entrepreneurs généraux et spécialisés qui soumissionnent sur des projets publics." },
  janitorial: { name: "Conciergerie", oneLiner: "Services d'entretien ménager pour écoles, bureaux et installations publiques." },
  "facilities-maintenance": { name: "Entretien des installations", oneLiner: "Entretien, CVC, électricité et plomberie pour le secteur public." },
  "industrial-supplies": { name: "Fournitures industrielles", oneLiner: "Distributeurs et fournisseurs soumissionnant des contrats de produits, d'équipement et de consommables." },
  mro: { name: "Fournitures MRO", oneLiner: "Fournisseurs d'entretien, de réparation et d'exploitation soumissionnant du travail récurrent." },
};

const BACKGROUND_FR = [
  "Plus de 17 500 comptes d'entrepreneurs gérés au Canada et aux États-Unis",
  "Un portefeuille de grandes plateformes d'approvisionnement, apprises de l'intérieur",
  "Plus de 18 plateformes surveillées pour mes clients aujourd'hui",
];

const FAQS = [
  {
    q: "Quelles plateformes surveillez-vous?",
    a: "Celles que vos acheteurs utilisent réellement: MERX, CanadaBuys, Biddingo, bids&tenders, SEAO, BC Bid et chaque portail provincial et territorial, plus les plateformes américaines quand vous soumissionnez au sud de la frontière. La couverture suit vos territoires, pas une liste figée.",
  },
  {
    q: "Comment se passe le paiement?",
    a: "Un seul paiement couvre une année complète de couverture, ce n'est pas un forfait mensuel. Une année, c'est ce qu'il faut pour capter tout votre cycle d'opportunités: contrats annuels, renouvellements et soumissions saisonnières qui ne reviennent qu'une fois. Je vous explique le tout lors de l'appel.",
  },
  {
    q: "Qu'est-ce qui n'est pas inclus?",
    a: "Je ne rédige pas vos soumissions et je ne les déposes pas. C'est votre force et je ne m'en mêle pas. Je trouve, je lis et je qualifie les opportunités pour que votre équipe consacre ses heures aux soumissions qui valent la peine d'être gagnées.",
  },
  {
    q: "À quelle vitesse vais-je voir des opportunités?",
    a: "Rapidement. Lors d'un appel de découverte, j'aurai déjà regardé vos territoires, vous verrez donc de vrais exemples avant même de payer. Une fois lancés, vous recevez les opportunités à un rythme régulier, au fil de leur publication et de leur clôture.",
  },
  {
    q: "Et si mon métier est de niche?",
    a: "La niche, c'est là que cela rapporte le plus. Plus votre créneau est étroit, plus votre travail se cache sous des titres génériques et dans de plus gros lots, et plus une alerte par mot-clé le manque. J'apprends comment les acheteurs décrivent réellement votre métier, puis je le surveille partout.",
  },
  {
    q: "Est-ce vraiment gratuit d'essayer?",
    a: "Oui. Demandez vos opportunités gratuites: dites-moi votre métier et où vous soumissionnez, et je vous enverrai une courte liste de vraies opportunités, sans frais et sans engagement.",
  },
];

export default function HomeFrPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />

      {/* Héro */}
      <section className="relative overflow-hidden border-b border-border bg-bg">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="container relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-accent">
              Renseignement sur les opportunités gouvernementales
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] text-fg sm:text-5xl lg:text-[3.4rem]">
              Concentrez-vous sur les contrats à gagner.
              <span className="block text-accent">Moi, je les trouve.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-fg-muted">
              Je suis Phil Dave. Je surveille chaque plateforme d'appels d'offres qui compte, je lis
              les documents et je qualifie l'ajustement, pour que vos estimateurs cessent de se noyer
              dans les portails et ne travaillent que les opportunités qui valent la peine.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/fr/free-opportunities" className="btn-gold px-6 py-3.5 text-base">
                Obtenez des opportunités gratuites <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={SITE.bookingUrl}
                className="btn-ghost border-white/20 bg-white/5 px-6 py-3.5 text-base text-fg hover:border-white/40 hover:text-fg"
              >
                Réserver un rendez-vous
              </Link>
            </div>
            <p className="mt-5 text-sm text-fg-subtle">
              Gratuit, sans engagement. Dites-moi votre métier et où vous soumissionnez, et je vous
              enverrai de vraies opportunités que vous n'avez pas trouvées.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-warn/30 bg-warn-soft/30 px-4 py-2">
              <CredentialBadge lg />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Ce qui arrive dans votre boîte de réception
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { t: "Services de conciergerie, 3 écoles", s: "MERX, clôture dans 18 jours", fit: "Bon ajustement" },
                  { t: "Réfection de toiture, bâtiment municipal", s: "Biddingo, visite obligatoire mardi", fit: "À regarder" },
                  { t: "Mise à niveau de contrôles CVC", s: "BC Bid, classé sous « rénovation énergétique »", fit: "Bon ajustement" },
                ].map((c) => (
                  <div key={c.t} className="rounded-xl border border-white/10 bg-ink-800/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-fg">{c.t}</p>
                        <p className="mt-0.5 text-xs text-fg-subtle">{c.s}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        {c.fit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-fg-muted">
                Examiné, qualifié, lié. Illustration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vidéo */}
      {SITE.youtubeId && (
        <Section muted>
          <SectionHead center eyebrow="En 2 minutes" title="Comment je trouve le travail qui vaut la peine d'être gagné" />
          <div className="mt-8">
            <VideoEmbed id={SITE.youtubeId} />
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="/fr/free-opportunities" className="btn-gold px-6 py-3.5 text-base">
              Obtenez des opportunités gratuites <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* Plateformes */}
      <section className="border-b border-border bg-bg-subtle">
        <div className="container py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-fg-muted">
            Chaque portail canadien, plus les plateformes américaines lorsque vous soumissionnez au sud
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-fg-muted">
            {["MERX", "CanadaBuys", "Biddingo", "bids&tenders", "BC Bid", "SEAO", "Bonfire", "BidNet Direct", "SAM.gov"].map(
              (n) => (
                <span key={n} className="opacity-80">{n}</span>
              ),
            )}
          </div>
          <p className="mt-4 text-center text-xs text-fg-subtle">
            Plus chaque portail provincial et territorial: Alberta Purchasing Connection, SaskTenders, Ontario Tenders Portal, New Brunswick Opportunities Network et les autres.
          </p>
        </div>
      </section>

      {/* Le problème */}
      <Section muted>
        <SectionHead
          eyebrow="Le problème"
          title="La soumission n'échoue pas à la rédaction. Elle échoue à la recherche."
          lede="Le temps que la plupart des entrepreneurs s'assoient pour rédiger, ils ont déjà perdu des heures sur la partie pour laquelle personne ne les a formés: trouver le bon travail."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Layers} title="Trop de portails">
            MERX, CanadaBuys, SEAO, un portail différent pour presque chaque municipalité. Chacun a
            sa propre connexion, sa propre recherche, ses propres réglages d'avis.
          </FeatureCard>
          <FeatureCard icon={Bell} title="Trop d'avis">
            Les alertes par mot-clé se déclenchent sur tout et ne qualifient rien. Votre boîte se
            remplit de travail hors de votre créneau, et la seule soumission qui comptait passe inaperçue.
          </FeatureCard>
          <FeatureCard icon={Filter} title="Trop de mauvais ajustements">
            Les estimateurs passent leurs meilleures heures à lire des documents pour des opportunités
            que vous n'alliez jamais gagner, au lieu de la poignée que vous devriez réellement viser.
          </FeatureCard>
          <FeatureCard icon={Clock} title="Pas assez de temps">
            Personne n'a le temps d'ouvrir chaque PDF, de trouver la visite obligatoire à la page 14,
            et de juger l'ajustement avant la date de clôture.
          </FeatureCard>
        </div>
      </Section>

      {/* La différence */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="La différence"
              title="Les plateformes vous montrent tout. Moi, je vous montre ce qui compte."
              lede="Le renseignement sur les opportunités gouvernementales est un autre métier que d'exploiter un portail. Les plateformes vous donnent des données. Moi, je vous donne une décision."
            />
            <Link href="/government-opportunity-intelligence" className="btn-ghost mt-6 px-5 py-2.5 text-sm">
              Qu'est-ce que le renseignement sur les opportunités? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            {[
              ["Les plateformes montrent des opportunités.", "J'identifie celles qui valent la peine."],
              ["Les plateformes fournissent des données.", "Je fournis du renseignement."],
              ["Les plateformes envoient des alertes.", "Je qualifie l'ajustement."],
              ["Les plateformes montrent tout.", "Je montre ce qui compte."],
            ].map(([a, b], i) => (
              <div
                key={i}
                className={`grid grid-cols-2 divide-x divide-border ${i % 2 ? "bg-bg-panel" : "bg-bg-subtle"}`}
              >
                <div className="p-4 text-sm text-fg-muted">{a}</div>
                <div className="flex items-center gap-2 p-4 text-sm font-semibold text-fg">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Le coût + calculateur */}
      <Section muted>
        <SectionHead
          center
          eyebrow="Le coût de tout faire soi-même"
          title="La recherche a un prix. Vous le payez déjà."
          lede="Chaque heure qu'un estimateur passe à surveiller des portails, à ouvrir des documents et à trier des alertes est une heure qui ne sert pas à gagner. Voici ce que vaut cette heure."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <CostCalculator lang="fr" />
        </div>
      </Section>

      {/* Comment ça fonctionne */}
      <Section>
        <SectionHead
          center
          eyebrow="Comment ça fonctionne"
          title="Quatre étapes. Je fais les trois premières."
          lede="Vous restez concentré sur le prix et les soumissions. Je m'occupe de tout ce qui précède le moment où une soumission vaut le temps de votre équipe."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, n: "01", t: "Surveiller", d: "Je surveille chaque plateforme qui dessert vos territoires, en continu, pour que rien ne dépende de votre mémoire de vous connecter." },
            { icon: FileSearch, n: "02", t: "Examiner", d: "J'ouvre les documents et je les lis: portée, exigences, critères d'évaluation, rencontres de chantier, addenda, le piège." },
            { icon: Filter, n: "03", t: "Qualifier", d: "Je juge l'ajustement selon vos métiers, votre capacité et votre territoire, et j'écarte les soumissions qui ne vous convenaient jamais." },
            { icon: Send, n: "04", t: "Livrer", d: "Vous recevez un résumé court en langage clair et un lien direct vers l'appel d'offres source. Votre équipe chiffre et dépose." },
          ].map((s) => (
            <div key={s.n} className="card relative p-6">
              <span className="text-xs font-bold text-accent">{s.n}</span>
              <div className="mt-3 grid h-11 w-11 place-items-center rounded-xl bg-bg-panel text-fg">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-fg">{s.t}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/how-it-works" className="btn-dark px-6 py-3">
            Voir le processus complet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Expertise des plateformes */}
      <Section dark>
        <SectionHead
          dark
          eyebrow="Expertise des plateformes"
          title="Je sais où vivent les opportunités et comment elles se cachent."
          lede="Chaque plateforme catégorise, intitule et avise différemment. Connaître ces particularités fait la différence entre voir un ajustement et le manquer."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PLATFORMS.map((p) => {
            const fr = PLATFORM_FR[p.slug];
            return (
              <Link
                key={p.slug}
                href={platformPath(p.slug)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-400/50 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{fr?.category ?? p.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-fg">Spécialiste {p.shortName}</h3>
                <p className="mt-2 text-sm leading-6 text-fg-subtle">{fr?.oneLiner ?? p.oneLiner}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Lire le guide <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/platforms" className="text-sm font-semibold text-accent hover:text-fg">
            Voir les {PLATFORMS.length} plateformes couvertes &rarr;
          </Link>
        </div>
      </Section>

      {/* Secteurs */}
      <Section>
        <SectionHead
          eyebrow="Secteurs"
          title="Bâti autour de la façon dont votre métier est réellement mis en appel d'offres."
          lede="Votre travail se cache sous différents titres et dans de plus gros lots selon le métier. J'apprends comment les acheteurs décrivent le vôtre."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_INDUSTRIES.map((ind) => {
            const fr = INDUSTRY_FR[ind.slug];
            return (
              <Link
                key={ind.slug}
                href={industryPath(ind.slug)}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-bg-panel p-5 transition hover:border-accent hover:shadow-card"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
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
        <div className="mt-8">
          <Link href="/industries" className="text-sm font-semibold text-accent hover:text-accent">
            Voir tous les secteurs que je couvre &rarr;
          </Link>
        </div>
      </Section>

      {/* Chiffres */}
      <Section muted>
        <SectionHead
          center
          eyebrow="En chiffres"
          title="Un marché vaste et bruyant. C'est exactement l'intérêt."
          lede="Les acheteurs publics dépensent des sommes énormes sur des milliers d'opportunités et des dizaines de plateformes. L'échelle est l'occasion, et la raison pour laquelle aucune équipe ne peut tout surveiller seule."
        />
        <div className="mx-auto mt-10 max-w-5xl">
          <StatStrip lang="fr" />
        </div>
      </Section>

      {/* Crédibilité */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-center">D'où vient ce service</p>
          <h2 className="mt-3 text-center text-3xl font-semibold text-fg sm:text-4xl">
            Je viens de l'intérieur des plateformes.
          </h2>
          <div className="prose-site mt-6 max-w-none">
            <p>
              Je ne viens pas de l'extérieur. Pendant trois ans et demi, j'ai travaillé au sein de
              l'industrie de l'approvisionnement électronique, gérant plus de 17 500 comptes
              d'entrepreneurs sur un portefeuille de grandes plateformes au Canada et aux États-Unis.
              Mon travail consistait à faire en sorte que les entrepreneurs tirent une vraie valeur de
              ces plateformes, ce qui veut dire que j'ai vu exactement où ils perdent des soumissions:
              pas à la rédaction, à la recherche. Maintenant, je fais cette partie pour vous, de votre
              côté de la table.
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {BACKGROUND_FR.map((p) => (
              <li key={p} className="card flex items-start gap-2 p-4 text-sm text-fg-muted">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Couverture */}
      <Section>
        <SectionHead
          center
          eyebrow="Couverture"
          title="Structurée comme une couverture, pas par opportunité."
          lede="Pas par portail. Pas à l'heure. Un seul paiement couvre une année complète, ajustée à votre territoire: une province ou un État, plusieurs, ou tout le pays et transfrontalier, y compris le fédéral. Le prix est établi lors d'un court appel."
        />
        <div className="mt-10 flex justify-center">
          <Link href={SITE.bookingUrl} className="btn-gold px-6 py-3.5 text-base">
            Réserver un appel de découverte
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-fg-muted">
          Pas prêt pour un appel? Laissez-moi d'abord vous{" "}
          <Link href="/fr/free-opportunities" className="font-medium text-accent underline">
            envoyer des opportunités gratuites
          </Link>{" "}
          dans votre métier.
        </p>
      </Section>

      {/* FAQ + formulaire */}
      <Section muted>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHead eyebrow="Questions" title="Ce que les entrepreneurs me demandent en premier." />
            <div className="mt-8">
              <FaqAccordion faqs={FAQS} />
            </div>
            <Link href="/faq" className="mt-6 inline-block text-sm font-semibold text-accent">
              Lire toutes les questions &rarr;
            </Link>
          </div>
          <div className="lg:pt-16">
            <LeadForm variant="call" lang="fr" />
          </div>
        </div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

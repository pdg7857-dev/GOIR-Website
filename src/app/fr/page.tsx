import type { Metadata } from "next";
import Link from "next/link";
import { Search, FileSearch, Filter, Send, Layers, Bell, Clock, ArrowRight } from "lucide-react";
import { Section, SectionHead, CtaBand, FeatureCard, CredentialBadge } from "@/components/site/ui";
import { FaqAccordion } from "@/components/site/faq";
import { pageMeta, JsonLd, faqJsonLd } from "@/lib/site/seo";
import { SITE } from "@/lib/site/config";

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

const FAQS = [
  {
    q: "Quelles plateformes surveillez-vous?",
    a: "Celles que vos acheteurs utilisent réellement: MERX, CanadaBuys, Biddingo, bids&tenders, SEAO, BC Bid et chaque portail provincial et territorial, plus les plateformes américaines quand vous soumissionnez au sud de la frontière. La couverture suit vos territoires, pas une liste figée.",
  },
  {
    q: "Comment fonctionne la tarification?",
    a: "Une couverture mensuelle forfaitaire, structurée selon la géographie dont vous avez besoin plutôt que par opportunité. Je l'établis selon votre territoire et je vous donne un prix lors d'un court appel de découverte.",
  },
  {
    q: "Qu'est-ce qui n'est pas inclus?",
    a: "Je ne rédige pas vos soumissions et je ne les déposes pas. C'est votre force et je ne m'en mêle pas. Je trouve, je lis et je qualifie les opportunités pour que votre équipe consacre ses heures aux soumissions qui valent la peine d'être gagnées.",
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
                Réserver un appel
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
            Plus chaque portail provincial et territorial: Alberta Purchasing Connection, SaskTenders, le portail des appels d'offres de l'Ontario, le RAANB et les autres.
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
          <FeatureCard icon={Clock} title="Pas assez de temps">
            Personne n'a le temps d'ouvrir chaque PDF, de trouver la visite obligatoire à la page 14,
            et de juger l'ajustement avant la date de clôture.
          </FeatureCard>
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
      </Section>

      {/* FAQ */}
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

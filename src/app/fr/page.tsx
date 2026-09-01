import type { Metadata } from "next";
import Link from "next/link";
import { IntelScripts, IntelGlobe, CoverageMap } from "@/components/intel/intel-scripts";
import { ScrollReveal, InterceptTicker, ScreeningEngine, CostBand, ChannelLog } from "@/components/intel/console";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { PLATFORM_CARDS, JURISDICTIONS, SECTION_CHIPS } from "@/lib/intel/data";
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

const accent = "var(--color-accent)";
const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const accent22 = "color-mix(in srgb, var(--color-accent) 22%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

const FAQS = [
  { q: "Rédigez-vous ou déposez-vous la soumission?", a: "Non. Je ne rédige pas et je ne dépose rien en votre nom. Je trouve, je lis et je qualifie les opportunités. Le prix et la rédaction restent à votre équipe, là où c'est votre force." },
  { q: "Puis-je l'essayer avant de m'engager pour une année complète?", a: "Oui. Un pilote de soixante jours coûte 2 000 $, une seule fois, et se déroule à pleine portée: même surveillance, même examen des documents, même qualification qu'un terme complet. Si vous continuez, la totalité des 2 000 $ est créditée sur votre couverture annuelle. Sinon, vous gardez chaque opportunité que je vous ai envoyée." },
  { q: "En quoi est-ce différent des alertes que je reçois déjà?", a: "Les alertes se déclenchent sur des mots-clés et ne qualifient rien. Je lis les documents, je juge l'ajustement selon votre métier et votre capacité, et je vous remets une courte liste avec un verdict, pas une boîte pleine à trier." },
  { q: "Et si vous manquez une soumission?", a: "Chaque entente comporte un minimum garanti d'opportunités qualifiées, fixé selon votre métier et votre territoire au départ. Si je ne le livre pas, je continue sans frais jusqu'à ce que ce soit fait." },
  { q: "J'ai déjà quelqu'un à l'interne. Pourquoi vous?", a: "Alors vous savez déjà combien d'heures la recherche gruge. Je retire la surveillance, la lecture et la qualification de son assiette, pour que ces heures servent à chiffrer et à gagner plutôt qu'à vivre dans les portails." },
  { q: "Comment le prix est-il fixé, et quelle est la garantie?", a: "La couverture est ajustée à votre territoire et facturée une fois par année, jamais au mois. Le montant est établi selon votre secteur et le nombre de juridictions, et la couverture nationale est établie sur devis. Chaque entente comporte un minimum garanti d'opportunités qualifiées, que je fixe avec vous au moment d'établir votre couverture, puisque chaque secteur est différent. Vous pouvez commencer par un pilote de soixante jours avant un terme complet." },
];

const VECTORS = [
  { n: "01", t: "Surveillance fragmentée", b: "Une connexion, une recherche et des réglages d'alerte différents pour presque chaque plateforme et municipalité. Personne ne les surveille toutes à la fois." },
  { n: "02", t: "Du bruit, pas du signal", b: "Les alertes par mot-clé se déclenchent sur tout et ne qualifient rien. La seule soumission qui comptait passe inaperçue dans une boîte pleine." },
  { n: "03", t: "Détail enfoui", b: "La visite obligatoire à la page 14. L'addenda qui a déplacé la date de clôture. Le piège que l'on trouve seulement en ouvrant les documents." },
  { n: "04", t: "Des titres que vous ne chercheriez jamais", b: "Le travail qui vous convient le mieux est souvent classé sous un titre auquel vous ne penseriez jamais. Si vous ne surveillez pas la façon dont les acheteurs écrivent, vous ne le voyez jamais." },
];

const PHASES = [
  { n: "01", t: "Surveiller", b: "Je surveille chaque plateforme qui dessert vos territoires, en continu, pour que rien ne dépende de votre mémoire de vous connecter.", lead: true },
  { n: "02", t: "Lire", b: "J'ouvre les documents et je les lis: portée, exigences, critères d'évaluation, rencontres de chantier, addenda, le piège.", lead: true },
  { n: "03", t: "Qualifier", b: "Je juge l'ajustement selon votre métier, votre capacité et votre territoire, et j'écarte les soumissions qui ne vous convenaient pas.", lead: true },
  { n: "04", t: "Vous soumissionnez", b: "Vous recevez un résumé court en langage clair et un lien vers l'appel d'offres source. Votre équipe chiffre et dépose. Cette partie reste la vôtre.", lead: false },
];

const CHANNELS = ["Sommaire quotidien qualifié", "Alertes en temps réel sur les nouveaux affichages", "Tableau de bord partagé", "Appel ou texto quand une soumission ne peut pas attendre"];

const PLATFORM_FR: Record<string, { qualifier: string; body: string }> = {
  MERX: { qualifier: "Agrégateur · CAN", body: "L'agrégateur canadien le plus connu, mais ses catégories induisent en erreur et ses avis manquent le travail classé sous le mauvais titre." },
  CanadaBuys: { qualifier: "Gouvernement · CAN", body: "Le service d'appels d'offres du gouvernement du Canada. La porte d'entrée du fédéral, où le vrai détail vit dans les documents joints, pas dans l'avis." },
  "SAM.gov": { qualifier: "Gouvernement · USA", body: "La porte d'entrée fédérale américaine. Les mises de côté, les codes NAICS et les véhicules IDIQ décident de l'admissibilité bien avant les mots-clés." },
  "BC Bid": { qualifier: "Province · BC", body: "Le travail provincial de la Colombie-Britannique, plus une longue liste de districts régionaux et d'autorités de santé qui affichent là où une recherche enregistrée ne regarde jamais." },
  Biddingo: { qualifier: "Portail SaaS · CAN", body: "Très présent dans le MASH ontarien: municipalités, commissions scolaires et hôpitaux. Le bon travail se cache sous des titres génériques et dans de plus gros lots." },
  "bids&tenders": { qualifier: "Portail SaaS · CAN/USA", body: "Un portail SaaS par acheteur, chacun avec sa connexion et ses réglages d'alerte. Le volume est réel, la catégorisation n'est pas constante." },
  SEAO: { qualifier: "Province · QC", body: "Obligatoire pour les organismes publics du Québec, avec des documents en français partout et des règles qu'une alerte par mot-clé n'a jamais su lire." },
  "BidNet Direct": { qualifier: "Groupes d'achat · USA", body: "Des groupes d'achat régionaux couvrant des centaines d'agences d'État et locales. Les particularités d'inscription et d'avis vous coûtent des soumissions." },
  Bonfire: { qualifier: "Portail SaaS · CAN/USA", body: "Un portail de dépôt autant que de découverte. Des acheteurs y affichent et nulle part ailleurs, donc la seule façon de le voir est de le surveiller." },
};

const TIERS = [
  {
    name: "Palier I · Une seule juridiction", scope: "Une province ou un État", price: "À partir de 6 500 $", featured: false, quote: false,
    features: ["Chaque plateforme desservant une province ou un État", "Documents ouverts, lus et résumés", "Ajustement qualifié selon votre métier et votre capacité", "Liens directs vers l'appel d'offres source"],
    cta: { label: "Discuter de la couverture", href: "/book" },
  },
  {
    name: "Palier II · Régional", scope: "Jusqu'à cinq juridictions plus le fédéral", price: "À partir de 14 500 $", featured: true, quote: false,
    features: ["Jusqu'à cinq provinces ou États, plus le fédéral", "Tout le Palier I, sur toute votre région", "Alertes prioritaires quand une soumission ne peut pas attendre", "Tableau de bord partagé et un sommaire hebdomadaire"],
    cta: { label: "Demander un rapport gratuit", href: "/fr/free-opportunities" },
  },
  {
    name: "Palier III · National et transfrontalier", scope: "Le Canada, les États-Unis, ou les deux", price: "Sur devis", featured: false, quote: true,
    features: ["Couverture nationale, le Canada, les États-Unis, ou les deux", "Fédéral, provincial, État et local, de bout en bout", "Tout le Palier II, à l'échelle nationale", "Une ligne directe avec moi quand une soumission ne peut pas attendre"],
    cta: { label: "Demander un devis", href: "/book" },
  },
];

const KIND_FR: Record<string, string> = { Federal: "Fédéral", Province: "Province", State: "État" };
const CHIP_FR: Record<string, string> = { Threat: "Menace", Doctrine: "Doctrine", Screening: "Tri", Coverage: "Couverture", Operator: "Opérateur", Request: "Demande" };

function Section({ id, index, children }: { id?: string; index?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "0 clamp(16px, 4vw, 28px) 96px" }}>
      <div className="mx-auto max-w-[1360px]">
        {index && <p className="idx" data-reveal style={{ marginBottom: 20 }}>{index}</p>}
        {children}
      </div>
    </section>
  );
}

export default function HomeFrPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden" }}>
      <JsonLd data={faqJsonLd(FAQS)} />
      <IntelScripts />
      <ScrollReveal />
      <div className="nz-gridwash" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Héro */}
        <section style={{ padding: "24px clamp(16px, 4vw, 28px) 36px" }}>
          <div className="mx-auto grid max-w-[1360px] items-center gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", minHeight: "calc(100vh - 96px)" }}>
            <div data-reveal>
              <div className="flex items-center gap-2.5">
                <span className="blip" />
                <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Station active · 18 plateformes · CAN / USA</span>
              </div>
              <h1 className="mt-5" style={{ fontSize: "clamp(34px, 5.2vw, 58px)", lineHeight: 0.99, letterSpacing: "-0.035em", maxWidth: "15ch" }}>
                Du renseignement, pas des alertes.
              </h1>
              <div className="rule mt-5" />
              <p className="mt-6" style={{ maxWidth: "48ch", fontSize: 17, lineHeight: 1.6, color: muted(78) }}>
                Je suis Phil Dave. Je surveille chaque plateforme d'approvisionnement qui compte, je
                lis les documents et je qualifie l'ajustement, pour que vos estimateurs cessent de se
                noyer dans les portails et ne travaillent que les opportunités qui valent la peine.
                Au Canada et aux États-Unis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/fr/free-opportunities" className="btn btn-primary" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>Rapport gratuit</Link>
                <Link href="#pricing" className="btn btn-secondary" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>Couverture et prix</Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 pt-6" style={{ borderTop: `1px solid ${accent22}` }}>
                {[["17 500+", "Comptes gérés"], ["3,5 ans", "Dans l'industrie"], ["18+", "Plateformes surveillées"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="tabular-nums" style={{ fontSize: 24, letterSpacing: "-0.02em", color: "var(--color-accent-200)" }}>{v}</div>
                    <div className="hud mt-1" style={{ fontSize: 9 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal>
              <div className="flex items-center justify-between px-3 py-2" style={{ border: `1px solid color-mix(in srgb, var(--color-accent) 26%, transparent)`, borderRadius: 4 }}>
                <span className="hud" style={{ fontSize: 9 }}>Image de suivi en direct</span>
                <span className="hud" style={{ fontSize: 9 }}>Survolez une piste · cliquez pour ouvrir</span>
              </div>
              <div className="brackets relative mt-3 overflow-hidden" style={{ minHeight: "min(580px, 74vw)", border: `1px solid ${accent20}`, borderRadius: 4 }}>
                <IntelGlobe style={{ position: "absolute", inset: 0 }} />
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: 0.5 }}>
                  <div className="nz-sweep" style={{ position: "absolute", left: 0, right: 0, height: "32%", background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent)", animation: "nz-sweep 7s linear infinite" }} />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SECTION_CHIPS.map((c) => (
                  <a key={c.code} href={c.target} className="inline-flex items-center gap-2 rounded px-3 py-1.5" style={{ border: `1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)`, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: muted(62), textDecoration: "none" }}>
                    <span style={{ color: accent }}>{c.code}</span>
                    <span>{CHIP_FR[c.label] ?? c.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InterceptTicker lang="fr" />

        <div style={{ height: 96 }} />
        {/* 01 Menace */}
        <Section id="service">
          <div className="grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
            <div data-reveal>
              <p className="idx">01 / Évaluation de la menace</p>
              <h2 className="mt-4" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em" }}>Les soumissions ne se perdent pas à la rédaction. Elles se perdent à la recherche.</h2>
              <p className="mt-5" style={{ maxWidth: "46ch", color: muted(76), lineHeight: 1.6 }}>Le temps que la plupart des entrepreneurs s'assoient pour rédiger, ils ont déjà perdu des heures sur la partie pour laquelle personne ne les a formés: trouver le bon travail, sur la bonne plateforme, avant la clôture.</p>
            </div>
            <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
              {VECTORS.map((v) => (
                <div key={v.n} className="panel p-5" data-reveal>
                  <p className="hud" style={{ color: accent }}>Vecteur {v.n}</p>
                  <h3 className="mt-2" style={{ fontSize: 17 }}>{v.t}</h3>
                  <p className="mt-2 text-sm" style={{ color: muted(70), lineHeight: 1.55 }}>{v.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 02 Doctrine */}
        <Section id="process" index="02 / Doctrine">
          <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "20ch" }}>Quatre phases. Je fais les trois premières.</h2>
          <div className="mt-10 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
            {PHASES.map((p) => (
              <div key={p.n} data-reveal className="p-6" style={{ borderRadius: 4, border: p.lead ? undefined : `1px solid ${muted(12)}`, borderTopWidth: p.lead ? 2 : 1, borderTopStyle: "solid", borderTopColor: p.lead ? accent : muted(30), background: p.lead ? "color-mix(in srgb, var(--color-accent) 7%, transparent)" : "transparent" }}>
                <p className="hud" style={{ color: p.lead ? accent : muted(40) }}>Phase {p.n}</p>
                <h3 className="mt-2" style={{ fontSize: 20, color: p.lead ? "var(--color-text)" : muted(60) }}>{p.t}</h3>
                <p className="mt-2 text-sm" style={{ color: muted(p.lead ? 72 : 45), lineHeight: 1.55 }}>{p.b}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4" style={{ border: `1px solid ${accent20}`, borderRadius: 4 }}>
            <span className="hud" style={{ color: accent }}>Canaux de livraison</span>
            {CHANNELS.map((c) => <span key={c} className="text-sm" style={{ color: muted(70) }}>{c}</span>)}
          </div>
        </Section>

        {/* 03 Tri */}
        <Section id="screening" index="03 / Moteur de tri">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "22ch" }}>Regardez une soumission se qualifier selon votre profil.</h2>
            <p data-reveal className="hud" style={{ fontSize: 10, color: muted(50) }}>Démonstration illustrative</p>
          </div>
          <div className="mt-10" data-reveal><ScreeningEngine lang="fr" /></div>
        </Section>
      </div>

      <div style={{ position: "relative", zIndex: 1, marginBottom: 96 }} data-reveal>
        <CostBand lang="fr" />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 05 Couverture */}
        <Section id="coverage" index="05 / Tableau de couverture">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div data-reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em" }}>Là où je surveille déjà.</h2>
              <p className="mt-4" style={{ maxWidth: "50ch", color: muted(76), lineHeight: 1.6 }}>Vingt juridictions au tableau, chaque province canadienne et les plus grands marchés d'États américains, plus le fédéral des deux côtés. La taille du point correspond au nombre de plateformes que j'y surveille.</p>
            </div>
            <div className="hud" data-reveal style={{ textAlign: "right", lineHeight: 2 }}>20 juridictions<br />18 plateformes surveillées<br />Taille = nombre de plateformes</div>
          </div>
          <div className="brackets relative mt-8 overflow-hidden" data-reveal style={{ height: "clamp(380px, 48vw, 560px)", border: `1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)`, borderRadius: 4, background: "color-mix(in srgb, #161826 66%, transparent)" }}>
            <CoverageMap style={{ position: "absolute", inset: 0 }} />
          </div>
          <details data-reveal className="mt-4">
            <summary className="hud" style={{ cursor: "pointer", color: accent }}>Voir la liste des juridictions</summary>
            <div className="mt-4 overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: muted(60) }}>
                    <th style={{ padding: "6px 10px" }} className="hud">Juridiction</th>
                    <th style={{ padding: "6px 10px" }} className="hud">Type</th>
                    <th style={{ padding: "6px 10px" }} className="hud">Plateformes surveillées</th>
                  </tr>
                </thead>
                <tbody>
                  {JURISDICTIONS.map((j) => (
                    <tr key={j.id} style={{ borderTop: `1px solid ${muted(10)}` }}>
                      <td style={{ padding: "6px 10px", color: "var(--color-text)" }}>{j.name}</td>
                      <td style={{ padding: "6px 10px", color: muted(60) }}>{KIND_FR[j.kind] ?? j.kind}</td>
                      <td style={{ padding: "6px 10px", color: muted(70) }}>{j.platforms.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Section>

        {/* 06 Plateformes */}
        <Section id="platforms" index="06 / Expertise des plateformes">
          <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "24ch" }}>Chaque portail canadien, plus les États-Unis quand vous soumissionnez au sud.</h2>
          <div className="mt-10 grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {PLATFORM_CARDS.map((p) => {
              const fr = PLATFORM_FR[p.name];
              return (
                <div key={p.name} className="panel p-5" data-reveal>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 style={{ fontSize: 19 }}>{p.name}</h3>
                    <span className="hud" style={{ fontSize: 9 }}>{fr?.qualifier ?? p.qualifier}</span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: muted(70), lineHeight: 1.55 }}>{fr?.body ?? p.body}</p>
                </div>
              );
            })}
          </div>
          <p data-reveal className="mt-6 text-sm" style={{ color: muted(60) }}>Plus Alberta Purchasing Connection, SaskTenders, NBON, le Ontario Tenders Portal et chaque système d'État de votre territoire. <Link href="/platforms" style={{ color: accent }}>Voir toutes les plateformes couvertes</Link>.</p>
        </Section>

        {/* 07 Couverture et prix */}
        <Section id="pricing" index="07 / Couverture et prix">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "18ch" }}>La couverture, ajustée à votre territoire. Facturée une fois par année.</h2>
            <p data-reveal style={{ color: muted(76), lineHeight: 1.6 }}>La couverture est facturée une fois par année, jamais au mois. Commencez par un pilote de soixante jours ou passez directement à un terme complet. Le montant est établi selon votre secteur et le nombre de juridictions. Aucun frais par opportunité. J'en révise autant qu'il le faut.</p>
          </div>
          {/* Pilote de 60 jours: le point d'entrée vers les paliers */}
          <div
            data-reveal
            className="mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center"
            style={{ border: `1px solid ${accent}`, background: "color-mix(in srgb, var(--color-accent) 11%, transparent)", borderRadius: 4, boxShadow: "0 0 60px color-mix(in srgb, var(--color-accent) 18%, transparent)" }}
          >
            <div>
              <p className="hud" style={{ color: "var(--color-accent-200)", letterSpacing: "0.2em" }}>Commencez ici</p>
              <h3 className="mt-2" style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}>Faites d'abord un pilote de 60 jours.</h3>
              <p className="mt-3 text-sm" style={{ color: muted(80), lineHeight: 1.6, maxWidth: "62ch" }}>
                Soixante jours de couverture réelle pour votre métier et vos territoires, menés
                exactement comme un terme complet: plateformes surveillées, documents ouverts,
                ajustement qualifié, opportunités livrées. Si vous continuez, la totalité des 2 000 $
                est déduite de votre première année. Sinon, vous gardez tout ce que je vous ai envoyé
                et nous nous quittons.
              </p>
              <ul className="mt-4 grid gap-1.5 text-sm">
                {[
                  "Surveillance et qualification complètes, sans portée réduite",
                  "Chaque opportunité qualifiée livrée avec un verdict et un lien source",
                  "Crédité en totalité sur le Palier I, II ou III",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2" style={{ color: muted(72) }}>
                    <span aria-hidden style={{ color: accent, lineHeight: 1.5 }}>&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
              <div>
                <p className="tabular-nums" style={{ fontSize: 44, letterSpacing: "-0.03em", color: "var(--color-accent-200)", lineHeight: 1 }}>2 000 $</p>
                <p className="mt-2 text-xs" style={{ color: muted(60), maxWidth: "28ch" }}>Une seule fois. Crédité en totalité sur votre couverture annuelle.</p>
              </div>
              <Link href="/book" className="btn btn-primary mt-1" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>Démarrer un pilote</Link>
            </div>
          </div>

          {/* Garantie: conservée, mais le nombre est fixé par client, pas publié */}
          <div data-reveal className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 p-5" style={{ maxWidth: 900, border: `1px solid ${accent}`, background: "color-mix(in srgb, var(--color-accent) 10%, transparent)", borderRadius: 4 }}>
            <span className="hud" style={{ color: "var(--color-accent-200)" }}>Garantie</span>
            <span style={{ fontSize: 15, color: muted(84), lineHeight: 1.5 }}>Chaque entente comporte un minimum garanti d'opportunités qualifiées. Comme chaque secteur est différent, je fixe ce nombre avec vous au moment d'établir votre couverture, pas selon un barème. Si je ne le livre pas, le travail continue sans frais jusqu'à ce que ce soit fait.</span>
          </div>

          <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
            {TIERS.map((tier) => (
              <div key={tier.name} data-reveal className="relative flex flex-col p-6" style={{ borderRadius: 4, border: tier.featured ? `1px solid ${accent}` : `1px solid ${accent20}`, background: tier.featured ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "color-mix(in srgb, #161826 66%, transparent)", boxShadow: tier.featured ? "0 0 40px color-mix(in srgb, var(--color-accent) 14%, transparent)" : undefined }}>
                {tier.featured && <span className="tag tag-accent" style={{ position: "absolute", top: 24, right: 24 }}>LE PLUS CHOISI</span>}
                <p className="hud" style={{ color: tier.featured ? "var(--color-accent-200)" : accent }}>{tier.name}</p>
                <p className="mt-2 text-sm" style={{ color: muted(60) }}>{tier.scope}</p>
                <p className="mt-4 tabular-nums" style={{ fontSize: 28, letterSpacing: "-0.02em", color: "var(--color-text)" }}>{tier.price}{!tier.quote && <span style={{ fontSize: 14, color: muted(55) }}> / an</span>}</p>
                <p className="hud mt-1" style={{ fontSize: 9 }}>{tier.quote ? "Établi et facturé selon votre territoire." : "Facturé annuellement. Montant fixé par votre secteur."}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2" style={{ color: muted(72), lineHeight: 1.5 }}>
                      <span aria-hidden style={{ color: accent }}>&rsaquo;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.cta.href} className={`btn ${tier.featured ? "btn-primary" : "btn-secondary"} mt-6`} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>{tier.cta.label}</Link>
              </div>
            ))}
          </div>
          <p data-reveal className="mt-4 text-xs" style={{ color: muted(45) }}>Les termes complets sont annuels, pas mensuels. La couverture nationale et transfrontalière est établie et facturée selon votre territoire.</p>
        </Section>

        {/* 08 Fiche opérateur */}
        <Section id="about" index="08 / Fiche opérateur">
          <div className="grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
            <div data-reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "18ch" }}>Je viens de l'intérieur des plateformes.</h2>
              <p className="mt-5" style={{ color: muted(78), lineHeight: 1.6, maxWidth: "52ch" }}>Je ne viens pas de l'extérieur. Pendant trois ans et demi, j'ai travaillé au sein de l'industrie de l'approvisionnement électronique, gérant plus de 17 500 comptes d'entrepreneurs sur un portefeuille de grandes plateformes au Canada et aux États-Unis.</p>
              <p className="mt-4" style={{ color: muted(70), lineHeight: 1.6, maxWidth: "52ch" }}>Mon travail consistait à faire en sorte que les entrepreneurs tirent une vraie valeur de ces plateformes, ce qui veut dire que j'ai vu exactement où ils perdent des soumissions: pas à la rédaction, à la recherche. Maintenant, je fais cette partie pour vous, de votre côté de la table.</p>
            </div>
            <div className="grid gap-4 self-start sm:grid-cols-3">
              {[["17 500+", "Comptes gérés"], ["3,5 ans", "Dans l'industrie"], ["18+", "Plateformes surveillées"]].map(([v, l]) => (
                <div key={l} data-reveal className="p-5" style={{ border: `1px solid ${accent22}`, borderLeft: `2px solid ${accent}`, borderRadius: 4 }}>
                  <div className="tabular-nums" style={{ fontSize: 32, letterSpacing: "-0.02em", color: "var(--color-accent-200)" }}>{v}</div>
                  <div className="hud mt-1" style={{ fontSize: 10 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 09 Débriefing */}
        <Section id="questions" index="09 / Débriefing">
          <div className="grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
            <h2 data-reveal style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "16ch" }}>Ce que les entrepreneurs me demandent en premier.</h2>
            <div data-reveal className="space-y-2">
              {FAQS.map((f) => (
                <details key={f.q} className="p-4" style={{ border: `1px solid ${accent20}`, borderRadius: 4 }}>
                  <summary style={{ listStyle: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: "var(--color-text)" }}>{f.q}</summary>
                  <p className="mt-3 text-sm" style={{ color: muted(70), lineHeight: 1.6 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* 10 Demander du renseignement */}
        <Section id="contact" index="10 / Demander du renseignement">
          <div className="grid gap-14 pt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}>
            <div data-reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.03em", maxWidth: "14ch" }}>Voyez ce qui vous échappe. Gratuit.</h2>
              <p className="mt-5" style={{ color: muted(76), lineHeight: 1.6, maxWidth: "44ch" }}>Dites-moi votre métier et où vous soumissionnez. Je passe en revue les plateformes desservant votre territoire et je renvoie une courte liste de vraies opportunités ouvertes que vous n'avez pas vues, lues, qualifiées et liées.</p>
              <div className="mt-8"><ChannelLog lang="fr" /></div>
            </div>
            <div data-reveal className="lg:pt-4"><IntelLeadForm lang="fr" /></div>
          </div>
        </Section>
      </div>
    </div>
  );
}

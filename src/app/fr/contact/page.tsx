import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, CalendarCheck } from "lucide-react";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Contactez Phil Dave",
    description:
      "Communiquez avec Phil Dave. Écrivez-moi directement, réservez un appel, ou envoyez votre métier et je répondrai personnellement, habituellement le jour ouvrable même.",
    path: "/fr/contact",
    keywords: ["contact renseignement opportunités gouvernementales", "contacter Phil"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/contact",
    languages: { en: SITE.domain + "/contact", "fr-CA": SITE.domain + "/fr/contact" },
  },
};

const accent = "var(--color-accent)";
const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

export default function ContactFrPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/fr" }, { name: "Contact", path: "/fr/contact" }])} />
      <div className="nz-gridwash" />

      <main className="relative mx-auto max-w-[1100px] px-4 sm:px-7" style={{ zIndex: 1, padding: "clamp(40px, 7vw, 80px) clamp(16px, 4vw, 28px) 80px" }}>
        <div className="flex items-center gap-2.5">
          <span className="blip" />
          <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Contact · ligne directe</span>
        </div>
        <h1 className="mt-5" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: "18ch" }}>
          Vous me parlerez à moi, pas à une file d'attente.
        </h1>
        <div className="rule mt-6" />
        <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "52ch" }}>
          Une question sur la couverture, une juridiction, une plateforme, ou si je peux aider dans
          votre métier? Envoyez-la. Je lis chaque message moi-même et je réponds personnellement,
          habituellement le jour ouvrable même.
        </p>

        <div className="mt-12 grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="space-y-4">
            <a href={`mailto:${SITE.email}`} className="panel flex items-start gap-4 p-5" style={{ textDecoration: "none" }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded" style={{ border: `1px solid ${accent20}`, color: accent }}><Mail className="h-5 w-5" /></span>
              <span>
                <span className="block" style={{ color: "var(--color-text)", fontWeight: 500 }}>Écrivez-moi</span>
                <span className="mt-1 block break-all text-sm" style={{ color: muted(65) }}>{SITE.email}</span>
              </span>
            </a>

            <Link href={SITE.bookingUrl} className="panel flex items-start gap-4 p-5" style={{ textDecoration: "none" }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded" style={{ border: `1px solid ${accent20}`, color: accent }}><CalendarCheck className="h-5 w-5" /></span>
              <span>
                <span className="block" style={{ color: "var(--color-text)", fontWeight: 500 }}>Réservez un appel de découverte</span>
                <span className="mt-1 block text-sm" style={{ color: muted(65) }}>Choisissez un moment et j'arrive avec de vraies opportunités dans votre métier.</span>
              </span>
            </Link>

            <div className="panel flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded" style={{ border: `1px solid ${accent20}`, color: accent }}><Clock className="h-5 w-5" /></span>
              <span>
                <span className="block" style={{ color: "var(--color-text)", fontWeight: 500 }}>Temps de réponse</span>
                <span className="mt-1 block text-sm" style={{ color: muted(65) }}>Je réponds personnellement, habituellement le jour ouvrable même.</span>
              </span>
            </div>
          </div>

          <div>
            <p className="hud mb-4" style={{ color: accent }}>Ou envoyez votre métier et je réponds avec de vraies opportunités</p>
            <IntelLeadForm lang="fr" formLabel="Message · 3 champs" />
          </div>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { LeadForm } from "@/components/site/lead-form";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Contactez Phil Dave",
    description:
      "Communiquez avec Phil Dave. Écrivez-moi directement ou envoyez un message et je répondrai personnellement, habituellement le jour ouvrable même. Je lis chaque message moi-même.",
    path: "/fr/contact",
    keywords: ["contact renseignement opportunités gouvernementales", "contacter Phil"],
  }),
  alternates: {
    canonical: SITE.domain + "/fr/contact",
    languages: { en: SITE.domain + "/contact", "fr-CA": SITE.domain + "/fr/contact" },
  },
};

export default function ContactFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "Contact", path: "/fr/contact" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Accueil", href: "/fr" }, { name: "Contact" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Contact</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Écrivez-moi. Vous parlerez à moi, pas à une file d'attente.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Une question sur la couverture, un territoire, une plateforme, ou si je peux aider votre
              métier? Envoyez-la. Je lis chaque message moi-même et je réponds personnellement,
              habituellement le jour ouvrable même.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Joignez-moi directement</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">Une vraie personne lit ceci</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              Il n'y a ni service de soutien ni boucle de réponse automatique ici. C'est juste moi.
              Utilisez le formulaire, ou écrivez-moi directement si c'est plus simple.
            </p>

            <div className="mt-8 space-y-5">
              <a href={`mailto:${SITE.email}`} className="card group flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg group-hover:text-accent">Écrivez-moi</h3>
                  <p className="mt-1 break-all text-sm text-fg-muted">{SITE.email}</p>
                </div>
              </a>

              <div className="card flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Délai de réponse</h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    Je réponds personnellement, habituellement le jour ouvrable même.
                  </p>
                </div>
              </div>

              <div className="card flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Vous préférez le voir en action?</h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    <Link href={SITE.bookingUrl} className="font-medium text-accent hover:text-accent">
                      Réservez un appel de découverte
                    </Link>{" "}
                    ou{" "}
                    <Link href="/fr/free-opportunities" className="font-medium text-accent hover:text-accent">
                      demandez des opportunités gratuites
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <LeadForm variant="call" lang="fr" />
          </div>
        </div>
      </Section>

      <CtaBand lang="fr" />
    </>
  );
}

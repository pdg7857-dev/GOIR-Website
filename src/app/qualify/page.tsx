import type { Metadata } from "next";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { QuestionnaireForm } from "@/components/site/questionnaire-form";
import { QUICK_FORM } from "@/lib/site/questionnaires";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Get Opportunities for Your Size",
    description:
      "A few quick questions about your trade, where you bid and the size of work you take, so I can find government opportunities that actually fit you. About 5 minutes.",
    path: "/qualify",
    keywords: ["government bid matching", "qualify for government contracts", "find bids for my company"],
  }),
  alternates: {
    canonical: SITE.domain + "/qualify",
    languages: { en: SITE.domain + "/qualify", "fr-CA": SITE.domain + "/fr/qualify" },
  },
};

export default function QualifyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Get matched", path: "/qualify" }])} />

      <section className="border-b border-border bg-ink-900 text-white">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Get matched" }]} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow text-accent">Get matched to the right bids</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Opportunities for your size, not a firehose.</h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              A few quick questions about your trade, where you bid, and the size of work you take.
              The more honest you are about your sweet spot, the better the opportunities I bring you
              will fit. About 5 minutes, and I read every answer myself.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <QuestionnaireForm sections={QUICK_FORM} kind="quick" lang="en" />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

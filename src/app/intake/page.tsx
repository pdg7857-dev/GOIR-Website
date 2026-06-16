import type { Metadata } from "next";
import { Breadcrumbs, Section } from "@/components/site/ui";
import { QuestionnaireForm } from "@/components/site/questionnaire-form";
import { FULL_FORM } from "@/lib/site/questionnaires";

export const metadata: Metadata = {
  title: "Client Intake",
  description: "Tell me about your business so I can find the government work that fits your size and your trade.",
  robots: { index: false, follow: false },
};

export default function IntakePage() {
  return (
    <>
      <section className="border-b border-border bg-ink-900 text-white">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Client intake" }]} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow text-accent">Client intake</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Let me get to know your business.</h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              A few questions so I can find the right opportunities for you, not just more of them.
              Most people finish in about five minutes. The more honest you are about your size and
              your sweet spot, the better the bids I bring you will fit. I read every answer myself.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <QuestionnaireForm sections={FULL_FORM} kind="full" lang="en" />
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How this independent practice collects, uses and protects the information you share. I do not sell your data and you can ask me to delete it at any time.",
  path: "/privacy",
});

// EDIT BEFORE LAUNCH: set this to the date the policy was last reviewed.
const LAST_UPDATED = "[LAST UPDATED: edit this date before launch]";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">Privacy Policy</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Plain English about what I collect, why, and what I will never do with it.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="prose-site max-w-3xl">
          <p className="text-sm text-fg-muted">Last updated: {LAST_UPDATED}</p>

          <p>
            This site is operated by {SITE.brandFull}, an independent practice (referred to here as
            "I" or "me"). This policy explains what information I collect through this website,
            how I use it, and the choices you have. By using the site or contacting me through it,
            you agree to the practices described below.
          </p>

          <h2>Who runs this site</h2>
          <p>
            {SITE.brandFull} is an independent service. I am{" "}
            <strong>
              not affiliated with, endorsed by, or operated by any procurement platform or any
              government body
            </strong>
            , including but not limited to MERX, BidNet Direct, CanadaBuys, SAM.gov, or any federal,
            provincial, state or municipal agency. Platform and agency names are used only to
            describe the publicly available systems I monitor.
          </p>

          <h2>What I collect</h2>
          <ul>
            <li>
              <strong>Information you give me.</strong> When you fill out a form, book a call, request
              a sample opportunity, or email me, I collect details such as your name, company, email
              address, the trade or industry you work in, the regions where you bid, and anything else
              you choose to share.
            </li>
            <li>
              <strong>Basic usage data.</strong> Like most websites, this one may collect standard
              technical information such as your browser type, device and pages visited, through
              server logs or analytics tools, to keep the site working and understand how it is used.
            </li>
          </ul>

          <h2>How I use it</h2>
          <ul>
            <li>To reply to you and provide the discovery, monitoring and qualification services you ask about.</li>
            <li>To schedule and prepare for calls, and to send the opportunities or information you request.</li>
            <li>To improve the website and the service.</li>
            <li>To meet legal or regulatory obligations where they apply.</li>
          </ul>

          <h2>What I will not do</h2>
          <p>
            I do not sell your information, and I do not rent or trade your details to third parties
            for their own marketing. The details you share come to me and are used to help you. That
            is the whole point of how I work.
          </p>

          <h2>Sharing with service providers</h2>
          <p>
            I may use trusted third-party tools to run the practice, for example email, scheduling,
            hosting or analytics providers. Those providers only process your information to provide
            their service to me, and are expected to keep it confidential. I may also disclose
            information if required by law.
          </p>

          <h2>How long I keep it</h2>
          <p>
            I keep the information you share for as long as it is needed to respond to you and provide
            the service, and to meet any legal obligations. When it is no longer needed, I take
            reasonable steps to delete or anonymize it.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask me to access, correct or delete the personal information I hold about you, or
            to stop contacting you, at any time. Just email me at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and I will take care of it. Depending on
            where you live, you may have additional rights under laws such as Canada's PIPEDA or
            applicable U.S. state privacy laws.
          </p>

          <h2>Children</h2>
          <p>
            This site is meant for businesses and the people who run them. It is not directed at
            children, and I do not knowingly collect information from anyone under the age of majority.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            I may update this policy from time to time. When I do, I will revise the "last updated"
            date above. Significant changes will be reflected on this page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy or your information? Email me at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <p className="text-sm text-fg-muted">
            Note for the operator: this is a general, good-faith policy template and is not legal
            advice. Have qualified counsel review and tailor it to your jurisdictions and tools before
            launch.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

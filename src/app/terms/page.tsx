import type { Metadata } from "next";
import { Breadcrumbs, CtaBand, Section } from "@/components/site/ui";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that govern your use of this website and the independent opportunity intelligence service it describes. Please read them before using the site.",
  path: "/terms",
});

// EDIT BEFORE LAUNCH: set this to the date the terms were last reviewed.
const LAST_UPDATED = "[LAST UPDATED: edit this date before launch]";

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />

      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-fg sm:text-5xl">Terms of Service</h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              The plain-language terms for using this website and the service it describes.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="prose-site max-w-3xl">
          <p className="text-sm text-fg-muted">Last updated: {LAST_UPDATED}</p>

          <p>
            These terms govern your use of this website, operated by {SITE.brandFull} (referred to
            here as "I" or "me"). By using the site or engaging the service, you agree to these
            terms. If you do not agree, please do not use the site.
          </p>

          <h2>Independent practice</h2>
          <p>
            {SITE.brandFull} is an independent practice. I am{" "}
            <strong>
              not affiliated with, endorsed by, or operated by any procurement platform or any
              government body
            </strong>
            , including but not limited to MERX, BidNet Direct, CanadaBuys, SAM.gov, or any federal,
            provincial, state or municipal agency. Those names are used only to describe the publicly
            available systems I monitor on behalf of clients.
          </p>

          <h2>What the service is</h2>
          <p>
            I provide government opportunity intelligence: monitoring, discovery, bid-document review
            and fit qualification of government contract opportunities across Canada and the United
            States. In plain terms, I find, read and qualify opportunities so you can decide which
            ones to pursue.
          </p>

          <h2>What the service is not</h2>
          <p>
            I am <strong>not a bid writer, proposal writer, or procurement consultant</strong>. I do
            not prepare, price, draft or submit bids or proposals, and I do not act as your agent with
            any buyer. You are solely responsible for preparing, pricing, submitting and managing your
            own bids, and for meeting every deadline and requirement set by the issuing authority.
          </p>

          <h2>No guarantee of outcomes</h2>
          <p>
            Government procurement is competitive and the decisions belong to the buyers. I do not
            guarantee that you will be awarded any contract, that any particular opportunity will suit
            your business, or that I will identify every relevant opportunity. The information I
            provide is intended to help you make informed decisions; it does not replace your own due
            diligence on the official solicitation documents.
          </p>

          <h2>Accuracy of information</h2>
          <p>
            I take care to read documents thoroughly, but solicitations change, addenda are issued,
            and dates and requirements can be revised by the issuing authority at any time. The
            official source documents always govern. You should confirm key details, including closing
            dates and mandatory requirements, against the official posting before relying on them.
          </p>

          <h2>Website content</h2>
          <p>
            The content on this site is provided for general information and does not constitute legal,
            financial or professional advice. The site is provided on an "as is" and "as available"
            basis without warranties of any kind, to the fullest extent permitted by law.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, design and original materials on this site belong to me unless otherwise noted.
            Please do not copy or republish them without permission. Third-party names and marks remain
            the property of their respective owners and are used for descriptive purposes only.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, I am not liable for any indirect, incidental or
            consequential losses, including lost contracts, lost profits or missed opportunities,
            arising from your use of this site or the service. Where liability cannot be excluded, it
            is limited to the amount you have paid me for the service in question.
          </p>

          <h2>Fees</h2>
          <p>
            Where coverage is purchased, fees and terms are set out separately in the arrangement
            between us. Coverage is scoped to your footprint and quoted individually. Any figures
            discussed before that are indicative and may change.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            I may update these terms from time to time. When I do, I will revise the "last updated"
            date above. Continued use of the site after changes means you accept the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email me at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <p className="text-sm text-fg-muted">
            Note for the operator: these are general, good-faith terms and are not legal advice. Have
            qualified counsel review and tailor them, including the governing-law and dispute-resolution
            provisions, to your jurisdictions before launch.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

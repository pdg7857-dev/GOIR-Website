import type { Metadata } from "next";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that govern your use of this website and the independent opportunity intelligence service it describes. Please read them before using the site.",
  path: "/terms",
});

const LAST_UPDATED = "July 6, 2026";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

export default function TermsPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <div className="nz-gridwash" />

      <main className="relative mx-auto max-w-[1100px] px-4 sm:px-7" style={{ zIndex: 1, padding: "clamp(40px, 7vw, 72px) clamp(16px, 4vw, 28px) 80px" }}>
        <p className="hud" style={{ fontSize: 10, letterSpacing: "0.22em", color: muted(58) }}>Terms of Service</p>
        <h1 className="mt-4" style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: "22ch" }}>
          The plain-language terms for using this site and the service it describes.
        </h1>
        <div className="rule mt-6" />

        <div className="prose mt-10">
          <p style={{ fontSize: 13, color: muted(50) }}>Last updated: {LAST_UPDATED}</p>

          <p>
            These terms govern your use of this website, operated by {SITE.brandFull} (referred to
            here as "I" or "me"). By using the site or engaging the service, you agree to these
            terms. If you do not agree, please do not use the site.
          </p>

          <h2>Independent practice</h2>
          <p>
            {SITE.brandFull} is an independent practice. I am{" "}
            <strong>not affiliated with, endorsed by, or operated by any procurement platform or any government body</strong>
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
        </div>
      </main>
    </div>
  );
}

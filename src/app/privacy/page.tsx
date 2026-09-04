import type { Metadata } from "next";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How this independent practice collects, uses and protects the information you share. I do not sell your data and you can ask me to delete it at any time.",
  path: "/privacy",
});

const LAST_UPDATED = "July 6, 2026";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

export default function PrivacyPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <div className="nz-gridwash" />

      <main className="relative mx-auto max-w-[1100px] px-4 sm:px-7" style={{ zIndex: 1, padding: "clamp(40px, 7vw, 72px) clamp(16px, 4vw, 28px) 80px" }}>
        <p className="hud" style={{ fontSize: 10, letterSpacing: "0.22em", color: muted(58) }}>Privacy Policy</p>
        <h1 className="mt-4" style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: "20ch" }}>
          Plain English about what I collect, why, and what I will never do with it.
        </h1>
        <div className="rule mt-6" />

        <div className="prose mt-10">
          <p style={{ fontSize: 13, color: muted(50) }}>Last updated: {LAST_UPDATED}</p>

          <p>
            This site is operated by {SITE.brandFull}, an independent practice (referred to here as
            "I" or "me"). This policy explains what information I collect through this website,
            how I use it, and the choices you have. By using the site or contacting me through it,
            you agree to the practices described below.
          </p>

          <h2>Who runs this site</h2>
          <p>
            {SITE.brandFull} is an independent service. I am{" "}
            <strong>not affiliated with, endorsed by, or operated by any procurement platform or any government body</strong>
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
            <li>
              <strong>Form submissions in server logs.</strong> When you send me a form, the details
              you submitted are also written to my hosting provider's server logs. This is a
              deliberate safeguard so that an enquiry is never lost if my email or database is
              temporarily unavailable. Those logs are retained by the host for a limited period and
              are not used for anything else.
            </li>
            <li>
              <strong>Session analytics, if enabled.</strong> I may use a product analytics tool that
              records anonymised page interactions such as clicks and scrolling to understand how the
              site is used. Where it is enabled, form fields are masked so the contents of what you
              type are not captured. You can ask me at any time whether it is running.
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
        </div>
      </main>
    </div>
  );
}

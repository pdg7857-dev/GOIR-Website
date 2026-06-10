import type { Metadata } from "next";
import { Search, FileSearch, Filter, Send } from "lucide-react";
import { Breadcrumbs, CtaBand, Section, SectionHead, CredentialBadge } from "@/components/site/ui";
import { RequestOpportunitiesForm } from "@/components/site/request-opportunities-form";
import { FaqAccordion } from "@/components/site/faq";
import { pageMeta, JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Get Free Government Bid Opportunities for Your Trade",
  description:
    "Tell me your trade and where you bid, and I'll send you a short list of real, current government opportunities you have not found, already qualified with source links. Free, no obligation, no spam.",
  path: "/free-opportunities",
  keywords: [
    "free government bid opportunities",
    "government contract leads",
    "bid opportunities for contractors",
    "find government tenders",
    "government RFP leads",
  ],
});

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. No cost and no obligation. I send you real opportunities so you can see the quality of what I do before you ever consider paying for ongoing coverage.",
  },
  {
    q: "What exactly will I get?",
    a: "A short list of current government opportunities that fit your trade and where you bid. Each one is found and qualified, with a plain-language summary and a link to the source bid on the issuing platform.",
  },
  {
    q: "I am new to government bidding. Is this for me?",
    a: "Yes. Whether you have never submitted a bid or you bid every week, I meet you where you are and show you what is open and genuinely worth pursuing in your trade.",
  },
  {
    q: "How soon will I hear back?",
    a: "Within 1 to 2 business days. I prepare each list personally, so it is real research on your trade and jurisdictions, not an automated email.",
  },
  {
    q: "What do you do with my details?",
    a: "They come straight to me so I can prepare your opportunities and follow up. No spam, no list-selling.",
  },
];

const STEPS = [
  { icon: Search, title: "I look where you bid", body: "Across the platforms that matter in your province, state or region, not just the one you watch." },
  { icon: FileSearch, title: "I read the documents", body: "Scope, requirements and evaluation criteria, so the fit is real and not just a keyword match." },
  { icon: Filter, title: "I qualify the fit", body: "Against your trade and footprint, so you only see opportunities actually worth your time." },
  { icon: Send, title: "I send you the short list", body: "Real, current opportunities with plain-language summaries and links to the source bid." },
];

export default function FreeOpportunitiesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Request your free opportunities", path: "/free-opportunities" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="border-b border-border bg-ink-900 text-white">
        <div className="container py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Free opportunities" }]} />
          <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-xl">
              <p className="eyebrow text-accent">Request your free opportunities</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                Let me show you what you are missing.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Tell me what you do and where you bid. I will look across the platforms that matter
                in your area, read the documents, qualify the fit, and send you a short list of real,
                current opportunities that suit your trade. Found and qualified the way I do it for
                clients. Free, and no obligation.
              </p>
              <div className="mt-7">
                <CredentialBadge lg />
              </div>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                <li>Real opportunities, not a sales pitch.</li>
                <li>New to bidding or seasoned, I meet you where you are.</li>
                <li>Your details come straight to me. No spam, no list-selling.</li>
              </ul>
            </div>

            <div className="card bg-bg p-6 text-fg sm:p-8">
              <h2 className="text-xl font-semibold text-fg">Where should I send them?</h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                A few quick details so I can target your short list.
              </p>
              <div className="mt-6">
                <RequestOpportunitiesForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          center
          eyebrow="How it works"
          title="What happens after you send the form"
          lede="The same process I run for paying clients, on a sample of your real opportunities."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.title} className="card p-6">
              <s.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl">
          <SectionHead center title="Common questions" />
          <div className="mt-8">
            <FaqAccordion faqs={FAQS} />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

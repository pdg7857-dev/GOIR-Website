import Link from "next/link";
import type { Metadata } from "next";
import { FileSearch, FileText, Filter, MapPin } from "lucide-react";
import {
  Breadcrumbs,
  CtaBand,
  Section,
  SectionHead,
} from "@/components/site/ui";
import { LeadForm } from "@/components/site/lead-form";
import { SITE } from "@/lib/site/config";
import {
  pageMeta,
  JsonLd,
  breadcrumbJsonLd,
  serviceJsonLd,
} from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Request a Sample Government Opportunity",
  description:
    "Send me your trade and jurisdiction and I will send back a live, real government opportunity, already read and qualified, so you can see the quality of my work before you ever buy.",
  path: "/sample-opportunity",
  keywords: [
    "sample government opportunity",
    "free government bid lead",
    "qualified government contract opportunity",
    "government opportunity intelligence sample",
  ],
});

export default function SampleOpportunityPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sample opportunity", path: "/sample-opportunity" },
          ]),
          serviceJsonLd(
            "Sample Government Opportunity",
            "A live, qualified government contract opportunity sent to a prospective client in their trade and jurisdiction, so they can judge the quality of the work before buying.",
            "/sample-opportunity",
          ),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Sample opportunity" }]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">See it before you buy</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Let me send you one real opportunity, already qualified
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Tell me your trade and where you bid. I will go find a live government opportunity in
              your jurisdiction, read the documents, and send it back to you the way I deliver to
              clients. No mock-up, no sample template. An actual opportunity you could pursue.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#request" className="btn-gold px-5 py-3">
                Request my sample
              </Link>
              <Link
                href={SITE.bookingUrl}
                className="btn-ghost border-white/20 bg-white/5 px-5 py-3 text-fg hover:border-white/40 hover:text-fg"
              >
                Or book a discovery call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <Section>
        <SectionHead
          eyebrow="What lands in your inbox"
          title="The same thing my clients get, on a real opportunity"
          lede="A keyword alert dumps a link in your inbox and leaves the work to you. This is the opposite. By the time you see it, the hard part is done."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
              <FileSearch className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-fg">A live opportunity</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Current and real, pulled from whichever platform your buyers actually use for your
              kind of work, not a stale example.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-fg">In your jurisdiction</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Matched to the provinces, states or cities where you can actually deliver, so it is
              something you could genuinely bid.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-fg">Already read</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              I open the documents and pull out the scope, the closing date, the key requirements and
              the fine print that decides if you can bid.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
              <Filter className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-fg">And qualified</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              With my honest read on the fit for your shop, so you can see how I separate signal from
              noise before you ever pay.
            </p>
          </div>
        </div>
      </Section>

      {/* Why */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Why I do this</p>
          <h2 className="mt-3 text-3xl font-semibold text-fg sm:text-4xl">
            The best way to judge my work is to see it on yours
          </h2>
          <div className="prose-site mt-6 max-w-none">
            <p>
              I could describe what I do all day, but it lands differently when you see a real
              opportunity in your own trade, in your own region, read and qualified the way I do it
              for paying clients. That is worth more than any case study.
            </p>
            <p>
              So I send one out, free, before any conversation about coverage. If it shows you
              something you would have missed, you will understand the value immediately. If it does
              not, you have lost nothing and you keep a real lead. Either way, you see exactly what
              you would be paying for.
            </p>
            <p>
              <strong>One note on scope:</strong> I find, read and qualify the opportunity. You
              prepare and submit the bid. I am the discovery and qualification side of your
              pipeline, not a proposal writer.
            </p>
          </div>
        </div>
      </Section>

      {/* Request form */}
      <Section>
        <div id="request" className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Request it</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">
              Tell me your trade and where you bid
            </h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              The more specific you are about the work you want and the jurisdictions you serve, the
              sharper the opportunity I can send back. A sentence or two is plenty.
            </p>
            <p className="mt-4 text-sm text-fg-muted">
              I read every request myself and reply personally, usually the same business day. Your
              details come straight to me, and nowhere else.
            </p>
          </div>
          <LeadForm variant="sample" />
        </div>
      </Section>

      <CtaBand
        title="Want more than one? Let me show you a whole list."
        sub="A sample shows you the quality. A discovery call shows you the volume, with live opportunities across your jurisdictions, in twenty minutes."
      />
    </>
  );
}

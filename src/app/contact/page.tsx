import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageSquare, Clock } from "lucide-react";
import {
  Breadcrumbs,
  CtaBand,
  Section,
} from "@/components/site/ui";
import { LeadForm } from "@/components/site/lead-form";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Phil Dave",
  description:
    "Get in touch with Phil Dave. Email me directly or send a message and I will reply personally, usually the same business day. I read every message myself.",
  path: "/contact",
  keywords: [
    "contact government opportunity intelligence",
    "contact phil procurement",
    "government bid discovery contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-border bg-bg">
        <div className="container py-12 lg:py-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-accent">Contact</p>
            <h1 className="mt-3 text-4xl font-bold text-fg sm:text-5xl">
              Get in touch. You will be talking to me, not a queue.
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg-muted">
              Question about coverage, a jurisdiction, a platform, or whether I can help with your
              trade? Send it over. I read every message myself and reply personally, usually the
              same business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options + form */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Reach me directly</p>
            <h2 className="mt-3 text-3xl font-semibold text-fg">A real person reads this</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">
              There is no support desk and no auto-responder loop here. It is just me. Use the form,
              or email me straight away if that is easier.
            </p>

            <div className="mt-8 space-y-5">
              <a
                href={`mailto:${SITE.email}`}
                className="card group flex items-start gap-4 p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg group-hover:text-accent">Email me</h3>
                  <p className="mt-1 break-all text-sm text-fg-muted">{SITE.email}</p>
                </div>
              </a>

              <div className="card flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Response time</h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    I reply personally, usually within the same business day.
                  </p>
                </div>
              </div>

              <div className="card flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Rather see it in action?</h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    <Link
                      href={SITE.bookingUrl}
                      className="font-medium text-accent hover:text-accent"
                    >
                      Book a discovery call
                    </Link>{" "}
                    or{" "}
                    <Link
                      href={SITE.sampleUrl}
                      className="font-medium text-accent hover:text-accent"
                    >
                      request a sample opportunity
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <LeadForm variant="call" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

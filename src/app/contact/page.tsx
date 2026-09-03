import Link from "next/link";
import type { Metadata } from "next";
import { Mail, Clock, CalendarCheck } from "lucide-react";
import { IntelLeadForm } from "@/components/intel/lead-form";
import { SITE } from "@/lib/site/config";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Phil Dave",
  description:
    "Get in touch with Phil Dave. Email me directly, book a call, or send your trade and I will reply personally, usually the same business day. I read every message myself.",
  path: "/contact",
  keywords: ["contact government opportunity intelligence", "contact phil procurement", "government bid discovery contact"],
});

const accent = "var(--color-accent)";
const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

export default function ContactPage() {
  return (
    <div className="intel" style={{ background: "var(--nz-page)", position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <div className="nz-gridwash" />

      <main className="relative mx-auto max-w-[1100px] px-4 sm:px-7" style={{ zIndex: 1, padding: "clamp(40px, 7vw, 80px) clamp(16px, 4vw, 28px) 80px" }}>
        <div className="flex items-center gap-2.5">
          <span className="blip" />
          <span className="hud" style={{ fontSize: 10, letterSpacing: "0.24em", color: muted(58) }}>Contact · direct line</span>
        </div>
        <h1 className="mt-5" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.035em", maxWidth: "18ch" }}>
          You will be talking to me, not a queue.
        </h1>
        <div className="rule mt-6" />
        <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.6, color: muted(78), maxWidth: "52ch" }}>
          A question about coverage, a jurisdiction, a platform, or whether I can help with your
          trade? Send it over. I read every message myself and reply personally, usually the same
          business day.
        </p>

        <div className="mt-12 grid gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="space-y-4">
            <a href={`mailto:${SITE.email}`} className="panel flex items-start gap-4 p-5" style={{ textDecoration: "none" }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded" style={{ border: `1px solid ${accent20}`, color: accent }}><Mail className="h-5 w-5" /></span>
              <span>
                <span className="block" style={{ color: "var(--color-text)", fontWeight: 500 }}>Email me</span>
                <span className="mt-1 block break-all text-sm" style={{ color: muted(65) }}>{SITE.email}</span>
              </span>
            </a>

            <Link href={SITE.bookingUrl} className="panel flex items-start gap-4 p-5" style={{ textDecoration: "none" }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded" style={{ border: `1px solid ${accent20}`, color: accent }}><CalendarCheck className="h-5 w-5" /></span>
              <span>
                <span className="block" style={{ color: "var(--color-text)", fontWeight: 500 }}>Book a discovery call</span>
                <span className="mt-1 block text-sm" style={{ color: muted(65) }}>Pick a time and I will bring real opportunities in your trade.</span>
              </span>
            </Link>

            <div className="panel flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded" style={{ border: `1px solid ${accent20}`, color: accent }}><Clock className="h-5 w-5" /></span>
              <span>
                <span className="block" style={{ color: "var(--color-text)", fontWeight: 500 }}>Response time</span>
                <span className="mt-1 block text-sm" style={{ color: muted(65) }}>I reply personally, usually within the same business day.</span>
              </span>
            </div>
          </div>

          <div>
            <p className="hud mb-4" style={{ color: accent }}>Or send your trade and I will reply with real opportunities</p>
            <IntelLeadForm formLabel="Message" />
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/site/config";

const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

const LINKS = [
  { label: "Free report", href: "/free-opportunities" },
  { label: "Coverage", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="intel" style={{ background: "var(--nz-page)", borderTop: `1px solid ${accent20}` }}>
      <div className="mx-auto max-w-[1360px] px-4 pb-11 pt-10 sm:px-7">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex flex-col leading-tight">
              <span style={{ fontWeight: 500, fontSize: 15, letterSpacing: "0.04em", color: "var(--color-text)" }}>PHIL DAVE</span>
              <span className="hud" style={{ fontSize: 11, letterSpacing: "0.12em" }}>Government Opportunity Intelligence</span>
            </div>
            <p className="mt-4 text-sm leading-6" style={{ color: muted(60) }}>
              I find, read and qualify government contract opportunities across Canada and the
              United States, so your team stops searching portals and starts bidding the work
              that is worth pursuing.
            </p>
            <Link href={SITE.bookingUrl} className="btn btn-primary mt-5" style={{ padding: "8px 16px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Book a discovery call
            </Link>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2.5" aria-label="Footer">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: muted(62), textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6" style={{ borderTop: `1px solid ${accent20}` }}>
          <p className="max-w-3xl text-xs leading-6" style={{ color: muted(40) }}>
            {SITE.person} provides opportunity monitoring and qualification. I do not write or submit
            proposals, and I do not guarantee contract awards. Demonstrations on this site are
            illustrative. Background figures reflect prior industry experience. Not
            affiliated with any procurement platform or government body.
          </p>
          <p className="mt-4 text-xs" style={{ color: muted(50) }}>&copy; {year} {SITE.brandFull}.</p>
        </div>
      </div>
    </footer>
  );
}

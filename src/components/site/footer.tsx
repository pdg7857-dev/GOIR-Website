import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site/config";

const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const muted = (n: number) => `color-mix(in srgb, var(--color-text) ${n}%, transparent)`;

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="intel" style={{ background: "var(--nz-page)", borderTop: `1px solid ${accent20}` }}>
      <div className="mx-auto max-w-[1360px] px-4 pb-11 pt-8 sm:px-7">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]">
          <div className="max-w-xs">
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

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="hud" style={{ fontSize: 10, letterSpacing: "0.16em" }}>{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: muted(60), textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6" style={{ borderTop: `1px solid ${accent20}` }}>
          <p className="max-w-3xl text-xs leading-6" style={{ color: muted(40) }}>
            {SITE.person} provides opportunity monitoring and qualification. I do not write or submit
            proposals, and I do not guarantee contract awards. Counters and demonstrations on this
            site are illustrative. Background figures reflect prior industry experience. Not
            affiliated with any procurement platform or government body.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 pt-2 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ color: muted(50) }}>
          <p>&copy; {year} {SITE.brandFull}.</p>
          <div className="flex gap-5" style={{ textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 10 }}>
            <Link href="/privacy" className="hover:text-white" style={{ color: muted(60), textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" className="hover:text-white" style={{ color: muted(60), textDecoration: "none" }}>Terms</Link>
            <Link href="/contact" className="hover:text-white" style={{ color: muted(60), textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

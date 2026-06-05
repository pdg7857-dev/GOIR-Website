import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site/config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg text-fg-muted">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(5,minmax(0,1fr))]">
          <div className="max-w-xs">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-fg">{SITE.brand}</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
                Gov Opportunity Intelligence
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-fg-subtle">
              I find, read and qualify government contract opportunities across Canada and the
              United States, so your team stops searching portals and starts bidding the work
              that is actually worth pursuing.
            </p>
            <Link href={SITE.bookingUrl} className="btn-gold mt-5 px-4 py-2 text-sm">
              Book a discovery call
            </Link>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-fg-subtle transition hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-6 text-fg-subtle">
            {SITE.person} provides opportunity monitoring and qualification. I do not write or submit
            proposals, and I do not guarantee contract awards. Background figures reflect prior
            industry experience.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 pt-2 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.brandFull}. Independent opportunity-intelligence practice. Not
            affiliated with any procurement platform or government body.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-fg-muted">Privacy</Link>
            <Link href="/terms" className="hover:text-fg-muted">Terms</Link>
            <Link href="/contact" className="hover:text-fg-muted">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

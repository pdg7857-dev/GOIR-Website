"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { SITE } from "@/lib/site/config";
import { localeFromPath, toFrPath, toEnPath, dict } from "@/lib/i18n";
import { HudReadouts } from "@/components/intel/console";

const accent20 = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const accent24 = "color-mix(in srgb, var(--color-accent) 24%, transparent)";

/** Minimal nav for the trimmed 4-5 page site. */
const NAV = {
  en: [
    { label: "Coverage & Pricing", href: "/#pricing" },
    { label: "Free report", href: "/free-opportunities" },
    { label: "Contact", href: "/contact" },
  ],
  fr: [
    { label: "Couverture et prix", href: "/fr#pricing" },
    { label: "Rapport gratuit", href: "/fr/free-opportunities" },
    { label: "Contact", href: "/fr/contact" },
  ],
};

/** The ring logo mark from the design: a 22px accent circle with an inner ring. */
function LogoMark() {
  return (
    <span
      className="relative block shrink-0"
      style={{ width: 22, height: 22, border: "1px solid var(--color-accent)", borderRadius: "50%", boxShadow: "0 0 12px color-mix(in srgb, var(--color-accent) 45%, transparent)" }}
    >
      <span className="absolute rounded-full" style={{ inset: 5, border: "1px solid color-mix(in srgb, var(--color-accent) 55%, transparent)" }} />
    </span>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);
  const t = dict[locale];
  const freeHref = locale === "fr" ? "/fr/free-opportunities" : "/free-opportunities";
  const homeHref = locale === "fr" ? "/fr" : "/";
  const toggleHref = locale === "fr" ? toEnPath(pathname) : toFrPath(pathname);
  const nav = NAV[locale];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="intel sticky top-0 z-50"
      style={{
        background: "color-mix(in srgb, #101120 86%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${accent24}`,
      }}
    >
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-2.5 sm:px-7">
        {/* Brand */}
        <Link href={homeHref} className="flex shrink-0 items-center gap-3" style={{ textDecoration: "none", color: "var(--color-text)" }} aria-label={`${SITE.brand} home`}>
          <LogoMark />
          <span className="flex flex-col leading-tight">
            <span style={{ fontWeight: 500, fontSize: 16, letterSpacing: "0.02em" }}>PHIL DAVE</span>
            <span className="hud" style={{ fontSize: 9 }}>Opportunity Intelligence</span>
          </span>
        </Link>

        {/* Live readouts */}
        <HudReadouts lang={locale} />

        {/* Primary nav */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded px-3 py-2 transition-colors hover:text-white" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href={toggleHref} className="inline-flex items-center gap-1 rounded px-2.5 py-2" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }} aria-label={t.switchToLabel} title={t.switchToLabel}>
            <Globe className="h-3.5 w-3.5" />
            {t.switchTo}
          </Link>
          <Link href={freeHref} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {t.ctaFree}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="ml-auto grid h-10 w-10 place-items-center rounded lg:hidden"
          style={{ border: `1px solid ${accent24}`, color: "var(--color-text)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full lg:hidden" style={{ background: "var(--nz-page)", borderTop: `1px solid ${accent20}` }}>
          <div className="mx-auto max-w-[1360px] space-y-1 px-4 py-4 sm:px-7">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded px-3 py-2.5" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text)" }} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              <Link href={freeHref} className="btn btn-primary btn-block" style={{ padding: "10px", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }} onClick={() => setMobileOpen(false)}>
                {t.ctaFreeShort}
              </Link>
            </div>
            <Link href={toggleHref} className="mt-1 flex items-center justify-center gap-1.5 rounded py-2.5" style={{ border: `1px solid ${accent20}`, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }} onClick={() => setMobileOpen(false)} aria-label={t.switchToLabel}>
              <Globe className="h-4 w-4" />
              {t.switchToLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

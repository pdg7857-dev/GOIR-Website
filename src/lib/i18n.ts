/**
 * Lightweight bilingual support (English + Quebec French). The site is English
 * by default; French versions of the core conversion pages live under /fr with
 * the same slug (for example /free-opportunities and /fr/free-opportunities), so
 * the language toggle is a simple prefix swap. Pages without a French version
 * fall back to the French home. Deep content (blog, platform/industry articles)
 * stays English for now.
 */
export type Locale = "en" | "fr";

/** English paths that have a hand-translated French counterpart under /fr. */
export const TRANSLATED_PATHS = new Set<string>([
  "/",
  "/free-opportunities",
]);

export function localeFromPath(pathname: string): Locale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

/** Strip the /fr prefix to get the English path. */
export function toEnPath(pathname: string): string {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3);
  return pathname;
}

/** Map an English path to its French counterpart, or the French home if none. */
export function toFrPath(pathname: string): string {
  if (!TRANSLATED_PATHS.has(pathname)) return "/fr";
  return pathname === "/" ? "/fr" : `/fr${pathname}`;
}

/** Shared chrome strings used by the header and footer. */
export const dict = {
  en: {
    langName: "English",
    switchTo: "FR",
    switchToLabel: "Lire en français",
    ctaFree: "Get free opportunities",
    ctaFreeShort: "Free opportunities",
    ctaBook: "Book a call",
    navHome: "Home",
    navFree: "Free opportunities",
  },
  fr: {
    langName: "Français",
    switchTo: "EN",
    switchToLabel: "Read in English",
    ctaFree: "Obtenez des opportunités gratuites",
    ctaFreeShort: "Opportunités gratuites",
    ctaBook: "Réserver un appel",
    navHome: "Accueil",
    navFree: "Opportunités gratuites",
  },
} as const;

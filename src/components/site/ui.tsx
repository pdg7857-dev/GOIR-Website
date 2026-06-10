import Link from "next/link";
import { ChevronRight, BadgeCheck } from "lucide-react";
import { SOCIAL_PROOF, SITE, BACKGROUND } from "@/lib/site/config";

/**
 * Inline credential badge. Replaces the old star rating, which borrowed reviews
 * from a different service at a former employer. This states only what I did:
 * the anonymized account-handling background from POSITIONING.md.
 */
export function CredentialBadge({ className = "", lg = false }: { className?: string; lg?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BadgeCheck className={`text-accent ${lg ? "h-5 w-5" : "h-4 w-4"}`} />
      <span className={`text-fg-muted ${lg ? "text-base" : "text-sm"}`}>
        <span className="font-semibold text-fg">{BACKGROUND.accountsHandled} contractor accounts</span>{" "}
        handled across Canada and the US
      </span>
    </span>
  );
}

export function Section({
  children,
  className = "",
  muted = false,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  dark?: boolean;
}) {
  const bg = dark ? "bg-bg text-fg" : muted ? "bg-bg-subtle" : "bg-bg";
  return (
    <section className={`${bg} ${className}`}>
      <div className="container py-16 sm:py-20">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "text-accent" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl font-semibold sm:text-4xl ${dark ? "text-fg" : "text-fg"}`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-lg leading-8 ${dark ? "text-fg-muted" : "text-fg-muted"}`}>
          {lede}
        </p>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-fg-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="hover:text-accent">
                {it.name}
              </Link>
            ) : (
              <span className="text-fg">{it.name}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-fg-subtle" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Coverage-facts strip (verifiable numbers only; never fabricated). */
export function StatStrip({ dark = false }: { dark?: boolean }) {
  const items = SOCIAL_PROOF.slice(0, 4);
  return (
    <div className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4 ${dark ? "border-white/10 bg-white/10" : "border-border bg-border"}`}>
      {items.map((s) => (
        <div key={s.label} className={`${dark ? "bg-bg" : "bg-bg-panel"} p-5 text-center`}>
          <div className={`text-2xl font-bold tabular-nums ${dark ? "text-fg" : "text-fg"}`}>
            {s.value ?? s.placeholder}
          </div>
          <div className={`mt-1 text-xs leading-snug ${dark ? "text-fg-subtle" : "text-fg-muted"}`}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Final call-to-action band used at the bottom of most pages. */
export function CtaBand({
  title,
  sub,
  lang = "en",
}: {
  title?: string;
  sub?: string;
  lang?: "en" | "fr";
}) {
  const fr = lang === "fr";
  const heading = title ?? (fr ? "Voyez ce qui vous échappe, gratuitement." : "See what you are missing, free.");
  const subtext =
    sub ??
    (fr
      ? "Dites-moi votre métier et où vous soumissionnez, et je vous enverrai une courte liste d'opportunités réelles et qualifiées que vous n'avez pas trouvées. Sans frais, sans engagement."
      : "Tell me your trade and where you bid, and I'll send you a short list of real, qualified opportunities you have not found. No cost, no obligation.");
  const freeHref = fr ? "/fr/free-opportunities" : "/free-opportunities";
  return (
    <section className="bg-bg">
      <div className="container py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg-panel to-bg px-6 py-12 text-center sm:px-12">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold text-fg sm:text-4xl">{heading}</h2>
            <p className="mt-4 text-lg leading-8 text-fg-muted">{subtext}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={freeHref} className="btn-gold px-6 py-3 text-base">
                {fr ? "Obtenez des opportunités gratuites" : "Get free opportunities"}
              </Link>
              <Link href={SITE.bookingUrl} className="btn-ghost border-white/20 bg-white/5 px-6 py-3 text-base text-fg hover:border-white/40 hover:text-fg">
                {fr ? "Réserver un appel" : "Book a discovery call"}
              </Link>
            </div>
            <p className="mt-4 text-sm text-fg-subtle">
              {fr
                ? "Gratuit, sans engagement. J'apporte de vraies opportunités dans votre métier et vos territoires."
                : "Free, no obligation. I'll bring real opportunities in your trade and jurisdictions."}
            </p>
            <div className="mt-5 flex justify-center">
              <CredentialBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      {Icon && (
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-fg-muted">{children}</p>
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs font-medium text-fg-muted">
      {children}
    </span>
  );
}

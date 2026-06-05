import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page is not here. Let me point you back to the platforms I monitor, the industries I serve, the coverage map, or a discovery call.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-bg-panel">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-4xl font-bold text-fg sm:text-5xl">
          I could not find that page
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-fg-muted">
          The link may be old, or I may have moved things around. Nothing is lost.
          Let me point you to the parts of the site people use most. If you were
          looking for something specific, tell me and I will track it down for you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/book" className="btn-primary">
            Book a discovery call
          </Link>
          <Link href="/platforms" className="btn-ghost">
            Platforms I monitor
          </Link>
          <Link href="/industries" className="btn-ghost">
            Industries I serve
          </Link>
          <Link href="/coverage" className="btn-ghost">
            Coverage map
          </Link>
        </div>

        <p className="mt-8 text-sm text-fg-muted">
          Or head back to the{" "}
          <Link href="/" className="font-semibold text-accent underline">
            home page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

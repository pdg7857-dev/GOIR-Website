import Link from "next/link";
import { CalendarCheck, Mail, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site/config";

type Variant = "call" | "sample" | "guide";

const HEADINGS: Record<Variant, { title: string; sub: string }> = {
  call: {
    title: "Book a discovery call",
    sub: "Tell me where you bid and what you chase. I'll come to the call with real opportunities you can see, already found and qualified.",
  },
  sample: {
    title: "See a real opportunity",
    sub: "Book a short call and I'll bring a live opportunity in your trade and jurisdiction, reviewed and qualified the way I do it for clients.",
  },
  guide: {
    title: "Let's talk",
    sub: "Book a quick call, or email me directly, I read every message myself and reply personally.",
  },
};

/**
 * Booking-first contact card. Replaces the old placeholder form (which collected
 * details but submitted nowhere) with a direct path to the calendar + email, so
 * no inbound interest is ever lost.
 */
export function LeadForm({
  variant = "call",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const copy = HEADINGS[variant];
  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <h3 className="text-xl font-semibold text-fg">{copy.title}</h3>
      <p className="mt-1.5 text-sm text-fg-muted">{copy.sub}</p>

      <Link href={SITE.bookingUrl} className="btn-primary mt-6 w-full py-3 text-base">
        <CalendarCheck className="h-4 w-4" />
        Book a meeting
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="h-px flex-1 bg-border" />
        <span className="text-fg-subtle">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <a
        href={`mailto:${SITE.email}`}
        className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-raised py-2.5 text-sm font-medium text-fg transition hover:border-accent/50 hover:text-accent"
      >
        <Mail className="h-4 w-4" />
        Email me directly
      </a>

      <p className="mt-3 text-center text-xs text-fg-subtle">
        No spam, no list-selling. Your details come straight to me.
      </p>
    </div>
  );
}

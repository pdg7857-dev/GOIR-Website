import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { PLANS, GUARANTEE, type Plan } from "@/lib/site/pricing";
import { SITE } from "@/lib/site/config";

export function PricingTables() {
  return (
    <div>
      {/* Qualified Opportunity Guarantee */}
      <div className="mx-auto mb-10 flex max-w-3xl flex-col gap-4 rounded-2xl border border-accent/40 bg-bg-panel p-6 ring-1 ring-accent/30 sm:flex-row sm:items-start">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{GUARANTEE.title}</p>
          <p className="mt-1.5 text-sm leading-6 text-fg-muted">{GUARANTEE.body}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((p) => (
          <PlanCard key={p.name} plan={p} />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-fg-muted">
        Paid plans are a <span className="font-semibold text-fg">12-month commitment, billed monthly</span>. It
        takes a full year to catch your complete opportunity cycle, annual renewals and the seasonal
        bids that only come around once.
      </p>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        plan.featured
          ? "border-accent bg-bg-panel shadow-lift ring-1 ring-accent"
          : "border-border bg-bg-panel shadow-card"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-fg">
          Most popular
        </span>
      )}
      <h3 className="text-base font-semibold text-fg">{plan.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-fg-muted">{plan.scope}</p>
      <div className="mt-4 flex items-baseline gap-1">
        {plan.startingAt && <span className="text-sm text-fg-muted">from</span>}
        <span className="text-3xl font-bold text-fg">{plan.price}</span>
        {plan.priceNote && <span className="text-sm text-fg-muted">{plan.priceNote}</span>}
      </div>
      <p className="mt-1 text-xs font-medium text-fg-subtle">
        {plan.custom ? "Tailored scope & terms" : "12-month commitment"}
      </p>
      <p className="mt-3 text-sm leading-6 text-fg-muted">{plan.blurb}</p>
      <ul className="mt-5 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm text-fg-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={SITE.bookingUrl}
        className={`mt-6 w-full ${plan.featured ? "btn-primary" : "btn-ghost"} py-2.5`}
      >
        {plan.custom ? "Talk to me" : "Start with this plan"}
      </Link>
    </div>
  );
}

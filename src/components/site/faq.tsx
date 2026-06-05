"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type Faq = { q: string; a: string };

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-panel">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-fg">{f.q}</span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-accent" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-fg-subtle" />
              )}
            </button>
            {isOpen && (
              <div className="px-6 pb-6 -mt-1 text-[0.975rem] leading-7 text-fg-muted">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

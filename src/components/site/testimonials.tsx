import { Quote } from "lucide-react";
import { RATING, TESTIMONIALS } from "@/lib/site/testimonials";
import { Section, SectionHead, Stars, RatingBadge } from "@/components/site/ui";

// Re-export the shared primitives so pages can import them from here too.
export { Stars, RatingBadge };

/** Full testimonials section for the home page. */
export function TestimonialsSection() {
  return (
    <Section>
      <SectionHead center eyebrow="Client reviews" title={`Rated ${RATING.score.toFixed(1)} out of 5`} />
      <div className="mx-auto mt-4 flex flex-col items-center gap-2">
        <Stars className="h-6 w-6" />
        <p className="text-sm text-fg-muted">
          From {RATING.count} contractors I have worked with in government opportunity intelligence.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <figure key={t.quote} className="card flex flex-col p-6">
            <Quote className="h-6 w-6 text-accent/60" />
            <blockquote className="mt-3 flex-1 text-lg leading-7 text-fg">{t.quote}</blockquote>
            <figcaption className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-fg-muted">{t.attribution}</span>
              <Stars />
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

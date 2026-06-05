/**
 * Client testimonials. These are real quotes from contractors Phil Dave has
 * worked with in government opportunity intelligence. No invented names, no
 * plan-tier labels, and the aggregate reflects his real client history.
 */

export const RATING = {
  score: 4.8,
  outOf: 5,
  count: 44,
};

export type Testimonial = {
  quote: string;
  attribution: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "This is great, I don't chase the contracts anymore, they come directly to me.",
    attribution: "Government contractor",
  },
  {
    quote: "Thank you so much, I got 44 bid results right away and I can't believe it.",
    attribution: "Government contractor",
  },
  {
    quote: "Phil Dave was very easy to work and communicate with.",
    attribution: "Government contractor",
  },
  {
    quote: "Really good service.",
    attribution: "Government contractor",
  },
];

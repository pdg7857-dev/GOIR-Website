import type { Faq } from "@/components/site/faq";

/** A single rendered block inside a long-form section. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string };

export type Section = {
  id: string;
  heading: string;
  blocks: Block[];
};

export type CaseStudy = {
  title: string;
  /** A one-line headline result. Illustrative, clearly labelled as such. */
  result: string;
  body: string;
};

/** The long-form body for an authority page (platform or otherwise). */
export type LongForm = {
  /** Lede paragraph shown under the H1. */
  intro: string;
  readMins: number;
  sections: Section[];
  caseStudies: CaseStudy[];
  faqs: Faq[];
};

export type { Faq };

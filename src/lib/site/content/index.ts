import type { LongForm, Section } from "./types";
import { PLATFORM_FACTS, type PlatformFacts } from "./platform-facts";
import { CORNERSTONE_CONTENT } from "./cornerstones";
import { getPlatform } from "../platforms";

/**
 * Build a complete long-form body for a platform from its structured facts.
 * Cornerstone platforms can override this with hand-authored depth, but every
 * platform gets a genuine, platform-aware page from the same model.
 */
function buildFromFacts(slug: string): LongForm {
  const p = getPlatform(slug)!;
  const f: PlatformFacts = PLATFORM_FACTS[slug];
  const name = p.name;

  const sections: Section[] = [
    {
      id: "overview",
      heading: `What ${name} is`,
      blocks: [
        { type: "p", text: f.whatItIs },
        {
          type: "p",
          text: `Here is the honest part most people skip: ${name} is very good at being a system of record. It is not built to make a bid/no-bid decision for you. It shows you that something exists. Whether that something is worth an estimator's afternoon is a separate judgment, and that judgment is the whole job I do.`,
        },
        {
          type: "callout",
          text: `Platforms like ${name} provide data. I provide intelligence. The gap between the two is where most winnable work quietly slips away.`,
        },
      ],
    },
    {
      id: "who-uses-it",
      heading: `Who posts on ${name}`,
      blocks: [
        { type: "p", text: `The buyers you care about on ${name} tend to be:` },
        { type: "ul", items: f.whoUses },
        {
          type: "p",
          text: `That mix matters. Each buyer type writes scope a little differently, files under different categories, and runs on its own calendar. A contractor watching ${name} casually sees a flat list of notices. What is really there is a dozen different buying behaviours layered on top of each other, and knowing them is how you stop missing the work meant for you.`,
        },
      ],
    },
    {
      id: "categorization",
      heading: `How opportunities are categorized on ${name}`,
      blocks: [
        { type: "p", text: f.categorization },
        {
          type: "p",
          text: `This is the single most underrated thing about ${name}. The category and title are chosen by a buyer who is describing the work in their words, not yours. If the way you search does not match the way they file, the opportunity is effectively invisible to you, even though it is sitting right there in plain sight.`,
        },
      ],
    },
    {
      id: "alert-limitations",
      heading: `The limits of ${name} alerts`,
      blocks: [
        {
          type: "p",
          text: `${name} alerts are useful, and they are not enough. Here is where they fall short for a working contractor:`,
        },
        { type: "ul", items: f.alertLimits },
        {
          type: "p",
          text: `None of this is a knock on the platform. An alert is a tripwire, and a tripwire cannot read a forty-page document or weigh it against your shop's capacity. That is a human job, and it is the one I do every day.`,
        },
      ],
    },
    {
      id: "search-keyword-limitations",
      heading: `Search and keyword limitations`,
      blocks: [
        { type: "p", text: `When alerts miss something, most contractors fall back on search. Search has its own blind spots on ${name}:` },
        { type: "ul", items: f.searchLimits },
        {
          type: "p",
          text: `Keywords are a guess at how a buyer described the work. Sometimes you guess right. Often the bid that fits you best is titled in language you would never type into a search box, which is exactly how good opportunities go unbid.`,
        },
      ],
    },
    {
      id: "how-contractors-miss",
      heading: `How contractors miss opportunities on ${name}`,
      blocks: [
        { type: "p", text: `Put the alert and search limits together and a pattern emerges. Contractors miss work on ${name} because:` },
        {
          type: "ol",
          items: [
            `The bid is filed under a category or title their saved search never covers. ${f.missTitleExample}`,
            "The notice does reach them, but it lands in a flood of irrelevant alerts and gets skimmed past.",
            "They see the title, assume it is not a fit, and never open the documents where the real scope lives.",
            "An addendum quietly changes the scope or moves the closing date after the first look.",
            "A mandatory site meeting or registration step is buried deep in the documents and missed until it is too late.",
          ],
        },
        {
          type: "p",
          text: `Every one of these is preventable. None of them is prevented by logging in more often. They are prevented by someone reading carefully, on your behalf, every day.`,
        },
      ],
    },
    {
      id: "how-i-help",
      heading: `How I complement ${name}`,
      blocks: [
        {
          type: "p",
          text: `I do not replace ${name}. I sit on top of it and do the part it was never meant to do. Specifically:`,
        },
        { type: "ul", items: f.howPhilHelps },
        {
          type: "p",
          text: `The result is simple. Instead of another inbox to triage, you get a short list of opportunities that actually fit, each one already read, qualified and linked back to the source on ${name}. Your estimators price. Your proposal team writes. Nobody spends a morning deciding whether a notice is even worth opening.`,
        },
      ],
    },
  ];

  const caseStudies = [
    {
      title: "The mis-titled fit",
      result: "A core project, found under a title the client would never have searched.",
      body: `${f.missTitleExample} The client's own keyword alerts on ${name} never surfaced it. Reading the documents the way buyers file them put it on their desk with time to spare. (Illustrative example.)`,
    },
    {
      title: "The week back",
      result: "Estimator hours redirected from triage to bids they could win.",
      body: `Before working with me, the client's estimator spent the better part of a day each week logging into ${name} and other portals, opening documents and clearing alerts. That time now goes to pricing real opportunities, because the triage is done before anything reaches them. (Illustrative example.)`,
    },
  ];

  const faqs = [
    {
      q: `Do I still need my own ${name} account?`,
      a: `Usually yes, and that is fine. ${name} stays your system of record and the place you ultimately act. I work alongside it: I monitor, read and qualify, then hand you the opportunity with a direct link back to ${name} so you can move on it.`,
    },
    {
      q: `Can you really catch what my ${name} alerts miss?`,
      a: `That is the entire point. Alerts fire on the codes and keywords you set. I watch the way buyers actually file and title work, read the documents, and judge fit. The bids that slip through a keyword net are exactly the ones I am looking for.`,
    },
    {
      q: `How quickly will I see ${name} opportunities?`,
      a: `On a discovery call I will already have looked at ${name} in your jurisdictions, so you see real examples before you pay anything. Once we start, opportunities reach you on a steady cadence as they post and close.`,
    },
    {
      q: `Is this a ${name} consulting or training service?`,
      a: `No. I am not here to teach you to use ${name}. I do the monitoring, reading and qualifying for you, as an ongoing service, so your team spends its time bidding rather than searching.`,
    },
  ];

  const intro = `${p.oneLiner} I know ${name} the way you know your trade, which means I know exactly where its opportunities live, how they are categorized, and how good fits slip past the contractors who rely on it alone. Here is how ${name} really works, where it leaves money on the table, and how I close that gap.`;

  return { intro, readMins: 9, sections, caseStudies, faqs };
}

/** Public accessor used by the platform page. */
export function getPlatformLongForm(slug: string): LongForm | null {
  // Cornerstone platforms have hand-authored deep bodies that take precedence.
  if (CORNERSTONE_CONTENT[slug]) return CORNERSTONE_CONTENT[slug];
  if (!PLATFORM_FACTS[slug]) return null;
  return buildFromFacts(slug);
}

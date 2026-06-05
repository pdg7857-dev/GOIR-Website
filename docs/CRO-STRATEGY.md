# Conversion Rate Optimization Strategy

The site has three conversion goals, ranked. Every page should move a visitor toward the highest one they are ready for, and offer a lower-friction step for everyone who is not yet ready. Nothing on the site should be a dead end.

## The three conversion paths

| Priority | Goal | Route | Friction | Who it is for |
| --- | --- | --- | --- | --- |
| 1 | Book a discovery call | `/book` | High (time commitment) | Solution-aware visitors ready to evaluate working together |
| 2 | Request a sample opportunity | `/sample-opportunity` | Medium (gives an email, gets proof) | Skeptical or comparison-stage visitors who want to see the work before talking |
| 3 | Join the email list | `/resources` (lead magnets) | Low (just an email) | Early-stage visitors building trust over time |

The funnel logic: a low-friction conversion today (sample or lead magnet) earns the email address that nurtures toward the high-friction conversion (the call) later. A visitor who is not ready to book should never leave without entering the funnel.

## The two core offers

### The discovery-call offer (`/book`)

This is the primary CTA across the whole site. The offer is a no-obligation conversation in which Phil learns the contractor's trade, geography, and capacity, and explains exactly what he would watch and qualify for them. Position it as consultative, not a sales pitch: the call itself delivers value (the contractor leaves knowing where their winnable work is hiding). The `bookingUrl` in `config.ts` points to `/book`, which falls back to a contact form until wired to a real calendar; keep the form short (name, email, trade, region, one free-text line).

### The sample-opportunity offer (`/sample-opportunity`)

The signature proof asset and the secondary CTA. The offer: tell Phil your trade and region, and he sends back a real, current opportunity he found, read, and qualified for fit, with his notes on why it matches and what to watch in the documents. This converts skeptics because it demonstrates the actual product rather than describing it. It is the ideal CTA on platform and industry pages, where a visitor is researching and a concrete example proves the value instantly. It captures an email and warms the lead toward the call.

## The opportunity cost calculator as a CRO tool

`/tools/opportunity-cost-calculator` is an interactive instrument, not just content. Its CRO job is to make the cost of the status quo (missing bids, hours lost searching portals) tangible in the visitor's own numbers. A contractor who has just calculated that they are leaving real revenue on the table is primed to act.

- Place a clear CTA at the end of the calculation: "That is what missing the work costs. Let me make sure you stop missing it" leading to `/book`, with `/sample-opportunity` as the softer option.
- Gate the detailed or downloadable version behind an email to feed Goal 3 (the calculator doubles as the "Government Bid Cost Calculator" lead magnet, see the lead-magnet strategy).
- Link to the calculator from pricing and the intelligence page, where prospects are weighing cost.

## Trust elements

Trust is the constraint on conversion for a service sold by one named person. Reinforce it everywhere:

- **A named operator.** Phil is on the about page, in the first-person voice across the site, and as the author of blog posts. People buy judgment from a person, not a tool.
- **Demonstrated expertise.** The depth of the platform pages (how each system really works, where bids slip past) is itself a trust signal: only an operator who does this work could write them.
- **The sample opportunity** is the strongest trust element because it is proof, not a claim.
- **Honest social proof.** The `SOCIAL_PROOF` placeholders in `config.ts` are intentionally null until backed by verified figures. Do not fabricate numbers. Fill them with real counts before launch and let the genuine breadth (18 platforms, 12 industries, 50 states, 13 provinces and territories) carry weight.
- **Specificity over hype.** Real platform names, real procurement systems per jurisdiction, and real document gotchas read as expertise and build more trust than superlatives.

## Form strategy

- **Ask for the minimum that lets Phil respond well.** The sample-opportunity form needs trade, region, and email. The booking form needs the same plus a preferred time or a free-text note.
- **One primary field group, no multi-step walls** for the low-friction offers. Friction kills the secondary and tertiary conversions.
- **Set expectations at the form.** State what happens next ("I will reply within one business day with a real opportunity for your trade") so the submit feels safe.
- **Confirmation that continues the funnel.** After a lead-magnet or sample request, the thank-you state should invite the next step (book a call) rather than ending the journey.

## Objection handling

| Objection | Where to address it | Response built into the page |
| --- | --- | --- |
| "Can't I just set up alerts myself?" | `/government-opportunity-intelligence`, `/how-it-works` | Alerts are a fire hose with no judgment; intelligence is monitoring plus document review plus fit qualification. |
| "Is my trade / region even covered?" | `/industries/[slug]`, `/coverage/[...]` | Dedicated pages for all 12 industries, 13 provinces and territories, and 50 states. |
| "How do I know it works?" | `/sample-opportunity` | A real, qualified opportunity sent before any commitment. |
| "What does it cost?" | `/pricing`, the calculator | Transparent pricing and a calculator that frames cost against the cost of missing work. |
| "Who is this person?" | `/about`, sitewide first-person voice | A named operator with years in government procurement. |

## Page-level CTA placement

A simple, consistent pattern keeps the path clear:

- **Hero CTA on every page:** primary button to `/book`, secondary ghost button to `/sample-opportunity`.
- **Mid-page contextual CTA** on long pages (platform and industry bodies): a soft inline prompt to request a sample, placed right after the "where bids slip past" section, when the pain is most felt.
- **Closing CTA band** on every page (the shared `CtaBand` component): the primary call to action repeated, so a reader who scrolls to the end always has the next step in front of them.
- **Calculator and lead-magnet CTAs** at the natural decision points (end of the calculator, within resource and blog content).
- **Sitewide footer** carries "Book a discovery call" and "Request a sample opportunity" so the conversion routes are always one click away regardless of where the visitor is.

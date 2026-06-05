/**
 * Long-form bodies for blog posts.
 *
 * A small set of high-value slugs get genuinely deep, hand-written articles
 * (DEEP_BODIES). Every other slug gets a substantial, useful body generated
 * from the topic's title, category and excerpt (buildGeneratedBody) so that no
 * page is ever thin or empty.
 *
 * Voice: first-person Phil. Phil finds, monitors and qualifies opportunities.
 * He does not write proposals or submit bids.
 */

import type { Faq } from "@/components/site/faq";
import type { Section } from "./types";
import type { BlogTopic } from "@/lib/site/blog";

export type BlogBody = {
  /** Estimated read time in minutes. */
  readMins: number;
  /** Long-form sections rendered through LongFormBody. */
  sections: Section[];
  /** Post-specific FAQ rendered above the closing CTA. */
  faqs: Faq[];
  /** Optional related cross-links (paths under /platforms or /industries). */
  related?: { label: string; href: string }[];
  /** Which lead-form variant to close with. */
  leadVariant: "call" | "sample" | "guide";
};

/* ------------------------------------------------------------------ Deep bodies */

export const DEEP_BODIES: Record<string, BlogBody> = {
  "merx-complete-guide": {
    readMins: 11,
    leadVariant: "call",
    related: [
      { label: "MERX expert", href: "/merx-expert" },
      { label: "Ontario government contracts", href: "/blog/ontario-government-contracts-guide" },
      { label: "Construction opportunities", href: "/construction-government-contracts" },
    ],
    sections: [
      {
        id: "what-merx-is",
        heading: "What MERX actually is (and is not)",
        blocks: [
          {
            type: "p",
            text: "MERX is the largest tender aggregation service in Canada. It pulls together opportunities from federal departments, provinces, municipalities, broader public sector bodies and a long tail of agencies that have chosen it as their posting home. For a lot of Canadian buyers it is the default place to publish, which is exactly why so many vendors treat it as the front door to government work.",
          },
          {
            type: "p",
            text: "Here is the part most people get wrong. MERX is an aggregator, not the source. It is excellent at breadth, but it does not carry every opportunity, and the way it ingests and categorizes postings from hundreds of different buyers is uneven. Two postings for nearly identical work can land under different categories, with different keywords, on different days. If you treat MERX as the whole picture, you will miss things, and you will miss them quietly.",
          },
          {
            type: "callout",
            text: "I treat MERX as the single most important Canadian source, never as the only one. It catches the majority of opportunities for most trades, but the gaps are real and they are predictable once you know where to look.",
          },
        ],
      },
      {
        id: "how-postings-are-organized",
        heading: "How postings are organized, and why that trips people up",
        blocks: [
          {
            type: "p",
            text: "MERX organizes opportunities by category and by the codes a buyer attaches when they post. The trouble is that the buyer chooses those codes, and buyers are inconsistent. A facilities maintenance contract might be tagged under building services by one municipality and under janitorial or general construction by the next. If your notification profile only watches one of those, you never see the other.",
          },
          {
            type: "p",
            text: "On top of category drift, the search itself rewards exact wording. A bid for snow and ice management reads very differently from one titled winter maintenance services, even though you would happily do both. The portal does not know they are the same to you. That is the core limitation of any keyword-driven system, and it is why I qualify by intent rather than by matching strings.",
          },
          {
            type: "h3",
            text: "The three layers I watch on every MERX search",
          },
          {
            type: "ul",
            items: [
              "Category and code coverage, set wide enough that adjacent tagging does not hide a relevant posting.",
              "Title and description language, read for intent rather than exact-match keywords.",
              "Buyer and jurisdiction, so I can cross-check against the agencies I know post elsewhere too.",
            ],
          },
        ],
      },
      {
        id: "notification-blind-spots",
        heading: "Where the default notifications let bids slip past",
        blocks: [
          {
            type: "p",
            text: "Most vendors set up a MERX notification profile once, choose a few categories, and trust it. Then they wonder why a competitor down the road won work they never saw. The notification engine only fires on the categories and codes you selected, against the codes the buyer happened to use. Every mismatch between those two is a silent miss. Nothing bounces, nothing flags, the opportunity simply never reaches you.",
          },
          {
            type: "p",
            text: "There is also a timing problem. Amendments and addenda change scope, deadlines and mandatory requirements after a bid posts. If you are not tracking the document set on every opportunity you care about, you can prepare against a scope that no longer exists. I track changes on everything I am watching for a client, so a late addendum is news the day it lands, not a surprise the week the bid closes.",
          },
          {
            type: "callout",
            text: "A notification profile is a starting point, not a strategy. The opportunities that hurt most are the ones a profile was never configured to catch, because you never knew they were missing.",
          },
        ],
      },
      {
        id: "how-i-read-a-merx-posting",
        heading: "How I read a MERX posting before recommending a bid",
        blocks: [
          {
            type: "p",
            text: "When a posting clears my monitoring and looks relevant, I do not hand it over and call it a lead. I read the documents the way an evaluator will, and I qualify fit before it ever reaches you. That review follows the same order every time.",
          },
          {
            type: "ol",
            items: [
              "Mandatory requirements first. These are pass or fail. If you cannot prove a mandatory, nothing else matters and I say so up front.",
              "Scope of work. What is actually being bought, at what volume, over what term, and whether it matches the work you want more of.",
              "Evaluation criteria. How the bid is scored, so I can judge whether you can realistically place high enough to win, not just submit.",
              "Bonding, insurance and certifications. The thresholds that quietly eliminate bidders before a single price is compared.",
              "Term and recompete signals. Whether this is a one-off or the kind of multi-year work, or standing offer, worth real effort.",
            ],
          },
          {
            type: "p",
            text: "Only after that do I form a view on whether the opportunity is a go or a no-go for you. Plenty of relevant-looking postings come back as a clear no, and that is the point. Knowing what to skip protects the time you would otherwise spend chasing work you were never positioned to win.",
          },
        ],
      },
      {
        id: "merx-and-the-rest",
        heading: "MERX inside a wider monitoring setup",
        blocks: [
          {
            type: "p",
            text: "For clients bidding in Canada, MERX anchors the coverage but it never stands alone. Ontario work also flows through Biddingo and a long list of municipal portals on bids&tenders. Quebec lives on SEAO. Provinces run their own systems, and some buyers post only on their own sites. My job is to consolidate all of that into one reviewed feed so you see qualified opportunities, not a pile of portals to check by hand.",
          },
          {
            type: "p",
            text: "If you want to see how I handle MERX specifically, the dedicated guide goes deeper on the platform itself. And if you bid in Ontario, the provincial guide maps how MERX, Biddingo and the municipal layer fit together.",
          },
        ],
      },
      {
        id: "getting-the-most-from-merx",
        heading: "Getting the most out of MERX as a vendor",
        blocks: [
          {
            type: "p",
            text: "A few habits separate vendors who win work through MERX from those who keep wondering where it went. The first is keeping your supplier profile complete and current. MERX uses your profile to decide what to surface and to let buyers find you, so a thin or outdated profile quietly narrows the funnel before you ever search. The second is widening your notification categories well past the obvious one, because the cost of a few extra notices is nothing next to the cost of a missed bid that was tagged a category over.",
          },
          {
            type: "p",
            text: "The third habit is reading the document set, not just the summary. The posting page tells you the headline, but the requirements, the evaluation and the real scope live in the attachments. Plenty of bids that look perfect in the summary fall apart in the fine print, and plenty that look unremarkable turn out to be exactly the recurring work you want. I always go to the documents, because that is where the decision actually gets made.",
          },
          {
            type: "callout",
            text: "MERX rewards the vendors who treat it as a tool to work, not a feed to skim. A complete profile, wide categories and a genuine read of the documents will catch more, and qualify better, than any amount of casual checking.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is MERX free to use?",
        a: "You can browse and search a great deal on MERX without paying, and registering as a supplier is free. Paid tiers add notification features and access conveniences, but the bigger limitation is never the price, it is that any single portal, free or paid, only shows you part of the picture.",
      },
      {
        q: "Does MERX show every government opportunity in Canada?",
        a: "No. It is the largest aggregator and it catches the majority of opportunities for most trades, but provinces, municipalities and broader public sector bodies post in places MERX does not always reach. That is why I monitor it alongside the other sources your buyers use.",
      },
      {
        q: "Why do I miss opportunities even with MERX notifications turned on?",
        a: "Notifications only fire on the categories and codes you selected, against the codes the buyer happened to use. Every mismatch is a silent miss. I monitor by intent and read postings myself, so a posting tagged in an unexpected category still gets caught.",
      },
    ],
  },

  "how-to-qualify-a-government-bid": {
    readMins: 10,
    leadVariant: "call",
    related: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Reading an RFP", href: "/blog/reading-an-rfp-what-matters" },
      { label: "When not to bid", href: "/blog/when-not-to-bid" },
    ],
    sections: [
      {
        id: "why-qualify-first",
        heading: "Why qualification comes before everything else",
        blocks: [
          {
            type: "p",
            text: "A proposal is expensive. Even a modest bid eats hours of your most senior people, and those hours come straight out of the work that already pays you. So the single most valuable thing I do is decide, before you spend any of that time, whether an opportunity is genuinely worth pursuing. Qualification is not paperwork. It is the gate that protects your capacity.",
          },
          {
            type: "callout",
            text: "The goal is not to bid more. It is to bid the work you can actually win, and to walk away from the rest early, while it is still cheap to walk away.",
          },
        ],
      },
      {
        id: "step-mandatories",
        heading: "Step one: clear the mandatory requirements",
        blocks: [
          {
            type: "p",
            text: "Mandatory requirements are pass or fail. Miss one and the most beautiful proposal in the world gets set aside unread. So this is always where I start. I pull every mandatory out of the document, including the ones buried in appendices and referenced standards, and I check each one against what you can actually prove on paper.",
          },
          {
            type: "p",
            text: "Common mandatories that quietly disqualify bidders include minimum years in business, specific certifications, licensing in the jurisdiction, bonding capacity, insurance limits, and reference projects of a defined size or recency. If you cannot meet one and it is not waivable, the qualification ends here and I tell you plainly. That is a good outcome, not a failure. You just got hours of your week back.",
          },
        ],
      },
      {
        id: "step-scope",
        heading: "Step two: read the scope for genuine fit",
        blocks: [
          {
            type: "p",
            text: "A posting can match your trade on paper and still be wrong for you. The scope of work tells the real story: the volume, the term, the locations, the service levels, the response times. I read it asking one question on your behalf, is this the kind of work you want more of, delivered the way you can actually deliver it?",
          },
          {
            type: "ul",
            items: [
              "Volume and term: is this a one-off or the multi-year, recurring work that is worth real effort?",
              "Geography: are the locations inside the area you can serve profitably, not just technically reach?",
              "Service levels: are response times and performance standards ones you can hit without bleeding margin?",
              "Hidden scope: are there obligations tucked into the contract terms that change the true cost of the job?",
            ],
          },
        ],
      },
      {
        id: "step-evaluation",
        heading: "Step three: understand how you will be scored",
        blocks: [
          {
            type: "p",
            text: "Submitting is not the same as competing. The evaluation criteria tell you how the buyer will actually decide, and they vary enormously. Some contracts are lowest compliant price and nothing else. Others weight experience, methodology, team and references heavily, with price as a fraction of the score. I read the scoring scheme to judge whether you can realistically place high enough to win, not merely qualify to be considered.",
          },
          {
            type: "p",
            text: "This is also where I watch for red flags that a contract is wired for an incumbent: oddly specific requirements that only one firm could meet, reference criteria that mirror an existing contract a little too closely, or evaluation weightings that reward exactly what the current holder already does. None of that is provable, but the patterns are real, and they belong in an honest go or no-go.",
          },
        ],
      },
      {
        id: "step-go-no-go",
        heading: "Step four: the go or no-go",
        blocks: [
          {
            type: "p",
            text: "By this point I can give you a clear recommendation with the reasoning behind it. A go means the mandatories are clear, the scope fits, and the evaluation gives you a realistic path to winning. A no-go means one of those failed, and I tell you which one so the decision is yours to make with full information.",
          },
          {
            type: "ol",
            items: [
              "Can you meet every mandatory and prove it? If no, stop here.",
              "Does the scope match the work you want, at a volume and term that justify the effort?",
              "Does the evaluation give you a realistic path to win, not just to submit?",
              "Are there red flags suggesting the outcome is decided? If so, weigh them honestly.",
              "Is the expected value worth the hours this bid will cost your team?",
            ],
          },
          {
            type: "callout",
            text: "A disciplined no-go is worth as much as a good lead. Every bid you correctly decline frees the time and energy for one you can actually win.",
          },
        ],
      },
      {
        id: "hidden-disqualifiers",
        heading: "The disqualifiers hiding in the fine print",
        blocks: [
          {
            type: "p",
            text: "Some of the most expensive surprises are not in the obvious mandatory section at all. They are tucked into the terms and conditions, the appendices, and the standards a document references rather than spells out. Bonding capacity is the classic one: a contract size that needs a surety line larger than yours will write ends the conversation, no matter how good a fit the work is. Insurance limits work the same way, and so do requirements to carry specific coverage you do not currently hold.",
          },
          {
            type: "p",
            text: "Reference projects are another quiet gate. A buyer may require past work of a defined size, recency and type, and may require those references to be verifiable and contactable. If your strongest projects are a year too old or a little too small, you can be technically capable and still ineligible. I pull these requirements out into the open early, because finding one halfway through writing is the worst possible time to learn you never qualified.",
          },
          {
            type: "ul",
            items: [
              "Bonding and surety limits that exceed what your line will support.",
              "Insurance coverage types or limits you do not currently carry.",
              "Reference projects that must match a defined size, recency or scope.",
              "Jurisdiction-specific licensing or registration that takes time to obtain.",
              "Referenced standards and codes that add obligations the summary never mentions.",
            ],
          },
        ],
      },
      {
        id: "value-of-the-bid",
        heading: "Weighing the value against the cost of bidding",
        blocks: [
          {
            type: "p",
            text: "Even a bid you can win is not automatically worth winning. The last thing I weigh is the expected value of the work against what the pursuit will cost you. A small one-off contract that demands a heavy, complex proposal may simply not pay for the hours it takes to chase, while a less glamorous standing offer that feeds orders for years can be worth far more than its modest headline value suggests.",
          },
          {
            type: "p",
            text: "This is where qualification turns from a checklist into judgment. I bring you the facts: the requirements, the scope, the evaluation and the realistic odds. You bring the knowledge of your own margins and capacity. Together that produces a decision you can stand behind, rather than a reflex to bid everything that lands in the inbox. Over a year, that discipline is the difference between a team stretched thin across long shots and one focused on the work it can actually win.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Do you write the proposal once a bid is qualified?",
        a: "No. I find, monitor and qualify opportunities. I read the documents, check the requirements and give you a clear go or no-go with the reasoning. Writing and submitting the proposal stays with you and your team, where it belongs.",
      },
      {
        q: "How long does qualifying an opportunity take?",
        a: "The first gate, mandatory requirements, is usually fast and can rule a bid out in minutes. A full read for scope, evaluation and red flags takes longer, but it always costs far less than discovering the problem halfway through writing the proposal.",
      },
      {
        q: "What if I disagree with a no-go?",
        a: "It is your business and your call. I give you the reasoning, not a verdict. Plenty of clients choose to pursue a bid I flagged as marginal, and that is fine. The point is that you decide with full information rather than finding out the hard way.",
      },
    ],
  },

  "government-construction-contracts-guide": {
    readMins: 10,
    leadVariant: "sample",
    related: [
      { label: "Construction industry coverage", href: "/construction-government-contracts" },
      { label: "MERX guide", href: "/blog/merx-complete-guide" },
      { label: "Bid bonds and insurance", href: "/blog/understanding-bid-bonds-and-insurance" },
    ],
    sections: [
      {
        id: "where-construction-posts",
        heading: "Why construction is the hardest trade to monitor",
        blocks: [
          {
            type: "p",
            text: "Public construction work is posted across more portals than almost any other category, and that is not an accident. Every level of government builds: federal departments, provinces and states, cities, school boards, hospitals, transit authorities, utilities. Each tends to use its own posting home, and many use several. A single mid-size contractor might have relevant work appearing on MERX, BidNet Direct, a handful of bids&tenders municipal instances, Biddingo, a state system and two or three Bonfire portals in the same week.",
          },
          {
            type: "callout",
            text: "The fragmentation is the whole problem. No contractor has time to check a dozen portals every morning, so opportunities slip past not because the work is hidden, but because there are too many doors to watch by hand.",
          },
        ],
      },
      {
        id: "types-of-construction-work",
        heading: "The kinds of construction work hiding in the postings",
        blocks: [
          {
            type: "p",
            text: "Construction is not one category, it is many, and they are tagged inconsistently. Knowing the shapes the work takes helps me catch it regardless of how a buyer labelled it.",
          },
          {
            type: "ul",
            items: [
              "New build and major capital projects, often with prequalification stages before the bid even opens.",
              "Renovation, retrofit and tenant improvement work tucked under facilities or building services.",
              "Civil and infrastructure: roads, water, site work, frequently posted by transit and utility authorities.",
              "Standing offers and pre-qualified vendor lists for ongoing repair and small works.",
              "Trade-specific packages, where electrical, mechanical or roofing scopes are bid separately.",
            ],
          },
          {
            type: "p",
            text: "Each of these is found differently. A capital project announces itself with a prequalification notice months ahead. A standing offer for small works might post once and then quietly feed orders for years. I watch for all of them, because the recurring, less glamorous work is often where the steady margin lives.",
          },
        ],
      },
      {
        id: "qualifying-construction-bids",
        heading: "How I qualify a construction opportunity",
        blocks: [
          {
            type: "p",
            text: "Construction bids carry requirements that eliminate contractors before price is ever compared, so my qualification leans hard on the gating items first. I read for the things that decide whether you can even compete.",
          },
          {
            type: "ol",
            items: [
              "Bonding capacity. Bid, performance and labour and material payment bonds, and whether your surety can support the contract size.",
              "Insurance limits. Whether the required coverage matches what you carry, before the work goes any further.",
              "Prequalification. Many large projects require you to be prequalified before you can bid at all, on a separate timeline.",
              "Reference projects. Size, recency and type of past work, which often must mirror the project on offer.",
              "Trade certifications and licensing valid in the jurisdiction where the work sits.",
            ],
          },
          {
            type: "p",
            text: "Only once those gates are clear do I look at scope, schedule and the evaluation. A project can fit your capabilities perfectly and still be a no-go because the bonding requirement is twice what your surety will write, or because prequalification closed before the bid posted. Catching that early is exactly the point.",
          },
        ],
      },
      {
        id: "timing-and-prequalification",
        heading: "Timing, prequalification and reading ahead",
        blocks: [
          {
            type: "p",
            text: "Construction rewards lead time more than almost any trade. Capital programs telegraph themselves through budget documents, board approvals and prequalification notices long before the formal bid. By watching those pre-solicitation signals, I can tell you that work is forming while there is still time to position for it, rather than reacting to an RFP with a tight clock already running.",
          },
          {
            type: "p",
            text: "If you want the deeper view on the platforms most of this work flows through, the MERX guide is the place to start, and the construction industry page lays out how I cover the trade end to end.",
          },
        ],
      },
      {
        id: "subcontractor-vs-prime",
        heading: "Prime, sub or trade package: knowing your lane",
        blocks: [
          {
            type: "p",
            text: "A lot of public construction work is winnable two or three different ways, and qualifying an opportunity means understanding which lane is realistic for you. On a large capital project you might be the prime, but you might also be far better positioned as a subcontractor to whichever prime wins, or as the bidder on a trade package the owner has chosen to tender separately. Each of these is a different bid with different requirements, and the same project can be a no-go as a prime but a strong yes as a trade.",
          },
          {
            type: "p",
            text: "I read for this distinction because it changes everything downstream. A prime bid carries the full bonding, the full insurance and the coordination risk. A trade package narrows the scope to what you do best and often softens the gating requirements to match. When I qualify a construction opportunity, I am not just asking whether you can do the work, I am asking which way of pursuing it gives you the best odds for the least exposure.",
          },
          {
            type: "callout",
            text: "The biggest projects are rarely won the way they first appear. Often the smartest move is not the prime bid at all, but a trade package or a subcontract position that fits your shop without the full weight of the general contract.",
          },
        ],
      },
      {
        id: "construction-recompetes",
        heading: "Recurring works and the value of recompetes",
        blocks: [
          {
            type: "p",
            text: "Not all construction spending is one-off capital work. A large share of it is recurring: maintenance contracts, small-works standing offers, term agreements for repairs across a portfolio of buildings. These rarely make headlines, but they produce the steady, predictable revenue that keeps crews busy between the big jobs. Because they recur, they also come back around, and the award record often tells you roughly when.",
          },
          {
            type: "p",
            text: "When an opportunity like that is not right today, perhaps the term is wrong or the incumbent is entrenched, I flag it to revisit at the recompete rather than discard it. Construction rewards patience as much as speed: knowing a multi-year term contract reopens in eighteen months lets you position long before the bid posts. That forward view, combined with reading the pre-solicitation signals on capital work, is how I keep your pipeline full rather than reactive.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Which portals carry the most government construction work?",
        a: "In Canada, MERX, BidNet Direct, Biddingo and the bids&tenders municipal instances carry the bulk of it, with provincial systems on top. In the U.S., it is spread across state systems and local portals like PlanetBids, OpenGov and Bonfire. The right mix depends entirely on where you build.",
      },
      {
        q: "Do you help with prequalification submissions?",
        a: "I flag prequalification opportunities early and read the requirements so you know what is needed and by when. The submission itself is yours to prepare. My job is making sure the deadline never catches you by surprise.",
      },
      {
        q: "Can you tell me if a construction bid is worth pursuing?",
        a: "Yes. That is the core of what I do. I check bonding, insurance, prequalification and references first, then scope and evaluation, and I give you a clear go or no-go with the reasoning before you commit estimating hours.",
      },
    ],
  },

  "how-to-monitor-government-opportunities": {
    readMins: 9,
    leadVariant: "call",
    related: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Commodity codes explained", href: "/blog/commodity-codes-explained" },
      { label: "All platforms I monitor", href: "/platforms" },
    ],
    sections: [
      {
        id: "the-two-failure-modes",
        heading: "The two ways monitoring usually fails",
        blocks: [
          {
            type: "p",
            text: "Almost every monitoring setup I am asked to look at has failed in one of two directions. Either it sends too much, burying real opportunities under a daily flood of noise until nobody reads it, or it sends too little, quietly missing the work that did not happen to match a narrow set of keywords. Both feel like monitoring. Neither one actually catches the opportunities that matter.",
          },
          {
            type: "callout",
            text: "Good monitoring is not about volume in either direction. It is about surfacing the right opportunities, qualified, while keeping everything else out of your inbox.",
          },
        ],
      },
      {
        id: "why-keywords-fail",
        heading: "Why keyword and code matching is not enough",
        blocks: [
          {
            type: "p",
            text: "Portals route notifications using keywords and commodity codes. Both are imperfect in ways that cost you bids. Keywords reward exact wording: a search for snow removal does not fire on a posting titled winter maintenance services, even though you would bid both. Codes depend on the buyer choosing the right one, and buyers are inconsistent, so the same kind of work lands under different codes from one agency to the next.",
          },
          {
            type: "p",
            text: "This is why I never trust automated matching as the whole system. It is a useful first filter, nothing more. The opportunities that hurt most are the ones tagged in a way your filters were never built to catch, and no amount of keyword tuning fully closes that gap.",
          },
        ],
      },
      {
        id: "how-i-monitor",
        heading: "How I actually monitor",
        blocks: [
          {
            type: "p",
            text: "My approach combines wide automated coverage with human reading on top. The machine casts a deliberately wide net across every source your buyers use. Then I read, because intent is something a person judges and a keyword cannot.",
          },
          {
            type: "ol",
            items: [
              "Map your real footprint: the trades, the jurisdictions and the buyers that matter to you.",
              "Cast the net wide across every relevant portal, set broader than feels comfortable so adjacent tagging does not hide a posting.",
              "Read for intent, separating genuinely relevant opportunities from look-alikes the filters caught.",
              "Track changes: amendments and addenda on everything you care about, so a late scope change is news, not a surprise.",
              "Deliver qualified opportunities, not raw alerts, so what reaches you is already worth your attention.",
            ],
          },
        ],
      },
      {
        id: "amendments-matter",
        heading: "The part everyone forgets: amendments",
        blocks: [
          {
            type: "p",
            text: "Finding an opportunity once is not monitoring it. Bids change after they post. An addendum can move a deadline, alter the scope or add a mandatory requirement, and if you are working from the original documents, you can prepare against a bid that no longer exists. I track the document set on every opportunity I am watching for you, so changes surface the day they land.",
          },
          {
            type: "p",
            text: "If you want to understand why the portal landscape is so fragmented in the first place, and why one-portal monitoring will always leave gaps, the platforms overview lays out the full picture.",
          },
        ],
      },
      {
        id: "mapping-your-footprint",
        heading: "It starts with mapping your real footprint",
        blocks: [
          {
            type: "p",
            text: "Good monitoring is not a generic firehose pointed at every government portal. It is shaped to you. Before I watch anything, I map your real footprint: the trades you actually want more of, the jurisdictions you can serve profitably rather than just reach, and the specific buyers who tend to put out the kind of work you do. That map decides which of the eighteen-plus platforms matter to you and which are noise.",
          },
          {
            type: "p",
            text: "This is also where I learn the difference between the work you say you want and the work you actually win. Vendors often describe themselves more broadly than their results warrant, and a monitoring setup built on the broad description drowns them in marginal leads. Built on the real footprint, it stays tight and relevant. The map is the part that makes everything downstream work, and it is the part automated tools skip entirely.",
          },
          {
            type: "ul",
            items: [
              "The trades and service lines where you are genuinely competitive, not just capable.",
              "The geography you can serve at a margin that makes a contract worth winning.",
              "The buyers and agency types whose work fits your scale and capacity.",
              "The platforms and systems those buyers actually post on, which is a smaller set than the full landscape.",
            ],
          },
        ],
      },
      {
        id: "human-in-the-loop",
        heading: "Why a human still reads every relevant posting",
        blocks: [
          {
            type: "p",
            text: "Automation is essential for breadth. No person can refresh a dozen portals every morning, so the machine does the casting. But the machine cannot tell whether a posting genuinely fits you, only whether it matched a rule. That judgment, separating a real opportunity from a convincing look-alike, is what I do on top of the automation, and it is the part that turns a feed of alerts into a short list of qualified opportunities.",
          },
          {
            type: "p",
            text: "Reading also catches the things rules never could: the posting tagged in an unexpected category, the scope that technically matches your trade but is wrong for your operation, the buyer whose award history suggests the outcome is already decided. A keyword cannot weigh any of that. The combination, wide automated coverage plus a person who reads with your business in mind, is the only setup I have found that catches the right work without burying you in everything else.",
          },
          {
            type: "callout",
            text: "Automation decides what to look at. A human decides what is worth your time. Monitoring that skips the second step is just noise on a schedule.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I not just set up alerts myself?",
        a: "You can, and you should as a baseline. But portal alerts only fire on the categories and codes you select, against the codes a buyer happened to use. The gap between those two is where opportunities slip past silently. The value I add is wide coverage plus a human reading for intent on top of the automation.",
      },
      {
        q: "How many platforms do you monitor?",
        a: "More than eighteen, across Canada and the U.S., plus buyer-specific portals and state and provincial systems. The right set for you depends on your trade and where you bid. I consolidate whatever that mix is into one reviewed feed.",
      },
      {
        q: "Will I get flooded with notifications?",
        a: "No. The whole point is the opposite. The automation casts a wide net, but I read on top of it, so what reaches you is qualified opportunities rather than raw, unfiltered alerts.",
      },
    ],
  },
};

/* ------------------------------------------------------------- Generated bodies */

/**
 * Lightweight per-category framing used to generate a real, useful article for
 * any topic that does not have a hand-written deep body. The result is genuine
 * prose, not lorem ipsum: an intro plus several H2 sections plus a close.
 */
const CATEGORY_FRAMES: Record<
  string,
  { angle: string; whatIWatch: string; howIQualify: string; closing: string }
> = {
  Platforms: {
    angle:
      "is one more place your buyers post work, which means it is one more place opportunities can slip past while you are looking somewhere else.",
    whatIWatch:
      "I watch how this platform categorizes and notifies, where its coverage overlaps with the bigger aggregators, and where it carries work that nothing else does.",
    howIQualify:
      "When a posting here clears my monitoring, I read the documents the way an evaluator will: mandatory requirements first, then scope, then how the bid is actually scored.",
    closing:
      "No single portal is the whole picture. I fold this one into a wider monitoring setup so you see qualified opportunities, not another login to remember.",
  },
  Industries: {
    angle:
      "shows up across more portals and under more category labels than most people expect, which is exactly why the steady, winnable work is so easy to miss.",
    whatIWatch:
      "I watch for this work wherever it posts and however it is tagged, because the same scope gets labelled differently from one buyer to the next.",
    howIQualify:
      "I read each scope for genuine fit: the volume, the term, the locations and the service levels, not just whether the title matches your trade.",
    closing:
      "The recurring, less glamorous work in this category is often where the steady margin lives. I make sure it reaches you before the deadline does.",
  },
  States: {
    angle:
      "splits its procurement across a central state system and a long tail of county, city and district portals, so no single source shows you everything.",
    whatIWatch:
      "I watch the state system alongside the local layer, because the work that matters to a lot of vendors lives in the municipal and district postings, not the headline state contracts.",
    howIQualify:
      "I read each opportunity for the requirements that actually gate it, then for scope and evaluation, before recommending whether it is worth your time.",
    closing:
      "I consolidate the state and local picture into one reviewed feed so opportunities here do not slip through the gaps between portals.",
  },
  Provinces: {
    angle:
      "spreads tenders across a provincial system, broader public sector bodies and a list of municipal portals, which is more fragmented than it looks from the outside.",
    whatIWatch:
      "I watch the provincial hub alongside the MASH-sector and municipal sources, because relevant work routinely posts outside the obvious place.",
    howIQualify:
      "I read the documents for mandatory requirements, scope and evaluation, and give you a clear go or no-go rather than a raw lead.",
    closing:
      "I cover the province as one picture instead of several separate searches, so the right opportunities reach you on time.",
  },
  Statistics: {
    angle:
      "is one of those areas where the public data tells a clearer story than the headlines, once you know how to read it honestly.",
    whatIWatch:
      "I treat published spending and award data as context, not gospel, because the big numbers can mislead you about your own real opportunity.",
    howIQualify:
      "I use the patterns in the data to sharpen where I look and to set realistic expectations, never to manufacture a statistic that is not there.",
    closing:
      "Data is useful for understanding the field. Winning still comes down to qualifying the specific opportunities in front of you, which is the work I focus on.",
  },
  "Bid qualification": {
    angle:
      "is where most wasted effort begins, because the decision to pursue a bid is usually made before anyone checks whether it can actually be won.",
    whatIWatch:
      "I watch for the requirements and signals that decide fit early: mandatories, scope, evaluation weighting and the red flags that hint at a wired contract.",
    howIQualify:
      "I turn a long solicitation into a clear go or no-go, with the reasoning behind it, before you spend a single hour writing.",
    closing:
      "A disciplined no-go is worth as much as a good lead. Every bid you correctly decline frees the time for one you can win.",
  },
  "Opportunity monitoring": {
    angle:
      "is the difference between hearing about the right work in time and finding out a competitor won something you never saw.",
    whatIWatch:
      "I cast a deliberately wide net across every source your buyers use, then read on top of the automation, because intent is something a person judges and a keyword cannot.",
    howIQualify:
      "I separate genuinely relevant opportunities from the look-alikes the filters catch, and I track amendments so a late change is news rather than a surprise.",
    closing:
      "Good monitoring surfaces qualified opportunities and keeps everything else out of your inbox. That is the standard I hold this work to.",
  },
  "Government procurement": {
    angle:
      "follows rules that look strange from the outside until you understand the why behind them, at which point the opportunities start to make sense.",
    whatIWatch:
      "I pay attention to how the mechanics here change your strategy, because the same opportunity can demand a very different approach depending on the procurement path.",
    howIQualify:
      "I read each opportunity in the context of how it is being bought, so you know what you are actually responding to before you commit.",
    closing:
      "Understanding the mechanics is the groundwork. Qualifying the specific opportunities in front of you is where I spend my time.",
  },
  Competition: {
    angle:
      "is something the public record will tell you more about than most vendors realize, if you are willing to read the award data.",
    whatIWatch:
      "I use public award history to understand who wins, where, and at what scale, so you can judge the field before you decide to enter it.",
    howIQualify:
      "I factor the competitive picture into a realistic go or no-go, rather than letting an attractive-looking opportunity pull you into a fight you cannot win.",
    closing:
      "Knowing the field is part of qualifying it. I help you compete where your odds are genuinely strongest, not everywhere at once.",
  },
  "No-bid analysis": {
    angle:
      "is the half of intelligence nobody markets, because saying no is harder to sell than another lead, even though it protects more of your time.",
    whatIWatch:
      "I watch for the signals that an opportunity is not worth pursuing, no matter how appealing it looks on the surface.",
    howIQualify:
      "I give you the reasoning for walking away, and where it makes sense, I flag the opportunity to revisit at the recompete instead.",
    closing:
      "Every wasted pursuit is time stolen from a winnable one. Knowing what to skip is exactly why disciplined qualification pays for itself.",
  },
  "Contract awards": {
    angle:
      "is not just closure on a bid, it is a map of who buys what, from whom, and on what cycle, if you read it the right way.",
    whatIWatch:
      "I read award notices and history to understand how a buyer behaves, because how an agency has bought in the past predicts how it will buy next.",
    howIQualify:
      "I use award data to estimate recompete timing and to judge whether you are a realistic fit before the next opportunity opens.",
    closing:
      "Award history is free intelligence most vendors waste. I put it to work sharpening qualification on the opportunities still ahead.",
  },
};

/**
 * Build a substantial, real article body for any topic without a deep body.
 * The prose is generated from the topic's own title, category and excerpt, so
 * every page is useful rather than thin.
 */
export function buildGeneratedBody(topic: BlogTopic): BlogBody {
  const frame = CATEGORY_FRAMES[topic.category] ?? CATEGORY_FRAMES["Government procurement"];
  const subject = stripTrailingParen(topic.title);

  const sections: Section[] = [
    {
      id: "overview",
      heading: "The short version",
      blocks: [
        { type: "p", text: topic.excerpt },
        {
          type: "p",
          text: `${subject} ${frame.angle} I work in this corner of government procurement every day, so the rest of this piece is the practical view: what I actually watch, how I read it, and how I decide what is worth your time.`,
        },
        {
          type: "callout",
          text: "A quick reminder on what I do and do not do. I find, monitor and qualify government opportunities. I read the documents and tell you what fits. Writing and submitting the proposal stays with you.",
        },
      ],
    },
    {
      id: "what-i-watch",
      heading: "What I watch, and why",
      blocks: [
        { type: "p", text: frame.whatIWatch },
        {
          type: "p",
          text: "The point is not to collect more sources for the sake of it. It is to make sure that when something relevant appears, it actually reaches you, instead of slipping past on a quirk of how it was labelled or where it was posted.",
        },
      ],
    },
    {
      id: "how-i-qualify",
      heading: "How I qualify what comes up",
      blocks: [
        { type: "p", text: frame.howIQualify },
        {
          type: "p",
          text: "That qualification follows the same order on every opportunity, because the cheapest mistakes to catch are the ones at the top of the list.",
        },
        {
          type: "ol",
          items: [
            "Mandatory requirements first. They are pass or fail, so if you cannot meet one, nothing else matters and I say so.",
            "Scope of work. What is actually being bought, at what volume and term, and whether it matches the work you want more of.",
            "Evaluation criteria. How the bid is scored, so I can judge whether you can realistically place high enough to win.",
            "Red flags and fit. The signals that an opportunity is wired, marginal, or simply not worth the hours it would cost.",
          ],
        },
      ],
    },
    {
      id: "common-mistakes",
      heading: "Where vendors usually go wrong here",
      blocks: [
        {
          type: "p",
          text: "The recurring mistake is treating discovery as the finish line. Finding an opportunity is the easy part. The expensive part is deciding, honestly and early, whether it is worth pursuing, and then tracking it so a late change does not undo your preparation.",
        },
        {
          type: "ul",
          items: [
            "Trusting a single source or a narrow set of keywords to catch everything relevant.",
            "Reacting to a posting without checking the mandatory requirements that decide fit first.",
            "Ignoring amendments and addenda, then preparing against a scope that has quietly changed.",
            "Chasing attractive-looking work that the evaluation never gave you a real path to win.",
          ],
        },
      ],
    },
    {
      id: "bottom-line",
      heading: "The bottom line",
      blocks: [
        { type: "p", text: frame.closing },
        {
          type: "p",
          text: "If you want to see this applied to your own trade and jurisdictions, the fastest way is a short call. Tell me where you bid and what you chase, and I will come to it with the picture as it actually looks for you.",
        },
      ],
    },
  ];

  const faqs: Faq[] = [
    {
      q: "Do you write or submit the proposal?",
      a: "No. I find, monitor and qualify opportunities, read the documents, and give you a clear go or no-go with the reasoning. Writing and submitting the bid stays with you and your team.",
    },
    {
      q: "How is this different from setting up my own alerts?",
      a: "Alerts only fire on the categories and keywords you select, against whatever a buyer happened to use, and the gap between those is where opportunities slip past. I cast a wider net across every source your buyers use and read on top of the automation for intent.",
    },
    {
      q: "What does coverage cost?",
      a: "Pricing is public and starts from $599 a month, structured by the geographic coverage you need. You pay for the jurisdictions you bid in, with monitoring of the relevant platforms included.",
    },
  ];

  return { readMins: 6, sections, faqs, leadVariant: "call" };
}

/** Resolve the body for a given topic, deep or generated. */
export function getBlogBody(topic: BlogTopic): BlogBody {
  return DEEP_BODIES[topic.slug] ?? buildGeneratedBody(topic);
}

function stripTrailingParen(title: string): string {
  // Drop a trailing "(2026)"-style parenthetical so generated prose reads cleanly.
  return title.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

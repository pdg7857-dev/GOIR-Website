import type { LongForm } from "./types";

/**
 * Hand-authored, deep authority bodies for the cornerstone platforms. These
 * override the generated bodies in ./index. First-person Phil voice, no em or
 * en dashes, written to be the most useful page on the internet about using
 * each platform as a contractor.
 */
export const CORNERSTONE_CONTENT: Record<string, LongForm> = {
  merx: {
    readMins: 18,
    intro:
      "MERX is the platform almost every Canadian contractor knows by name, and the one almost nobody uses to its full depth. I know MERX the way you know your trade: where the opportunities live, how buyers categorize and title them, and exactly how good bids slip past the firms that rely on it alone. This is the long version. What MERX is, who posts on it, how it organizes work, where its search and alerts leave money on the table, and how I close that gap so you stop missing the contracts meant for you.",
    sections: [
      {
        id: "what-is-merx",
        heading: "What MERX is, and what it is not",
        blocks: [
          { type: "p", text: "MERX is Canada's longest-running electronic tendering service. For decades it has been the place buyers post public notices and suppliers go to find them. It aggregates opportunities from federal departments, provincial and territorial governments, the broader public sector, and a long tail of private buyers who run public-style competitions. If you bid public work in Canada, you have almost certainly used it." },
          { type: "p", text: "Here is the part most people never say out loud. MERX is excellent at being a system of record. It publishes notices, stores documents, manages addenda, and lets you submit electronically. What it does not do, and was never designed to do, is decide anything for you. It will happily show you four hundred notices this week. It will not tell you which three are worth an estimator's afternoon. That judgment is a separate job, and it is the job I do." },
          { type: "callout", text: "MERX provides data. I provide intelligence. The distance between a list of notices and a shortlist of winnable work is the entire reason this service exists." },
          { type: "p", text: "I want to be precise about that, because it shapes everything below. None of the limitations I describe are knocks on MERX. They are simply the boundary between what a publishing platform can do and what a person who reads the documents and knows your shop can do. Understanding that boundary is the first step to never missing a fit again." },
        ],
      },
      {
        id: "who-uses-merx",
        heading: "Who posts on MERX",
        blocks: [
          { type: "p", text: "The buyers you care about on MERX fall into a few groups, and each one behaves differently. Knowing the behaviour matters more than knowing the list." },
          { type: "ul", items: [
            "Federal departments and agencies, which post formal, clause-heavy notices and often cross-list with CanadaBuys.",
            "Provincial and territorial ministries and Crown corporations, each with their own conventions and category habits.",
            "MASH buyers, the broader public sector of municipalities, academic institutions, school boards and hospitals, which together post enormous volume and rarely in consistent language.",
            "Private buyers running public-style tenders, who may title and categorize work in ways no government style guide would recognize.",
          ] },
          { type: "p", text: "That mix is the whole story. A contractor scanning MERX casually sees a flat feed of notices. What is actually there is several different buying cultures layered on top of each other, each writing scope a little differently and filing under categories that suit them, not you. A hospital, a small-town municipality and a federal department can all post the same essential work and describe it three completely different ways." },
          { type: "h3", text: "Why the buyer mix trips up good contractors" },
          { type: "p", text: "The mistake I see most often is treating MERX as if every buyer speaks one language. You build a saved search around the words your industry uses, and it works fine for the buyers who happen to use those words. The buyers who do not, and there are always some, become invisible to you. You are not missing those opportunities because they are hidden. You are missing them because you and the buyer described the same job differently." },
        ],
      },
      {
        id: "how-merx-categorizes",
        heading: "How MERX categorizes and surfaces opportunities",
        blocks: [
          { type: "p", text: "MERX organizes opportunities by category codes, region, buyer and closing date, and it surfaces them to you through two mechanisms: saved searches you run yourself, and matched email alerts based on the categories and keywords you set up. Both of those mechanisms depend on a single fragile assumption: that the category and words a buyer chose line up with the category and words you chose." },
          { type: "p", text: "They often do not. The category is selected by a procurement officer who is describing the work in their terms, under time pressure, sometimes choosing the closest fit from a dropdown rather than the perfect one. The title is whatever made sense to them that morning. Neither is written for your search box. So a roof replacement can land under a broad facilities category, a controls upgrade can land under electrical or under a generic renovation code, and a multi-year cleaning contract can land under building services rather than anything with the word janitorial in it." },
          { type: "callout", text: "The single most underrated fact about MERX: the category and title are chosen by the buyer, not by you. If the way you search does not match the way they file, the opportunity is invisible to you even though it is sitting in plain sight." },
          { type: "p", text: "On top of that, the real description of the work, the part that actually decides whether you can win it, lives inside the document set. MERX search reads the notice, not the forty pages of specifications attached to it. So even a notice that does surface tells you far less than the documents do, and the documents are where the decisive details hide." },
        ],
      },
      {
        id: "alert-limitations",
        heading: "The limits of MERX alerts",
        blocks: [
          { type: "p", text: "MERX matched-email alerts are genuinely useful. They are also nowhere near enough on their own, and here is exactly where they fall short for a working contractor." },
          { type: "ul", items: [
            "They fire on the categories and keywords you set, so a mis-categorized or oddly titled bid never reaches you at all. The alert cannot tell you about a notice it does not think matches.",
            "When they do fire, they fire often. The volume of matches in an active region is high enough that real fits get skimmed past at seven in the morning along with everything that does not apply to you.",
            "An alert tells you a notice exists. It does not tell you whether the scope fits, whether there is a mandatory site meeting next Tuesday, whether the bonding is something you can post, or whether the evaluation criteria favour an incumbent. Those are the things that decide a bid, and an alert is silent on all of them.",
            "Alerts do not follow a notice through its life. An addendum can change scope or move the closing date after the alert landed in your inbox, and you will not get a fresh tap on the shoulder that makes you re-read it.",
          ] },
          { type: "p", text: "None of that is a flaw in the feature. An alert is a tripwire, and a tripwire cannot read a forty-page specification or weigh it against your crew's calendar. That is a human job. It is the one I do every day, and it is the reason an alert subscription and what I provide are not the same thing." },
        ],
      },
      {
        id: "search-keyword-limitations",
        heading: "Search and keyword limitations",
        blocks: [
          { type: "p", text: "When the alerts miss something, most contractors fall back on running searches themselves. Search is better than nothing, and it has its own blind spots on MERX that are worth naming plainly." },
          { type: "ul", items: [
            "Keyword search is a guess at how the buyer described the work. Sometimes you guess right. Often the bid that fits you best is titled in language you would never type, which is precisely how the best opportunities go unbid.",
            "Category filters that cut the noise also quietly hide adjacent work. Filter hard enough to make the list manageable and you will exclude the buyer who filed your job one category over.",
            "Region filters help and hurt the same way. Trim to your home region and you miss the project just across a boundary you would gladly have served.",
            "The search index weighs the notice text, not the attachments. The scope, the spec, the real requirement, all of it sits in documents the search never opens.",
          ] },
          { type: "p", text: "Put plainly: search rewards you for already knowing how the buyer thinks. The contractors who win the work nobody else saw are the ones who watch the way buyers actually file, not the way they themselves would search. That is a discipline, and it does not scale by logging in more often. It scales by having someone whose whole job is to read." },
        ],
      },
      {
        id: "how-contractors-miss",
        heading: "How contractors miss opportunities on MERX",
        blocks: [
          { type: "p", text: "Stack the alert limits and the search limits together and a clear, repeatable pattern emerges. Contractors miss winnable work on MERX for a small number of reasons, over and over." },
          { type: "ol", items: [
            "The bid is filed under a category or titled in language their saved search never covers. A roof replacement posted as a facility renewal, a controls upgrade buried in a generic renovation, a cleaning contract coded as building services.",
            "The notice does reach them, but it arrives inside a flood of irrelevant matches and gets skimmed past in the morning triage.",
            "They see the title, assume from the title alone it is not a fit, and never open the documents where the real scope lives.",
            "An addendum quietly changes the scope or moves the closing date after the first look, and nobody circles back.",
            "A mandatory site meeting, a registration step, or a bonding requirement is buried deep in the documents and missed until it is too late to act on it.",
          ] },
          { type: "p", text: "Every one of these is preventable. Not one of them is prevented by logging in more often or buying a bigger alert package. They are prevented by someone reading carefully, on your behalf, on a schedule, and judging fit before anything reaches your estimators." },
        ],
      },
      {
        id: "how-i-help",
        heading: "How I complement MERX",
        blocks: [
          { type: "p", text: "I do not replace MERX, and I would be suspicious of anyone who said they could. MERX stays your system of record and the place you ultimately submit. I sit on top of it and do the part it was never built to do." },
          { type: "ul", items: [
            "I watch MERX the way buyers file, not just the way you would search, so the mis-titled and mis-categorized fits still reach you.",
            "I open the attachments and read the scope, the evaluation criteria, the mandatory meetings, the bonding, and the addenda as they post.",
            "I qualify fit against your trades, your capacity and your geography before anything reaches your team, so you never spend an estimator's morning on a bid that was never right for you.",
            "I write a short, plain-language summary of each opportunity I send, with a direct link back to the source notice on MERX so you act on the system of record.",
          ] },
          { type: "p", text: "The result is simple and it is the whole point. Instead of another inbox to triage, you get a short list of opportunities that actually fit, each one already read, qualified and linked. Your estimators price. Your proposal team writes. Nobody spends a morning deciding whether a notice is even worth opening, because that decision has already been made by someone whose entire job is making it well." },
          { type: "callout", text: "If you are still manually searching MERX, you are doing work I have already mastered. Let me show you, on a call, the opportunities your current setup is missing in your own jurisdictions." },
        ],
      },
    ],
    caseStudies: [
      {
        title: "The facility renewal that was really a roof",
        result: "A core roofing project, found under a title the contractor would never have searched.",
        body: "A roofing contractor's MERX alerts were built around roofing language. The project that fit them best posted as a \"facility renewal program\" under a broad category, and their saved search never saw it. Reading the documents the way the buyer filed them put it on their desk with time to prepare. Illustrative example.",
      },
      {
        title: "The morning back",
        result: "An estimator's daily MERX triage handed off entirely.",
        body: "Before working with me, the firm's senior estimator opened MERX first thing every morning, cleared alerts and opened documents for an hour before real work started. That hour now goes to pricing qualified bids, because the triage is finished before anything reaches them. Illustrative example.",
      },
    ],
    faqs: [
      { q: "Do I still need my own MERX account?", a: "Usually yes, and that is fine. MERX stays your system of record and the place you submit. I work alongside it: I monitor, read and qualify, then hand you the opportunity with a direct link back to MERX so you can act on it." },
      { q: "Can you really catch what my MERX alerts miss?", a: "That is the entire point. Alerts fire on the categories and keywords you set. I watch the way buyers actually file and title work, read the documents, and judge fit. The bids that slip through a keyword net are exactly the ones I am looking for." },
      { q: "Is this MERX training or consulting?", a: "No. I am not here to teach you to use MERX. I do the monitoring, reading and qualifying for you, as an ongoing service, so your team spends its hours bidding rather than searching." },
      { q: "How quickly will I see MERX opportunities?", a: "On a discovery call I will already have looked at MERX in your jurisdictions, so you see real examples before you pay anything. Once we start, opportunities reach you on a steady cadence as they post and close." },
      { q: "Do you cover federal and provincial work on MERX, or just one?", a: "Both, scoped to your coverage. MERX carries federal, provincial and broader-public-sector notices, and I watch whichever of those serve the jurisdictions in your plan, including the federal cross-listings with CanadaBuys." },
    ],
  },

  "bidnet-direct": {
    readMins: 16,
    intro:
      "BidNet Direct is one of the most important platforms most contractors underuse. It runs the regional purchasing groups that hundreds of state, provincial, county and municipal agencies rely on to post solicitations and notify vendors, and many of those buyers post there and nowhere else. I know how BidNet Direct routes work by commodity code and region, where its notifications quietly fail, and how good bids fall through the cracks between groups. This is the full picture, and how I make sure you stop missing the work meant for you.",
    sections: [
      {
        id: "what-is-bidnet",
        heading: "What BidNet Direct is",
        blocks: [
          { type: "p", text: "BidNet Direct is the engine behind a large network of regional purchasing groups across the United States and Canada. Instead of every agency standing up its own portal, groups of agencies share a regional BidNet Direct platform where they post solicitations and notify registered vendors. For a contractor, that means a single platform can be your window onto dozens or hundreds of buyers in a region, which is powerful, and also the source of its quirks." },
          { type: "p", text: "Crucially, many agencies post on BidNet Direct exclusively. If you are not registered in the right group, or registered under the wrong commodity codes, those opportunities simply never reach you. The platform is doing its job. It just cannot read your mind about which codes describe your work, and it will only notify you about what your registration says you want." },
          { type: "callout", text: "BidNet Direct sends alerts based on commodity-code overlap. I read past the code to the actual scope, which is where the fit, and the catch, actually live." },
        ],
      },
      {
        id: "who-uses-bidnet",
        heading: "Who posts on BidNet Direct",
        blocks: [
          { type: "p", text: "The buyers you care about on BidNet Direct cluster into a few familiar types, and they share the regional-group structure that defines the platform." },
          { type: "ul", items: [
            "Regional purchasing groups and cooperatives, which bundle many agencies under one platform.",
            "Counties and municipalities, often the bulk of the volume in any given region.",
            "School districts and special districts, which run on their own cycles and use their own language.",
            "Some state and provincial agencies, which cross-post or post directly to the relevant group.",
          ] },
          { type: "p", text: "Because the platform is organized by region, your coverage is only as good as your map of which groups your buyers belong to. A contractor who works a metro area that straddles two purchasing groups, or who would gladly serve the county next door, has to be registered in each relevant group to see the work. Miss a group and you have a blind spot you do not even know is there." },
        ],
      },
      {
        id: "how-bidnet-categorizes",
        heading: "How BidNet Direct categorizes and notifies",
        blocks: [
          { type: "p", text: "BidNet Direct runs on commodity codes and region. When you register as a vendor, you select the codes that describe what you do and the regions you serve, and the platform notifies you when an agency posts a solicitation tagged with codes that overlap yours. That matching is the heart of the system, and it is also its central fragility." },
          { type: "p", text: "The code a buyer tags and the codes you registered under have to line up for the notification to fire. Buyers tag loosely, sometimes choosing a broad or neighbouring code, sometimes under-tagging a solicitation that spans several trades. If your registration does not happen to overlap their choice, you get nothing, even when the work is squarely in your wheelhouse." },
          { type: "p", text: "There is also a tier dimension. Free vendor access exists, but it limits which groups and notifications you actually receive, which means the cheapest setup is often the one with the largest blind spots. Contractors discover this the hard way when they learn a competitor down the road has been bidding work they never saw." },
        ],
      },
      {
        id: "alert-limitations",
        heading: "The limits of BidNet Direct alerts",
        blocks: [
          { type: "p", text: "BidNet Direct notifications are useful and, like every automated alert, limited in ways that matter to a working contractor." },
          { type: "ul", items: [
            "Notifications depend on commodity-code overlap, so a loosely coded or under-tagged solicitation never reaches you.",
            "Free and lower vendor tiers cap the regions and notifications you actually receive, creating blind spots that feel like silence.",
            "Volume across a multi-region group buries the handful of bids that genuinely fit beneath everything that does not.",
            "An alert tells you a solicitation posted. It does not tell you about the prevailing-wage requirement, the bonding, the mandatory pre-bid meeting, or the fact that the scope really suits an incumbent.",
          ] },
          { type: "p", text: "The notification is a starting gun, not a scouting report. It cannot read the solicitation for you, and reading the solicitation is where you find out whether a bid is worth your time." },
        ],
      },
      {
        id: "search-keyword-limitations",
        heading: "Search and coverage limitations",
        blocks: [
          { type: "p", text: "Searching BidNet Direct yourself helps, and it inherits the same code-and-region logic that limits the alerts." },
          { type: "ul", items: [
            "Code-driven search misses work a buyer tagged under a neighbouring commodity, which is common.",
            "Region boundaries can hide opportunities just across a line you would happily serve, because you have to be in the group to see them.",
            "The real scope sits in documents the keyword search never opens, so even a found solicitation under-reports what it actually involves.",
            "Re-bids of incumbent contracts surface with little fanfare, and if you are not watching the cycle you learn about them too late to prepare.",
          ] },
          { type: "p", text: "The throughline is the same one that runs across every platform. The system surfaces work the way buyers coded it, not the way you would look for it, and the decisive detail lives in documents no search engine reads. Closing that gap is a reading problem, and reading is a person's job." },
        ],
      },
      {
        id: "how-contractors-miss",
        heading: "How contractors miss opportunities on BidNet Direct",
        blocks: [
          { type: "p", text: "The misses on BidNet Direct follow a tight, recognizable pattern." },
          { type: "ol", items: [
            "A solicitation is coded under a commodity you did not register for, so the notification never fires. A custodial re-bid tagged as building services rather than the cleaning code is the classic example.",
            "The relevant buyer sits in a purchasing group you are not registered in, often just across a regional boundary you would gladly serve.",
            "Your vendor tier limits the notifications you receive, so the work is there but you are not being told.",
            "The notice arrives buried in a multi-region flood and gets skimmed past.",
            "A prevailing-wage clause, bonding requirement or mandatory pre-bid meeting hides in the documents and sinks the bid for anyone who did not read carefully.",
          ] },
          { type: "p", text: "Each of these is a coverage-and-reading failure, not a strategy failure. You can fix them, but not by checking the portal more often. You fix them by mapping every group your buyers use and by reading every solicitation that could plausibly fit." },
        ],
      },
      {
        id: "how-i-help",
        heading: "How I complement BidNet Direct",
        blocks: [
          { type: "p", text: "I treat BidNet Direct as a powerful tool with predictable gaps, and I close the gaps." },
          { type: "ul", items: [
            "I track the purchasing groups your buyers post to across every region you serve, so coverage does not depend on you having found and joined each one.",
            "I read past the commodity code to the actual scope and requirements, which is where fit is decided.",
            "I flag the prevailing-wage, bonding, insurance and pre-bid-meeting catches before you commit time to a response.",
            "I watch incumbent re-bid cycles so you are preparing while competitors are still finding out.",
          ] },
          { type: "p", text: "What you get back is a clean shortlist drawn from across the regions and groups you care about, each opportunity read and qualified, each linked to the source on BidNet Direct. The platform keeps doing what it does well. I do the reading and judging it cannot." },
          { type: "callout", text: "If a competitor keeps bidding work you never saw, the problem is almost always coverage and reading, not luck. That is exactly what I fix on BidNet Direct." },
        ],
      },
    ],
    caseStudies: [
      {
        title: "The group across the line",
        result: "A whole purchasing group of buyers the contractor was not registered to see.",
        body: "A facilities contractor was active in one BidNet Direct region and assumed that covered their market. A neighbouring purchasing group, well within their service area, held buyers they had never been notified about. Mapping and watching that group opened a steady stream of qualified work. Illustrative example.",
      },
      {
        title: "The miscoded custodial re-bid",
        result: "A recurring cleaning contract caught despite being tagged under the wrong code.",
        body: "A custodial re-bid posted under a building-services commodity rather than the cleaning code the contractor had registered for, so no notification fired. Reading the region's postings rather than waiting on code matches surfaced it in time to bid. Illustrative example.",
      },
    ],
    faqs: [
      { q: "Do I still need my own BidNet Direct registration?", a: "Yes, and it stays useful. BidNet Direct remains where you act and submit. I work on top of it: I make sure your coverage spans the right groups and regions, read the solicitations, and qualify fit before anything reaches you." },
      { q: "Can you cover multiple BidNet Direct regions and groups?", a: "That is one of the main reasons contractors bring me in. I track every purchasing group your buyers use across the regions you serve, so you stop missing work that sits just outside the group you happened to join." },
      { q: "Will you catch bids my commodity-code notifications miss?", a: "Yes. Code matching is exactly where BidNet Direct alerts fail, because buyers tag loosely. I read the postings themselves rather than waiting on code overlap, so loosely coded fits still reach you." },
      { q: "Is this a BidNet Direct setup or training service?", a: "No. I am not teaching you the platform. I monitor it, read the solicitations and qualify them for you as an ongoing service, so your team spends its time bidding the work that fits." },
      { q: "How fast will I see BidNet Direct opportunities?", a: "On a discovery call I will already have looked at the relevant groups in your regions, so you see real examples before you pay. After that, qualified opportunities reach you on a steady cadence as they post." },
    ],
  },
};

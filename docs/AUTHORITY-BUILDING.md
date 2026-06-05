# Authority Building Strategy (E-E-A-T)

Search engines reward Experience, Expertise, Authoritativeness, and Trustworthiness. For a personal brand built around one named operator, E-E-A-T is not a checkbox exercise; it is the whole proposition. People hire Phil because he is a credible expert, and search engines should see the same signals a prospect does. This document covers how to build and surface that authority.

## Phil as the named expert

The brand is a person, not a faceless company, and that is a strategic advantage for E-E-A-T. A named human with a track record is exactly the kind of entity search systems and prospects trust for a judgment-based service.

- **A real about page (`/about`)** that establishes who Phil is, his years in government procurement (the `founded` field in `config.ts` anchors the timeline), and why he does this work. Specific, first-person, honest.
- **A consistent entity.** The Organization JSON-LD names the brand; reinforce Phil as the person behind it with a consistent name, photo, and bio across the site and any off-site profiles, so search engines connect the entity.
- **First-person experience signals** throughout the platform and industry pages: not "best practices say" but "here is what I see contractors miss on this platform". Experience is the newest E in E-E-A-T and the hardest to fake.

## Author bylines

Every piece of editorial content should carry Phil as the named author.

- Blog posts (`/blog/[slug]`) get a visible byline and, ideally, Article JSON-LD with an `author` of type Person named Phil, linking to the about page as the author's profile.
- The lead-magnet reports are authored and signed, not anonymous downloads.
- Author attribution ties the depth of the content back to a credible human, which is precisely the signal E-E-A-T rewards for a service in a consequential (money-adjacent) niche.

## Original insights

Authority is earned by saying things no one else is saying, not by restating common knowledge.

- **Platform teardowns** drawn from real use (how a specific system's notifications fail, where its documents hide scope) are original by definition because they come from doing the work.
- **Award-data analysis** (see the content-moat doc) turns USASpending and Canadian disclosure data into observations about who is winning and where demand is growing. Original data analysis is strong link bait and a clear expertise signal.
- **Qualification frameworks**, such as the criteria behind the Bid Qualification Checklist, package the operator's judgment into reusable original IP.

## Speaking and guesting

Off-site visibility compounds on-site authority and builds the brand's entity across the web.

- **Podcasts and webinars** aimed at contractors (trade associations, construction and facilities audiences) where Phil explains how to stop missing government work.
- **Guest articles** in trade publications and procurement-focused outlets (see the backlink strategy for the link angle; here the value is the authority and the named-expert exposure).
- **Association talks and panels.** Construction, janitorial, facilities, and trade associations run events where a procurement expert is welcome content.

Each appearance should point back to a relevant page (a platform guide, the intelligence page, or a lead magnet) and reinforce Phil as the go-to expert on government opportunity intelligence.

## Building topical authority around the category

The endgame is for the site to be recognized as the definitive authority on **Government Opportunity Intelligence** as a topic, not just to rank for scattered keywords. Topical authority is built by covering a subject comprehensively and interlinking it tightly:

1. **Comprehensive coverage.** The site already covers all four clusters end to end: the intelligence concept, 18 platforms, 12 industries, 63 jurisdictions. Completeness within the topic is itself an authority signal.
2. **A clear topical center.** `/government-opportunity-intelligence` is the canonical hub for the category. All clusters link toward it and define their relationship to it.
3. **Tight internal linking** (see the internal-linking doc) so the site reads as one coherent topical entity rather than disconnected pages.
4. **Consistent terminology.** Use "government opportunity intelligence" deliberately and repeatedly so the brand becomes synonymous with the category in both human and machine understanding.
5. **Depth before breadth.** Win the cornerstone platforms and primary industries with genuinely authoritative pages before chasing every long-tail combination. Authority concentrates, then spreads.

## E-E-A-T checklist

| Signal | Where it lives | Status to maintain |
| --- | --- | --- |
| Experience | First-person platform/industry bodies | Keep the operator voice; never genericize |
| Expertise | Depth of platform pages, qualification content | Tier depth to demand; keep specifics real |
| Authoritativeness | Backlinks, guest appearances, category ownership | Pursue per the backlink strategy |
| Trustworthiness | Named about page, honest social proof, sample proof | Fill `SOCIAL_PROOF` with verified figures only; never fabricate |

The throughline: a credible named person, saying original and specific things, comprehensively across one topic, with the proof to back it up. That is what earns rankings and what earns the discovery call.

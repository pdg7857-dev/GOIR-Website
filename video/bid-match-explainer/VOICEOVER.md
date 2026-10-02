# Voiceover script

First person, Phil Dave's voice. Calm, direct, a little dry. Roughly 150 words a
minute. Style rules from `POSITIONING.md` apply: no invented numbers, claim only
what I do, never the client's wins.

The rendered video currently uses a generated sample voice (Kokoro, "Michael"),
one file per line in `vo/`. The exact lines are in `vo-cues.json`.

**To swap in your own voice:** record one take per scene (the nine rows below).
Read the lines in order and pause about one second between lines. I split each
take at the pauses into the per-line files in `vo/`, then run
`node build-timing.mjs`. The video re-times itself to your pacing: every stamp,
tick and counter is keyed to the line that calls it. Then re-render.

| Take | Scene | Lines |
|---|---|---|
| 1 | Hook (0:00) | How many bids did you open this week, just to find out they weren't a match? |
| 2 | The search (0:06) | Government opportunities are scattered across more than eighteen platforms. Federal, provincial, municipal, agencies, health and education. And the alerts never stop. Every one of them looks like it could be the one. |
| 3 | The loop (0:20) | So you open it. You log in. You download the documents. You read page after page, until page forty-seven tells you the site visit was last week. Not a match. Next one. The bond is more than you can carry. Not a match. Next one. It's outside your region. Not a match. By Friday afternoon, the whole week is gone. Open. Download. Read. Not a match. |
| 4 | The cost (0:52) | A full week of searching. Not one bid worth writing. Every hour on the wrong bid is an hour taken from one you could win. And seventy-eight percent of construction firms say estimating roles are hard to fill. |
| 5 | The turn (1:09) | You focus on winning contracts. I focus on finding them. |
| 6 | How it works (1:15) | I monitor the platforms for you. I read the documents. And I qualify every opportunity against your trades, your capacity, your coverage area, the deadlines and the mandatory requirements. I track every amendment. You only see what fits. |
| 7 | What you get (1:34) | Each one reaches you already read. A plain-language summary, a link to the source, and what you need to make the call. Bid, or pass. |
| 8 | Credibility (1:44) | I spent three years inside the eprocurement industry, handling more than seventeen thousand five hundred contractor accounts across Canada and the US. I saw where contractors lose bids. Not at the proposal. At the search. |
| 9 | CTA (1:59) | Stop searching. Start bidding. Book a discovery call at phildave dot com. |

About 280 words, around 1:40 of speech; with the visual holds the video runs 2:09.

## Sync points (automatic)

- Each "Not a match" in scene 3 lands on a NOT A MATCH stamp; "Open. Download.
  Read. Not a match." slams in word by word with the voice.
- The five criteria tick as you name them; the qualified cards land during that line.
- The 78% and 17,500+ counters run as you say the numbers.
- "I focus on finding them" lands on the gold line.

## Recording tips

- A phone voice memo in a quiet room with soft furnishings is fine. Hold the
  phone about a hand-width from your mouth, slightly off to the side.
- Do two or three takes of each scene and keep the best one; mistakes cost
  nothing.
- WAV or M4A both work.

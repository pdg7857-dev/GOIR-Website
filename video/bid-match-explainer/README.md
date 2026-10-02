# Bid-match explainer video

A 2:09, 1920x1080, 30 fps narrated explainer for phildave.com. It shows a
government contractor's week lost to searching portals, opening bids and finding
out they were never a match, then shows the service that does the finding and
qualifying instead. Built with [HyperFrames](https://hyperframes.heygen.com)
(HTML + GSAP rendered to MP4), following the Motion Graphics with Claude Code
starter kit (fonts and sound effects come from that kit).

## Story

Scene times now come from the narration (see Timing below); the table shows the original silent cut.


| Time | Scene | Beat |
|---|---|---|
| 0-6 | Hook | How many bids did you open this week just to find out they weren't a match? |
| 6-20 | The search | 18+ platforms, an alert inbox climbing to 99+ |
| 20-48 | The loop | Open, log in, download, read every page, find the mandatory requirement, NOT A MATCH. Three times, then a rapid montage. The week clock runs Monday 8:00 AM to Friday 4:30 PM |
| 48-61 | The cost | A full week, not one bid worth writing. 78% stat (AGC 2024, cited on screen) |
| 61-68 | The turn | You focus on winning contracts. I focus on finding them. |
| 68-88 | How it works | Platforms flow into a filter (trades, capacity, coverage, deadlines, mandatories); only 3 qualified opportunities come out |
| 88-97 | What you get | A qualified-opportunity card: why it fits, closing date, site visit, mandatories, summary, source link |
| 97-107 | Credibility | 3 years in the industry, 17,500+ accounts handled, 18+ platforms monitored |
| 107-118 | CTA | Stop searching. Start bidding. phildave.com, book a discovery call, disclaimer |

## Claims

Every number on screen comes from the locked set in `../../POSITIONING.md` or the
verified citations in `src/lib/site/citations.ts`. No platform or former employer
is named. The bids, portals and requirements shown are illustrative, not real
postings. The closing disclaimer is the footer disclaimer from POSITIONING.md.

## Editing

- Copy and timing: `index.html`. Each scene is a `<div class="scene clip">` with
  `data-start` / `data-duration`; the animation for each scene is in the matching
  block of the script at the bottom.
- Timing: `build-timing.mjs` reads the length of every `vo/<id>.wav`, lays the
  narration out scene by scene, names the visual beats each line drives, and
  writes the timing JSON, clip times, narration and sound-effect `<audio>` tags
  into `index.html`. Sound effects are defined there too. Run
  `node build-timing.mjs` after changing any narration file.
- Narration: `vo-cues.json` holds the lines. `gen-vo.py` made the sample voice
  with Kokoro-82M (Apache-2.0) running locally; see `VOICEOVER.md` for swapping
  in a real recording.
- GSAP is vendored in `vendor/` so renders work offline.

```bash
npx hyperframes check                                    # lint + layout + contrast
npx hyperframes preview                                  # Studio preview in the browser
npx hyperframes render --quality high -o renders/bid-match-explainer.mp4
```

Renders and snapshots are git-ignored; the MP4 is delivered separately.

# Brief for building a phildave.com video (HyperFrames)

You are building ONE video project in `/home/user/GOIR-Website/video/<project>/`.
The narration (sample voice) already exists in `vo/` and the script is in `cues.json`.
You write `index.html` (the composition) and `build.mjs` (lays scenes out around the narration).

## Read first (in this order)
1. `/home/user/GOIR-Website/video/after-you-sign/index.html` and `build.mjs`: the reference. Copy its structure exactly.
2. `/home/user/GOIR-Website/video/_shared/kit.js` (animation helpers, `K.*`), `_shared/brand.css` (brand classes), `_shared/tools/timing.mjs` (`createTiming`: `say`, `ev`, `sfx`, `hold`, `end`, `write`).
3. Your project's `cues.json` (the exact spoken lines).

## How it fits together
- `index.html` has `#bg` and scene clips `<div id="sN" class="scene clip" data-start=".." data-duration="..">`, the
  `<!-- AUDIO:BEGIN ... -->`/`<!-- AUDIO:END -->` and `<!-- TIMING:BEGIN ... -->`/`<!-- TIMING:END -->` markers,
  root `<div id="root" data-composition-id="main" data-start="0" data-duration="..">`.
- `build.mjs` calls `t.begin("sN")`, `t.say(id, minStart)` for each line in order, `t.ev(name, localTime)` for each
  visual beat (derive beats from line start + fraction of its duration so visuals land on the words that name them),
  `t.sfx(name, localTime, volume)`, `t.end(minDur, tail)`, then `t.write()`. Run `node build.mjs` after any change.
- The page script: `const T = K.init();` then one block per scene `const S = K.scene("sN"), E = S.ev;` using
  `K.rise/pop/slideIn/out/label/tick/stamp/shake/serifIn/draw/count/slam/hide` with times from `E`, each scene
  ending `K.out(S.dur - 0.5, "#sN .inner", 0.45)` (except the last), and finally
  `window.__timelines["main"] = K.done();` (literal text; lint needs it).
- Sound effects available: tick, pop, snap, switch, success, chime, counter, fill, star. Keep them quiet under voice
  (0.1 to 0.35). Ticks for checks, snap for stamps, pop for things appearing, chime only on the final CTA.
- Elements that first appear via a tween with `immediateRender:false` (K.tick, K.stamp, K.slam, K.slideIn with ir:false)
  must be hidden first with `K.hide(sel)` in that scene.

## Hard rules
- Brand: navy background (from #bg), white cards, gold accents (`.gold`, `.serif gold` for the emphasis phrase),
  Space Grotesk display / Inter body / Instrument Serif italic accents / JetBrains Mono for numbers. Same look as the reference.
- Copy: on-screen text must come from the narration in cues.json or the on-screen text given in your storyboard.
  Do NOT invent statistics, results, client names, prices, guarantees or claims. No em dashes or en dashes anywhere.
  Do not name private bid platforms or companies. Example bids are fictional and labelled with `.illus` "Illustrative example".
- Every scene must keep developing while its narration plays (no long frozen frames); reveal items on the words.
- Do not edit anything in `_shared/` or in other projects. If the kit lacks something, add local CSS/JS in your index.html.
- Do NOT render MP4s, do NOT run text-to-speech, do NOT commit or push. The lead does that.
- Deterministic only: no Math.random (use K.rnd), no Date.

## Done means
1. `node build.mjs` runs clean.
2. `npx hyperframes check` in the project folder: 0 errors. Fix every contrast and overflow finding on real frames
   (transient findings mid-fade are acceptable). Ignore the warnings `nested_structure_needs_subcomposition`,
   `composition_file_too_large`, `timeline_track_too_dense`.
3. `npx hyperframes snapshot --at <a time inside every scene, at its busiest moment>` then LOOK at
   `snapshots/contact-sheet*.jpg` with the Read tool. Fix anything clipped, overlapping, empty, misaligned or ugly, and re-snapshot.
4. Reply with: total duration, the scene list with one line each, anything you could not resolve.

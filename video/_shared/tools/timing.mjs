// Narration-driven timing for the phildave.com videos.
//
// A project's build.mjs creates a timing, lays its scenes out around the narration
// (say), names the visual beats (ev) and sound effects (sfx), then calls write().
// write() puts the timing JSON, every scene clip's start and duration, the root
// duration and one <audio> per narration line and sound effect into index.html.
// Each narration line's length is read from its wav file, so replacing vo/*.wav
// with a real recording and re-running build.mjs re-syncs the whole video.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const probe = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());
const r3 = (v) => Math.round(v * 1000) / 1000;

export function createTiming({ cues = "cues.json", html = "index.html" } = {}) {
  const cfg = existsSync(cues) ? JSON.parse(readFileSync(cues, "utf8")) : { cues: [] };
  const src = Object.fromEntries(cfg.cues.map((c) => [c.id, c.src ?? `vo/${c.id}.wav`]));
  const D = Object.fromEntries(cfg.cues.map((c) => [c.id, probe(src[c.id])]));
  const scenes = [];
  let cur;
  const api = {
    D,
    begin(name) {
      scenes.push((cur = { name, ev: {}, vo: [], sfx: [], lastEnd: -10 }));
    },
    ev(k, v) {
      cur.ev[k] = r3(v);
      return v;
    },
    say(id, at = 0, gap = 0.15) {
      if (!(id in D)) throw new Error(`no narration cue ${id}`);
      const s = Math.max(at, cur.lastEnd + gap);
      cur.vo.push({ id, s: r3(s), d: r3(D[id]) });
      cur.lastEnd = s + D[id];
      return { s, e: s + D[id], d: D[id] };
    },
    // advance the scene clock without narration (for silent videos)
    hold(t) {
      cur.lastEnd = Math.max(cur.lastEnd, t);
    },
    get last() {
      return cur.lastEnd;
    },
    sfx(name, at, vol) {
      cur.sfx.push({ name, at: r3(at), vol });
    },
    end(minDur, tail) {
      cur.dur = r3(Math.max(minDur, cur.lastEnd + tail));
    },
    write() {
      let t = 0;
      for (const s of scenes) {
        s.start = r3(t);
        t += s.dur;
      }
      const total = r3(t);
      const timing = { total, scenes: Object.fromEntries(scenes.map((s) => [s.name, { start: s.start, dur: s.dur, ev: s.ev }])) };
      let doc = readFileSync(html, "utf8");
      const swap = (re, fn, what) => {
        if (!re.test(doc)) throw new Error(`${html}: ${what} not found`);
        doc = doc.replace(re, fn);
      };
      swap(/(data-composition-id="main" data-start="0" data-duration=")[\d.]+"/, (_, a) => `${a}${total}"`, "root duration");
      swap(/(id="bg" class="scene clip" data-start="0" data-duration=")[\d.]+"/, (_, a) => `${a}${total}"`, "bg clip");
      for (const s of scenes) {
        swap(new RegExp(`(id="${s.name}" class="scene clip" data-start=")[\\d.]+(" data-duration=")[\\d.]+"`), (_, a, b) => `${a}${s.start}${b}${s.dur}"`, `${s.name} clip`);
      }
      swap(/(<!-- TIMING:BEGIN[^>]*-->)[\s\S]*?(\s*<!-- TIMING:END -->)/, (_, a, b) => `${a}\n    <script id="timing" type="application/json">${JSON.stringify(timing)}</script>${b}`, "timing markers");
      const tags = [];
      for (const s of scenes)
        for (const v of s.vo)
          tags.push(`      <audio id="vo-${v.id}" src="${src[v.id]}" data-start="${r3(s.start + v.s)}" data-duration="${v.d}" data-volume="1" data-track-index="9"></audio>`);
      const len = {};
      const lanes = []; // end time of the last sound on each lane, so overlapping sounds never share a track
      let n = 0;
      const all = scenes.flatMap((s) => s.sfx.map((x) => ({ ...x, at: r3(s.start + x.at) }))).sort((a, b) => a.at - b.at);
      for (const x of all) {
        n += 1;
        len[x.name] ??= probe(`shared/sfx/${x.name}.wav`);
        let lane = lanes.findIndex((end) => end <= x.at);
        if (lane === -1) lane = lanes.push(0) - 1;
        lanes[lane] = x.at + len[x.name] + 0.01;
        tags.push(`      <audio id="sfx-${String(n).padStart(2, "0")}-${x.name}" src="shared/sfx/${x.name}.wav" data-start="${x.at}" data-duration="${len[x.name]}" data-volume="${x.vol}" data-track-index="${10 + lane}"></audio>`);
      }
      swap(/(<!-- AUDIO:BEGIN[^>]*-->)[\s\S]*?(\s*<!-- AUDIO:END -->)/, (_, a, b) => `${a}\n${tags.join("\n")}${b}`, "audio markers");
      writeFileSync(html, doc);
      for (const s of scenes) console.log(`${s.name}  start ${s.start.toFixed(2).padStart(6)}  dur ${s.dur.toFixed(2).padStart(5)}`);
      console.log(`total ${total}s, ${tags.length - n} narration lines, ${n} sound effects`);
      return timing;
    },
  };
  return api;
}

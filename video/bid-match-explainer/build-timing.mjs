// Derives the whole video's timing from the narration and writes it into index.html.
//
// Reads the length of every vo/<id>.wav (sample voice or a real recording), lays the
// lines out scene by scene, names the visual beats each line drives (stamps, ticks,
// counters), and then writes into index.html:
//   - the timing JSON the composition script reads (<script id="timing">)
//   - every scene clip's data-start / data-duration, and the root duration
//   - one <audio> per narration line and per sound effect
//
// Run after replacing any vo/*.wav:  node build-timing.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const probe = (f) =>
  Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());

const { cues } = JSON.parse(readFileSync("vo-cues.json", "utf8"));
const D = Object.fromEntries(cues.map((c) => [c.id, probe(`vo/${c.id}.wav`)]));
const r3 = (v) => Math.round(v * 1000) / 1000;

const scenes = [];
let cur;
const begin = (name) => scenes.push((cur = { name, ev: {}, vo: [], sfx: [], lastEnd: -10 }));
const ev = (k, v) => (cur.ev[k] = r3(v));
// Place a line no earlier than `at` and at least `gap` after the previous line.
const say = (id, at = 0, gap = 0.15) => {
  const s = Math.max(at, cur.lastEnd + gap);
  const e = s + D[id];
  cur.vo.push({ id, s: r3(s), d: r3(D[id]) });
  cur.lastEnd = e;
  return { s, e, d: D[id] };
};
const sfx = (name, at, vol) => cur.sfx.push({ name, at: r3(at), vol });
const end = (minDur, tail) => (cur.dur = r3(Math.max(minDur, cur.lastEnd + tail)));

// ---------- S1 hook ----------
begin("s1");
{
  const a = say("01a", 0.4);
  ev("l2", a.s + a.d * 0.42);
  end(5.6, 0.9);
}

// ---------- S2 the search ----------
begin("s2");
{
  const a = say("02a", 0.5);
  ev("portals", 1.0);
  for (let i = 0; i < 9; i++) sfx("pop", 1.0 + i * 0.22, 0.16);
  const b = say("02b", a.e + 0.2);
  const c = say("02c", b.e + 0.25);
  ev("inbox", c.s - 0.6);
  ev("count", c.s - 0.1);
  for (let t = c.s; t < c.s + 5.4; t += 0.45) sfx("tick", t, 0.1);
  const d = say("02d", c.e + 0.3);
  ev("hb", d.s - 0.1);
  sfx("switch", d.s - 0.1, 0.2);
  end(10, 1.1);
}

// ---------- S3 the loop ----------
begin("s3");
{
  const a = say("03a", 0.6);
  ev("t1", a.s + 0.6);
  const b = say("03b", a.e + 0.25);
  ev("t2", b.s + 0.45);
  const c = say("03c", b.e + 0.2);
  ev("t3", c.s + 0.8);
  const d = say("03d", c.e + 0.2);
  ev("scroll1", d.s);
  ev("scroll1d", d.d * 0.6);
  ev("t4", d.s);
  ev("t5a", d.s + d.d * 0.62);
  ev("hl1", d.s + d.d * 0.66);
  const e = say("03e", d.e + 0.15);
  ev("stamp1", e.s);

  const f = say("03f", e.e + 0.4);
  const r2 = f.s;
  ev("r2", r2);
  const g = say("03g", r2 + 2.2);
  ev("scroll2", r2 + 1.3);
  ev("t5b", g.s);
  ev("hl2", g.s + 0.2);
  const h = say("03h", g.e + 0.15);
  ev("stamp2", h.s);

  const i = say("03i", h.e + 0.4);
  const r3_ = i.s;
  ev("r3", r3_);
  const j = say("03j", r3_ + 2.0);
  ev("scroll3", r3_ + 1.2);
  ev("t5c", j.s);
  ev("hl3", j.s + 0.1);
  const k = say("03k", j.e + 0.15);
  ev("stamp3", k.s);

  const montage = k.e + 0.15;
  ev("montage", montage);
  const l = say("03l", montage + 0.4);
  const m = say("03m", Math.max(l.e + 0.35, montage + 3.0));
  const n = say("03n", m.s + 0.85);
  const o = say("03o", n.s + 0.95);
  const p = say("03p", o.s + 0.8);
  ev("w0", m.s);
  ev("w1", n.s);
  ev("w2", o.s);
  ev("w3", p.s);

  for (const t of ["t1", "t2", "t3", "t4", "t5a", "t5b", "t5c"]) sfx("tick", cur.ev[t], 0.3);
  for (const base of [r2, r3_]) for (let q = 0; q < 4; q++) sfx("tick", base + 0.4 + q * 0.3, 0.25);
  sfx("counter", d.s, 0.12);
  for (const t of ["stamp1", "stamp2", "stamp3"]) sfx("snap", cur.ev[t], 0.45);
  for (let q = 0; q < 4; q++) sfx("snap", montage + 1.0 + q * 0.5, 0.32);
  sfx("snap", p.s, 0.45);
  end(10, 1.0);
}

// ---------- S4 the cost ----------
begin("s4");
{
  const a = say("04a", 0.6);
  ev("big", a.s);
  const b = say("04b", a.e + 0.25);
  ev("big2", b.s);
  const c = say("04c", b.e + 0.7);
  ev("stmt", c.s);
  const d = say("04d", c.e + 0.6);
  ev("card", d.s - 0.3);
  ev("count", d.s + 0.3);
  ev("after", d.e + 0.2);
  sfx("counter", d.s + 0.3, 0.22);
  end(10, 2.6);
}

// ---------- S5 the turn ----------
begin("s5");
{
  const a = say("05a", 0.3);
  ev("a", a.s);
  const b = say("05b", a.e + 0.2);
  ev("b", b.s - 0.1);
  ev("mark", b.e + 0.1);
  sfx("switch", b.s - 0.1, 0.18);
  end(5, 1.8);
}

// ---------- S6 how it works ----------
begin("s6");
{
  say("06a", 0.4);
  const b = say("06b", cur.lastEnd + 0.2);
  [0.3, 0.43, 0.57, 0.72, 0.9].forEach((f, i) => {
    ev(`c${i}`, b.s + b.d * f);
    sfx("tick", b.s + b.d * f, 0.28);
  });
  const flow = b.s - 0.8;
  ev("flow", flow);
  [8, 17, 26].forEach((i) => sfx("success", flow + i * 0.25 + 1.8, 0.18));
  const c = say("06c", Math.max(b.e + 0.3, flow + 9.0));
  ev("badges", c.s);
  sfx("pop", c.s, 0.18);
  sfx("pop", c.s + 0.7, 0.18);
  const d = say("06d", c.e + 0.4);
  ev("tag", d.s);
  end(10, 1.4);
}

// ---------- S7 what you get ----------
begin("s7");
{
  say("07a", 0.4);
  const b = say("07b", cur.lastEnd + 0.3);
  [0, 0.33, 0.62].forEach((f, i) => {
    ev(`p${i}`, b.s + b.d * f);
    sfx("tick", b.s + b.d * f, 0.28);
  });
  say("07c", b.e + 0.3);
  end(8, 1.0);
}

// ---------- S8 credibility ----------
begin("s8");
{
  const a = say("08a", 0.4);
  ev("stats", a.e - 0.3);
  const b = say("08b", a.e + 0.15);
  ev("acct", b.s + 0.3);
  ev("acctD", Math.max(1.4, b.d * 0.42));
  ev("plat", b.s + 0.6);
  sfx("counter", b.s + 0.3, 0.2);
  const c = say("08c", b.e + 0.3);
  ev("quote", c.s - 0.1);
  end(8, 1.0);
}

// ---------- S9 CTA ----------
begin("s9");
{
  const a = say("09a", 0.4);
  ev("a", a.s);
  const b = say("09b", a.e + 0.1);
  ev("b", b.s - 0.05);
  const c = say("09c", b.e + 0.4);
  ev("url", c.s);
  ev("btn", c.s + 0.5);
  ev("cov", c.s + 1.4);
  ev("disc", c.s + 2.2);
  sfx("chime", c.s, 0.3);
  sfx("pop", c.s + 0.5, 0.22);
  end(8, 3.5);
}

// ---------- lay scenes end to end ----------
let t = 0;
for (const s of scenes) {
  s.start = r3(t);
  t += s.dur;
}
const total = r3(t);

const timing = {
  total,
  scenes: Object.fromEntries(scenes.map((s) => [s.name, { start: s.start, dur: s.dur, ev: s.ev }])),
};

// ---------- write into index.html ----------
let html = readFileSync("index.html", "utf8");
const swap = (re, fn, what) => {
  if (!re.test(html)) throw new Error(`index.html: ${what} not found`);
  html = html.replace(re, fn);
};
swap(/(data-composition-id="main" data-start="0" data-duration=")[\d.]+"/, (_, a) => `${a}${total}"`, "root duration");
swap(/(id="bg" class="scene clip" data-start="0" data-duration=")[\d.]+"/, (_, a) => `${a}${total}"`, "bg clip");
for (const s of scenes) {
  swap(new RegExp(`(id="${s.name}" class="scene clip" data-start=")[\\d.]+(" data-duration=")[\\d.]+"`), (_, a, b) => `${a}${s.start}${b}${s.dur}"`, `${s.name} clip`);
}
swap(/(<!-- TIMING:BEGIN[^>]*-->)[\s\S]*?(\s*<!-- TIMING:END -->)/, (_, a, b) => `${a}\n    <script id="timing" type="application/json">${JSON.stringify(timing)}</script>${b}`, "timing markers");

const sfxLen = {};
const tags = [];
for (const s of scenes) {
  for (const v of s.vo) {
    tags.push(`      <audio id="vo-${v.id}" src="vo/${v.id}.wav" data-start="${r3(s.start + v.s)}" data-duration="${v.d}" data-volume="1" data-track-index="9"></audio>`);
  }
}
let n = 0;
const sfxTracks = [];
for (const s of scenes) {
  for (const x of s.sfx) {
    n += 1;
    sfxLen[x.name] ??= probe(`sfx/${x.name}.wav`);
    if (!sfxTracks.includes(x.name)) sfxTracks.push(x.name);
    tags.push(`      <audio id="sfx-${String(n).padStart(2, "0")}-${x.name}" src="sfx/${x.name}.wav" data-start="${r3(s.start + x.at)}" data-duration="${sfxLen[x.name]}" data-volume="${x.vol}" data-track-index="${10 + sfxTracks.indexOf(x.name)}"></audio>`);
  }
}
swap(/(<!-- AUDIO:BEGIN[^>]*-->)[\s\S]*?(\s*<!-- AUDIO:END -->)/, (_, a, b) => `${a}\n${tags.join("\n")}${b}`, "audio markers");
writeFileSync("index.html", html);

for (const s of scenes) console.log(`${s.name}  start ${s.start.toFixed(2).padStart(6)}  dur ${s.dur.toFixed(2).padStart(5)}`);
console.log(`total ${total}s, ${tags.length - n} narration lines, ${n} sound effects`);

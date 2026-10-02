// Lays out "Defence contracting coverage" around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

// s3 eligibility lane geometry (shared with the page through the timing events)
const GATES = [250, 500, 750]; // gate centres, px from the lane's left edge
const X0 = 30, CW = 120, XEND = 770, SPEED = 300, PASS_DUR = 2.8;
const PLAN = [0, -1, 1, -1, 2]; // gate index each solicitation is stopped at, -1 = passes

t.begin("s1");
{
  const a = t.say("01", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.52));
  t.end(4.5, 1.0);
}

t.begin("s2");
{
  const a = t.say("02", 0.5);
  t.ev("c0", a.s - 0.1);
  t.sfx("pop", a.s - 0.1, 0.2);
  t.ev("c1", at(a, 0.2));
  t.sfx("pop", at(a, 0.2), 0.2);
  t.ev("c2", at(a, 0.45));
  t.sfx("pop", at(a, 0.45), 0.2);
  t.ev("cap", at(a, 0.68));
  t.end(9, 1.2);
}

t.begin("s3");
{
  const a = t.say("03", 0.6);
  [0.5, 0.64, 0.88].forEach((f, i) => { t.ev(`r${i}`, at(a, f)); t.sfx("tick", at(a, f), 0.3); });
  const b = t.say("04", a.e + 0.4);
  t.ev("shift", b.s - 0.3);
  t.ev("head", b.s);
  [0.58, 0.77, 0.9].forEach((f, i) => { t.ev(`g${i}`, at(b, f)); t.sfx("pop", at(b, f), 0.18); });
  const flow = at(b, 0.58) + 0.1;
  let last = 0;
  PLAN.forEach((g, i) => {
    const m = flow + i * 0.25;
    const stopX = g < 0 ? XEND : GATES[g] - 8 - CW;
    const d = g < 0 ? PASS_DUR : (stopX - X0) / SPEED + 0.3;
    t.ev(`m${i}`, m);
    t.ev(`a${i}`, m + d);
    t.sfx(g < 0 ? "tick" : "snap", m + d, g < 0 ? 0.22 : 0.2);
    last = Math.max(last, m + d);
  });
  t.hold(last);
  t.end(10, 1.6);
}

t.begin("s4");
{
  const a = t.say("05", 0.5);
  t.ev("ver", at(a, 0.38));
  t.sfx("tick", at(a, 0.38), 0.3);
  t.ev("link", at(a, 0.7));
  t.sfx("pop", at(a, 0.7), 0.2);
  t.end(6, 1.4);
}

t.begin("s5");
{
  const a = t.say("06", 0.4);
  t.ev("k0", at(a, 0.1));
  t.sfx("pop", at(a, 0.1), 0.2);
  t.ev("k1", at(a, 0.3));
  t.sfx("pop", at(a, 0.3), 0.2);
  t.ev("l0", at(a, 0.55));
  t.ev("l1", at(a, 0.7));
  t.sfx("switch", at(a, 0.7), 0.16);
  t.end(8, 1.3);
}

t.begin("s6");
{
  const a = t.say("07", 0.4);
  [0.1, 0.26, 0.37, 0.57, 0.76].forEach((f, i) => t.ev(`b${i}`, at(a, f)));
  t.sfx("pop", at(a, 0.1), 0.15);
  t.sfx("pop", at(a, 0.26), 0.15);
  t.sfx("switch", at(a, 0.57), 0.18);
  t.end(10, 1.3);
}

t.begin("s7");
{
  const a = t.say("08", 0.4);
  t.ev("a", 0.3);
  t.ev("url", at(a, 0.6));
  t.sfx("chime", at(a, 0.6), 0.3);
  t.sfx("pop", at(a, 0.6) + 0.4, 0.22);
  t.end(6, 3.2);
}

t.write();

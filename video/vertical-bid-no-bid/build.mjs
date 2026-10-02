// Lays out "Bid or no bid: five questions" (vertical 1080x1920) around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.42));
  t.end(4.5, 1.0);
}

t.begin("s2");
{
  // one card per question; sub line lands on the words that say it (null = no sub)
  const subF = { "02": 0.55, "05": 0.5, "06": 0.6 };
  let prev = 0.6;
  ["02", "03", "04", "05", "06"].forEach((id, i) => {
    const l = t.say(id, prev);
    t.ev(`q${i}`, Math.max(0.3, l.s - 0.15));
    t.sfx("pop", Math.max(0.3, l.s - 0.15), 0.15);
    if (subF[id]) t.ev(`s${i}`, at(l, subF[id]));
    t.ev(`k${i}`, l.e - 0.05);
    t.sfx("tick", l.e - 0.05, 0.3);
    prev = l.e + 0.35;
  });
  t.end(6, 1.2);
}

t.begin("s3");
{
  const a = t.say("07", 0.7);
  t.ev("a", a.s - 0.1);
  t.ev("flip", a.s + 0.1);
  t.sfx("switch", a.s + 0.1, 0.22);
  t.ev("stamp", at(a, 0.72));
  t.sfx("snap", at(a, 0.72), 0.4);
  t.end(4.5, 1.6);
}

t.begin("s4");
{
  const a = t.say("08", 0.6);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.4));
  t.ev("url", at(a, 0.8));
  t.sfx("chime", at(a, 0.8), 0.3);
  t.sfx("pop", at(a, 0.8) + 0.4, 0.2);
  t.end(7, 3.0);
}

t.write();

// Lays out "Not a match" (vertical 9:16 cut of the bid-match explainer) around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01a", 0.4);
  // word groups land on the words (comma pause sits at ~48 to 57% of the line)
  t.ev("g0", a.s);
  t.ev("g1", at(a, 0.27));
  t.ev("g2", at(a, 0.36));
  t.ev("g3", at(a, 0.57));
  t.ev("g4", at(a, 0.77));
  t.end(5, 0.9);
}

t.begin("s2");
{
  const cards = [];
  let prevEnd = 0;
  ["03e", "03h", "03k"].forEach((id, i) => {
    const arrive = i === 0 ? 0.2 : prevEnd + 0.1;
    const l = t.say(id, i === 0 ? 1.3 : prevEnd + 1.2);
    t.ev(`c${i}`, arrive);
    t.ev(`h${i}`, arrive + 0.5);
    t.ev(`x${i}`, l.s + 0.04);
    t.sfx("pop", arrive + 0.1, 0.14);
    t.sfx("snap", l.s + 0.04, 0.35);
    prevEnd = l.e;
    cards.push(l);
  });
  t.ev("illus", 0.8);
  t.end(7, 1.1);
}

t.begin("s3");
{
  const a = t.say("05a", 0.4);
  t.ev("a", 0.3);
  const b = t.say("05b", a.e + 0.3);
  t.ev("b", b.s - 0.05);
  t.ev("mark", at(b, 0.75));
  t.sfx("switch", b.s, 0.16);
  t.end(5.5, 1.5);
}

t.begin("s4");
{
  const a = t.say("09a", 0.3);
  t.ev("a", 0.25);
  const b = t.say("09b", a.e + 0.2);
  t.ev("b", b.s - 0.05);
  const c = t.say("09c", b.e + 0.3);
  t.ev("btn", c.s + 0.05);
  t.sfx("pop", c.s + 0.1, 0.15);
  t.ev("url", at(c, 0.47));
  t.sfx("chime", at(c, 0.47), 0.3);
  t.ev("disc", at(c, 0.47) + 1.0);
  t.end(7, 2.8);
}

t.write();

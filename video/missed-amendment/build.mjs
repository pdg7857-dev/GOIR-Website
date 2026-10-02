// Lays out "The cost of a missed amendment" around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01", 0.5);
  [0.12, 0.47, 0.8].forEach((f, i) => { t.ev(`p${i}`, at(a, f)); t.sfx("tick", at(a, f), 0.3); });
  t.end(5, 1.2);
}

t.begin("s2");
{
  const a = t.say("02", 0.6);
  t.ev("n1", at(a, 0.34));
  t.sfx("pop", at(a, 0.34), 0.15);
  t.ev("flip", at(a, 0.8));
  t.sfx("switch", at(a, 0.8), 0.25);
  const b = t.say("03", a.e + 0.35);
  t.ev("n2", b.s);
  t.sfx("pop", b.s, 0.15);
  t.ev("hl", at(b, 0.42));
  t.ev("stamp", at(b, 0.76));
  t.sfx("snap", at(b, 0.76), 0.4);
  t.end(8, 1.4);
}

t.begin("s3");
{
  const a = t.say("04", 0.6);
  t.ev("orig", at(a, 0.04));
  [0.2, 0.3, 0.4, 0.5, 0.6].forEach((f, i) => { t.ev(`d${i}`, at(a, f)); t.sfx("pop", at(a, f), 0.12); });
  t.ev("phone", at(a, 0.7));
  t.ev("mute", at(a, 0.9));
  t.sfx("switch", at(a, 0.9), 0.15);
  t.end(8, 1.3);
}

t.begin("s4");
{
  const a = t.say("05", 0.8);
  [0.1, 0.19, 0.28, 0.37, 0.46].forEach((f, i) => {
    t.ev(`c${i}`, at(a, f));
    t.sfx("pop", at(a, f), 0.1);
    t.sfx("tick", at(a, f) + 0.75, 0.22);
  });
  t.ev("reach", at(a, 0.62));
  t.ev("orig", at(a, 0.84));
  t.end(8, 1.4);
}

t.begin("s5");
{
  const a = t.say("06", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.3));
  t.ev("url", at(a, 0.66));
  t.sfx("chime", at(a, 0.66), 0.3);
  t.sfx("pop", at(a, 0.66) + 0.4, 0.22);
  t.end(6, 3.2);
}

t.write();

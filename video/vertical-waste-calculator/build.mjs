// Lays out "Opportunity Waste Calculator" (vertical 1080x1920) around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.48));
  t.sfx("switch", at(a, 0.48), 0.16);
  t.end(4, 1.0);
}

t.begin("s2");
{
  // card arrives, then each slider row lights up and fills on the words that name it
  t.ev("card", 0.2);
  t.sfx("pop", 0.35, 0.14);
  const a = t.say("02", 0.7);
  t.ev("r0", at(a, 0.22)); // "hourly rate"
  t.ev("f0", at(a, 0.66)); // "Say fifty-five dollars"
  t.sfx("fill", at(a, 0.66), 0.18);
  const b = t.say("03", a.e + 0.25);
  t.ev("r1", b.s);
  t.ev("f1", at(b, 0.8)); // "Say eight"
  t.sfx("fill", at(b, 0.8), 0.18);
  const c = t.say("04", b.e + 0.2);
  t.ev("r2", c.s);
  t.ev("f2", at(c, 0.42)); // "three"
  t.sfx("fill", at(c, 0.42), 0.18);
  t.ev("clear", c.e + 0.35);
  t.end(8, 0.8);
}

t.begin("s3");
{
  // same card: inputs collapse to a summary line, the result panel takes the space
  t.ev("fold", 0.1);
  t.ev("res", 0.55);
  const a = t.say("05", 0.5);
  t.ev("num", at(a, 0.1)); // "two thousand, three hundred and sixty dollars"
  t.sfx("counter", at(a, 0.1), 0.22);
  t.ev("rule", at(a, 0.1) + 2.2);
  t.sfx("pop", at(a, 0.1) + 2.2, 0.14);
  t.ev("sub1", at(a, 0.56)); // "in estimator time alone"
  t.ev("sub2", at(a, 0.74)); // "before a single bid is written"
  t.end(8, 1.3);
}

t.begin("s4");
{
  const a = t.say("06", 0.4);
  t.ev("a", 0.3);
  t.ev("name", at(a, 0.36)); // "The Opportunity Waste Calculator"
  t.ev("url", at(a, 0.78)); // "phildave.com"
  t.sfx("chime", at(a, 0.78), 0.3);
  t.sfx("pop", at(a, 0.78) + 0.4, 0.2);
  t.end(6, 3.0);
}

t.write();

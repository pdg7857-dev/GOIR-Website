// Lays out "What happens after you sign" around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.38));
  t.end(4.5, 1.0);
}

t.begin("s2");
{
  const a = t.say("02", 0.5);
  [0.4, 0.58, 0.76, 0.88].forEach((f, i) => { t.ev(`p${i}`, at(a, f)); t.sfx("tick", at(a, f), 0.3); });
  const b = t.say("03", a.e + 0.3);
  t.ev("cad", b.s - 0.2);
  [0.5, 0.72, 0.9].forEach((f, i) => { t.ev(`ch${i}`, at(b, f)); t.sfx("switch", at(b, f), 0.2); });
  const c = t.say("04", b.e + 0.3);
  t.ev("term", c.s - 0.2);
  t.ev("seal", at(c, 0.72));
  t.sfx("snap", at(c, 0.72), 0.4);
  t.end(8, 1.2);
}

t.begin("s3");
{
  const a = t.say("05", 0.5);
  t.ev("c1", at(a, 0.3));
  for (let i = 0; i < 8; i++) t.sfx("pop", at(a, 0.3) + 0.5 + i * 0.12, 0.1);
  const b = t.say("06", a.e + 0.3);
  t.ev("c2", b.s);
  [0.36, 0.47, 0.6, 0.73, 0.88].forEach((f, i) => { t.ev(`r${i}`, at(b, f)); t.sfx("tick", at(b, f), 0.25); });
  const c = t.say("07", b.e + 0.3);
  t.ev("c3", c.s);
  t.sfx("success", c.s + 0.5, 0.22);
  t.end(8, 1.4);
}

t.begin("s4");
{
  const a = t.say("08", 0.9);
  [0.5, 0.7, 0.88].forEach((f, i) => { t.ev(`q${i}`, at(a, f)); t.sfx("tick", at(a, f), 0.3); });
  t.end(7, 1.6);
}

t.begin("s5");
{
  const a = t.say("09", 0.6);
  t.ev("you", at(a, 0.15));
  t.ev("tune", at(a, 0.6));
  t.end(7, 1.6);
}

t.begin("s6");
{
  const a = t.say("10", 0.3);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.6));
  t.sfx("switch", at(a, 0.6), 0.18);
  t.end(4, 1.2);
}

t.begin("s7");
{
  const a = t.say("11", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.36));
  t.ev("url", at(a, 0.62));
  t.sfx("chime", at(a, 0.62), 0.3);
  t.sfx("pop", at(a, 0.62) + 0.4, 0.22);
  t.end(6, 3.2);
}

t.write();

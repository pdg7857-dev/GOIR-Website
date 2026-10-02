// Lays out "Why not just use bid alerts?" around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01", 0.4);
  t.ev("a", 0.3);
  t.ev("b", at(a, 0.5));
  [0.5, 1.0, 1.5, 1.95, 2.4].forEach((v, i) => { t.ev(`n${i}`, v); t.sfx("pop", v, 0.14); });
  t.end(5, 1.3);
}

t.begin("s2");
{
  const a = t.say("02", 0.5);
  t.ev("kw", at(a, 0.5));
  t.sfx("pop", at(a, 0.5), 0.18);
  [0, 1, 2, 3].forEach((i) => { const v = at(a, 0.66) + i * 0.16; t.ev(`h${i}`, v); t.sfx("tick", v, 0.18); });
  const b = t.say("03", a.e + 0.4);
  t.ev("focus", b.s - 0.15);
  t.sfx("switch", b.s - 0.15, 0.2);
  t.ev("cap1", at(b, 0.05));
  t.ev("blank", at(b, 0.3));
  t.ev("cap2", at(b, 0.6));
  t.end(8, 1.4);
}

t.begin("s3");
{
  const a = t.say("04", 0.7);
  t.ev("r0", a.s - 0.1);
  t.ev("x0", at(a, 0.62));
  t.sfx("snap", at(a, 0.62), 0.25);
  const b = t.say("05", a.e + 0.35);
  t.ev("r1", b.s - 0.15);
  t.ev("x1", at(b, 0.55));
  t.sfx("snap", at(b, 0.55), 0.25);
  const c = t.say("06", b.e + 0.35);
  t.ev("r2", c.s - 0.15);
  t.ev("x2", at(c, 0.62));
  t.sfx("snap", at(c, 0.62), 0.25);
  t.end(9, 1.4);
}

t.begin("s4");
{
  t.ev("type", 0.5);
  t.ev("res", 1.25);
  [0, 1, 2].forEach((i) => t.sfx("pop", 1.25 + i * 0.15, 0.1));
  const a = t.say("07", 0.9);
  t.ev("miss", at(a, 0.4));
  t.ev("gold", at(a, 0.8));
  t.sfx("success", at(a, 0.8), 0.2);
  t.ev("note", at(a, 0.8) + 0.35);
  t.end(6.5, 1.8);
}

t.begin("s5");
{
  const a = t.say("08", 0.5);
  t.ev("scan0", at(a, 0.08));
  t.ev("scan1", at(a, 0.46));
  t.ev("verdict", at(a, 0.48));
  t.sfx("pop", at(a, 0.48), 0.18);
  t.ev("yes", at(a, 0.57));
  t.sfx("tick", at(a, 0.57), 0.3);
  t.ev("serif", at(a, 0.68));
  t.end(9.5, 1.5);
}

t.begin("s6");
{
  const a = t.say("09", 0.5);
  t.ev("l", at(a, 0.04));
  t.ev("r", at(a, 0.52));
  t.sfx("tick", at(a, 0.52) + 0.3, 0.3);
  t.end(5.5, 1.6);
}

t.begin("s7");
{
  const a = t.say("10", 0.4);
  t.ev("a", 0.3);
  t.ev("url", at(a, 0.6));
  t.sfx("chime", at(a, 0.6), 0.3);
  t.sfx("pop", at(a, 0.6) + 0.4, 0.22);
  t.end(6, 3.2);
}

t.write();

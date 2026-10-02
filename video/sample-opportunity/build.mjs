// Lays out "What one qualified opportunity looks like" around its narration. Run: node build.mjs
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();
const at = (line, f) => line.s + line.d * f;

t.begin("s1");
{
  const a = t.say("01", 0.4);
  t.ev("a", 0.3);
  t.ev("q", at(a, 0.3));
  t.ev("b", at(a, 0.55));
  t.ev("sub", at(a, 0.72));
  t.end(4.8, 0.8);
}

t.begin("s2");
{
  // 02 live and current: card header fills
  const a = t.say("02", 0.9);
  t.ev("p0", at(a, 0.05));
  t.sfx("tick", at(a, 0.05), 0.3);
  t.sfx("pop", at(a, 0.05) + 0.1, 0.15);
  t.ev("meta", at(a, 0.38));
  // 03 in your jurisdiction: location row
  const b = t.say("03", a.e + 0.35);
  t.ev("p1", at(b, 0.12));
  t.sfx("tick", at(b, 0.12), 0.3);
  t.ev("deliver", at(b, 0.82));
  // 04 already read: scope, closing, key requirements, fine print
  const c = t.say("04", b.e + 0.35);
  t.ev("p2", at(c, 0.05));
  t.sfx("tick", at(c, 0.05), 0.3);
  [0.22, 0.33, 0.47, 0.65].forEach((f, i) => { t.ev(`r${i}`, at(c, f)); t.sfx("pop", at(c, f), 0.14); });
  // 05 qualified: verdict
  const d = t.say("05", c.e + 0.35);
  t.ev("p3", at(d, 0.07));
  t.sfx("tick", at(d, 0.07), 0.3);
  t.ev("fits", at(d, 0.12));
  t.sfx("snap", at(d, 0.12), 0.35);
  t.ev("why", at(d, 0.36));
  // 06 source link
  const e = t.say("06", d.e + 0.35);
  t.ev("p4", at(e, 0.1));
  t.sfx("tick", at(e, 0.1), 0.3);
  t.ev("link", at(e, 0.3));
  t.sfx("pop", at(e, 0.3), 0.18);
  t.ev("pulse", at(e, 0.66));
  t.end(10, 1.6);
}

t.begin("s3");
{
  const a = t.say("07", 0.6);
  t.ev("a", 0.3);
  t.ev("serif", at(a, 0.15));
  t.ev("form", at(a, 0.26));
  t.ev("trade", at(a, 0.36));
  t.ev("where", at(a, 0.5));
  t.ev("free", at(a, 0.92));
  t.sfx("snap", at(a, 0.92), 0.3);
  t.end(8, 1.4);
}

t.begin("s4");
{
  const a = t.say("08", 0.6);
  t.ev("a", 0.3);
  t.ev("url", at(a, 0.4));
  t.sfx("chime", at(a, 0.4), 0.3);
  t.sfx("pop", at(a, 0.4) + 0.4, 0.22);
  t.end(6.5, 3.2);
}

t.write();

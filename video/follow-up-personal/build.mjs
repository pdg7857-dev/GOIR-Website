// Lays out the silent personalized follow-up. No narration: scenes are held for reading time.
// Run: node build.mjs   Render a variant: npx hyperframes render --variables-file variants/<name>.json
import { createTiming } from "./shared/tools/timing.mjs";

const t = createTiming();

t.begin("s1");
t.ev("a", 0.3); t.ev("b", 1.5); t.hold(4.0); t.end(4.6, 0);

t.begin("s2");
t.ev("h", 0.3); t.ev("chips", 1.4);
for (let i = 0; i < 6; i++) t.sfx("pop", 1.4 + i * 0.18, 0.14);
t.hold(5.0); t.end(5.4, 0);

t.begin("s3");
t.ev("h", 0.3);
[1.0, 1.9, 2.8].forEach((v, i) => { t.ev(`c${i}`, v); t.ev(`x${i}`, v + 0.6); t.sfx("snap", v + 0.6, 0.35); });
t.hold(4.8); t.end(5.2, 0);

t.begin("s4");
t.ev("h", 0.3); t.ev("card", 1.0); t.sfx("success", 1.4, 0.25); t.ev("pts", 2.0);
[2.0, 2.6, 3.2].forEach((v) => t.sfx("tick", v, 0.25));
t.hold(5.0); t.end(5.4, 0);

t.begin("s5");
t.ev("a", 0.3); t.ev("b", 1.2); t.ev("url", 2.6); t.sfx("chime", 2.6, 0.28); t.sfx("pop", 3.0, 0.2);
t.hold(6.5); t.end(7.0, 0);

t.write();

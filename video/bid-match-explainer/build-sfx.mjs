// Writes one <audio> per cue from sfx-cues.json into index.html between the SFX markers.
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";

const { cues } = JSON.parse(readFileSync("sfx-cues.json", "utf8"));
const dur = {};
const lenOf = (name) =>
  (dur[name] ??= Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `sfx/${name}.wav`]).toString().trim()));

const tags = [];
let n = 0;
for (const c of cues) {
  statSync(`sfx/${c.sfx}.wav`);
  for (const at of c.at) {
    n += 1;
    tags.push(`      <audio id="sfx-${String(n).padStart(2, "0")}-${c.sfx}" src="sfx/${c.sfx}.wav" data-start="${at}" data-duration="${lenOf(c.sfx)}" data-volume="${c.vol}" data-track-index="${10 + Object.keys(dur).indexOf(c.sfx)}"></audio>`);
  }
}
const html = readFileSync("index.html", "utf8");
const re = /(<!-- SFX:BEGIN[^>]*-->)[\s\S]*?(\s*<!-- SFX:END -->)/;
if (!re.test(html)) throw new Error("SFX markers not found in index.html");
writeFileSync("index.html", html.replace(re, `$1\n${tags.join("\n")}$2`));
console.log(`wrote ${n} sfx cues`);

"""Synthesize a project's sample narration from its cues.json with Kokoro-82M (local).

Usage (from a project folder): python3 shared/tools/gen-vo.py MODEL_ONNX VOICES_DIR
  MODEL_ONNX  Kokoro-82M model_quantized.onnx (onnx-community export)
  VOICES_DIR  folder of Kokoro voice .bin files (float32, 510 x 256)
Writes vo/<id>.wav for every cue without a "src". Real recordings replace these files.
"""
import json, sys, os, glob
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

model, voices_dir = sys.argv[1], sys.argv[2]
cfg = json.load(open("cues.json"))
os.makedirs("vo", exist_ok=True)
npz = "vo/.voices.npz"
voices = {os.path.basename(p)[:-4]: np.fromfile(p, dtype=np.float32).reshape(-1, 1, 256)
          for p in glob.glob(os.path.join(voices_dir, "*.bin"))}
np.savez(npz, **voices)
tts = Kokoro(model, npz)
for c in cfg["cues"]:
    if "src" in c:
        continue
    audio, sr = tts.create(c.get("say", c["text"]), voice=cfg.get("voice", "am_michael"), speed=cfg.get("speed", 1.1), lang="en-us")
    sf.write(f"vo/{c['id']}.wav", audio, sr)
    print(c["id"], round(len(audio) / sr, 2), c["text"][:60])
os.remove(npz)

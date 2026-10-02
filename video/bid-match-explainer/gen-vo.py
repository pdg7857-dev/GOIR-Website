"""Synthesize the sample narration in vo-cues.json with Kokoro (local, offline).

Usage: python3 gen-vo.py MODEL_ONNX VOICES_DIR
  MODEL_ONNX  Kokoro-82M model_quantized.onnx (onnx-community export)
  VOICES_DIR  folder of Kokoro voice .bin files (float32, 510 x 256)
Writes vo/<id>.wav.
"""
import json, sys, os, glob
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

model, voices_dir = sys.argv[1], sys.argv[2]
cfg = json.load(open("vo-cues.json"))
npz = "vo/.voices.npz"
voices = {os.path.basename(p)[:-4]: np.fromfile(p, dtype=np.float32).reshape(-1, 1, 256)
          for p in glob.glob(os.path.join(voices_dir, "*.bin"))}
np.savez(npz, **voices)
tts = Kokoro(model, npz)
for c in cfg["cues"]:
    audio, sr = tts.create(c.get("say", c["text"]), voice=cfg["voice"], speed=cfg["speed"], lang="en-us")
    sf.write(f"vo/{c['id']}.wav", audio, sr)
    print(c["id"], round(len(audio) / sr, 3), c["text"][:60])
os.remove(npz)

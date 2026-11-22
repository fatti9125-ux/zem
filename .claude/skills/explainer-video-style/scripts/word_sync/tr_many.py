import json, sys, wave, glob, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel(sys.argv[1], device="cpu", compute_type="int8", cpu_threads=4)
out = {}
for f in sorted(glob.glob(sys.argv[2] + "/s*.wav")):
    wf = wave.open(f); sr = wf.getframerate(); a = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    if sr != 16000:
        import math; idx = np.arange(0, len(a), sr / 16000); a = np.interp(idx, np.arange(len(a)), a).astype(np.float32)
    segs, _ = m.transcribe(a, language="en", word_timestamps=True, vad_filter=False, beam_size=5)
    out[f.split("/")[-1]] = [[w.start, w.end, w.word] for s in segs for w in s.words]
json.dump(out, open(sys.argv[3], "w"))
print("done", len(out))

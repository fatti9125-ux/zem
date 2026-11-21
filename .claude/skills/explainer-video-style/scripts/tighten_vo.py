#!/usr/bin/env python3
"""Remove dead air from a voice-over: every pause longer than --min is shrunk to --keep seconds.
Writes the tightened WAV and remap.json (removed spans in ORIGINAL time) so an edit timed to the original VO can be shifted.

Usage: python3 -I tighten_vo.py vo.mp3 vo_tight.wav remap.json [--noise -38] [--min 0.3] [--keep 0.15]
Remap any original time x:  T(x) = x - sum(b-a for a,b in cuts if x>=b) - (x-a if a<x<b)
  - footage EDL: map every cut boundary through T before build_footage.py
  - SFX events: map every "t"/"until"
  - HTML scenes: keep the scene code in ORIGINAL times and make P() map its start: P=(t,s,d)=>cl((t-T(s))/d)
    (load a lib copy where `const P` is `let P`), and wrap absolute comparisons (t>123.4 -> t>T(123.4)), stepVal times,
    scene table bounds and seqFrame start times. Durations stay the same, so animations keep their speed.
"""
import argparse, json, re, subprocess
ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out"); ap.add_argument("remap")
ap.add_argument("--noise", default="-38"); ap.add_argument("--min", type=float, default=0.3); ap.add_argument("--keep", type=float, default=0.15)
a = ap.parse_args()
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.src], capture_output=True, text=True).stdout)
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", a.src, "-af", f"silencedetect=noise={a.noise}dB:d={a.min}", "-f", "null", "-"], capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", log)]; en = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", log)]
cuts = []
for s, e in zip(st, en):
    if s <= 0.01: cuts.append((0.0, max(0.0, e - 0.05))); continue
    if e - s > a.min: m = (s + e) / 2; h = (e - s - a.keep) / 2; cuts.append((m - h, m + h))
if len(st) > len(en): cuts.append((st[-1] + 0.15, dur))   # trailing silence
keep, prev = [], 0.0
for s, e in cuts:
    if s > prev: keep.append((prev, s))
    prev = e
if prev < dur: keep.append((prev, dur))
fc = ";".join(f"[0:a]atrim={s:.4f}:{e:.4f},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st={max(0, e - s - 0.012):.4f}:d=0.012[a{i}]" for i, (s, e) in enumerate(keep))
fc += ";" + "".join(f"[a{i}]" for i in range(len(keep))) + f"concat=n={len(keep)}:v=0:a=1[o]"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.src, "-filter_complex", fc, "-map", "[o]", "-ar", "44100", a.out], check=True)
json.dump({"cuts": cuts, "old_len": dur}, open(a.remap, "w"), indent=1)
print(f"removed {sum(e - s for s, e in cuts):.2f}s of silence in {len(cuts)} gaps -> {a.out}")

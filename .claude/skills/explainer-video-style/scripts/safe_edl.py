#!/usr/bin/env python3
"""Make a footage EDL copyright-safer before build_footage.py:
  1. no single source shot longer than --max seconds (default 3.6): long cuts are split and refilled from
     other clean shots (same era group), never reusing an in-point;
  2. no cut may touch a banned range of a source (ESRB card, "Rockstar Games presents", logos, end slates).
Usage: python3 -I safe_edl.py edl.json out.json --rules rules.json [--max 3.6]
rules.json: {"ban":   {"t1": [[0,2.6],[13.4,17.2],[75,95]], ...},           # seconds in each source to never show
             "length":{"t1": 90.0, ...},                                  # source durations (to stay in range)
             "group": {"t1":"vi","t2":"vi","launch":"vi","gtav":"v","rdr2":"rdr"}}   # refill from same era
Clean refill candidates are generated every 1.7 s across each source, skipping banned ranges.
Also keep: no trailer audio, graphics/dim over every shot, a sources card at the end, "not affiliated" line.
"""
import argparse, json
ap = argparse.ArgumentParser(); ap.add_argument("edl"); ap.add_argument("out"); ap.add_argument("--rules", required=True); ap.add_argument("--max", type=float, default=3.6)
a = ap.parse_args(); cfg = json.load(open(a.edl)); R = json.load(open(a.rules))
BAN, LEN, GRP = R.get("ban", {}), R.get("length", {}), R.get("group", {})
def bad(s, i, d): return any(i < e and i + d > st for st, e in BAN.get(s, [])) or (s in LEN and i + d > LEN[s] - 0.2) or i < 0
cand = {}
for s in LEN:
    v = 1.0
    while v < LEN[s]:
        if not bad(s, v, a.max): cand.setdefault(GRP.get(s, s), []).append([s, round(v, 1)])
        v += 1.7
used = {(c[2], round(c[3], 1)) for c in cfg["cuts"] if c[2]}
def refill(src):
    for p in cand.get(GRP.get(src, src), []):
        if (p[0], p[1]) not in used: used.add((p[0], p[1])); return p
    raise SystemExit(f"ran out of clean shots for group {GRP.get(src, src)}")
out, split, fixed = [], 0, 0
for c0, c1, src, sin, opt in cfg["cuts"]:
    if not src or opt.startswith(("black", "split")): out.append([c0, c1, src, sin, opt]); continue
    n = int((c1 - c0) / a.max - 1e-9) + 1; step = (c1 - c0) / n; split += n > 1
    for k in range(n):
        s0, s1 = round(c0 + k * step, 3), round(c0 + (k + 1) * step, 3)
        s, i = (src, sin) if k == 0 else refill(src)
        if bad(s, i, s1 - s0): s, i = refill(src); fixed += 1
        out.append([s0, s1, s, i, opt if s == src else ""])
cfg["cuts"] = out; json.dump(cfg, open(a.out, "w"), indent=0)
print(f"{len(out)} cuts, longest {max(c[1]-c[0] for c in out):.2f}s, {split} long cuts split, {fixed} banned in-points replaced")

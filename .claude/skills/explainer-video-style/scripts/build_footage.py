#!/usr/bin/env python3
"""Cut a footage track (1280x720, 30 fps, graded) from real clips on VO beats - the bottom layer of a footage-led edit.

Usage: python3 -I build_footage.py edl.json out.mp4
edl.json: {"sources": {"t1": "trailer1.mp4", "gp": "gameplay.mp4"},
           "grade": "eq=contrast=1.08:saturation=1.12:brightness=-0.02",
           "cuts": [[0.0, 3.0, "t1", 120.0, ""], [3.0, 5.8, "gp", 46.0, "crop"], [54.0, 55.2, null, 0, "black"],
                    [55.2, 57.1, "t1", 9.0, "rev"], [128.8, 132.6, "t1", 60.0, "split:gp:128.0"]]}
Optional "size": [1080, 1920] for vertical Shorts (sources are cover-cropped to fill the frame, never letterboxed).
Optional "debar": 0.74 (default for vertical) trims baked-in black cinema bars from trailers first; 0 disables.
Each cut: [out_start, out_end, source, source_in, opts]. opts: "" | crop (zoom 1.18, hides HUD/minimap/watermarks) |
rev (reverse - rewind beats) | black | split:<src2>:<in2> (2-up comparison). Frame counts are exact so the track stays on the VO.
Then put the transparent graphics layer on top:  ffmpeg -i out.mp4 -framerate 30 -i ov/%04d.png -i mix.wav
  -filter_complex "[0:v][1:v]overlay" -c:v libx264 -crf 18 -c:a aac final.mp4
"""
import json, os, subprocess, sys
cfg = json.load(open(sys.argv[1])); out = sys.argv[2]; SRC = cfg["sources"]; WD, HT = cfg.get("size", [1280, 720]); DB = cfg.get("debar", 0.74 if HT > WD else 0)  # vertical: cut baked-in cinematic bars (2.39:1 trailers) before the cover crop
DEBAR = f"crop=iw:trunc(ih*{DB}/2)*2," if DB else ""
GRADE = cfg.get("grade", "eq=contrast=1.08:saturation=1.12:brightness=-0.02")
tmp = out + ".segs"; os.makedirs(tmp, exist_ok=True); lst = open(os.path.join(tmp, "list.txt"), "w")
enc = ["-an", "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", "-pix_fmt", "yuv420p"]
for i, (a, b, src, sin, opt) in enumerate(cfg["cuts"]):
    n = round((b - a) * 30); seg = os.path.join(tmp, f"{i:03d}.mp4"); dur = str(n / 30 + 0.5)
    base = f"fps=30,{DEBAR}scale={WD}:{HT}:force_original_aspect_ratio=increase,crop={WD}:{HT},{GRADE}"
    if opt == "black":
        cmd = ["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"color=c=black:s={WD}x{HT}:r=30", "-frames:v", str(n)] + enc + [seg]
    elif opt.startswith("split"):
        _, s2, in2 = opt.split(":")
        fc = f"[0:v]fps=30,scale=-2:720,crop=640:720,{GRADE}[l];[1:v]fps=30,scale=-2:720,crop=640:720,{GRADE}[r];[l][r]hstack=2"
        cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(sin), "-t", dur, "-i", SRC[src], "-ss", in2, "-t", dur, "-i", SRC[s2], "-filter_complex", fc, "-frames:v", str(n)] + enc + [seg]
    else:
        vf = base + (f",scale={int(WD*1.18)//2*2}:{int(HT*1.18)//2*2},crop={WD}:{HT}" if "crop" in opt else "") + (",reverse" if "rev" in opt else "")
        cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(sin), "-t", dur, "-i", SRC[src], "-vf", vf, "-frames:v", str(n)] + enc + [seg]
    subprocess.run(cmd, check=True); lst.write(f"file '{os.path.abspath(seg)}'\n")
lst.close()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(tmp, "list.txt")] + enc + [out], check=True)
print("wrote", out)

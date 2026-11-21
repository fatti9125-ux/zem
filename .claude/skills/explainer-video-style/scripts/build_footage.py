#!/usr/bin/env python3
"""Cut a footage track (1280x720, 30 fps, graded) from real clips on VO beats - the bottom layer of a footage-led edit.

Usage: python3 -I build_footage.py edl.json out.mp4
edl.json: {"sources": {"t1": "trailer1.mp4", "gp": "gameplay.mp4"},
           "grade": "eq=contrast=1.08:saturation=1.12:brightness=-0.02",
           "cuts": [[0.0, 3.0, "t1", 120.0, ""], [3.0, 5.8, "gp", 46.0, "crop"], [54.0, 55.2, null, 0, "black"],
                    [55.2, 57.1, "t1", 9.0, "rev"], [128.8, 132.6, "t1", 60.0, "split:gp:128.0"]]}
Each cut: [out_start, out_end, source, source_in, opts]. opts: "" | crop (zoom 1.18, hides HUD/minimap/watermarks) |
rev (reverse - rewind beats) | black | split:<src2>:<in2> (2-up comparison). Frame counts are exact so the track stays on the VO.
Then put the transparent graphics layer on top:  ffmpeg -i out.mp4 -framerate 30 -i ov/%04d.png -i mix.wav
  -filter_complex "[0:v][1:v]overlay" -c:v libx264 -crf 18 -c:a aac final.mp4
"""
import json, os, subprocess, sys
cfg = json.load(open(sys.argv[1])); out = sys.argv[2]; SRC = cfg["sources"]; GRADE = cfg.get("grade", "eq=contrast=1.08:saturation=1.12:brightness=-0.02")
tmp = out + ".segs"; os.makedirs(tmp, exist_ok=True); lst = open(os.path.join(tmp, "list.txt"), "w")
enc = ["-an", "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", "-pix_fmt", "yuv420p"]
for i, (a, b, src, sin, opt) in enumerate(cfg["cuts"]):
    n = round((b - a) * 30); seg = os.path.join(tmp, f"{i:03d}.mp4"); dur = str(n / 30 + 0.5)
    base = f"fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,{GRADE}"
    if opt == "black":
        cmd = ["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "color=c=black:s=1280x720:r=30", "-frames:v", str(n)] + enc + [seg]
    elif opt.startswith("split"):
        _, s2, in2 = opt.split(":")
        fc = f"[0:v]fps=30,scale=-2:720,crop=640:720,{GRADE}[l];[1:v]fps=30,scale=-2:720,crop=640:720,{GRADE}[r];[l][r]hstack=2"
        cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(sin), "-t", dur, "-i", SRC[src], "-ss", in2, "-t", dur, "-i", SRC[s2], "-filter_complex", fc, "-frames:v", str(n)] + enc + [seg]
    else:
        vf = base + (",scale=1510:850,crop=1280:720:115:50" if "crop" in opt else "") + (",reverse" if "rev" in opt else "")
        cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(sin), "-t", dur, "-i", SRC[src], "-vf", vf, "-frames:v", str(n)] + enc + [seg]
    subprocess.run(cmd, check=True); lst.write(f"file '{os.path.abspath(seg)}'\n")
lst.close()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(tmp, "list.txt")] + enc + [out], check=True)
print("wrote", out)

#!/usr/bin/env python3
"""Export an editable project package for one part: separate layers, cut list, editor timeline (FCP7 XML for
Premiere / DaVinci Resolve / Final Cut), and an editing-breakdown video that shows every layer side by side.
Usage: python3 export_project.py <A|B>"""
import json, os, subprocess, sys, csv, re
PART = sys.argv[1]
EXT = json.load(open(sys.argv[2])) if len(sys.argv) > 2 else None
S = "/tmp/claude-0/-home-user-zem/54129ae5-772d-5b8a-b13b-434b17456a25/scratchpad/"
R = "/home/user/zem/projects/gta6_part3/"
cfg = dict(A=dict(edl=S+"p3/edl3.json", foot=S+"p3/footage3.mp4", ov=S+"preview/ov3", mix=S+"preview/mix_p3.wav",
                  beat=S+"preview/beat_p3.wav", sfx=S+"preview/sfx_p3.wav", vo=(0.0, 329.6), dur=331.2, off=0.0,
                  scenes=R+"source/p3_list.js", final=S+"GTA6_Part3_A_ViceCity_vs_Miami.mp4"),
           B=dict(edl=S+"p3/edl3b.json", foot=S+"p3/footage3b.mp4", ov=S+"preview/ovb", mix=S+"preview/mix_p3b.wav",
                  beat=S+"preview/beat_p3b.wav", sfx=S+"preview/sfx_p3b.wav", vo=(329.6, 592.93), dur=264.6, off=329.6,
                  scenes=R+"source/p3b_list.js", final=S+"GTA6_Part3_B_FloridaMan_to_End.mp4")).get(PART)
if EXT: cfg = EXT["cfg"]; R = EXT["root"]; NAMES_EXTRA = EXT.get("names", {})
O = R + f"exports/{PART}/"; os.makedirs(O, exist_ok=True)
NAMES = {"t1": "GTA VI Trailer 1 (Rockstar Games)", "t2": "GTA VI Trailer 2 (Rockstar Games)", "launch": "GTA VI Launch Trailer (Rockstar Games)"}
def nm(s): return NAMES.get(s, f"Mixkit stock clip #{s[1:]}" if s and s.startswith("m") else str(s))
def run(*a): subprocess.run(list(a), check=True)
def tc(t): m, s = divmod(t, 60); return f"{int(m):02d}:{s:05.2f}"

# 1) layers
run("cp", cfg["foot"], O + "1_footage_layer.mp4")
run("ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", cfg["ov"] + "/%05d.png", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "3M",
    "-auto-alt-ref", "0", "-deadline", "realtime", "-cpu-used", "8", O + "2_graphics_layer_ALPHA.webm")
run("ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", cfg["ov"] + "/%05d.png", "-c:v", "prores_ks", "-profile:v", "4444",
    "-pix_fmt", "yuva444p10le", "-qscale:v", "28", "-vendor", "apl0", O + "2_graphics_layer_ALPHA_prores4444.mov")
a, b = cfg["vo"]
run("ffmpeg", "-v", "error", "-y", "-ss", str(a), "-t", str(b - a), "-i", cfg.get("vo_src", S + "p3/vo3_tight.wav"), "-ac", "1", O + "3_voiceover_tight.wav")
run("cp", cfg["beat"], O + "4_music_bed.wav"); run("cp", cfg["sfx"], O + "5_sfx.wav"); run("cp", cfg["mix"], O + "6_final_mix.wav")
run("cp", cfg["final"], O + "FINAL_VIDEO.mp4")

# 2) cut list (proof of editing: every source excerpt, its in/out and length)
cuts = json.load(open(cfg["edl"]))["cuts"]
with open(O + "cut_list.csv", "w", newline="") as f:
    w = csv.writer(f); w.writerow(["#", "timeline_in", "timeline_out", "length_s", "source", "source_in_s", "treatment"])
    for i, (x0, x1, s, sin, opt) in enumerate(cuts):
        w.writerow([i + 1, tc(x0), tc(x1), round(x1 - x0, 2), "black (under full-screen graphics)" if not s else nm(s),
                    "" if not s else sin, opt or "graded + graphics on top"])

# 3) scene list (style per line)
src = open(cfg["scenes"]).read(); KIND = {"G": "Graphics over footage", "F": "Full footage + type", "W": "White stage + live cards", "P": "Editorial paper"}
scenes = [(float(m.group(1)), float(m.group(2)), m.group(3)) for m in re.finditer(r"^\[([\d.]+),([\d.]+),t=>.*?,'([GFWP])',[\d.]+\],?$", src, re.M | re.S)]
scenes = []
for line in src.splitlines():
    m = re.match(r"^\[([\d.]+),([\d.]+),", line); k = re.search(r",'([GFWP])',[\d.]+\],?\s*$", line)
    if m: scenes.append([float(m.group(1)), float(m.group(2)), None])
    if k and scenes and scenes[-1][2] is None: scenes[-1][2] = k.group(1)
with open(O + "scene_list.csv", "w", newline="") as f:
    w = csv.writer(f); w.writerow(["#", "in", "out", "style"])
    for i, (x0, x1, k) in enumerate(scenes): w.writerow([i + 1, tc(x0 - cfg["off"]), tc(x1 - cfg["off"]), KIND.get(k, k)])

# 4) editor timeline: FCP7 XML (Premiere Pro: File > Import; DaVinci Resolve: File > Import > Timeline). Keep the files next to it.
D = round(cfg["dur"] * 30)
def clip(cid, name, fn, kind, n=D, alpha=False):
    media = f"<{kind}><samplecharacteristics><width>1280</width><height>720</height></samplecharacteristics></{kind}>" if kind == "video" else "<audio><channelcount>2</channelcount></audio>"
    return (f'<clipitem id="{cid}"><name>{name}</name><duration>{n}</duration><rate><timebase>30</timebase><ntsc>FALSE</ntsc></rate>'
            f'<start>0</start><end>{n}</end><in>0</in><out>{n}</out><file id="file-{cid}"><name>{fn}</name><pathurl>{fn}</pathurl>'
            f'<rate><timebase>30</timebase><ntsc>FALSE</ntsc></rate><duration>{n}</duration><media>{media}</media></file>'
            + ('<compositemode>normal</compositemode>' if alpha else '') + '</clipitem>')
xml = ('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE xmeml><xmeml version="4"><sequence><name>' + cfg.get('title', 'GTA6 Part3 ' + PART) + '</name>'
       f'<duration>{D}</duration><rate><timebase>30</timebase><ntsc>FALSE</ntsc></rate><media><video><format><samplecharacteristics><width>1280</width><height>720</height></samplecharacteristics></format>'
       f'<track>{clip("v1", "Footage layer", "1_footage_layer.mp4", "video")}</track>'
       f'<track>{clip("v2", "Graphics layer (alpha)", "2_graphics_layer_ALPHA_prores4444.mov", "video", alpha=True)}</track></video><audio>'
       f'<track>{clip("a1", "Voice-over", "3_voiceover_tight.wav", "audio")}</track>'
       f'<track>{clip("a2", "Music bed", "4_music_bed.wav", "audio")}</track>'
       f'<track>{clip("a3", "SFX", "5_sfx.wav", "audio")}</track></audio></media></sequence></xmeml>')
open(O + "timeline_premiere_resolve.xml", "w").write(xml)

# 5) editing-breakdown video: footage | graphics (on checkerboard) | final | voice waveform + live cut/scene info
def ass_t(t): h, r = divmod(max(t, 0), 3600); m, s = divmod(r, 60); return f"{int(h)}:{int(m):02d}:{s:05.2f}"
ev = []
for i, (x0, x1, s, sin, opt) in enumerate(cuts):
    txt = ("CUT %d · %s\\N%s @ %.1fs · %.1fs long%s" % (i + 1, "BLACK (under graphics)" if not s else "SOURCE", "" if not s else nm(s), sin or 0, x1 - x0, " · " + opt if opt else "")) if s else "CUT %d · black under full-screen graphics" % (i + 1)
    ev.append(f"Dialogue: 0,{ass_t(x0)},{ass_t(x1)},Cut,,0,0,0,,{txt}")
for i, (x0, x1, k) in enumerate(scenes):
    ev.append(f"Dialogue: 0,{ass_t(x0 - cfg['off'])},{ass_t(x1 - cfg['off'])},Scene,,0,0,0,,SCENE {i + 1} · {KIND.get(k, k).upper()}")
hdr = ("[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n"
       "Style: Cut,DejaVu Sans,26,&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,0,7,1000,40,880,1\n"
       "Style: Scene,DejaVu Sans,30,&H0066C7F5,&H00FFFFFF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,0,7,1000,40,800,1\n"
       "Style: Lbl,DejaVu Sans,22,&H00FFFFFF,&H00FFFFFF,&H00000000,&HA0000000,1,0,0,0,100,100,0,0,3,6,0,7,20,20,20,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
lbl = [("1 · FOOTAGE LAYER (trailer excerpts ≤3.3 s + stock)", 20, 20), ("2 · GRAPHICS LAYER (made from scratch, alpha)", 980, 20),
       ("3 · FINAL (footage + graphics + VO + music + SFX)", 20, 560), ("4 · VOICE-OVER + EDIT DECISIONS", 980, 560)]
for s, X, Y in lbl: ev.append(f"Dialogue: 1,0:00:00.00,{ass_t(cfg['dur'])},Lbl,,0,0,0,,{{\\pos({X},{Y})}}{s}")
open(O + "_breakdown.ass", "w").write(hdr + "\n".join(ev) + "\n")
fc = ("color=c=#202020:s=1920x1080:r=30[base];"
      "color=c=black:s=940x529:r=30,format=yuv444p,geq=lum='if(mod(floor(X/16)+floor(Y/16)\\,2)\\,150\\,100)':cb=128:cr=128[chk];"
      "[0:v]scale=940:529[foot];[1:v]scale=940:529,format=rgba[gfx];[chk][gfx]overlay=shortest=1[gchk];[2:v]scale=940:529[fin];"
      "[3:a]aformat=channel_layouts=mono,showwaves=s=940x240:mode=cline:colors=0xF5C766:rate=30[wav];"
      "[base][foot]overlay=10:10[b1];[b1][gchk]overlay=970:10[b2];[b2][fin]overlay=10:545[b3];[b3][wav]overlay=970:830,"
      f"ass={O}_breakdown.ass,format=yuv420p[v]")
run("ffmpeg", "-v", "error", "-y", "-i", O + "1_footage_layer.mp4", "-framerate", "30", "-i", cfg["ov"] + "/%05d.png", "-i", O + "FINAL_VIDEO.mp4",
    "-i", O + "3_voiceover_tight.wav", "-filter_complex", fc, "-map", "[v]", "-map", "2:a", "-t", str(cfg["dur"]), "-c:v", "libx264",
    "-preset", "veryfast", "-crf", "24", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", O + "EDITING_BREAKDOWN.mp4")
os.remove(O + "_breakdown.ass")
print("done", PART, sorted(os.listdir(O)))

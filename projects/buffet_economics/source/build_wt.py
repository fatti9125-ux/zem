import json, re, subprocess, difflib, os
D = os.path.dirname(os.path.abspath(__file__)); S = json.load(open(D + "/sents.json")); W = json.load(open(D + "/whisper.json"))
nrm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
def dur(f): return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f],capture_output=True,text=True).stdout)
t = 0.25; SST = []; WT = []; lst = open(D + "/concat.txt", "w")
subprocess.run(["ffmpeg","-v","error","-y","-f","lavfi","-i","anullsrc=r=24000:cl=mono","-t","0.12",D+"/g1.wav"]); subprocess.run(["ffmpeg","-v","error","-y","-f","lavfi","-i","anullsrc=r=24000:cl=mono","-t","0.35",D+"/g2.wav"]); subprocess.run(["ffmpeg","-v","error","-y","-f","lavfi","-i","anullsrc=r=24000:cl=mono","-t","0.25",D+"/g0.wav"])
lst.write(f"file '{D}/g0.wav'\n")
for i, s in enumerate(S):
    f = f"{D}/s16/s{i:03d}.wav"; d = dur(f); SST.append(round(t, 3))
    sw = s["s"].split(); sn = [nrm(w) for w in sw]
    ww = W.get(f"s{i:03d}.wav", []); wn = [nrm(w[2]) for w in ww]
    times = [None] * len(sw)
    for a, b, n in difflib.SequenceMatcher(None, sn, wn, autojunk=False).get_matching_blocks():
        for k in range(n): times[a + k] = ww[b + k][0]
    # interpolate unmatched by character position
    cpos = []; c = 0
    for w in sw: cpos.append(c); c += len(w) + 1
    tot = max(c, 1); anchors = [(-1, 0.0, 0.0)] + [(k, cpos[k], times[k]) for k in range(len(sw)) if times[k] is not None] + [(len(sw), tot, d)]
    for k in range(len(sw)):
        if times[k] is None:
            lo = max(a for a in anchors if a[0] < k); hi = min((a for a in anchors if a[0] > k), key=lambda a: a[0])
            times[k] = lo[2] + (hi[2] - lo[2]) * (cpos[k] - lo[1]) / max(hi[1] - lo[1], 1)
    WT.append([[sn[k], round(t + max(0, times[k]) - 0.04, 3)] for k in range(len(sw))])
    lst.write(f"file '{f}'\n"); t += d
    gap = "g2" if i + 1 < len(S) and S[i + 1]["p"] != s["p"] else "g1"; t += 0.35 if gap == "g2" else 0.12
    if i + 1 < len(S): lst.write(f"file '{D}/{gap}.wav'\n")
lst.close()
subprocess.run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",D+"/concat.txt","-ar","44100","-ac","1",D+"/vo_full.wav"], check=True)
END = round(dur(D + "/vo_full.wav") + 2.0, 2)
open(D + "/wt.js", "w").write("const WT=" + json.dumps(WT) + ";\nconst SST=" + json.dumps(SST) + ";\nconst END=" + str(END) + ";\n")
print("sentences", len(S), "vo", dur(D + "/vo_full.wav"), "END", END)

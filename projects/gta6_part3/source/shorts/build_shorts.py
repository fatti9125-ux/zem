import json,subprocess,glob,os
S="/tmp/claude-0/-home-user-zem/54129ae5-772d-5b8a-b13b-434b17456a25/scratchpad/"
VO=S+"p3/vo3_tight.wav"
SEG={1:[(38.00,42.30),(370.90,407.10),(408.76,415.15)],2:[(0.0,18.78),(99.34,108.22),(115.58,125.60),(161.70,175.84),(134.74,137.02)]}
src={"t1":S+"gta/t1.mp4","t2":S+"gta/t2.mp4","launch":S+"gta/launch.mp4"}
for f in glob.glob(S+"miami/mk/*.mp4"): src["m"+os.path.basename(f)[:-4]]=f
for k,segs in SEG.items():
    parts=[];fc=""
    for i,(a,b) in enumerate(segs):
        fc+=f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={b-a-0.03:.3f}:d=0.03[s{i}];"
    fc+="".join(f"[s{i}]" for i in range(len(segs)))+f"concat=n={len(segs)}:v=0:a=1[a]"
    subprocess.run(["ffmpeg","-v","error","-y","-i",VO,"-filter_complex",fc,"-map","[a]","-ac","1","-ar","44100",S+f"sh3/vo_s{k}.wav"],check=True)
    loc=0;m=[]
    for a,b in segs: m.append((a,b,loc));loc+=b-a
    json.dump({"segments":m,"duration":loc},open(S+f"sh3/map_s{k}.json","w"));print(k,round(loc,2),[(a,round(l,2)) for a,b,l in m])

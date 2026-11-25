import os,subprocess,time,sys
P=sys.argv[1];N=15150;C=300;out=P+"/ovhd_chunks";os.makedirs(out,exist_ok=True)
done=set(int(f[:-5]) for f in os.listdir(out) if f.endswith(".webm"))
while len(done)<(N+C-1)//C:
    progress=False
    for c in range((N+C-1)//C):
        if c in done: continue
        a=c*C;b=min(N,a+C);fs=[f"{P}/ovhd/{i:05d}.png" for i in range(a,b)]
        if all(os.path.exists(f) and os.path.getsize(f)>1000 for f in fs):
            time.sleep(1)
            r=subprocess.run(["ffmpeg","-nostdin","-v","error","-y","-framerate","30","-start_number",str(a),"-i",P+"/ovhd/%05d.png","-frames:v",str(b-a),"-c:v","libvpx-vp9","-pix_fmt","yuva420p","-crf","14","-b:v","0","-row-mt","1","-cpu-used","8","-deadline","realtime","-auto-alt-ref","0","-threads","4",out+f"/{c:03d}.webm"])
            if r.returncode==0:
                for f in fs: os.remove(f)
                done.add(c);progress=True;print("packed",c,flush=True)
    if not progress: time.sleep(10)
print("ALLDONE",flush=True)

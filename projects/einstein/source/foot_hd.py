import json,subprocess,os
S="/tmp/claude-0/-home-user-zem/54129ae5-772d-5b8a-b13b-434b17456a25/scratchpad/"
e=json.load(open(S+"ein/edl_ein.json"));tmp=S+"ein/hdsegs";os.makedirs(tmp,exist_ok=True);lst=open(tmp+"/list.txt","w")
G="eq=contrast=1.06:saturation=0.78:brightness=-0.02,colorbalance=rm=.04:bm=-.04";enc=["-an","-c:v","libx264","-crf","15","-preset","veryfast","-pix_fmt","yuv420p"]
for i,(a,b,s,sin,o) in enumerate(e["cuts"]):
    n=round((b-a)*30);seg=f"{tmp}/{i:03d}.mp4"
    if not s: cmd=["ffmpeg","-v","error","-y","-f","lavfi","-i","color=c=black:s=2560x1440:r=30","-frames:v",str(n)]+enc+[seg]
    else:
        src=e["sources"][s]
        if s.startswith("m"):
            hd=S+"miami/mk1080/"+s[1:]+".mp4"
            fc=f"[0:v]fps=30,scale=2560:1440:force_original_aspect_ratio=increase:flags=lanczos,crop=2560:1440,unsharp=5:5:0.5:5:5:0.0,{G}[v]"
        else:  # archival film: framed over its own blurred backdrop
            fc=(f"[0:v]fps=30,split[a][b];[a]scale=2560:1440:force_original_aspect_ratio=increase,crop=2560:1440,gblur=sigma=40,eq=brightness=-0.25:saturation=0.8[bg];"
                f"[b]scale=1600:900:force_original_aspect_ratio=increase:flags=lanczos,crop=1600:900,unsharp=5:5:0.7:5:5:0.0,{G},pad=1616:916:8:8:color=white[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[v]")
        cmd=["ffmpeg","-nostdin","-v","error","-y","-ss",str(sin),"-t",str(n/30+.5),"-i",src,"-filter_complex",fc,"-map","[v]","-frames:v",str(n)]+enc+[seg]
    subprocess.run(cmd,check=True);lst.write(f"file '{seg}'\n")
lst.close()
subprocess.run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",tmp+"/list.txt","-c","copy",S+"ein/foot_hd.mp4"],check=True);print("wrote foot_hd")

import json,glob,os,subprocess
S="/tmp/claude-0/-home-user-zem/54129ae5-772d-5b8a-b13b-434b17456a25/scratchpad/"
src={"m"+os.path.basename(f)[:-4]:f for f in glob.glob(S+"miami/mk/*.mp4")}
for f in glob.glob(S+"nv/key/*.mp4"): src["k"+os.path.basename(f)[:-4]]=f
R=json.load(open(S+"nv/scenes.json"));END=505.0;CAP=3.3;EXT=.35;cuts=[];dur={}
def D(s):
    if s not in dur: dur[s]=float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",src[s]],capture_output=True,text=True).stdout)
    return dur[s]
for i,(a,k,sh) in enumerate(R):
    b=R[i+1][0] if i+1<len(R) else END
    if k not in "FG": continue
    a2=a-(EXT if i>0 and R[i-1][1] not in "FG" else 0); b2=b+(EXT if i+1<len(R) and R[i+1][1] not in "FG" else 0)
    # key (real) clips are short: cap each use to what the file holds
    t=a2;j=0
    while t<b2-0.03:
        s,inn=sh[j%len(sh)]; avail=D(s)-inn-0.15
        if j>=len(sh): inn=max(0.1,(inn+0.9*(j//len(sh)))%max(0.2,D(s)-1.6)); avail=D(s)-inn-0.15
        d=min(CAP,avail,(b2-a2)/max(len(sh),1) if (b2-a2)/len(sh)<=min(CAP,avail) else CAP,b2-t)
        d=max(d,min(0.5,b2-t)); cuts.append([round(t,3),round(t+d,3),s,round(inn,2),""]); t+=d; j+=1
cuts.sort();out=[];t=0
for c in cuts:
    if c[0]>t+0.01: out.append([round(t,3),c[0],None,0,"black"])
    c[0]=max(c[0],t);out.append(c);t=c[1]
if t<END: out.append([round(t,3),END,None,0,"black"])
json.dump({"sources":src,"cuts":out},open(S+"nv/edl_nv.json","w"));print(len(out),max(c[1]-c[0] for c in out if c[2]))

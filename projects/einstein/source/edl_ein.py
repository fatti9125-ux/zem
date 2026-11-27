import json,os,re,subprocess
S="/tmp/claude-0/-home-user-zem/54129ae5-772d-5b8a-b13b-434b17456a25/scratchpad/"
js=open(S+"preview/ein_list.js").read()
R=[]
for m in re.finditer(r"^\[([\d.]+),'([GFWPB])',(\[.*?\]\]|\[\]),t=>",js,re.M):
    sh=json.loads(m.group(3).replace("'",'"')); R.append([float(m.group(1)),m.group(2),sh])
json.dump(R,open(S+"ein/scenes.json","w"))
def path(s):
    if s=="a1933": return S+"ein/arch/lXwLYhWobRI.mp4"
    hd=S+"miami/mk1080/"+s[1:]+".mp4"; return hd if os.path.exists(hd) else S+"miami/mk/"+s[1:]+".mp4"
END=556.5;CAP=3.3;EXT=.35;cuts=[];dur={};src={}
def D(s):
    if s not in dur: src[s]=path(s); dur[s]=float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",src[s]],capture_output=True,text=True).stdout)
    return dur[s]
foot=lambda r:r[1] in "FG" and r[2]
for i,(a,k,sh) in enumerate(R):
    b=R[i+1][0] if i+1<len(R) else END
    if not foot(R[i]): continue
    a2=a-(EXT if i>0 and not foot(R[i-1]) else 0); b2=b+(EXT if i+1<len(R) and not foot(R[i+1]) else 0)
    n=max(len(sh),int(-(-(b2-a2)//CAP))); d=(b2-a2)/n; t=a2
    for j in range(n):
        s,inn=sh[j%len(sh)]
        if j>=len(sh): inn=inn+2.2*(j//len(sh))
        if inn+d>D(s)-.15: inn=max(0,(D(s)-d-.2)*((j*0.37)%1))
        cuts.append([round(t,3),round(t+d,3),s,round(inn,2),""]); t+=d
cuts.sort();out=[];t=0
for c in cuts:
    if c[0]>t+0.01: out.append([round(t,3),c[0],None,0,"black"])
    c[0]=max(c[0],t);out.append(c);t=c[1]
if t<END: out.append([round(t,3),END,None,0,"black"])
json.dump({"sources":src,"cuts":out},open(S+"ein/edl_ein.json","w"))
print(len(R),"scenes",len(out),"cuts max",max(c[1]-c[0] for c in out if c[2]),"missing",[s for s in src if not os.path.exists(src[s])])

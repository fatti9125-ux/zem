import json,glob,os
S="/tmp/claude-0/-home-user-zem/54129ae5-772d-5b8a-b13b-434b17456a25/scratchpad/"
src={"m"+os.path.basename(f)[:-4]:f for f in glob.glob(S+"miami/mk/*.mp4")}
O=json.load(open(S+"buf2/scenes_resolved.json"));CAP=3.3;EXT=.35;cuts=[]
for i,o in enumerate(O):
    if o["k"] in "WP": continue
    a=o["a"]-(EXT if i>0 and O[i-1]["k"] in "WP" else 0); b=o["b"]+(EXT if i<len(O)-1 and O[i+1]["k"] in "WP" else 0)
    sh=o["sh"] or [["m4385",1,None]]
    starts=[None]*len(sh); starts[0]=a
    for k,z in enumerate(sh):
        if k>0 and z[2] is not None: starts[k]=max(a,min(b,z[2]))
    # fill unanchored evenly between anchors
    k=0
    while k<len(sh):
        if starts[k] is None:
            j=k
            while j<len(sh) and starts[j] is None: j+=1
            lo=starts[k-1]; hi=starts[j] if j<len(sh) else b
            for m in range(k,j): starts[m]=lo+(hi-lo)*(m-k+1)/(j-k+1)
            k=j
        else: k+=1
    for k,z in enumerate(sh):
        s0=starts[k]; s1=starts[k+1] if k+1<len(sh) else b; off=0
        while s1-s0>0.03:
            d=min(CAP,s1-s0); cuts.append([round(s0,3),round(s0+d,3),z[0],z[1]+off,""]); s0+=d; off+=d
cuts.sort(); out=[]; t=0
for c in cuts:
    if c[1]<=t+0.02: continue
    if c[0]>t+0.01: out.append([round(t,3),c[0],None,0,"black"])
    c[0]=max(c[0],t); out.append(c); t=c[1]
END=O[-1]["b"]
if t<END: out.append([round(t,3),END,None,0,"black"])
missing={c[2] for c in out if c[2] and c[2] not in src}; print("missing",missing)
json.dump({"sources":src,"cuts":out},open(S+"buf2/edl_full.json","w")); print(len(out),"cuts",END)

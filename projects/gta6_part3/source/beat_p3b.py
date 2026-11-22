import numpy as np, wave, sys
SR=44100; D=264.6; N=int(SR*D); out=np.zeros(N); rng=np.random.default_rng(3)
bpm=92; beat=60/bpm; bar=4*beat
def put(t,sig,amp):
    i=int(t*SR); j=min(N,i+len(sig))
    if i<N: out[i:j]+=amp*sig[:j-i]
tt=lambda d: np.arange(int(d*SR))/SR
kick=np.sin(2*np.pi*(45+90*np.exp(-tt(.4)*18))*tt(.4))*np.exp(-tt(.4)*7)
clap=rng.uniform(-1,1,int(.18*SR))*np.exp(-tt(.18)*28); hat=rng.uniform(-1,1,int(.05*SR))*np.exp(-tt(.05)*90)
hat=np.diff(np.concatenate([[0],hat]))  # crude highpass
roots=[55.0,43.65,65.41,49.0]  # A1 F1 C2 G1
def section(t): # energy per time: intro 0-3 soft, drop 3-54, break 54-55.2, part1 55.2-158.6, outro
    if t<0.9: return .35
    if 98.2<=t<99.0: return 0
    if t>260.6: return .4
    return 1.0
t=0.0;b=0
while t<D:
    e=section(t); r=roots[(b//4)%4]
    if e>0:
        if b%4 in (0,2) or (b%8==7): put(t,kick,.9*e)
        if b%4 in (1,3): put(t,clap,.35*e)
        for h in range(2): put(t+h*beat/2,hat,.12*e*(1.3 if h else 1))
        if b%4==0:
            d=bar; s=tt(d); env=np.minimum(1,s/.05)*np.exp(-s*.5)
            put(t,(np.sin(2*np.pi*r*s)+.3*np.sin(2*np.pi*2*r*s))*env,.45*e)
            pad=sum(np.sin(2*np.pi*f*s+np.sin(2*np.pi*.3*s)) for f in (r*4,r*4*1.189,r*4*1.498))/3
            put(t,pad*np.minimum(1,s/.6)*np.minimum(1,(d-s)/.6),.10*e)
    t+=beat;b+=1
out*=np.minimum(1,np.arange(N)/SR/1.0)*np.minimum(1,(D-np.arange(N)/SR)/2.0)
out=out/np.max(np.abs(out))*.85
w=wave.open(sys.argv[1],'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype(np.int16).tobytes());w.close();print('ok')

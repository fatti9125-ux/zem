
const W=1280,H=720;
const c=document.getElementById('c'),x=c.getContext('2d');
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const P=(t,s,d)=>cl((t-s)/d);
const eo=p=>1-Math.pow(1-p,3);
const eoX=p=>p>=1?1:1-Math.pow(2,-10*p);
const back=p=>{if(p<=0)return 0;const s=1.9;p=p-1;return p*p*((s+1)*p+s)+1;};
const lerp=(a,b,p)=>a+(b-a)*p;
const rnd=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s);};
const OS='Oswald',IN='Inter';
const GOLD='#f5c766',NAVY='#1f2f55',RED='#e0283c';

function font(o){return `${o.w||700} ${o.size||40}px ${o.f||OS}`;}
function goldFill(Y,h){const g=x.createLinearGradient(0,Y-h/2,0,Y+h/2);g.addColorStop(0,'#fff3c4');g.addColorStop(.45,'#f5c766');g.addColorStop(1,'#a8781f');return g;}
function txt(s,X,Y,o={}){
  x.save();x.globalAlpha*=(o.a??1);x.font=font(o);x.textAlign=o.al||'center';x.textBaseline='middle';x.letterSpacing=(o.ls||0)+'px';
  if(o.reveal!==undefined){const m=x.measureText(s).width;const l=o.al==='left'?X:o.al==='right'?X-m:X-m/2;x.beginPath();x.rect(l-4,Y-o.size,(m+8)*o.reveal,o.size*2);x.clip();}
  if(o.gold){x.fillStyle=goldFill(Y,o.size);x.shadowColor='rgba(245,199,102,.6)';x.shadowBlur=o.glow??26;x.fillText(s,X,Y);x.shadowBlur=0;}
  else{x.fillStyle=o.c||'#fff';if(o.sh){x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=o.sh;x.shadowOffsetY=2;}}
  x.fillText(s,X,Y);x.restore();
}
function cam(s,fx=W/2,fy=H/2){x.save();x.translate(W/2,H/2);x.scale(s,s);x.translate(-fx,-fy);}
function vignette(a=.6,col='0,0,0'){const g=x.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*1.0);g.addColorStop(0,`rgba(${col},0)`);g.addColorStop(1,`rgba(${col},${a})`);x.fillStyle=g;x.fillRect(0,0,W,H);}
function rr(X,Y,w,h,r){x.beginPath();x.roundRect(X,Y,w,h,r);}
function lowerThird(s,X,Y,p,col=GOLD){if(p<=0)return;const e=eo(p);x.save();x.globalAlpha=e;x.translate((1-e)*-14,0);x.fillStyle=col;x.fillRect(X,Y-12,3,24);txt(s,X+14,Y,{f:IN,w:600,size:15,ls:3,al:'left',c:'#eee'});x.restore();}
function stamp(s,X,Y,t0,t,col=RED,rot=-10,size=34){const p=P(t,t0,.17);if(p<=0)return;const sc=lerp(1.4,1,back(p));x.save();
  if(t-t0<.12){x.translate((rnd(t*99)-.5)*6,(rnd(t*77)-.5)*6);} x.translate(X,Y);x.rotate(rot*Math.PI/180);x.scale(sc,sc);x.globalAlpha=cl(p*3);
  x.font=font({size,w:700});x.letterSpacing='3px';const m=x.measureText(s).width;x.strokeStyle=col;x.lineWidth=4;rr(-m/2-16,-size*.72,m+32,size*1.44,4);x.stroke();
  x.lineWidth=1.5;rr(-m/2-10,-size*.6,m+20,size*1.2,3);x.stroke();txt(s,0,2,{size,c:col,ls:3});x.restore();}
function particles(t,n,col,alpha=1){for(let i=0;i<n;i++){const sp=8+rnd(i)*22;const px=rnd(i+1)*W+Math.sin(t*.5+i)*12;const py=((rnd(i+2)*H-t*sp)%H+H)%H;const r=.6+rnd(i+3)*1.8;x.globalAlpha=alpha*(.2+.55*rnd(i+4)*(.6+.4*Math.sin(t*2+i)));x.fillStyle=col;x.beginPath();x.arc(px,py,r,0,7);x.fill();}x.globalAlpha=1;}
function bgA(t){x.fillStyle='#07050a';x.fillRect(0,0,W,H);
  let g=x.createRadialGradient(W*.12,H*1.05,0,W*.12,H*1.05,W*.75);g.addColorStop(0,'rgba(255,63,164,.26)');g.addColorStop(1,'rgba(255,63,164,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  g=x.createRadialGradient(W*.92,-H*.1,0,W*.92,-H*.1,W*.7);g.addColorStop(0,'rgba(110,50,160,.45)');g.addColorStop(1,'rgba(110,50,160,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  particles(t,90,GOLD);}
function progress(p,col=GOLD){x.fillStyle='rgba(255,255,255,.08)';x.fillRect(0,0,W,3);x.fillStyle=col;x.fillRect(0,0,W*p,3);}

// ---------- shapes ----------
const TOWER=[[0,.11],[.16,.105],[.16,.088],[.33,.082],[.33,.066],[.48,.061],[.48,.046],[.6,.041],[.6,.031],[.7,.026],[.7,.016],[.82,.009],[1,.0015]];
function towerPath(cx,base,h){x.beginPath();x.moveTo(cx-TOWER[0][1]*h,base);for(const [f,w] of TOWER)x.lineTo(cx-w*h,base-f*h);for(let i=TOWER.length-1;i>=0;i--){const [f,w]=TOWER[i];x.lineTo(cx+w*h,base-f*h);}x.closePath();}
function metal(cx,h,stops){const g=x.createLinearGradient(cx-.11*h,0,cx+.11*h,0);stops.forEach((s,i)=>g.addColorStop(i/(stops.length-1),s));return g;}
function eiffelPath(cx,base,h){const pts=[[-.36,0],[-.2,.28],[-.12,.42],[-.07,.62],[-.035,.85],[-.012,1],[.012,1],[.035,.85],[.07,.62],[.12,.42],[.2,.28],[.36,0]];
  x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(cx+a*h,base-b*h):x.moveTo(cx+a*h,base-b*h));x.closePath();
  x.moveTo(cx+.2*h,base);x.ellipse(cx,base,.2*h,.17*h,0,0,Math.PI,true);x.closePath();}

// ---------- map data (lon,lat) ----------
const ARABIA=[[34.9,29.5],[35,28],[36,27],[37.5,24.5],[39,21.5],[41,18],[42.5,15],[43.3,12.8],[45,12.9],[48,14],[51,15.2],[52.2,15.7],[55,17.2],[57,18.8],[58.5,20.5],[59.8,22.5],[58.8,23.6],[57,23.9],[56.4,24.9],[56.3,26.3],[56.1,26.1],[55.5,25.5],[54.5,24.3],[53,24.1],[51.6,24.2],[51.6,25.3],[51.5,26.1],[51,26],[50.8,25.3],[50.2,25.8],[50,26.5],[49.5,27.2],[48.5,28.4],[47.9,29.9],[48,30.5],[47,33],[34,33]];
const IRAN=[[48,30.5],[50,30],[51.5,27.9],[53,26.8],[54.5,26.6],[56,27.1],[57.3,25.7],[60,25.3],[63,25],[63,33],[47,33]];
const AFRICA=[[28,33],[34.2,31.3],[34.5,28],[33.5,27.5],[35.5,23.8],[37.2,21],[38.5,18],[39.7,15.5],[41.6,13.5],[43.3,12.4],[44,10],[28,10]];
const UAE=[[51.6,24.2],[52.6,24.2],[53.6,24.1],[54.5,24.3],[55.2,25.0],[55.6,25.4],[56.0,25.7],[56.1,26.1],[56.4,26.2],[56.4,25.6],[56.3,24.9],[55.9,24.6],[55.8,24.0],[55.2,23.0],[55.0,22.5],[52.0,23.0],[51.6,24.0]];
const pj=(lon,lat)=>[(lon-30)*40,H/2-(lat-22)*40];
function poly(pts,dy=0){x.beginPath();pts.forEach(([a,b],i)=>{const [X,Y]=pj(a,b);i?x.lineTo(X,Y+dy):x.moveTo(X,Y+dy);});x.closePath();}
function perim(pts){let L=0;for(let i=0;i<pts.length;i++){const [a,b]=pj(...pts[i]),[c2,d]=pj(...pts[(i+1)%pts.length]);L+=Math.hypot(c2-a,d-b);}return L;}


function box(X,Y,w,h,col,title,p,chips,t){if(p<=0)return;const e=eo(p);x.save();x.globalAlpha=e;x.translate((1-e)*-18,0);
  x.fillStyle=col+'14';x.strokeStyle=col;x.lineWidth=1.5;rr(X,Y,w,h,6);x.fill();x.stroke();
  txt(title,X+20,Y+30,{size:22,w:700,ls:2,al:'left',c:col});
  let cx=X+20;x.font=font({size:15,w:600});x.letterSpacing='2px';
  for(const [label,t0] of chips){const m=x.measureText(label).width+24;const q=P(t,t0,.22);if(q>0){const s=back(q);x.save();x.translate(cx+m/2,Y+76);x.scale(s,s);x.globalAlpha=cl(q*3)*e;
      x.fillStyle=col+'33';x.strokeStyle=col;x.lineWidth=1;rr(-m/2,-15,m,30,15);x.fill();x.stroke();txt(label,0,1,{size:15,w:600,ls:2,c:'#fff'});x.restore();}
    cx+=m+12;}
  x.restore();}

function zLogo(X,Y,S,p){if(p<=0)return;const s=back(p);x.save();x.translate(X,Y);x.scale(s,s);
  x.shadowColor='rgba(47,191,99,.6)';x.shadowBlur=40;const g=x.createLinearGradient(0,-S/2,0,S/2);g.addColorStop(0,'#3fd474');g.addColorStop(1,'#11803a');x.fillStyle=g;rr(-S/2,-S/2,S,S,S*.22);x.fill();x.shadowBlur=0;
  x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=3;rr(-S/2+6,-S/2+6,S-12,S-12,S*.18);x.stroke();
  txt('Z',0,S*.04,{size:S*.72,w:700,c:'#fff'});x.restore();}

// ---------- footage / image helpers ----------
const IMG={};
async function loadImages(map){await Promise.all(Object.entries(map).map(([k,src])=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>{IMG[k]=im;res();};im.onerror=()=>rej(new Error('img '+src));im.src=src;})));}
function variant(name,key,filter){const cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');g.filter=filter;g.drawImage(IMG[name],0,0,W,H);IMG[name+':'+key]=cv;return cv;}
function halftone(name,cell=7,paper='#efe9d8',ink='#1a1a1a'){const src=IMG[name+':bw']||variant(name,'bw','grayscale(1) contrast(1.4)');const d=src.getContext('2d').getImageData(0,0,W,H).data;
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');g.fillStyle=paper;g.fillRect(0,0,W,H);g.fillStyle=ink;
  for(let y=0;y<H;y+=cell)for(let X=0;X<W;X+=cell){const i=((y+cell/2|0)*W+(X+cell/2|0))*4;const r=(1-d[i]/255)*cell*.62;if(r>.3){g.beginPath();g.arc(X+cell/2,y+cell/2,r,0,7);g.fill();}}IMG[name+':ht']=cv;return cv;}
// Ken Burns: draw image filling rect, scale s0->s1 over dur, anchored at (ax,ay)
function kb(im,t,t0,dur,s0,s1,ax=.5,ay=.5,X=0,Y=0,w=W,h=H){const s=lerp(s0,s1,cl((t-t0)/dur));const sw=w*s,sh=h*s;x.drawImage(im,X+(w-sw)*ax,Y+(h-sh)*ay,sw,sh);}
// physical photo print: shadow, optional white border, curled bottom-right corner
function printCard(im,w,h,{border=0,curl=34,bg='#e6e6e6',crop=null}={}){x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=26;x.shadowOffsetY=12;x.fillStyle='#fff';x.fillRect(-w/2-border,-h/2-border,w+2*border,h+2*border);x.restore();
  if(crop)x.drawImage(im,...crop,-w/2,-h/2,w,h);else x.drawImage(im,-w/2,-h/2,w,h);
  if(curl){const X=w/2+border,Y=h/2+border;x.fillStyle=bg;x.beginPath();x.moveTo(X,Y-curl);x.lineTo(X,Y);x.lineTo(X-curl,Y);x.closePath();x.fill();
    const g=x.createLinearGradient(X-curl,Y-curl,X-curl/2,Y-curl/2);g.addColorStop(0,'#cfcfcf');g.addColorStop(1,'#ffffff');x.fillStyle=g;x.save();x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=8;x.beginPath();x.moveTo(X,Y-curl);x.lineTo(X-curl,Y-curl);x.lineTo(X-curl,Y);x.closePath();x.fill();x.restore();}}
// torn-edge rectangle path (paper strips, redaction bars)
function tornRect(X,Y,w,h,seed=1,j=4){x.beginPath();x.moveTo(X,Y+rnd(seed)*j);for(let i=0;i<=w;i+=8)x.lineTo(X+i,Y+(rnd(seed+i)-.5)*j);for(let i=0;i<=h;i+=8)x.lineTo(X+w+(rnd(seed+i*3)-.5)*j,Y+i);for(let i=w;i>=0;i-=8)x.lineTo(X+i,Y+h+(rnd(seed+i*7)-.5)*j);for(let i=h;i>=0;i-=8)x.lineTo(X+(rnd(seed+i*11)-.5)*j,Y+i);x.closePath();}
function chapterTag(n,title,a=1){x.save();x.globalAlpha*=a;tag('PART '+n,62,34,GOLD,1,11);txt(title,96,35,{w:700,size:15,ls:3,al:'left',c:'#fff'});x.restore();}
function tag(s,X,Y,col,a=1,size=13){x.save();x.globalAlpha*=a;x.font=font({f:IN,w:700,size});x.letterSpacing='2px';const w=x.measureText(s).width+20;x.fillStyle=col+'26';x.strokeStyle=col;x.lineWidth=1.2;rr(X-w/2,Y-13,w,26,4);x.fill();x.stroke();txt(s,X,Y+1,{f:IN,w:700,size,ls:2,c:col});x.restore();}
function scene(t,a,b,fn,push=.05,fx=W/2,fy=H/2){if(t<a||t>b)return;x.save();x.globalAlpha=P(t,a,.25)*(1-P(t,b-.25,.25));cam(1+push*P(t,a,b-a),fx,fy);fn(t);x.restore();x.restore();}
function popAt(t,t0,X,Y,fn,d=.25){const p=P(t,t0,d);if(p<=0)return;x.save();x.translate(X,Y);const s=back(p);x.scale(s,s);x.globalAlpha*=cl(p*3);fn();x.restore();}
async function loadFonts(base='fonts/package/files/'){for(const w of ['600','700']){const ff=new FontFace('Oswald',`url(${base}oswald-latin-${w}-normal.woff2)`,{weight:w});await ff.load();document.fonts.add(ff);}
  for(const f of ['600 20px Inter','700 20px Inter','900 20px Inter','italic 400 20px "DejaVu Serif"'])await document.fonts.load(f);}

// ---------- archive video as frame sequences ----------
// export with: ffmpeg -i clip.mp4 -t 6 -vf "fps=30,scale=960:-2" -q:v 4 seq/name/%03d.jpg
const SEQ={};
async function loadSeq(name,dir,n){SEQ[name]=new Array(n);await Promise.all([...Array(n).keys()].map(i=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>{SEQ[name][i]=im;res();};im.onerror=()=>rej(new Error('seq '+dir));im.src=`${dir}/${String(i+1).padStart(3,'0')}.jpg`;})));}
// frame of a sequence at time t (started at t0); hold last frame (or loop)
function seqFrame(name,t,t0,{fps=30,loop=false,offset=0}={}){const a=SEQ[name];let i=Math.floor((t-t0)*fps)+offset;i=loop?((i%a.length)+a.length)%a.length:Math.max(0,Math.min(a.length-1,i));return a[i];}
// draw an image/frame covering rect (X,Y,w,h) at scale s, anchored (ax,ay) - keeps aspect (4:3 archive into 16:9)
function cover(im,X=0,Y=0,w=W,h=H,s=1,ax=.5,ay=.5,filter=''){const iw=im.width||im.naturalWidth,ih=im.height||im.naturalHeight;const k=Math.max(w/iw,h/ih)*s;const dw=iw*k,dh=ih*k;
  x.save();if(filter)x.filter=filter;x.beginPath();x.rect(X,Y,w,h);x.clip();x.drawImage(im,X+(w-dw)*ax,Y+(h-dh)*ay,dw,dh);x.restore();}
// horizontal slice glitch over whatever is on the canvas (C2 transitions, 'leak' beats)
function glitch(t,t0,dur=.35,bands=14){const p=P(t,t0,dur);if(p<=0||p>=1)return;const img=x.getImageData(0,0,W,H);for(let i=0;i<bands;i++){const y=Math.floor(rnd(i+Math.floor(t*30))*H),h=8+Math.floor(rnd(i*3+Math.floor(t*30))*40),dx=Math.floor((rnd(i*7+Math.floor(t*30))-.5)*160*Math.sin(p*Math.PI));
  x.putImageData(img,dx,0,0,y,W,h);}x.fillStyle=`rgba(0,0,0,${.15*Math.sin(p*Math.PI)})`;x.fillRect(0,0,W,H);}
// halftone of a crop (keeps aspect): source rect in the ORIGINAL image -> w x h canvas, stored as IMG[key]
function halftoneCrop(name,key,sx,sy,sw,sh,w,h,cell=7,paper='#efe9d8',ink='#1a1a1a'){const src=document.createElement('canvas');src.width=w;src.height=h;const g0=src.getContext('2d');g0.filter='grayscale(1) contrast(1.25) brightness(.82)';g0.drawImage(IMG[name],sx,sy,sw,sh,0,0,w,h);
  const d=g0.getImageData(0,0,w,h).data;const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');g.fillStyle=paper;g.fillRect(0,0,w,h);g.fillStyle=ink;
  for(let y=0;y<h;y+=cell)for(let X=0;X<w;X+=cell){const i=((y+cell/2|0)*w+(X+cell/2|0))*4;const r=(1-d[i]/255)*cell*.62;if(r>.3){g.beginPath();g.arc(X+cell/2,y+cell/2,r,0,7);g.fill();}}IMG[key]=cv;return cv;}

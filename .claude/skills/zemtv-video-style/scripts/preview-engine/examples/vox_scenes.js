// Vox-style white / paper scenes with live GTA clips inside cards. Times are in ORIGINAL VO coordinates (mapped by T()).
const SERIF='"DejaVu Serif"';
const WHITE=[[21.7,26.3],[76.2,81.2],[83.9,97.0],[97.0,101.4],[104.0,108.8],[128.8,132.6],[153.5,158.75]];
const inWhite=t=>WHITE.some(([a,b])=>t>T(a)-.05&&t<T(b)+.05);
function stageW(){x.fillStyle='#f1f1f1';x.fillRect(-60,-60,W+120,H+120);for(let i=0;i<1300;i++){x.fillStyle=`rgba(0,0,0,${.03*rnd(i)})`;x.fillRect(rnd(i+1)*W,rnd(i+2)*H,2,2);}
  const g=x.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*1.0);g.addColorStop(0,'rgba(60,60,60,0)');g.addColorStop(1,'rgba(60,60,60,.45)');x.fillStyle=g;x.fillRect(0,0,W,H);}
function paperW(){x.fillStyle='#efebe3';x.fillRect(-60,-60,W+120,H+120);for(let i=0;i<2000;i++){x.fillStyle=`rgba(80,60,30,${.045*rnd(i)})`;x.fillRect(rnd(i+1)*W,rnd(i+2)*H,2,1);}
  const g=x.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(60,45,20,.25)');x.fillStyle=g;x.fillRect(0,0,W,H);}
// live clip as a photo print: slides in from the side, settles, drifts
function clipCard(name,t,t0,X,Y,w,h,rot=0,from=1,label=null){const p=eo(P(t,t0,.47));if(p<=0)return;x.save();x.translate(X+(1-p)*from*900,Y+Math.sin((t+X)*.5)*3);x.rotate(lerp(rot+3*from,rot,p)*Math.PI/180);
  x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=24;x.shadowOffsetY=12;x.fillStyle='#fff';x.fillRect(-w/2-7,-h/2-7,w+14,h+14);x.restore();
  const im=SEQ[name]?seqFrame(name,t,T(t0),{loop:true}):IMG[name];cover(im,-w/2,-h/2,w,h,1.02);
  const c=26,X2=w/2+7,Y2=h/2+7;x.fillStyle='#e4e4e4';x.beginPath();x.moveTo(X2,Y2-c);x.lineTo(X2,Y2);x.lineTo(X2-c,Y2);x.fill();x.fillStyle='#fafafa';x.beginPath();x.moveTo(X2,Y2-c);x.lineTo(X2-c,Y2-c);x.lineTo(X2-c,Y2);x.fill();
  if(label)txt(label,0,h/2+34,{size:24,w:700,ls:3,c:NAVY});x.restore();}
function navy(s,X,Y,size,a=1,o={}){txt(s,X,Y,{size,w:700,ls:2,c:NAVY,a,...o});}
function hlSerif(pre,word,post,X,Y,size,p,col='#1d1d1d'){x.font=`italic 400 ${size}px ${SERIF}`;const a=x.measureText(pre).width,c2=x.measureText(post).width;x.font=`italic 700 ${size}px ${SERIF}`;const b=x.measureText(word).width;const L=X-(a+b+c2)/2;
  x.fillStyle='#ffe14d';x.fillRect(L+a-4,Y-size*.45,(b+8)*eo(p),size*.95);x.fillStyle=col;x.textAlign='left';x.textBaseline='middle';x.font=`italic 400 ${size}px ${SERIF}`;x.fillText(pre,L,Y);x.font=`italic 700 ${size}px ${SERIF}`;x.fillText(word,L+a,Y);x.font=`italic 400 ${size}px ${SERIF}`;x.fillText(post,L+a+b,Y);}
function stickerW(s,X,Y,t0,t,rot=-8,col='#d7261e',size=22){const p=P(t,t0,.08);if(p<=0)return;x.save();x.translate(X,Y);x.rotate(rot*Math.PI/180);const sc=lerp(1.25,1,eo(p));x.scale(sc,sc);x.font=font({size,w:700});x.letterSpacing='2px';const w=x.measureText(s).width+26;
  x.fillStyle=col;tornRect(-w/2,-size*.75,w,size*1.5,size,4);x.fill();txt(s,0,1,{size,w:700,ls:2,c:'#fff'});x.restore();}
function tornPrint(im,X,Y,w,h,rot,p,seed,filter=''){if(p<=0)return;x.save();x.translate(X,Y+(1-eo(p))*240);x.rotate(rot*Math.PI/180);x.globalAlpha*=cl(p*2);tornRect(-w/2,-h/2,w,h,seed,9);x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=18;x.shadowOffsetY=8;x.fillStyle='#f6f2e8';x.fill();x.restore();x.clip();cover(im,-w/2,-h/2,w,h,1.02,.5,.5,filter);x.restore();}
function dimLine(X1,Y1,X2,Y2,p,col='#e0b400'){if(p<=0)return;x.setLineDash([12,8]);x.strokeStyle=col;x.lineWidth=3;x.beginPath();x.moveTo(X1,Y1);x.lineTo(lerp(X1,X2,p),lerp(Y1,Y2,p));x.stroke();x.setLineDash([]);}

// V1 — the leak (editorial paper)
function v1(t){paperW();txt('SEPTEMBER 2022 · FOUR YEARS BEFORE RELEASE',W/2,70,{f:IN,w:700,size:14,ls:5,c:'#444',a:P(t,21.9,.3)});
  x.save();x.globalAlpha*=P(t,22.1,.3);hlSerif('A teenage hacker ','leaked',' it all',W/2,122,42,P(t,25.3,.35));x.restore();
  [['leak_t2_74',300,370,-4,22.5,11],['leak_t1_28',640,350,2,22.9,23],['leak_t2_100',980,375,-2,23.3,37]].forEach(([k,X,Y,r,t0,s])=>{tornPrint(IMG[k],X,Y,330,200,r,P(t,t0,.4),s,'blur(5px) grayscale(.4)');
    if(t>T(t0)+.3){x.save();x.translate(X,Y);x.rotate(r*Math.PI/180);txt('REDACTED',0,0,{size:30,w:700,ls:5,c:'#d7261e',a:P(t,t0+.3,.15)});x.restore();}});
  stickerW('90+ VIDEOS LEAKED',1040,250,23.9,t,-7);txt('Blurred stand-ins: frames from official trailers',W/2,520,{f:IN,w:500,size:12,c:'#777',a:P(t,24.0,.3)});
  stamp('HACKED',W/2,600,25.6,t,'#c8202b',-6,44);}
// V6 — Guinness (paper + clip card)
function v6(t){paperW();txt('THE RECORD',W/2,70,{f:IN,w:700,size:14,ls:6,c:'#444',a:P(t,76.3,.3)});
  const p=eo(P(t,76.4,.45));x.save();x.translate(470,380+(1-p)*500);x.rotate(lerp(-4,-1.5,p)*Math.PI/180);x.scale(.82,.82);x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=36;x.shadowOffsetY=14;x.fillStyle='#f9f4e4';x.fillRect(-330,-210,660,420);x.shadowColor='transparent';
  x.strokeStyle='#b8862b';x.lineWidth=4;x.strokeRect(-310,-190,620,380);x.lineWidth=1.2;x.strokeRect(-298,-178,596,356);txt('GUINNESS WORLD RECORDS · 2013',0,-140,{f:IN,w:700,size:13,ls:4,c:'#8a6420',a:P(t,76.8,.3)});
  [['FASTEST-SELLING',78.0],['ENTERTAINMENT PRODUCT',78.4],['IN HISTORY',79.0]].forEach(([s,t0],i)=>txt(s,0,-70+i*58,{size:i===1?46:40,w:700,ls:2,c:'#1d1d1d',reveal:P(t,t0,.45)}));txt('AWARDED TO · GTA V',0,130,{f:IN,w:700,size:14,ls:4,c:'#555',a:P(t,79.8,.3)});
  popAt(t,80.7,240,120,()=>{const g=x.createRadialGradient(-10,-10,4,0,0,52);g.addColorStop(0,'#fff1b8');g.addColorStop(1,'#a8781f');x.fillStyle=g;x.beginPath();for(let i=0;i<24;i++){const r=i%2?46:52,a=i*Math.PI/12;x.lineTo(Math.cos(a)*r,Math.sin(a)*r);}x.closePath();x.fill();txt('★',0,2,{size:40,w:700,c:'#7a5410'});});x.restore();
  clipCard('guin',t,76.9,1000,360,380,214,4,1,null);txt('GTA V · LOS SANTOS, 2013',1000,505,{f:IN,w:700,size:13,ls:3,c:'#555',a:P(t,77.3,.3)});}
// V2 — one game, three console generations (white stage, three live cards)
function v2(t){stageW();const top=P(t,93.8,.25);navy('ONE GAME',W/2,90,46,(1-top)*P(t,84.1,.3));navy('1 GAME · 3 CONSOLE GENERATIONS',W/2,90,46,top);
  const cards=[['gen1',250,85.4,'GEN 1 · 2013','PS3 · XBOX 360'],['gen2',640,88.5,'GEN 2 · 2014','PS4 · XBOX ONE'],['gen3',1030,91.0,'GEN 3 · 2022','PS5 · XBOX SERIES X|S']];
  dimLine(250,330,640,330,P(t,88.0,.6),'#c9a400');dimLine(640,330,1030,330,P(t,90.5,.6),'#c9a400');
  cards.forEach(([k,X,t0,a,b],i)=>{clipCard(k,t,t0,X,320,330,186,[-3,2,-2][i],1);txt(a,X,450,{size:26,w:700,ls:3,c:NAVY,a:P(t,t0+.3,.3)});txt(b,X,484,{f:IN,w:700,size:14,ls:3,c:'#555',a:P(t,t0+.4,.3)});});
  popAt(t,89.7,770,215,()=>{x.rotate(.08);x.fillStyle='#1f2f55';rr(-55,-20,110,40,6);x.fill();txt('+ PC · 2015',0,1,{f:IN,w:800,size:13,ls:2,c:'#fff'});});
  x.save();x.globalAlpha*=P(t,95.6,.3);hlSerif('Sold ','again, and again, and again','.',W/2,590,34,P(t,95.9,.6));x.restore();}
// V3 — only one game sold more (paper torn bars + live card)
function v3(t){paperW();txt('BEST-SELLING GAMES OF ALL TIME',420,110,{f:IN,w:700,size:14,ls:5,c:'#444',a:P(t,97.2,.3)});
  [['#1',t>T(100.7)?'MINECRAFT':'???','300M+',1.0,98.6,'#1f8a3c'],['#2','GTA V','215M+',.72,98.1,'#1d1d1d']].forEach(([r,n,v,f,t0,col],i)=>{const Y=250+i*120,w=520*f*eo(P(t,t0,.5));if(w>2){x.fillStyle=col;tornRect(160,Y-38,w,76,i*19+5,7);x.fill();}
    txt(r,140,Y,{size:40,w:700,al:'right',c:'#1d1d1d'});txt(n,180,Y+2,{size:34,w:700,ls:3,al:'left',c:'#fff',a:P(t,t0+.2,.2)});txt(v,160+w+16,Y,{size:32,w:700,al:'left',c:col,a:P(t,t0+.4,.2)});});
  stickerW('#1 OF ALL TIME',600,170,100.8,t,-7,'#1f8a3c');txt('Lifetime sales as reported by publishers',420,470,{f:IN,w:500,size:12,c:'#777',a:P(t,99.2,.3)});
  clipCard('mc',t,97.3,1060,470,300,170,4,1,null);txt('GTA V · STILL SELLING',1060,590,{f:IN,w:700,size:12,ls:3,c:'#555',a:P(t,97.7,.3)});}
// V4 — GTA Online money loop (white stage)
function v4(t){stageW();navy('THE SECOND DOOR: GTA ONLINE',W/2,90,40,P(t,104.0,.3));
  popAt(t,104.2,280,330,()=>{x.save();x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=20;x.shadowOffsetY=8;x.fillStyle='#fff';rr(-130,-95,260,190,12);x.fill();x.restore();txt('$',0,-20,{size:80,w:700,c:'#1f8a3c'});txt('REAL MONEY',0,58,{size:24,w:700,ls:3,c:NAVY});});
  const ap=eo(P(t,104.9,.5));if(ap>0){x.strokeStyle=NAVY;x.lineWidth=4;x.beginPath();x.moveTo(430,330);x.lineTo(430+300*ap,330);x.stroke();if(ap>.95){x.fillStyle=NAVY;x.beginPath();x.moveTo(746,330);x.lineTo(726,318);x.lineTo(726,342);x.fill();}}
  clipCard('online',t,105.3,960,330,360,202,3,1,'GTA$ · IN-GAME CASH');
  for(let i=0;i<3;i++){const q=eo(P(t,106.4+i*.12,.3));if(q<=0)continue;x.save();x.translate(640+(i-1)*95*q,560);x.rotate((i-1)*.15*q);x.globalAlpha*=q;x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=12;const g=x.createLinearGradient(-75,-42,75,42);g.addColorStop(0,['#1a6fd1','#7a2bd1','#d1a21a'][i]);g.addColorStop(1,'#111');x.fillStyle=g;rr(-75,-42,150,84,10);x.fill();x.shadowBlur=0;txt('SHARK CARD',0,1,{f:IN,w:800,size:13,ls:2,c:'#fff'});x.restore();}
  if(t>T(106.8)){x.save();x.globalAlpha*=P(t,106.8,.3);hlSerif('Real money for ','virtual money','',W/2,665,26,P(t,107.0,.4));x.restore();}}
// V5 — 13 years apart (white stage, two live cards + dimension line)
function v5(t){stageW();navy('BETWEEN TWO GAMES',W/2,90,38,P(t,128.9,.3));clipCard('v5',t,129.0,340,350,440,248,-3,-1,'GTA V · 2013');clipCard('v6',t,130.3,940,350,440,248,3,1,'GTA VI · 2026');
  dimLine(340,560,940,560,P(t,130.8,.6));x.fillStyle='#e0b400';if(P(t,130.8,.6)>.98){x.fillRect(336,548,4,24);x.fillRect(938,548,4,24);}
  popAt(t,131.4,W/2,610,()=>{x.fillStyle='#fff';x.shadowColor='rgba(0,0,0,.2)';x.shadowBlur=14;rr(-120,-34,240,68,8);x.fill();x.shadowBlur=0;txt('13 YEARS',0,2,{size:44,w:700,ls:3,c:NAVY});});}
// V7 — RDR2 was practice -> foundation of GTA VI (white stage)
function v7(t){stageW();clipCard('rdr',t,153.55,300,350,380,214,-3,-1,'RDR2 · 2018');
  [['TECHNOLOGY',153.7,250],['PHYSICS',154.5,345],['REAL CHARACTERS',155.3,440]].forEach(([s,t0,Y])=>{const p=eo(P(t,t0,.25));if(p<=0)return;x.strokeStyle='#c9a400';x.lineWidth=2;x.beginPath();x.moveTo(500,350);x.lineTo(lerp(500,560,p),Y);x.stroke();
    x.save();x.globalAlpha*=p;x.translate(640,Y);x.fillStyle='#fff';x.strokeStyle=NAVY;x.lineWidth=2;x.shadowColor='rgba(0,0,0,.15)';x.shadowBlur=10;rr(-110,-24,220,48,24);x.fill();x.shadowBlur=0;x.stroke();txt(s,0,1,{f:IN,w:800,size:15,ls:3,c:NAVY});x.restore();});
  const ap=eo(P(t,156.6,.4));if(ap>0){x.strokeStyle=NAVY;x.lineWidth=4;x.beginPath();x.moveTo(760,350);x.lineTo(760+40*ap,350);x.stroke();}
  clipCard('gta6',t,156.85,1000,350,380,214,3,1,'GTA VI · 2026');navy('THE FOUNDATION OF GTA VI',W/2,95,46,P(t,157.2,.3));}

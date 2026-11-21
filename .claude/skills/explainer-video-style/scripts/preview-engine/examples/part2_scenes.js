// PART 2 — times are the tightened VO (p2/vo2_tight.wav), from word timestamps. Kinds: G F W P (see SKILL "Per-line style choice").
function ps5(X,Y,s=1){x.save();x.translate(X,Y);x.scale(s,s);x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=20;x.shadowOffsetY=10;x.fillStyle='#fdfdfd';x.beginPath();x.moveTo(-60,-170);x.quadraticCurveTo(-20,-150,-30,0);x.quadraticCurveTo(-20,150,-60,170);x.lineTo(60,170);x.quadraticCurveTo(25,0,60,-170);x.closePath();x.fill();x.shadowBlur=0;
  x.fillStyle='#111';x.beginPath();x.moveTo(-14,-150);x.quadraticCurveTo(4,0,-14,150);x.lineTo(14,150);x.quadraticCurveTo(-4,0,14,-150);x.closePath();x.fill();x.strokeStyle='#4aa3ff';x.lineWidth=2;x.beginPath();x.moveTo(-15,-140);x.quadraticCurveTo(3,0,-15,140);x.stroke();x.fillStyle='#ddd';rr(-80,170,160,14,6);x.fill();txt('PS5',0,-120,{f:IN,w:800,size:12,c:'#fff'});x.restore();}
function laptop(X,Y,col='#1d1d1d'){x.save();x.translate(X,Y);x.strokeStyle=col;x.lineWidth=5;x.strokeRect(-80,-60,160,100);x.beginPath();x.moveTo(-105,52);x.lineTo(105,52);x.lineTo(90,62);x.lineTo(-90,62);x.closePath();x.stroke();x.restore();}
function devIcon(kind,X,Y){x.save();x.translate(X,Y);x.strokeStyle=NAVY;x.fillStyle=NAVY;x.lineWidth=5;
  if(kind==='stick'){rr(-70,-18,140,36,8);x.stroke();x.fillRect(-90,-10,22,20);txt('fire tv',10,1,{f:IN,w:800,size:16,c:NAVY});}
  if(kind==='phone'){rr(-34,-62,68,124,12);x.stroke();x.beginPath();x.arc(0,48,5,0,7);x.fill();}
  if(kind==='tv'){x.strokeRect(-80,-52,160,96);x.beginPath();x.moveTo(-30,62);x.lineTo(30,62);x.stroke();x.beginPath();x.moveTo(0,44);x.lineTo(0,62);x.stroke();}
  x.restore();}
const FL=[[-87.6,30.9],[-85,31],[-84.9,30.7],[-82.2,30.6],[-81.4,30.7],[-81.3,29.9],[-80.6,28.5],[-80.0,26.8],[-80.1,25.8],[-80.4,25.2],[-81.1,25.1],[-81.8,25.9],[-82.6,27.4],[-82.8,28.2],[-82.7,29.0],[-83.7,29.9],[-84.4,30.0],[-85.4,29.7],[-86.5,30.4],[-87.6,30.3]];
const fl=(lo,la)=>[640+(lo+83.5)*78,380-(la-28)*88];
function phoneFrame(name,t,t0,X,Y,s=1){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle='#111';rr(-150,-290,300,580,40);x.fill();x.save();rr(-138,-270,276,540,30);x.clip();cover(seqFrame(name,t,t0,{loop:true}),-138,-270,276,540);x.restore();x.fillStyle='#111';rr(-40,-282,80,18,9);x.fill();x.restore();}
function heart(X,Y,s,a){x.save();x.translate(X,Y);x.scale(s,s);x.globalAlpha*=a;x.fillStyle='#ff3b6b';x.beginPath();x.moveTo(0,10);x.bezierCurveTo(-26,-10,-12,-30,0,-14);x.bezierCurveTo(12,-30,26,-10,0,10);x.fill();x.restore();}
function calloutF(s,X1,Y1,X2,Y2,t0,t,col='#ffd400'){const lp=eo(P(t,t0,.2));if(lp<=0)return;x.strokeStyle=col;x.lineWidth=2.5;x.beginPath();x.moveTo(X1,Y1);x.lineTo(lerp(X1,X2,lp),lerp(Y1,Y2,lp));x.stroke();x.fillStyle=col;x.beginPath();x.arc(X1,Y1,5,0,7);x.fill();
  const tq=eo(P(t,t0+.15,.2));if(tq>0){x.font=font({f:IN,w:800,size:18});x.letterSpacing='2px';const w=x.measureText(s).width+24;x.save();x.translate(X2,Y2);x.scale(tq,1);x.fillStyle=col;x.fillRect(-w/2,-17,w,34);x.restore();txt(s,X2,Y2+1,{f:IN,w:800,size:18,ls:2,c:'#111',a:tq});}}

// L1 F — Dec 2023, Trailer 1
function M1(t){dim(.25);popAt(t,0.92,W/2,250,()=>{gcard(0,0,520,96,GOLD,'rgba(20,12,4,.6)');txt('DECEMBER 2023',0,4,{size:52,gold:1,ls:4,glow:16});});txt('GTA VI · TRAILER 1',W/2,380,{size:44,w:700,ls:5,c:'#fff',sh:14,reveal:P(t,4.1,.4)});}
// L2 P — leaked a day early
function M2(t){paperW();kick('ONE DAY BEFORE THE PLAN',t,5.55,80);tornPrint(seqStill('trailer',20),W/2-180,380,500,290,-3,P(t,5.8,.35),21,'blur(2px)');stickerW('LEAKED ONLINE',W/2+170,250,8.74,t,-8);x.save();x.globalAlpha*=P(t,7.9,.25);hlSerif('','The trailer had leaked','',W/2+250,520,26,P(t,8.1,.35));x.restore();}
// L3 G — released early
function M3(t){dim(.5);txt('ROCKSTAR WAS FORCED TO',W/2,260,{size:34,w:600,ls:6,c:'#fff',sh:12,a:P(t,9.8,.25)});stamp('RELEASE IT EARLY',W/2,370,11.4,t,RED,-6,50);}
// L4 W — 90M views, YouTube record
function M4(t){stageW();const p=eo(P(t,12.1,.4));x.save();x.translate(W/2-130,360+(1-p)*400);x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=24;x.shadowOffsetY=10;x.fillStyle='#fff';rr(-330,-215,660,430,14);x.fill();x.shadowColor='transparent';cover(seqFrame('trailer',t,12.0,{loop:true}),-312,-197,624,351);
  x.fillStyle='#e6e6e6';x.fillRect(-312,170,624,6);x.fillStyle='#d7261e';x.fillRect(-312,170,624*P(t,12,5.8),6);txt('GTA VI · TRAILER 1',-312,196,{f:IN,w:800,size:14,al:'left',c:'#1d1d1d'});x.restore();
  navy('IN 24 HOURS',1050,200,30,P(t,13.34,.25));const v=Math.round(90*eo(P(t,14.0,1.4)));txt(v+'M'+(v>=90?'+':''),1050,300,{size:100,w:700,c:NAVY,a:P(t,14.0,.2)});txt('VIEWS',1050,370,{f:IN,w:800,size:16,ls:4,c:'#555',a:P(t,14.4,.25)});stickerW('BIGGEST NON-MUSIC DEBUT',1050,460,17.28,t,-6,'#d7261e',18);}
// L5 F — May 2025 Trailer 2
function M5(t){dim(.2);popAt(t,18.68,W/2,260,()=>{gcard(0,0,460,96,GOLD,'rgba(20,12,4,.6)');txt('MAY 2025',0,4,{size:56,gold:1,ls:4,glow:16});});txt('TRAILER 2',W/2,380,{size:48,w:700,ls:6,c:'#fff',sh:14,reveal:P(t,20.1,.35)});}
// L6 W — captured on a normal PS5
function M6(t){stageW();navy('THE WHOLE TRAILER WAS CAPTURED ON…',W/2,90,34,P(t,21.1,.25));clipCard('jet',t,21.6,430,360,520,292,-2,-1,null);const q=back(P(t,24.26,.3));if(q>0){x.save();x.translate(1010,380);x.scale(q,q);ps5(0,0,1);x.restore();}
  popAt(t,24.4,1010,610,()=>{wcard(0,0,300,64);txt('A NORMAL PS5',0,2,{size:32,w:700,ls:3,c:NAVY});});}
// L7 P — not a supercomputer, not a PS5 Pro
function M7(t){paperW();kick('NOT ON…',t,26.7,120);[['A SUPERCOMPUTER',27.0,27.6],['A PS5 PRO',27.9,28.6]].forEach(([s,t0,ts],i)=>{const Y=280+i*130;txt(s,W/2,Y,{size:70,w:700,ls:3,c:'#1d1d1d',a:P(t,t0,.2)});strike(W/2-320,Y,W/2+320,eo(P(t,ts,.25)),'#d7261e',9);});}
// L8 G — how is this possible?
function M8(t){dim(.35);txt('GRAPHICS LIKE THIS',W/2,260,{size:40,w:700,ls:5,c:'#fff',sh:14,a:P(t,30.6,.25)});txt('ON A NORMAL CONSOLE?',W/2,330,{size:54,gold:1,ls:4,reveal:P(t,31.9,.4)});popAt(t,32.82,W/2,450,()=>txt('HOW?',0,0,{size:90,w:700,c:RED}));}
// L9 G — the date saga begins
function M9(t){dim(.5);for(let i=0;i<5;i++){const q=P(t,33.9+i*.3,.3);if(q<=0)continue;x.save();x.translate(W/2+(i-2)*12,360-i*6);x.rotate((i-2)*.06);x.globalAlpha*=q;x.fillStyle='#f4f1ea';rr(-110,-130,220,260,12);x.fill();x.fillStyle='#d7261e';x.fillRect(-110,-130,220,50);x.restore();}
  txt('THE DATE SAGA BEGINS',W/2,560,{size:42,gold:1,ls:4,reveal:P(t,34.5,.4)});}
// L10 P — Fall 2025 -> 26 May 2026
function M10(t){paperW();kick('FIRST THEY SAID',t,36.0,90);txt('FALL 2025',W/2,240,{size:96,w:700,c:'#1d1d1d',a:P(t,37.06,.2)});strike(W/2-260,240,W/2+260,eo(P(t,38.5,.3)),'#d7261e',10);
  txt('DELAYED TO',W/2,350,{f:IN,w:800,size:16,ls:5,c:'#444',a:P(t,38.7,.2)});popAt(t,39.2,W/2,450,()=>txt('26 MAY 2026',0,0,{size:96,w:700,c:'#d7261e'}));}
// L11 G — then 19 Nov 2026; memes and anger
function M11(t){dim(.55);txt('DELAYED AGAIN',W/2,170,{size:30,w:700,ls:8,c:RED,sh:10,a:P(t,41.4,.25)});popAt(t,42.06,W/2,290,()=>{gcard(0,0,640,120,GOLD,'rgba(20,12,4,.7)');txt('19 NOVEMBER 2026',0,6,{size:62,gold:1,ls:4,glow:20});});
  [['MEMES',45.4,W/2-150],['ANGER',46.34,W/2+150]].forEach(([s,t0,X])=>popAt(t,t0,X,480,()=>{x.rotate(-.06);gcard(0,0,220,70,RED,'rgba(40,4,8,.8)');txt(s,0,3,{size:36,w:700,ls:5,c:'#fff'});}));}
// L12 P — Rockstar's answer: quality you deserve
function M12(t){paperW();kick("ROCKSTAR'S ANSWER STAYED THE SAME",t,47.0,110);x.save();x.globalAlpha*=P(t,49.0,.3);x.font=`italic 400 44px ${SERIF}`;x.fillStyle='#1d1d1d';x.textAlign='center';x.textBaseline='middle';x.fillText('"We will give you the quality',W/2,280);x.restore();
  x.save();x.globalAlpha*=P(t,49.9,.3);hlSerif('','you deserve','."',W/2,350,44,P(t,51.3,.4));x.restore();txt('— ROCKSTAR GAMES (PARAPHRASED)',W/2,450,{f:IN,w:700,size:14,ls:4,c:'#666',a:P(t,51.0,.3)});}
// L13 G — Sept 2022 shook the company
function M13(t){dim(.65);const sh=(t>57.1&&t<57.5)?(rnd(t*99)-.5)*16:0;x.save();x.translate(sh,0);txt('BEFORE ALL THE DELAYS…',W/2,250,{size:34,w:600,ls:6,c:'#fff',sh:10,a:P(t,52.3,.3)});txt('SOMETHING SHOOK THE WHOLE COMPANY',W/2,320,{size:38,w:700,ls:3,c:'#fff',sh:12,reveal:P(t,55.9,.5)});
  popAt(t,57.98,W/2,450,()=>txt('SEPTEMBER 2022',0,0,{size:80,w:700,ls:4,c:RED}));x.restore();}
// L14 F — one morning
function M14(t){dim(.3);txt('ONE MORNING, GAMERS OPENED THE INTERNET…',W/2,H-110,{size:34,w:700,ls:3,c:'#fff',sh:14,reveal:P(t,59.1,.6)});}
// L15 W — 90+ leaked videos
function M15(t){stageW();navy('90+ UNFINISHED GAMEPLAY VIDEOS LEAKED',W/2,80,36,P(t,62.9,.3));const ks=['club','beach','boat','flam','jet','launchc','trailer','gta6','heli'];
  ks.forEach((k,i)=>{const X=330+(i%3)*310,Y=230+Math.floor(i/3)*150,q=back(P(t,63.3+i*.08,.25));if(q<=0)return;x.save();x.translate(X,Y);x.scale(q,q);x.fillStyle='#fff';x.shadowColor='rgba(0,0,0,.2)';x.shadowBlur=12;x.fillRect(-135,-68,270,136);x.shadowBlur=0;cover(seqFrame(k,t,63,{loop:true}),-128,-61,256,122,1,.5,.5,'blur(6px)');
    txt('LEAKED',0,2,{size:24,w:700,ls:5,c:'#d7261e'});x.restore();});
  [['CHARACTERS',67.44,330],['VICE CITY MAP',68.6,640],['EARLY TEST BUILD',69.7,950]].forEach(([s,t0,X])=>popAt(t,t0,X,660,()=>{x.fillStyle=NAVY;rr(-110,-22,220,44,22);x.fill();txt(s,0,1,{f:IN,w:800,size:14,ls:3,c:'#fff'});}));
  txt('Blurred stand-ins: frames from official trailers',W/2,700,{f:IN,w:500,size:11,c:'#888',a:P(t,64,.3)});}
// L16 P — not a big hacking team
function M16(t){paperW();kick('WHO DID IT?',t,70.3,150);x.save();x.globalAlpha*=P(t,71.0,.3);x.font=`italic 400 48px ${SERIF}`;x.fillStyle='#1d1d1d';x.textAlign='center';x.textBaseline='middle';x.fillText('Not a big hacking team.',W/2,330);x.restore();stamp('NO HACKING TEAM',W/2,470,76.88,t,'#c8202b',-8,44);}
// L17 G — 18-year-old British, on bail, hotel
function M17(t){dim(.68);popAt(t,78.5,W/2,230,()=>{gcard(0,0,560,120,RED,'rgba(30,4,8,.8)');txt('AN 18-YEAR-OLD',0,-16,{size:52,w:700,ls:3,c:'#fff'});txt('FROM BRITAIN · AS REPORTED',0,36,{f:IN,w:700,size:14,ls:4,c:'#ff8090'});});
  txt('ALREADY ACCUSED OF HACKING OTHER BIG COMPANIES',W/2,370,{f:IN,w:700,size:16,ls:3,c:'#ddd',a:P(t,81.4,.3)});stamp('ON POLICE BAIL',W/2-210,480,84.02,t,RED,-6,34);stamp('KEPT IN A HOTEL',W/2+210,480,85.74,t,GOLD,5,34);}
// L18 P — laptop taken, didn't give up
function M18(t){paperW();laptop(W/2-220,330);const p=P(t,87.4,.3);if(p>0){x.save();x.translate(W/2-220,330);x.rotate(-.1);x.globalAlpha*=cl(p*3);x.strokeStyle='#d7261e';x.lineWidth=10;x.beginPath();x.moveTo(-110,-80);x.lineTo(110,80);x.moveTo(110,-80);x.lineTo(-110,80);x.stroke();x.restore();}
  stickerW('LAPTOP SEIZED',W/2-220,470,87.6,t,-6);x.save();x.globalAlpha*=P(t,88.6,.3);hlSerif('But he ','didn\'t give up','.',W/2+240,330,36,P(t,89.3,.35));x.restore();}
// L19 W — Fire TV Stick + phone + hotel TV -> Rockstar's systems
function M19(t){stageW();navy('FROM A HOTEL ROOM',W/2,80,36,P(t,90.0,.25));[['stick',91.78,'AMAZON FIRE TV STICK',130],['phone',93.96,'A MOBILE PHONE',300],['tv',95.6,'THE HOTEL TV',470]].forEach(([k,t0,l,Y],i)=>{const q=back(P(t,t0,.3));if(q<=0)return;
    x.save();x.translate(300,Y+30);x.scale(q*.92,q*.92);wcard(0,0,240,160);devIcon(k,0,-10);txt(l,0,70,{f:IN,w:800,size:12,ls:2,c:NAVY});x.restore();});
  const ap=eo(P(t,97.0,.5));if(ap>0){x.strokeStyle=NAVY;x.lineWidth=4;x.setLineDash([12,8]);x.beginPath();x.moveTo(440,420);x.lineTo(440+340*ap,420);x.stroke();x.setLineDash([]);}
  popAt(t,97.64,960,420,()=>{x.fillStyle=NAVY;x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=20;rr(-180,-90,360,180,14);x.fill();x.shadowBlur=0;txt("ROCKSTAR'S",0,-26,{size:38,w:700,ls:3,c:'#fff'});txt('INTERNAL SYSTEMS',0,24,{size:30,w:700,ls:3,c:'#ffd400'});});}
// L20 G — billion-dollar security vs a TV stick
function M20(t){dim(.62);txt('A BILLION-DOLLAR COMPANY’S SECURITY',W/2,230,{size:40,w:700,ls:3,c:'#fff',sh:12,reveal:P(t,100.4,.5)});popAt(t,102.18,W/2,330,()=>txt('vs',0,0,{size:40,w:700,c:GOLD}));
  popAt(t,103.0,W/2,440,()=>{gcard(0,0,420,100,GOLD,'rgba(20,12,4,.75)');txt('A TV STICK',0,4,{size:60,gold:1,ls:4,glow:20});});if(t>103.56&&t<103.9){x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=3;x.beginPath();x.moveTo(500,120);x.lineTo(620,300);x.lineTo(580,380);x.lineTo(720,620);x.stroke();}}
// L21 P — court: secure hospital indefinitely
function M21(t){paperW();const p=eo(P(t,104.0,.4));x.save();x.translate(W/2,380+(1-p)*500);x.rotate(-.02);x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=24;x.fillStyle='#fbfaf6';x.fillRect(-300,-260,600,520);x.shadowColor='transparent';
  txt('COURT RULING · 2023',-260,-220,{f:IN,w:800,size:13,ls:4,al:'left',c:'#b0303a'});for(let i=0;i<9;i++){x.fillStyle='rgba(40,40,40,.4)';x.fillRect(-260,-170+i*34,420+rnd(i+30)*90,8);}
  x.save();x.globalAlpha*=P(t,106.2,.3);x.font=`italic 700 34px ${SERIF}`;x.fillStyle='#1d1d1d';x.textAlign='center';x.fillText('"too dangerous"',0,160);x.restore();x.save();x.globalCompositeOperation='multiply';x.fillStyle='#ffe14d';x.fillRect(-150,140,300*eo(P(t,106.3,.3)),42);x.restore();
  stamp('SECURE HOSPITAL · INDEFINITELY',0,230,108.6,t,'#c8202b',-5,24);x.restore();}
// L22 G — a huge blow
function M22(t){dim(.55);const sh=(t>111.0&&t<111.35)?(rnd(t*77)-.5)*20:0;x.save();x.translate(sh,0);txt('FOR ROCKSTAR, THIS WAS',W/2,280,{size:32,w:600,ls:6,c:'#fff',sh:10,a:P(t,109.8,.25)});txt('A HUGE BLOW',W/2,380,{size:96,w:700,ls:6,c:RED,sh:16,reveal:P(t,111.0,.3)});x.restore();}
// L23 G — hype only grew
function M23(t){dim(.45);txt('BUT AFTER THE LEAK, THE HYPE…',W/2,150,{size:34,w:700,ls:4,c:'#fff',sh:12,a:P(t,112.0,.3)});const fill=eo(P(t,116.0,1.8));x.save();x.translate(W/2,400);x.strokeStyle=GOLD;x.lineWidth=3;rr(-60,-170,120,340,60);x.stroke();
  const h=320*fill;const g=x.createLinearGradient(0,170,0,-170);g.addColorStop(0,'#f5c766');g.addColorStop(1,'#ff4fa3');x.fillStyle=g;x.save();rr(-50,-160,100,320,50);x.clip();x.fillRect(-50,160-h,100,h);x.restore();x.restore();
  txt('ONLY GREW',W/2+260,400,{size:56,gold:1,ls:4,reveal:P(t,117.0,.4)});txt('PEOPLE SAW HOW REAL IT WOULD BE',W/2,650,{f:IN,w:800,size:16,ls:4,c:'#fff',a:P(t,118.8,.3)});}
// L24 P — where did the money go? never disclosed
function M24(t){paperW();kick('THE BIGGEST QUESTION',t,122.8,140);x.save();x.globalAlpha*=P(t,123.6,.3);hlSerif('Where did the ','money',' go?',W/2,280,52,P(t,124.54,.3));x.restore();stamp('BUDGET NEVER DISCLOSED',W/2,440,127.2,t,'#c8202b',-5,36);}
// L25 G — $1–2B (analysts)
function M25(t){dim(.6);txt('INDUSTRY ANALYSTS ESTIMATE',W/2,180,{size:30,w:700,ls:6,c:'#fff',sh:10,a:P(t,128.2,.3)});popAt(t,130.9,W/2,320,()=>txt('$1B – $2B',0,0,{size:130,gold:1,ls:3,glow:44}));txt('SOME SAY EVEN MORE',W/2,450,{size:30,w:700,ls:6,c:'#fff',sh:10,a:P(t,132.6,.3)});tag('ESTIMATES · NOT OFFICIAL',W/2,520,RED,P(t,132.9,.25));}
// L26 W — GTA V budget ~$265M
function M26(t){stageW();navy('FOR COMPARISON',W/2,90,36,P(t,134.1,.25));clipCard('gen1',t,134.6,360,340,400,225,-3,-1,'GTA V · 2013');const p=eo(P(t,136.4,.6));x.fillStyle=NAVY;x.fillRect(760,560-200*p,160,200*p);
  txt('~$265M',840,560-200*p-40,{size:56,w:700,c:NAVY,a:P(t,136.78,.25)});txt('TOTAL BUDGET · AS REPORTED',840,600,{f:IN,w:800,size:13,ls:3,c:'#555',a:P(t,137.2,.25)});}
// L27 G — many times more expensive; most expensive game ever
function M27(t){dim(.8);const base=560;bar3d(330,base,150,90*eo(P(t,138.6,.4)),'#2c4fb0','#4a7cf0');txt('GTA V',405,base+30,{f:IN,w:800,size:14,ls:3,c:'#ddd'});txt('$265M',405,base-130,{size:30,w:700,c:'#fff',a:P(t,138.8,.2)});
  bar3d(720,base,150,420*eo(P(t,141.4,.8)),'#9a6c1c','#f5c766');txt('GTA VI',795,base+30,{f:IN,w:800,size:14,ls:3,c:'#ddd'});popAt(t,142.3,1060,300,()=>txt('×4–8?',0,0,{size:72,gold:1,glow:30}));
  txt('THE MOST EXPENSIVE VIDEO GAME EVER?',W/2,90,{size:40,gold:1,ls:3,reveal:P(t,143.7,.5)});}
// L28 P — 5 parts
function M28(t){paperW();kick('WHERE THE MONEY WENT',t,145.1,180);popAt(t,146.6,W/2,340,()=>txt('5',0,0,{size:200,w:700,c:'#d7261e'}));x.save();x.globalAlpha*=P(t,146.9,.3);hlSerif('','five parts','',W/2,480,40,P(t,147.0,.3));x.restore();}
// L29 W — Leonida (Florida) and Vice City (Miami)
function M29(t){stageW();txt('1',90,80,{size:60,w:700,c:'#d7261e',a:P(t,147.7,.2)});navy('A WHOLE STATE: LEONIDA',W/2,80,38,P(t,147.9,.25));clipCard('v5',t,149.3,230,520,260,146,-4,-1,'GTA V: ONE CITY');
  const p=eo(P(t,152.1,.8));if(p>0){x.save();x.globalAlpha*=p;x.beginPath();FL.forEach(([lo,la],i)=>{const [X,Y]=fl(lo,la);i?x.lineTo(X,Y):x.moveTo(X,Y);});x.closePath();x.fillStyle='#c9e8a8';x.shadowColor='rgba(0,0,0,.2)';x.shadowBlur=16;x.fill();x.shadowBlur=0;x.strokeStyle='#e0b400';x.lineWidth=3;x.stroke();x.restore();}
  txt('LEONIDA',fl(-82.3,29)[0],fl(-82.3,29)[1],{size:38,w:700,ls:4,c:NAVY,a:P(t,153.9,.25)});txt('based on Florida',fl(-82.3,28.4)[0],fl(-82.3,28.4)[1],{f:SERIF,w:400,size:18,c:'#444',a:P(t,155.3,.25)});
  const mp=P(t,157.28,.25);if(mp>0){const [X,Y]=fl(-80.2,25.8);x.fillStyle='#d7261e';x.beginPath();x.arc(X,Y,9*back(mp),0,7);x.fill();txt('VICE CITY = MIAMI',X-30,Y+40,{size:26,w:700,ls:2,c:'#d7261e',a:mp,al:'right'});}}
// L30 F — swamps, beaches, islands, towns (one word per shot)
function M30(t){dim(.15);const L=[['SWAMPS',158.6],['ALLIGATORS',161.66],['BEACHES',162.66],['ISLANDS',163.8],['SMALL TOWNS',164.98],['EVERY AREA HAS ITS OWN VOICE',165.78]];let cur=null;for(const [s,t0] of L)if(t>=t0)cur=[s,t0];
  if(cur){x.fillStyle=GOLD;x.fillRect(70,H-112,4,40);txt(cur[0],88,H-91,{size:36,w:700,ls:3,al:'left',c:'#fff',sh:12,a:P(t,cur[1],.12)});}}
// L31a P — 2: obsession with detail
function M31a(t){paperW();txt('2',W/2,230,{size:150,w:700,c:'#d7261e',a:P(t,168.8,.2)});x.save();x.globalAlpha*=P(t,169.4,.25);hlSerif('An ','obsession',' with detail',W/2,400,48,P(t,169.7,.35));x.restore();}
// L31b G — beach callouts
function M31b(t){dim(.15);txt('LOOK CLOSELY AT THE BEACH',W/2,70,{size:30,w:700,ls:4,c:'#fff',sh:12,a:P(t,172.6,.25)});
  [['HUNDREDS OF PEOPLE',173.94,640,380,640,160],['SELFIE',177.22,420,330,240,220],['WORKOUT',178.5,820,420,1020,250],['JOGGING',179.5,520,470,300,560],['TRAFFIC',181.22,950,300,1100,140],['WAVES',182.14,300,600,170,450],['EVEN SWEAT',184.04,760,350,980,580]]
   .forEach(([s,t0,X1,Y1,X2,Y2])=>calloutF(s,X1,Y1,X2,Y2,t0,t));}
// L32 W — hard engineering on a normal console
function M32(t){stageW();ps5(380,380,1.0);navy('ALL OF IT ON A NORMAL CONSOLE',W/2+120,250,36,P(t,185.1,.25));x.save();x.globalAlpha*=P(t,186.9,.25);hlSerif('','very hard engineering','',W/2+120,380,40,P(t,187.4,.35));x.restore();}
// L33 P — 3: characters, first female lead
function M33(t){paperW();txt('3',150,160,{size:120,w:700,c:'#d7261e',a:P(t,188.5,.2)});tornPrint(seqStill('launchc',30),W/2+140,360,560,320,2,P(t,189.0,.35),41,'grayscale(.4)');x.save();x.globalAlpha*=P(t,189.6,.25);hlSerif('','Characters','',300,330,48,P(t,189.9,.3));x.restore();
  stickerW('FIRST FEMALE LEAD',W/2+170,560,190.6,t,-6);}
// L34 G — Lucia & Jason, Bonnie & Clyde
function M34(t){dim(.25);[['LUCIA',195.0,0],['JASON',196.24,1]].forEach(([s,t0,i])=>{lowerThird(s,70,H-104+i*34,P(t,t0,.25),'#ff4fa3');});
  txt('INSPIRED BY BONNIE & CLYDE',W/2,110,{size:40,gold:1,ls:4,reveal:P(t,197.3,.45)});txt('PARTNERS IN LOVE · PARTNERS IN CRIME',W/2,165,{f:IN,w:800,size:16,ls:4,c:'#fff',a:P(t,201.4,.3)});}
// L35 W — motion capture of real actors
function M35(t){stageW();navy('EVERY SCENE: REAL ACTORS, MOTION CAPTURE',W/2,80,32,P(t,202.9,.25));clipCard('gta6',t,203.3,400,370,520,292,-2,-1,null);
  for(let i=0;i<40;i++){const a=rnd(i)*7,r=40+rnd(i+3)*70,q=P(t,204.4+i*.02,.2);if(q<=0)continue;const X=950+Math.cos(a)*r*.8,Y=340+Math.sin(a)*r;x.fillStyle=`rgba(31,47,85,${q})`;x.beginPath();x.arc(X,Y,4,0,7);x.fill();}
  txt('FACIAL CAPTURE',950,480,{f:IN,w:800,size:14,ls:4,c:NAVY,a:P(t,205.5,.25)});x.save();x.globalAlpha*=P(t,206.0,.25);hlSerif('down to the ','smallest expression','',W/2,620,28,P(t,206.4,.35));x.restore();}
// L36a P — 4: mirror of the real world
function M36a(t){paperW();txt('4',W/2,220,{size:150,w:700,c:'#d7261e',a:P(t,207.6,.2)});x.save();x.globalAlpha*=P(t,208.0,.25);hlSerif('A ','mirror',' of the real world',W/2,380,46,P(t,208.4,.3));x.restore();
  txt('GTA has always mocked America',W/2,470,{f:SERIF,w:400,size:26,c:'#444',a:P(t,209.7,.3)});}
// L36b G — social media satire in a phone
function M36b(t){dim(.55);phoneFrame('beach',t,212.0,360,370,1.0);for(let i=0;i<6;i++){const k=((t-212+i*.5)%3)/3;heart(470+rnd(i)*40,600-k*360,1.4,1-k);}
  [['THIS TIME: SOCIAL MEDIA',212.76,190],['TIKTOK / INSTAGRAM-STYLE VIRAL VIDEOS',214.16,290],['"FLORIDA MAN"-STYLE NEWS',216.72,390],["TODAY'S INTERNET CULTURE",222.74,490]].forEach(([s,t0,Y])=>txt(s,600,Y,{size:30,w:700,ls:2,al:'left',...(t0>222?{gold:1}:{c:'#fff',sh:10}),a:P(t,t0,.25)}));}
// L37a W — 5: studios worldwide, 10+ years
function M37a(t){stageW();txt('5',90,80,{size:60,w:700,c:'#d7261e',a:P(t,224.44,.2)});navy('THOUSANDS OF PEOPLE · ROCKSTAR STUDIOS',W/2,80,32,P(t,225.1,.25));
  [['USA',228.5],['CANADA',229.32],['UK',229.98],['INDIA',230.56]].forEach(([s,t0],i)=>popAt(t,t0,250+i*260,300,()=>{wcard(0,0,200,110);txt(s,0,0,{size:40,w:700,ls:3,c:NAVY});}));
  popAt(t,232.42,W/2,480,()=>{x.fillStyle=NAVY;rr(-200,-44,400,88,12);x.fill();txt('10+ YEARS OF WORK',0,2,{size:40,w:700,ls:3,c:'#fff'});});}
// L37b G — salaries, tech, mocap, marketing -> crores to billions
function M37b(t){dim(.62);[['SALARIES',235.28],['TECHNOLOGY',235.78],['MOTION CAPTURE STUDIOS',236.68],["WORLD'S BIGGEST MARKETING CAMPAIGN",239.18]].forEach(([s,t0],i)=>popAt(t,t0,W/2,170+i*80,()=>{gcard(0,0,620,60,GOLD,'rgba(20,12,4,.7)');txt(s,0,2,{size:28,w:700,ls:3,c:'#fff'});}));
  txt('CRORES → BILLIONS',W/2,560,{size:56,gold:1,ls:4,reveal:P(t,241.14,.45)});}
// L38 F — did the gamble pay off?
function M38(t){dim(.3);txt('DID THE GAMBLE PAY OFF?',W/2,H/2,{size:60,w:700,ls:4,c:'#fff',sh:16,reveal:P(t,242.5,.5)});}
// L39 W — Take-Two: $1.39B in one pre-order quarter (as reported)
function M39(t){stageW();const p=eo(P(t,244.7,.4));x.save();x.translate(420,380+(1-p)*400);x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=24;x.fillStyle='#fff';x.fillRect(-250,-280,500,560);x.shadowColor='transparent';
  txt('TAKE-TWO · QUARTERLY REPORT',-220,-240,{f:IN,w:800,size:13,ls:3,al:'left',c:'#b0303a'});for(let i=0;i<10;i++){x.fillStyle='rgba(40,40,40,.35)';x.fillRect(-220,-190+i*36,360+rnd(i+40)*80,8);}
  x.save();x.globalCompositeOperation='multiply';x.fillStyle='#ffe14d';x.fillRect(-224,-30,430*eo(P(t,250.2,.4)),24);x.restore();x.restore();
  navy('ONE PRE-ORDER QUARTER',960,230,26,P(t,249.6,.25));popAt(t,250.9,960,330,()=>txt('$1.39B',0,0,{size:110,w:700,c:NAVY}));txt('IN SALES · AS REPORTED',960,410,{f:IN,w:800,size:14,ls:3,c:'#555',a:P(t,252.1,.25)});stickerW('BEFORE RELEASE',960,500,254.7,t,-6);}
// L40 G — pre-orders covered the cost (analysts)
function M40(t){dim(.6);txt('SOME ANALYSTS SAY',W/2,220,{size:30,w:700,ls:6,c:'#fff',sh:10,a:P(t,256.1,.25)});txt('PRE-ORDERS ALONE',W/2,320,{size:60,w:700,ls:4,c:'#fff',sh:14,reveal:P(t,257.6,.4)});txt('COVERED THE ENTIRE BUDGET',W/2,410,{size:52,gold:1,ls:3,reveal:P(t,259.2,.45)});tag('ANALYST ESTIMATE',W/2,490,RED,P(t,259.6,.25));}
// L41 P — GTA V day-one record
function M41(t){paperW();kick('THE RECORD TO BEAT',t,260.4,110);txt('GTA V · DAY ONE',W/2,230,{size:40,w:700,ls:4,c:'#1d1d1d',a:P(t,261.6,.25)});popAt(t,262.9,W/2,350,()=>txt('11.2 MILLION',0,0,{size:110,w:700,c:'#d7261e'}));
  x.save();x.globalAlpha*=P(t,263.2,.3);hlSerif('','1 crore 12 lakh',' copies',W/2,450,34,P(t,263.4,.3));x.restore();stickerW('GUINNESS WORLD RECORD',W/2+300,540,265.1,t,-6);}
// L42 W — investment bank: 45M+ at launch, ~4x
function M42(t){stageW();navy("A BIG INVESTMENT BANK'S ESTIMATE",W/2,90,32,P(t,266.3,.25));const base=600;
  x.fillStyle='#c9ccd2';x.fillRect(320,base-110*eo(P(t,267.0,.4)),200,110*eo(P(t,267.0,.4)));txt('GTA V · 11.2M',420,base+30,{f:IN,w:800,size:14,ls:3,c:'#555'});
  const h=440*eo(P(t,270.5,.8));x.fillStyle=NAVY;x.fillRect(760,base-h,200,h);txt('GTA VI · 45M+?',860,base+30,{f:IN,w:800,size:14,ls:3,c:NAVY});popAt(t,274.4,1110,300,()=>{wcard(0,0,160,90);txt('~4×',0,2,{size:56,w:700,c:'#d7261e'});});}
// L43 G — 50M by March 2027, biggest launch ever
function M43(t){dim(.6);txt('ANOTHER FIRM: BY MARCH 2027',W/2,180,{size:30,w:700,ls:5,c:'#fff',sh:10,a:P(t,275.4,.25)});const v=Math.round(5e7*eoX(P(t,277.0,1.4)));txt(v.toLocaleString('en-US'),W/2,310,{size:110,gold:1,ls:3,glow:40,a:P(t,276.9,.2)});
  txt('COPIES · PROJECTED',W/2,390,{f:IN,w:800,size:16,ls:5,c:'#ddd',a:P(t,278.6,.25)});txt('THE BIGGEST LAUNCH IN GAMING HISTORY?',W/2,480,{size:40,gold:1,ls:3,reveal:P(t,279.8,.5)});}
// L44 P — HR company: day-off requests; empty offices
function M44(t){paperW();kick('THE IMPACT WENT BEYOND GAMING',t,281.9,70);const p=eo(P(t,283.6,.4));x.save();x.translate(420,390+(1-p)*400);x.rotate(-.03);x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=20;x.fillStyle='#fbfaf6';x.fillRect(-230,-250,460,500);x.shadowColor='transparent';
  txt('LEAVE REQUEST',-200,-210,{f:IN,w:800,size:14,ls:4,al:'left',c:'#b0303a'});txt('19 NOV 2026',-200,-160,{size:40,w:700,al:'left',c:'#1d1d1d'});txt('Reason: GTA VI',-200,-100,{f:SERIF,w:400,size:24,al:'left',c:'#444'});x.restore();
  [0,1,2].forEach(i=>stamp('APPROVED',360+i*14,560-i*120,288.2+i*.5,t,'#1a8f2a',-10+i*6,26));x.save();x.globalAlpha*=P(t,292.3,.3);hlSerif('A video game ','emptied offices',' across a country',900,330,30,P(t,294.6,.35));x.restore();txt('HR company report · as reported',900,390,{f:IN,w:500,size:12,c:'#777',a:P(t,285.7,.3)});}
// L45 W — platforms: PS5 + Xbox yes, PC no; IN & PK mostly PC
function M45(t){stageW();navy('THE THING I MENTIONED AT THE START',W/2,80,30,P(t,296.1,.25));[['PS5',299.4,'#1a8f2a','✓'],['XBOX SERIES X|S',300.06,'#1a8f2a','✓'],['PC',302.22,'#d7261e','✗']].forEach(([s,t0,c,m],i)=>popAt(t,t0,280+i*360,280,()=>{wcard(0,0,300,150);txt(s,0,-20,{size:34,w:700,ls:2,c:NAVY});txt(m,0,40,{size:46,w:700,c});}));
  [[flagIN,W/2-150,303.08],[flagPK,W/2+150,303.5]].forEach(([fn,X,t0])=>popAt(t,t0,X,520,()=>{x.scale(.6,.6);fn();}));txt('MOSTLY PLAY ON PC',W/2,640,{size:34,w:700,ls:4,c:NAVY,a:P(t,304.86,.25)});}
// L46 G — PS5 not affordable for all; PC early 2027?
function M46(t){dim(.55);txt('AND A PS5 IS NOT AFFORDABLE FOR EVERYONE',W/2,200,{size:34,w:700,ls:3,c:'#fff',sh:12,reveal:P(t,307.8,.5)});popAt(t,312.6,W/2,350,()=>{gcard(0,0,640,120,GOLD,'rgba(20,12,4,.7)');txt('PC VERSION: EARLY 2027?',0,4,{size:52,gold:1,ls:3,glow:18});});tag('REPORT CITING 5 SOURCES · UNCONFIRMED',W/2,460,RED,P(t,310.9,.25));}
// L47 P — GTA V reached PC ~1.5 years later
function M47(t){paperW();kick('REMEMBER',t,315.5,140);txt('GTA V',W/2,240,{size:60,w:700,c:'#1d1d1d',a:P(t,316.0,.2)});const p=eo(P(t,317.0,.6));x.strokeStyle='#1d1d1d';x.lineWidth=4;x.beginPath();x.moveTo(320,380);x.lineTo(320+640*p,380);x.stroke();
  txt('CONSOLE · 2013',320,420,{f:IN,w:800,size:14,ls:3,c:'#444'});txt('PC · 2015',960,420,{f:IN,w:800,size:14,ls:3,c:'#444',a:p});stickerW('~1.5 YEARS LATER',W/2,330,317.6,t,-5);}
// L48 W — recap 4 cards
function M48(t){stageW();navy('THAT WAS THE STORY OF GTA VI',W/2,80,34,P(t,318.6,.25));[['gen1','13 YEARS',320.6],['club','A TV-STICK HACKER',321.72],['launchc','BILLIONS OF DOLLARS',322.62],['trailer','THE BIGGEST LAUNCH',324.28]].forEach(([k,l,t0],i)=>{const X=200+i*293;clipCard(k,t,t0,X,320,250,141,[-3,2,-2,3][i],1);txt(l,X,440,{size:22,w:700,ls:2,c:NAVY,a:P(t,t0+.2,.2)});});}
// L49 G — console or wait for PC? comment
function M49(t){dim(.55);txt('CONSOLE NOW',W/2-230,300,{size:52,gold:1,ls:3,reveal:P(t,325.9,.35)});txt('or',W/2,300,{size:32,w:700,c:'#fff',a:P(t,326.9,.2)});txt('WAIT FOR PC?',W/2+230,300,{size:52,gold:1,ls:3,reveal:P(t,327.1,.35)});
  popAt(t,328.2,W/2,440,()=>{gcard(0,0,420,70,'#fff','rgba(0,0,0,.6)');txt('💬  TELL US IN THE COMMENTS',0,2,{f:IN,w:800,size:18,ls:2,c:'#fff'});});}
// L50 F — next video
function M50(t){dim(.4);txt('NEXT VIDEO',W/2,250,{f:IN,w:800,size:18,ls:6,c:GOLD,a:P(t,329.2,.25)});txt('VICE CITY vs REAL MIAMI',W/2,330,{size:64,w:700,ls:4,c:'#fff',sh:16,reveal:P(t,330.6,.5)});}
// L51 F — subscribe (no brand) + credits
function M51(t){dim(lerp(.4,.7,P(t,332.9,1)));popAt(t,333.18,W/2,300,()=>{x.fillStyle='#d7261e';rr(-150,-40,300,80,40);x.fill();txt('SUBSCRIBE',0,2,{size:36,w:700,ls:4,c:'#fff'});});txt('SEE YOU IN THE NEXT VIDEO',W/2,400,{size:30,w:600,ls:6,c:'#fff',a:P(t,334.4,.3)});
  ['Footage: Rockstar Games trailers (short excerpts for commentary) · GTA V PS5 gameplay CC BY 4.0 via Internet Archive','All graphics, music and narration original · Not affiliated with Rockstar Games'].forEach((l,i)=>txt(l,W/2,620+i*24,{f:IN,w:500,size:12,c:'#bbb',a:P(t,333.5,.3)}));
  x.fillStyle=`rgba(0,0,0,${P(t,335.0,.6)})`;x.fillRect(0,0,W,H);}

const S2=[[0,5.45,M1,'F',.03],[5.45,9.7,M2,'P',.02],[9.7,12.0,M3,'G',.03],[12.0,18.0,M4,'W',.02],[18.0,20.9,M5,'F',.03],[20.9,26.6,M6,'W',.02],[26.6,29.2,M7,'P',.02],[29.2,33.6,M8,'G',.02],[33.6,35.9,M9,'G',.02],[35.9,40.6,M10,'P',.02],
 [40.6,46.9,M11,'G',.02],[46.9,52.1,M12,'P',.02],[52.1,58.9,M13,'G',.02],[58.9,62.6,M14,'F',.03],[62.6,70.2,M15,'W',.02],[70.2,77.9,M16,'P',.02],[77.9,86.8,M17,'G',.02],[86.8,89.9,M18,'P',.02],[89.9,99.8,M19,'W',.02],[99.8,103.9,M20,'G',.02],
 [103.9,109.6,M21,'P',.02],[109.6,111.8,M22,'G',.03],[111.8,122.6,M23,'G',.02],[122.6,127.7,M24,'P',.02],[127.7,134.0,M25,'G',.02],[134.0,138.2,M26,'W',.02],[138.2,145.6,M27,'G',.02],[145.6,147.7,M28,'P',.02],[147.7,158.6,M29,'W',.02],[158.6,168.7,M30,'F',0],
 [168.7,172.6,M31a,'P',.02],[172.6,184.9,M31b,'G',.02],[184.9,188.4,M32,'W',.02],[188.4,193.5,M33,'P',.02],[193.5,202.7,M34,'G',.02],[202.7,207.6,M35,'W',.02],[207.6,212.0,M36a,'P',.02],[212.0,224.4,M36b,'G',.01],[224.4,234.5,M37a,'W',.02],[234.5,242.3,M37b,'G',.02],
 [242.3,244.5,M38,'F',.03],[244.5,256.0,M39,'W',.02],[256.0,260.3,M40,'G',.02],[260.3,266.2,M41,'P',.02],[266.2,275.2,M42,'W',.02],[275.2,281.8,M43,'G',.02],[281.8,296.0,M44,'P',.02],[296.0,307.6,M45,'W',.02],[307.6,315.4,M46,'G',.02],[315.4,318.5,M47,'P',.02],
 [318.5,325.3,M48,'W',.02],[325.3,328.9,M49,'G',.02],[328.9,332.8,M50,'F',.02],[332.8,335.7,M51,'F',0]];

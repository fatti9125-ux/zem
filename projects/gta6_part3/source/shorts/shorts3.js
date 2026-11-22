// Vertical (1080x1920) Shorts for Part 3. Mostly clips; type sits in the middle band, clear of the Shorts UI.
const PINK='#ff4fd8',NV='#1f2f55';
function band(a=.55){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgba(0,0,0,${a*.7})`);g.addColorStop(.3,'rgba(0,0,0,0)');g.addColorStop(.62,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);x.fillStyle=g;x.fillRect(0,0,W,H);}
function darken(a){x.fillStyle=`rgba(6,5,10,${a})`;x.fillRect(0,0,W,H);}
function T1(s,Y,t,t0,size=84,o={}){txt(s,W/2,Y,{size,w:700,ls:2,c:'#fff',sh:22,reveal:P(t,t0,.3),...o});}
function TG(s,Y,t,t0,size=110){txt(s,W/2,Y,{size,gold:1,ls:3,glow:20,reveal:P(t,t0,.35)});}
function TS(s,Y,t,t0,size=40){txt(s,W/2,Y,{size,w:600,ls:6,c:'#fff',sh:16,a:P(t,t0,.25)});}
function pill(s,X,Y,t,t0,bg=RED,fg='#fff',size=40){const p=back(P(t,t0,.25));if(p<=0)return;x.save();x.translate(X,Y);x.scale(p,p);x.font=font({w:700,size});x.letterSpacing='2px';const w=x.measureText(s).width+60;x.fillStyle=bg;rr(-w/2,-size*.85,w,size*1.7,size*.85);x.fill();x.restore();txt(s,X,Y+2,{size,w:700,ls:2,c:fg,a:cl(p*2)});}
function splitFrame(t,t0,top='GTA 6',bot='REAL LIFE'){x.fillStyle='#fff';x.fillRect(0,H/2-4,W,8);pill(top,190,120,t,t0,'#111','#fff',34);pill(bot,250,H/2+210,t,t0+.15,RED,'#fff',34);}
function bottomPhoto(k,t,t0,dur){x.save();x.beginPath();x.rect(0,H/2,W,H/2);x.clip();cover(IMG[k],0,H/2,W,H/2,lerp(1.04,1.14,cl((t-t0)/dur)));x.restore();}
function stampB(s,X,Y,t0,t,size=90,rot=-10){stamp(s,X,Y,t0,t,RED,rot,size);}
function hammerV(X,Y,r){x.save();x.translate(X,Y);x.rotate(r);x.fillStyle='#7a4a22';rr(-12,-14,24,220,8);x.fill();x.fillStyle='#2b2b2b';rr(-66,-50,132,50,8);x.fill();x.restore();}
function personV(X,Y,s,col){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle=col;x.beginPath();x.arc(0,-110,34,0,7);x.fill();rr(-48,-68,96,130,30);x.fill();x.fillRect(-40,50,30,90);x.fillRect(10,50,30,90);x.restore();}
function callV(s,X1,Y1,X2,Y2,t0,t,col='#ffd400'){const lp=eo(P(t,t0,.25));if(lp<=0)return;x.strokeStyle=col;x.lineWidth=5;x.beginPath();x.moveTo(X1,Y1);x.lineTo(lerp(X1,X2,lp),lerp(Y1,Y2,lp));x.stroke();x.fillStyle=col;x.beginPath();x.arc(X1,Y1,10,0,7);x.fill();pill(s,X2,Y2,t,t0+.15,col,'#111',36);}
const SH1=[
[0,4.3,t=>{darken(.45);TS('THE MAN WHO DEMANDED',640,t,.1,44);TG('CRORES',760,t,.9,150);T1('FROM ROCKSTAR…',890,t,1.6,80);pill('IS NOW IN GTA 6\'S CREDITS',W/2,1060,t,2.9,RED,'#fff',50);txt('AS REPORTED',W/2,1150,{f:IN,w:800,size:22,ls:6,c:'rgba(255,255,255,.75)',a:P(t,3.3,.3)});}],
[4.3,8.66,t=>{band();T1('A MAN WITH HIS WHOLE FACE',700,t,4.4,62);TG('TATTOOED LIKE THE JOKER',800,t,5.4,80);}],
[8.66,14.18,t=>{darken(.35);TS('A REAL MAN IN FLORIDA',640,t,8.7,44);TS('THE INTERNET CALLS HIM',720,t,10.0,40);txt('"FLORIDA',W/2,860,{size:150,w:700,c:PINK,glow:30,reveal:P(t,11.5,.3)});txt('JOKER"',W/2,1010,{size:150,w:700,c:PINK,glow:30,reveal:P(t,11.8,.3)});}],
[14.18,20.36,t=>{darken(.5);TS('REAL NAME',600,t,14.2,44);T1('LAWRENCE',720,t,14.6,130);T1('SULLIVAN',860,t,15.0,130);pill('JOKER TATTOOS · FROM THE BATMAN FILMS',W/2,1030,t,17.0,'#fff','#111',30);}],
[20.36,23.24,t=>{darken(.6);const p=eo(P(t,20.4,.4));x.save();x.globalAlpha*=p;x.fillStyle='#e9e6df';x.fillRect(W/2-260,560,520,640);x.strokeStyle='rgba(0,0,0,.25)';for(let i=0;i<10;i++){x.beginPath();x.moveTo(W/2-260,600+i*60);x.lineTo(W/2+260,600+i*60);x.stroke();}personV(W/2,1150,2.0,'#2a2a2a');x.fillStyle='#111';x.fillRect(W/2-140,1060,280,70);txt('2017',W/2,1097,{f:IN,w:800,size:34,ls:6,c:'#fff'});x.restore();
  TG('HIS MUGSHOT',460,t,20.6,100);stampB('VIRAL',W/2+180,1240,21.9,t,90,-10);}],
[23.24,27.56,t=>{darken(.45);TS('AFTER THE TRAILER, HE SAID…',560,t,23.3,44);const p=back(P(t,24.8,.3));if(p>0){x.save();x.translate(W/2,820);x.scale(p,p);x.fillStyle='#fff';rr(-440,-150,880,300,50);x.fill();x.beginPath();x.moveTo(-300,140);x.lineTo(-360,260);x.lineTo(-200,150);x.fill();x.restore();if(p>.6){txt('"ROCKSTAR',W/2,770,{size:90,w:700,c:NV});txt('SHOULD PAY ME"',W/2,880,{size:90,w:700,c:NV});}}
  txt('AS REPORTED',W/2,1150,{f:IN,w:800,size:22,ls:6,c:'rgba(255,255,255,.7)',a:P(t,25.6,.3)});}],
[27.56,32.82,t=>{darken(.5);TS('FIRST HE ASKED FOR',600,t,27.6,46);const v=t<29.8?2*eo(P(t,27.9,.6)):lerp(2,10,eo(P(t,29.8,.8)));txt('$'+v.toFixed(v>9.9||v<2.05?0:1)+'M',W/2,800,{size:230,gold:1,glow:24,a:P(t,27.9,.15)});if(t>29.7)pill('THEN',W/2,1000,t,29.7,RED,'#fff',36);T1('BUT THEN…',1120,t,31.0,80);}],
[32.82,38.34,t=>{darken(.5);T1('LAWSUIT THREAT',640,t,32.9,100);const q=eo(P(t,33.8,.3));if(q>0){x.strokeStyle=RED;x.lineWidth=14;x.beginPath();x.moveTo(W/2-400,640);x.lineTo(W/2-400+800*q,640);x.stroke();}TS('DROPPED. INSTEAD HE TOLD ROCKSTAR:',800,t,34.4,36);txt('"I WANT TO VOICE',W/2,920,{size:84,gold:1,reveal:P(t,35.8,.3)});txt('THE CHARACTER"',W/2,1020,{size:84,gold:1,reveal:P(t,36.1,.3)});}],
[38.34,40.5,t=>{darken(.75);TS('AND NOW, IN THE GAME\'S CREDITS',420,t,38.4,40);const rows=['ADDITIONAL VOICES','· · · · · · ·','· · · · · · · ·','LAWRENCE SULLIVAN','· · · · · ·','· · · · · · · ·'];rows.forEach((s,i)=>{const Y=900-(t-38.34)*90+i*90;if(Y<540||Y>1300)return;const h=s.startsWith('LAW');if(h){x.fillStyle='rgba(245,199,102,.2)';x.fillRect(140,Y-40,W-280,80);}txt(s,W/2,Y,{f:IN,w:800,size:h?50:34,ls:4,c:h?GOLD:'#aaa'});});pill('AS REPORTED',W/2,1400,t,38.6,RED,'#fff',28);}],
[40.5,48.2,t=>{darken(.45);TS('THE MAN WHO ACCUSED ROCKSTAR',600,t,40.6,44);TS('OF OWING HIM MONEY…',670,t,41.6,44);TG('IS NOW PART OF',860,t,44.4,110);TG('GTA 6',1000,t,44.9,170);x.fillStyle=`rgba(0,0,0,${P(t,47.2,.9)})`;x.fillRect(0,0,W,H);}],
];
const SH2=[
[0,3.9,t=>{band(.6);TS('THE CITY YOU EXPLORE IN',700,t,.2,50);TG('GTA 6',860,t,1.0,220);}],
[3.9,7.74,t=>{band(.6);TS('YOU CAN WALK ITS REAL STREETS',700,t,4.0,44);T1('TOMORROW MORNING',800,t,5.2,90);pill('MIAMI, FLORIDA',W/2,950,t,6.3,RED,'#fff',46);}],
[7.74,9.18,t=>{darken(.4);T1('WOULD YOU',760,t,7.8,120);TG('BELIEVE IT?',900,t,8.2,140);}],
[9.18,11.8,t=>{bottomPhoto('colony3',t,9.18,2.6);splitFrame(t,9.2);pill('LUCIA\'S HOTEL',W/2,H/2,t,9.5,'#111','#fff',40);stampB('REAL',800,1450,11.2,t);}],
[11.8,14.66,t=>{splitFrame(t,11.8);pill('THE BEACH',W/2,H/2,t,11.9,'#111','#fff',40);stampB('REAL',800,1450,13.9,t);}],
[14.66,18.78,t=>{bottomPhoto('seven40',t,14.66,4.1);splitFrame(t,14.7,'GTA 6','FLORIDA KEYS');pill('THE BROKEN BRIDGE',W/2,H/2,t,14.8,'#111','#fff',40);txt('IT ENDS IN THE MIDDLE OF THE SEA',W/2,H/2+90,{size:40,w:700,c:'#fff',sh:16,a:P(t,15.6,.3)});stampB('REAL',800,1450,17.6,t);}],
[18.78,25.12,t=>{splitFrame(t,18.8);if(t>21.0)pill('OCEAN BEACH',W/2,H/2-90,t,21.1,'#111','#fff',48);if(t>24.2)pill('SOUTH BEACH, MIAMI',W/2,H/2+90,t,24.36,RED,'#fff',48);}],
[25.12,27.66,t=>{bottomPhoto(t<26.4?'life46':'life49',t,t<26.4?25.12:26.4,1.3);splitFrame(t,25.1);pill('COLORFUL LIFEGUARD TOWERS',W/2,H/2,t,25.2,'#fff','#111',36);if(t>26.5)pill('WHITE SAND',W/2,H/2+100,t,26.6,GOLD,'#111',36);}],
[27.66,37.68,t=>{const k=t<32.56?'colony3':t<35.0?'colony7':'colony2';bottomPhoto(k,t,t<32.56?27.66:t<35?32.56:35.0,2.6);splitFrame(t,27.7);pill('THE GAME\'S HOTEL',W/2,H/2-90,t,27.8,'#111','#fff',40);pill('COLONY HOTEL · OCEAN DRIVE',W/2,H/2+90,t,31.1,RED,'#fff',40);if(t>32.6&&t<35.0)pill('BLUE NEON SIGN',W/2,1580,t,32.8,'#1f5fd1','#fff',38);if(t>35.0)pill('ART DECO STYLE',W/2,1580,t,35.1,'#fff','#111',38);stampB('REAL',820,1300,31.6,t,80);}],
[37.68,44.48,t=>{band(.5);TS('A BUILDING IN THE GAME\'S SKYLINE',420,t,37.7,40);callV('WHITE STRIPES',560,900,780,720,39.44,t);callV('BIG ANTENNA',540,560,800,520,41.2,t);}],
[44.48,51.82,t=>{bottomPhoto('sky20',t,44.48,7.3);splitFrame(t,44.5);pill('ONE BISCAYNE TOWER',W/2,H/2,t,44.6,RED,'#fff',46);pill('39 FLOORS · BUILT 1973',W/2,H/2+100,t,46.2,'#fff','#111',34);[['✓ SAME STRIPES',49.1],['✓ SAME ANTENNA',49.9],['✓ EVERYTHING MATCHES',50.6]].forEach(([s,t0],i)=>pill(s,W/2,1480+i*95,t,t0,'#0d3d22','#4df58f',38));}],
[51.82,55.4,t=>{darken(.45);T1('THE WHOLE STREET',760,t,51.9,110);TG('IS REAL',900,t,52.3,150);stampB('ONLY THE NAMES CHANGED',W/2,1100,52.9,t,56,-6);x.fillStyle=`rgba(0,0,0,${P(t,54.5,.9)})`;x.fillRect(0,0,W,H);}],
];

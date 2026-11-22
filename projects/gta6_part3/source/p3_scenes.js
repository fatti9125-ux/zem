// PART 3 — Vice City vs Real Miami (first ~5:30). Times = tightened VO (p3/vo3_tight.wav), from word timestamps.
// Kinds per line: G graphics over footage, F full footage + minimal type, W white stage + live cards, P editorial paper.
const MAP={lo0:-83.75,la0:27.75,k:64,cx:640,cy:440};
const fm=(lo,la,m=MAP)=>[m.cx+(lo-m.lo0)*m.k,m.cy-(la-m.la0)*m.k*1.08];
const FL2=[[-87.6,31.0],[-85.0,31.0],[-84.86,30.7],[-82.2,30.57],[-82.0,30.79],[-81.45,30.71],[-81.3,30.0],[-81.0,29.2],[-80.6,28.4],[-80.55,28.0],[-80.2,27.0],[-80.05,26.5],[-80.1,25.8],[-80.3,25.4],[-80.5,25.2],[-80.9,25.15],[-81.1,25.3],[-81.35,25.8],[-81.7,25.95],[-81.85,26.4],[-82.1,26.7],[-82.3,27.0],[-82.65,27.5],[-82.8,27.9],[-82.65,28.6],[-82.7,29.0],[-83.0,29.15],[-83.4,29.5],[-83.7,29.95],[-84.1,30.08],[-84.4,29.95],[-84.9,29.7],[-85.3,29.68],[-85.4,29.9],[-85.7,30.15],[-86.2,30.38],[-86.8,30.4],[-87.5,30.3],[-87.4,30.45],[-87.6,30.9]];
const KEYS=[[-80.4,25.15],[-80.55,24.98],[-80.75,24.85],[-81.0,24.72],[-81.25,24.66],[-81.5,24.6],[-81.78,24.55]];
const PLACES={miami:[-80.19,25.77],clew:[-80.93,26.75],okee:[-80.83,26.95],britton:[-86.28,30.99],forgot:[-85.1,29.85],keys:[-81.1,24.7]};
function flPath(m=MAP){x.beginPath();FL2.forEach(([a,b],i)=>{const [X,Y]=fm(a,b,m);i?x.lineTo(X,Y):x.moveTo(X,Y);});x.closePath();}
function flMap(t,t0,{m=MAP,fill='rgba(245,199,102,.10)',stroke=GOLD,lw=3,dark=true}={}){const p=eo(P(t,t0,.9));if(p<=0)return;
  x.save();flPath(m);x.fillStyle=fill;x.globalAlpha*=cl(p*1.5);x.fill();x.restore();
  x.save();flPath(m);x.setLineDash([3000]);x.lineDashOffset=3000*(1-p);x.strokeStyle=stroke;x.lineWidth=lw;x.shadowColor=dark?stroke:'transparent';x.shadowBlur=dark?14:0;x.stroke();x.restore();
  KEYS.forEach(([a,b],i)=>{const q=P(t,t0+.6+i*.05,.2);if(q<=0)return;const [X,Y]=fm(a,b,m);x.fillStyle=stroke;x.globalAlpha=q;x.beginPath();x.arc(X,Y,3.2,0,7);x.fill();x.globalAlpha=1;});}
function pin(lo,la,t,t0,label,col=RED,m=MAP,dir=1,size=20){const p=back(P(t,t0,.3));if(p<=0)return;const [X,Y]=fm(lo,la,m);x.save();x.translate(X,Y);x.scale(p,p);
  x.fillStyle=col;x.beginPath();x.arc(0,-26,13,0,7);x.fill();x.beginPath();x.moveTo(-10,-20);x.lineTo(0,0);x.lineTo(10,-20);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(0,-26,5,0,7);x.fill();x.restore();
  if(label)txt(label,X+dir*24,Y-26,{f:IN,w:800,size,ls:2,al:dir>0?'left':'right',c:'#fff',sh:8,a:P(t,t0+.15,.25)});}
// white-stage VS: game card vs real card/photo
function vsW(t,a,g,gl,r,rl,head,tr=a+.5,stampT=null,tags=['GTA VI','REAL LIFE']){stageW();if(head)navy(head,W/2,84,34,P(t,a,.25));
  clipCard(g,t,a+.05,345,360,500,282,-2,-1,null);clipCard(r,t,tr,935,360,500,282,2,1,null);
  tag2(tags[0],345,535,P(t,a+.3,.25),'#1d1d1d');tag2(tags[1],935,535,P(t,tr+.3,.25),RED);
  txt(gl,345,585,{size:26,w:700,ls:2,c:NAVY,a:P(t,a+.4,.3)});txt(rl,935,585,{size:26,w:700,ls:2,c:NAVY,a:P(t,tr+.4,.3)});
  popAt(t,tr+.2,W/2,360,()=>{x.fillStyle=NAVY;x.beginPath();x.arc(0,0,40,0,7);x.fill();txt('VS',0,2,{size:32,w:700,c:'#fff'});});
  if(stampT!==null)stamp('REAL',935,250,stampT,t,RED,-10,46);}
function tag2(s,X,Y,a,col){if(a<=0)return;x.save();x.globalAlpha*=a;x.font=font({f:IN,w:800,size:14});x.letterSpacing='3px';const w=x.measureText(s).width+26;x.fillStyle=col;rr(X-w/2,Y-14,w,28,14);x.fill();x.restore();txt(s,X,Y+1,{f:IN,w:800,size:14,ls:3,c:'#fff',a});}
function bigT(s,Y,t,t0,size=64,o={}){txt(s,W/2,Y,{size,w:700,ls:3,c:'#fff',sh:16,reveal:P(t,t0,.35),...o});}
function goldT(s,Y,t,t0,size=64){txt(s,W/2,Y,{size,gold:1,ls:4,glow:14,reveal:P(t,t0,.4)});}
function chip(s,X,Y,t,t0,col=GOLD,tc='#111',size=20){const p=back(P(t,t0,.22));if(p<=0)return;x.save();x.translate(X,Y);x.scale(p,p);x.font=font({f:IN,w:800,size});x.letterSpacing='2px';const w=x.measureText(s).width+30;x.fillStyle=col;rr(-w/2,-size,w,size*2,size);x.fill();x.restore();txt(s,X,Y+1,{f:IN,w:800,size,ls:2,c:tc,a:cl(p)});}
function photoF(k,t,t0,dur,s0=1.04,s1=1.14,ax=.5,ay=.5){cover(IMG[k],0,0,W,H,lerp(s0,s1,cl((t-t0)/dur)),ax,ay);}
function polaroid(k,X,Y,w,h,rot,p){if(p<=0)return;x.save();x.translate(X,Y+(1-eo(p))*300);x.rotate(rot*Math.PI/180);x.globalAlpha*=cl(p*2);x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=22;x.shadowOffsetY=10;x.fillStyle='#fff';x.fillRect(-w/2-12,-h/2-12,w+24,h+60);x.shadowColor='transparent';cover(SEQ[k]?SEQ[k][20]:IMG[k],-w/2,-h/2,w,h);x.restore();}
function meter(X,Y,r,v,t,t0){const p=eo(P(t,t0,1.2));x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=18;x.beginPath();x.arc(X,Y,r,Math.PI,2*Math.PI);x.stroke();
  const g=x.createLinearGradient(X-r,0,X+r,0);g.addColorStop(0,'#2bd46b');g.addColorStop(.5,GOLD);g.addColorStop(1,RED);x.strokeStyle=g;x.beginPath();x.arc(X,Y,r,Math.PI,Math.PI+Math.PI*v*p);x.stroke();
  const a=Math.PI+Math.PI*v*p+Math.sin(t*9)*.03;x.strokeStyle='#fff';x.lineWidth=5;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*(r-30),Y+Math.sin(a)*(r-30));x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(X,Y,10,0,7);x.fill();}
function plane(X,Y,ang,s=1,col='#fff'){x.save();x.translate(X,Y);x.rotate(ang);x.scale(s,s);x.fillStyle=col;x.beginPath();x.moveTo(26,0);x.lineTo(-18,-4);x.lineTo(-26,-14);x.lineTo(-30,-14);x.lineTo(-24,-3);x.lineTo(-24,3);x.lineTo(-30,14);x.lineTo(-26,14);x.lineTo(-18,4);x.closePath();x.fill();x.fillRect(-6,-22,6,44);x.restore();}
function arcPath(X1,Y1,X2,Y2,h,p,col=GOLD){x.strokeStyle=col;x.lineWidth=3;x.setLineDash([10,8]);x.beginPath();for(let i=0;i<=40*p;i++){const q=i/40;const X=lerp(X1,X2,q),Y=lerp(Y1,Y2,q)-Math.sin(q*Math.PI)*h;i?x.lineTo(X,Y):x.moveTo(X,Y);}x.stroke();x.setLineDash([]);
  const q=p,X=lerp(X1,X2,q),Y=lerp(Y1,Y2,q)-Math.sin(q*Math.PI)*h,dX=(X2-X1),dY=(Y2-Y1)-Math.cos(q*Math.PI)*Math.PI*h;if(p>0&&p<1)plane(X,Y,Math.atan2(dY,dX),1.2);}
function phone3(t,t0,names,labels){names.forEach((n,i)=>{const q=eo(P(t,t0+i*.25,.4));if(q<=0)return;x.save();x.globalAlpha*=q;phoneFrame(n,t,t0,330+i*310,370+(1-q)*200,.88);x.restore();if(labels)chip(labels[i],330+i*310,650,t,t0+i*.25+.2,NAVY,'#fff',16);});}
function hammer(X,Y,rot){x.save();x.translate(X,Y);x.rotate(rot);x.fillStyle='#7a4a22';rr(-8,-10,16,150,6);x.fill();x.fillStyle='#2b2b2b';rr(-46,-34,92,34,6);x.fill();x.restore();}
function carIcon(X,Y,s,col=NAVY){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle=col;rr(-120,-30,240,60,18);x.fill();x.beginPath();x.moveTo(-70,-30);x.lineTo(-40,-70);x.lineTo(50,-70);x.lineTo(80,-30);x.fill();x.fillStyle='#fff';x.fillRect(-35,-62,38,28);x.fillRect(10,-62,36,28);x.fillStyle='#222';x.beginPath();x.arc(-70,32,24,0,7);x.arc(70,32,24,0,7);x.fill();x.restore();}
function building(X,Y,t,t0,s=1){const p=eo(P(t,t0,.8));if(p<=0)return;x.save();x.translate(X,Y);x.scale(s,s);const h=420*p;x.fillStyle='#f3b08a';x.fillRect(-150,-h,300,h);x.fillStyle='#f7c6a6';x.fillRect(-150,-h,40,h);
  for(let i=0;i<10;i++){const yy=-30-i*40;if(-yy>h)break;x.fillStyle='#e9967a';x.beginPath();x.moveTo(-130,yy);x.lineTo(150,yy-18);x.lineTo(150,yy-8);x.lineTo(-130,yy+10);x.closePath();x.fill();x.fillStyle='rgba(40,60,90,.55)';for(let j=0;j<5;j++)x.fillRect(-110+j*52,yy-30,34,18);}
  x.restore();}
function towerSketch(X,Y,t,t0,floors,col=NAVY){const p=eo(P(t,t0,1));const h=440,w=150,shown=Math.round(floors*p);x.strokeStyle=col;x.lineWidth=3;x.strokeRect(X-w/2,Y-h*p,w,h*p);
  for(let i=1;i<shown;i++){const yy=Y-i*h/floors;x.globalAlpha=.25;x.beginPath();x.moveTo(X-w/2,yy);x.lineTo(X+w/2,yy);x.stroke();x.globalAlpha=1;}
  for(let j=0;j<5;j++){x.fillStyle='rgba(31,47,85,.12)';x.fillRect(X-w/2+12+j*28,Y-h*p,10,h*p);}
  if(p>.98){x.beginPath();x.moveTo(X,Y-h);x.lineTo(X,Y-h-90*P(t,t0+1,.3));x.stroke();}}
function elev(t,t0,X1,X2,Y,flat=true){const p=eo(P(t,t0,1));x.strokeStyle=flat?'#2b8a5a':NAVY;x.lineWidth=5;x.beginPath();for(let i=0;i<=100*p;i++){const q=i/100,X=lerp(X1,X2,q);const Yv=Y-(flat?Math.sin(q*37)*3+Math.sin(q*9)*4:0);i?x.lineTo(X,Yv):x.moveTo(X,Yv);}x.stroke();}

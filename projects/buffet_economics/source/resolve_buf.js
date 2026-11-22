// Resolve scene start times + footage shot anchors; also exercise every scene fn with stub drawing to catch anchor misses.
const fs=require('fs'),vm=require('vm');const ctx={console,Math,String,Object,Array,JSON};vm.createContext(ctx);
const stub=`const W=1280,H=720,GOLD='#f5c766',NAVY='#1f2f55',RED='#e0283c',IN='Inter';const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));const P=(t,s,d)=>cl((t-s)/d);const eo=p=>p;const back=p=>p;const lerp=(a,b,p)=>a+(b-a)*p;const rnd=i=>.5;
const _n=new Proxy(function(){return _n},{get:()=>_n,apply:()=>_n});const x=_n;function txt(){}function dim(){}function stageW(){}function paperW(){}function clipCard(){}function navy(){}function hlSerif(){}function stickerW(){}function stamp(){}function popAt(t,t0,X,Y,f){f()}function chip(){}function tag2(){}function wcard(){}function person(){}function strike(){}function kick(){}function rr(){}function lowerThird(){}`;
vm.runInContext(stub+fs.readFileSync(process.argv[2]+'/wt_buf.js','utf8')+fs.readFileSync(process.argv[2]+'/buf2_scenes.js','utf8')+fs.readFileSync(process.argv[2]+'/buf2_list.js','utf8')+`
var OUT=SCN.map((s,i)=>{const a=s.at.length>1?A(s.at[0],s.at[1]):S0(s.at[0]);return {a,k:s.k,sh:(s.sh||[]).map(z=>[z[0],z[1],z[2]?(z[2].length>1?A(z[2][0],z[2][1]):S0(z[2][0])):null])};});
OUT.forEach((o,i)=>{o.b=i<OUT.length-1?OUT[i+1].a:END;});
OUT.forEach((o,i)=>{for(const tt of [o.a+.01,(o.a+o.b)/2,o.b-.05]){try{SCN[i].f(tt)}catch(e){console.log('ERR scene',i,e.message)}}});`,ctx);
fs.writeFileSync(process.argv[2]+'/../buf2/scenes_resolved.json',JSON.stringify(ctx.OUT));
let bad=0;ctx.OUT.forEach((o,i)=>{if(o.b-o.a<0.6){console.log('SHORT/NEG scene',i,o.a.toFixed(2),o.b.toFixed(2));bad++;}});console.log('scenes',ctx.OUT.length,'issues',bad);

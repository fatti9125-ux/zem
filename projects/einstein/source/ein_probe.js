const fs=require('fs');const src=fs.readFileSync('ein_list.js','utf8');const NVW=JSON.parse(fs.readFileSync('einw.js','utf8').replace('const NVW=','').replace(/;\s*$/,''));
const re=/at\(([\d.]+),'([^']+)'/g;let m,miss=[],n=0;const seen=new Set();
while((m=re.exec(src))){const k=m[0];if(seen.has(k))continue;seen.add(k);n++;const t0=+m[1];const hit=NVW.find(([t,w])=>t>=t0-.8&&t<=t0+6&&w.includes(m[2]));if(!hit){const near=NVW.filter(([t])=>t>=t0-1.5&&t<=t0+4).map(([t,w])=>t.toFixed(1)+':'+w).join(' ');miss.push(k+'  ||  '+near);}else if(Math.abs(hit[0]-t0)>2.5)miss.push('FAR '+k+' -> '+hit[0].toFixed(1));}
console.log(n,'anchors',miss.length,'issues');console.log(miss.join('\n'));

const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const [out, fps, a, b] = [process.argv[2], +process.argv[3], +process.argv[4], +process.argv[5]]; const only = process.argv[6] ? process.argv[6].split(',').map(Number) : null; fs.mkdirSync(out, { recursive: true });
  const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1080, height: 1920 } }); p.on('pageerror', e => { console.error('PAGEERROR', e); process.exit(1); });
  await p.goto(process.env.URL); await p.evaluate(() => window.ready());
  const list = only ? only : [...Array(b - a).keys()].map(i => a + i);
  for (const i of list) { const t = only ? i : i / fps; const f = path.join(out, only ? 't' + i + '.png' : String(i).padStart(5, '0') + '.png'); if (!only && fs.existsSync(f)) continue;
    const d = await p.evaluate(t => { render(t); return document.getElementById('c').toDataURL('image/png'); }, t); fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64')); }
  await br.close(); console.log('done', a, b); })();

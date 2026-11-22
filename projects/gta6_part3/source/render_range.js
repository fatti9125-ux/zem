// node render_range.js outdir fps startFrame endFrame  (writes NNNNN.png by global frame index)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const [out, fps, a, b] = [process.argv[2], +process.argv[3], +process.argv[4], +process.argv[5]]; fs.mkdirSync(out, { recursive: true });
  const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('pageerror', e => { console.error('PAGEERROR', e); process.exit(1); });
  await p.goto(process.env.URL); await p.evaluate(() => window.ready());
  for (let i = a; i < b; i++) { const f = path.join(out, String(i).padStart(5, '0') + '.png'); if (fs.existsSync(f)) continue;
    const d = await p.evaluate(t => { render(t); return document.getElementById('c').toDataURL('image/png'); }, i / fps); fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64')); }
  await br.close(); console.log('done', a, b); })();

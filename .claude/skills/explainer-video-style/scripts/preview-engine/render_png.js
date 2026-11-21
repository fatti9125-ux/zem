// Usage: node render.js <outdir> [fps] [seconds] [onlyTimesCSV]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const out = process.argv[2]; const fps = +(process.argv[3] || 30); const secs = +(process.argv[4] || 40);
  const only = process.argv[5] ? process.argv[5].split(',').map(Number) : null;
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('console', m => console.log('page:', m.text())); p.on('pageerror', e => { console.error('PAGEERROR', e); process.exit(1); });
  await p.goto(process.env.URL || ('file://' + path.join(__dirname, process.env.PAGE || 'index.html'))); await p.evaluate(() => window.ready());
  const times = only || [...Array(Math.round(fps * secs)).keys()].map(i => i / fps);
  for (let i = 0; i < times.length; i++) {
    const d = await p.evaluate(t => { render(t); return document.getElementById('c').toDataURL('image/png'); }, times[i]);
    fs.writeFileSync(path.join(out, (only ? 't' + times[i] : String(i).padStart(4, '0')) + '.png'), Buffer.from(d.split(',')[1], 'base64'));
  }
  await b.close(); console.log('done', times.length);
})();

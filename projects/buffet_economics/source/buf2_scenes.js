// BUFFET ECONOMICS — full video. Every on-screen element is keyed to the spoken word: A(sentence, 'word', nth).
// WT (from wt.js): WT[si] = [[normWord, time], ...]; SST[si] = sentence start.
const nrm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const _ac = {};
function A(si, w, n = 1) { const k = si + '|' + w + '|' + n; if (k in _ac) return _ac[k]; const q = nrm(w); let c = 0;
  for (const [ww, tt] of WT[si]) if (ww.startsWith(q) && ++c === n) return (_ac[k] = tt);
  console.log('ANCHOR MISS', si, w); return (_ac[k] = SST[si]); }
const S0 = si => SST[si];
const GREEN = '#2bd46b', CREAM = '#f4f1ea';
// text helpers (dark scenes)
function L(s, Y, t0, t, size = 64, st = 'w') { const o = st === 'g' ? { gold: 1, glow: 14 } : st === 'r' ? { c: RED, sh: 14 } : st === 's' ? { size: Math.round(size * .55), w: 600, ls: 6, c: '#fff', sh: 12 } : { c: '#fff', sh: 16 };
  txt(s, W / 2, Y, { size, w: 700, ls: 3, ...o, ...(st === 's' ? { a: P(t, t0, .2) } : { reveal: P(t, t0, .25) }) }); }
function Ls(s, Y, t0, t, size = 32) { txt(s, W / 2, Y, { size, w: 600, ls: 6, c: '#fff', sh: 12, a: P(t, t0, .2) }); }
function Lw(s, Y, t0, t, size = 40, c = NAVY, al = 'center', X = W / 2) { txt(s, X, Y, { size, w: 700, ls: 2, c, al, a: P(t, t0, .2) }); }
function cnt(v0, v1, t0, t, fmt, d = .9) { return fmt(lerp(v0, v1, eo(P(t, t0, d)))); }
function bigNum(s, Y, t0, t, size = 170) { if (t < t0) return; popAt(t, t0, W / 2, Y, () => txt(s, 0, 0, { size, gold: 1, glow: 20 })); }
function checks(items, X, Y0, gap, t, size = 40, col = NAVY) { items.forEach(([s, t0], i) => txt('✓  ' + s, X, Y0 + i * gap, { size, w: 700, al: 'left', c: col, a: P(t, t0, .2) })); }
function iconPeople(n, X0, Y0, cols, t, t0, hot = -1, sc = .32, colA = NAVY, colB = RED) { for (let i = 0; i < n; i++) { const q = back(P(t, t0 + i * .03, .2)); if (q <= 0) continue; x.save(); x.translate(X0 + (i % cols) * 70, Y0 + Math.floor(i / cols) * 120); x.scale(q * sc, q * sc); person(1, i === hot ? colB : colA); x.restore(); } }
function belt(t, t0, gapT, Y = 420) { x.fillStyle = '#3a3a3a'; x.fillRect(80, Y, 1120, 60); for (let i = 0; i < 16; i++) { const X = 80 + ((i * 80 + (t - t0) * 120) % 1120); const gone = gapT !== null && t > gapT && i % 8 < 5; if (gone) continue; x.fillStyle = '#fff'; x.beginPath(); x.ellipse(X + 30, Y + 10, 30, 10, 0, 0, 7); x.fill(); x.fillStyle = '#ff7a59'; x.fillRect(X + 18, Y - 2, 24, 10); } }
function tray(X, Y, w, label, col, t, t0) { const q = back(P(t, t0, .25)); if (q <= 0) return; x.save(); x.translate(X, Y); x.scale(q, q); x.fillStyle = '#d9d9d9'; rr(-w / 2, -40, w, 80, 8); x.fill(); x.fillStyle = col; rr(-w / 2 + 10, -30, w - 20, 60, 6); x.fill(); x.restore(); txt(label, X, Y + 70, { f: IN, w: 800, size: 15, ls: 2, c: NAVY, a: cl(q) }); }
function bar(X, Y, w, h, p, col) { x.fillStyle = '#e6e6e6'; rr(X, Y, w, h, 10); x.fill(); x.fillStyle = col; rr(X, Y, w * p, h, 10); x.fill(); }
function receipt(lines, X, Y, t) { x.save(); x.shadowColor = 'rgba(0,0,0,.25)'; x.shadowBlur = 18; x.fillStyle = '#fff'; x.fillRect(X - 200, Y - 40, 400, 70 + lines.length * 56); x.restore(); lines.forEach(([a, b, t0], i) => { const al = P(t, t0, .2); txt(a, X - 180, Y + 10 + i * 56, { f: IN, w: 700, size: 22, al: 'left', c: '#222', a: al }); txt(b, X + 180, Y + 10 + i * 56, { f: IN, w: 800, size: 22, al: 'right', c: '#222', a: al }); }); }
function quote(s, Y, t0, t, size = 40) { x.save(); x.globalAlpha *= P(t, t0, .25); txt('“' + s + '”', W / 2, Y, { f: '"DejaVu Serif"', w: 700, size, c: '#1d1d1d' }); x.restore(); }
function srcTag(s, t0, t, Y = 680) { txt(s, W / 2, Y, { f: IN, w: 600, size: 13, c: '#888', a: P(t, t0, .3) }); }
function dimTag(s, t0, t) { txt(s, W / 2, 680, { f: IN, w: 600, size: 13, c: 'rgba(255,255,255,.6)', a: P(t, t0, .3) }); }
const CARDSB={c_dish:89,c_potato:89,c_steak:89,c_sushi:89,c_kitchen:89,c_empty:89};

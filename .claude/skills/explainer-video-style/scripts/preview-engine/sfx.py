#!/usr/bin/env python3
"""Synthesize a sound-effects bed for a preview from an event list (no samples needed).
Usage: python3 -I sfx.py events.json out.wav
events.json: {"duration": 40, "pad": true,
              "events": [{"type": "whoosh", "t": 5.75}, {"type": "tick", "t": 1.2, "amp": 0.1},
                         {"type": "ticks", "t": 0.5, "until": 4.0, "every": 0.05}, ...]}
types: whoosh (transition, opt dur), tick (counter), ticks (run of ticks), pop (label/chip/icon),
       thud (stamp / number lock), click (typing), clink (coin), glitch (leak/hack), riser (build-up, opt dur)
Timing convention: put the event on the frame the graphic lands (whoosh is centred on the cut)."""
import json, math, random, sys, wave, array
cfg = json.load(open(sys.argv[1])); SR = 44100; D = float(cfg["duration"]); N = int(SR * D); buf = [0.0] * N; random.seed(7)
def add(t0, dur, fn, amp):
    i0 = int(t0 * SR)
    for i in range(int(dur * SR)):
        j = i0 + i
        if 0 <= j < N: buf[j] += amp * fn(i / SR, dur)
def whoosh(t, amp=.35, dur=.6):
    st = {'y': 0.0}
    def f(u, d):
        p = u / d; a = .02 + .25 * math.sin(math.pi * p); st['y'] += a * ((random.random() * 2 - 1) - st['y'])
        return st['y'] * math.sin(math.pi * p) ** 1.5 * 3
    add(t - dur * .5, dur, f, amp)
S = {
 'whoosh': lambda e: whoosh(e['t'], e.get('amp', .35), e.get('dur', .6)),
 'tick':   lambda e: add(e['t'], .025, lambda u, d: math.sin(2*math.pi*2400*u)*math.exp(-u*220), e.get('amp', .12)),
 'pop':    lambda e: add(e['t'], .09, lambda u, d: math.sin(2*math.pi*(500+9000*u)*u)*math.exp(-u*40), e.get('amp', .22)),
 'thud':   lambda e: (add(e['t'], .4, lambda u, d: math.sin(2*math.pi*(90-60*u)*u)*math.exp(-u*12), e.get('amp', .7)),
                      add(e['t'], .05, lambda u, d: (random.random()*2-1)*math.exp(-u*90), e.get('amp', .7)*.5)),
 'click':  lambda e: add(e['t'], .012, lambda u, d: (random.random()*2-1)*math.exp(-u*400), e.get('amp', .08)),
 'clink':  lambda e: add(e['t'], .08, lambda u, d: math.sin(2*math.pi*3200*u)*math.exp(-u*50), e.get('amp', .08)),
 'glitch': lambda e: add(e['t'], .04, lambda u, d: (random.random()*2-1)*math.exp(-u*60), e.get('amp', .15)),
 'riser':  lambda e: add(e['t'], e.get('dur', 1.0), lambda u, d: math.sin(2*math.pi*(120+300*u)*u)*math.exp(-u*3), e.get('amp', .18)),
}
for e in cfg["events"]:
    if e['type'] == 'ticks':
        k = e['t']
        while k < e['until']: S['tick']({'t': k, 'amp': e.get('amp', .1)}); k += e.get('every', .05)
    else: S[e['type']](e)
if cfg.get("pad", True):
    for i in range(N):
        t = i / SR; env = min(1, t / 1.5) * min(1, (D - t) / 1.5)
        buf[i] += env*.05*(math.sin(2*math.pi*55*t)+.6*math.sin(2*math.pi*82.4*t)+.3*math.sin(2*math.pi*110*t))*(.6+.4*math.sin(2*math.pi*.1*t))
m = max(abs(v) for v in buf) or 1; g = .89 / m if m > .89 else 1
w = wave.open(sys.argv[2], 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes(array.array('h', [int(v * g * 32767) for v in buf]).tobytes()); w.close(); print('wrote', sys.argv[2])

# Preview engine

Renders a style preview (MP4) from a single HTML/canvas scene file. The pipeline is deterministic: every frame is `render(t)` at exact time t, so timings are frame-accurate.

## Files
- `lib.js`: drawing kit. Easing (`eo`, `eoX`, `back`), `P(t,start,dur)` progress, `txt()` (gold, glow, reveal), `cam()` push-in, `bgA()` dark-gold background with dust, `vignette`, `progress`, `lowerThird`, `stamp`, `box` + chips, `tag`, `chapterTag`, `zLogo` ident, tower/map shapes. Footage: `loadImages`, `variant` (grade filters), `halftone`, `kb` (Ken Burns), `printCard` (photo print with curl), `tornRect`, `scene()` cross-fade wrapper, `popAt()`.
- `render.js`: Playwright frame exporter.
- `sfx.py`: synthesizes the SFX bed from an event list (whoosh / tick / pop / thud / click / clink / glitch / riser + low pad).
- `fonts/`: Oswald 600/700 (OFL). Inter and DejaVu come from the system.
- `examples/`:
  - `burj_khalifa_40s.html`: graphics only, looks A + B (standalone helpers).
  - `gta6_intro.html`: a 72 s narration-timed hook in look A.
  - `style_reel.html`: every look with real footage frames. It expects `../foot/*.jpg` stills extracted from clips.
  - `archive_styles.html`: the four archive styles C1–C4 built on public-domain archive photos and **moving film**. Run `fetch_archive_assets.sh` first to build `../arch/`.

**Archive video:** export clips as frame sequences (`ffmpeg -ss S -i URL -t D -vf fps=30,scale=960:-2 -q:v 4 seq/name/%03d.jpg`), then `await loadSeq(name, dir, nFrames)` in `ready()` and draw with `cover(seqFrame(name, t, t0), 0,0,W,H, scale, ax, ay, 'grayscale(1) contrast(1.35)')`. `cover()` keeps 4:3 film aspect inside 16:9. Other helpers: `glitch(t, t0)` slice glitch, `halftoneCrop()` aspect-correct halftone of a crop. Presenter cut-outs come from `../cutout.py`.

## Workflow
1. Write the shot list first (SKILL.md format). Each row becomes a scene function `sN(t)` with absolute times, wrapped in `scene(t, start, end, fn, push)`.
2. Pull footage stills, if you're using real clips:
   `ffmpeg -ss 9 -i clip.mp4 -frames:v 1 -vf scale=1280:720 foot/g1.jpg`
   Load them with `loadImages({g1:'foot/g1.jpg'})`. Make grades once in `ready()` using `variant(name,key,filter)` (filter values are in references/footage-treatment.md).
3. Serve over HTTP. This is required once images are read back (halftone), because file:// taints the canvas:
   `python3 -m http.server 8765 --bind 127.0.0.1 &`
4. Check key frames before the full render:
   `URL=http://127.0.0.1:8765/my.html node render.js keys 30 60 "3.5,9,14.2"`
   Then tile and look at them (`ffmpeg ... xstack`). Fix overlaps, crops and cut-off text.
5. Do the full render: `URL=http://127.0.0.1:8765/my.html node render.js frames 30 <seconds>`
6. Make the SFX: write `events.json` with an event on the frame each graphic lands, then `python3 -I sfx.py events.json sfx.wav`.
7. Encode:
   `ffmpeg -framerate 30 -i frames/%04d.jpg -i sfx.wav -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart out.mp4`
8. QC: run `../analyze_reference.sh out.mp4` and view the contact sheet.

With no voice-over yet, time beats at about 2.3 words/s (Urdu/Hindi) or about 2.6 words/s (English). Ship an .srt of the narration lines at those times so the voice can be recorded to match. Once real VO arrives, re-time each scene start to the VO word.

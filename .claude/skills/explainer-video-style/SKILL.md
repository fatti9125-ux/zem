---
name: explainer-video-style
description: Animation and editing style for faceless YouTube documentaries and explainers (gaming, money, history, science). Turn a script, topic or voice-over (English or Roman Urdu/Hindi) into a shot-by-shot edit plan AND a rendered preview MP4, with on-screen text, motion graphics, real-footage treatment, frame timings, colours, transitions and SFX, in one of three looks — dark-gold data explainer (budgets, sales, business, games), white-evidence documentary (history, mysteries, science, maps, documents, field footage), or collage (editorial paper, surreal B&W, retro mid-century). Use this skill whenever the user wants to plan, storyboard, animate, edit, preview, "video bana ke do", script visuals for, or critique a faceless/explainer/documentary video, asks for "the same style as my channel / the GTA video / the Noah's Ark video / these reference clips", wants motion-graphics specs for AE, Premiere, CapCut, Remotion or ffmpeg, or wants to analyze reference clips frame by frame — even if they don't say "style guide".
---

# Explainer video style

This skill captures a measured house style. It was reverse-engineered frame by frame from these sources:
- a 17.5-min GTA VI budget explainer (35 clips)
- a 15.8-min Noah's Ark documentary (32 clips)
- 4 short collage reels

Use it to turn narration into an edit the channel's editor can build directly. It also covers checking an existing edit against the style.

The core idea behind every look: **the viewer should always know what the narrator just said, because something on screen changed to show it.**
- One idea per beat.
- Each beat lands as its own animation, about 0.5–1.5 s after the previous one.
- The frame *accumulates* information instead of cutting away.

## 1. Choose the look

| Look | Use for | Signature |
|---|---|---|
| **A. Dark-gold data** | money, sales, business, tech, games, "how much did X cost" | near-black, metallic gold condensed caps, magenta/purple glow, numbers as heroes |
| **B. White-evidence documentary** | history, religion, mysteries, archaeology, science, geography, investigations | light-grey seamless stage with heavy vignette, cut-out objects with soft shadows, 3D relief maps, documents with yellow highlighter |
| **C. Collage** | shorts/reels, editorial explainers, biography snippets | paper or flat-colour background, B&W photo cut-outs, 1–2 accent colours, fast pops |

A long video can mix looks. Look B regularly switches to full-bleed photoreal footage, and look A uses gameplay as its bed. **Keep one look per video as the "home" graphic language** so it feels branded. Read the matching reference file before planning:
- `references/look-a-dark-gold-data.md`
- `references/look-b-white-evidence.md`
- `references/look-c-collage.md` (overview) and `references/look-c-archive-styles.md` (full C1–C4 spec with archive footage)
- `references/motion-library.md`: every animation move with frame timings. Read it whenever you specify motion.
- `references/footage-treatment.md`: how real clips are graded, moved, cut and placed inside graphics. Read it for any video that uses real footage (almost all of them).
- `references/footage-sourcing.md`: where and how to search for footage (Reddit, Commons, Internet Archive, Openverse, NASA/LOC, stock, YouTube CC) and the licence rules.

If the user hasn't said which look, infer it from the topic and say which you chose in one line.

**Sub-styles of look C.** Pick one per piece. Each is built on real archive photos and film, and the full frame-measured spec is in `references/look-c-archive-styles.md`:
- C1 editorial paper: off-white page, torn B&W archive photos, red numbers, yellow highlighter on italic serif words, torn bars, a live corner counter.
- C2 surreal B&W collage: grid paper, public-domain film (moving), circle cut-outs, red/yellow accents, radial bursts, echo trails, slice glitches.
- C3 retro mid-century: flat khaki/lime/brick fields, halftone archive portraits, pop-ups with overshoot, callout tags.
- C4 presenter + hero number: archive speech footage, then a B&W presenter cut-out with green digits layered behind the head.

## Footage first: search the internet for it

Before drawing anything, **search online platforms for real footage and photos for every beat**:
- Wikimedia Commons
- Internet Archive
- Openverse
- **Reddit** (r/HistoryPorn, r/OldSchoolCool, r/ArchivalFootage, r/TheWayWeWere, r/ColorizedHistory, r/PublicDomain, and the topic's own subs)
- NASA, Library of Congress / NARA
- free stock sites (Pexels, Pixabay, Mixkit)
- YouTube's Creative Commons filter

Use `scripts/find_footage.py`. Follow `references/footage-sourcing.md` for:
- query recipes per style
- cutting clips out of archive.org films without downloading them whole
- presenter cut-outs (`scripts/cutout.py`)
- licence rules

The essentials:
- A Reddit post is never a licence: trace it to the original archive.
- Use only PD / CC0 / CC-BY / free-stock material without flagging it. List anything else as "licence needed".
- Record every asset in `CREDITS.txt` and end with a sources card.

If a platform is blocked or needs a key (Reddit's API needs a token for `oauth.reddit.com`), say which one and carry on with the rest.

**Not covered yet:** a cartoon-character / flat-illustration look (portraits that turn into characters, courtrooms, maps with armies). The user described these clips but they never arrived. If asked for that look, say so and ask for the clips.

**Narration language.** Narration is often Urdu/Hindi (Roman script) but keeps **on-screen text in English caps**. Localise money where it helps (`$2,000,000,000 → 2 ARAB US DOLLARS → PKR 56,000 CRORE`). Pace Urdu/Hindi VO at about 2.3 words/s when timing without a recording.

## 2. Structure the video

Both long-form sources follow the same arc. Adapt the lengths, but keep the order:

1. **Cold-open hook (0:00–0:40).** Fast montage, the hero number or question, and a rolling counter or reveal. End on a question card ("COINCIDENCE OR SOMETHING ELSE?", "$2 BILLION — CONFIRMED?").
2. **No channel ident unless the user has one.** The reference videos had a channel logo sting. **Never put a channel name or logo the user did not give you**. If they supply a logo, a 1–2 s sting after the hook is fine. Otherwise cut straight from the hook into Part 1.
3. **Context.** Who, where and when: portraits with name labels, maps, a timeline.
4. **Explain blocks.** Each one is a 60–120 s "chapter". Each chapter:
   - opens on a top-centre headline question ("WHERE DOES THE MONEY GO?", "WHY ESTIMATES DIFFER")
   - builds a diagram, chart or document piece by piece
   - closes on a one-line takeaway
5. **Breather montages** between chapters (10–30 s). Footage cut to the beat, with a one-word label per shot (`BUILDINGS · CARS · TRAFFIC · JUNGLE`). These reset attention.
6. **Counterpoint / caveat chapter.** "UNCONFIRMED", "HYPOTHETICAL", "WHAT CRITICS SAY". Both sources flag uncertainty explicitly, and this builds trust.
7. **Recap montage.** Bullet labels accumulate as lower-thirds (`|YEARS OF WORK`, `|BILLION-DOLLAR ESTIMATES`, `|THE HOPES OF MILLIONS`).
8. **Closing questions → end card.** Hero symbol plus 2–3 open questions. Then an end card: "TO BE CONTINUED" / "THANKS FOR WATCHING", optionally a WATCH NEXT frame and LIKE/SHARE/COMMENT pills. Use the user's own logo only if they gave one.

## Per-line style choice (mix, never blocks)

For a footage-led video, decide the treatment **line by line** from what the sentence does, then alternate. Never run all footage scenes first and all white scenes after.

| Kind | Use when the line… | Example lines |
|---|---|---|
| **G** graphics over gameplay (dimmed footage + gold type/counters/diagrams) | gives a dramatic number, a time, a hook, tension, a reveal | "12 baje", "1 arab dollar", "13 saal kyun?", pressure gauge, "$500M a year" |
| **F** full-bleed footage + minimal type | announces a game/era/event, or is a breather or montage | "GTA V launch hui", "phir aaya GTA Online", "ab zara sochiye", "Rockstar khamosh nahi tha" |
| **W** white Vox stage + live clip cards | compares, lists, sequences or explains a mechanism | screens wall, PS3→PS4→PC→PS5 cards, then-vs-now with a dimension line, real money → GTA$, RDR2 → GTA VI |
| **P** editorial paper + torn prints, serif highlight, stickers | makes a claim, quotes a record, asks a pointed question, makes a human/emotional point | budget vs Hollywood, Guinness record, "galti ki gunjaish nahi", "10 saal ka tha → 23", "practice thi" |

Rules:
- At most **2 consecutive lines of the same kind**. A G→F pair counts as one footage stretch.
- **W/P every 15–30 s.** Each W/P scene still shows game footage: live clip cards or torn prints of frames.
- Keep G/F for the hook's first line and for the last line before an end card.
- Write the plan as a table (line, time, kind, visual) before building. Show it to the user when they ask for "mix".

## Sync with the voice-over (non-negotiable)

1. Tighten the VO first (`scripts/tighten_vo.py`). Then **transcribe the tightened audio itself** with word timestamps, in 40–50 s windows (Whisper can drop whole windows; re-run any gap on its own). Don't time against the untightened VO.
2. Every scene starts on the first word of its line (or ≤ 0.1 s before). Every number, stamp, card or highlight lands on the frame its key word is spoken.
3. Cuts in the footage EDL use the same line boundaries.
4. Before the full render, composite one frame near the end of every line (footage + overlay) and check that what is on screen matches what is being said.

## 3. Pacing rules (measured)

| Mode | Hard cuts per 30 s | Near-still frames | What moves |
|---|---|---|---|
| Look A explain chapter | 0–2 | 55–90% | one graphic element at a time, plus a slow push-in |
| Look A montage | 5–10 | 12–20% | footage, beat cuts every ~1 s |
| Look B (throughout) | 3–11 | 8–39% | constant Ken-Burns drift on every photo/footage plus graphic builds |
| Look C reel | wipes every 0.5–1.5 s | low | everything pops |

Practical consequences:
- **Never leave a fully static frame for more than ~1.5 s.** Add a 2–5% slow scale or drift, particles, or a progress line.
- **Hold a finished graphic about 1 s after its last element lands** before it changes or leaves, so it can be read.
- **Footage shots run 2–5 s in look B, and 1 s in montages.** In look A, gameplay under graphics can run 10–20 s because it's only texture.
- **Animate text with the narration.** A word or number appears on the frame where the narrator says it, or up to 3 frames before. It never lags behind.

## 4. Universal graphic rules

1. **Colour means something.** Pick 2–3 accents and keep them consistent:
   - gold/yellow = value or emphasis
   - red = warning, unconfirmed, deleted, danger
   - green = gain, success, "this location"
   - cyan/blue = tech or online
2. **Big claim + tiny caveat.** Every number or claim gets a small grey or red qualifier line (`UNCONFIRMED · ESTIMATE ONLY`, `NOT GTA VI'S REAL BUDGET`).
3. **Labels attach to things.** Use leader lines, lower-third bars (`|LABEL`), tags or dimension lines. Floating text only for headlines.
4. **Background footage is texture** behind graphics: darken it 40–60%, blur, or desaturate, and vignette it. Every still gets a Ken Burns move (1.00 → 1.06–1.08). Exact grades are in `references/footage-treatment.md`.
8. **Chapter tag (look A):** a gold "PART n" pill + a white caps title at the top-left for the whole chapter, under a 2–3 px progress line on the top edge.
5. **One typeface family.** Use a heavy condensed sans in all caps (Oswald / Bebas Neue / Anton / League Gothic). Add a serif italic only for collage highlights.
6. **Entrances ease out (4–8 frames); impact items overshoot.** Impact items are stamps, pops and the hero number. Exits are faster than entrances, or simply dissolve.
7. **Ask a question before showing the answer.** Every chapter title is a question.

## 5. Output format

When asked to plan or storyboard, produce a **shot list** in this format unless the user wants something else:

```
# <Video title> — <Look> — <runtime>
Palette: <hex list> · Type: <font> · fps: <24/30>

## Chapter N — "<HEADLINE QUESTION>" (mm:ss–mm:ss)
| # | Time | VO (what's said) | Visual / background | On-screen text | Motion (frames @fps) | Transition out |
|---|------|------------------|---------------------|----------------|----------------------|----------------|
| 1 | 0:00–0:03 | "In 1959…" | B&W portrait photo on dark wood table, slow push 3% | CAPTAIN İLHAN DURUPINAR (lower, white caps) | photo slides up 10f ease-out; name fades 6f at "Captain" | cross-dissolve 8f |
```

Then add:
- **Asset list:** what to source, generate or build (cut-outs, maps, 3D, stock), with a search or generation prompt for each.
- **Reusable templates:** the graphics that repeat (counter, chip stack, stamp, map highlight), so the editor builds each once.

When asked to *critique* an edit, compare it against sections 3–4 and the motion library. Give timestamped fixes.

When asked to *analyze reference clips*, run `scripts/analyze_reference.sh <video>...`. It writes contact sheets (1 frame per second), 30-fps frame strips on request, a cut list and a still/motion ratio. Then view the sheets and describe palette, type, layout, moves (with frame counts) and pacing, in the same vocabulary as this skill.

## 6. Rendering a preview video

When the user wants to *see* it ("preview", "sample", "bana ke do", "make the video"), render an MP4 with the bundled engine in `scripts/preview-engine/`. Don't stop at a shot list. Read its `README.md` and follow it:
1. Write the shot list.
2. Write one HTML scene file using `lib.js`. Start from the closest example: `examples/gta6_intro.html` for a narration-timed look-A hook, and `examples/style_reel.html` for footage plus every look.
3. Extract footage stills from any clips the user gave you.
4. Render 10–20 key frames, tile them, look at them, and fix overlaps and crops.
5. Render all frames, synthesize SFX with `sfx.py`, and encode.
6. QC with a 1 fps contact sheet.

If no TTS is available, deliver the video with SFX only, plus an `.srt` of the narration lines at the timings used, and offer to re-time it once the user sends their voice-over. The engine draws graphics in code. Real footage comes in as stills with Ken Burns moves, which matches look B's treatment.

### Footage-led edits (real gameplay / archive under graphics)

When the user wants real clips ("real gaming clips", "asli footage"), build two layers instead of drawing backgrounds:
1. **Footage track.** Download real clips (`references/footage-sourcing.md` lists the gaming sources: official trailers on archive.org, CC-BY longplays). Write an EDL that cuts on VO words and run `scripts/build_footage.py edl.json footage.mp4`. Use `crop` to hide HUD/minimap/watermarks, `rev` for rewind beats, `split` for then-vs-now, and `black` for a hard dip.
2. **Graphics layer.** One HTML scene file drawn on a *transparent* canvas: `x.clearRect` each frame, plus a per-scene `dim(a)` (0.2–0.35 on hero footage, 0.55–0.7 under charts). Render it with `preview-engine/render_png.js` (PNG with alpha). Composite with `ffmpeg overlay`.
3. **Sound.** Run `scripts/music_bed.py` (an original synthesized beat; drop it out for a beat or two on big moments like a rewind), add SFX events on every graphic, and duck the bed under the VO with `sidechaincompress`. The mix should land within about 1 LU of the VO alone.
4. **Mix both kinds of scene.** Keep most beats as graphics over gameplay, and every 15–30 s switch to a **white Vox-style beat** for explanation-heavy lines (records, comparisons, timelines, money flows, then-vs-now). These beats use an off-white stage or paper, **live game clips inside photo-print cards** (`clipCard`), navy labels, yellow dashed dimension lines, serif highlights and stickers. They're opaque in the overlay, so they cover the footage, and the overlay skips particles/vignette/chapter tag there. Building blocks: `preview-engine/examples/vox_scenes.js`. Card clips: 3 s sequences at 640×360 (`loadSeq`, looped).
5. **No dead air.** Run `scripts/tighten_vo.py` on the voice-over first: every pause over 0.3 s becomes 0.15 s. If the edit was already timed to the original VO, remap it with the `T()` recipe in that file's docstring.
6. Check the tiled composite frames (footage + overlay) before the full render. Check that no logo, ESRB card, "Rockstar Games presents" title or end-slate from a trailer shows inside a cut: tile the **first frame of every cut** (`ffmpeg -i seg/NNN.mp4 -frames:v 1`). Trailer openings fade, so start at least 0.5–1 s after a title card.

## 7. Building it in tools

Give tool-specific notes only for the tool the user uses.
- **After Effects / Premiere:** easing values are in `references/motion-library.md`.
- **CapCut:** use the "Ease out" curve, keyframe opacity and scale, and keep the text style preset as "condensed caps + glow".
- **Remotion:** use `spring({damping: 14, stiffness: 180})` for pops and `interpolate` with `Easing.out(Easing.cubic)` for slides.
- **Blender** for look-A 3D: gold metallic material, an emission strip light, a low-poly scene, and a camera dolly of 5–10% over the shot.
- **ffmpeg** only for assembly or rough cuts, not for motion design.

## 8. Before handing over, check

- [ ] Every VO sentence that contains a fact has a visual change on screen.
- [ ] No still frame lasts more than 1.5 s.
- [ ] Each number has a caveat or source line.
- [ ] Colours follow the meaning rules throughout.
- [ ] Each chapter opens with a question headline and closes with a takeaway.
- [ ] Breather montages and an end card are present. No channel name or logo the user did not provide.
- [ ] Styles alternate per line (see "Per-line style choice"); no long block of one kind.
- [ ] Every visual change lands on its VO word (checked against word timestamps of the FINAL audio).

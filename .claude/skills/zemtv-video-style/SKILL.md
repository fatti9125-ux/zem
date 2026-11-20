---
name: zemtv-video-style
description: House animation and editing style for ZemTV-type YouTube documentaries and explainers. Turn a script, topic or voice-over into a shot-by-shot edit plan with on-screen text, motion graphics, timings in frames, colours and transitions, in one of three looks — dark-gold data explainer (budgets, sales, business), white-evidence documentary (history, mysteries, science, maps, documents), or paper/cut-out collage (short social pieces). Use this skill whenever the user wants to plan, storyboard, animate, edit, script visuals for, or critique a faceless/explainer/documentary video, asks for "the same style as my channel / ZemTV / the GTA video / the Noah's Ark video", wants motion-graphics specs for After Effects, Premiere, CapCut, Remotion, Blender or ffmpeg, or wants to analyze reference clips frame by frame — even if they don't say "style guide".
---

# ZemTV video style

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
- `references/look-c-collage.md`
- `references/motion-library.md`: every animation move with frame timings. Read it whenever you specify motion.

If the user hasn't said which look, infer it from the topic and say which you chose in one line.

## 2. Structure the video

Both long-form sources follow the same arc. Adapt the lengths, but keep the order:

1. **Cold-open hook (0:00–0:40).** Fast montage, the hero number or question, and a rolling counter or reveal. End on a question card ("COINCIDENCE OR SOMETHING ELSE?", "$2 BILLION — CONFIRMED?").
2. **Channel ident (~0:40–1:15).** Green rounded-square "Z" on a dark radial glow, 2–3 s, then optionally "WELCOME TO ZEMTV".
3. **Context.** Who, where and when: portraits with name labels, maps, a timeline.
4. **Explain blocks.** Each one is a 60–120 s "chapter". Each chapter:
   - opens on a top-centre headline question ("WHERE DOES THE MONEY GO?", "WHY ESTIMATES DIFFER")
   - builds a diagram, chart or document piece by piece
   - closes on a one-line takeaway
5. **Breather montages** between chapters (10–30 s). Footage cut to the beat, with a one-word label per shot (`BUILDINGS · CARS · TRAFFIC · JUNGLE`). These reset attention.
6. **Counterpoint / caveat chapter.** "UNCONFIRMED", "HYPOTHETICAL", "WHAT CRITICS SAY". Both sources flag uncertainty explicitly, and this builds trust.
7. **Recap montage.** Bullet labels accumulate as lower-thirds (`|YEARS OF WORK`, `|BILLION-DOLLAR ESTIMATES`, `|THE HOPES OF MILLIONS`).
8. **Closing questions → end card.** Hero symbol plus 2–3 open questions. Then "THANKS FOR WATCHING", a WATCH NEXT frame, LIKE/SHARE/COMMENT pills popping in one at a time, and the green Z with SUBSCRIBE (~10 s).

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
4. **Background footage is texture** behind graphics: darken it 40–60%, blur, or desaturate, and vignette it.
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

## 6. Building it in tools

Give tool-specific notes only for the tool the user uses.
- **After Effects / Premiere:** easing values are in `references/motion-library.md`.
- **CapCut:** use the "Ease out" curve, keyframe opacity and scale, and keep the text style preset as "condensed caps + glow".
- **Remotion:** use `spring({damping: 14, stiffness: 180})` for pops and `interpolate` with `Easing.out(Easing.cubic)` for slides.
- **Blender** for look-A 3D: gold metallic material, an emission strip light, a low-poly scene, and a camera dolly of 5–10% over the shot.
- **ffmpeg** only for assembly or rough cuts, not for motion design.

## 7. Before handing over, check

- [ ] Every VO sentence that contains a fact has a visual change on screen.
- [ ] No still frame lasts more than 1.5 s.
- [ ] Each number has a caveat or source line.
- [ ] Colours follow the meaning rules throughout.
- [ ] Each chapter opens with a question headline and closes with a takeaway.
- [ ] The ident, the breather montages and the end card are present.

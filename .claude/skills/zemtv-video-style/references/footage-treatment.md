# Footage treatment (real clips under graphics)

Every reference video is mostly **real footage with graphics on top**. Animated stage scenes are the exception. How the footage is graded, framed and moved is half the style. Values below were measured from the clips. The CSS/canvas filter strings work as-is in the bundled preview engine, and the same numbers map to Lumetri, CapCut or ffmpeg.

## 1. Grades by role

| Role | Treatment | Canvas filter |
|---|---|---|
| **Bed under graphics** (look A) | darken 50–60%, blur 2–4 px, desaturate 20%, vignette 0.6 | `brightness(.42) blur(3px) saturate(.8)` |
| **Hero gameplay / montage** (look A) | punchy: contrast +8%, saturation +15%, slightly dark | `contrast(1.08) saturate(1.15) brightness(.92)` |
| **Documentary aerial / people** (look B) | natural, a little warm, slightly muted | `contrast(1.06) saturate(.92) sepia(.12)` |
| **AI historical recreation** (look B) | desaturated warm-teal "epic" grade, haze | `contrast(1.1) saturate(.75) sepia(.2)` |
| **Collage cut-out** (C2) | B&W, hard contrast | `grayscale(1) contrast(1.45)` |
| **Retro print** (C3) | halftone dots on cream paper (cell 6–8 px) | engine `halftone(name, 7)` |
| **Presenter** (C, MrBeast-type) | B&W subject, colour only on the hero object | `grayscale(1) contrast(1.2)` |

Add a vignette to every footage shot: 0.45–0.6 in look A, 0.5 in look B.

## 2. Movement
- **Ken Burns on every still or slow shot:** scale 1.00 → 1.06–1.08 over the shot (2–5 s), linear. Anchor toward the subject (e.g. `ax=.62` when the person is right of centre). Never let a still sit unmoving.
- **Drone footage** keeps its own motion. Add only 2–3% extra push.
- **Look-A beds under graphics** run 10–20 s with a slow 1.10 → 1.20 push. Anchor so that any baked-in text or UI in the gameplay is cropped out.

## 3. Cutting
- **Look A montage:** hard cut every 1.0–1.2 s, on the beat. Each shot gets one word in the bottom-left: a 4 px gold bar + 40 px white condensed caps with a soft shadow (`|BEACHES`, `|CARS`, `|STREETS`). Add a 2-frame white flash at 25% on each cut. A gold headline arrives on the final shot ("A WORLD THAT FEELS ALIVE").
- **Look B:** cross-dissolve 6–10 f between footage shots. Shots run 2–5 s. Alternate wide aerial → person → detail close-up (hands holding a sample) → aerial.
- **Act changes:** confetti-shard burst (A) or fade through the white stage (B).

## 4. Footage inside graphics
- **Print card** (B): the frame becomes a photo print on the grey stage or wood desk.
  - It slides in from the edge in 14 f, with rotation settling from 3° to 0.8°, a drop shadow, a curled corner, and a slow drift of ±4 px.
  - Draw over it: yellow outline trace (30–45 f), shape words, a dashed dimension line, then the value.
- **Evidence collage** (B): 4–6 frames as white-bordered prints that slide in from the sides with ±4–7° rotation, around a red title on torn pink paper ("PRIMARY PROOFS").
- **Sample dishes** (B): circular crops of detail shots (rock, soil, grass) with a white rim and soft shadow, labelled above. A mini bar table builds under them, with a red handwritten-style "+38%".
- **Circle cut-outs** (C2): a B&W face or detail cropped into circles. One is repeated 8–10× in a sliding echo trail.
- **Halftone portrait** (C3): the subject pops up from the bottom edge with overshoot, inside a clipped rectangle.
- **Thumbnail wall** (A): dozens of darkened frames tiled behind a counter (views, copies).
- **Vertical split panels** (B): 2–3 stacked footage panels on a blurred copy of the same footage.

## 5. Text on footage
- **Names:** huge white condensed caps (40–60% of the frame width), on two lines, placed in the empty side of the frame with a soft shadow ("THE / EXPERT").
- **Questions:** bottom-centre white caps with a shadow, about 34 px ("COINCIDENCE OR SOMETHING ELSE?").
- **Location:** lower-third with a yellow bar ("|EASTERN TURKEY · AERIAL").
- **Chapter tag (look A):** top-left gold "PART 1" pill + white caps title ("PART 1 · THE BUDGET"), visible for the whole chapter, under the top progress line.

## 6. Sourcing
- **Look A:** gameplay captures (cinematic camera, no HUD), trailer shots, stock of crowds, offices, stock tickers and servers.
- **Look B:** drone stock, archival photos, expert interviews, and AI-generated recreations for scenes nobody filmed. Label recreations ("RECREATION", "ILLUSTRATIVE") when they could be mistaken for real evidence.
- Use your own captures, licensed stock or AI generations. For third-party footage, keep within fair-use commentary norms (short, transformed, with commentary over it).

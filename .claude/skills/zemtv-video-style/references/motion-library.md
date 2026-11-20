# Motion library

All timings were measured frame by frame in the reference clips. They're written in frames at 30 fps; multiply by 0.8 for 24 fps.

Easing names:
- **ease-out** = cubic-bezier(0.2, 0.8, 0.2, 1), AE speed graph ≈ 0% in / 75% out
- **overshoot** = back-out with about 8–12% overshoot (Remotion `spring({damping: 12–14, stiffness: 180})`)

## Entrances
| Move | Frames | Curve | Notes |
|---|---|---|---|
| Text fade + 8 px rise | 6–8 | ease-out | default for labels and lower-thirds |
| Word swap (cross-dissolve) | 4 | linear | follow with a slow push (below) |
| Typewriter/clip reveal (left → right mask) | 8–15 per line | linear | headlines in look A, document fields |
| Pop / scale-in from 0–10% | 6–8 | overshoot | icons, circles, stamps, collage labels |
| Subject rise from below frame | 8 | overshoot | collage subjects, presenters |
| Photo/print card slide from edge | 12–16 | ease-out | add 2–4° rotation that settles to 0–1°, then drift |
| Bar grow | 6–10 per bar | ease-out | value label fades in 1–4 f after the bar lands |
| Ring / pill fill | 45–60 | ease-out | percentage text counts in sync |
| Leader line, then tag | 6 line + 6 tag | ease-out | tag slides out of the line end |
| Chip / tag stack | 6 each, 15–30 apart | ease-out | one per narration beat |
| Stamp slam (TOP SECRET, CLOSED, UNCONFIRMED) | 4–6 | scale 130% → 100% overshoot, rotate −8° to −12° | 2–3 f of camera shake, optional thud |
| Grid fill (icons/copies) | 1–2 per row | linear | left → right, top → bottom |

## Drawing
| Move | Frames | Notes |
|---|---|---|
| Strike-through | 12 (≈0.4 s) after a 12 f hold | red, 3–4 px, left → right |
| Outline trace around a shape | 30–45 | yellow 3–4 px, with a leading glow dot |
| Dashed dimension line | 15–20 | value label pops at the end |
| Line chart draw | 45–90 | leading dot, milestones pop as the line passes |
| Map border trace | 30–45 | yellow; the country fill rises at the same time |
| Highlighter sweep | 8–12 per line | yellow at 60–70% opacity, multiply blend |
| Network/constellation lines | 10–20 each, staggered | particles travel along them afterwards |

## Numbers
| Move | Duration | Notes |
|---|---|---|
| Rolling counter | 60–120 f | update every frame, ease-out (fast start, slow lock). Lock with a 4 f scale bump of 103%, then the caption fades in |
| Stepped counter (30M → 50M → 65M…) | 1 step per 20–30 f | each step is a hard swap with a small scale bump |
| Live corner counter | whole video | ticks continuously, top-right, small |
| Unit conversion stack | 15–25 f between lines | each line rises in under the hero number |

## Camera / continuous motion (what keeps holds alive)
| Move | Amount | Notes |
|---|---|---|
| Slow push-in on a held graphic | 3–15% over the hold | linear or very soft ease |
| Ken-Burns on photos/footage | 3–8% scale + small pan over 2–5 s | every still image in look B |
| 3D dolly/arc on charts | 5–10% move + 5–15° arc | estimate bars, product fields |
| Particle drift | constant | gold dust (A), confetti shards on act changes (A) |
| Progress line | grows over the chapter | top edge, 2 px |

## Transitions
| Move | Frames | Use |
|---|---|---|
| Cross-dissolve | 6–10 | default between footage shots |
| Hard cut on the beat | 0 | montages, every ~1 s, with a one-word label |
| Solid-colour wipe | 1–3 | collage looks |
| Torn-paper wipe | 8–12 | C1 editorial |
| Slice/glitch | 1–4 | C2 surreal; "leak" or "hack" beats in look A |
| Push through an object (eye, coin grows to fill) | 10–20 | act changes |
| Curtain close/open | 15 + 15 | "the real answer is…" reveals |
| Confetti-shard explosion | 20–30 | new act in look A |
| Fade to black + ident | 10 in, hold 60–75, 10 out | channel ident |

## Exits
Exits are quicker than entrances: 4–6 f fade, or cut with the next shot. Elements often stay until the whole composition dissolves together.

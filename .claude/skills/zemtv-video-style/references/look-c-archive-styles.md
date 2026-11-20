# Look C: four archive collage styles (full spec)

These are measured frame by frame from the 4 reference reels (C1 debt explainer 30 fps, C2 Hitchcock collage 24 fps, C3 Fleming reel 30 fps, C4 presenter reel 15 fps). Each style is built on **real archive photos and film**: find them with `references/footage-sourcing.md` and `scripts/find_footage.py`. A working example of all four, using public-domain archive material (1929 crash photos, *Nosferatu* 1922, Fleming's lab, JFK at Rice 1962), is `scripts/preview-engine/examples/archive_styles.html`.

---

## C1. Editorial paper (economics, politics, "before this video ends…")
**Archive:** B&W documentary photos (FSA/LOC, newspaper photos, crowds, buildings), engravings of landmarks, period newspaper front pages.
**Treatment:** cut each photo out with a **torn-paper edge**, B&W `grayscale(1) contrast(1.35)`, a soft paper shadow, a slight rotation (±2–3°), and a slow Ken Burns move inside the tear. Put a tiny credit line under the photo (photographer, year, archive).

**Page:** off-white #efebe3 with paper grain and a warm vignette. One page carries the whole video; it only inverts to black for dramatic beats.

**Measured moves:**
- **Live counter** (top-right, a white torn label): ticks every frame (≈$2,570 per frame in the reference). It stays on for the whole video and keeps ticking on the black page.
- **Verb reveal:** the italic serif word fades in over about 5 f. A yellow #ffe14d highlighter then sweeps behind it left to right over about 6 f. In the same frame the big number turns **red** (#d7261e).
- **Sticker:** a red torn label ("OVER $2 MILLION", "THE PEAK") pops in **2 f** (scale 1.25 → 1, rotation −8°). There's no slow ease: it's a slap.
- **Kinetic line:** words of the headline appear one at a time (about 4 f each, a little faded), and the key word gets a highlighter sweep of about 6 f.
- **Chart:** the axis draws first, then the line draws with a leading dot. Year tags pop as the line passes.
- **Stamp → tag:** a big black box ("BY 2048") gets a red "PROJECTED" stamp (it lands with a 2-frame ghost and blur), then **shrinks into a mini tag at the top-left** in about 6 f while torn black redaction bars slide in from the right, 2 f apart.
- **Ranked torn bars:** black bars, with the subject bar in red plus a sticker. Each bar label is small tracked caps with an icon.
- **Invert:** the paper page wipes up in about 3 f, revealing black. A B&W object cut-out (hourglass) fades in over 4 f. Italic serif words type in about 0.15 s apart. Strike through the old word in red, then reveal the new one big ("~~Prosperity~~ → THE GREAT DEPRESSION").
- **People grid:** grey person icons, with every Nth one turning red in a stagger of 0.04 s ("1 in 4").

**Type:** headlines in black condensed caps (Oswald 700). Emotion words in italic serif (DejaVu Serif Italic / Playfair Italic) with a yellow highlight. Kickers in tiny tracked caps (Inter 700, 12–14 px, tracking 5–6).

## C2. Surreal B&W collage (cinema, psychology, horror, crime)
**Archive:** public-domain films (*Nosferatu* 1922, *Metropolis* 1927, *Caligari* 1920, early newsreels). Use **moving film frames**, not only stills. Close-ups of faces, eyes, hands, and buildings.
**Treatment:** everything goes B&W (`grayscale(1) contrast(1.35)`, which also removes the tinting of silent films). The only colour allowed is **red #d9261c + yellow #f5c400**.

**Stage:** light grid paper #ecebe8 with 32 px grid lines at 9% black.

**Measured moves (24 fps reference):**
- **Burst open:** 16–18 dark radial sticks shoot out over about 12 f. Circle cut-outs of faces and details float and bob. Discs sliced half red / half yellow rotate. The title sits in a black block with a yellow year tag.
- **Push through an eye or face:** a small cut-out scales up to full frame in about 5 f, then 1 black frame, then the next composition pops in on a single frame.
- **Building on a red sun:** a torn-edge B&W cut-out of a street or house in front of a red disc, with a micro bob of ±6 px.
- **Slice glitch:** horizontal bands of random height shift sideways (±80 px) for 8–12 f, then slit-scan into a radial spiral zoom.
- **Echo trail:** slices of the same subject from successive frames (0.1 s apart) are laid side by side, one new copy per frame, fading as they go back. Do it with the real film motion. A red circle mask over the face can flash for 3 f.
- **Tunnel brackets:** white corner-bracket rectangles draw in and expand outward from the subject over about 10 f, looping 3–4 times over a full-frame film shot.
- **Spiral end:** rotating radial stripes, expanding rings, and the subject inside a circle.
- Labels are minimal: a red 5 px bar + white condensed caps name ("COUNT ORLOK").

**Pacing:** a new composition every 1–1.5 s, all motion. Cuts happen on glitch frames.

## C3. Retro mid-century (science, inventions, biographies)
**Archive:** portraits and lab or workshop photos of the person (government/press photos, often PD), period street and skyline photos, posters, adverts.
**Treatment:** **halftone** dots (cell 6–8 px) in dark ink on the field colour. Build it from an aspect-correct crop around the subject (`halftoneCrop`), so the person fills the halftone box. Darken bright clothing first (`brightness(.82)`) so faces don't wash out. Plain B&W prints with a white border are used for "evidence".

**Field colours:** khaki #d8cf98, lime #d8dc6a (1-frame flash wipe), brick #a51c12, teal circle #6fae98, sun yellow #f2d23a, orange #e07a1f.

**Measured moves:**
- **Colour-flash wipe** (1 f), then about 5 f of empty field, then the subject **pops up from below with overshoot** (about 8 f) inside a clipped rectangle, while the label scales up from about 10%.
- **Year typing:** "1928" types in big black grotesk at the top-right.
- **Word stack:** `Scientist` (black, smaller) / `Alexander` (red) / `Fleming` (orange) slide in from the left, about 4–5 f apart.
- **Red panel wipe:** about 560 px slides in from the left over 9 f. Inside it: "He noticed" (small cream) → "something" (yellow) → "Strange" (white, huge), each about 0.3 s apart.
- **Object close-up with a slow 3D tilt** (the petri dish breathes in scale on Y). Callout tags draw their **leader line first** (about 6 f), then a yellow tag box stretches out horizontally from the end (about 6 f).
- **Sun + print:** a yellow sun pops, a real archive print slides up with rotation settling from 7° to −2°, and the closing three-word stack ("Changed / Medicine / Forever") lands.

**Type:** heavy grotesk (Inter 900 / Neue Haas Black) in sentence case. Mixed sizes in one stack.

## C4. Presenter + hero number (records, costs, money)
**Archive:** a speech, interview or press-conference film of the person (JFK at Rice 1962, astronauts, CEOs), plus one **colour hero object** photo (rocket launch, banknote, gold bar, product).
**Treatment:** a short opening shot of the real speech footage (B&W, Ken Burns, a date lower-third). Then the presenter as a **cut-out** (`scripts/cutout.py`), B&W `grayscale(1) contrast(1.2)`, standing on a desaturated concrete wall. **Colour is reserved for the hero object and the green number.**

**Measured moves (15 fps reference, converted):**
- The presenter **rises from the bottom edge** (about 8 f, overshoot) while a **black circle grows behind him** from the bottom-centre (about 0.6 s).
- The hero object (photo card, shadow) **slides in from the left in about 10 f** and drifts with parallax. It sits *behind* the presenter.
- A small UI pill fades in, then toggles (knob slides, grey fills to cyan) about 0.5 s later. It carries a quote or a date.
- The background **darkens to near-black in about 6 f**. The object and pill fade.
- **Green digits fly in from scattered depths** (big, rotated, dim) and settle into the number over about 0.8 s with stagger. The colour goes from dark green to #3ddc84 with a glow. They sit **between the background and the presenter's head**, so the head hides part of the number. That depth layering is the whole trick.
- A tiny caption plus a source line sits under the number. Hold it for 2–3 s.

**Number honesty:** state what the figure is and where it's from ("as reported to Congress, 1973, then-year dollars"). Localise if the audience needs it (crore / arab).

# GTA 6 — Vice City vs Real Miami (Part 3, A + B): editing project

Everything needed to re-open, re-edit or prove the edit of both videos.

## What's in `exports/A` and `exports/B` (download these)

| File | What it is |
|---|---|
| `FINAL_VIDEO.mp4` | The finished video (upload this) |
| `EDITING_BREAKDOWN.mp4` | Proof of editing: 4 panels play in sync — (1) footage layer, (2) graphics layer on a checkerboard (made from scratch), (3) final, (4) voice-over waveform with the live cut number, source, in-point, clip length and scene style |
| `1_footage_layer.mp4` | Bottom video track: trailer excerpts (each ≤3.3 s, graded, cropped, sometimes split-screen) + Mixkit stock |
| `2_graphics_layer_ALPHA_prores4444.mov` | Top video track with transparency: Premiere, DaVinci Resolve, Final Cut |
| `2_graphics_layer_ALPHA.webm` | Same graphics layer, small file (VP9 + alpha): CapCut / browser / Resolve |
| `3_voiceover_tight.wav` | Your voice-over with the silent gaps removed |
| `4_music_bed.wav`, `5_sfx.wav` | Music bed and sound effects (synthesised, no copyrighted music) |
| `6_final_mix.wav` | The mixed audio (VO + ducked music + SFX, about −17 LUFS) |
| `timeline_premiere_resolve.xml` | Editor timeline: V1 footage, V2 graphics, A1 VO, A2 music, A3 SFX |
| `cut_list.csv` | Every cut: timeline in/out, length, source name, source in-point, treatment |
| `scene_list.csv` | Every scene with its style (graphics over footage, full footage, white stage, editorial paper) |

## Open the project in an editor

- **Premiere Pro:** File > Import > `timeline_premiere_resolve.xml`. If it asks, point "Locate" at the same folder.
- **DaVinci Resolve:** File > Import > Timeline > `timeline_premiere_resolve.xml`, then relink to this folder.
- **CapCut / any editor:** put `1_footage_layer.mp4` on track 1, `2_graphics_layer_ALPHA.webm` (or the `.mov`) on track 2 above it, then the three WAVs on audio tracks, all starting at 00:00.

## Show YouTube your editing process (reused-content or copyright review)

1. Upload `EDITING_BREAKDOWN.mp4` as **unlisted** and link it in your appeal. It shows that every graphic is original and that each game clip is a short excerpt under your own narration.
2. Attach or quote `cut_list.csv`. It lists every excerpt with its length: no excerpt is longer than 3.3 s.
3. Paste `CREDITS.txt` into the video description: trailer source, Mixkit stock licence, and the CC BY / BY-SA photo credits.
4. Screen-record yourself opening the timeline in your editor: the layers are separate and editable.

## `source/` (re-render from scratch)

The scene code (`p3_list.js`, `p3b_list.js`, `p3_scenes.js`), the EDL generators (`edl3.py`, `edl3b.py`), the EDLs, the SFX events, the beat scripts, the CC photos and the transcript (`p3_all.json`). Render with the `explainer-video-style` skill in `.claude/skills/`. `export_project.py` rebuilds these packages.

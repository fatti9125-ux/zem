# Footage sourcing: search the internet for real archive footage

**Standing instruction.** For every video, search online platforms for real footage and photos before falling back to drawn graphics or AI images. Search **Reddit and the other platforms below** for each beat of the shot list. Then trace every find to its original archive copy and licence, and record it in `CREDITS.txt`. Real archive material is what makes these styles feel like documentaries.

## 1. Where to search (in this order)

| Platform | Good for | Licence reality | How |
|---|---|---|---|
| **Wikimedia Commons** | archive photos, PD films (webm/ogv), newsreels, NASA/LOC/NARA mirrors | per-file licence in metadata (PD / CC) | `find_footage.py --sources commons` |
| **Internet Archive** (archive.org) | full PD films (Nosferatu, Metropolis), Prelinger industrial films, newsreels, speeches, TV news | item `licenseurl`; many PD-mark, some "no known licence": check the item page | `--sources archive`, then `archive.org/metadata/<id>` for the file list |
| **Openverse** | CC/PD photos aggregated from Flickr Commons, museums, Smithsonian, Met | licence per result (`license_type=commercial` filter) | `--sources openverse` |
| **Reddit** | *discovery*: r/HistoryPorn, r/OldSchoolCool, r/ArchivalFootage, r/TheWayWeWere, r/ColorizedHistory, r/PublicDomain, r/Damnthatsinteresting, r/interestingasfuck, plus topic subs (r/GTA6, r/gaming, r/space, r/MovieDetails…) | **a Reddit post is never a licence**: the comments and titles usually name the source (LOC, NARA, AP, museum); find that archive copy | `--sources reddit` (needs a Reddit API token on `oauth.reddit.com`; the public JSON returns 403 from cloud servers) |
| **NASA Image & Video Library** | space, launches, astronauts (public domain) | PD (logos excluded) | images.nasa.gov |
| **Library of Congress / NARA** | US history photos and films | mostly PD; check the "rights" field | loc.gov, catalog.archives.gov |
| **YouTube** | discovery of newsreels and official trailers; Creative Commons filter | default licence = all rights reserved; use only CC-BY uploads or the uploader's original archive | search filters: Creative Commons |
| **British Pathé / AP Archive / Getty** | best newsreels | licensed (paid) | note as "licence needed" in the asset list |
| **Pexels / Pixabay / Mixkit / Coverr** | modern stock b-roll (cities, labs, crowds, phones) | free-to-use stock licences | when modern texture is needed. **Mixkit works from cloud servers without a key**: list a tag page `https://mixkit.co/free-stock-video/<tag>/` (e.g. `miami`, `beach`, `alligator`, `neon`), take the `/free-stock-video/<slug>-<id>/` ids, then download `https://assets.mixkit.co/videos/<id>/<id>-720.mp4` (or `-1080`). Pexels/Pixabay pages return 403 there. |
| **Game footage** (look A) | gameplay you capture; **official trailers mirrored on archive.org** (search "Grand Theft Auto VI Trailer", "Launch Trailer", "Red Dead Redemption 2 Official Trailer"; the item id often embeds the YouTube id of the official upload); **CC-BY longplays** on archive.org (e.g. "Grand Theft Auto V PlayStation 5 PAL Gameplay", CC BY 4.0) | trailers are publisher content: commentary / fair-use norms, keep each cut short (1–5 s), transformed, under narration; credit CC-BY longplays | record your own where possible; avoid cutting into ESRB cards, logos and end slates |

**Host notes (cloud sessions).** Wikimedia (commons + upload) answers 429 "robot policy" to generic clients from cloud IPs; don't fight it, switch to Openverse. The Openverse API (`api.openverse.org/v1/images/?q=…&license=by,by-sa,cc0,pdm`) returns Flickr CC photos whose `live.staticflickr.com` files download fine. Skip ND/NC licences for a monetised channel. Record title, author, licence and page URL in `CREDITS.txt` and put them in the video description.

**Real-place comparison videos** ("game vs real life"): for every place the script names, get one real asset (CC photo of the landmark, stock clip of the city or nature) plus the matching game shot. Build the beat as a white-stage VS (game card left, real card right, "GTA VI" / "REAL LIFE" tags, a REAL stamp on the reveal word). When no free photo of a building exists, draw a labelled illustration ("illustration") rather than borrowing a copyrighted photo.

## 2. Query recipes by style

- **C1 editorial paper (economics, politics):** `"<event> <year> crowd"`, `"breadline"`, `"stock exchange <year>"`, `"<building> <year>"`, `"Dorothea Lange"`, `"Farm Security Administration"`, `"newspaper front page <date>"`.
- **C2 surreal B&W collage (cinema, psychology, crime):** PD films `"Nosferatu 1922"`, `"Metropolis 1927"`, `"Cabinet of Dr Caligari"`, `"Un Chien Andalou"` (check status), `"film still <year>"`, `"close-up eye"`, `"mugshot <year>"`.
- **C3 retro mid-century (science, inventions, biography):** `"<scientist> laboratory"`, `"<invention> <year>"`, `"Ministry of Information photograph"`, `"<city> skyline 1930s"`, `"advertisement <year>"`, `"poster <year>"`.
- **C4 presenter + hero number (money, records, costs):** speeches and press conferences (`"<person> speech <date>"`, `"press conference <year>"`), official portraits, and the hero object (`"<object> launch"`, `"banknote"`, `"gold bars"`).
- **Look B documentary:** drone and landscape stock, `"<site> aerial"`, `"<expedition> <year>"`, scientific instrument stock, institution exteriors.
- **Look A gameplay:** your own captures first, then official trailers. The skill's footage-treatment rules apply.

## 3. Workflow
1. For each shot-list row, write 2–3 queries (subject + year + "photo"/"film"/"newsreel").
2. Run `python3 -I scripts/find_footage.py "<query>" --type image|video --sources commons,archive,openverse,reddit --out <beat>.json`. Use `--download DIR` to fetch Commons/Openverse images with `CREDITS.txt`. Sources that are blocked or need a key are skipped with a note. Report which ones were skipped.
3. **Video from archive.org without downloading whole films:** look up the item's files at `https://archive.org/metadata/<id>`, then cut only what you need with ffmpeg seeking over HTTP:
   `ffmpeg -ss 3656 -i "https://archive.org/download/<id>/<file>.mp4" -t 7 -an -vf "fps=30,scale=960:-2" clip.mp4`
   Behind an HTTPS proxy, add `-http_proxy $HTTPS_PROXY -ca_file <proxy CA bundle>`.
4. Sample a long film before choosing shots: grab one frame every 2 minutes, tile them into a contact sheet, and pick the strongest shots.
5. Turn clips into frame sequences for the preview engine (`fps=30, scale=960, -q:v 4 seq/name/%03d.jpg`) and play them with `loadSeq` + `seqFrame` (see `scripts/preview-engine/README.md`).
6. Cut-outs (presenters, objects): `scripts/cutout.py in.png out.png`, which uses rembg `isnet-general-use` and keeps the largest region. Pick a frame where the subject is separated from the crowd.
7. Put every asset in `CREDITS.txt` (file, licence, author, page URL), and give the video a sources card or description block.

## 4. Licence rules (non-negotiable)
- Use only **public domain, CC0, CC-BY / CC-BY-SA (with attribution), or free-stock-licensed** material without asking. Anything else goes in the asset list as "licence needed".
- Trace Reddit, Pinterest, Klickpin and repost-account finds back to the original. A repost is not a source.
- Faces of private people from Reddit posts: don't use them unless the original archive publishes them.
- Label AI recreations as such when they could pass for archive.
- Wikimedia throttles bursts (HTTP 429). The finder backs off automatically, but keep downloads sequential with a few seconds between files.

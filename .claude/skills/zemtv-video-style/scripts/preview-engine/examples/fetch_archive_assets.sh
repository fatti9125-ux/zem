#!/usr/bin/env bash
# Re-creates ../arch/ (public-domain assets) for examples/archive_styles.html.
# Needs network access to commons.wikimedia.org, upload.wikimedia.org, archive.org (+ its ia*.archive.org mirrors), github.com (rembg model).
# Behind the session HTTPS proxy ffmpeg needs: -http_proxy "$HTTPS_PROXY" -ca_file <proxy CA bundle>  (set FFPROXY below).
set -euo pipefail
cd "$(dirname "$0")/.." && mkdir -p arch && cd arch
FFPROXY=${FFPROXY:-}
UA="ZemTVFootageFinder/1.1 (educational documentary research)"
get(){ curl -sSfL -A "$UA" -o "$1" "$2"; sleep 3; }
get c1_nyse.jpg     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Crowd_outside_nyse.jpg/1280px-Crowd_outside_nyse.jpg" || echo "fetch c1_nyse via find_footage.py 'Crowd outside nyse'"
get c1_mother.jpg   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Lange-MigrantMother02.jpg/1280px-Lange-MigrantMother02.jpg" || echo "fetch via find_footage.py 'Lange MigrantMother02'"
echo "c3_fleming.jpg / c4_launch.jpg: python3 -I ../../find_footage.py 'Professor Alexander Fleming at work in his laboratory' --sources commons --download ."
echo "                               python3 -I ../../find_footage.py 'Apollo 11 Launch GPN-2000-000630' --sources commons --download ."
N="https://archive.org/download/nosferatu.-1922/Nosferatu.1922.ia.mp4"
J="https://archive.org/download/president-john-f.-kennedy-09-12-1962/President%20John%20F.%20Kennedy%20%28720p%29.mp4"
seq(){ mkdir -p "$1"; ffmpeg -v error -y $FFPROXY -ss "$3" -i "$2" -t "$4" -an -vf "fps=30,scale=960:-2" -q:v 4 "$1/%03d.jpg"; echo "$1 $(ls "$1" | wc -l) frames"; }
seq nos_hatch "$N" 3656 7; seq nos_window "$N" 5093 6; seq nos_ship "$N" 3536 5; seq nos_knock "$N" 418 2.4; seq nos_street "$N" 4138 4; seq jfk_wide "$J" 326 5
ffmpeg -v error -y $FFPROXY -ss 914.4 -i "$J" -frames:v 1 jfk_frame.png && python3 -I ../../cutout.py jfk_frame.png jfk_cut.png

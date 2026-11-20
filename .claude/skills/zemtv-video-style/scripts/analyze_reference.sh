#!/usr/bin/env bash
# Analyze reference videos frame-by-frame for style study.
# Usage: analyze_reference.sh [-o OUTDIR] [-s START -d DUR] video1.mp4 [video2.mp4 ...]
#   Default: contact sheet at 1 fps (6x5 tiles = first 30 s; longer videos get one sheet per 30 s),
#            hard-cut list (scene > 0.3), and % near-still frames.
#   -s/-d:   also write a frame strip (every frame) of DUR seconds starting at START, for timing moves.
# Requires ffmpeg/ffprobe.
set -euo pipefail
OUT=./style_analysis; START=""; DUR=1
while getopts "o:s:d:" opt; do case $opt in o) OUT=$OPTARG;; s) START=$OPTARG;; d) DUR=$OPTARG;; *) exit 1;; esac; done
shift $((OPTIND-1))
[ $# -ge 1 ] || { echo "usage: $0 [-o outdir] [-s start -d dur] video..." >&2; exit 1; }
mkdir -p "$OUT"
for f in "$@"; do
  name=$(basename "${f%.*}" | tr -c 'A-Za-z0-9_\n-' '_' | cut -c1-60)
  info=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of csv=p=0 "$f" | tr '\n' ' ')
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  n=$(python3 -c "import math;print(max(1,math.ceil($dur/30)))")
  for i in $(seq 0 $((n-1))); do
    ffmpeg -v error -y -ss $((i*30)) -i "$f" -t 30 \
      -vf "fps=1,scale=256:-2,drawtext=text='%{pts\:hms\:$((i*30))}':x=4:y=4:fontsize=14:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=6x5" \
      -frames:v 1 "$OUT/${name}_sheet$(printf %02d $i).jpg"
  done
  cuts=$(ffmpeg -v info -i "$f" -vf "select='gt(scene,0.3)',showinfo" -an -f null - 2>&1 | grep -o 'pts_time:[0-9.]*' | cut -d: -f2 | tr '\n' ' ')
  still=$(ffmpeg -v error -i "$f" -vf "scale=160:-2,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null - \
    | grep -o 'YAVG=[0-9.]*' | cut -d= -f2 | awk '{t++; if($1<0.6)s++} END{if(t) printf "%d", 100*s/t; else print 0}')
  echo "$name | $info| sheets=$n | hard_cuts=$(echo $cuts | wc -w) [$cuts] | near_still=${still}%" | tee -a "$OUT/summary.txt"
  if [ -n "$START" ]; then
    ffmpeg -v error -y -ss "$START" -i "$f" -t "$DUR" \
      -vf "scale=256:-2,drawtext=text='f%{n}':x=4:y=4:fontsize=16:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=6x$(python3 -c "import math;print(max(1,math.ceil($DUR*30/6)))")" \
      -frames:v 1 "$OUT/${name}_strip_${START}s.jpg"
  fi
done
echo "Output in $OUT"

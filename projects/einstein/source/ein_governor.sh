#!/bin/bash
# pause renderers when free disk is low, resume when there is room again
state=run
while pgrep -f "render_range.js eov" >/dev/null; do
  free=$(df --output=avail -BG /tmp | tail -1 | tr -dc 0-9)
  if [ "$free" -lt 6 ] && [ $state = run ]; then pkill -STOP -f "render_range.js eov"; pkill -STOP -f chrom; state=stop; echo "$(date +%T) STOP free=${free}G"; fi
  if [ "$free" -ge 9 ] && [ $state = stop ]; then pkill -CONT -f "render_range.js eov"; pkill -CONT -f chrom; state=run; echo "$(date +%T) CONT free=${free}G"; fi
  sleep 5
done
echo "renders finished"

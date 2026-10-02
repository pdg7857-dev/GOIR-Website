#!/usr/bin/env bash
# Normalize a rendered MP4 to web loudness (-16 LUFS, -1.5 dBTP) and write a
# compact share copy. Usage: shared/tools/finish.sh renders/<name>.mp4 <out-dir>
set -euo pipefail
in="$1"; out="${2:-../_renders}"; name="$(basename "$in" .mp4)"
mkdir -p "$out"
ffmpeg -hide_banner -v error -y -i "$in" -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 160k -movflags +faststart "$out/$name.mp4"
ffmpeg -hide_banner -nostats -i "$out/$name.mp4" -vn -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | sed "s|^|$name |"
du -h "$out/$name.mp4"

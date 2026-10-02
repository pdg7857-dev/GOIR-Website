#!/usr/bin/env bash
# Render projects one after another (waits for any render already running), then finish each.
# Usage: video/_shared/tools/render-queue.sh <project> [<project> ...]   (run from video/)
set -uo pipefail
for p in "$@"; do
  while pgrep -f "hyperframes.*render" > /dev/null; do sleep 15; done
  ( cd "$p" && npx hyperframes render --quality high -w 3 --output "renders/$p.mp4" > "renders.log" 2>&1 && ./shared/tools/finish.sh "renders/$p.mp4" ../_renders ) || echo "FAILED $p"
done

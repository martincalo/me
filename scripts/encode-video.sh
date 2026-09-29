#!/usr/bin/env bash
# Turns the original robot-cell footage into the tinted, silent loop used by
# section 03, plus its poster, then runs the contrast check.
#
#   scripts/encode-video.sh <original-file> [start-seconds] [duration-seconds]
#
# Needs ffmpeg (brew install ffmpeg). Budget: MP4 + WebM ≤ 3 MB together.
set -euo pipefail

input=${1:?usage: scripts/encode-video.sh <original-file> [start] [duration]}
start=${2:-0}
duration=${3:-8}
out=public/media
mkdir -p "$out"

# Duotone: grayscale, then shadows → --stage (#183630), highlights → #6A8578.
# Capping the highlights is what keeps text contrast ≥ 4.5:1 on every frame.
tint="scale=1280:-2:flags=lanczos,hue=s=0,format=rgb24,curves=r='0/0.094 1/0.416':g='0/0.212 1/0.522':b='0/0.188 1/0.471',format=yuv420p"

ffmpeg -loglevel error -y -ss "$start" -t "$duration" -i "$input" -an -vf "fps=25,$tint" \
  -c:v libx264 -preset slow -crf 28 -profile:v high -movflags +faststart "$out/robot-cell.mp4"

ffmpeg -loglevel error -y -ss "$start" -t "$duration" -i "$input" -an -vf "fps=25,$tint" \
  -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good "$out/robot-cell.webm"

# Poster = first frame of the loop, so the switch to video is seamless.
ffmpeg -loglevel error -y -ss "$start" -i "$input" -frames:v 1 -vf "$tint" -q:v 3 "$out/robot-cell-poster.jpg"

bytes=$(( $(stat -f%z "$out/robot-cell.mp4") + $(stat -f%z "$out/robot-cell.webm") ))
ls -lh "$out"
echo "video total: $(( bytes / 1024 )) KB (budget 3072 KB)"
if (( bytes > 3 * 1024 * 1024 )); then
  echo "Over budget: shorten the loop or raise -crf." >&2
  exit 1
fi

node scripts/check-video-contrast.mjs "$out/robot-cell.mp4"

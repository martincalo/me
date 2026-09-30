#!/usr/bin/env bash
# Turns original footage into a graded, silent loop for an experience section,
# plus its poster, then runs the contrast check.
#
#   scripts/encode-video.sh <name> <original-file> <start-end> [<start-end> ...]
#   scripts/encode-video.sh robot-cell "Projects Automation.mp4" 4-8 55-61
#
#   SPEED=4 scripts/encode-video.sh meter "Meter 3.mp4" 0-29.3   # 4× faster
#
# Writes public/media/<name>.mp4, <name>.webm and <name>-poster.jpg. Segments
# (in seconds) are joined in order with hard cuts; the loop's end cuts back to
# its start. Needs ffmpeg (brew install ffmpeg).
# Budget per video: 6–10 s, MP4 + WebM ≤ 3 MB together.
set -euo pipefail

name=${1:?usage: scripts/encode-video.sh <name> <original-file> <start-end> [...]}
input=${2:?usage: scripts/encode-video.sh <name> <original-file> <start-end> [...]}
shift 2
(( $# > 0 )) || { echo "Give at least one segment, e.g. 4-8" >&2; exit 1; }
out=public/media
# Optional speed-up (e.g. SPEED=4 for slow real-time footage such as a meter counter).
speed=${SPEED:-1}
mkdir -p "$out"

# Shared natural grade so clips from different sources sit together: slightly
# desaturated, a touch warmer, softer contrast, and whites compressed to ~86% —
# the highlight cap is what keeps text over the scrim at ≥ 4.5:1.
# Up to 1920px wide; never upscales (small sources keep their width).
grade="scale='min(1920,iw)':-2:flags=lanczos,eq=saturation=0.55:contrast=0.94,colortemperature=temperature=5600:mix=0.6,curves=all='0/0.03 0.5/0.47 1/0.86',format=yuv420p"

graph=""
labels=""
i=0
for segment in "$@"; do
  graph+="[0:v]trim=start=${segment%-*}:end=${segment#*-},setpts=PTS-STARTPTS[s$i];"
  labels+="[s$i]"
  i=$((i + 1))
done
graph+="${labels}concat=n=$i:v=1:a=0,setpts=PTS/$speed,fps=25,$grade[out]"

ffmpeg -loglevel error -y -i "$input" -filter_complex "$graph" -map "[out]" -an \
  -c:v libx264 -preset slow -crf 28 -profile:v high -movflags +faststart "$out/$name.mp4"

ffmpeg -loglevel error -y -i "$input" -filter_complex "$graph" -map "[out]" -an \
  -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good "$out/$name.webm"

# Poster = first frame of the loop, so the switch to video is seamless.
first=${1%-*}
ffmpeg -loglevel error -y -ss "$first" -i "$input" -frames:v 1 -vf "$grade" -q:v 7 "$out/$name-poster.jpg"

duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out/$name.mp4")
bytes=$(( $(stat -f%z "$out/$name.mp4") + $(stat -f%z "$out/$name.webm") ))
ls -lh "$out"/"$name"*
echo "$name: ${duration}s · video total: $(( bytes / 1024 )) KB (budget 3072 KB)"
if (( bytes > 3 * 1024 * 1024 )); then
  echo "Over budget: shorten the loop or raise -crf." >&2
  exit 1
fi

node scripts/check-video-contrast.mjs "$out/$name.mp4"

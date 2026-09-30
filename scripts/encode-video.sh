#!/usr/bin/env bash
# Turns the original robot-cell footage into the tinted, silent loop used by
# section 03, plus its poster, then runs the contrast check.
#
#   scripts/encode-video.sh <original-file> <start-end> [<start-end> ...]
#   scripts/encode-video.sh "~/Downloads/Projects Automation.mp4" 4-8 55-61
#
# Segments (in seconds) are joined in order with hard cuts; the loop's end cuts
# back to its start. Needs ffmpeg (brew install ffmpeg).
# Budget: 6–10 s in total, MP4 + WebM ≤ 3 MB together.
set -euo pipefail

input=${1:?usage: scripts/encode-video.sh <original-file> <start-end> [<start-end> ...]}
shift
(( $# > 0 )) || { echo "Give at least one segment, e.g. 4-8" >&2; exit 1; }
out=public/media
mkdir -p "$out"

# Duotone: grayscale, then shadows → --stage (#183630), highlights → #6A8578.
# Capping the highlights is what keeps text contrast ≥ 4.5:1 on every frame.
tint="scale=1280:-2:flags=lanczos,hue=s=0,format=rgb24,curves=r='0/0.094 1/0.416':g='0/0.212 1/0.522':b='0/0.188 1/0.471',format=yuv420p"

graph=""
labels=""
i=0
for segment in "$@"; do
  graph+="[0:v]trim=start=${segment%-*}:end=${segment#*-},setpts=PTS-STARTPTS[s$i];"
  labels+="[s$i]"
  i=$((i + 1))
done
graph+="${labels}concat=n=$i:v=1:a=0,fps=25,$tint[out]"

ffmpeg -loglevel error -y -i "$input" -filter_complex "$graph" -map "[out]" -an \
  -c:v libx264 -preset slow -crf 28 -profile:v high -movflags +faststart "$out/robot-cell.mp4"

ffmpeg -loglevel error -y -i "$input" -filter_complex "$graph" -map "[out]" -an \
  -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good "$out/robot-cell.webm"

# Poster = first frame of the loop, so the switch to video is seamless.
first=${1%-*}
ffmpeg -loglevel error -y -ss "$first" -i "$input" -frames:v 1 -vf "$tint" -q:v 7 "$out/robot-cell-poster.jpg"

duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out/robot-cell.mp4")
bytes=$(( $(stat -f%z "$out/robot-cell.mp4") + $(stat -f%z "$out/robot-cell.webm") ))
ls -lh "$out"
echo "loop: ${duration}s · video total: $(( bytes / 1024 )) KB (budget 3072 KB)"
if (( bytes > 3 * 1024 * 1024 )); then
  echo "Over budget: shorten the loop or raise -crf." >&2
  exit 1
fi

node scripts/check-video-contrast.mjs "$out/robot-cell.mp4"

// Finds the brightest pixel in the encoded loop and checks that the section's
// text still reaches 4.5:1 over it, behind the scrim, in both themes.
//
//   node scripts/check-video-contrast.mjs public/media/<name>.mp4
import { execFileSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) throw new Error("usage: node scripts/check-video-contrast.mjs <video>");

// Tokens come straight from the stylesheet so this check can't drift.
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const all = (name) => [...css.matchAll(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "gi"))].map((m) => m[1]);
const [stageLight, stageDark] = all("stage");
const [stageInk] = all("stage-ink");
const [stageMuted] = all("stage-muted");

// Scrim opacity behind the text (components/VideoSection.module.css).
const scrims = { mobile: 0.8, desktop: 1 };

const [width, height] = execFileSync("ffprobe", [
  "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", file,
]).toString().trim().split(",").map(Number);

const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// Decode every 5th of a second at full resolution and keep the brightest pixel.
const ffmpeg = spawn("ffmpeg", ["-v", "error", "-i", file, "-vf", "fps=5", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]);
const frameSize = width * height * 3;
let offset = 0;
let brightest = { lum: -1, rgb: [0, 0, 0], frame: 0 };
let carry = Buffer.alloc(0);

for await (const chunk of ffmpeg.stdout) {
  const data = carry.length ? Buffer.concat([carry, chunk]) : chunk;
  const usable = data.length - (data.length % 3);
  for (let i = 0; i < usable; i += 3) {
    const rgb = [data[i], data[i + 1], data[i + 2]];
    const lum = luminance(rgb);
    if (lum > brightest.lum) brightest = { lum, rgb, frame: Math.floor((offset + i) / frameSize) };
  }
  offset += usable;
  carry = data.subarray(usable);
}

console.log(`brightest pixel: rgb(${brightest.rgb.join(", ")}) at ~${(brightest.frame / 5).toFixed(1)}s`);

let failed = false;
for (const [theme, stage] of [["light", stageLight], ["dark", stageDark]]) {
  for (const [layout, alpha] of Object.entries(scrims)) {
    const behind = hex(stage).map((s, i) => Math.round(alpha * s + (1 - alpha) * brightest.rgb[i]));
    for (const [name, color] of [["stage-ink", stageInk], ["stage-muted", stageMuted]]) {
      const ratio = contrast(hex(color), behind);
      const ok = ratio >= 4.5;
      failed ||= !ok;
      console.log(`${ok ? "ok  " : "FAIL"} ${theme.padEnd(5)} ${layout.padEnd(7)} ${name.padEnd(11)} ${ratio.toFixed(2)}:1`);
    }
  }
}

if (failed) {
  console.error("Text contrast below 4.5:1 over the brightest frame: darken the tint highlights or raise the scrim.");
  process.exit(1);
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Generated images can't read CSS variables, so the light tokens are repeated
// here (keep in sync with app/globals.css). This is the only other place
// colours are allowed.
export const ogColors = {
  bg: "#FCFBF3",
  ink: "#1A1A18",
  inkMuted: "#45433F",
  label: "#5E5C57",
  line: "#DDD9D0",
  accent: "#1F6B46",
  stage: "#183630",
  stageInk: "#ECEAE3",
  stageAccent: "#7FD1A3",
};

// Satori needs TTF/OTF; next/font's woff2 files can't be reused.
const fontDir = join(process.cwd(), "assets/fonts");
const [plexSans, plexMono] = await Promise.all([
  readFile(join(fontDir, "IBMPlexSans-Medium.ttf")),
  readFile(join(fontDir, "IBMPlexMono-Regular.ttf")),
]);

export const ogFonts = [
  { name: "IBM Plex Sans", data: plexSans, weight: 500 as const, style: "normal" as const },
  { name: "IBM Plex Mono", data: plexMono, weight: 400 as const, style: "normal" as const },
];

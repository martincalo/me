import { existsSync } from "node:fs";
import { join } from "node:path";
import { experienceVideos, type VideoMedia } from "@/content/media";

/**
 * The section's loop, or null until scripts/encode-video.sh has produced its
 * files. Checked at build time, so a missing video never becomes a broken link.
 */
export function experienceVideo(slug: string): VideoMedia | null {
  const media = experienceVideos[slug];
  if (!media) return null;
  const ready = [media.mp4, media.webm, media.poster].every((file) =>
    existsSync(join(process.cwd(), "public", file)),
  );
  return ready ? media : null;
}

import { existsSync } from "node:fs";
import { join } from "node:path";
import { sectionVideos, storyHeaders, type StoryHeaderMedia, type VideoMedia } from "@/content/media";

// Checked at build time, so a video whose files haven't been encoded yet
// renders as plain stage background instead of a broken <video>.
function ready(media: VideoMedia | undefined): VideoMedia | null {
  if (!media) return null;
  const exists = [media.mp4, media.webm, media.poster].every((file) =>
    existsSync(join(process.cwd(), "public", file)),
  );
  return exists ? media : null;
}

export function sectionVideo(slug: string): VideoMedia | null {
  return ready(sectionVideos[slug]);
}

export function storyHeader(slug: string): StoryHeaderMedia | null {
  const header = storyHeaders[slug];
  if (!header) return null;
  if ("animation" in header) return header;
  const video = ready(header.video);
  return video ? { video } : null;
}

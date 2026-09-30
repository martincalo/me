// Video loops for the homepage sections and the story-page headers. Files live
// in public/media/ and are produced by scripts/encode-video.sh (see README).
export type VideoMedia = {
  webm: string;
  mp4: string;
  poster: string;
  /** Below 1 slows the footage down if it feels busy behind the text. */
  playbackRate: number;
  /** CSS object-position: keeps the subject in frame when the box crops the video. */
  focus: string;
};

function video(name: string, options: { playbackRate?: number; focus?: string } = {}): VideoMedia {
  return {
    webm: `/media/${name}.webm`,
    mp4: `/media/${name}.mp4`,
    poster: `/media/${name}-poster.jpg`,
    playbackRate: options.playbackRate ?? 1,
    focus: options.focus ?? "50% 50%",
  };
}

/** Homepage experience sections, keyed by experience slug. */
// Metrify has no footage yet: the Meter clips in Downloads are watermarked
// iStock previews and can't be published. Add it here once licensed.
export const sectionVideos: Record<string, VideoMedia> = {
  tesla: video("tesla"),
  automation: video("robot-cell", { playbackRate: 0.7, focus: "60% 50%" }),
};

export type StoryHeaderMedia = { video: VideoMedia } | { animation: "production-line" };

/** Full-background header of each story page, keyed by experience slug. */
export const storyHeaders: Record<string, StoryHeaderMedia> = {
  tesla: { video: video("tesla-story", { focus: "60% 50%" }) },
  automation: { animation: "production-line" },
};

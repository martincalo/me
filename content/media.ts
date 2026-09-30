// Background loops for the experience sections. Files live in public/media/ and
// are produced by scripts/encode-video.sh from the original footage (see README).
export type VideoMedia = {
  webm: string;
  mp4: string;
  poster: string;
  /** Below 1 slows the footage down if it feels busy behind the text. */
  playbackRate: number;
  /** true = recolour in CSS instead of using the tint baked into the files. */
  cssTint: boolean;
};

function video(name: string, playbackRate = 1): VideoMedia {
  return {
    webm: `/media/${name}.webm`,
    mp4: `/media/${name}.mp4`,
    poster: `/media/${name}-poster.jpg`,
    playbackRate,
    cssTint: false,
  };
}

/** Keyed by experience slug. */
export const experienceVideos: Record<string, VideoMedia> = {
  metrify: video("meter"),
  tesla: video("tesla"),
  automation: video("robot-cell", 0.7),
};

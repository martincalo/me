// Robot-cell loop for section 03. Files live in public/media/ and are produced
// by scripts/encode-video.sh from the original footage (see README).
export const robotCellVideo = {
  webm: "/media/robot-cell.webm",
  mp4: "/media/robot-cell.mp4",
  poster: "/media/robot-cell-poster.jpg",
  /** Slow the footage down if it feels busy behind the text. */
  playbackRate: 0.7,
  /** true = recolour in CSS instead of using the tint baked into the files. */
  cssTint: false,
};

export type VideoMedia = typeof robotCellVideo;

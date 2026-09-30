import { existsSync } from "node:fs";
import { join } from "node:path";
import { robotCellVideo } from "@/content/media";

/** Checked at build time: false until scripts/encode-video.sh has produced the files. */
export const hasRobotCellVideo = [robotCellVideo.mp4, robotCellVideo.webm, robotCellVideo.poster].every((file) =>
  existsSync(join(process.cwd(), "public", file)),
);

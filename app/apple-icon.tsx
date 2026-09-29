import { ImageResponse } from "next/og";
import { ogColors as c } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.svg: an "M" with a status dot on forest.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.stage }}>
        <svg viewBox="0 0 64 64" width="180" height="180">
          <path d="M14 44V24h4l6 10 6-10h4v20h-4V31l-6 10-6-10v13z" fill={c.stageInk} />
          <circle cx="46" cy="40" r="5" fill={c.stageAccent} />
        </svg>
      </div>
    ),
    size,
  );
}

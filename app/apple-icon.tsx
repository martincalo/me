import { ImageResponse } from "next/og";
import { ogColors as c } from "@/lib/og";
import { markPixels } from "@/lib/pixel-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same pixel "M" as app/icon.svg, full-bleed (iOS rounds the corners itself).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: c.stage,
        }}
      >
        {/* 176px = exactly 11px per grid pixel, so no seams between pixels. */}
        <svg viewBox="0 0 16 16" width="176" height="176">
          {markPixels.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c.stageAccent} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { profile, titleLine } from "@/content/profile";
import { ogColors as c, ogFonts } from "@/lib/og";

export const alt = `${profile.name} — Building reliable systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: c.bg,
          color: c.ink,
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "IBM Plex Mono", fontSize: 26, color: c.label }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: c.accent }} />
          {titleLine}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, lineHeight: 1.02, letterSpacing: "-0.035em" }}>{profile.headline}</div>
          <div style={{ marginTop: 28, fontSize: 36, color: c.inkMuted }}>{profile.subline}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${c.line}`,
            paddingTop: 24,
            fontFamily: "IBM Plex Mono",
            fontSize: 24,
            color: c.label,
          }}
        >
          <span>martincalo.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}

import { ImageResponse } from "next/og";
import { experience, findExperience } from "@/content/experience";
import { profile } from "@/content/profile";
import { experienceLabel } from "@/components/ExperienceSection";
import { ogColors as c, ogFonts } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = `${profile.name} — full story`;

export function generateStaticParams() {
  return experience.map((item) => ({ slug: item.slug }));
}

export default async function WorkOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findExperience(slug)!;

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
          background: c.stage,
          color: c.stageInk,
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: 26, color: c.stageAccent, letterSpacing: "0.08em" }}>
          {experienceLabel(item).toUpperCase()}
        </div>
        <div style={{ fontSize: 88, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 1000 }}>{item.title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${c.stageAccent}`,
            paddingTop: 24,
            fontFamily: "IBM Plex Mono",
            fontSize: 24,
          }}
        >
          <span>{profile.name}</span>
          <span>martincalo.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}

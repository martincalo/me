import type { ReactNode } from "react";
import type { VideoMedia } from "@/content/media";
import { LoopVideo } from "./LoopVideo";
import s from "./VideoSection.module.css";

type Props = {
  /** Anchor id, so a story page's back link can return to this section. */
  id: string;
  labelledBy: string;
  /** null while the footage isn't in public/media yet: stage background only. */
  media: VideoMedia | null;
  /** Which half the text sits on at desktop widths; sections alternate. */
  textSide?: "left" | "right";
  children: ReactNode;
};

/**
 * Homepage experience section. Desktop: text on solid stage, the video filling
 * the other half so its subject stays in frame. Phones: video behind the text
 * under a scrim.
 */
export function VideoSection({ id, labelledBy, media, textSide = "left", children }: Props) {
  return (
    <article
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden ${textSide === "right" ? s.textRight : ""}`}
    >
      {media && (
        <div aria-hidden="true" className={`${s.media} ${media.frame === "whole" ? s.whole : ""}`}>
          <LoopVideo media={media} sizes="(min-width: 768px) 50vw, 100vw" />
          <div className={s.fade} />
        </div>
      )}
      {media && <div aria-hidden="true" className={s.scrim} />}
      <div className="relative container-page py-20 md:py-32">
        <div className={textSide === "right" ? "md:ml-auto md:w-1/2 md:pl-12" : "md:w-1/2 md:pr-12"}>
          {children}
        </div>
      </div>
    </article>
  );
}

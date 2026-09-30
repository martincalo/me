"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { VideoMedia } from "@/content/media";
import s from "./VideoSection.module.css";

type Props = {
  labelledBy: string;
  /** null while the footage isn't in public/media yet: stage background only. */
  media: VideoMedia | null;
  /** Which half the text sits on at desktop widths; sections alternate. */
  textSide?: "left" | "right";
  children: ReactNode;
};

/** Poster only on small screens when the browser reports a slow or save-data connection. */
function isConstrained(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  if (!connection || !matchMedia("(max-width: 767px)").matches) return false;
  return Boolean(connection.saveData) || /(^|-)(2g|3g)$/.test(connection.effectiveType ?? "");
}

/**
 * Full-bleed experience section with a looping video behind the text.
 * The server HTML shows the poster; playback is started from script so that
 * reduced motion and slow connections can keep it off.
 */
export function VideoSection({ labelledBy, media, textSide = "left", children }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !media) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (isConstrained()) return;

    video.muted = true;
    video.playbackRate = media.playbackRate;
    let inView = false;

    const sync = () => {
      if (inView && !reducedMotion.matches) {
        video.play().catch(() => {
          // Autoplay refused (e.g. low-power mode): the poster stays.
        });
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    reducedMotion.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
    };
  }, [media]);

  return (
    <article
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden ${media?.cssTint ? s.cssTint : ""} ${textSide === "right" ? s.textRight : ""}`}
    >
      {media && (
        <video
          ref={ref}
          className={s.video}
          poster={media.poster}
          preload="metadata"
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={media.webm} type="video/webm" />
          <source src={media.mp4} type="video/mp4" />
        </video>
      )}
      {media?.cssTint && <div aria-hidden="true" className={s.tint} />}
      <div aria-hidden="true" className={s.scrim} />
      <div className="relative container-page py-20 md:py-40">
        <div className={textSide === "right" ? "md:ml-auto md:w-1/2 md:pl-8" : "md:w-1/2 md:pr-8"}>
          {children}
        </div>
      </div>
    </article>
  );
}

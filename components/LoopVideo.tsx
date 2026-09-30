"use client";

import Image from "next/image";
import { useRef } from "react";
import type { VideoMedia } from "@/content/media";
import { useInViewPlayback } from "./useInViewPlayback";
import s from "./LoopVideo.module.css";

/**
 * Decorative muted loop filling its positioned parent. The poster is a
 * lazy-loaded next/image layer underneath (sized for the device, and not
 * competing with the page's fonts), so it also shows without JavaScript.
 * Playback starts only in view and never with reduced motion.
 */
export function LoopVideo({ media, sizes = "100vw" }: { media: VideoMedia; sizes?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useInViewPlayback(ref, media);

  return (
    <>
      <Image
        src={media.poster}
        alt=""
        fill
        sizes={sizes}
        className={s.video}
        style={{ objectPosition: media.focus }}
      />
      <video
        ref={ref}
        className={s.video}
        style={{ objectPosition: media.focus }}
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
    </>
  );
}

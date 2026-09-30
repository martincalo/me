import { useEffect, type RefObject } from "react";
import type { VideoMedia } from "@/content/media";

/** Poster only on small screens when the browser reports a slow or save-data connection. */
function isConstrained(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  if (!connection || !matchMedia("(max-width: 767px)").matches) return false;
  return Boolean(connection.saveData) || /(^|-)(2g|3g)$/.test(connection.effectiveType ?? "");
}

/**
 * Plays a muted loop only while it is on screen. Never plays with reduced
 * motion or on constrained connections: the poster from the server HTML stays.
 */
export function useInViewPlayback(ref: RefObject<HTMLVideoElement | null>, media: VideoMedia | null) {
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
  }, [ref, media]);
}

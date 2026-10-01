import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import s from "./Hero.module.css";

// Wide screens (≥1200px): headline on the cream page, the photo on the right
// half melting into the page. Narrower screens: the photo sits above the text
// and fades into the page (phones get a head-and-shoulders crop).
// The section fills the first screen below the site header (4.75rem), so the
// dark Work section never peeks in on load.
export function Hero() {
  const { heroImage } = profile;
  const titleWords = profile.jobTitle.split(" ");
  const titleLast = titleWords.pop();
  const titleLead = titleWords.join(" ");
  // Art direction: phones get a head-and-shoulders crop, wider screens the
  // head-to-waist frame. One <picture>, so each device downloads only its image.
  const common = {
    alt: heroImage.alt,
    fill: true,
    sizes: "(min-width: 1200px) 52vw, 100vw",
    loading: "eager",
  } as const;
  const { props: desktop } = getImageProps({ ...common, src: heroImage.src });
  const { props: mobile } = getImageProps({
    ...common,
    src: heroImage.mobileSrc,
  });

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div
        className={s.photo}
        style={{ "--hero-focus": heroImage.focus } as CSSProperties}
      >
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={desktop.srcSet}
            sizes={desktop.sizes}
          />
          <img
            {...mobile}
            alt={heroImage.alt}
            className={`object-cover ${s.image}`}
            style={{ ...mobile.style, objectPosition: undefined }}
          />
        </picture>
        <div aria-hidden="true" className={s.gradient} />
      </div>

      <div className="relative container-page grid flex-1 content-center pt-6 pb-16 md:pt-28 md:pb-16">
        <div className="min-[1200px]:w-[46%]">
          {/* "Full-Stack Software" stays on one line; the last word goes below. */}
          <h1 className="text-display">
            <span className="whitespace-nowrap">{titleLead}</span>
            <br />
            {titleLast}
          </h1>
          <p className="mt-6 text-2xl font-medium tracking-tight md:text-3xl">
            {profile.tagline}
          </p>
          <p className="measure mt-5 text-xl text-ink-muted md:text-2xl">
            {profile.subline}
          </p>
        </div>
      </div>
    </section>
  );
}

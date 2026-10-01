import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import s from "./Hero.module.css";

// Wide screens (≥1200px): the photo fills the Hero behind the text, under a cream gradient
// that is solid behind the text column and clears on the right where the
// subject is. Narrower screens: the photo sits above the text and fades into
// the page (phones get a head-and-shoulders crop, tablets the wide image).
// The section fills the first screen below the site header (4.75rem), so the
// dark Work section never peeks in on load.
export function Hero() {
  const { heroImage } = profile;
  // Art direction: phones get a head-and-shoulders crop, wider screens the
  // full composite. One <picture>, so each device downloads only its image.
  const common = {
    alt: heroImage.alt,
    fill: true,
    sizes: "100vw",
    loading: "eager",
  } as const;
  const { props: desktop } = getImageProps({ ...common, src: heroImage.src });
  const { props: mobile } = getImageProps({
    ...common,
    src: heroImage.mobileSrc,
  });

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden">
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

      <div className="relative container-page grid flex-1 content-center pt-6 pb-16 md:py-16">
        <div className="min-[1200px]:w-[55%]">
          <h1 className="text-display text-balance">{profile.jobTitle}</h1>
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

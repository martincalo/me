import Image from "next/image";
import { profile } from "@/content/profile";
import s from "./Hero.module.css";

// Desktop: the photo fills the Hero behind the text, under a cream gradient
// that is solid behind the text column and clears on the right where the
// subject is. Phones: the photo sits above the text and fades into the page.
// The section fills the first screen below the site header (4.75rem), so the
// dark Work section never peeks in on load.
export function Hero() {
  const { heroImage } = profile;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden">
      <div className={s.photo}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: heroImage.focus }}
        />
        <div aria-hidden="true" className={s.gradient} />
      </div>

      <div className="relative container-page grid flex-1 content-center pt-6 pb-16 md:py-16">
        <div className="md:w-[55%]">
          <h1 className="text-display text-balance">{profile.jobTitle}</h1>
          <p className="mt-6 text-2xl font-medium tracking-tight md:text-3xl">{profile.tagline}</p>
          <p className="measure mt-5 text-xl text-ink-muted md:text-2xl">{profile.subline}</p>
        </div>
      </div>
    </section>
  );
}

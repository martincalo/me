import Image from "next/image";
import { profile, titleLine } from "@/content/profile";
import { StatusDot } from "./StatusDot";

export function Hero() {
  // Fills the first screen below the site header (py-4 + 44px = 4.75rem), so the
  // dark Work section never peeks in on load.
  return (
    <section className="container-page grid min-h-[calc(100svh-4.75rem)] content-center items-end gap-12 py-12 md:grid-cols-[1.5fr_1fr] md:py-16">
      <div>
        <p className="text-meta flex items-center gap-3 text-label">
          <StatusDot />
          {titleLine}
        </p>
        <h1 className="text-display mt-6">{profile.headline}</h1>
        <p className="measure mt-6 text-xl text-ink-muted md:text-2xl">{profile.subline}</p>
      </div>

      <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 768px) 24rem, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="text-meta absolute inset-0 grid place-items-center text-label">[Photo]</span>
        )}
      </div>
    </section>
  );
}

import Image from "next/image";
import { profile, titleLine } from "@/content/profile";
import { StatusDot } from "./StatusDot";

export function Hero() {
  return (
    <section className="container-page grid items-end gap-12 pt-12 pb-20 md:grid-cols-[1.5fr_1fr] md:pt-20 md:pb-32">
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

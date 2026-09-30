import Link from "next/link";
import type { Experience } from "@/content/experience";
import type { StoryHeaderMedia } from "@/content/media";
import { ExperienceLabel } from "./ExperienceSection";
import { LoopVideo } from "./LoopVideo";
import { ProductionLine } from "./ProductionLine";
import s from "./StoryHeader.module.css";

/**
 * Story-page header, about two thirds of the screen tall so the story starts
 * above the fold: the chapter's video (or animation) fills it, and the title
 * sits bottom-left on its own dark gradient.
 */
export function StoryHeader({ item, media }: { item: Experience; media: StoryHeaderMedia | null }) {
  // The label already names the location; repeat the places only when they add some.
  const places = item.story.locations !== item.location ? item.story.locations : null;

  return (
    <header className={`stage relative flex flex-col justify-end overflow-hidden ${s.header}`}>
      {media && "video" in media && (
        <div aria-hidden="true" className="absolute inset-0">
          <LoopVideo media={media.video} />
        </div>
      )}
      {media && "animation" in media && (
        <div aria-hidden="true" className={s.animation}>
          <ProductionLine className={s.animationSvg} />
        </div>
      )}

      {/* The dark gradient only protects text laid over footage; drawings sit on plain stage. */}
      <div className={`relative ${media && "video" in media ? s.textBlock : s.textBlockPlain}`}>
        <div className="container-page pb-10 md:pb-14">
          <div className={media && "animation" in media ? s.besideDrawing : undefined}>
          <p className="text-meta">
            <Link href="/#work" className="link inline-flex min-h-11 items-center">
              <span aria-hidden="true">←&nbsp;</span>All work
            </Link>
          </p>
          <ExperienceLabel item={item} className="mt-4 text-stage-muted" />
          <h1 id="story-title" className="measure mt-4 text-4xl font-medium tracking-tight md:text-6xl">
            {item.title}
          </h1>
          {places && <p className="text-meta mt-5 text-stage-muted">{places}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}

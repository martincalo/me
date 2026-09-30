import Link from "next/link";
import type { Experience } from "@/content/experience";
import type { StoryHeaderMedia } from "@/content/media";
import { ExperienceLabel } from "./ExperienceSection";
import { LoopVideo } from "./LoopVideo";
import { ProductionLine } from "./ProductionLine";
import s from "./StoryHeader.module.css";

/**
 * Compact story-page header: the chapter's video fills it as a background with
 * the title on a dark gradient, or the drawing sits beside the title. It's only
 * as tall as its content, so the story starts right below. "All work" returns
 * to the homepage section the reader came from.
 */
export function StoryHeader({
  item,
  media,
}: {
  item: Experience;
  media: StoryHeaderMedia | null;
}) {
  // The label already names the location; repeat the places only when they add some.
  const places =
    item.story.locations !== item.location ? item.story.locations : null;

  return (
    <header className="stage relative overflow-hidden md:flex md:items-end">
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
      <div
        className={`relative w-full ${media && "video" in media ? s.textBlock : s.textBlockPlain}`}
      >
        <div className="container-page pb-10 md:pb-14">
          <div
            className={
              media && "animation" in media ? s.besideDrawing : undefined
            }
          >
            <p className="text-meta">
              <Link
                href={`/#${item.slug}`}
                className="link inline-flex min-h-11 items-center"
              >
                <span aria-hidden="true">←&nbsp;</span>All work
              </Link>
            </p>
            <ExperienceLabel item={item} className="mt-4 text-stage-muted" />
            <h1
              id="story-title"
              className="measure mt-4 text-4xl font-medium tracking-tight md:text-6xl"
            >
              {item.title}
            </h1>
            {places && (
              <p className="text-meta mt-5 text-stage-muted">{places}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

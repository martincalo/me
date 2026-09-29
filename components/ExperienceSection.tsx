import type { ReactNode } from "react";
import type { Experience } from "@/content/experience";

type Props = {
  item: Experience;
  /** Animation or other visual shown beside the text (above it on mobile). */
  visual?: ReactNode;
  /** Put the visual on the left on desktop, alternating between sections. */
  visualFirst?: boolean;
};

export function ExperienceStory({ item }: { item: Experience }) {
  return (
    <>
      <p className="text-meta text-stage-muted">
        {item.number} · {item.company} · {item.location}
        {item.period ? ` · ${item.period}` : ""}
      </p>
      <h3 id={`${item.id}-title`} className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">{item.title}</h3>
      <div className="mt-6 space-y-4">
        {item.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        {item.note && <p>{item.note}</p>}
      </div>
      <ul className="text-meta mt-6 flex flex-wrap gap-2" aria-label="Stack">
        {item.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-stage-muted/40 px-3 py-1 text-stage-muted">
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}

export function ExperienceSection({ item, visual, visualFirst = false }: Props) {
  return (
    <article
      aria-labelledby={`${item.id}-title`}
      className="container-page grid items-center gap-8 py-16 md:grid-cols-2 md:gap-12 md:py-24"
    >
      {visual && (
        <div aria-hidden="true" className={visualFirst ? "" : "md:order-last"}>
          {visual}
        </div>
      )}
      <div
        className={`rounded-2xl bg-stage-panel p-6 md:p-10 ${visual ? "" : "md:col-span-2 measure"}`}
      >
        <ExperienceStory item={item} />
      </div>
    </article>
  );
}

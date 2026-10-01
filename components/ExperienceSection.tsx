import Link from "next/link";
import { experienceTags, type Experience } from "@/content/experience";

export function experienceLabel(item: Experience) {
  return [item.period, item.company, item.location].filter(Boolean).join(" · ");
}

export function ExperienceLabel({ item, className = "" }: { item: Experience; className?: string }) {
  return (
    <p className={`text-meta tracking-wider uppercase ${className}`}>
      {experienceLabel(item)}
    </p>
  );
}

export function ExperienceStory({ item }: { item: Experience }) {
  return (
    <>
      <ExperienceLabel item={item} className="text-stage-muted" />
      <h3 id={`${item.slug}-title`} className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">{item.title}</h3>
      <div className="mt-6 space-y-4">
        {item.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <ul className="text-meta mt-6 flex flex-wrap gap-2" aria-label="Stack">
        {experienceTags(item).map((tag) => (
          <li key={tag} className="rounded-full border border-stage-muted/40 px-3 py-1 text-stage-muted">
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href={`/work/${item.slug}`} className="link">
          Read the full story<span aria-hidden="true"> →</span>
          <span className="sr-only">: {item.title}</span>
        </Link>
      </p>
    </>
  );
}

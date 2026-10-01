import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryHeader } from "@/components/StoryHeader";
import { experience, findExperience } from "@/content/experience";
import { profile } from "@/content/profile";
import { storyHeader } from "@/lib/media";

export const dynamicParams = false;

export function generateStaticParams() {
  return experience.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = findExperience(slug);
  if (!item) return {};
  const url = `/work/${item.slug}`;
  const description = item.paragraphs[0];
  return {
    title: item.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: profile.name,
      locale: "en_US",
      title: `${item.title} — ${profile.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} — ${profile.name}`,
      description,
    },
  };
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const item = findExperience(slug);
  if (!item) notFound();

  const index = experience.indexOf(item);
  const next = experience[(index + 1) % experience.length];

  return (
    <article aria-labelledby="story-title">
      <StoryHeader item={item} media={storyHeader(item.slug)} />

      <div className="container-page py-16 md:py-24">
        <div className="measure space-y-12">
          {item.story.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-medium tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-ink-muted">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {section.stack && (
                <dl className="mt-6 space-y-3">
                  {section.stack.map((group) => (
                    <div
                      key={group.label}
                      className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <dt className="text-meta w-20 shrink-0 tracking-wider text-label uppercase">
                        {group.label}
                      </dt>
                      <dd>
                        <ul className="text-meta flex flex-wrap gap-2">
                          {group.items.map((tool) => (
                            <li
                              key={tool}
                              className="rounded-full border border-line px-3 py-1 text-label"
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}

          {/* Stories with a grouped stack already list it; avoid repeating it here. */}
          {!item.story.sections.some((section) => section.stack) && (
            <section aria-labelledby="stack-heading">
              <h2
                id="stack-heading"
                className="text-meta tracking-wider text-label uppercase"
              >
                Stack
              </h2>
              <ul className="text-meta mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-label"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav aria-label="More work" className="mt-16 border-t border-line pt-8">
          <Link href={`/work/${next.slug}`} className="group inline-block">
            <span className="text-meta tracking-wider text-label uppercase">
              Next story
            </span>
            <span className="link mt-2 block text-2xl font-medium tracking-tight">
              {next.title}
              <span aria-hidden="true"> →</span>
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

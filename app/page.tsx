import { Bookshelf } from "@/components/Bookshelf";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { books } from "@/content/books";
import { experience } from "@/content/experience";
import { testimonials } from "@/content/testimonials";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Interim text-only version; group 5 adds panels, animations and the video. */}
      <section id="work" aria-labelledby="work-heading" className="stage">
        <h2 id="work-heading" className="sr-only">
          Work
        </h2>
        {experience.map((item) => (
          <article key={item.id} className="container-page py-20 md:py-28">
            <p className="text-meta text-stage-muted">
              {item.number} · {item.company} · {item.location}
              {item.period ? ` · ${item.period}` : ""}
            </p>
            <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">{item.title}</h3>
            <div className="measure mt-6 space-y-4 text-stage-ink">
              {item.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {item.note && <p>{item.note}</p>}
            </div>
            <ul className="text-meta mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-stage-muted/40 px-3 py-1 text-stage-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <Testimonials items={testimonials} />
      <Bookshelf books={books} />
      <Contact />
    </>
  );
}

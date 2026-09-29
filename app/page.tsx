import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Bookshelf } from "@/components/Bookshelf";
import { Contact } from "@/components/Contact";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { books } from "@/content/books";
import { experience } from "@/content/experience";
import { testimonials } from "@/content/testimonials";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-heading" className="stage">
        <h2 id="work-heading" className="sr-only">
          Work
        </h2>
        {experience.map((item, i) =>
          item.background === "video" ? (
            // VideoSection replaces this in group 6.
            <ExperienceSection key={item.id} item={item} />
          ) : (
            <ExperienceSection
              key={item.id}
              item={item}
              visual={<AnimatedBackground variant={item.background} />}
              visualFirst={i % 2 === 1}
            />
          ),
        )}
      </section>

      <Testimonials items={testimonials} />
      <Bookshelf books={books} />
      <Contact />
    </>
  );
}

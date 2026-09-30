import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Bookshelf } from "@/components/Bookshelf";
import { Contact } from "@/components/Contact";
import { ExperienceSection, ExperienceStory } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { books } from "@/content/books";
import { experience } from "@/content/experience";
import { robotCellVideo } from "@/content/media";
import { profile } from "@/content/profile";
import { hasRobotCellVideo } from "@/lib/media";

// Contact details (email, phone) are deliberately left out of structured data.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.jobTitle,
  url: profile.url,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  sameAs: [profile.linkedin, profile.github],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />

      <section id="work" aria-labelledby="work-heading" className="stage">
        <h2 id="work-heading" className="sr-only">
          Work
        </h2>
        {experience.map((item, i) =>
          item.background === "video" ? (
            <VideoSection
              key={item.slug}
              labelledBy={`${item.slug}-title`}
              media={hasRobotCellVideo ? robotCellVideo : null}
            >
              <ExperienceStory item={item} />
            </VideoSection>
          ) : (
            <ExperienceSection
              key={item.slug}
              item={item}
              visual={<AnimatedBackground variant={item.background} />}
              visualFirst={i % 2 === 1}
            />
          ),
        )}
      </section>

      <Bookshelf books={books} />
      <Contact />
    </>
  );
}

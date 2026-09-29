import { existsSync } from "node:fs";
import { join } from "node:path";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Bookshelf } from "@/components/Bookshelf";
import { Contact } from "@/components/Contact";
import { ExperienceSection, ExperienceStory } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { VideoSection } from "@/components/VideoSection";
import { books } from "@/content/books";
import { experience } from "@/content/experience";
import { robotCellVideo } from "@/content/media";
import { profile } from "@/content/profile";
import { testimonials } from "@/content/testimonials";

// Checked at build time: until the footage is exported, section 03 renders
// on the plain stage background instead of pointing at missing files.
const hasVideo = [robotCellVideo.mp4, robotCellVideo.webm, robotCellVideo.poster].every((file) =>
  existsSync(join(process.cwd(), "public", file)),
);

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
              key={item.id}
              labelledBy={`${item.id}-title`}
              media={hasVideo ? robotCellVideo : null}
            >
              <ExperienceStory item={item} />
            </VideoSection>
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

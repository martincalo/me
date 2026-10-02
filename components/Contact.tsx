import { ContactLinks } from "./ContactLinks";

// A homepage chapter: cream in light mode, graphite in dark mode.
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="chapter">
      <div className="container-page border-t border-stage-muted/20 py-20 text-center md:py-32">
        <h2
          id="contact-heading"
          className="measure mx-auto text-3xl font-medium tracking-tight text-balance md:text-5xl"
        >
          Building something that needs to be reliable? Let’s talk.
        </h2>
        <ContactLinks className="mt-8 justify-center" />
      </div>
    </section>
  );
}

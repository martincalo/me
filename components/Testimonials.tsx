import type { Testimonial } from "@/content/testimonials";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="container-page py-20 md:py-32">
      <h2 id="testimonials-heading" className="text-meta text-label">
        What colleagues say
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <li key={t.name}>
            <figure className="h-full rounded-2xl border border-line bg-surface p-6">
              <blockquote className="text-lg">“{t.quote}”</blockquote>
              <figcaption className="text-meta mt-6 text-label">
                {t.name} · {t.role}
                {t.company ? `, ${t.company}` : ""}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

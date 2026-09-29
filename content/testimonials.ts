export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

// Real quotes only, published with permission. The section is hidden while empty.
export const testimonials: Testimonial[] = [];

if (testimonials.length > 3) {
  throw new Error(`content/testimonials.ts: at most 3 testimonials, found ${testimonials.length}`);
}

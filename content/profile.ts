import { isPlaceholder } from "./placeholder";

export const profile = {
  name: "Martin Calo",
  // The job title lives here only: the Hero h1, page title, OG image and JSON-LD
  // read it. Keep it identical to the LinkedIn headline.
  jobTitle: "Full-Stack Software Engineer",
  location: "Berlin",
  tagline: "Building reliable systems.",
  subline:
    "Over a decade building systems that have to work, from robot cells to cloud platforms. Now bringing AI into production with the same rigour.",
  url: "https://martincalo.com",

  email: "martin.calo.garcia@gmail.com",
  // International format; wa.me links use the digits only.
  phone: "+49 176 64025608",
  linkedin: "https://www.linkedin.com/in/martin-calo-garcia/",
  github: "https://github.com/martincalo",

  // Full-bleed Hero background. To swap the photo, replace public/hero.jpg
  // (landscape, ≥2400px wide, subject in the right third, calm background) and
  // adjust `focus` so the subject stays in frame.
  heroImage: {
    src: "/hero.jpg",
    alt: "Martin Calo",
    focus: "78% 35%",
  },
} as const;

export const eyebrow = `${profile.name} · ${profile.location}`;

/** https://wa.me/<digits>, or null while the phone number is a placeholder. */
export function whatsappUrl(phone: string): string | null {
  if (isPlaceholder(phone)) return null;
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

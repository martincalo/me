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

  // Hero photo: frame 2766 (46.1 s) of "Personal Picture.MOV", untouched
  // colour: HDR → SDR with Apple's own conversion (`avconvert`, as QuickTime
  // shows it), no grading. Desktop: public/hero.jpg (4000×2250), head to waist,
  // ~70% across; the wall extended with the clip's empty-wall frames
  // (colour-matched; mirrored and unused wall pieces, blended). Phones:
  // public/hero-mobile.jpg (1600×1200 head-and-shoulders crop of the same
  // frame). `focus` keeps the subject in frame on desktop.
  heroImage: {
    src: "/hero.jpg",
    mobileSrc: "/hero-mobile.jpg",
    alt: "Martin Calo",
    focus: "70% 35%",
  },
} as const;

export const eyebrow = `${profile.name} · ${profile.location}`;

/** https://wa.me/<digits>, or null while the phone number is a placeholder. */
export function whatsappUrl(phone: string): string | null {
  if (isPlaceholder(phone)) return null;
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

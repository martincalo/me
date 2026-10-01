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

  // Hero photo: frame 2766 (46.1 s) of "Personal Picture.MOV", untouched —
  // HDR → SDR with Apple's own conversion (`avconvert`), no grading or
  // compositing. Desktop/tablet: public/hero.jpg (1600×2000, head to waist),
  // on the right half of a cream hero. Phones: public/hero-mobile.jpg
  // (1600×1600 head-and-shoulders crop). `focus` keeps the face in frame.
  heroImage: {
    src: "/hero.jpg",
    mobileSrc: "/hero-mobile.jpg",
    alt: "Martin Calo",
    focus: "50% 25%",
  },
} as const;

export const eyebrow = `${profile.name} · ${profile.location}`;

/** https://wa.me/<digits>, or null while the phone number is a placeholder. */
export function whatsappUrl(phone: string): string | null {
  if (isPlaceholder(phone)) return null;
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

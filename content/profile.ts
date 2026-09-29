import { isPlaceholder } from "./placeholder";

export const profile = {
  name: "Martin Calo",
  // The job title lives here only: the Hero, metadata, OG image and JSON-LD read it.
  jobTitle: "Full Stack Engineer",
  location: "Berlin",
  headline: "Building reliable systems.",
  subline: "Hands-on engineer. From robot cells to cloud platforms to AI.",
  url: "https://martincalo.com",

  email: "[Email]",
  // International format, e.g. "+49 151 2345678".
  phone: "[Phone number]",
  linkedin: "https://www.linkedin.com/in/martin-calo-garcia/",
  github: "https://github.com/martincalo",

  // Path under /public, or null until the photo arrives.
  photo: null as string | null,
} as const;

export const titleLine = `${profile.name} · ${profile.jobTitle} · ${profile.location}`;

/** https://wa.me/<digits>, or null while the phone number is a placeholder. */
export function whatsappUrl(phone: string): string | null {
  if (isPlaceholder(phone)) return null;
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

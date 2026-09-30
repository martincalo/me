import type { MetadataRoute } from "next";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, changeFrequency: "monthly", priority: 1 },
    ...experience.map((item) => ({
      url: `${profile.url}/work/${item.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

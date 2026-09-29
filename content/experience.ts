export type ExperienceBackground = "meter" | "production-line" | "video";

export type Experience = {
  id: string;
  number: string;
  company: string;
  location: string;
  period?: string;
  title: string;
  /** Context, what was built and decided, outcome. */
  paragraphs: [string, string, string];
  /** Extra sentence shown after the story (the ISA-95 line). */
  note?: string;
  tags: string[];
  background: ExperienceBackground;
};

// Reverse chronological. Tags are taken from the old site's texts; review them.
export const experience: Experience[] = [
  {
    id: "enpal",
    number: "01",
    company: "Enpal",
    location: "[Location]",
    period: "now",
    title: "Digitalizing smart meters",
    paragraphs: ["[Context]", "[What was built and decided]", "[Outcome]"],
    tags: ["Azure", "Terraform", "Docker", "Kubernetes", "Argo CD"],
    background: "meter",
  },
  {
    id: "tesla",
    number: "02",
    company: "Tesla",
    location: "[Location]",
    title: "Manufacturing execution systems",
    paragraphs: ["[Context]", "[What was built and decided]", "[Outcome]"],
    tags: ["Ignition", "Python", "Java", "SCADA", "MES"],
    background: "production-line",
  },
  {
    id: "automation",
    number: "03",
    company: "Automation",
    location: "Spain",
    title: "Robotic cells for automotive",
    paragraphs: ["[Context]", "[What was built and decided]", "[Outcome]"],
    note: "Worked across all five levels of the ISA-95 automation model, from controllers to ERP.",
    tags: ["ABB", "Yaskawa", "Fanuc", "Siemens PLC", "Omron PLC"],
    background: "video",
  },
];

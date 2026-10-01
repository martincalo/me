export type StorySection = {
  heading: string;
  paragraphs: string[];
  /** Optional grouped stack (e.g. Backend / Frontend / Platform) shown under the paragraphs. */
  stack?: { label: string; items: string[] }[];
};

export type Experience = {
  slug: string;
  /** Shown before the company in the label, e.g. "Now". */
  period?: string;
  company: string;
  location: string;
  title: string;
  /** Homepage version: context, what I did, outcome. */
  paragraphs: [string, string, string];
  /** Stack tags. Omit when the story has grouped stacks: the tags are then derived from them. */
  tags?: string[];
  /** Full story at /work/<slug>. */
  story: {
    locations: string;
    sections: StorySection[];
  };
};

// Reverse chronological; each section's video is in content/media.ts.
// Text in [brackets] is still to be written by Martin.
export const experience: Experience[] = [
  {
    slug: "metrify",
    period: "Now",
    company: "Metrify",
    location: "Berlin",
    title: "Digitalizing the smart meter market",
    paragraphs: [
      "Metrify, Enpal’s metering company, is bringing the energy market’s meters into the digital age. I help build its operational and commercial systems from scratch, and then make them scale.",
      "I help design and build operational systems from a blank page to production, across backend, frontend and infrastructure. We started from an empty Azure setup: building the deployment pipelines, defining infrastructure in Terraform and deploying to Kubernetes through Argo CD.",
      "We use AI to move faster, using common sense and critical thinking.",
    ],
    story: {
      locations: "Berlin",
      sections: [
        {
          heading: "The context",
          paragraphs: [
            "Metrify is Enpal’s metering company, digitalizing the smart meter energy market. When I joined, much of the operational software didn’t exist yet.",
          ],
        },
        {
          heading: "What I do",
          paragraphs: [
            "I help design and build operational systems from a blank page to production, across backend, frontend and infrastructure. We started from an empty Azure setup: building the deployment pipelines, defining infrastructure in Terraform and deploying to Kubernetes through Argo CD. On top of that foundation sit the services the business runs on and the tools the operations team uses every day.",
          ],
          stack: [
            { label: "Backend", items: ["C#", ".NET", "FastEndpoints", "REST APIs", "PostgreSQL", "Azure Service Bus"] },
            { label: "Frontend", items: ["React", "TypeScript", "Next.js"] },
            {
              label: "Platform",
              items: ["Azure", "Terraform", "Docker", "Kubernetes", "Argo CD", "Key Vault", "Monitoring", "Observability"],
            },
          ],
        },
        {
          heading: "How I work",
          paragraphs: [
            "Building from scratch means early decisions have long consequences. The hard part is the balance: protecting the architecture so it stays scalable, reliable and maintainable, while still shipping the small changes that keep the business running today. We manage it by being deliberate about which decisions are long-term and deserve care, and which can stay simple for now. AI is part of our daily workflow, but it doesn’t replace judgment: it helps us move faster, and critical thinking and a human in the loop decide what reaches production.",
          ],
        },
        {
          heading: "The result",
          paragraphs: [
            "Not a perfect system, but one that works: it scales with the business, the team can maintain it, and it wasn’t over-engineered to get there.",
          ],
        },
      ],
    },
  },
  {
    slug: "tesla",
    company: "Tesla",
    location: "Berlin",
    title: "From machine controls to factory software",
    paragraphs: [
      "I started as a controls engineer in the Drive Unit factory in Berlin, using software to make machines more available, reliable and maintainable.",
      "In the software team, I then built a middleware on Ignition end to end, backend and frontend, connecting factory tools to the MES. I shaped it around what stakeholders asked for, working closely with the team in the Netherlands.",
      "Along the way: two months in Austin with the controls team and vendors, and site acceptance tests in Chicago and Italy.",
    ],
    tags: ["Ignition", "Jython", "Python", "Java", "REST APIs", "MES", "SCADA", "PLC", "Fanuc Robot"],
    story: {
      locations: "Berlin, Austin, Chicago, Italy",
      sections: [
        {
          heading: "The context",
          paragraphs: [
            "In a factory, a machine that stops is a production line that stops. As a controls engineer in the Drive Unit factory at Giga Berlin, my job was to use software and hardware to keep machines available, reliable and easy to maintain.",
          ],
        },
        {
          heading: "Building the middleware",
          paragraphs: [
            "In the software team, I built a middleware on the Ignition platform end to end, backend and frontend, connecting factory tools to the MES through APIs. It’s written in Jython, Python running on the Java platform. Before writing any code, I gathered requirements from stakeholders on the factory floor and worked with the team in the Netherlands to turn them into a design that fit how the factory actually works.",
          ],
        },
        {
          heading: "Austin",
          paragraphs: [
            "I spent two months at the Austin factory with the controls team, improving machine safety and working with vendors to raise machine availability and improve communication between machines and Tesla’s in-house systems. It also built a working link between the Berlin and Austin teams, so problems solved on one continent didn’t have to be solved again on the other.",
          ],
        },
        {
          heading: "On site",
          paragraphs: [
            "I ran site acceptance tests for machines in Chicago and Italy, verifying equipment against its requirements before it reached the production line.",
          ],
        },
        {
          heading: "The result",
          paragraphs: [
            "Beyond the numbers, the work made the factories easier to run and a better place to work.",
          ],
        },
      ],
    },
  },
  {
    slug: "automation",
    company: "Automation",
    location: "Spain",
    title: "Robotic cells, from simulation to start\u2011up", // non-breaking hyphen
    paragraphs: [
      "I managed automation projects for the automotive industry: robotic cells from design and programming to commissioning at client factories in several countries.",
      "I worked with mechanical and electrical teams from the design phase, using offline simulation to catch problems before they ever reached the shop floor.",
      "Worked across all five levels of the ISA-95 automation model, from controllers to ERP.",
    ],
    tags: ["ABB", "Fanuc", "Yaskawa", "Siemens & Omron PLCs", "servo drives", "HMI", "offline simulation"],
    story: {
      locations: "Spain, Portugal, France, Germany",
      sections: [
        {
          heading: "The context",
          paragraphs: [
            "In automotive, a robotic cell has to work on day one of production: every hour of delay on a client’s line is expensive. I managed automation projects end to end: design, development, programming, implementation and control of robotic cells.",
          ],
        },
        {
          heading: "What I did",
          paragraphs: [
            "I programmed and integrated ABB, Yaskawa and Fanuc robots with Omron and Siemens PLCs, servo drives and HMIs. The technology changed from project to project; the goal didn’t: a cell that performs reliably on the client’s line.",
          ],
        },
        {
          heading: "How I worked",
          paragraphs: [
            "The most valuable work happened before anything was built. I worked with mechanical and electrical engineers from the design phase and used offline simulation to find problems early — reach, collisions, cycle time — while they were still cheap to fix. [One real example of an issue you caught this way.]",
          ],
        },
        {
          heading: "On site",
          paragraphs: [
            "I commissioned cells at client factories in several countries (Portugal, France, Spain and Germany), from first power-on to production start-up.",
          ],
        },
        {
          heading: "The result",
          paragraphs: [
            "Smoother start-ups, lower project risk and satisfied clients. [One concrete result: a start-up delivered on time, a cycle-time target met, a repeat client.]",
          ],
        },
      ],
    },
  },
];

/** One stack for both the homepage section and the story page. */
export function experienceTags(item: Experience): string[] {
  const groups = item.story.sections.flatMap((section) => section.stack ?? []);
  return groups.length ? groups.flatMap((group) => group.items) : (item.tags ?? []);
}

export function findExperience(slug: string): Experience | undefined {
  return experience.find((item) => item.slug === slug);
}

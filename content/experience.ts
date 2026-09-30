export type StorySection = {
  heading: string;
  paragraphs: string[];
};

export type Experience = {
  slug: string;
  number: string;
  /** Shown before the company in the label, e.g. "Now". */
  period?: string;
  company: string;
  location: string;
  title: string;
  /** Homepage version: context, what I did, outcome. */
  paragraphs: [string, string, string];
  tags: string[];
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
    number: "01",
    period: "Now",
    company: "Metrify (Enpal)",
    location: "Berlin",
    title: "Digitalizing the smart meter market",
    paragraphs: [
      "Metrify, Enpal’s metering company, is bringing the energy market’s meters into the digital age. I help build its operational systems from scratch, and then make them scale.",
      "I work across the whole stack: C# and .NET services, React and Next.js frontends, PostgreSQL, and an Azure platform defined in Terraform and deployed with Argo CD on Kubernetes.",
      "We use AI to move faster, and critical thinking to decide what ships. [Outcome: one concrete result — what now runs reliably, at what scale.]",
    ],
    tags: ["C#", ".NET", "FastEndpoints", "React", "Next.js", "PostgreSQL", "Azure", "Terraform", "Kubernetes", "Argo CD", "Docker"],
    story: {
      locations: "Berlin",
      sections: [
        {
          heading: "The context",
          paragraphs: [
            "Metrify is Enpal’s metering company, digitalizing the smart meter energy market. When I joined, much of the operational software didn’t exist yet. [One or two sentences: what the business needed and why it was hard — volume, regulation, deadlines.]",
          ],
        },
        {
          heading: "What I do",
          paragraphs: [
            "I help design and build the operational systems from a blank page to production. On the backend that means C# and .NET services with REST APIs built on FastEndpoints, backed by PostgreSQL. On the frontend, React and TypeScript with Next.js. Underneath, everything runs on Azure: infrastructure defined as code in Terraform, containers in Docker, workloads on Kubernetes, and deployments through Argo CD.",
          ],
        },
        {
          heading: "How I work",
          paragraphs: [
            "Building from scratch means decisions have long consequences, so we favour clear boundaries, infrastructure as code and repeatable deployments over quick fixes. [One sentence on who you work with — operations, product — and how their needs shape what you build.] AI is part of our daily workflow, but it never replaces judgment: we use it to move faster, and critical thinking to decide what reaches production.",
          ],
        },
        {
          heading: "The result",
          paragraphs: ["[What exists now that didn’t before, how it scales, and one number if you can share it.]"],
        },
      ],
    },
  },
  {
    slug: "tesla",
    number: "02",
    company: "Tesla",
    location: "Berlin",
    title: "From machine controls to factory software",
    paragraphs: [
      "I started as a controls engineer in the Drive Unit factory in Berlin, using software to make machines more available, reliable and maintainable.",
      "In the software team, I then built a middleware on Ignition end to end, backend and frontend, connecting factory tools to the MES. I shaped it around what stakeholders asked for, working closely with the team in the Netherlands.",
      "Along the way: two months in Austin with the controls team and vendors, and site acceptance tests in Chicago and Italy. [Outcome: one concrete result.]",
    ],
    tags: ["Ignition", "Jython", "Python", "Java", "REST APIs", "MES", "SCADA", "PLC"],
    story: {
      locations: "Berlin, Austin, Chicago, Italy",
      sections: [
        {
          heading: "The context",
          paragraphs: [
            "In a factory, a machine that stops is a production line that stops. In the Drive Unit factory at Giga Berlin, my job as a controls engineer was to use software to keep machines available, reliable and easy to maintain. [One example of a problem you fixed.]",
          ],
        },
        {
          heading: "Building the middleware",
          paragraphs: [
            "In the software team, I built a middleware on the Ignition platform from end to end, backend and frontend, that connects factory tools to the MES through APIs. It’s written in Jython, which runs Python on the Java platform. Before writing code, I listened: I gathered requests from stakeholders on the factory floor and worked with the team in the Netherlands to turn them into something that fit how the factory actually works. [What the middleware made possible, and for how many tools or lines.]",
          ],
        },
        {
          heading: "Austin",
          paragraphs: [
            "I spent two months at the Austin factory working with the controls team. I helped improve [security / safety] and shared knowledge with vendors, to raise machine availability and improve communication between machines and Tesla’s in-house systems.",
          ],
        },
        {
          heading: "On site",
          paragraphs: [
            "I also ran site acceptance tests for machines in Chicago and Italy, verifying the equipment against its requirements.",
          ],
        },
        {
          heading: "The result",
          paragraphs: [
            "[What changed: availability, fewer stoppages, faster integration of new tools — one number if you can share it.]",
          ],
        },
      ],
    },
  },
  {
    slug: "automation",
    number: "03",
    company: "Automation",
    location: "Spain",
    title: "Robotic cells, from simulation to start-up",
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

export function findExperience(slug: string): Experience | undefined {
  return experience.find((item) => item.slug === slug);
}

import type { StaticImageData } from "next/image";
import aiEngineering from "@/assets/books/ai-engineering.jpg";
import cleanArchitecture from "@/assets/books/clean-architecture.jpg";
import ddia from "@/assets/books/ddia.jpg";
import nexus from "@/assets/books/nexus.jpg";

export type Book = {
  title: string;
  /** Front cover, from Open Library (covers.openlibrary.org) by ISBN. */
  cover: StaticImageData;
  author: string;
  takeaway: string;
  beyondEngineering?: boolean;
};

// Takeaways: Clean Architecture and Nexus are Martin's words; DDIA and AI
// Engineering are drafts for Martin to confirm.
export const books: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    cover: ddia,
    author: "Martin Kleppmann",
    takeaway:
      "How data systems behave when things go wrong: replication, consistency and the trade-offs behind them. The lens I use for event-driven services.",
  },
  {
    title: "Clean Architecture",
    cover: cleanArchitecture,
    author: "Robert C. Martin",
    takeaway:
      "Keep the big picture in view: clear boundaries, with the domain at the centre, modelled with Domain-Driven Design.",
  },
  {
    title: "AI Engineering",
    cover: aiEngineering,
    author: "Chip Huyen",
    takeaway:
      "What it takes to move AI from demo to production: evaluation, guardrails and the trade-offs of building on foundation models.",
  },
  {
    title: "Nexus",
    cover: nexus,
    author: "Yuval Noah Harari",
    takeaway: "Bring critical thinking, morals and ethics to the technology I build.",
    beyondEngineering: true,
  },
];

const beyond = books.filter((book) => book.beyondEngineering).length;
if (beyond !== 1) {
  throw new Error(`content/books.ts: exactly one "beyond engineering" book expected, found ${beyond}`);
}

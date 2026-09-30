export type Book = {
  title: string;
  author: string;
  takeaway: string;
  beyondEngineering?: boolean;
};

// Takeaways: Clean Architecture and Nexus are Martin's words; DDIA and AI
// Engineering are drafts for Martin to confirm.
export const books: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    takeaway:
      "How data systems behave when things go wrong: replication, consistency and the trade-offs behind them. The lens I use for event-driven services.",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    takeaway:
      "Keep the big picture in view: clear boundaries, with the domain at the centre, modelled with Domain-Driven Design.",
  },
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    takeaway:
      "What it takes to move AI from demo to production: evaluation, guardrails and the trade-offs of building on foundation models.",
  },
  {
    title: "Nexus",
    author: "Yuval Noah Harari",
    takeaway: "Bring critical thinking, morals and ethics to the technology I build.",
    beyondEngineering: true,
  },
];

const beyond = books.filter((book) => book.beyondEngineering).length;
if (beyond !== 1) {
  throw new Error(`content/books.ts: exactly one "beyond engineering" book expected, found ${beyond}`);
}

export type Book = {
  title: string;
  author: string;
  takeaway: string;
  beyondEngineering?: boolean;
};

export const books: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    takeaway: "[Takeaway]",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    takeaway: "[Takeaway]",
  },
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    takeaway: "[Takeaway]",
  },
  {
    title: "[Harari book]",
    author: "Yuval Noah Harari",
    takeaway: "[Takeaway]",
    beyondEngineering: true,
  },
];

const beyond = books.filter((book) => book.beyondEngineering).length;
if (beyond !== 1) {
  throw new Error(`content/books.ts: exactly one "beyond engineering" book expected, found ${beyond}`);
}

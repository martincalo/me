import Image from "next/image";
import type { Book } from "@/content/books";

// On the graphite stage, like the Work sections above it.
export function Bookshelf({ books }: { books: Book[] }) {
  return (
    <section id="books" aria-labelledby="books-heading" className="stage">
      <div className="container-page border-t border-stage-muted/20 py-20 md:py-32">
        <h2 id="books-heading" className="text-3xl font-medium tracking-tight md:text-4xl">
          Bookshelf
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {books.map((book) => (
            <li
              key={book.title}
              className="flex gap-5 rounded-2xl border border-stage-muted/20 bg-stage-panel p-6"
            >
              {/* The cover repeats the title, so it's decorative for screen readers. */}
              <Image
                src={book.cover}
                alt=""
                sizes="4rem"
                className="h-auto w-14 shrink-0 self-start rounded-md border border-stage-muted/30 md:w-16"
              />
              <div>
                <h3 className="text-lg font-medium">{book.title}</h3>
                <p className="text-meta mt-1 text-stage-muted">{book.author}</p>
                <p className="mt-4 text-stage-muted">{book.takeaway}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

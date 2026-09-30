import Image from "next/image";
import type { Book } from "@/content/books";

export function Bookshelf({ books }: { books: Book[] }) {
  return (
    <section id="books" aria-labelledby="books-heading" className="container-page py-20 md:py-32">
      <h2 id="books-heading" className="text-3xl font-medium tracking-tight md:text-4xl">
        Bookshelf
      </h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {books.map((book) => (
          <li key={book.title} className="flex gap-5 rounded-2xl border border-line bg-surface p-6">
            {/* The cover repeats the title, so it's decorative for screen readers. */}
            <Image
              src={book.cover}
              alt=""
              sizes="4rem"
              className="h-auto w-14 shrink-0 self-start rounded-md border border-line md:w-16"
            />
            <div>
              {/* The label shares the title's line so all four titles align. */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-medium">{book.title}</h3>
                {book.beyondEngineering && <p className="text-meta text-label">beyond engineering</p>}
              </div>
              <p className="text-meta mt-1 text-label">{book.author}</p>
              <p className="mt-4 text-ink-muted">{book.takeaway}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

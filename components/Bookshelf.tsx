import type { Book } from "@/content/books";

export function Bookshelf({ books }: { books: Book[] }) {
  return (
    <section id="books" aria-labelledby="books-heading" className="container-page py-20 md:py-32">
      <h2 id="books-heading" className="text-3xl font-medium tracking-tight md:text-4xl">
        Bookshelf
      </h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {books.map((book) => (
          <li key={book.title} className="rounded-2xl border border-line bg-surface p-6">
            {book.beyondEngineering && (
              <p className="text-meta mb-3 text-label">beyond engineering</p>
            )}
            <h3 className="text-lg font-medium">{book.title}</h3>
            <p className="text-meta mt-1 text-label">{book.author}</p>
            <p className="mt-4 text-ink-muted">{book.takeaway}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";

const nav = [
  { href: "/#work", label: "work" },
  { href: "/#books", label: "books" },
  { href: "/#contact", label: "contact" },
];

export function Header() {
  return (
    <header className="container-page flex flex-wrap items-center justify-between gap-x-8 py-4">
      <Link href="/" className="inline-flex min-h-11 items-center font-mono text-sm tracking-tight">
        martin calo
      </Link>
      <nav aria-label="Main">
        <ul className="text-meta flex gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center text-label hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

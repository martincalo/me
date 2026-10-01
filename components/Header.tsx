import Link from "next/link";

const nav = [
  { href: "/#work", label: "work" },
  { href: "/#contact", label: "contact" },
];

/**
 * `overlay`: laid over the homepage hero so the concrete wall shows behind it
 * (darker nav text for contrast on the wall).
 */
export function Header({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={`container-page flex flex-wrap items-center justify-between gap-x-8 py-4 ${
        overlay ? "absolute inset-x-0 top-0 z-20" : ""
      }`}
    >
      <Link href="/" className="inline-flex min-h-11 items-center font-mono text-sm tracking-tight">
        martin calo
      </Link>
      <nav aria-label="Main">
        <ul className="text-meta flex gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center hover:text-ink ${overlay ? "text-ink-muted" : "text-label"}`}
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

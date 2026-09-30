import { profile } from "@/content/profile";

export function Footer() {
  // Static page: the year is fixed at build time.
  const year = new Date().getFullYear();

  return (
    <footer className="container-page text-meta border-t border-line py-8 text-center text-label">
      <p>
        © {year} {profile.name}
      </p>
    </footer>
  );
}

import { profile } from "@/content/profile";
import { StatusDot } from "./StatusDot";

export function Footer() {
  // Static page: the year is fixed at build time.
  const year = new Date().getFullYear();

  return (
    <footer className="container-page text-meta flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-label">
      <p className="flex items-center gap-3">
        <StatusDot />
        All systems operational
      </p>
      <p>
        © {year} {profile.name}
      </p>
    </footer>
  );
}

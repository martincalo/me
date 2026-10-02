import { profile } from "@/content/profile";

/** `stage`: styled as a homepage chapter (cream in light, graphite in dark). */
export function Footer({ stage = false }: { stage?: boolean }) {
  // Static page: the year is fixed at build time.
  const year = new Date().getFullYear();

  return (
    <footer className={stage ? "chapter" : ""}>
      <div
        className={`container-page text-meta border-t py-8 text-center ${
          stage ? "border-stage-muted/20 text-stage-muted" : "border-line text-label"
        }`}
      >
        <p>
          © {year} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}

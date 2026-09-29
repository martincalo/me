import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page py-24 md:py-40">
      <p className="text-meta text-label">404 · delivery failed after max retries</p>
      <h1 className="measure mt-6 text-5xl font-medium tracking-tight md:text-7xl">
        This page was dead-lettered.
      </h1>
      <p className="measure mt-6 text-ink-muted">
        The message never reached a consumer. Nothing is lost, it’s just not here.
      </p>
      <p className="mt-8">
        <Link href="/" className="link">
          Back to the homepage
        </Link>
      </p>
    </section>
  );
}

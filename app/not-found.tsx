import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        The link may be outdated, or the page may have been moved.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-md border border-accent/40 bg-accent/10 px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex min-h-10 items-center rounded-md border border-line px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent/40 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          Writing
        </Link>
      </div>
    </main>
  );
}

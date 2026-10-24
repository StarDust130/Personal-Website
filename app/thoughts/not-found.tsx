import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Post not found",
  description: "The article you are looking for does not exist or has moved.",
  robots: { index: false, follow: false },
};

export default function BlogNotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-5 py-24 sm:px-10"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        404 / Thoughts
      </p>

      <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-paper">
        That article isn&apos;t here.
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        The link may be outdated, or the post may have moved. The thoughts index
        has everything that is currently published.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/thoughts"
          className="inline-flex min-h-10 items-center rounded-md border border-accent/40 bg-accent/10 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          All thoughts
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-md border border-line px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/40 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          Home
        </Link>
      </div>
    </main>
  );
}

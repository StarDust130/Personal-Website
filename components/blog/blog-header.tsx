import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLink =
  "inline-flex min-h-10 items-center font-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="mx-auto flex h-14 w-full max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-10">
        <Link
          href="/"
          className="group inline-flex min-h-10 items-center gap-2.5 text-[13px] font-medium tracking-[-0.01em] text-paper transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label={`${siteConfig.author} — home`}
        >
          <Image
            src={siteConfig.avatar}
            alt=""
            width={24}
            height={24}
            priority
            className="size-6 rounded-md border border-line object-cover"
          />
          <span className="hidden min-[380px]:inline">
            {siteConfig.author}
          </span>
        </Link>

        <nav aria-label="Thoughts navigation" className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className={`${navLink} text-muted hover:text-paper`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            aria-current="page"
            className={`${navLink} border-b border-accent/70 text-paper`}
          >
            Thoughts
          </Link>
        </nav>
      </div>
    </header>
  );
}

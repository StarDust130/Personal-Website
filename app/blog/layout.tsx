import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import BlogHeader from "@/components/blog/blog-header";
import { siteConfig } from "@/lib/site";

const footerLink =
  "transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:border focus:border-accent/50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.14em] focus:text-paper"
      >
        Skip to content
      </a>

      <BlogHeader />
      <div className="flex flex-1 flex-col">{children}</div>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            © {new Date().getFullYear()} {siteConfig.author}
          </p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            <Link href="/" className={footerLink}>
              Home
            </Link>
            <Link href="/blog" className={footerLink}>
              Writing
            </Link>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLink} inline-flex items-center gap-1.5`}
            >
              <FaGithub aria-hidden="true" className="size-3.5" />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLink} inline-flex items-center gap-1.5`}
            >
              <FaXTwitter aria-hidden="true" className="size-3" />
              X
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

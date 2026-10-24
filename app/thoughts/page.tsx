import type { Metadata } from "next";
import Link from "next/link";
import PostList from "@/components/blog/post-list";
import { getAllPosts, getBlogIndex } from "@/lib/blog";
import { absoluteUrl, postPath, siteConfig } from "@/lib/site";

const description = siteConfig.writingDescription;

export const metadata: Metadata = {
  title: "Thoughts",
  description,
  alternates: {
    canonical: "/thoughts",
  },
  openGraph: {
    title: `Thoughts — ${siteConfig.author}`,
    description,
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/thoughts"),
    siteName: siteConfig.author,
    images: [
      {
        url: absoluteUrl("/thoughts/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `Thoughts — ${siteConfig.author}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Thoughts — ${siteConfig.author}`,
    description,
    images: [absoluteUrl("/thoughts/opengraph-image")],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const entries = getBlogIndex(posts);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Thoughts — ${siteConfig.author}`,
    description,
    url: absoluteUrl("/thoughts"),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    blogPost: entries.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || undefined,
      url: absoluteUrl(postPath(post.slug)),
      mainEntityOfPage: absoluteUrl(postPath(post.slug)),
      datePublished:
        post.date,
      dateModified: post.updatedDate,
      image: post.previewImage ? absoluteUrl(post.previewImage) : undefined,
      author: {
        "@type": "Person",
        name: post.author ?? siteConfig.author,
        url: siteConfig.url,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Thoughts",
        item: absoluteUrl("/thoughts"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />

      <main
        id="main-content"
        className="mx-auto w-full max-w-[80rem] flex-1 px-5 pb-20 pt-10 sm:px-10 sm:pt-12"
      >
        <header className="grid gap-6 border-b border-line pb-8 sm:pb-9 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              Thoughts
            </p>

            <h1 className="mt-4 max-w-[16ch] text-balance font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.025em] text-paper">
              Things I&apos;ve been thinking about.
            </h1>
          </div>

          <p className="max-w-[56ch] text-[14px] leading-[1.75] text-muted sm:text-[15px] lg:pb-1">
            {description}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="mt-12 border-b border-line pb-12">
            <p className="font-display text-2xl text-paper">
              No thoughts yet.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Add a Markdown file to{" "}
              <code className="rounded border border-line bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.8em] text-paper">
                content/blog
              </code>{" "}
              to publish thoughts.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-10 items-center rounded-md border border-line px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              Back home
            </Link>
          </div>
        ) : (
          <PostList posts={entries} />
        )}
      </main>
    </>
  );
}

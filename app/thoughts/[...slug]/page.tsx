import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getToc,
} from "@/lib/blog";
import {
  absoluteUrl,
  imageUrl,
  postPath,
  siteConfig,
} from "@/lib/site";
import { formatDate } from "@/lib/format";
import ArticleNav from "@/components/blog/article-nav";
import ReadingRail from "@/components/blog/reading-rail";
import MobileToc, {
  MobileProgress,
} from "@/components/blog/mobile-toc";
import ArticleCover from "@/components/blog/article-cover";
import PostContent from "@/components/blog/post-content";
import BackToTop from "@/components/blog/back-to-top";
import ShareButtons from "@/components/blog/share-buttons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const url = absoluteUrl(postPath(post.slug));
  const author = post.author ?? siteConfig.author;
  const imageAlt = post.coverAlt ?? post.title;
  const images = post.cover
    ? [{ url: imageUrl(post.cover), alt: imageAlt }]
    : [
        {
          url: absoluteUrl("/thoughts/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `Thoughts — ${siteConfig.author}`,
        },
      ];

  return {
    title: post.title,
    description: post.description || undefined,
    alternates: {
      canonical: postPath(post.slug),
    },
    authors: [{ name: author, url: siteConfig.url }],
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: "article",
      publishedTime:
        post.date,
      modifiedTime: post.updatedDate,
      url,
      siteName: siteConfig.author,
      locale: "en_US",
      authors: [author],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || undefined,
      images: images.map((image) => image.url),
    },
    other: {
      "article:publisher": siteConfig.url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const toc = getToc(post.content);
  const { prev, next } = getAdjacentPosts(post.slug);
  const author = post.author ?? siteConfig.author;
  const url = absoluteUrl(postPath(post.slug));
  const cover = post.cover;
  const socialImage = post.cover
    ? imageUrl(post.cover)
    : absoluteUrl("/thoughts/opengraph-image");
  const headerDate = post.updatedDate ?? post.date;
  const headerDateLabel = post.updatedDate ? "Updated" : "Published";

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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || undefined,
    datePublished:
      post.date,
    dateModified: post.updatedDate,
    timeRequired: `PT${post.readMinutes}M`,
    author: {
      "@type": "Person",
      name: author,
      url: siteConfig.url,
      sameAs: [siteConfig.socials.x, siteConfig.socials.github],
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.avatar),
      },
    },
    url,
    image: [socialImage],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "en",
    isAccessibleForFree: true,
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

      <ArticleNav items={toc}>
        <MobileProgress />
        <BackToTop />

        <main
          id="main-content"
          className="mx-auto w-full max-w-[80rem] flex-1 px-5 pb-24 pt-7 sm:px-10 sm:pt-9"
        >
          <div className="relative mx-auto w-full max-w-[45rem]">
            <ReadingRail />

            <article className="min-w-0">
              <Link
                href="/thoughts"
                className="inline-flex min-h-9 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-3.5"
                  strokeWidth={1.5}
                />
                Thoughts
              </Link>

              <header className="mt-5">
                <h1 className="text-balance font-display text-[clamp(2.4rem,4.3vw,3.85rem)] leading-[1.02] tracking-[-0.025em] text-paper">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="mt-4 text-[15px] leading-[1.7] text-muted sm:text-base">
                    {post.description}
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={siteConfig.avatar}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 shrink-0 rounded-full border border-line object-cover"
                    />

                    <div className="min-w-0">
                      <p className="text-[12.5px] text-paper">{author}</p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                        {headerDate && (
                          <>
                            <span>
                              <time dateTime={headerDate}>
                                <span>{headerDateLabel} </span>
                                {formatDate(headerDate)}
                              </time>
                            </span>
                            <span aria-hidden="true" className="text-faint">
                              /
                            </span>
                          </>
                        )}
                        <span>{post.readMinutes} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <ShareButtons url={url} title={post.title} />
                  </div>
                </div>
              </header>

              {cover && (
                <ArticleCover
                  src={cover}
                  alt={post.coverAlt}
                  caption={post.coverCaption}
                />
              )}

              <div className="mt-9">
                <MobileToc />

                <div id="article-body" data-article-body>
                  <PostContent content={post.content} />
                </div>
              </div>

              {(prev || next) && (
                <nav
                  aria-label="Article navigation"
                  className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-2"
                >
                  {prev && (
                    <Link
                      href={postPath(prev.slug)}
                      className="group min-w-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        <ArrowLeft
                          aria-hidden="true"
                          className="size-3 transition-transform group-hover:-translate-x-0.5"
                          strokeWidth={1.5}
                        />
                        Newer
                      </span>
                      <span className="mt-2 block font-display text-lg leading-snug text-paper transition-colors group-hover:text-accent">
                        {prev.title}
                      </span>
                    </Link>
                  )}

                  {next && (
                    <Link
                      href={postPath(next.slug)}
                      className={`group min-w-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                        prev ? "sm:text-right" : "sm:col-start-2 sm:text-right"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:justify-end">
                        Older
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                      <span className="mt-2 block font-display text-lg leading-snug text-paper transition-colors group-hover:text-accent">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </article>
          </div>
        </main>
      </ArticleNav>
    </>
  );
}

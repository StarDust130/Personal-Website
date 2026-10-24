"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import PostCardMedia from "@/components/blog/post-card-media";
import { formatShortDate } from "@/lib/format";
import { postPath } from "@/lib/site";
import { filterPosts, normalizeQuery } from "@/lib/search";
import type { BlogIndexEntry } from "@/lib/blog";

type BlogView = "cards" | "list";
type CardVariant = "featured" | "standard" | "compact";

const VIEW_STORAGE_KEY = "blog-view-v1";

const cardShell =
  "group flex flex-col overflow-hidden rounded-lg border border-line bg-white/[0.015] transition-[border-color,background-color] duration-200 hover:border-accent/30 hover:bg-white/[0.028] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

function syncUrl(query: string) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const normalizedQuery = normalizeQuery(query);

  url.searchParams.delete("tag");

  if (normalizedQuery) {
    url.searchParams.set("q", normalizedQuery);
  } else {
    url.searchParams.delete("q");
  }

  window.history.replaceState(null, "", url);
}

function PostDate({ post }: { post: BlogIndexEntry }) {
  const date = post.updatedDate ?? post.date;

  if (!date) {
    return null;
  }

  const formatted = formatShortDate(date);

  if (!formatted) {
    return null;
  }

  return (
    <time dateTime={date}>
      <span>{post.updatedDate ? "Updated " : "Published "}</span>
      {formatted}
    </time>
  );
}

function PostMeta({
  post,
  className = "",
}: {
  post: BlogIndexEntry;
  className?: string;
}) {
  const hasDate = Boolean(post.date ?? post.updatedDate);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.13em] text-muted ${className}`}
    >
      {hasDate && (
        <>
          <PostDate post={post} />
          <span aria-hidden="true" className="text-faint">
            /
          </span>
        </>
      )}
      <span>{post.readMinutes} min read</span>
    </div>
  );
}

function PostCopy({
  post,
  variant,
}: {
  post: BlogIndexEntry;
  variant: CardVariant;
}) {
  const titleClass =
    variant === "featured"
      ? "text-[1.9rem] leading-[1.08] sm:text-[2.2rem] lg:text-[2.55rem]"
      : variant === "compact"
        ? "text-[1.65rem] leading-[1.1] sm:text-[1.85rem]"
        : "text-[1.5rem] leading-[1.12] sm:text-[1.7rem]";

  const padding =
    variant === "featured" ? "p-5 sm:p-6 lg:p-7" : "p-5 sm:p-6";

  return (
    <div className={`flex flex-col ${padding}`}>
      <h3
        className={`text-balance font-display tracking-[-0.02em] text-paper transition-colors duration-200 group-hover:text-accent ${titleClass}`}
      >
        {post.title}
      </h3>

      {post.description && (
        <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-[1.7] text-muted sm:text-sm">
          {post.description}
        </p>
      )}

      <PostMeta post={post} className="mt-5" />
    </div>
  );
}

function FeaturedPost({
  post,
  priority,
}: {
  post: BlogIndexEntry;
  priority: boolean;
}) {
  return (
    <article className="min-w-0 self-start">
      <Link href={postPath(post.slug)} className={cardShell}>
        {post.previewImage && (
          <PostCardMedia
            src={post.previewImage}
            alt={post.previewImageAlt ?? ""}
            priority={priority}
            className="aspect-[4/3]"
          />
        )}
        <PostCopy
          post={post}
          variant={post.previewImage ? "featured" : "compact"}
        />
      </Link>
    </article>
  );
}

function TallPost({
  post,
  priority,
}: {
  post: BlogIndexEntry;
  priority: boolean;
}) {
  return (
    <article className="min-w-0 self-start">
      <Link href={postPath(post.slug)} className={cardShell}>
        {post.previewImage && (
          <PostCardMedia
            src={post.previewImage}
            alt={post.previewImageAlt ?? ""}
            priority={priority}
            className="aspect-[16/10]"
          />
        )}
        <PostCopy post={post} variant="standard" />
      </Link>
    </article>
  );
}

function CompactPost({ post }: { post: BlogIndexEntry }) {
  return (
    <article className="min-w-0 self-start">
      <Link href={postPath(post.slug)} className={cardShell}>
        {post.previewImage && (
          <PostCardMedia
            src={post.previewImage}
            alt={post.previewImageAlt ?? ""}
            className="aspect-[16/9]"
          />
        )}
        <PostCopy post={post} variant="compact" />
      </Link>
    </article>
  );
}

function StandardPost({
  post,
  priority,
  className = "",
}: {
  post: BlogIndexEntry;
  priority: boolean;
  className?: string;
}) {
  return (
    <article className={`min-w-0 self-start ${className}`}>
      <Link href={postPath(post.slug)} className={cardShell}>
        {post.previewImage && (
          <PostCardMedia
            src={post.previewImage}
            alt={post.previewImageAlt ?? ""}
            priority={priority}
            className="aspect-[16/10]"
          />
        )}
        <PostCopy post={post} variant="standard" />
      </Link>
    </article>
  );
}

function MorePosts({ posts }: { posts: BlogIndexEntry[] }) {
  return (
    <section
      aria-label="More thoughts"
      className="mt-5 columns-1 gap-5 md:columns-2"
    >
      {posts.map((post) => (
        <StandardPost
          key={post.slug}
          post={post}
          priority={false}
          className="mb-5 break-inside-avoid"
        />
      ))}
    </section>
  );
}

function BentoPosts({ posts }: { posts: BlogIndexEntry[] }) {
  const [featured, second, third, ...rest] = posts;

  return (
    <>
      <section
        aria-label="Featured thoughts"
        className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      >
        <FeaturedPost post={featured} priority />
        <div className="grid content-start gap-5">
          <TallPost post={second} priority={false} />
          <CompactPost post={third} />
        </div>
      </section>

      {rest.length > 0 && <MorePosts posts={rest} />}
    </>
  );
}

function ResultPosts({ posts }: { posts: BlogIndexEntry[] }) {
  if (posts.length === 1) {
    return (
      <section aria-label="Thoughts" className="mt-6 max-w-[42rem]">
        <StandardPost post={posts[0]} priority />
      </section>
    );
  }

  return (
    <section
      aria-label="Thoughts"
      className="mt-6 grid items-start gap-5 md:grid-cols-2"
    >
      {posts.map((post, index) => (
        <StandardPost
          key={post.slug}
          post={post}
          priority={index === 0}
        />
      ))}
    </section>
  );
}

function CardsView({ posts }: { posts: BlogIndexEntry[] }) {
  if (posts.length >= 3) return <BentoPosts posts={posts} />;
  return <ResultPosts posts={posts} />;
}

function ListHeader() {
  return (
    <div
      aria-hidden="true"
      className="hidden border-b border-line pb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-faint md:grid md:grid-cols-[minmax(0,1fr)_9rem_5rem] md:gap-6"
    >
      <span>Thoughts</span>
      <span className="text-right">Date</span>
      <span className="text-right">Read</span>
    </div>
  );
}

function ListPost({ post }: { post: BlogIndexEntry }) {
  return (
    <li className="border-b border-line">
      <Link
        href={postPath(post.slug)}
        className="group grid gap-2.5 py-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent md:grid-cols-[minmax(0,1fr)_9rem_5rem] md:items-start md:gap-6"
      >
        <div className="min-w-0">
          <h3 className="text-balance font-display text-[1.3rem] leading-snug tracking-[-0.01em] text-paper transition-colors duration-200 group-hover:text-accent sm:text-[1.4rem]">
            {post.title}
          </h3>

          {post.description && (
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.65] text-muted">
              {post.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.13em] text-muted md:contents">
          <span className="md:col-start-2 md:whitespace-nowrap md:pt-1.5 md:text-right">
            <PostDate post={post} />
          </span>
          <span className="md:col-start-3 md:pt-1.5 md:text-right">
            {post.readMinutes} min
          </span>
        </div>
      </Link>
    </li>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: BlogView;
  onChange: (view: BlogView) => void;
}) {
  const options = [
    { value: "cards" as const, label: "Cards", Icon: LayoutGrid },
    { value: "list" as const, label: "List", Icon: List },
  ];

  return (
    <div
      role="group"
      aria-label="Thoughts layout"
      className="inline-flex shrink-0 rounded-lg border border-line bg-white/[0.02] p-0.5"
    >
      {options.map(({ value, label, Icon }) => {
        const selected = view === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-label={`${label} view`}
            aria-pressed={selected}
            className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
              selected
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-white/[0.04] hover:text-paper"
            }`}
          >
            <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function PostList({ posts }: { posts: BlogIndexEntry[] }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<BlogView>("cards");
  const searchRef = useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

  const filteredPosts = useMemo(
    () => filterPosts(posts, deferredQuery),
    [posts, deferredQuery]
  );

  const normalizedQuery = normalizeQuery(query);
  const hasQuery = Boolean(normalizedQuery);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
        if (stored === "cards" || stored === "list") setView(stored);
      } catch {
        return;
      }
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawQuery = params.get("q") ?? "";
    const legacyTag = params.get("tag");

    if (!rawQuery && !legacyTag) return;

    queueMicrotask(() => {
      if (rawQuery) setQuery(rawQuery);
      syncUrl(rawQuery);
    });
  }, []);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function changeView(nextView: BlogView) {
    setView(nextView);

    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, nextView);
    } catch {
      return;
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    syncUrl(value);
  }

  function clearQuery() {
    setQuery("");
    syncUrl("");
    searchRef.current?.focus();
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Escape") return;

    if (query) {
      event.preventDefault();
      clearQuery();
    } else {
      event.currentTarget.blur();
    }
  }

  return (
    <section
      id="blog-posts"
      aria-labelledby="post-list-heading"
      className="mt-8"
    >
      <h2 id="post-list-heading" className="sr-only">
        All thoughts
      </h2>

      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="search" className="w-full lg:max-w-md">
          <label htmlFor="blog-search" className="sr-only">
            Search thoughts
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint"
            />
            <input
              ref={searchRef}
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search thoughts…"
              autoComplete="off"
              spellCheck={false}
              aria-keyshortcuts="/"
              aria-controls="blog-post-list"
              className="h-10 w-full rounded-lg border border-line bg-white/[0.02] pl-10 pr-20 font-sans text-sm text-paper outline-none transition-colors placeholder:text-muted focus:border-accent/50 focus:bg-white/[0.03] focus:ring-2 focus:ring-accent/15"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {query && (
                <button
                  type="button"
                  onClick={clearQuery}
                  aria-label="Clear search"
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/[0.05] hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
              <kbd
                aria-hidden="true"
                className="hidden h-6 min-w-6 items-center justify-center rounded border border-line bg-white/[0.03] px-1.5 font-mono text-[10px] text-muted sm:inline-flex"
              >
                /
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-[10px] tabular-nums uppercase tracking-[0.12em] text-muted"
          >
            {hasQuery
              ? `${filteredPosts.length} of ${posts.length} ${
                  posts.length === 1 ? "post" : "posts"
                }`
              : `${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
          </p>

          <ViewToggle view={view} onChange={changeView} />
        </div>
      </div>

      <div id="blog-post-list">
        {filteredPosts.length === 0 ? (
          <div className="py-14">
            <p role="status" className="font-display text-2xl text-paper">
              Nothing matches that search.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              No thoughts mention “{normalizedQuery}”. Try a shorter phrase or a
              different word.
            </p>
            <button
              type="button"
              onClick={clearQuery}
              className="mt-5 inline-flex min-h-10 items-center rounded-md border border-line bg-white/[0.03] px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              Clear search
            </button>
          </div>
        ) : view === "cards" ? (
          <CardsView posts={filteredPosts} />
        ) : (
          <div className="mt-4">
            <ListHeader />
            <ol>
              {filteredPosts.map((post) => (
                <ListPost key={post.slug} post={post} />
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

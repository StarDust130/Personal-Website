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
import { ArrowUpRight, LayoutGrid, List, Search, X } from "lucide-react";
import PostCardMedia from "@/components/blog/post-card-media";
import { formatShortDate, isNewPost } from "@/lib/format";
import { postPath } from "@/lib/site";
import { filterPosts, normalizeQuery } from "@/lib/search";
import type { BlogIndexEntry } from "@/lib/blog";

type BlogView = "cards" | "list";

const VIEW_STORAGE_KEY = "blog-view-v1";

const cardShell =
  "group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white/[0.018] transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-white/[0.032] hover:shadow-[0_24px_60px_-34px_rgba(0,0,0,0.95)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent motion-reduce:transform-none motion-reduce:transition-none";

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

function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.12] px-2 py-1 font-mono text-[9px] font-medium uppercase leading-none tracking-[0.14em] text-accent ${className}`}
    >
      <span
        aria-hidden="true"
        className="size-1 animate-breathe rounded-full bg-accent"
      />
      New
    </span>
  );
}

function PostTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul aria-label="Tags" className="mt-4 flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function PostCardContent({
  post,
  isNew,
}: {
  post: BlogIndexEntry;
  isNew: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="flex min-h-5 items-center justify-between gap-3">
        <div>{isNew && <NewBadge />}</div>
        <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
          {post.readMinutes} min read
        </span>
      </div>

      <h3 className="mt-3 text-balance font-display text-[1.45rem] leading-[1.14] tracking-[-0.015em] text-paper transition-colors duration-200 group-hover:text-accent sm:text-[1.6rem]">
        {post.title}
      </h3>

      {post.description && (
        <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-[1.7] text-muted sm:text-sm">
          {post.description}
        </p>
      )}

      <PostTags tags={post.tags} />

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <div className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
          <PostDate post={post} />
        </div>

        <span
          aria-hidden="true"
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent"
        >
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </div>
  );
}

function PostCard({
  post,
  priority,
  isNew,
}: {
  post: BlogIndexEntry;
  priority: boolean;
  isNew: boolean;
}) {
  return (
    <article className="h-full min-w-0">
      <Link href={postPath(post.slug)} className={cardShell}>
        {post.previewImage && (
          <PostCardMedia
            src={post.previewImage}
            alt={post.previewImageAlt ?? ""}
            priority={priority}
            className="aspect-[16/10] shrink-0"
          />
        )}
        <PostCardContent post={post} isNew={isNew} />
      </Link>
    </article>
  );
}

function gridClasses(postCount: number): string {
  if (postCount === 1) return "max-w-[34rem]";
  if (postCount === 3) return "sm:grid-cols-2 lg:grid-cols-3";
  if (postCount === 2 || postCount === 4) return "sm:grid-cols-2";
  return "sm:grid-cols-2 xl:grid-cols-3";
}

function PostGrid({
  posts,
  now,
}: {
  posts: BlogIndexEntry[];
  now: number;
}) {
  return (
    <section
      aria-label="Thoughts"
      className={`mt-6 grid items-stretch gap-5 ${gridClasses(posts.length)}`}
    >
      {posts.map((post, index) => (
        <PostCard
          key={post.slug}
          post={post}
          priority={index === 0}
          isNew={isNewPost(post.date ?? post.updatedDate, now)}
        />
      ))}
    </section>
  );
}

function ListHeader() {
  return (
    <div
      aria-hidden="true"
      className="-mx-3 hidden border-b border-line px-3 pb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-faint md:grid md:grid-cols-[minmax(0,1fr)_9rem_5rem] md:gap-6"
    >
      <span>Thoughts</span>
      <span className="text-right">Date</span>
      <span className="text-right">Read</span>
    </div>
  );
}

function ListPost({ post, isNew }: { post: BlogIndexEntry; isNew: boolean }) {
  return (
    <li className="border-b border-line">
      <Link
        href={postPath(post.slug)}
        className="group -mx-3 grid gap-2.5 rounded-lg px-3 py-5 transition-colors hover:bg-white/[0.022] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent md:grid-cols-[minmax(0,1fr)_9rem_5rem] md:items-start md:gap-6"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-balance font-display text-[1.3rem] leading-snug tracking-[-0.01em] text-paper transition-colors duration-200 group-hover:text-accent sm:text-[1.4rem]">
              {post.title}
            </h3>
            {isNew && <NewBadge />}
          </div>

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
  const [now, setNow] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

  const filteredPosts = useMemo(
    () => filterPosts(posts, deferredQuery),
    [posts, deferredQuery]
  );

  const normalizedQuery = normalizeQuery(query);
  const hasQuery = Boolean(normalizedQuery);

  useEffect(() => {
    queueMicrotask(() => setNow(Date.now()));
  }, []);

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
          <PostGrid posts={filteredPosts} now={now} />
        ) : (
          <div className="mt-4">
            <ListHeader />
            <ol>
              {filteredPosts.map((post) => (
                <ListPost
                  key={post.slug}
                  post={post}
                  isNew={isNewPost(post.date ?? post.updatedDate, now)}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

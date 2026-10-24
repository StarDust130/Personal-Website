# Chandrashekhar Yadav — personal website

A Next.js portfolio and writing site. Writing is discovered automatically from
Markdown files in `content/blog`.

## Development

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Writing

Add a `.md` or `.mdx` file anywhere under `content/blog`. Nested folders become
nested URL slugs. A post is published automatically when it is readable and is
not marked as a draft — there is no index file to maintain. Files and folders
whose names start with `.` or `_` (like `_TEMPLATE.md`) are ignored.

```md
---
title: "A quiet interface"
description: "A short deck for listings, metadata and social cards."
date: "2026-10-24"
tags:
  - Design
  - Next.js
cover: "/images/quiet-interface.webp"
coverAlt: "A muted dashboard with one task in focus"
coverCaption: "The first concept, before the interface was simplified."
---

## Opening

Write normally.
```

### Frontmatter

| Field | Purpose |
| --- | --- |
| `title` | Article title. Falls back to the first `h1`, then the filename. |
| `description` | Listing deck and meta description. Falls back to the first paragraph. |
| `date` | Publication date, ISO 8601 (`YYYY-MM-DD`). Posts are sorted newest first by this date. |
| `updated` | Optional revision date. Shown as `Updated` only when explicitly set. |
| `tags` / `categories` | Comma-separated strings or arrays. Both are normalized into tags. |
| `cover` / `heroImage` / `image` | Lead image and listing image. A single source of truth is normalized at build time. |
| `coverAlt` | Meaningful cover alt text. If omitted, the cover is treated as decorative. |
| `coverCaption` | Optional caption beneath the lead image. |
| `draft: true` | Excludes the post from listings, routes, search, feeds and the sitemap. |

Copy `content/blog/_TEMPLATE.md` to start a new post.

### Dates

- `date` is the canonical publication field and must be ISO 8601
  (`YYYY-MM-DD`, e.g. `2026-10-24`). Unquoted or quoted both work.
- During migration, `publishedAt`, `published` (when it holds a date value,
  not `true`/`false`) and `publicationDate` are also accepted as publication
  fields, and `updatedAt`, `modified` and `modifiedAt` as update fields.
  New posts should use `date` and `updated` only.
- Invalid date values are reported at build time and treated as missing; a
  post without a date simply renders without one (no invented or
  file-mtime-based dates are used).
- The same normalized date drives the listing, article header, RSS
  `pubDate`, sitemap `lastmod`, Open Graph metadata and JSON-LD
  `datePublished`/`dateModified`.

Cover values may also be objects with `src`, `alt` and `caption`.

### Images

- Put covers in `public/` and reference them as `/images/name.webp`.
- Remote covers must use `https://` or `http://`. Their hosts are added to
  `next.config.ts` automatically from post frontmatter.
- Markdown body images can use normal Markdown or HTML. A Markdown title becomes
  the caption, and `alt` text is preserved.
- For body images, provide `width` and `height` when possible; this reserves
  space before the image loads.

### Drafts and published content

- Drafts are never included in public production content.
- Search indexes titles, descriptions, tags and the rendered article text.
- There is no separate index file to maintain. Add a file, rebuild, and the
  listing, sitemap, feed and search index update.

## Structure

- `app/blog` — Writing index, article route and layout
- `components/blog` — Writing cards, reading rail, table of contents and article UI
- `content/blog` — published Markdown writing
- `lib/blog.ts` — Writing discovery and metadata normalization
- `lib/markdown.ts` — shared Markdown/Sanitize/heading-ID pipeline
- `lib/site.ts` — canonical site configuration

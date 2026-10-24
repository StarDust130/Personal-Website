import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import matter from "gray-matter";
import readingTime from "reading-time";
import { analyzeArticle } from "@/lib/markdown";

const postsDirectory = path.join(process.cwd(), "content", "blog");
const publicDirectory = path.join(process.cwd(), "public");
const postExtensions = new Set([".md", ".mdx"]);
// The full article stays server-side; this compact term index is all the
// client-side search needs for forgiving matches.
const maxSearchTerms = 1200;
const badgeSourcePattern =
  /(?:img\.shields\.io|badgen\.net|badge\.fury\.io|badge\.js\.org|shields\.io)/i;

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date?: string;
  updatedDate?: string;
  tags: string[];
  readMinutes: number;
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  author?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface BlogIndexEntry extends PostMeta {
  searchText: string;
  searchTerms: string[];
  previewImage?: string;
  previewImageAlt?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
  preview: string;
}

interface PostFile {
  slug: string;
  fullPath: string;
  baseName: string;
}

interface CoverValue {
  src: string;
  alt?: string;
  caption?: string;
}

interface PlainTextOptions {
  includeCode?: boolean;
  includeHeadings?: boolean;
  includeImageAlt?: boolean;
}

const namedEntities: Record<string, string> = {
  amp: "&",
  apos: "'",
  copy: "©",
  gt: ">",
  hellip: "…",
  lt: "<",
  mdash: "—",
  nbsp: " ",
  ndash: "–",
  quot: '"',
  reg: "®",
  trade: "™",
};

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (match, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return codePoint >= 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : match;
    })
    .replace(/&#(\d+);/g, (match, decimal: string) => {
      const codePoint = Number.parseInt(decimal, 10);
      return codePoint >= 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : match;
    })
    .replace(/&([a-z][a-z0-9]+);/gi, (match, name: string) => {
      return namedEntities[name.toLowerCase()] ?? match;
    });
}

function slugifySegment(segment: string): string {
  return segment
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function prettifySlug(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (character) => character.toUpperCase());
}

function stringValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

// Guards against nonsense values while accepting any realistic post date.
const minPlausibleDateMs = Date.UTC(1900, 0, 1);
const maxPlausibleDateMs = Date.UTC(2100, 0, 1);
// Numbers are accepted only as epoch milliseconds (post-2001). Small integers
// are almost always a bare year (e.g. `date: 2026`) and would otherwise parse
// as January 1970.
const minEpochMs = 1e12;

function isPlausibleDate(date: Date): boolean {
  const time = date.getTime();
  return time >= minPlausibleDateMs && time <= maxPlausibleDateMs;
}

function parseDate(value: unknown): Date | null {
  if (value instanceof Date) return isPlausibleDate(value) ? value : null;

  if (typeof value === "number") {
    return value >= minEpochMs && value <= maxPlausibleDateMs
      ? new Date(value)
      : null;
  }

  if (typeof value !== "string") return null;

  const date = new Date(value);

  return isPlausibleDate(date) ? date : null;
}

function firstValidDate(
  data: Record<string, unknown>,
  keys: string[],
  context: string
): Date | null {
  for (const key of keys) {
    const value = data[key];
    const date = parseDate(value);

    if (date) return date;

    const attemptedDate =
      (typeof value === "string" && value.trim().length > 0) ||
      typeof value === "number";

    if (attemptedDate) {
      console.warn(
        `[blog] Invalid "${key}" value "${String(value)}" in ${context}; expected ISO 8601 (e.g. 2026-10-24). Treating the date as missing.`
      );
    }
  }

  return null;
}

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function isDraft(data: Record<string, unknown>): boolean {
  if (data.draft === true || data.draft === "true") return true;
  if (data.published === false || data.published === "false") return true;
  if (data.unpublished === true) return true;
  if (data.status === "draft" || data.status === "unpublished") return true;
  return false;
}

function collectTags(value: unknown, target: string[], seen: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectTags(item, target, seen);
    return;
  }

  if (typeof value !== "string") return;

  for (const rawTag of value.split(",")) {
    const tag = rawTag.trim().replace(/^#/, "");
    if (!tag) continue;

    const key = tag.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    target.push(tag);
  }
}

function normalizeTags(...values: unknown[]): string[] {
  const tags: string[] = [];
  const seen = new Set<string>();

  for (const value of values) collectTags(value, tags, seen);

  return tags;
}

function normalizeImageSource(value: unknown): string | undefined {
  const raw = stringValue(value);
  if (!raw) return undefined;
  if (/^(?:javascript|vbscript|data|blob):/i.test(raw)) return undefined;

  if (raw.startsWith("//")) return `https:${raw}`;
  if (/^https?:\/\//i.test(raw)) return raw;

  const withoutPublicPrefix = raw.replace(/^\.?\/?public\//i, "/");

  if (withoutPublicPrefix.startsWith("/")) return withoutPublicPrefix;
  if (withoutPublicPrefix.startsWith("./") || withoutPublicPrefix.startsWith("../")) {
    return undefined;
  }

  return `/${withoutPublicPrefix}`;
}

function parseCoverValue(value: unknown): CoverValue | null {
  if (typeof value === "string") {
    const src = normalizeImageSource(value);
    return src ? { src } : null;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const src = normalizeImageSource(
    record.src ?? record.url ?? record.path ?? record.image
  );

  if (!src) return null;

  return {
    src,
    alt: stringValue(record.alt),
    caption: stringValue(record.caption ?? record.title),
  };
}

function resolveCover(data: Record<string, unknown>): CoverValue | null {
  const candidates = [
    data.cover,
    data.heroImage,
    data.image,
    data.coverImage,
  ];

  for (const candidate of candidates) {
    const cover = parseCoverValue(candidate);
    if (!cover) continue;

    return {
      src: cover.src,
      alt:
        stringValue(
          data.coverAlt ??
            data.imageAlt ??
            data.heroImageAlt ??
            data.coverImageAlt
        ) ?? cover.alt,
      caption:
        stringValue(
          data.coverCaption ??
            data.imageCaption ??
            data.heroImageCaption ??
            data.coverImageCaption
        ) ?? cover.caption,
    };
  }

  return null;
}

function isRemoteSource(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

function localCoverExists(src: string): boolean {
  if (isRemoteSource(src)) return true;

  const pathname = src.split(/[?#]/, 1)[0];

  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }

  if (decoded.includes("\0")) return false;

  const resolved = path.resolve(publicDirectory, `.${decoded}`);
  const relative = path.relative(publicDirectory, resolved);

  if (relative.startsWith("..") || path.isAbsolute(relative)) return false;

  try {
    return fs.statSync(resolved).isFile();
  } catch {
    return false;
  }
}

function walkPostFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  const files: string[] = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkPostFiles(fullPath));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!postExtensions.has(path.extname(entry.name).toLowerCase())) continue;

    files.push(fullPath);
  }

  return files;
}

function toPostFile(fullPath: string): PostFile {
  const extension = path.extname(fullPath);
  const relativePath = path
    .relative(postsDirectory, fullPath)
    .slice(0, -extension.length);

  const segments = relativePath.split(path.sep).filter(Boolean);
  const normalizedSegments = segments
    .map((segment) => slugifySegment(segment))
    .filter(Boolean);
  const slug = normalizedSegments.join("/") || "post";
  const baseName = segments[segments.length - 1] ?? "post";

  return { slug, fullPath, baseName };
}

function getPostFiles(): Map<string, PostFile> {
  const grouped = new Map<string, PostFile[]>();

  for (const fullPath of walkPostFiles(postsDirectory)) {
    const file = toPostFile(fullPath);
    const group = grouped.get(file.slug) ?? [];
    group.push(file);
    grouped.set(file.slug, group);
  }

  const files = new Map<string, PostFile>();

  for (const [slug, group] of grouped) {
    if (group.length === 1) {
      files.set(slug, group[0]);
      continue;
    }

    for (const file of group.sort((a, b) =>
      compareStrings(a.fullPath, b.fullPath)
    )) {
      const hash = createHash("sha1")
        .update(path.relative(postsDirectory, file.fullPath))
        .digest("hex")
        .slice(0, 6);
      const disambiguatedSlug = `${slug}-${hash}`;

      // The disambiguated slug must replace the original one, or both
      // colliding files would publish under identical URLs.
      files.set(disambiguatedSlug, { ...file, slug: disambiguatedSlug });
    }
  }

  return files;
}

export function markdownToPlainText(
  markdown: string,
  options: PlainTextOptions = {}
): string {
  const {
    includeCode = true,
    includeHeadings = true,
    includeImageAlt = true,
  } = options;

  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const output: string[] = [];
  let fence: string | null = null;

  for (const line of lines) {
    const fenceMatch = /^\s*(```+|~~~+)/.exec(line);

    if (fenceMatch) {
      if (!fence) {
        fence = fenceMatch[1][0];
      } else if (fenceMatch[1][0] === fence) {
        fence = null;
      }
      continue;
    }

    if (fence) {
      if (includeCode) output.push(line);
      continue;
    }

    let text = line;
    const heading = /^\s{0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(text);

    if (heading) {
      if (!includeHeadings) {
        output.push("");
        continue;
      }
      text = heading[2];
    }

    if (/^\s{0,3}(?:=+|-+)\s*$/.test(text)) {
      output.push("");
      continue;
    }

    if (/^\s*\|?[\s:|-]+\|?\s*$/.test(text) && text.includes("-")) {
      output.push("");
      continue;
    }

    text = text
      .replace(/^\s{0,3}>\s?/, "")
      .replace(/^\s{0,3}(?:[-*+]|\d+[.)])\s+/, "")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, includeImageAlt ? " $1 " : " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, " $1 ")
      .replace(/\[([^\]]+)\]\[[^\]]*\]/g, " $1 ")
      .replace(/<img\b[^>]*>/gi, (tag) => {
        const altMatch = /\balt\s*=\s*(["'])(.*?)\1/i.exec(tag);
        const alt = altMatch?.[2] ?? "";
        return includeImageAlt ? ` ${alt} ` : " ";
      })
      .replace(/<[^>]*>/g, " ")
      .replace(/[*_~`]+/g, "")
      .replace(/\|/g, " ")
      .replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1");

    output.push(decodeEntities(text));
  }

  return output
    .join("\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function inlineText(value: string): string {
  return decodeEntities(
    value
      .replace(/<[^>]*>/g, "")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
      .replace(/[*_~`]+/g, "")
      .replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractTitle(content: string): string | null {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  let fence: string | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fenceMatch = /^\s*(```+|~~~+)/.exec(line);

    if (fenceMatch) {
      if (!fence) {
        fence = fenceMatch[1][0];
      } else if (fenceMatch[1][0] === fence) {
        fence = null;
      }
      continue;
    }

    if (fence) continue;

    const atx = /^\s{0,3}#[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line);
    if (atx) return inlineText(atx[1]) || null;

    if (
      index + 1 < lines.length &&
      line.trim() &&
      /^\s{0,3}=+\s*$/.test(lines[index + 1])
    ) {
      return inlineText(line) || null;
    }

    const html = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(line);
    if (html) return inlineText(html[1]) || null;
  }

  return null;
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;

  const cutoff = value.slice(0, maxLength);
  const lastSpace = cutoff.lastIndexOf(" ");
  return `${cutoff.slice(0, lastSpace > maxLength * 0.6 ? lastSpace : maxLength).trimEnd()}…`;
}

function extractDescription(content: string, title: string): string {
  const plain = markdownToPlainText(content, {
    includeCode: false,
    includeHeadings: false,
    includeImageAlt: false,
  });

  const paragraphs = plain
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const candidate =
    paragraphs.find(
      (paragraph) =>
        paragraph.length >= 24 &&
        paragraph.toLowerCase() !== title.toLowerCase()
    ) ?? paragraphs[0];

  return candidate ? truncate(candidate, 180) : "";
}

function comparableText(value: string): string {
  return inlineText(value)
    .toLowerCase()
    .replace(/[.,;:!?…]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripRepeatedIntro(
  content: string,
  title: string,
  description: string
): string {
  let value = content.replace(/\r\n?/g, "\n").trim();

  const atx = /^#[ \t]+([^\n]+?)[ \t]*#*[ \t]*(?:\n+|$)/.exec(value);
  const setext = /^([^\n]+)\n[ \t]*=+[ \t]*(?:\n+|$)/.exec(value);
  const html = /^<h1\b[^>]*>([\s\S]*?)<\/h1>[ \t]*(?:\n+|$)/i.exec(value);

  if (
    (atx && comparableText(atx[1]) === comparableText(title)) ||
    (setext && comparableText(setext[1]) === comparableText(title)) ||
    (html && comparableText(html[1]) === comparableText(title))
  ) {
    value = value.slice((atx ?? setext ?? html)?.[0].length ?? 0).trim();
  }

  if (!description) return value;

  const block = /^([\s\S]*?)(?:\n{2,}|$)/.exec(value)?.[1] ?? "";
  const isParagraph = !/^\s*(?:#{1,6}[ \t]|!\[|<|\||```|~~~|>|(?:[-*+][ \t])|\d+[.)][ \t]|---)/.test(
    block
  );

  if (
    isParagraph &&
    block.trim() &&
    comparableText(block) === comparableText(description)
  ) {
    value = value.slice(block.length).trim();
  }

  return value;
}

function buildSearchTerms(plainText: string): string[] {
  const normalized = plainText.normalize("NFKC").toLowerCase();
  const terms = new Set<string>();

  for (const term of normalized.split(/[^\p{L}\p{N}]+/u)) {
    if (term.length < 2) continue;

    terms.add(term);
    if (terms.size >= maxSearchTerms) break;
  }

  return [...terms];
}

function readPost(file: PostFile): Post | null {
  let raw: string;

  try {
    raw = fs.readFileSync(file.fullPath, "utf8");
  } catch {
    console.warn(`[blog] Could not read ${file.fullPath}`);
    return null;
  }

  if (!raw.trim()) return null;

  let parsed: matter.GrayMatterFile<string>;

  try {
    parsed = matter(raw);
  } catch {
    console.warn(`[blog] Invalid frontmatter in ${file.fullPath}`);
    return null;
  }

  const data = parsed.data as Record<string, unknown>;

  if (isDraft(data)) return null;

  const rawContent = parsed.content.trim();
  const explicitTitle = stringValue(data.title);
  const title =
    explicitTitle ??
    extractTitle(rawContent) ??
    (prettifySlug(file.baseName) || "Untitled");
  const description =
    stringValue(data.description) ??
    stringValue(data.summary) ??
    stringValue(data.excerpt) ??
    extractDescription(rawContent, title);
  const content = stripRepeatedIntro(rawContent, title, description);
  const publicationDate = firstValidDate(
    data,
    [
      "date",
      "publishedAt",
      "published",
      "publicationDate",
    ],
    file.slug
  );
  const updatedDate = firstValidDate(
    data,
    [
      "updated",
      "updatedAt",
      "modified",
      "modifiedAt",
    ],
    file.slug
  );
  const tags = normalizeTags(
    data.tags,
    data.categories,
    data.category,
    data.keywords
  );
  const resolvedCover = resolveCover(data);
  let cover = resolvedCover?.src;
  let coverAlt = resolvedCover?.alt;
  let coverCaption = resolvedCover?.caption;

  if (cover && !localCoverExists(cover)) {
    console.warn(
      `[blog] Cover image "${cover}" for ${file.slug} was not found; omitting it.`
    );
    cover = undefined;
    coverAlt = undefined;
    coverCaption = undefined;
  }

  const author = stringValue(data.author);
  const stats = readingTime(content);

  return {
    slug: file.slug,
    title,
    description,
    date: publicationDate?.toISOString(),
    updatedDate: updatedDate?.toISOString(),
    tags,
    readMinutes: Math.max(1, Math.ceil(stats.minutes)),
    cover,
    coverAlt,
    coverCaption,
    author,
    content,
  };
}

function toPostMeta(post: Post): PostMeta {
  const { content: _content, ...meta } = post;
  return meta;
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const file of getPostFiles().values()) {
    const post = readPost(file);
    if (post) posts.push(post);
  }

  return posts.sort((a, b) => {
    if (a.date && b.date) {
      const dateDifference = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDifference) return dateDifference;
    } else if (a.date !== b.date) {
      return a.date ? -1 : 1;
    }

    return compareStrings(a.slug, b.slug) || compareStrings(a.title, b.title);
  });
}

export function getBlogIndex(posts: Post[] = getAllPosts()): BlogIndexEntry[] {
  return posts.map((post) => {
    const { content, ...meta } = post;
    const analysis = analyzeArticle(content);

    let previewImage = meta.cover;
    let previewImageAlt = meta.cover
      ? meta.coverAlt ?? meta.title
      : undefined;

    if (!previewImage) {
      for (const image of analysis.images) {
        const src = normalizeImageSource(image.src);
        if (!src || badgeSourcePattern.test(src) || !localCoverExists(src)) {
          continue;
        }

        previewImage = src;
        previewImageAlt = image.alt || meta.title;
        break;
      }
    }

    return {
      ...meta,
      searchText: [meta.title, meta.description, ...meta.tags]
        .join(" ")
        .normalize("NFKC")
        .toLowerCase(),
      searchTerms: buildSearchTerms(analysis.plainText),
      previewImage,
      previewImageAlt,
    };
  });
}

function normalizeSlugInput(slug: string | string[]): string {
  const parts = Array.isArray(slug) ? slug : slug.split("/");

  return parts
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    })
    .map(slugifySegment)
    .filter(Boolean)
    .join("/");
}

export function getPostBySlug(slug: string | string[]): Post | null {
  const normalizedSlug = normalizeSlugInput(slug);
  const file = getPostFiles().get(normalizedSlug);

  return file ? readPost(file) : null;
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? toPostMeta(posts[index - 1]) : null,
    next: index < posts.length - 1 ? toPostMeta(posts[index + 1]) : null,
  };
}

export function getToc(content: string): TocItem[] {
  return analyzeArticle(content)
    .headings.filter((heading) => heading.level === 2 || heading.level === 3)
    .map((heading) => ({
      id: heading.id,
      text: heading.text,
      level: heading.level as 2 | 3,
      preview: truncate(heading.preview, 180),
    }));
}

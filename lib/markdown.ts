import type { Element, Root, RootContent } from "hast";
import { toString } from "hast-util-to-string";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const markdownSanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "abbr",
    "caption",
    "figure",
    "figcaption",
    "mark",
    "small", // Allow small image credits
  ],
  strip: [
    ...(defaultSchema.strip ?? []),
    "base",
    "button",
    "embed",
    "form",
    "iframe",
    "link",
    "meta",
    "noscript",
    "object",
    "style",
    "textarea",
    "title",
  ],
};

export interface ArticleHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  preview: string;
}

export interface ArticleImage {
  src: string;
  alt: string;
  title?: string;
}

export interface ArticleAnalysis {
  headings: ArticleHeading[];
  plainText: string;
  images: ArticleImage[];
}

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, markdownSanitizeSchema)
  .use(rehypeSlug);

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function shorten(value: string, maxLength = 220): string {
  if (value.length <= maxLength) return value;

  const cutoff = value.slice(0, maxLength);
  const lastSpace = cutoff.lastIndexOf(" ");
  return `${cutoff
    .slice(0, lastSpace > maxLength * 0.6 ? lastSpace : maxLength)
    .trimEnd()}…`;
}

function walkImages(node: Root | RootContent, images: ArticleImage[]): void {
  if (node.type === "element") {
    const element = node as Element;

    if (element.tagName === "img") {
      const src = element.properties?.src;
      const alt = element.properties?.alt;
      const title = element.properties?.title;

      if (typeof src === "string" && src.trim()) {
        images.push({
          src: src.trim(),
          alt: typeof alt === "string" ? normalizeText(alt) : "",
          title: typeof title === "string" ? normalizeText(title) : undefined,
        });
      }

      return;
    }
  }

  if (!("children" in node) || !Array.isArray(node.children)) return;

  for (const child of node.children) {
    walkImages(child as RootContent, images);
  }
}

function collectHeadings(tree: Root): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  let current: ArticleHeading | null = null;
  let preview: string[] = [];

  const flushPreview = () => {
    if (!current) return;
    current.preview = shorten(normalizeText(preview.join(" ")));
    preview = [];
  };

  for (const child of tree.children) {
    if (child.type === "element") {
      const element = child as Element;
      const rank = /^h([1-6])$/.exec(element.tagName);

      if (rank) {
        flushPreview();

        const id = element.properties?.id;
        const text = normalizeText(toString(element));

        if (typeof id === "string" && id && text) {
          current = {
            id,
            text,
            level: Number(rank[1]) as ArticleHeading["level"],
            preview: "",
          };
          headings.push(current);
        } else {
          current = null;
        }

        continue;
      }
    }

    if (!current) continue;

    const text = normalizeText(toString(child as RootContent));
    if (text) preview.push(text);
  }

  flushPreview();

  return headings;
}

export function analyzeArticle(content: string): ArticleAnalysis {
  let tree: Root;

  try {
    tree = markdownProcessor.runSync(
      markdownProcessor.parse(content)
    ) as Root;
  } catch {
    return { headings: [], plainText: "", images: [] };
  }

  const images: ArticleImage[] = [];
  walkImages(tree, images);

  return {
    headings: collectHeadings(tree),
    plainText: normalizeText(toString(tree)),
    images,
  };
}

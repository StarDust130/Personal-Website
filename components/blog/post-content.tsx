import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { isValidElement, type ReactNode } from "react";
import "highlight.js/styles/github-dark.css";
import CodeBlock from "@/components/blog/code-block";
import MermaidBlock from "@/components/blog/mermaid-block";
import {
  MarkdownFigure,
  MarkdownImage,
} from "@/components/blog/markdown-media";
import { markdownSanitizeSchema } from "@/lib/markdown";

function getAlign(node: unknown): string | undefined {
  if (!node || typeof node !== "object") return undefined;

  const properties = (node as { properties?: Record<string, unknown> })
    .properties;
  const align = properties?.align;

  return typeof align === "string" ? align : undefined;
}

function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return getNodeText(props.children);
  }
  return "";
}

function numericDimension(
  value: string | number | undefined
): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return undefined;
}

const badgeSourcePattern =
  /(?:img\.shields\.io|badgen\.net|badge\.fury\.io|badge\.js\.org|shields\.io)/i;

function isBannerSource(
  source: string,
  width: string | number | undefined
): boolean {
  return /capsule-render/i.test(source) || width === "100%";
}

function bannerDimensions(source: string): {
  width?: number;
  height?: number;
} {
  if (!/capsule-render/i.test(source)) return {};

  try {
    const url = new URL(source);
    const height = Number(url.searchParams.get("height"));
    return Number.isFinite(height) && height > 0
      ? { width: 854, height }
      : {};
  } catch {
    return {};
  }
}

interface ImageNodeProperties {
  src?: unknown;
  alt?: unknown;
  title?: unknown;
  width?: unknown;
  height?: unknown;
}

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: ImageNodeProperties;
  children?: HastNode[];
}

function getOnlyImage(node: unknown) {
  const element = node as { children?: HastNode[] } | undefined;
  const meaningful = (element?.children ?? []).filter(
    (child) =>
      child.type === "element" ||
      (child.type === "text" && Boolean(child.value?.trim()))
  );

  if (meaningful.length !== 1) return null;

  const image = meaningful[0];
  if (image.type !== "element" || image.tagName !== "img") return null;

  const properties = image.properties ?? {};
  const src = typeof properties.src === "string" ? properties.src : "";
  if (!src) return null;

  return {
    src,
    alt: typeof properties.alt === "string" ? properties.alt : "",
    title:
      typeof properties.title === "string" ? properties.title : undefined,
    width:
      typeof properties.width === "number" ||
      typeof properties.width === "string"
        ? properties.width
        : undefined,
    height:
      typeof properties.height === "number" ||
      typeof properties.height === "string"
        ? properties.height
        : undefined,
  };
}

const markdownComponents: Components = {
  a: ({ node: _node, href, children, ...props }) => {
    const isExternal =
      typeof href === "string" && /^(?:https?:)?\/\//i.test(href);

    if (isExternal) {
      return (
        <a {...props} href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    if (href?.startsWith("/")) {
      return (
        <Link {...props} href={href}>
          {children}
        </Link>
      );
    }

    return (
      <a {...props} href={href}>
        {children}
      </a>
    );
  },

  img: ({ node: _node, src, alt, title, width, height }) => {
    const source = typeof src === "string" ? src : "";
    if (!source || badgeSourcePattern.test(source)) return null;

    const imageWidth = numericDimension(width);
    const imageHeight = numericDimension(height);
    const banner = isBannerSource(source, width);
    const dimensions = bannerDimensions(source);

    return (
      <MarkdownImage
        src={source}
        alt={typeof alt === "string" ? alt : ""}
        title={typeof title === "string" ? title : undefined}
        width={imageWidth ?? dimensions.width}
        height={imageHeight ?? dimensions.height}
        banner={banner}
      />
    );
  },

  div: ({ node, className, children, ...props }) => {
    const classes = [
      className,
      getAlign(node) === "center" ? "text-center" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div {...props} className={classes || undefined}>
        {children}
      </div>
    );
  },

  p: ({ node, className, children, ...props }) => {
    const image = getOnlyImage(node);

    if (image) {
      if (badgeSourcePattern.test(image.src)) return null;

      const imageWidth = numericDimension(image.width);
      const imageHeight = numericDimension(image.height);
      const banner = isBannerSource(image.src, image.width);
      const dimensions = bannerDimensions(image.src);

      if (banner) {
        return (
          <MarkdownImage
            src={image.src}
            alt={image.alt}
            title={image.title}
            width={imageWidth ?? dimensions.width}
            height={imageHeight ?? dimensions.height}
            banner
          />
        );
      }

      return (
        <MarkdownFigure
          src={image.src}
          alt={image.alt}
          title={image.title}
          width={imageWidth}
          height={imageHeight}
        />
      );
    }

    const classes = [
      className,
      getAlign(node) === "center" ? "text-center" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <p {...props} className={classes || undefined}>
        {children}
      </p>
    );
  },

  table: ({ node: _node, children, ...props }) => (
    <div className="table-wrap">
      <table {...props}>{children}</table>
    </div>
  ),

  pre: ({ node: _node, children }) => {
    const child = Array.isArray(children) ? children[0] : children;

    if (!isValidElement(child)) {
      return (
        <CodeBlock language="text" rawCode={getNodeText(children)}>
          {children}
        </CodeBlock>
      );
    }

    const props = child.props as { className?: string; children?: ReactNode };
    const language =
      /language-([\w-]+)/.exec(props.className ?? "")?.[1] ?? "text";
    const raw = getNodeText(props.children);

    if (language === "mermaid") {
      return <MermaidBlock chart={raw.trimEnd()} />;
    }

    return (
      <CodeBlock language={language} rawCode={raw}>
        {children}
      </CodeBlock>
    );
  },
};

export default function PostContent({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, markdownSanitizeSchema],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              content: { type: "text", value: "#" },
              properties: {
                className: ["heading-anchor"],
                ariaLabel: "Link to this section",
              },
            },
          ],
          rehypeHighlight,
        ]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

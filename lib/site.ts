export const siteConfig = {
  name: "Chandrashekhar Yadav",
  author: "Chandrashekhar Yadav",
  url: "https://www.chandrashekhar.me",
  avatar: "/me.jpeg",
  description:
    "Developer and builder making thoughtful things for the web.",
  writingDescription:
    "A running notebook of what I'm building, designing, and trying to understand.",
  socials: {
    x: "https://x.com/the_csyadav",
    github: "https://github.com/StarDust130",
  },
} as const;

export function absoluteUrl(pathname = "/"): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;

  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const base = `${siteConfig.url.replace(/\/+$/, "")}/`;
  return new URL(path, base).toString();
}

export function postPath(slug: string): string {
  const encoded = slug
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/blog/${encoded}`;
}

export function imageUrl(src: string): string {
  if (/^data:/i.test(src)) return src;
  if (src.startsWith("//")) return `https:${src}`;
  if (/^https?:\/\//i.test(src)) return src;
  return absoluteUrl(src);
}

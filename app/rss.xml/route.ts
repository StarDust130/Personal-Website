import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, postPath, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const latestPublishedDate = posts.find((post) => post.date)?.date;

  const items = posts
    .map((post) => {
      const url = absoluteUrl(postPath(post.slug));

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>${
        post.date
          ? `\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`
          : ""
      }
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.author)} — Thoughts</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(siteConfig.writingDescription)}</description>
    <language>en</language>${
      latestPublishedDate
        ? `\n    <lastBuildDate>${new Date(latestPublishedDate).toUTCString()}</lastBuildDate>`
        : ""
    }${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

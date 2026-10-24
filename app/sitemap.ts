import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, postPath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPublishedDate = posts.find((post) => post.date)?.date;

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPublishedDate
        ? new Date(latestPublishedDate)
        : undefined,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/thoughts"),
      lastModified: latestPublishedDate
        ? new Date(latestPublishedDate)
        : undefined,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(postPath(post.slug)),
      lastModified: post.updatedDate
        ? new Date(post.updatedDate)
        : post.date
          ? new Date(post.date)
          : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

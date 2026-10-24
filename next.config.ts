import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NextConfig } from "next";

interface RemotePattern {
  protocol: "http" | "https";
  hostname: string;
}

function walkFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  const files: string[] = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    if (/\.md$/i.test(entry.name)) files.push(fullPath);
  }

  return files;
}

function coverSource(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const record = value as Record<string, unknown>;
  const source = record.src ?? record.url ?? record.path ?? record.image;
  return typeof source === "string" ? source.trim() || undefined : undefined;
}

function getCoverRemotePatterns(): RemotePattern[] {
  const contentDirectory = path.join(process.cwd(), "content", "blog");
  const patterns = new Map<string, RemotePattern>();

  for (const file of walkFiles(contentDirectory)) {
    let raw: string;

    try {
      raw = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }

    let data: Record<string, unknown>;

    try {
      data = matter(raw).data as Record<string, unknown>;
    } catch {
      continue;
    }

    for (const field of [data.cover, data.coverImage, data.heroImage, data.image]) {
      const value = coverSource(field);
      if (!value) continue;

      const source = value.startsWith("//") ? `https:${value}` : value;
      if (!/^https?:\/\//i.test(source)) continue;

      try {
        const url = new URL(source);
        const protocol = url.protocol === "http:" ? "http" : "https";
        patterns.set(`${protocol}:${url.hostname}`, {
          protocol,
          hostname: url.hostname,
        });
      } catch {
        continue;
      }
    }
  }

  return [...patterns.values()].sort((a, b) =>
    a.hostname.localeCompare(b.hostname)
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getCoverRemotePatterns(),
  },
};

export default nextConfig;

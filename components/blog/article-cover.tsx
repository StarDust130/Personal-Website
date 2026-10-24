"use client";

import { useEffect, useRef, useState } from "react";
import CoverImage from "@/components/blog/cover-image";

export default function ArticleCover({
  src,
  alt,
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = frameRef.current?.querySelector("img");
    if (!image || !image.complete || image.naturalWidth > 0) return;

    queueMicrotask(() => setFailed(true));
  }, []);

  if (!src || failed) return null;

  return (
    <figure className="mt-8">
      <div
        ref={frameRef}
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-white/[0.025]"
      >
        <CoverImage
          src={src}
          alt={alt ?? ""}
          sizes="(min-width: 1024px) 720px, 100vw"
          priority
          className="object-cover"
          onError={() => setFailed(true)}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

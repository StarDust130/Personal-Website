"use client";

import { useEffect, useRef, useState } from "react";

export default function PostCardMedia({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !image.complete || image.naturalWidth > 0) return;

    queueMicrotask(() => setFailed(true));
  }, []);

  if (!src || failed) return null;

  return (
    <div
      className={`relative w-full overflow-hidden border-b border-line bg-white/[0.02] ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
    </div>
  );
}

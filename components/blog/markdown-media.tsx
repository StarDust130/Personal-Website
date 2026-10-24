"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";

interface MarkdownMediaProps {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  banner?: boolean;
}

function hideEmptyContainer(
  image: HTMLImageElement,
  update: () => void
) {
  const parent = image.closest("p, div");

  image.hidden = true;
  update();

  if (!parent) return;

  window.requestAnimationFrame(() => {
    const hasText = Boolean(parent.textContent?.trim());
    const hasMedia = Boolean(
      parent.querySelector(
        "img:not([hidden]), picture, svg, video, iframe"
      )
    );

    if (!hasText && !hasMedia) {
      parent.setAttribute("hidden", "");
    }
  });
}

export function MarkdownFigure({
  src,
  alt = "",
  title,
  width,
  height,
}: MarkdownMediaProps) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !image.complete || image.naturalWidth > 0) return;

    queueMicrotask(() => setFailed(true));
  }, []);

  if (!src || failed) return null;

  const ratio = width && height ? `${width} / ${height}` : "3 / 2";

  return (
    <figure className="article-figure">
      <div className="article-figure-frame" style={{ aspectRatio: ratio }}>
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      </div>
      {title && <figcaption className="article-caption">{title}</figcaption>}
    </figure>
  );
}

export function MarkdownImage({
  src,
  alt = "",
  title,
  width,
  height,
  banner = false,
}: MarkdownMediaProps) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !image.complete || image.naturalWidth > 0) return;

    queueMicrotask(() => hideEmptyContainer(image, () => setFailed(true)));
  }, []);

  if (!src || failed) return null;

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    hideEmptyContainer(event.currentTarget, () => setFailed(true));
  }

  if (banner) {
    return (
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        onError={handleError}
        className="article-banner"
      />
    );
  }

  return (
    <span className="article-inline-image">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onError={handleError}
        className="article-image"
      />
      {title && <span className="article-caption">{title}</span>}
    </span>
  );
}

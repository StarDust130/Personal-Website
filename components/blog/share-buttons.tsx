"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

interface ShareButtonsProps {
  url: string;
  title: string;
}

function fallbackCopy(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else if (!fallbackCopy(url)) {
        throw new Error("Copy unavailable");
      }

      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyState("idle"), 2200);
  }

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-1.5 print:hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line bg-white/[0.02] px-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        aria-label="Copy link to article"
      >
        {copyState === "copied" ? (
          <Check aria-hidden="true" className="size-3.5 text-accent" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
        {copyState === "copied"
          ? "Copied"
          : copyState === "error"
            ? "Try again"
            : "Copy link"}
      </button>

      <a
        href={`https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line bg-white/[0.02] px-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        aria-label="Share on X"
      >
        <FaXTwitter aria-hidden="true" className="size-3" />
        Share
      </a>

      <span className="sr-only" role="status" aria-live="polite">
        {copyState === "copied"
          ? "Link copied to clipboard"
          : copyState === "error"
            ? "Could not copy link"
            : ""}
      </span>
    </div>
  );
}

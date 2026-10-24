"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "error";

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

export default function CodeBlock({
  language,
  rawCode,
  children,
}: {
  language: string;
  rawCode: string;
  children: ReactNode;
}) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(rawCode);
      } else if (!fallbackCopy(rawCode)) {
        throw new Error("Copy unavailable");
      }

      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyState("idle"), 2000);
  }

  const label =
    copyState === "copied"
      ? "Copied"
      : copyState === "error"
        ? "Copy failed"
        : "Copy";

  return (
    <div className="code-block my-7 overflow-hidden rounded-xl border border-line bg-[rgb(236_233_226/0.03)]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {language.toLowerCase()}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${language} code`}
          className="inline-flex min-h-8 items-center gap-1.5 rounded px-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          {copyState === "copied" ? (
            <Check aria-hidden="true" className="size-3.5 text-accent" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
          {label}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copyState === "copied"
            ? "Code copied to clipboard"
            : copyState === "error"
              ? "Could not copy code"
              : ""}
        </span>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${language} code block`}
        className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
      >
        {children}
      </pre>
    </div>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { TocItem } from "@/lib/blog";

interface ArticleNavValue {
  items: TocItem[];
  activeId: string | null;
  activeItem: TocItem | null;
  progress: number;
  progressPercent: number;
}

const ArticleNavContext = createContext<ArticleNavValue | null>(null);

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function useArticleNav(): ArticleNavValue {
  const value = useContext(ArticleNavContext);

  if (!value) {
    throw new Error("useArticleNav must be used inside ArticleNav");
  }

  return value;
}

/**
 * Keeps table-of-contents links feeling like ordinary anchors while giving the
 * destination heading keyboard focus. Calling this from a click handler also
 * lets us honor reduced-motion preferences instead of relying on a browser's
 * anchor-scroll default.
 */
export function scrollToArticleSection(id: string): boolean {
  if (typeof window === "undefined") return false;

  const heading = document.getElementById(id);
  if (!heading) return false;

  const fragment = `#${encodeURIComponent(id)}`;

  if (window.location.hash !== fragment) {
    window.history.pushState(null, "", fragment);
  }

  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  heading.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  return true;
}

export default function ArticleNav({
  items,
  children,
}: {
  items: TocItem[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    items[0]?.id ?? null
  );
  const [progress, setProgress] = useState(0);

  const metricsRef = useRef({
    top: 0,
    height: 1,
    offsets: [] as number[],
  });
  const progressRef = useRef(0);
  const activeIdRef = useRef<string | null>(items[0]?.id ?? null);

  const updateScrollState = useCallback(() => {
    const viewport = window.innerHeight;
    const scrollY = window.scrollY;
    const { top, height, offsets } = metricsRef.current;

    const start = top - viewport * 0.22;
    const end = top + height - viewport * 0.82;
    const denominator = Math.max(1, end - start);
    const nextProgress = clamp((scrollY - start) / denominator);

    if (Math.abs(nextProgress - progressRef.current) >= 0.001) {
      progressRef.current = nextProgress;
      setProgress(nextProgress);
    }

    if (offsets.length === 0) {
      if (activeIdRef.current !== null) {
        activeIdRef.current = null;
        setActiveId(null);
      }
      return;
    }

    const readingLine = scrollY + Math.min(180, viewport * 0.22);
    const nearPageEnd =
      scrollY + viewport >= document.documentElement.scrollHeight - 4;

    let nextIndex = 0;

    for (let index = 0; index < offsets.length; index += 1) {
      if (offsets[index] <= readingLine) {
        nextIndex = index;
      } else {
        break;
      }
    }

    if (nearPageEnd) nextIndex = offsets.length - 1;

    const nextId = items[nextIndex]?.id ?? null;

    if (nextId !== activeIdRef.current) {
      activeIdRef.current = nextId;
      setActiveId(nextId);
    }
  }, [items]);

  const measure = useCallback(() => {
    const body = document.querySelector<HTMLElement>("[data-article-body]");
    if (!body || body.offsetHeight === 0) return;

    const rect = body.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const height = Math.max(1, body.offsetHeight);
    const offsets: number[] = [];

    for (const item of items) {
      const heading = document.getElementById(item.id);
      const headingTop = heading
        ? heading.getBoundingClientRect().top + window.scrollY
        : top;

      offsets.push(headingTop);
    }

    metricsRef.current = { top, height, offsets };
    updateScrollState();
  }, [items, updateScrollState]);

  useEffect(() => {
    let updateFrame = 0;
    let measureFrame = 0;
    let cancelled = false;

    const scheduleUpdate = () => {
      if (updateFrame !== 0) return;

      updateFrame = window.requestAnimationFrame(() => {
        updateFrame = 0;
        if (!cancelled) updateScrollState();
      });
    };

    const scheduleMeasure = () => {
      if (measureFrame !== 0) return;

      measureFrame = window.requestAnimationFrame(() => {
        measureFrame = 0;
        if (!cancelled) measure();
      });
    };

    const body = document.querySelector<HTMLElement>("[data-article-body]");
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleMeasure);

    if (body) observer?.observe(body);

    scheduleMeasure();
    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    const timeout = window.setTimeout(scheduleMeasure, 300);

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleMeasure).catch(() => undefined);
    }

    return () => {
      cancelled = true;
      if (updateFrame !== 0) window.cancelAnimationFrame(updateFrame);
      if (measureFrame !== 0) window.cancelAnimationFrame(measureFrame);
      window.clearTimeout(timeout);
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [measure, updateScrollState]);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0] ?? null,
    [items, activeId]
  );

  const value = useMemo<ArticleNavValue>(
    () => ({
      items,
      activeId,
      activeItem,
      progress,
      progressPercent: Math.round(progress * 100),
    }),
    [items, activeId, activeItem, progress]
  );

  return (
    <ArticleNavContext.Provider value={value}>
      {children}
    </ArticleNavContext.Provider>
  );
}

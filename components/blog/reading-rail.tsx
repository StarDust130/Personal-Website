"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  scrollToArticleSection,
  useArticleNav,
} from "@/components/blog/article-nav";

export default function ReadingRail() {
  const { items, activeId, progress, progressPercent } = useArticleNav();

  const navRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState({ top: 0, height: 0, ready: false });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const active = nav.querySelector<HTMLElement>(
        '.reading-rail__link[aria-current="location"]'
      );

      if (!active) {
        setCursor((prev) => (prev.ready ? { ...prev, ready: false } : prev));
        return;
      }

      const top = active.offsetTop;
      const height = active.offsetHeight;

      setCursor((prev) =>
        prev.ready && prev.top === top && prev.height === height
          ? prev
          : { top, height, ready: true }
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeId, items.length]);

  // Built only when the list or active section changes.
  // Progress updates during scroll never re-render this list.
  const listItems = useMemo(
    () =>
      items.map((item, index) => {
        const isActive = activeId === item.id;

        return (
          <li
            key={item.id}
            className="reading-rail__item"
            style={{ "--i": index } as CSSProperties}
          >
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => {
                if (scrollToArticleSection(item.id)) {
                  event.preventDefault();
                }
              }}
              className={`reading-rail__link ${
                item.level === 3 ? "reading-rail__link--nested" : ""
              } ${isActive ? "reading-rail__link--active" : ""}`}
            >
              <span className="reading-rail__num font-mono" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="reading-rail__text">
                <span className="sr-only">Section {index + 1}: </span>
                {item.text}
              </span>
            </a>
          </li>
        );
      }),
    [items, activeId]
  );

  if (items.length === 0) return null;

  return (
    <aside
      tabIndex={0}
      aria-label={`Article progress: ${progressPercent}% read. Focus or hover to browse sections.`}
      className="reading-rail fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 xl:block print:hidden"
    >
      <div
        className="sr-only"
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-valuetext={`${progressPercent}% read`}
      />

      {/* ── Spine ── */}
      <div className="reading-rail__spine" aria-hidden="true">
        <span className="reading-rail__percent font-mono text-[9px] tabular-nums">
          {progressPercent}%
        </span>

        <div className="reading-rail__track">
          <span
            className="reading-rail__fill"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>
      </div>

      {/* ── Hover panel ── */}
      <div className="reading-rail__panel">
        <div className="reading-rail__header">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              On this page
            </p>
            <span className="font-mono text-[10px] tabular-nums text-accent">
              {progressPercent}%
            </span>
          </div>
          <div aria-hidden="true" className="reading-rail__header-track mt-3">
            <span
              className="reading-rail__header-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>

        <nav
          ref={navRef}
          aria-label="Article table of contents"
          className="reading-rail__nav"
        >
          <span
            aria-hidden="true"
            className={`reading-rail__cursor ${
              cursor.ready ? "reading-rail__cursor--ready" : ""
            }`}
            style={{
              transform: `translateY(${cursor.top}px)`,
              height: `${cursor.height}px`,
            }}
          />

          <ol className="reading-rail__list">{listItems}</ol>
        </nav>
      </div>
    </aside>
  );
}
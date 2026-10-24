"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import {
  scrollToArticleSection,
  useArticleNav,
} from "@/components/blog/article-nav";

export function MobileProgress() {
  const { progress } = useArticleNav();

  return (
    <div
      aria-hidden="true"
      className="mobile-progress fixed inset-x-0 top-0 z-50 h-0.5 print:hidden xl:hidden"
    >
      <div
        className="mobile-progress__fill h-full origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export default function MobileToc() {
  const { items, activeId, activeItem, progressPercent } = useArticleNav();
  const [open, setOpen] = useState(false);
  const tocId = useId().replace(/:/g, "");

  // Built only when the list or active section changes —
  // no list re-render while scrolling.
  const listItems = useMemo(
    () =>
      items.map((item, index) => {
        const isActive = activeId === item.id;

        return (
          <li
            key={item.id}
            className={`mobile-toc__item ${
              item.level === 3 ? "mobile-toc__item--nested" : ""
            }`}
            style={{ "--i": index } as CSSProperties}
          >
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => {
                setOpen(false);
                if (scrollToArticleSection(item.id)) {
                  event.preventDefault();
                }
              }}
              className={`mobile-toc__link ${
                isActive ? "mobile-toc__link--active" : ""
              }`}
            >
              <span className="mobile-toc__num font-mono" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mobile-toc__text">{item.text}</span>
            </a>
          </li>
        );
      }),
    [items, activeId]
  );

  if (items.length === 0) return null;

  const current = activeItem ?? items[0];

  return (
    <div
      className={`mobile-toc mb-7 xl:hidden ${
        open ? "mobile-toc--open" : ""
      }`}
    >
      <div className="mobile-toc__card">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={tocId}
          onClick={() => setOpen((value) => !value)}
          className="mobile-toc__summary"
        >
          <span className="min-w-0 flex-1">
            <span className="mobile-toc__label">On this page</span>
            <span className="mobile-toc__current">{current.text}</span>
          </span>

          <span className="mobile-toc__meta">
            <span className="mobile-toc__percent font-mono tabular-nums">
              {progressPercent}%
            </span>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.5}
              className="mobile-toc__chevron"
            />
          </span>
        </button>

        <div id={tocId} className="mobile-toc__collapse">
          <div className="mobile-toc__collapse-inner">
            <nav aria-label="Table of contents" className="mobile-toc__nav">
              <ol className="mobile-toc__list">{listItems}</ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
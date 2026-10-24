"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";



import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
  LuArrowUpRight,
  LuBookOpen,
  LuCircleHelp,
  LuFileText,
  LuFlower2,
  LuHammer,
  LuMail,
  LuMenu,
  LuTv,
  LuX,
} from "react-icons/lu";

const site = {
  name: "Chandrashekhar Yadav",
  location: "India",
  year: 2026,

  email: "csyadav0513@gmail.com",

  github: "https://github.com/StarDust130",

  x: "https://x.com/the_csyadav",

  resume: "/resume.pdf",
};

const mailto = `mailto:${site.email}`;

/* ═══════════════════════════════════════════════════════════════
   MOTION
   ═══════════════════════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

function Reveal({
  children,
  delay = 0,
  y = 10,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const reduce = useReducedMotion();

  const shared = {
    "data-reveal": true,
    className,
    initial: reduce ? (false as const) : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : {
          duration: 0.8,
          delay,
          ease: EASE,
        },
  };

  if (as === "span") {
    return (
      <motion.span {...shared}>
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div {...shared}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHARED LINK STYLE
   ═══════════════════════════════════════════════════════════════ */

const linkBase =
  "group inline-flex items-center gap-2 text-[12px] text-muted transition-colors duration-200 sm:text-[13px]";

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */

function HomeView() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const navItems = [
    {
      label: "Resume",
      description: "Experience & background",
      href: site.resume,
      icon: LuFileText,
      external: true,
    },
    {
      label: "Projects",
      description: "Things I’ve built",
      href: site.github,
      icon: FaGithub,
      external: true,
    },
    {
      label: "Writing",
      description: "Notes, ideas & experiments",
      href: "/blog",
      icon: LuBookOpen,
      external: false,
    },
    {
      label: "@the_csyadav",
      description: "Follow along on X",
      href: site.x,
      icon: FaXTwitter,
      external: true,
    },
    {
      label: "Email",
      description: "Get in touch",
      href: mailto,
      icon: LuMail,
      external: false,
    },
  ];

  return (
    <div className="min-h-svh bg-ink">
      {/* ═════════════════ HEADER ═════════════════ */}

      <header className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between gap-4 px-5 pt-5 sm:gap-5 sm:px-10 sm:pt-7 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}

        <Reveal>
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group inline-flex w-fit items-center gap-2.5"
          >
            <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:border-[#c4b5fd]/40 group-hover:bg-[#c4b5fd]/[0.05] sm:size-9">
              <Image
                src="/icon.png"
                alt=""
                width={36}
                height={36}
                priority
                className="size-9 object-contain p-1 transition-transform duration-500 group-hover:scale-110"
              />
            </span>

            <span className="text-[12px] font-medium tracking-[-0.01em] text-paper transition-colors duration-300 group-hover:text-[#c4b5fd] sm:text-[13px]">
              {site.name}
            </span>
          </Link>
        </Reveal>

        {/* Navigation */}

        <Reveal delay={0.08} className="shrink-0">
          <div className="flex items-center">
            {/* Desktop navigation */}
            <nav aria-label="Primary navigation" className="hidden md:block">
              <ul className="flex items-center gap-x-5 lg:gap-x-7">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        aria-label={
                          item.label === "Projects"
                            ? "See my projects on GitHub"
                            : item.label === "@the_csyadav"
                              ? "Chandrashekhar Yadav on X"
                              : item.label === "Email"
                                ? `Email ${site.name}`
                                : item.label
                        }
                        className={`${linkBase} hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-line focus-visible:ring-offset-4 focus-visible:ring-offset-ink`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-3.5 shrink-0 opacity-75"
                          strokeWidth={1.5}
                        />
                        <span>{item.label}</span>
                        {item.external && (
                          <LuArrowUpRight
                            aria-hidden="true"
                            className="size-3 opacity-45"
                            strokeWidth={1.5}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-line text-muted transition-colors duration-200 hover:border-white/20 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-line md:hidden"
            >
              {menuOpen ? (
                <LuX aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
              ) : (
                <LuMenu aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </Reveal>
      </header>

      {/* Full-screen mobile navigation */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[100] flex min-h-svh flex-col bg-ink px-6 pb-7 pt-6 transition-[opacity,visibility] duration-300 ease-out md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex min-h-[calc(100svh-3.25rem)] w-full max-w-md flex-1 flex-col transition-transform duration-300 ease-out ${
            menuOpen ? "translate-y-0" : "translate-y-1"
          }`}
        >
          {/* Menu heading */}
          <div className="flex items-center justify-between border-b border-line pb-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
              Navigation <span className="ml-1 text-faint/50">/ 05</span>
            </p>
            <button
              type="button"
              aria-label="Close navigation menu"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="inline-flex size-9 items-center justify-center text-muted transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-line"
            >
              <LuX aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Destinations */}
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center py-7"
          >
            <ul className="divide-y divide-white/[0.08]">
              {navItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      tabIndex={menuOpen ? 0 : -1}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 py-4 text-paper/85 transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:text-paper sm:py-5"
                    >
                      <span className="w-5 shrink-0 font-mono text-[10px] tabular-nums text-faint/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted"
                        strokeWidth={1.5}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[25px] leading-tight tracking-[-0.025em]">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                          {item.description}
                        </span>
                      </span>
                      {item.external && (
                        <LuArrowUpRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-faint/55"
                          strokeWidth={1.5}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Menu footer */}
          <div className="border-t border-line pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint/55">
              Chandrashekhar Yadav
            </p>
          </div>
        </div>
      </div>


      {/* ═════════════════ HERO ═════════════════ */}

      <main className="mx-auto w-full max-w-6xl px-5 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 lg:flex lg:min-h-[calc(100svh-7rem)] lg:flex-col lg:justify-center lg:py-6">
        {/* Eyebrow */}

        <Reveal delay={0.12}>
          <p className="flex items-center gap-3 font-mono text-[8px] tracking-[0.32em] text-faint sm:text-[10px]">


            <span className="font-bold">HEY,👋  I&rsquo;M</span>

          </p>
        </Reveal>

        {/* Name */}

        <h1
          className="mt-4 text-paper sm:mt-6"
          style={{
            fontFamily:
              "var(--font-instrument), Georgia, serif",
            fontSize: "clamp(2.65rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: "-0.025em",
          }}
        >
          <Reveal
            as="span"
            delay={0.2}
            y={14}
            className="block"
          >
            Chandrashekhar{" "}
            <span className="inline-block transition-transform duration-500 hover:rotate-6">
              🕊️
            </span>
          </Reveal>
        </h1>

        <div className="mt-7 grid gap-9 sm:mt-11 sm:gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          {/* ═════════════ MAIN COPY ═════════════ */}

          <div className="lg:col-span-7">
            {/* Lead */}

            <Reveal delay={0.38}>
              <p className="max-w-[38ch] text-[1rem] leading-[1.48] text-paper/90 sm:text-[clamp(1.1rem,1rem+0.4vw,1.35rem)]">
                I&rsquo;m curious by nature. I tend to follow
                questions further than I originally intended.
              </p>
            </Reveal>

            {/* Desktop copy */}

            <div className="hidden sm:block">
              <Reveal delay={0.47}>
                <p className="mt-5 max-w-[49ch] text-[0.98rem] leading-[1.8] text-muted">
                  I learn by making things. A project usually starts
                  with a simple idea and turns into a chain of
                  questions — why does this work, what is happening
                  underneath, what did I assume without really
                  checking?
                </p>
              </Reveal>

              <Reveal delay={0.56}>
                <p className="mt-4 max-w-[49ch] text-[0.98rem] leading-[1.8] text-muted">
                  I like following those questions until something
                  makes sense. Sometimes that leads into code.
                  Sometimes into a book. Sometimes into sitting
                  quietly and noticing my own mind.
                </p>
              </Reveal>
            </div>

            {/* Mobile copy */}

            <div className="sm:hidden">
              <Reveal delay={0.47}>
                <p className="mt-4 max-w-[40ch] text-[0.9rem] leading-[1.72] text-muted">
                  I learn by making things. A project starts with an
                  idea, turns into questions, and keeps going until
                  I understand what&rsquo;s underneath.
                </p>
              </Reveal>

              <Reveal delay={0.56}>
                <p className="mt-3.5 max-w-[40ch] text-[0.9rem] leading-[1.72] text-muted">
                  Sometimes that means code. Sometimes a book.
                  Sometimes sitting quietly and noticing my own
                  mind.
                </p>
              </Reveal>
            </div>

            {/* Personal life line */}

            <Reveal delay={0.66}>
  <div className="mt-6 sm:mt-8">
    <p className="mb-3 font-mono text-[8px] tracking-[0.28em] text-faint sm:text-[9px]">
      THESE DAYS:
    </p>

    <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-[11px] text-muted sm:gap-x-6 sm:gap-y-3 sm:text-[12px]">
      <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-paper">
        <LuHammer
          aria-hidden
          className="size-3 text-[#c4b5fd]/70 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
        Building
      </span>

      <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-paper">
        <LuBookOpen
          aria-hidden
          className="size-3 text-[#c4b5fd]/70 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
        Philosophy
      </span>

      <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-paper">
        <LuFlower2
          aria-hidden
          className="size-3 text-[#c4b5fd]/70 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
        Meditation
      </span>

      <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-paper">
        <LuCircleHelp
          aria-hidden
          className="size-3 text-[#c4b5fd]/70 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
        Questions
      </span>

      <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-paper">
        <LuTv
          aria-hidden
          className="size-3 text-[#c4b5fd]/70 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
        Anime
      </span>
    </div>
  </div>
</Reveal>

          </div>

          {/* ═════════════ ABOUT ═════════════ */}

          <Reveal
            delay={0.54}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <aside
              aria-label="About Chandrashekhar"
              className="max-w-[42ch] border-l border-line pl-4 transition-all duration-500 hover:border-[#8f84c7]/60 sm:pl-6"
            >
              <p className="font-mono text-[8px] tracking-[0.3em] text-sky-500 sm:text-[10px]">
                ABOUT
              </p>

              {/* Desktop About */}

              <div className="mt-4 hidden space-y-4 text-[13px] leading-[1.8] text-muted sm:block">
                <p className="text-paper">
                  Building is how I learn.
                </p>

                <p>
                  When something breaks, I want to know why — not
                  just how to patch it. I like pulling things apart,
                  following the chain of cause and effect, and
                  seeing where my assumptions stop matching reality.
                </p>

                <p>
                  Philosophy does something similar for the
                  questions that code can&rsquo;t answer. It makes
                  me question the frame, not just look for an answer
                  inside it.
                </p>

                <p>
                  Meditation gives me another way to look. Instead
                  of trying to solve every thought, I&rsquo;m
                  learning to sit still enough to notice what is
                  actually happening.
                </p>

                <p className="text-paper/85">
                  I&rsquo;m less interested in having all the answers
                  than in getting better at asking the right
                  questions.
                </p>
              </div>

              {/* Mobile About */}

              <div className="mt-3.5 space-y-3 text-[11px] leading-[1.72] text-muted sm:hidden">
                <p className="text-paper">
                  Building is how I learn.
                </p>

                <p>
                  When something breaks, I want to know why. I like
                  following the chain of cause and effect until I
                  find where my assumptions stop matching reality.
                </p>

                <p>
                  Philosophy helps me question the frame. Meditation
                  helps me notice what happens before I try to explain
                  it.
                </p>

                <p className="text-paper/85">
                  I&rsquo;m more interested in asking better questions
                  than collecting easy answers.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </main>

      {/* ═════════════════ FOOTER ═════════════════ */}

<footer className="border-t border-line">
  <div className="group mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-2.5">
    <span className="h-px w-3 bg-faint/30 transition-all duration-500 ease-out group-hover:w-6 group-hover:bg-faint/60" />

    <p className="font-serif text-xs italic tracking-wide text-faint/80 transition-all duration-500 ease-out group-hover:text-faint/90 sm:text-[13px]">
      What you seek is seeking you.
    </p>

    <span className="h-px w-3 bg-faint/30 transition-all duration-500 ease-out group-hover:w-6 group-hover:bg-faint/60" />
  </div>
</footer>
    </div>
  );
}

/* ═════════════════ PAGE ═════════════════ */

export default function Page() {
  return <HomeView />;
}

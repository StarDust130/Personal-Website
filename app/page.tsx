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
  LuTv,
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
   INDIA TIME
   ═══════════════════════════════════════════════════════════════ */

function Clock() {
  return (
    <span suppressHydrationWarning>
      <span className="mx-1.5 text-[#9b8ed8]/60">·</span>
      <TimeText />
    </span>
  );
}

function TimeText() {
  return (
    <MountGate fallback="IST">
      {() => {
        const parts = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).formatToParts(new Date());

        const get = (type: Intl.DateTimeFormatPartTypes) =>
          parts.find((part) => part.type === type)?.value ?? "";

        return `${get("day")} ${get("month")} · ${get(
          "hour"
        )}:${get("minute")} ${get("dayPeriod").toUpperCase()} IST`;
      }}
    </MountGate>
  );
}

function MountGate({
  children,
  fallback,
}: {
  children: () => string;
  fallback: string;
}) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setText(children());

    tick();

    const id = window.setInterval(tick, 30_000);

    return () => window.clearInterval(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{text ?? fallback}</>;
}

/* ═══════════════════════════════════════════════════════════════
   SHARED LINK STYLE
   ═══════════════════════════════════════════════════════════════ */

const linkBase =
  "group inline-flex items-center gap-1.5 text-[12px] text-muted transition-all duration-300 hover:-translate-y-px sm:text-[13px]";

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */

function HomeView() {
  return (
    <div className="min-h-svh bg-ink">
      {/* ═════════════════ HEADER ═════════════════ */}

      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 pt-5 sm:gap-5 sm:px-10 sm:pt-7 lg:flex-row lg:items-center lg:justify-between">
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

        <Reveal delay={0.08}>
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2.5 sm:gap-x-7 sm:gap-y-3">
              {/* Resume */}

              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkBase} hover:text-[#c4b5fd]`}
                >
                  <LuFileText
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:rotate-[-5deg]"
                    strokeWidth={1.5}
                  />

                  <span>Resume</span>

                  <LuArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    strokeWidth={1.5}
                  />
                </a>
              </li>

              {/* Projects */}

              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="See my projects on GitHub"
                  className={`${linkBase} hover:text-[#f5f5f5]`}
                >
                  <FaGithub
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                  />

                  <span>Projects</span>

                  <LuArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    strokeWidth={1.5}
                  />
                </a>
              </li>

              {/* X */}

              <li>
                <a
                  href={site.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chandrashekhar Yadav on X"
                  className={`${linkBase} hover:text-[#9fb7d4]`}
                >
                  <FaXTwitter
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                  />

                  <span>@the_csyadav</span>
                </a>
              </li>

              {/* Email */}

              <li>
                <a
                  href={mailto}
                  aria-label={`Email ${site.name}`}
                  className={`${linkBase} hover:text-[#7dd3fc]`}
                >
                  <LuMail
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />

                  <span>Email</span>
                </a>
              </li>
            </ul>
          </nav>
        </Reveal>
      </header>

      {/* ═════════════════ HERO ═════════════════ */}

      <main className="mx-auto w-full max-w-6xl px-5 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 lg:flex lg:min-h-[calc(100svh-7rem)] lg:flex-col lg:justify-center lg:py-6">
        {/* Eyebrow */}

        <Reveal delay={0.12}>
          <p className="flex items-center gap-3 font-mono text-[8px] tracking-[0.32em] text-faint sm:text-[10px]">
            <span
              aria-hidden
              className="h-px w-6 bg-[#a78bfa]/55 sm:w-7"
            />

            <span>HELLO, I&rsquo;M</span>

            <span
              aria-hidden
              className="size-1 rounded-full bg-[#a78bfa]/80 shadow-[0_0_10px_rgba(167,139,250,0.7)]"
            />
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
      THESE DAYS
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

            {/* Projects */}

            <Reveal delay={0.74}>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 border-b border-line pb-1.5 text-[12px] text-paper transition-all duration-300 hover:border-[#a78bfa] hover:text-[#c4b5fd] sm:mt-8 sm:text-[13px]"
              >
                <FaGithub
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                />

                <span>See my projects</span>

                <LuArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                  strokeWidth={1.5}
                />
              </a>
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
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 font-mono text-[8px] tracking-[0.14em] text-faint sm:px-10 sm:py-4 sm:text-[10px] sm:tracking-[0.21em]">
          {/* Time */}

          <p className="whitespace-nowrap">
            {site.location.toUpperCase()} · {site.year}
            <Clock />
          </p>

          {/* Center */}

          <p className="hidden md:block text-faint/70">
            BUILDING · THINKING · LEARNING
          </p>

          {/* Availability */}

          <p className="group flex cursor-default items-center gap-2 whitespace-nowrap text-emerald-300/75 transition-colors duration-300 hover:text-emerald-300">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute size-2 animate-ping rounded-full bg-emerald-400/25" />

              <span className="relative size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            </span>

            <span>AVAILABLE FOR WORK</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ═════════════════ PAGE ═════════════════ */

export default function Page() {
  return <HomeView />;
}
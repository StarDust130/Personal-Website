"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowRight,
  Github,
  Code2,
  ExternalLink,
  Terminal,
  Cpu,
  Star,
  GitFork,
  Menu,
  X,
  Filter,
  Globe,
  Zap,
  Activity,
  Box,
  Layout,
  Smartphone,
  Mail,
} from "lucide-react";

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  image: string;
  stars: number;
  forks: number;
  category: string;
}

// --- Mock Data for Projects ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Neon Nexus",
    description:
      "A modern e-commerce dashboard featuring real-time data visualization and inventory management.",
    stack: ["Next.js", "TypeScript", "D3.js"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    stars: 124,
    forks: 35,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Cyber Chat",
    description:
      "Secure messaging application with end-to-end encryption and anonymous login capabilities.",
    stack: ["React", "Firebase", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    stars: 89,
    forks: 12,
    category: "App",
  },
  {
    id: 3,
    title: "Void Runner",
    description:
      "A 3D browser game built with Three.js. Navigate through procedural endless terrain.",
    stack: ["Three.js", "WebGL", "GSAP"],
    image:
      "https://images.unsplash.com/photo-1614726365723-49fa6d91fbb6?q=80&w=2070&auto=format&fit=crop",
    stars: 256,
    forks: 40,
    category: "Game",
  },
  {
    id: 4,
    title: "Crypto Sentinel",
    description:
      "AI-powered cryptocurrency trend predictor using sentiment analysis from social media feeds.",
    stack: ["Python", "FastAPI", "React"],
    image:
      "https://images.unsplash.com/photo-1621504450168-38f647315431?q=80&w=2070&auto=format&fit=crop",
    stars: 67,
    forks: 8,
    category: "AI/ML",
  },
  {
    id: 5,
    title: "Task Protocol",
    description:
      "Minimalist task management system for developers with integrated pomodoro timer and git tracking.",
    stack: ["Vue", "Tailwind", "Supabase"],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop",
    stars: 45,
    forks: 5,
    category: "Productivity",
  },
  {
    id: 6,
    title: "Portfolio V1",
    description:
      "The legacy version of my portfolio. A study in brutalist design and raw HTML/CSS.",
    stack: ["HTML5", "SASS", "JS"],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    stars: 312,
    forks: 88,
    category: "Frontend",
  },
];

// --- Reusable Components ---

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      const moveCursor = (e: MouseEvent) => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      };
      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    }
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 border-2 border-red-600 rounded-full pointer-events-none z-[100] hidden lg:block -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-full h-full border border-red-600 rounded-full animate-ping opacity-20" />
    </div>
  );
};

const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            rgba(220, 38, 38, 0.08),
            transparent 80%
          )
        `,
      }}
    />
  );
};

const HoverLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden group hover:text-red-600 transition-colors duration-300"
    >
      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-red-600 font-black">
        {children}
      </span>
    </Link>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative group inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-600 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse z-0 mix-blend-screen">
        {text}
      </span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse delay-75 z-0 mix-blend-screen">
        {text}
      </span>
    </div>
  );
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = e.clientX - rect.left - width / 2;
      const mouseYFromCenter = e.clientY - rect.top - height / 2;

      x.set(mouseXFromCenter / width);
      y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
      return (
        <div ref={ref} className={className}>
          <div className="h-full w-full">{children}</div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`perspective-1000 ${className}`}
      >
        <div
          className="h-full w-full"
          style={{ transform: "translateZ(20px)" }}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

TiltCard.displayName = "TiltCard";

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeChar, 30);
        }
      };
      typeChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

// --- NEW ANIMATED CODE BLOCK (Brutalist Style) ---
type CodeSegment = {
  text: string;
  className: string;
};

const codeSegments: CodeSegment[] = [
  { text: "const", className: "text-red-600 font-semibold" },
  { text: " Developer ", className: "text-blue-800" },
  { text: "=", className: "text-gray-700" },
  { text: " {", className: "text-gray-700" },
  { text: "\n  name: ", className: "text-gray-800" },
  { text: '"Chandrashekhar"', className: "text-emerald-700" },
  { text: ",\n  role: ", className: "text-gray-800" },
  { text: '"Full Stack Developer 😇"', className: "text-emerald-700" },
  { text: ",\n  focus: ", className: "text-gray-800" },
  { text: '"Building Scalable Apps"', className: "text-emerald-700" },
  { text: ",\n  stack: [", className: "text-gray-800" },
  { text: '"Next.js"', className: "text-emerald-700" },
  { text: ", ", className: "text-gray-700" },
  { text: '"React"', className: "text-emerald-700" },
  { text: ", ", className: "text-gray-700" },
  { text: '"AI Integration"', className: "text-emerald-700" },
  { text: ", ", className: "text-gray-700" },
  { text: '"Node"', className: "text-emerald-700" },
  { text: "],\n  status: ", className: "text-gray-800" },
  { text: '"Available for hire"', className: "text-emerald-700" },
  {
    text: ",\n  init: function() {\n    return this.createValue();\n  }\n};",
    className: "text-gray-800",
  },
];

const totalCodeLength = codeSegments.reduce(
  (sum, segment) => sum + segment.text.length,
  0
);

const AnimatedCodeBlock = () => {
  const getSegmentsUpTo = (count: number) => {
    let remaining = count;
    return codeSegments.map((segment) => {
      if (remaining <= 0) {
        return { ...segment, text: "" };
      }
      const visibleText = segment.text.slice(0, remaining);
      remaining -= segment.text.length;
      return { ...segment, text: visibleText };
    });
  };

  const [visibleSegments, setVisibleSegments] = useState<CodeSegment[]>(() =>
    getSegmentsUpTo(0)
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setVisibleSegments(getSegmentsUpTo(i));
      if (i >= totalCodeLength) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileHover={{ rotate: -0.3, translateY: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative font-mono text-[10px] sm:text-xs md:text-sm bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-900/80 rounded-xl p-4 md:p-6 shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 w-full max-w-lg mx-auto overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.14),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.1),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl mix-blend-multiply opacity-10 [background-image:repeating-linear-gradient(transparent_0,transparent_12px,rgba(0,0,0,0.06)_12px,rgba(0,0,0,0.06)_14px)]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/40 shadow-[0_24px_40px_-22px_rgba(0,0,0,0.7)]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="bg-black text-white px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm border border-black shadow-[4px_4px_0_rgba(0,0,0,0.7)]">
            PROFILE.JS
          </div>
          <div className="flex items-center gap-2 text-[9px] font-semibold text-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 border border-black shadow-[2px_2px_0_rgba(0,0,0,0.6)]" />
              <div className="w-3 h-3 bg-amber-300 border border-black shadow-[2px_2px_0_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>

        <pre className="mt-4 whitespace-pre-wrap text-gray-800 leading-relaxed">
          {visibleSegments.map((segment, idx) => (
            <span key={idx} className={segment.className}>
              {segment.text}
            </span>
          ))}
          <span className="animate-pulse inline-block w-2 h-4 bg-black align-middle ml-1" />
        </pre>
      </div>
    </motion.div>
  );
};

const MagneticButton = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      className={className}
    >
      {children}
    </a>
  );
};

// --- Main Page Component ---

export default function ProjectPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]); // Parallax for grid
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(typeof window !== "undefined" && window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const categories = [
    "All",
    ...Array.from(new Set(PROJECTS.map((p) => p.category))),
  ];

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black font-sans selection:bg-red-600 selection:text-white overflow-x-hidden relative perspective-1000">
      <CustomCursor />
      <Spotlight />

      {/* Background Grid - Animated Parallax */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          y: bgY,
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></motion.div>

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none z-[1] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-2 border-black ${
          scrolled
            ? "bg-white/90 backdrop-blur-md py-2 shadow-lg"
            : "bg-[#e5e5e5]/80 backdrop-blur-sm py-4"
        } ${isMenuOpen ? "opacity-0 pointer-events-none hidden" : ""}`}
        aria-hidden={isMenuOpen}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black font-serif text-xl group-hover:bg-red-600 transition-colors border-2 border-transparent group-hover:border-black shrink-0 relative overflow-hidden">
              <span className="relative z-10">CY</span>
              <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold leading-none">
                Chandrashekhar Y
              </span>
              <span className="font-mono text-[10px] text-gray-500 uppercase leading-none mt-1 hidden sm:block">
                Project Archives{" "}
                <span className="text-red-600 animate-pulse">●</span>
              </span>
            </div>
          </Link>

            <div className="hidden md:flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest">
              <Link
              href="/"
              className="group inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
              >
              <span className="relative">
                Home
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </span>
              </Link>

              <Link
              href="https://github.com/StarDust130"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-gradient-to-r from-black to-gray-800 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]"
              >
              <span>GitHub</span>
              <Github size={14} className="group-hover:scale-110 transition-transform" />
              </Link>

              <Link
              target="_blank"
              href="mailto:csyadav0513@gmail.com"
              className="group inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-red-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-black hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
              <span>Let&apos;s Talk</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          <button
            className="md:hidden p-2 z-50 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center md:hidden border-l-4 border-black"
          >
            <button
              className="absolute top-4 right-4 p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-8 text-center font-display font-black text-3xl uppercase">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <a
                href="https://github.com/StarDust130"
                target="_blank"
                rel="noreferrer"
                className="text-base font-mono bg-black text-white px-6 py-3"
              >
                GitHub Profile
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header className="relative pt-24 md:pt-36 pb-12 md:pb-20 border-b-2 border-black overflow-hidden bg-white/50 backdrop-blur-sm z-10">
        <div className="absolute top-24 md:top-32 left-2 md:left-10 text-[10px] font-mono text-gray-400 rotate-90 origin-left flex items-center gap-2">
          <Activity size={10} className="animate-pulse text-red-600" /> DIR:
          /USR/PROJECTS
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="bg-red-600 text-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Available for Work
                </span>
                <div className="h-[2px] w-8 md:w-12 bg-black animate-pulse"></div>
                <span className="font-mono text-[10px] text-gray-500 uppercase">
                  <TypewriterText
                    text="LOADING PORTFOLIO V2.0..."
                    delay={500}
                  />
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] md:leading-[0.8] tracking-tighter mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-b from-black via-black to-gray-700 relative z-20 mix-blend-hard-light overflow-hidden">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.2,
                    }}
                  >
                    DIGITAL
                  </motion.div>
                </div>
                <div className="overflow-hidden relative">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.3,
                    }}
                    className="text-stroke-sm text-transparent relative"
                  >
                    CRAFTSMAN
                    <span className="absolute inset-0 text-red-600 opacity-20 blur-sm">
                      CRAFTSMAN
                    </span>
                  </motion.div>
                </div>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="font-serif italic text-lg md:text-2xl max-w-lg border-l-4 border-red-600 pl-4 md:pl-6 text-gray-800 bg-white/40 p-4 backdrop-blur-sm"
              >
                <span className="font-black text-red-600 text-3xl float-left mr-2 leading-none">
                  "
                </span>
                I build accessible, pixel-perfect, and performant web
                experiences. Specializing in React, Next.js, and modern UI
                engineering.
              </motion.div>
            </div>

            {/* Right Content: Animated Code Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
              className="hidden lg:block perspective-1000"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateX: [2, 5, 2],
                  rotateY: [-5, -2, -5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <AnimatedCodeBlock />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Marquee Section */}
      <div className="border-b-2 border-black bg-yellow-400 overflow-hidden py-3 relative z-20">
        <motion.div
          className="whitespace-nowrap flex gap-8 font-display font-black uppercase text-xl md:text-2xl tracking-tighter text-black items-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {Array(10)
            .fill("")
            .map((_, i) => (
              <React.Fragment key={i}>
                <span>Selected Works</span>
                <span className="text-red-600 text-sm">✦</span>
                <span>Case Studies</span>
                <span className="text-white text-sm">✦</span>
                <span>Experiments</span>
                <span className="text-black text-sm">✦</span>
              </React.Fragment>
            ))}
        </motion.div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-[#e5e5e5]/95 backdrop-blur-md border-b-2 border-black py-4 overflow-x-auto no-scrollbar shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-4">
          <Filter size={16} className="text-red-600 shrink-0" />
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest border-2 transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-black text-white border-black transform -translate-y-1 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                    : "bg-white text-black border-black hover:bg-gray-100"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 border border-gray-400 px-3 py-1 rounded-full bg-white whitespace-nowrap">
            <Terminal size={14} className="text-green-600" />
            <span>{filteredProjects.length} PROJECTS</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-12 md:py-20 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <TiltCard
                  key={project.id}
                  className="group relative bg-white border-2 border-black flex flex-col h-full hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="h-full flex flex-col"
                  >
                    {/* Card Header (Browser Style) */}
                    <div className="bg-black text-white p-2.5 flex justify-between items-center border-b-2 border-black">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-600"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-700"></div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                        PRJ-00{project.id} // SECURE
                      </span>
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black bg-gray-100 group-hover:border-red-600 transition-colors">
                      {/* Scanning Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 blur-sm z-30 pointer-events-none animate-[scan_4s_linear_infinite]"></div>
                      <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>

                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                      />

                      {/* Overlay Tag */}
                      <div className="absolute top-3 right-3 bg-white border-2 border-black px-2 py-1 z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[10px] font-black uppercase font-display flex items-center gap-1">
                          {project.category === "Game" ? (
                            <Smartphone size={10} />
                          ) : project.category === "App" ? (
                            <Layout size={10} />
                          ) : (
                            <Box size={10} />
                          )}
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow relative bg-white">
                      {/* Decorative elements */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 delay-75"></div>

                      <h3 className="text-2xl md:text-3xl font-black font-display uppercase mb-3 group-hover:text-red-600 transition-colors leading-none tracking-tight">
                        <GlitchText text={project.title} />
                      </h3>

                      <p className="font-serif text-sm text-gray-600 leading-relaxed mb-6 flex-grow border-l-2 border-gray-200 pl-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-[#f0f0f0] border border-black/10 text-[10px] font-mono uppercase font-bold text-gray-600 hover:bg-black hover:text-white transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Stats & Link */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-black/10 mt-auto">
                        <div className="flex gap-4 font-mono text-xs font-bold text-gray-500">
                          <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors cursor-help bg-yellow-50 px-2 py-1 rounded">
                            <Star
                              size={12}
                              className="fill-yellow-500 text-yellow-500"
                            />{" "}
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-help bg-blue-50 px-2 py-1 rounded">
                            <GitFork size={12} className="text-blue-500" />{" "}
                            {project.forks}
                          </span>
                        </div>

                        <a
                          href="https://github.com/StarDust130"
                          target="_blank"
                          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black group-hover:text-red-600 group-hover:underline decoration-2 underline-offset-4 transition-all"
                        >
                          View Code{" "}
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-20 md:py-32 bg-[#e5e5e5] border-t-2 border-black relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 pointer-events-none mix-blend-multiply"></div>

        {/* New "Horizon Grid" Animation Background - Replaces Marquee */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-t from-[#e5e5e5] to-transparent z-10"></div>
          <motion.div
            className="absolute inset-0 bg-[size:50px_50px] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"
            style={{
              transform: "rotateX(60deg) scale(2)",
              transformOrigin: "50% 100%",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "0px 100px"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 2,
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-50"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block border-2 border-red-600 text-red-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-10 animate-pulse bg-red-50">
            ● Incoming Transmission
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black font-display uppercase mb-12 leading-none relative"
          >
            Have an idea?
            <br />
            <div className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-black">
                Let's Build It.
              </span>
              <span className="absolute bottom-0 left-0 w-full h-2 md:h-4 bg-black origin-left"></span>
            </div>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <MagneticButton
              href="mailto:csyadav0513@gmail.com"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 md:px-12 md:py-6 text-lg md:text-2xl font-mono font-bold uppercase border-4 border-black hover:bg-black hover:text-white transition-colors duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <Mail className="w-6 h-6 md:w-8 md:h-8" />
              <span>Let&apos;s Talk</span>
            </MagneticButton>

            <MagneticButton
              href="https://github.com/StarDust130"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 md:px-12 md:py-6 text-lg md:text-2xl font-mono font-bold uppercase border-4 border-transparent hover:bg-red-600 hover:border-black transition-colors duration-200 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]"
            >
              <Github className="w-6 h-6 md:w-8 md:h-8" />
              <span>GitHub</span>
              <ExternalLink className="w-5 h-5 opacity-50" />
            </MagneticButton>
          </motion.div>

          <p className="mt-16 font-mono text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em]">
            // Available for freelance & full-time roles
          </p>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="bg-black text-white border-t-8 border-red-600 pt-16 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Zap size={120} className="text-white transform rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-green-500 uppercase tracking-widest">
                Status: Online
              </span>
            </div>
            <h4 className="font-display font-black text-3xl uppercase tracking-tight">
              Chandrashekhar Y
            </h4>
            <p className="font-mono text-xs text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
              Full Stack Developer • India • React • Next.js • Design Engineer
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="#"
              className="p-3 border border-white/20 hover:bg-white hover:text-black transition-all hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="p-3 border border-white/20 hover:bg-blue-500 hover:text-white transition-all hover:scale-110"
            >
              <Globe size={20} />
            </a>
            <a
              href="#"
              className="p-3 border border-white/20 hover:bg-pink-500 hover:text-white transition-all hover:scale-110"
            >
              <Code2 size={20} />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          <span>© 2024 Chandrashekhar Y</span>
          <span>Built with React & Tailwind</span>
        </div>
      </footer>

      <style>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

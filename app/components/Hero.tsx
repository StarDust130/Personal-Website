"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { interests } from "../lib/data";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Animation load sequence
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Mobile-optimized 3D Grid with parallax */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full bg-black overflow-hidden perspective">
          <div
            className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
            style={{
              backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
              backgroundSize: "30px 30px", // Reduced grid size for mobile
              transform: `rotateX(60deg) translateY(${
                scrollY * 0.5
              }px) translateX(${(mouseX - 0.5) * -10}px)`,
              transformOrigin: "center center",
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>
      </div>

      {/* Optimized neon circles for mobile */}
      <div
        className="absolute -top-20 right-0 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-float-slow opacity-60 md:opacity-80 md:top-1/4 md:left-1/4"
        style={{
          transform: `translate(${(mouseX - 0.5) * -20}px, ${
            (mouseY - 0.5) * -20
          }px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-48 h-48 rounded-full bg-blue-600/20 blur-3xl animate-float opacity-60 md:opacity-80 md:right-1/4 md:left-auto"
        style={{
          transform: `translate(${(mouseX - 0.5) * 15}px, ${
            (mouseY - 0.5) * 15
          }px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-56 h-56 rounded-full bg-teal-600/20 blur-3xl animate-float-medium opacity-60 md:opacity-80 md:left-1/3 md:right-auto"
        style={{
          transform: `translate(${(mouseX - 0.5) * -10}px, ${
            (mouseY - 0.5) * 10
          }px)`,
          transition: "transform 0.25s ease-out",
        }}
      />

      {/* Mobile-optimized content wrapper */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pb-16 z-10">
        {/* Mobile-friendly Split Name Display with reveal animation */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 w-full">
          <div className="flex items-center space-x-2 sm:space-x-3 justify-center">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
            <h1 className="text-[1.8rem] sm:text-5xl md:text-7xl font-black tracking-tighter text-white text-center">
              <span className="inline-block relative z-0 glitch-wrapper">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-200 to-white">
                  CHANDRASHEKHAR
                </span>
                <span className="absolute -left-1 -top-1 text-purple-600 opacity-50 z-0 animate-pulse">
                  CHANDRASHEKHAR
                </span>
                <span className="absolute -right-1 -bottom-1 text-blue-600 opacity-30 z-0 hidden sm:block glitch-effect">
                  CHANDRASHEKHAR
                </span>
              </span>
            </h1>
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text">
            <h2 className="font-mono text-xs sm:text-md md:text-xl tracking-widest typewriter text-center text-transparent">
              DEVELOPER • THINKER • DREAMER
            </h2>
          </div>
        </div>

        {/* Modern Gen Z Style Cyberpunk Stats Card */}
        <div
          className={`relative max-w-3xl w-full bg-gradient-to-br from-black/90 via-black/70 to-purple-900/30 backdrop-blur-lg border border-purple-500/30 p-5 sm:p-7 rounded-xl mb-8 sm:mb-12 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } shadow-lg shadow-purple-900/20`}
        >
          {/* Animated corner accents */}
          <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6">
            <div className="absolute w-full h-full border-t-2 border-l-2 border-purple-500 animate-pulse rounded-tl-md"></div>
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-0 left-0 animate-ping-slow"></div>
          </div>
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6">
            <div className="absolute w-full h-full border-t-2 border-r-2 border-purple-500 animate-pulse rounded-tr-md"></div>
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-0 right-0 animate-ping-slow"></div>
          </div>
          <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6">
            <div className="absolute w-full h-full border-b-2 border-l-2 border-purple-500 animate-pulse rounded-bl-md"></div>
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full bottom-0 left-0 animate-ping-slow"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6">
            <div className="absolute w-full h-full border-b-2 border-r-2 border-purple-500 animate-pulse rounded-br-md"></div>
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full bottom-0 right-0 animate-ping-slow"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-stretch gap-4 sm:gap-6">
            {/* Gen Z Style Interests Section */}

            <div className="w-full md:w-1/2">
              <div className="p-6 bg-black/30 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
                {/* Title with futuristic gradient glow */}
                <h3
                  className="text-xl sm:text-2xl font-bold font-mono 
         text-center mb-6"
                >
                  <span className="bg-clip-text text-transparent tracking-widest bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 ">
                    INTERESTS
                  </span>{" "}
                  🚀
                </h3>

                {/* Interest List */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className={`relative px-4 py-2 flex items-center justify-center rounded-full 
          border border-white/20 bg-gradient-to-br from-black/50 to-black/40
          text-white font-semibold shadow-lg 
          transition-all duration-300 hover:scale-110 
          cursor-pointer`}
                    >
                      {/* Text with Subtle Shine */}
                      <span className="relative z-10">{interest.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gen Z Style Content Section */}
            <div className="w-full md:w-2/3 mt-0">
              <div className="bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-lg">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  I love picking up new skills (when I&apos;m not 
                  procrastination 😅), exploring{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-200 hover:to-purple-400 transition-all cursor-default">
                    mind-bending ideas
                  </span>{" "}
                  🤯, and getting lost in books, anime, and movies 🎬.
                </p>

                <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                  Dreaming of launching a{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-300 hover:to-pink-400 transition-all cursor-default">
                    startup that actually matters
                  </span>{" "}
                  💡. Until then, chasing cool ideas one step at a time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex  md:flex-row items-center w-full justify-center gap-4">
          <Link href="mailto:csyadav0513@gmail.com" target="_blank">
            <button className="button mt-3">
              <div>
                <span>Let&apos;s Chat 💬</span>
              </div>
            </button>
          </Link>

          <Link href="#explore">
            <button className="button mt-3">
              <div>
                <span>Explore 🚀</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

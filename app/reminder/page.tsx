"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";

const targetDate = new Date("2030-03-13T00:00:00").getTime();

export default function JapanTripCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) return;

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
      );
      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
      );
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    const initialTick = window.setTimeout(calculateTimeLeft, 0);
    const timer = window.setInterval(calculateTimeLeft, 1000);

    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(timer);
    };
  }, []);

  const timeUnits = [
    { label: "YEARS", value: timeLeft.years, kanji: "年", id: "Y-01" },
    { label: "MONTHS", value: timeLeft.months, kanji: "月", id: "M-02" },
    { label: "DAYS", value: timeLeft.days, kanji: "日", id: "D-03" },
    { label: "HOURS", value: timeLeft.hours, kanji: "時", id: "H-04" },
    { label: "MINS", value: timeLeft.minutes, kanji: "分", id: "M-05" },
    { label: "SECS", value: timeLeft.seconds, kanji: "秒", id: "S-06" },
  ];

  // Grid Animation Variants
  const gridContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 1.2 },
    },
  };

  const gridItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F0EBE1] text-[#0A0A0A] font-sans selection:bg-[#D91A2A] selection:text-white overflow-x-hidden">
      {/* Global Noise Texture */}
      <div
        className="fixed inset-0 opacity-[0.5] pointer-events-none z-50 mix-blend-multiply"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Animated Header Block */}
      <header className="p-6 sm:p-10 flex flex-col items-center text-center overflow-hidden border-b-[2px] border-[#0A0A0A] relative z-10 shrink-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.04, delayChildren: 0.1 },
            },
          }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-[6rem] font-black tracking-tighter uppercase leading-none flex flex-wrap justify-center gap-x-3 sm:gap-x-5">
            {"JAPAN TOUR".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="flex overflow-hidden pb-2">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: { y: "0%", opacity: 1 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="flex items-center justify-center gap-4 mt-2 sm:mt-5 w-full">
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 0.6, delay: 0.6, ease: "circOut" }}
              className="h-[3px] sm:h-[4px] w-12 sm:w-24 bg-[#0A0A0A] origin-right"
            />
            <motion.h2
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-widest uppercase text-[#D91A2A] flex items-center gap-3"
            >
              BEFORE 25{" "}
              <span className="text-3xl sm:text-5xl grayscale hover:grayscale-0 transition-all duration-300">
                ⛩️
              </span>
            </motion.h2>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 0.6, delay: 0.6, ease: "circOut" }}
              className="h-[3px] sm:h-[4px] w-12 sm:w-24 bg-[#0A0A0A] origin-left"
            />
          </div>
        </motion.div>
      </header>

      {/* Edge-to-Edge Brutalist Grid */}
      <motion.main
        variants={gridContainer}
        initial="hidden"
        animate="visible"
        className="flex-1 w-full grid grid-cols-3 lg:grid-cols-6 bg-[#0A0A0A] gap-[2px] relative z-10"
      >
        {timeUnits.map((unit) => (
          <motion.div
            variants={gridItem}
            key={unit.label}
            className="bg-[#F0EBE1] hover:bg-[#E5DFD3] transition-colors duration-300 p-4 sm:p-8 flex flex-col relative group overflow-hidden cursor-default"
          >
            {/* Technical Header */}
            <div className="flex justify-between items-center border-b-[2px] border-[#0A0A0A] pb-2 mb-2 sm:mb-6">
              <span className="text-[10px] sm:text-sm font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                0 / {unit.id} ►
              </span>
              <span className="bg-[#0A0A0A] text-[#F0EBE1] text-[10px] sm:text-sm px-3 py-1 font-bold">
                {unit.kanji}
              </span>
            </div>

            {/* Massive Number Display with Fluid Spring Physics */}
            <div className="flex-1 flex items-center justify-center py-4 relative">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{
                    y: "40%",
                    opacity: 0,
                    filter: "blur(12px)",
                    scale: 0.9,
                  }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                  }}
                  exit={{
                    y: "-40%",
                    opacity: 0,
                    filter: "blur(12px)",
                    scale: 1.1,
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute text-[22vw] lg:text-[11rem] xl:text-[13rem] font-black tabular-nums tracking-tighter leading-none"
                >
                  {unit.value.toString().padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Footer Label */}
            <div className="mt-2 sm:mt-6 pt-2 sm:pt-4 border-t-[2px] border-[#0A0A0A] flex justify-between items-end">
              <span className="text-xl sm:text-3xl xl:text-4xl font-black uppercase tracking-tight">
                {unit.label}
              </span>
              <span className="text-[#D91A2A] text-[10px] sm:text-sm font-bold tracking-widest hidden sm:block">
                [ ⏳ ]
              </span>
            </div>
          </motion.div>
        ))}
      </motion.main>

      {/* Foundational Quote & Financial Requirement Footer */}
      <motion.footer
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#D91A2A] border-t-[2px] border-[#0A0A0A] p-4 sm:p-8 relative z-10 shrink-0"
      >
        <div className="max-w-screen-2xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6 w-full">
          
          {/* Typographical Financial Target (Japanese Brutalist Text) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-6 border-l-[4px] sm:border-l-[8px] border-[#0A0A0A] pl-4 sm:pl-6 py-2">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-black text-[#0A0A0A] tracking-[0.4em] uppercase mb-1">
                Required Capital // 必須資金
              </span>
              <span
                className="text-4xl sm:text-5xl md:text-7xl font-black text-[#F0EBE1] tracking-tighter uppercase leading-none drop-shadow-[4px_4px_0_#0A0A0A]"
                style={{ WebkitTextStroke: "1.5px #0A0A0A" }}
              >
                ₹ 3,00,000 +
             
              </span>
            </div>
          </div>


          {/* Aggressive Directive */}
          <div className="flex-1 text-center xl:text-right">
            <p className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-tight drop-shadow-sm">
              Don&apos;t waste time.
              <br className="hidden sm:block xl:hidden" /> Earn now or regret
              later.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  Zap,
  Crown,
  Camera,
  Book,
  Palette,
  Eye,
} from "lucide-react";
import confetti from "canvas-confetti";
import DreamCard from "./DreamCard";

const DatingPrefsCard = () => {
  const [mode, setMode] = useState("angel");
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [hoverPos] = useState({ x: 0, y: 0 });
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [showDreamCard, setShowDreamCard] = useState(false);

  const triggerSpecialEasterEgg = () => {
    setSecretUnlocked(true);
    // First confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF69B4", "#FFB6C1", "#FFC0CB"],
    });

    // Multiple bursts
    setTimeout(() => {
      const end = Date.now() + 2000;
      const colors = ["#FFD700", "#FF69B4", "#87CEEB"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 500);

    setTimeout(() => {
      setShowDreamCard(true);
    }, 800);
  };

  const angelTraits = [
    {
      icon: Heart,
      text: "Emotionally Smart 💖",
      subtext: "understands me perfectly",
      details:
        "• Always knows what to say\n• Makes me feel heard\n• Balances love and space",
    },
    {
      icon: Star,
      text: "No Pressure ✨",
      subtext: "doesn’t follow the crowd",
      details:
        "• Focused on her goals\n• Chooses happiness over expectations\n• Not prep for a gov job, not bowing to parental pressure",
    },
    {
      icon: Book,
      text: "Intellectually Hot 📚",
      subtext: "brains + beauty = perfect combo",
      details:
        "• Loves deep talks\n• Challenges me to think\n• Sexy and clever at the same time",
    },
    {
      icon: Heart,
      text: "Loyal & Respectful 🤝",
      subtext: "treats me like I treat her",
      details:
        "• Always has my back\n• Respect comes first\n• Best friend and partner in one",
    },
    {
      icon: Eye,
      text: "Certified Stalker 👀",
      subtext: "always keeping an eye on me",
      details:
        "• Knows every detail about me... even the ones I forgot\n• Can find me anywhere, even when I’m hiding\n• Has been stalking since high school, no big deal 😎",
    },
  ];

  const devilTraits = [
    {
      icon: Crown,
      text: "That Confidence 👑",
      subtext: "main character energy",
      details: "• Self-assured\n• Natural swag\n• Magnetic personality",
    },
    {
      icon: Zap,
      text: "Fitness Goals 💪",
      subtext: "gym lifestyle",
      details: "• Athletic build\n• Active lifestyle\n• Health conscious",
    },
    {
      icon: Camera,
      text: "Style & Grace 📸",
      subtext: "always camera ready",
      details: "• Fashion sense\n• Natural beauty\n• Effortless style",
    },
    {
      icon: Palette,
      text: "Creative Flair 🎨",
      subtext: "artistic vibes",
      details: "• Unique perspective\n• Creative expression\n• Artistic soul",
    },
  ];

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors =
      mode === "angel" ? ["#86efac", "#34d399"] : ["#fb7185", "#f43f5e"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleModeSwitch = () => {
    setMode(mode === "angel" ? "devil" : "angel");
    triggerConfetti();
  };

  return (
    <div className="bg-black/90  relative  rounded-2xl border border-zinc-700   overflow-hidden md:hidden">
      <motion.div
        className="relative max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${hoverPos.x}px ${
              hoverPos.y
            }px, 
              ${
                mode === "angel"
                  ? "rgba(167, 243, 208, 0.15)"
                  : "rgba(253, 164, 175, 0.15)"
              } 0%, 
              transparent 50%)`,
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              mode === "angel"
                ? "from-green-500/10 to-emerald-500/10"
                : "from-red-500/10 to-pink-500/10"
            } backdrop-blur-xl`}
          />

          <div className="relative border border-white/10 p-6">
            {/* Mode Toggle */}
            <motion.button
              onClick={handleModeSwitch}
              className="absolute top-4 right-4 text-4xl cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {mode === "angel" ? "😇" : "😈"}
            </motion.button>

            {/* Title */}
            <motion.h2
              className={`text-3xl font-bold mb-6 ${
                mode === "angel" ? "text-green-300" : "text-pink-300"
              }`}
              onClick={triggerSpecialEasterEgg}
              whileHover={{ scale: 1.05 }}
            >
              {mode === "angel" ? "Sweet & Pure ✨" : "Spicy & Bold 🔥"}
            </motion.h2>

            {/* Traits List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "angel" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "angel" ? 20 : -20 }}
                className="space-y-4"
              >
                {(mode === "angel" ? angelTraits : devilTraits).map(
                  (trait, index) => (
                    <motion.div
                      key={index}
                      className={`group relative overflow-hidden rounded-lg ${
                        mode === "angel"
                          ? "hover:bg-green-500/10"
                          : "hover:bg-pink-500/10"
                      } bg-white/5 p-4 transition-colors cursor-pointer`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() =>
                        setShowDetails((prev) =>
                          prev === index ? null : index
                        )
                      }
                    >
                      <motion.div className="flex items-center gap-3">
                        <motion.div
                          className={`p-2 rounded-full ${
                            mode === "angel"
                              ? "bg-green-500/20"
                              : "bg-pink-500/20"
                          }`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <trait.icon className="w-5 h-5" />
                        </motion.div>
                        <div>
                          <div className="text-white font-medium">
                            {trait.text}
                          </div>
                          <div className="text-white/60 text-sm">
                            {trait.subtext}
                          </div>
                        </div>
                      </motion.div>

                      <AnimatePresence>
                        {showDetails === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 pl-10 text-sm text-white/70"
                          >
                            {trait.details.split("\n").map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {detail}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                )}
              </motion.div>
            </AnimatePresence>

            {/* Secret Content */}
            <AnimatePresence>
              {secretUnlocked && showDreamCard && <DreamCard />}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DatingPrefsCard;

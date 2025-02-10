/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const Facts: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Type for the interval

  const tips: string[] = [
    "He’s always curious about world events and loves geopolitics. 🌍",
    "He sleeps with a yellow elephant plushie—his lifelong buddy. 🐘",
    "He likes smart, thick-thighed, and fun-loving girls who truly get him. 😉",
    "He’s a foodie who loves to eat and enjoy tasty meals—cook with love, and he’ll never leave! 🍽️😂",
    "He dreams of traveling the world one day. ✈️🌎",
    "He once tried growing a beard, but all he got was 3.5 stray hairs. 🧔❌",
    "He gets distracted by thick thighs like a Windows update at 99%. 🔥💀",
    "He believes anime waifus are superior and will fight you over it. 😤📺",
    "He thought about hitting the gym, but his bed was more seductive. 🛏️💘",
    "He flirts like a pro in his head but stutters like a broken printer in real life. 🖨️😳",
    "He gets excited when a girl texts first, then forgets how to reply. 📱🤯",
    "He can debug complex code but can’t figure out if a girl is flirting. 🤔💀",
    "He’s the CEO of saying 'one last episode' and then finishing the whole season. 📺🍿",
    "Late-night coding feels romantic until the code breaks. 💻💔",
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-6 py-16 text-white md:rounded-xl relative gap-12">
      {/* Image Section */}
      <div className="flex justify-center items-center w-full md:w-1/2">
        <Image
          src="/anime-girl.png"
          alt="Anime Girl"
          className="object-cover shadow-lg"
          width={300}
          height={300}
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold animate-pulse">
          Fun Facts:
        </h1>
        <p className="text-lg md:text-xl font-semibold text-gray-300">
          {tips[currentTipIndex] || "Fun Facts Coming Soon..."}
        </p>
      </div>
    </div>
  );
};

export default Facts;

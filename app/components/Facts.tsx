/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Facts = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    "Chandrashekhar has a passion for books, particularly those that challenge his thinking. 📚",
    "When he's not lost in a book, he's either watching anime or mastering chess. ♟️",
    "Geopolitics fascinates Chandrashekhar—he keeps himself informed on the latest world events.",
    "Philosophy is a key interest—Chandrashekhar enjoys pondering life's big questions. 🤔",
    "For him, success lies in continuous learning and growth, and he's always striving for both.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto  px-6 py-16  text-white md:rounded-xl  relative gap-12">
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

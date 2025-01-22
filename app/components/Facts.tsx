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
    <div className="flex flex-col justify-center items-center min-h-screen bg-black/80 rounded-3xl text-white relative">
      {/* Cool Image */}
      <div className="inset-0 flex items-center justify-center">
        <Image
          src="/anime-girl.png"
          alt="Anime Girl"
          className="z-50 object-cover rounded-lg shadow-lg"
          width={300}
          height={300}
        />
      </div>

      {/* Overlay and Text */}
      <div className="z-10 text-center backdrop-blur-sm  p-6 rounded-xl shadow-md">
        <h1 className="text-3xl md:text-6xl font-extrabold mb-4 animate-pulse">
          Fun Facts About Me
        </h1>
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center text-center">
          <p className="text-lg md:text-xl hidden md:block font-semibold">
            Did You Know?
          </p>
          <p
            className={`text-base md:text-lg font-semibold text-gray-400 ${
              !tips[currentTipIndex] && "hidden"
            }`}
          >
            {tips[currentTipIndex] || "Fun Facts Coming Soon..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Facts;

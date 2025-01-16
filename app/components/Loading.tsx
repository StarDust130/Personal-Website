/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

const tips = [
  "Chandrashekhar loves reading books, especially the ones that make you think. 📚",
  "When he's not reading, he's either watching anime or playing chess. ♟️",
  "Chandrashekhar has a deep interest in geopolitics—he's always up-to-date on world events.",
  "Philosophy? Chandrashekhar dives deep into the mysteries of life. 🤔",
  "Chandrashekhar believes learning and growing is the key to success—and he's always chasing it.",
];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white relative">
      {/* Cool Image */}
      <div className=" inset-0 flex items-center justify-center">
        <Image
          src="/anime-girl.png"
          alt="Anime Girl"
          className="z-50 object-cover rounded-lg shadow-lg"
          width={300}
          height={300}
        />
      </div>

      {/* Overlay and Text */}
      <div className="z-10 text-center backdrop-blur-sm bg-black/50 p-6 rounded-xl shadow-md">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4  animate-pulse">
          Loading...
        </h1>
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center text-center">
          <p className="text-lg md:text-xl hidden md:block font-semibold">Did You Know:</p>
          <p
            className={`text-base md:text-lg font-semibold text-gray-400 ${
              !tips[currentTipIndex] && "hidden"
            }`}
          >
            {tips[currentTipIndex] || "Loading..."}
          </p>
        </div>
      </div>

      {/* Spinner */}
      <div className=" bottom-10 z-10">
        <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;

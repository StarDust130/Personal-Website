/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

interface TimeSpent {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Age: React.FC = () => {
  const birthDate = new Date(2005, 2, 13); // March 13th, 2005 (Month is 0-indexed)
  const [timeSpend, setTimeSpend] = useState<TimeSpent>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeSpend = () => {
    const now = new Date();
    const diffInMs = now.getTime() - birthDate.getTime();

    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    setTimeSpend({ years, months, days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeSpend();
    const interval = setInterval(calculateTimeSpend, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full py-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
        🎉 Time on Earth: {timeSpend.years} years 🌍
      </h1>
      <p className="text-sm md:text-xl text-gray-100 mb-6 mx-4">
        Every heartbeat is a miracle, every moment a treasure. Let’s celebrate
        your journey: ⏳
      </p>

      <div className="flex justify-center items-center w-full py-3 px-4">
        <div className="text-center text-white p-8 sm:p-10 md:p-12 bg-transparent border-gray-800 border-4 rounded-3xl shadow-xl w-full max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
            {Object.entries(timeSpend).map(([key, value], index) => (
              <div key={index} className="flex flex-col items-center">
                <span
                  className={`text-5xl sm:text-6xl font-semibold ${getColor(
                    key
                  )}`}
                >
                  {value}
                </span>
                <p className="text-sm sm:text-base capitalize">{key}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getColor = (key: string) => {
  const colors: Record<string, string> = {
    years: "text-teal-500",
    months: "text-blue-400",
    days: "text-green-400",
    hours: "text-purple-400",
    minutes: "text-yellow-400",
    seconds: "text-pink-400",
  };
  return colors[key] || "text-gray-400";
};

export default Age;

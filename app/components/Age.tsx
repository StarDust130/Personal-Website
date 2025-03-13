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
  const birthDate = new Date(2005, 2, 13);
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
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    setTimeSpend({
      years,
      months,
      days,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    });
  };

  useEffect(() => {
    calculateTimeSpend();
    const interval = setInterval(calculateTimeSpend, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full py-12 px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-8">
        ⏳ {timeSpend.years} Years on Earth
      </h1>

      <div className="grid grid-cols-3 gap-5 w-full max-w-xs sm:max-w-md text-center p-6 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-black shadow-xl">
        {Object.entries(timeSpend).map(([key, value], index) => (
          <div key={index} className="flex flex-col items-center">
            <span className={`text-5xl sm:text-6xl font-bold ${getColor(key)}`}>
              {value}
            </span>
            <p className="text-xs sm:text-sm uppercase font-medium tracking-wide text-gray-400 mt-1">
              {key}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getColor = (key: string) => {
  const colors: Record<string, string> = {
    years: "text-blue-500",
    months: "text-purple-400",
    days: "text-teal-400",
    hours: "text-green-400",
    minutes: "text-yellow-400",
    seconds: "text-red-500 animate-pulse",
  };
  return colors[key] || "text-gray-400";
};

export default Age;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Facts";

const Age = () => {
  const birthDate = new Date(2005, 3, 13); // March 13th, 2005
  const [loading, setLoading] = useState(false);
  const [timeSpend, setTimeSpend] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeSpend = () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeSpend();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check if all values are 0
  const allValuesAreZero = Object.values(timeSpend).every(
    (value) => value === 0
  );

  if (loading || allValuesAreZero) {
    return (
      <Loading />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center w-full  py-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
        🎉 Time on Earth: {timeSpend.years} years 🌍
      </h1>
      <p className="text-sm md:text-xl text-gray-100 mb-6">
        Every heartbeat is a miracle, every moment a treasure. Let’s celebrate
        your journey: ⏳
      </p>



      <div className="flex justify-center items-center w-full py-3 px-4">
        <div className="text-center text-white p-8 sm:p-10 md:p-12 bg-transparent border-gray-800 border-4 rounded-3xl shadow-xl w-full max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-semibold text-teal-500">
                {timeSpend.years}
              </span>
              <p className="text-sm sm:text-base">Years</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-semibold text-blue-400">
                {timeSpend.months}
              </span>
              <p className="text-sm sm:text-base">Months</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-semibold text-green-400">
                {timeSpend.days}
              </span>
              <p className="text-sm sm:text-base">Days</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-semibold text-purple-400">
                {timeSpend.hours}
              </span>
              <p className="text-sm sm:text-base">Hours</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-semibold text-yellow-400">
                {timeSpend.minutes}
              </span>
              <p className="text-sm sm:text-base">Minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-semibold text-pink-400">
                {timeSpend.seconds}
              </span>
              <p className="text-sm sm:text-base">Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Age;

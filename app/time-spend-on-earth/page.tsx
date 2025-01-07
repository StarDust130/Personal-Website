/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const birthDate = new Date(2005, 3, 13); // March 13th, 2005
  const [timeSpent, setTimeSpent] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeSpent = () => {
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

    setTimeSpent({ years, months, days, hours, minutes, seconds });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeSpent();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center text-white p-8 rounded-2xl shadow-xl">
        <p className="text-3xl font-bold mb-6">Age: 20</p>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8">
          Time spent on Earth:
        </p>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <span className="text-teal-400 text-3xl font-bold">
                {timeSpent.years}{" "}
              </span>{" "}
              Years
            </div>
            <div>
              <span className="text-blue-400 text-3xl font-bold">
                {timeSpent.months}{" "}
              </span>{" "}
              Months
            </div>
            <div>
              <span className="text-green-400 text-3xl font-bold">
                {timeSpent.days}{" "}
              </span>{" "}
              Days
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <span className="text-purple-400 text-3xl font-bold">
                {timeSpent.hours}{" "}
              </span>{" "}
              Hours
            </div>
            <div>
              <span className="text-yellow-400 text-3xl font-bold">
                {timeSpent.minutes}{" "}
              </span>{" "}
              Minutes
            </div>
            <div>
              <span className="text-pink-400 text-3xl font-bold">
                {timeSpent.seconds}{" "}
              </span>{" "}
              Seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

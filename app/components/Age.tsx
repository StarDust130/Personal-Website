/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import type { Metadata } from "next";
const Age = () => {
  const birthDate = new Date(2005, 3, 13); // March 13th, 2005
  const [loading , setLoading] = useState(false);
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

  if(loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-3xl text-white">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center text-white p-8 rounded-2xl shadow-xl">
        <p className="text-3xl font-bold mb-6">Age: {timeSpend.years} </p>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8">
          Time spent on Earth:
        </p>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <span className="text-teal-400 text-3xl font-bold">
                {timeSpend.years}{" "}
              </span>{" "}
              Years
            </div>
            <div>
              <span className="text-blue-400 text-3xl font-bold">
                {timeSpend.months}{" "}
              </span>{" "}
              Months
            </div>
            <div>
              <span className="text-green-400 text-3xl font-bold">
                {timeSpend.days}{" "}
              </span>{" "}
              Days
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <span className="text-purple-400 text-3xl font-bold">
                {timeSpend.hours}{" "}
              </span>{" "}
              Hours
            </div>
            <div>
              <span className="text-yellow-400 text-3xl font-bold">
                {timeSpend.minutes}{" "}
              </span>{" "}
              Minutes
            </div>
            <div>
              <span className="text-pink-400 text-3xl font-bold">
                {timeSpend.seconds}{" "}
              </span>{" "}
              Seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Age;

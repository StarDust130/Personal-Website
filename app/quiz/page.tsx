"use client";
import { useState } from "react";
import {
  PartyPopper,
  HeartCrack,
  BadgeCheck,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { questions } from "../lib/data";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Inter'] p-4 sm:p-8">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-48 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      {!quizStarted ? (
        <div className="max-w-2xl mx-auto text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen blur-3xl animate-blob"></div>
            <div className="absolute top-60 right-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <h1 className="text-2xl sm:text-5xl font-bold mb-6 relative flex justify-center items-center">
            <span className=" bg-300% animate-gradient-flow">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                How Well Ya Know Me?{" "}
              </span>
              👀
            </span>
          </h1>

          <div className="relative group mx-auto w-full max-w-[400px] sm:max-w-[500px]">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-30"></div>
            <div className="relative overflow-hidden rounded-xl border-2 border-white/10 hover:border-purple-400/30 transition-all duration-300">
              <Image
                src={"/anime-girl-3.jpg"}
                alt="anime-girl"
                height={500}
                width={500}
                className="object-cover w-full h-[300px] sm:h-[400px] scale-100 group-hover:scale-105 transition-transform duration-500"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-left ">
                <div className="flex gap-2 justify-start items-center ">
                  {/* Start NOW */}
                  <span className="inline-flex items-center gap-1 px-2 py-1 border border-pink-500/20 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full  bg-pink-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500 " />
                    </span>
                    Start Now
                  </span>
                  {/* Vibe Check */}
                  <p className="text-sm text-pink-200/80 font-mono">
                    #VibeCheck2025
                  </p>
                </div>
                {/* Ready */}
                <p className="text-xl font-bold  ">
                  <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    {" "}
                    Ready 4 the Challenge?
                  </span>{" "}
                  🌟
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="mt-8 relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2 mx-auto group/button"
          >
            <span className="relative z-10">Start the Vibe Check</span>
            <span className="w-6 h-6 relative z-10 group-hover/button:translate-x-1 transition-transform">
              🚀
            </span>

            <div className="absolute inset-0 -z-0 opacity-0 group-hover/button:opacity-100 transition-opacity">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-700" />
              <div className="absolute inset-0 animate-shine">
                <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12" />
              </div>
            </div>
          </button>
        </div>
      ) : currentQuestion < questions.length ? (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Enhanced Progress Bar */}
          <div className="mb-10 space-y-2">
            <div className="flex items-center gap-3">
              <Flame className="text-pink-500 w-6 h-6 animate-pulse" />
              <span className="text-sm font-medium text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              >
                <div className="absolute inset-0 bg-white/10 animate-pulse-slow" />
              </div>
            </div>
          </div>

          {/* Animated Question Text */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent animate-text-shine">
            <span className="inline-block mr-3">❓</span>
            {questions[currentQuestion].question}
          </h2>

          {/* Enhanced Answer Options */}
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => {
              const isCorrect = index === questions[currentQuestion].correct;
              const isSelected = selectedAnswer === index;
              const showResult = selectedAnswer !== null;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`relative p-5 text-left rounded-xl transition-all duration-300 ${
                    showResult
                      ? isCorrect
                        ? "border-2 border-green-400/80 bg-green-500/20"
                        : isSelected
                        ? "border-2 border-red-400/80 bg-red-500/20"
                        : "opacity-70"
                      : "border border-gray-700 hover:border-pink-500/50 hover:scale-[1.02] bg-gray-900/50"
                  } ${showResult ? "cursor-default" : "hover:bg-gray-800/40"}`}
                >
                  {/* Answer feedback */}
                  {showResult && isCorrect && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce-in">
                      Correct!
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 text-gray-400">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg sm:text-xl">{option}</span>

                    {showResult && (
                      <span className="ml-auto">
                        {isCorrect ? (
                          <BadgeCheck className="w-6 h-6 text-green-400 animate-scale-in" />
                        ) : isSelected ? (
                          <HeartCrack className="w-6 h-6 text-red-400 animate-scale-in" />
                        ) : null}
                      </span>
                    )}
                  </div>

                  {/* Hover effect */}
                  {!showResult && (
                    <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center">
          <PartyPopper className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-bounce" />
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Quiz Complete! 🎉
          </h1>
          <p className="text-xl mb-8">
            You scored {score}/{questions.length}
            <span className="text-2xl ml-2">
              {score === questions.length ? "🔥 Perfect Score!" : "Not Bad! 😎"}
            </span>
          </p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setQuizStarted(false);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition-transform"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

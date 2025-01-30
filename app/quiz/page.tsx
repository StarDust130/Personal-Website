"use client";
// app/quiz/page.tsx
import { useState } from "react";
import {
  Rocket,
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

          <h1 className="text-2xl sm:text-5xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-300% animate-gradient-flow">
              How Well Ya Know Me? 👾
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
              <div className="absolute bottom-4 left-4 text-left">
                <p className="text-sm text-pink-200/80 font-mono">
                  #VibeCheck2025
                </p>
                <p className="text-xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Ready 4 the Challenge? 😈
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="mt-8 relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2 mx-auto group/button"
          >
            <span className="relative z-10">Start the Vibe Check</span>
            <Rocket className="w-6 h-6 relative z-10 group-hover/button:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -z-0 opacity-0 group-hover/button:opacity-100 transition-opacity">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-700" />
              <div className="absolute inset-0 animate-shine">
                <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12" />
              </div>
            </div>
          </button>
        </div>
      ) : currentQuestion < questions.length ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Flame className="text-orange-400 w-6 h-6" />
            <div className="h-2 bg-gray-800 rounded-full flex-1">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(currentQuestion / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 text-left rounded-xl text-lg font-medium transition-all ${
                  selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? "bg-green-500/20 border-2 border-green-400 scale-105"
                      : "bg-red-500/20 border-2 border-red-400 scale-105"
                    : "bg-gray-900/50 hover:bg-gray-800/60 hover:scale-[1.02] border border-gray-700"
                } ${selectedAnswer !== null && "cursor-not-allowed"}`}
              >
                <div className="flex items-center gap-3">
                  {option}
                  {selectedAnswer === index &&
                    (index === questions[currentQuestion].correct ? (
                      <BadgeCheck className="w-5 h-5 text-green-400 ml-auto" />
                    ) : (
                      <HeartCrack className="w-5 h-5 text-red-400 ml-auto" />
                    ))}
                </div>
              </button>
            ))}
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

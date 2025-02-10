"use client";

import { questions } from "@/app/lib/data";
import { useState } from "react";
import QuizHero from "./QuizHero";
import PlayQuiz from "./PlayQuiz";
import QuizResult from "./QuizResult";


const Quiz = () => {
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
    <div className="h-screen b text-white font-['Inter'] p-4 sm:p-8 z-30">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-48 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      {!quizStarted ? (
        <QuizHero setQuizStarted={setQuizStarted} />
      ) : currentQuestion < questions.length ? (
        <PlayQuiz
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          handleAnswer={handleAnswer}
        />
      ) : (
        <QuizResult
          score={score}
          setCurrentQuestion={setCurrentQuestion}
          setScore={setScore}
          setQuizStarted={setQuizStarted}
        />
      )}
    </div>
  );
}
export default Quiz

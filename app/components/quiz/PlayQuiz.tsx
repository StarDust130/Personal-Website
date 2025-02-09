import { questions } from "@/app/lib/data";
import { BadgeCheck, Flame, HeartCrack } from "lucide-react";

interface PlayQuizProps {
  currentQuestion: number;
  selectedAnswer: number | null;
  handleAnswer: (index: number) => void;
}

const PlayQuiz = ({
  currentQuestion,
  selectedAnswer,
  handleAnswer,
}: PlayQuizProps) => {
  return (
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
      <h2 className=" text-2xl  sm:text-4xl font-bold mb-10 ">
        <span className="bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent animate-text-shine">
          {questions[currentQuestion].question}{" "}
        </span>{" "}
        <span> {questions[currentQuestion].emoji}</span>
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
  );
};
export default PlayQuiz;


import { questions } from "@/app/lib/question";
import Image from "next/image";
import Link from "next/link";

interface QuizResultProps {
  score: number;
  setCurrentQuestion: (index: number) => void;
  setScore: (score: number) => void;
  setQuizStarted: (quizStarted: boolean) => void;
}

const QuizResult = ({
  score,
  setCurrentQuestion,
  setScore,
  setQuizStarted,
}: QuizResultProps) => {
  return (
    <div className="max-w-2xl md:w-full   mx-auto text-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        <span className=" bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          {" "}
          Quiz Complete!
        </span>{" "}
        🎉
      </h1>

      <div className="relative w-full h-full mx-auto mb-8 group">
        <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 filter blur-xl" />
        <Image
          src={"/anime-girl-10.png"}
          alt="anime-girl"
          width={300}
          height={300}
          className="mx-auto rounded-full w-80   animate-float transition-transform duration-300 hover:scale-110 cursor-pointer z-10 relative"
        />
      </div>

      <div className="animate-fade-up">
        <p className="text-lg sm:text-xl mb-8">
          You scored {score}/{questions.length}
          <span className="block sm:inline-block sm:ml-2 mt-2 sm:mt-0 md:text-2xl text-cyan-300">
            {score === questions.length &&
              "🔥 Perfect Score! Are you the chosen one? 😈"}
            {score === 0 && "💀 RIP... your brain just rage quit. 🪦"}
            {score <= 2 && "🧠 Brain not found. Try again later. 🤡"}
            {score <= 5 && "😵‍💫 You survived… barely. 💀"}
            {score >= 5 &&
              "🔥 Almost there! But close only counts in horror movies. 😈"}
          </span>
        </p>

        {/* Play Again Button */}
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setQuizStarted(false);
          }}
          className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold text-white hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-blue-500/30"
        >
          {/* Hover effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            Play Again
            <span className="inline-block transition-transform hover:rotate-180">
              👀
            </span>
          </span>
        </button>

        {/* Exit Button */}
        <Link href={"/#explore"}>
          <button className="relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold text-white hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-red-500/20 hover:shadow-pink-500/30 ml-4">
            {/* Hover effect layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Exit
              <span className="inline-block transition-transform duration-300 hover:rotate-180">
                💥
              </span>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default QuizResult;

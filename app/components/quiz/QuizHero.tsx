import Image from "next/image";

const QuizHero = ({ setQuizStarted }: { setQuizStarted: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
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
        className="mt-8 relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-xl font-semibold hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2 mx-auto group/button"
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
  );
};
export default QuizHero

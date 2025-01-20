import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full my-40 flex flex-col justify-center items-center">
      <div className="text-center space-y-6 md:max-w-3xl mx-3 md:mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
          Hi, I&apos;m Chandrashekhar!
        </h1>
      </div>

      {/* About Me Section */}
      <div className="mt-6 md:mt-12 text-center md:max-w-3xl mx-3 md:mx-auto">
        <p className="text-base sm:text-lg lg:text-xl text-gray-400">
          Passionate about tech 💻, reading 📚, anime, chess ♟️, geopolitics 🌍,
          and philosophy 🤔. Believes in constant learning and growth. 🔥
        </p>
      </div>

      <div className="flex  items-center justify-center gap-6 mt-6">
        <Link href="/about">
          <button className="button mt-3">
            <div>
              <span>Discover Now</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Hero
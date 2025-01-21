import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full mt-[10rem] mb-[14rem] md:my-48 flex flex-col justify-center items-center">
      {/* Title Section */}
      <div className="text-center space-y-6 md:max-w-3xl mx-3 md:mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
          Hi, I&apos;m Chandrashekhar!
        </h1>
      </div>

      {/* About Me Section */}
      <div className="mt-6 md:mt-12 text-center md:max-w-3xl mx-3 md:mx-auto">
        <p className="text-base sm:text-lg lg:text-xl text-gray-400">
          I love coding 💻, movies 🍿, anime 🌸, chess ♟️, and of course you!
          I&apos;m into <b>geopolitics</b> 🌍, cool ideas 💡, and feeding my
          curiosity 📚. Sometimes I wonder, “Why is everyone so weird?” 🤔...
          but then I realize, it&apos;s probably me. 😅 Or maybe we’re just
          characters in a game, and I&apos;m the glitch? 🎮
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <Link href="mailto:csyadav0513@gmail.com" target="_blank">
          <button className="button mt-3">
            <div>
              <span>Let&apos;s Chat 💬</span>
            </div>
          </button>
        </Link>

        <Link href="#explore">
          <button className="button mt-3">
            <div>
              <span>Explore 🚀</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center font-inter">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="text-start space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
            Hey, I&apos;m Chandrashekhar
          </h1>
        </div>

        {/* About Me Section */}
        <div className="mt-12 text-start max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-gray-400">
            I&apos;m a passionate coder 💻 who loves building cool things 🚀.
            Whether I&apos;m writing clean, efficient code or brainstorming the
            next big startup idea 💡, I&apos;m always chasing the thrill of
            creating something new and impactful. When I&apos;m not coding,
            you&apos;ll find me playing chess ♟️ or diving into the world of
            geopolitics 🌍. Dreaming big and aiming to turn my startup ideas
            into reality 🔥.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

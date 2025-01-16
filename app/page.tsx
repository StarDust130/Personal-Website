const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center font-inter relative">
      {/* Background SVGs */}
      <svg
        className="absolute top-10 left-1/4 sm:left-32 w-24 h-24 opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 Q50 30, 100 50"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-10 left-1/2 sm:left-60 w-24 h-24 opacity-15"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 60 C40 80, 60 20, 100 60"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute top-20 right-10 w-24 h-24 opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 C50 30, 50 70, 100 50"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-60 right-1/4 sm:right-36 w-12 h-12 opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 C50 30, 50 70, 100 50"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 md:max-w-3xl mx-3 md:mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
            Hey, I&apos;m Chandrashekhar
          </h1>
        </div>

        {/* About Me Section */}
        <div className="mt-6 md:mt-12 text-center md:max-w-3xl mx-3 md:mx-auto">
          <p className="text-base sm:text-lg lg:text-xl text-gray-400">
            I code cool stuff 💻, play chess ♟️, and dive into geopolitics 🌍.
            Always dreaming big and making things happen 🔥!
          </p>
        </div>
      </div>

      <div className="flex  items-center justify-center gap-6 mt-6 md:mt-12">
        <button className="button mt-3">
          <div>
            <span>Talk Now</span>
          </div>
        </button>
        <button className="button mt-3">
          <div>
            <span>Know More</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Page;

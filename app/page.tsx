

const Page = () => {





  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center font-inter">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
            Hey, I&apos;m Chandrashekhar
          </h1>
        </div>

        {/* About Me Section */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-gray-400">
            I love coding and exploring new technologies. When I’m not writing
            code, you’ll find me playing chess or following global trends in
            geopolitics. I’m passionate about startups and aspire to build my
            own in the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

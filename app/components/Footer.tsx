"use client";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 bg-black z-20 rounded-t-3xl text-white border-t border-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            {/* Replace Link with an anchor that uses our click handler */}
            <a onClick={handleLogoClick} className="cursor-pointer">
              <Image src="/icon.png" alt="logo" width={50} height={50} />
            </a>
          </div>

          <p className="mt-4 text-center text-sm sm:text-base lg:text-right lg:mt-0 text-gray-400">
            © {currentYear} Chandrashekhar. All rights reserved.
          </p>
        </div>
        <p className="mt-4 text-center text-xs sm:text-sm text-gray-400">
          This is Chandrashekhar’s personal website—just for fun and all about
          me. If you don’t like it, go fuck yourself and don’t waste your time
          here.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

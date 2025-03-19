"use client";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://github.com/StarDust130",
    src: "https://img.icons8.com/ios-filled/96/github.png",
    alt: "GitHub",
  },
  {
    href: "https://x.com/cyadav130",
    src: "https://img.icons8.com/ios-glyphs/96/twitterx--v2.png",
    alt: "TwitterX",
  },
  {
    href: "https://www.reddit.com/u/StarDust_130/s/SqwkiJDtwP",
    src: "https://img.icons8.com/forma-bold-filled/96/reddit.png",
    alt: "Reddit",
  },
];

const Navbar = () => {
  return (
    <header className="relative w-full flex items-center justify-between px-5 md:px-10 py-3 bg-black/50 backdrop-blur-md shadow-lg z-30">
      {/* Left Side: Clickable Logo */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Link href={"/"}>
          <Image
            src="/icon.png"
            alt="logo"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer"
            width={56}
            height={56}
          />
        </Link>
      </div>

      {/* Right Side: Social Links */}
      <nav className="flex md:gap-6">
        {socialLinks.map(({ href, src, alt }) => (
          <Link key={href} href={href} target="_blank" className="p-2">
            <Image
              src={src}
              alt={alt}
              width={30}
              height={30}
              className="invert hover:scale-125 transition-transform duration-200"
            />
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;

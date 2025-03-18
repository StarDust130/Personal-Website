"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";

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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full flex items-center justify-between px-5 md:px-10 py-3 z-50 bg-black transition-transform ${
        visible
          ? "translate-y-0"
          : "-translate-y-full "
      }`}
    >
      <div className="flex-1">
        <BackButton />
      </div>
      <nav className="flex gap-4 md:gap-6">
        {socialLinks.map(({ href, src, alt }) => (
          <Link key={href} href={href} target="_blank">
            <Image
              src={src}
              alt={alt}
              width={30}
              height={30}
              className="invert hover:scale-110 transition-transform"
            />
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;

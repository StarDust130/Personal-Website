"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <ChevronLeft
      className="top-3 z-50 left-3 w-10 h-10 text-gray-300 md:w-12 md:h-12 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-125  hover:text-gray-100  rounded-full p-2"
      onClick={() => router.push("/#explore")}
    />
  );
};

export default BackButton;

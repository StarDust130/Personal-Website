"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <ChevronLeft className="top-3 z-50 left-3 w-6 h-6 text-gray-300  md:w-8 md:h-8 cursor-pointer" onClick={router.back} />
  );
};
export default BackButton;

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <Link href={"#hero"}>
              <Image src={"/icon.png"} alt="logo" width={50} height={50} />
            </Link> 
          </div>

          <p className="mt-4 text-center text-sm sm:text-base lg:text-right lg:mt-0 text-gray-400">
            © {currentYear} Chandrashekhar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

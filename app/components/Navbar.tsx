import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";

const Navbar = () => {
  return (
    <div className="w-full   my-3 flex items-center justify-between px-5 md:px-10">
      <div className="flex justify-start w-full">
        <BackButton />
      </div>
      <div className="flex justify-end w-full">
        <Link href={"https://github.com/StarDust130"} target="_blank">
          <Image
            src={"https://img.icons8.com/3d-fluency/94/github.png"}
            alt="Github"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

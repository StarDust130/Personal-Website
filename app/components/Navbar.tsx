import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full mt-5 fixed z-50 ">
      <div className="absolute right-5 md:right-10">
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

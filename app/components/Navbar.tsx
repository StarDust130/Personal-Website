import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div>
        <Image
          src={"https://img.icons8.com/3d-fluency/94/github.png"}
          alt="Github"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
export default Navbar;

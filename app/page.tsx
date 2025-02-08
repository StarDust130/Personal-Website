import Hero from "./components/Hero";
import BgSvg from "./components/BgSvg";
import Explore from "./components/Explore";
import Age from "./components/Age";
import Facts from "./components/Facts";
import Footer from "./components/Footer";

const Page = () => {
  return (
    <div className="w-full z-10    flex flex-col  font-inter relative">
      <BgSvg />

      <Hero />
      <Explore />
      <Age />
      <Facts />
      <Footer />
    </div>
  );
};

export default Page;

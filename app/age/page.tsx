import { Metadata } from "next";
import Age from "../components/Age";

export const metadata: Metadata = {
  title: "Chandrashekhar Age",
  description:
    "How much time has Chandrashekhar spent on Earth? Find out here!",
};

const Page = () => {
  return <Age />;
};

export default Page;

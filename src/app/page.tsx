import { useAppSelector } from "@/redux/hooks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return <h1>hi home</h1>;
};

export default Home;

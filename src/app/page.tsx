import { Metadata } from "next";
import MainSlider from "@/components/MainSlider";
import Container from "@/components/Container";
import BestGamesList from "@/components/BestGamesList";
import PopularGenresList from "@/components/PopularGenresList";
import GetDataWrapper from "@/components/GetDataWrapper";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return (
    <Container>
      <MainSlider />
      <GetDataWrapper />
    </Container>
  );
};

export default Home;

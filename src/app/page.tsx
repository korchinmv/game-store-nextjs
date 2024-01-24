import { Metadata } from "next";
import MainSlider from "@/components/MainSlider";
import Container from "@/components/Container";
import BestGamesList from "@/components/BestGamesList";
import Title from "@/components/Title";
import PopularGenresList from "@/components/PopularGenresList";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return (
    <Container>
      <MainSlider />
      <BestGamesList>
        <Title name='The best games for you' />
      </BestGamesList>
      <PopularGenresList>
        <Title name='Popular genres' />
      </PopularGenresList>
    </Container>
  );
};

export default Home;

import { Metadata } from "next";
import MainSlider from "@/components/MainSlider";
import Container from "@/components/Container";
import GamesList from "@/components/GamesList";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return (
    <Container>
      <MainSlider />
      <GamesList>
        <Title name='The best games for you' />
      </GamesList>
    </Container>
  );
};

export default Home;

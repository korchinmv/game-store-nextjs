import { Metadata } from "next";
import MainSlider from "@/components/MainSlider";
import Main from "@/components/Main";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return (
    <Container>
      <MainSlider />
    </Container>
  );
};

export default Home;

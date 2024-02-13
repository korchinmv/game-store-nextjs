import { Metadata } from "next";
import MainSlider from "@/components/MainSlider";
import Container from "@/components/Container";
import GetDataWrapper from "@/components/GetDataWrapper";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return (
    <Container>
      <div className="mb-[10px] sm:mb-[20px] flex flex-col flex-col-reverse items-center justify-center sm:flex-row">
        <MainSlider />
        <Title name={"Game store by KorchinMV"} />
      </div>

      <GetDataWrapper />
    </Container>
  );
};

export default Home;

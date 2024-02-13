"use client";
import Title from "@/components/SubTitle";
import GameCard from "@/components/GameCard";
import Container from "@/components/Container";

const GamesPage = () => {
  return (
    <section>
      <Container>
        <Title name={"All Games"} />
        <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 xl:gap-[25px]"></ul>
      </Container>
    </section>
  );
};

export default GamesPage;

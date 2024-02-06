"use client";
import { Game } from "@/types/Game";
import GameCard from "./GameCard";
import LinkMore from "./ui/LinkMore";
import Title from "./Title";

interface BestGamesListProps {
  data: any;
}

const BestGamesList = ({ data }: BestGamesListProps) => {
  return (
    <section className='flex flex-col py-[15px] md:mb-[30px]'>
      <>
        <Title name='The best Games for you' />
        <LinkMore name={"More ames"} link={"/games"} />
        <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px]'>
          {data?.results.map((game: Game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              price={game.playtime}
              rating={game.rating}
              bgImage={game.background_image}
              slug={game.slug}
            />
          ))}
        </ul>
      </>
    </section>
  );
};
export default BestGamesList;

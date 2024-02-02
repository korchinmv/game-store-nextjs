"use client";

import { Children } from "@/types";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { PacmanLoader } from "react-spinners";
import GameCard from "./GameCard";
import LinkMore from "./ui/LinkMore";
import ErrorData from "./ErrorData";

const BestGamesList = ({ children }: Children) => {
  const { isLoading, data, error } = useGetGamesQuery(10);

  if (error) return <ErrorData errorText='Error data' />;

  return (
    <section className='flex flex-col py-[15px] md:mb-[30px]'>
      {children}

      <LinkMore name={"More games"} link={"/games"} />

      {isLoading ? (
        <PacmanLoader className='mx-auto my-0' color='#ed5564' />
      ) : (
        <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px]'>
          {data.results.map((game: Game) => (
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
      )}
    </section>
  );
};
export default BestGamesList;

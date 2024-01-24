"use client";

import { Children } from "@/types";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { cropFunction } from "../utils/CropFunction";
import GameCard from "./GameCard";
import LinkMore from "./ui/LinkMore";

const BestGamesList = ({ children }: Children) => {
  const { isLoading, data } = useGetGamesQuery("");

  return (
    <section className='flex flex-col py-[20px] md:mb-[30px]'>
      {children}

      <LinkMore name={"More games"} link={"/games"} />

      <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px]'>
        {isLoading ? (
          <li>Loading</li>
        ) : (
          cropFunction(data.results, 0, 10).map((game: Game) => (
            <GameCard
              key={game.id}
              name={game.name}
              price={game.playtime}
              rating={game.rating}
              bgImage={game.background_image}
            />
          ))
        )}
      </ul>
    </section>
  );
};
export default BestGamesList;

"use client";
import { Game } from "@/types/Game";
import GameCard from "./GameCard";
import { ResponseGamesData } from "@/types/ResponseGamesData";

interface GamesListProps {
  dataGames: ResponseGamesData | undefined;
}

const GamesList = ({ dataGames }: GamesListProps) => {
  return (
    <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] w-full'>
      {dataGames?.results?.map((game: Game) => (
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
  );
};
export default GamesList;

"use client";
import { Game } from "@/types/Game";
import { ResponseGamesData } from "@/types/ResponseGamesData";
import GameCard from "./GameCard";

interface GamesListProps {
  dataGames: ResponseGamesData | null;
}

const GamesList = ({ dataGames }: GamesListProps) => {
  return (
    <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] w-full'>
      {dataGames &&
        dataGames?.results?.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
    </ul>
  );
};
export default GamesList;

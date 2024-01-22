"use client";

import { Children } from "@/types";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import GameCard from "./GameCard";

const BestGamesList = ({ children }: Children) => {
  const { isLoading, data } = useGetGamesQuery("");

  return (
    <>
      {children}
      <ul>
        {isLoading ? (
          <li>Loading</li>
        ) : (
          data.results.map((game: Game) => (
            <GameCard key={game.id} name={game.name} />
          ))
        )}
      </ul>
    </>
  );
};
export default BestGamesList;

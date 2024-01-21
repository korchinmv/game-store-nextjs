"use client";

import { Children } from "@/types";
import { useGetGamesQuery } from "@/redux/api/games.api";

const GamesList = ({ children }: Children) => {
  const { isLoading, data } = useGetGamesQuery("");

  return (
    <>
      {children}
      {isLoading ? <h4>Loading</h4> : <ul>123</ul>}
    </>
  );
};
export default GamesList;

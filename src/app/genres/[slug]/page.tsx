"use client";
import { firstWordToUppercase } from "../../../utils/firstWordToUppercase";
import { filterGamesByGenre } from "../../../utils/filterGamesByGenre";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { Genre } from "@/types/Genre";
import { PacmanLoader } from "react-spinners";
import { Game } from "@/types/Game";
import Container from "@/components/Container";
import Title from "@/components/Title";
import ErrorData from "@/components/ErrorData";
import GameCard from "@/components/GameCard";
import React, { ReactNode } from "react";

interface GenreGamesPageProps {
  params: { slug: "string" };
}

const GenreGames = ({ params: { slug } }: GenreGamesPageProps): ReactNode => {
  const { isLoading, data, error } = useGetGamesQuery("");
  const newString = firstWordToUppercase(slug);

  if (error) return <ErrorData errorText='Error data' />;

  // if (!isLoading) {
  //   console.log(data.results);
  // }

  return (
    <Container>
      <Title name={`${newString} games`} />
      {isLoading ? (
        <PacmanLoader className='mx-auto my-0' color='#ed5564' />
      ) : (
        <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px]'>
          {filterGamesByGenre(data.results, slug).map((game: Game) => {
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              price={game.playtime}
              rating={game.rating}
              bgImage={game.background_image}
              slug={game.slug}
            />;
          })}
        </ul>
      )}
    </Container>
  );
};

export default GenreGames;

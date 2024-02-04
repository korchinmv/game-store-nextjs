"use client";
import { firstWordToUppercase } from "../../../utils/firstWordToUppercase";
import { useGetGamesByGenreQuery } from "@/redux/api/games.api";
import { PacmanLoader } from "react-spinners";
import Container from "@/components/Container";
import Title from "@/components/Title";
import ErrorData from "@/components/ErrorData";
import React, { ReactNode } from "react";
import DescriptionGenre from "@/components/ui/DescriptionGenre";
import GameCard from "@/components/GameCard";
import { Game } from "@/types/Game";

interface GenreGamesPageProps {
  params: { slug: "string" };
}

const GenreGames = ({ params: { slug } }: GenreGamesPageProps): ReactNode => {
  const { isLoading, data, error } = useGetGamesByGenreQuery({
    id: slug,
    quantity: 20,
  });

  const newTitle = firstWordToUppercase(slug);

  if (error) return <ErrorData errorText='Error data' />;
  console.log(data);

  return (
    <section className='flex flex-col py-[15px] md:mb-[30px]'>
      <Container>
        <Title name={`${newTitle} games`} />

        {isLoading ? (
          <PacmanLoader className='mx-auto my-0' color='#ed5564' />
        ) : (
          <>
            <DescriptionGenre text={data.description} />
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
          </>
        )}
      </Container>
    </section>
  );
};

export default GenreGames;

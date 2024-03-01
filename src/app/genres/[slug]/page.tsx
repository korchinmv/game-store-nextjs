"use client";
import { firstWordToUppercase } from "../../../utils/firstWordToUppercase";
import { useGetGamesByGenreQuery } from "@/redux/api/games.api";
import { PacmanLoader } from "react-spinners";
import Container from "@/components/Container";
import Title from "@/components/SubTitle";
import ErrorData from "@/components/ErrorData";
import React, { ReactNode } from "react";
import TextWithMoreButton from "@/components/ui/TextWithMoreButton";
import GameCard from "@/components/GameCard";
import { Game } from "@/types/Game";
import { Breadcrumbs, Link, Typography } from "@mui/material";

interface GenreGamesPageProps {
  params: { slug: "string" };
}

const GenreGames = ({ params: { slug } }: GenreGamesPageProps): ReactNode => {
  const { isLoading, data, error } = useGetGamesByGenreQuery({
    id: slug,
    quantity: 20,
  });

  const newTitle = firstWordToUppercase(slug);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Link
      className='animation'
      underline='none'
      key='1'
      color='white'
      href='/genres'
    >
      Genres
    </Link>,
    <Typography key='2' color='white'>
      {newTitle}
    </Typography>,
  ];

  if (error) return <ErrorData errorText='Error data' />;

  return (
    <section className='flex flex-col py-[15px] md:mb-[30px]'>
      <Container>
        <Breadcrumbs
          sx={{ marginBottom: "10px", alignSelf: "start" }}
          separator='>'
          color='white'
          aria-label='breadcrumbs'
        >
          {breadcrumbs}
        </Breadcrumbs>

        <Title name={`${newTitle} Games`} />

        {isLoading ? (
          <PacmanLoader className='mx-auto my-0 mt-[40px]' color='#ed5564' />
        ) : (
          <>
            <TextWithMoreButton text={data.description} />
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
        )}
      </Container>
    </section>
  );
};

export default GenreGames;

"use client";
import { firstWordToUppercase } from "../../../utils/firstWordToUppercase";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { PacmanLoader } from "react-spinners";
import Container from "@/components/Container";
import Title from "@/components/Title";
import ErrorData from "@/components/ErrorData";
import React, { ReactNode } from "react";

interface GenreGamesPageProps {
  params: { slug: "string" };
}

const GenreGames = ({ params: { slug } }: GenreGamesPageProps): ReactNode => {
  const { isLoading, data, error } = useGetGamesQuery("");
  const newString = firstWordToUppercase(slug);

  if (error) return <ErrorData errorText='Error data' />;

  return (
    <Container>
      <Title name={`${newString} games`} />
      {isLoading ? (
        <PacmanLoader className='mx-auto my-0' color='#ed5564' />
      ) : (
        <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px]'></ul>
      )}
    </Container>
  );
};

export default GenreGames;

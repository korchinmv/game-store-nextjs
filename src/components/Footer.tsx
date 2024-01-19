"use client";
import { FC } from "react";
import { useGetGamesQuery } from "@/redux/api/games.api";
import Container from "./Container";

const Footer: FC = () => {
  const { isLoading, data } = useGetGamesQuery("");
  console.log(data.results);
  console.log(isLoading);

  return (
    <footer className='mt-auto'>
      <Container>Footer</Container>
    </footer>
  );
};

export default Footer;

"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { favoritesGamesSelector } from "@/redux/features/favoritesGames/favoritesGamesSelector";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { ResponseGamesData } from "@/types/ResponseGamesData";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import GamesList from "@/components/GamesList";
import SubTitle from "@/components/SubTitle";

const FavoritesPage = () => {
  const [favoritesGames, setFavoritesGames] =
    useState<ResponseGamesData | null>(null);
  const favoritesGamesList = useAppSelector(favoritesGamesSelector);

  useEffect(() => {
    if (favoritesGamesList) {
      setFavoritesGames(favoritesGamesList);
    }
  }, [favoritesGamesList]);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Typography key='2' color='white'>
      Favorites Games
    </Typography>,
  ];

  return (
    <section>
      <Container>
        <Breadcrumbs
          sx={{ marginBottom: "10px", alignSelf: "start" }}
          separator='>'
          color='white'
          aria-label='breadcrumbs'
        >
          {breadcrumbs}
        </Breadcrumbs>

        <SubTitle name={"Favorites Games"} />

        {favoritesGames !== null &&
          (favoritesGames.results.length > 0 ? (
            <p className='text-center mb-[20px]'>{`You have added ${favoritesGames?.results.length} games`}</p>
          ) : null)}

        {favoritesGamesList.results.length !== 0 ? (
          <GamesList dataGames={favoritesGames} />
        ) : (
          <ErrorData errorText='Add Games to your favorites.' />
        )}
      </Container>
    </section>
  );
};

export default FavoritesPage;

"use client";
import Container from "@/components/Container";
import GamesList from "@/components/GamesList";
import SubTitle from "@/components/SubTitle";
import { favoritesGamesSelector } from "@/redux/features/favoritesGames/favoritesGamesSelector";
import { useAppSelector } from "@/redux/hooks";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const FavoritesPage = () => {
  const favoritesGamesList = useAppSelector(favoritesGamesSelector);
  console.log(favoritesGamesList);

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

        <GamesList dataGames={favoritesGamesList} />
      </Container>
    </section>
  );
};

export default FavoritesPage;

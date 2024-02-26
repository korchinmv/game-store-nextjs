"use client";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { PacmanLoader } from "react-spinners";
import { Pagination } from "@mui/material";
import Theme from "@/styles/muiStyles";
import Title from "@/components/SubTitle";
import GameCard from "@/components/GameCard";
import Container from "@/components/Container";

const GamesPage = () => {
  const {
    isLoading: isLoadingGamesQuery,
    data: dataGames,
    error: errorGames,
  } = useGetGamesQuery({ quantity: 20, numberPage: 2 });

  return (
    <section>
      <Container>
        <div className='flex flex-col items-center'>
          <Title name={"All Games"} />
          {isLoadingGamesQuery ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] py-[20px]'>
              {dataGames?.results.map((game: Game) => (
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
          )}

          <Theme>
            <Pagination
              count={10}
              variant='outlined'
              shape='rounded'
              size='large'
            />
          </Theme>
        </div>
      </Container>
    </section>
  );
};

export default GamesPage;

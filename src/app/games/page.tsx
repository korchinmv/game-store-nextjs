"use client";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { PacmanLoader } from "react-spinners";
import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import Theme from "@/styles/muiStyles";
import Title from "@/components/SubTitle";
import GameCard from "@/components/GameCard";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";

const GamesPage = () => {
  const [page, setPage] = useState(1);

  const {
    isLoading: isLoadingGamesQuery,
    data: dataGames,
    error: errorGames,
    isFetching: fetching,
  } = useGetGamesQuery({ quantity: 20, numberPage: page });

  if (errorGames)
    return <ErrorData errorText='Error data games. Bad request.' />;

  return (
    <section>
      <Container>
        <div className='flex flex-col items-center'>
          <Title name={"All Games"} />
          {isLoadingGamesQuery || fetching ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <>
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
              {!!dataGames && (
                <Theme>
                  <Pagination
                    count={100}
                    page={page}
                    variant='outlined'
                    shape='rounded'
                    size='large'
                    sx={{
                      ".Mui-selected": {
                        backgroundColor: "#ed5564",
                        color: "#fff",
                      },
                      ".MuiPagination-ul li": {
                        margin: "2px",
                      },
                    }}
                    onChange={(_, num) => setPage(num)}
                  />
                </Theme>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default GamesPage;

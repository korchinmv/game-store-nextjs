"use client";
import {
  useGetGamesQuery,
  useLazyGetSearchGamesQuery,
} from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { PacmanLoader } from "react-spinners";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import Title from "@/components/SubTitle";
import GameCard from "@/components/GameCard";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import SearchInput from "@/components/ui/SearchInput";
import PaginationComponent from "@/components/ui/Pagination";

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [numPage, setNumPage] = useState<Number>(1);
  const [pageQty, setPageQty] = useState<Number | null>(null);
  const [searchGameName, setSearchGameName] = useState<String>("");

  const {
    isLoading: isLoadingGamesQuery,
    data: dataGames,
    error: errorGames,
    isFetching: fetchingGetGames,
  } = useGetGamesQuery({ quantity: 20, numberPage: numPage });

  const [
    trigger,
    {
      data: dataGameSearch,
      isLoading: loadingGameSearch,
      error: errorGameSearch,
      isFetching: fetchingGameSearch,
    },
  ] = useLazyGetSearchGamesQuery();

  useEffect(() => {
    setGames(dataGames?.results);
    setPageQty(dataGames?.count);
  }, [dataGames]);

  useEffect(() => {
    setGames(dataGameSearch?.results);
    setPageQty(dataGameSearch?.count);
  }, [dataGameSearch]);

  if (errorGames || errorGameSearch)
    return <ErrorData errorText='Error data games. Bad request.' />;

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Typography key='2' color='white'>
      Game Store
    </Typography>,
  ];

  return (
    <section>
      <Container>
        {!isLoadingGamesQuery && (
          <SearchInput
            trigger={trigger}
            setNumPage={setNumPage}
            setSearchGameName={setSearchGameName}
          />
        )}
        <div className='flex flex-col items-center'>
          <Breadcrumbs
            sx={{ marginBottom: "10px", alignSelf: "start" }}
            separator='>'
            color='white'
            aria-label='breadcrumbs'
          >
            {breadcrumbs}
          </Breadcrumbs>

          <Title name={"Games"} />
          {isLoadingGamesQuery ||
          fetchingGetGames ||
          loadingGameSearch ||
          fetchingGameSearch ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <>
              <div className='flex'></div>

              <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] py-[20px] w-full'>
                {games?.map((game: Game) => (
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

              {!!dataGames || !!dataGameSearch ? (
                <PaginationComponent
                  pageQty={pageQty}
                  setNumPage={setNumPage}
                  numPage={numPage}
                  handleGetSearchGames={trigger}
                  dataGameSearch={dataGameSearch}
                  searchGameName={searchGameName}
                />
              ) : null}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default GamesPage;

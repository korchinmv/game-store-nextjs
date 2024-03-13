"use client";
import {
  useGetGamesQuery,
  useLazyGetSearchGamesQuery,
} from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { PacmanLoader } from "react-spinners";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import Title from "@/components/SubTitle";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import SearchInput from "@/components/ui/SearchInput";
import PaginationComponent from "@/components/ui/Pagination";
import GamesList from "@/components/GamesList";

const GamesPage = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [inputSearchForm, setInputSearchForm] = useState<string>("");
  const [numPage, setNumPage] = useState<number>(1);
  const [searchNumPage, setSearchNumPage] = useState<number>(1);
  const [pageQty, setPageQty] = useState<number>(0);

  const {
    isLoading: loadingGamesQuery,
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
    const localInputSearch = getLocalStorage("searchInputValue");
    const localSearchPageNumber = getLocalStorage("searchPageNumber");
    const localPageNumber = getLocalStorage("pageNumber");

    if (localInputSearch) {
      setInputSearchForm(JSON.parse(localInputSearch));
    }

    if (localSearchPageNumber) {
      setSearchNumPage(JSON.parse(localSearchPageNumber));
    }

    if (localPageNumber) {
      setNumPage(JSON.parse(localPageNumber));
    }

    setAllGames(dataGames?.results);
    setPageQty(dataGames?.count);
    localStorage.setItem("games", JSON.stringify(dataGames?.results));
  }, [dataGames]);

  useEffect(() => {
    setAllGames(dataGameSearch?.results);
    setPageQty(dataGameSearch?.count);
  }, [dataGameSearch]);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Typography key='2' color='white'>
      Game Store
    </Typography>,
  ];

  if (dataGames?.results.length === 0 || dataGameSearch?.results.length === 0) {
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

          <SearchInput
            trigger={trigger}
            setSearchGameName={setSearchGameName}
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
            setSearchNumPage={setSearchNumPage}
          />
          <ErrorData errorText='Games Not Found ;-(' />
        </Container>
      </section>
    );
  }

  if (errorGames || errorGameSearch)
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
          <SearchInput
            trigger={trigger}
            setSearchGameName={setSearchGameName}
            setSearchNumPage={setSearchNumPage}
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
          />
          <ErrorData errorText='Error data games. Bad request.' />
        </Container>
      </section>
    );

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

        {!loadingGamesQuery && (
          <SearchInput
            trigger={trigger}
            setSearchNumPage={setSearchNumPage}
            setSearchGameName={setSearchGameName}
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
          />
        )}

        <div className='flex flex-col items-center'>
          <Title name={"Games"} />

          {loadingGamesQuery ||
          fetchingGetGames ||
          loadingGameSearch ||
          fetchingGameSearch ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <>
              {/* <GamesList
                games={
                  getLocalStorage("searchGames") === null ||
                  (getLocalStorage("games") === null && allGames)
                }
              /> */}

              {allGames?.length !== 0 ? (
                <PaginationComponent
                  pageQty={pageQty}
                  setNumPage={setNumPage}
                  numPage={numPage}
                  searchNumPage={searchNumPage}
                  setSearchNumPage={setSearchNumPage}
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

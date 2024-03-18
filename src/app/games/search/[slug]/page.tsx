"use client";
import { useEffect, useState } from "react";
import { useLazyGetSearchGamesQuery } from "@/redux/api/games.api";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { PacmanLoader } from "react-spinners";
import { getSessionStorage } from "@/utils/getSessionStorage";
import { ResponseGamesData } from "@/types/ResponseGamesData";
import Container from "@/components/Container";
import GamesList from "@/components/GamesList";
import PaginationComponent from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ErrorData from "@/components/ErrorData";
import SubTitle from "@/components/SubTitle";

const SearchPage = () => {
  const [allGames, setAllGames] = useState<ResponseGamesData>();
  const [inputSearchForm, setInputSearchForm] = useState<string>("");
  const [searchNumPage, setSearchNumPage] = useState<number>(1);
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [pageQty, setPageQty] = useState<number>(0);

  const [
    trigger,
    {
      data: dataGames,
      isLoading: loadingGamesQuery,
      error: errorGames,
      isFetching: fetchingGameSearch,
    },
  ] = useLazyGetSearchGamesQuery();

  useEffect(() => {
    const storageSearchGameList = getSessionStorage("searchGamesList");
    const storageSearchPageNumber = getSessionStorage("searchPageNumber");
    const storageInputSearch = getSessionStorage("searchInputValue");

    if (storageInputSearch) {
      setInputSearchForm(storageInputSearch);
    }

    if (storageSearchPageNumber) {
      setSearchNumPage(storageSearchPageNumber);
    }

    if (storageSearchGameList) {
      setAllGames(storageSearchGameList);
      setPageQty(storageSearchGameList.count);
    }

    if (dataGames) {
      setAllGames(dataGames);
      setPageQty(dataGames?.count);
      sessionStorage.setItem("searchGamesList", JSON.stringify(dataGames));
    }
  }, [dataGames]);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Link
      className='animation'
      underline='none'
      key='2'
      color='white'
      href='/games'
    >
      Game Store
    </Link>,
    <Typography key='3' color='white'>
      Found Games
    </Typography>,
  ];

  if (dataGames?.results.length === 0) {
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

  if (errorGames)
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
            setSearchNumPage={setSearchNumPage}
            setSearchGameName={setSearchGameName}
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
          />
        )}

        <div className='flex flex-col items-center'>
          <SubTitle name={"Found Games"} />

          {loadingGamesQuery || fetchingGameSearch ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <>
              <GamesList dataGames={allGames} />

              {allGames && (
                <PaginationComponent
                  pageQty={pageQty}
                  searchNumPage={searchNumPage}
                  setSearchNumPage={setSearchNumPage}
                  searchGameName={searchGameName}
                  handleGetSearchGames={trigger}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SearchPage;

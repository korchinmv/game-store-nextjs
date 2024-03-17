"use client";
import { useEffect, useState } from "react";
import { useLazyGetSearchGamesQuery } from "@/redux/api/games.api";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { PacmanLoader } from "react-spinners";
import { getSessionStorage } from "@/utils/getSessionStorage";
import { Game } from "@/types/Game";
import { getURL } from "next/dist/shared/lib/utils";
import Container from "@/components/Container";
import GamesList from "@/components/GamesList";
import Title from "@/components/Title";
import PaginationComponent from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ErrorData from "@/components/ErrorData";

const SearchPage = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [inputSearchForm, setInputSearchForm] = useState<string>("");
  const [searchNumPage, setSearchNumPage] = useState<number>(1);
  const [searchGameName, setSearchGameName] = useState<string>("");
  const location = getURL().slice(14);

  const [
    trigger,
    {
      data: dataGames,
      isLoading: loadingGamesQuery,
      error: errorGames,
      isFetching: fetchingGameSearch,
    },
  ] = useLazyGetSearchGamesQuery();

  // useEffect(() => {
  //   trigger({ gameName: location, numberPage: 1 });

  //   sessionStorage.setItem(
  //     "searchGamesList",
  //     JSON.stringify(dataGames?.results)
  //   );
  // }, []);

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
    }

    // if (dataGames?.results) {
    //   setAllGames(dataGames?.results);
    //   setPageQty(dataGames?.count);
    //   sessionStorage.setItem("gamesList", JSON.stringify(dataGames?.results));
    // }
  }, []);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Link className='animation' underline='none' key='2' color='white' href='/'>
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
          <Title name={"Found Games"} />

          {loadingGamesQuery ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <>
              <GamesList games={allGames} />

              {/* {allGames?.length !== 0 ? (
                <PaginationComponent
                  pageQty={pageQty}
                  handleGetSearchGames={trigger}
                  dataGameSearch={dataGameSearch}
                  searchGameName={searchGameName}
                />
              ) : null} */}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SearchPage;

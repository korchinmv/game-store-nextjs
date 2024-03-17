"use client";
import {
  useGetGamesQuery,
  useLazyGetSearchGamesQuery,
} from "@/redux/api/games.api";
import { Game } from "@/types/Game";
import { PacmanLoader } from "react-spinners";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { getSessionStorage } from "@/utils/getSessionStorage";
import Title from "@/components/SubTitle";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import SearchInput from "@/components/ui/SearchInput";
import PaginationComponent from "@/components/ui/Pagination";
import GamesList from "@/components/GamesList";

const GamesPage = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [inputSearchForm, setInputSearchForm] = useState<string>("");
  const [numPage, setNumPage] = useState<number>(1);
  const [pageQty, setPageQty] = useState<number>(0);
  const storeHeaderLink = document.querySelector("#store");
  const isGamesPage = window.location.pathname === "/games";

  const {
    isLoading: loadingGamesQuery,
    data: dataGames,
    error: errorGames,
    isFetching: fetchingGetGames,
  } = useGetGamesQuery({ quantity: 20, numberPage: numPage });

  useEffect(() => {
    const storageInputSearch = getSessionStorage("searchInputValue");
    const storagePageNumber = getSessionStorage("pageNumber");
    const storageGameList = getSessionStorage("gamesList");

    if (storageInputSearch) {
      setInputSearchForm(storageInputSearch);
    }

    if (storagePageNumber) {
      setNumPage(storagePageNumber);
    }

    if (storageGameList) {
      setAllGames(storageGameList);
    }

    if (dataGames?.results) {
      setAllGames(dataGames?.results);
      setPageQty(dataGames?.count);
      sessionStorage.setItem("gamesList", JSON.stringify(dataGames?.results));
    }
  }, [dataGames]);

  const breadcrumbs = [
    <Link className="animation" underline="none" key="1" color="white" href="/">
      Home
    </Link>,
    <Typography key="2" color="white">
      Game Store
    </Typography>,
  ];

  const updateGamesList = () => {
    setAllGames(getSessionStorage("gamesList"));
    sessionStorage.removeItem("searchInputValue");
    sessionStorage.removeItem("searchGamesList");
    sessionStorage.setItem("pageNumber", JSON.stringify(1));
  };

  storeHeaderLink?.addEventListener("click", updateGamesList);

  if (!isGamesPage) {
    storeHeaderLink?.removeEventListener("click", updateGamesList);
  }

  if (dataGames?.results.length === 0) {
    return (
      <section>
        <Container>
          <Breadcrumbs
            sx={{ marginBottom: "10px", alignSelf: "start" }}
            separator=">"
            color="white"
            aria-label="breadcrumbs"
          >
            {breadcrumbs}
          </Breadcrumbs>

          <SearchInput
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
          />
          <ErrorData errorText="Games Not Found ;-(" />
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
            separator=">"
            color="white"
            aria-label="breadcrumbs"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <SearchInput
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
          />
          <ErrorData errorText="Error data games. Bad request." />
        </Container>
      </section>
    );

  return (
    <section>
      <Container>
        <Breadcrumbs
          sx={{ marginBottom: "10px", alignSelf: "start" }}
          separator=">"
          color="white"
          aria-label="breadcrumbs"
        >
          {breadcrumbs}
        </Breadcrumbs>

        {!loadingGamesQuery && (
          <SearchInput
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
          />
        )}

        <div className="flex flex-col items-center">
          <Title name={"Games"} />

          {loadingGamesQuery || fetchingGetGames ? (
            <PacmanLoader className="mx-auto my-0 mt-[100px]" color="#ed5564" />
          ) : (
            <>
              <GamesList games={allGames} />

              {allGames?.length !== 0 ? (
                <PaginationComponent
                  pageQty={pageQty}
                  setNumPage={setNumPage}
                  numPage={numPage}
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

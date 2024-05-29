"use client";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { ResponseGamesData } from "@/types/ResponseGamesData";
import { PacmanLoader } from "react-spinners";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getSessionStorage } from "@/utils/getSessionStorage";
import { getElementBySelector } from "../../utils/getElementBySelector";
import { useGetPlatformsQuery } from "@/redux/api/platforms.api";
import { sortByButton } from "@/utils/mock/mockData";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import Title from "@/components/SubTitle";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import SearchInput from "@/components/ui/SearchInput";
import PaginationComponent from "@/components/ui/Pagination";
import GamesList from "@/components/GamesList";
import FilterButton from "@/components/ui/FilterButton";

const GamesPage = () => {
  const [allGames, setAllGames] = useState<ResponseGamesData | null>(null);
  const [inputSearchForm, setInputSearchForm] = useState<string>("");
  const [searchGameName, setSearchGameName] = useState<string>("");
  const [ordering, setOrdering] = useState<string | number | null>(null);
  const [platforms, setPlatforms] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [numPage, setNumPage] = useState<number>(1);
  const [pageQty, setPageQty] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const queryString: any = {};

    if (ordering !== null) {
      queryString.ordering = ordering;
    }

    if (platforms !== null) {
      queryString.platforms = platforms;
    }

    router.push(`?${qs.stringify(queryString)}`);
  }, [platforms, ordering, router]);

  useEffect(() => {
    setIsLoading(true);
    const fetchFiltredGames = async () => {
      try {
        const res = await fetch(
          `${process.env.BASE_URL_GAMESTORE}games?${
            ordering ? `ordering=${ordering}&` : ""
          }${platforms ? `platforms=${platforms}&` : ""}key=${
            process.env.KEY_GAMESTORE
          }`
        );
        const games = await res.json();
        setAllGames(games);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiltredGames();
  }, [platforms, ordering]);

  const {
    isLoading: loadingGamesQuery,
    data: dataGames,
    error: errorGames,
    isFetching: fetchingGetGames,
  } = useGetGamesQuery({ quantity: 20, numberPage: numPage });

  const { isLoading: loadingPlatformsQuery, data: dataPlatforms } =
    useGetPlatformsQuery(10);

  useEffect(() => {
    const isGamesPage = window.location.pathname === "/games";

    getElementBySelector("#store")?.addEventListener("click", updateGamesList);

    if (!isGamesPage) {
      getElementBySelector("#store")?.removeEventListener(
        "click",
        updateGamesList
      );
    }
  }, []);

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

    if (dataGames) {
      setAllGames(dataGames);
      setPageQty(dataGames?.count);
      sessionStorage.setItem("gamesList", JSON.stringify(dataGames));
    }
  }, [dataGames]);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Typography key='2' color='white'>
      Game Store
    </Typography>,
  ];

  const updateGamesList = () => {
    setAllGames(getSessionStorage("gamesList"));
    sessionStorage.removeItem("searchInputValue");
    sessionStorage.removeItem("searchGamesList");
    sessionStorage.setItem("pageNumber", JSON.stringify(1));
  };

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
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
            setSearchGameName={setSearchGameName}
          />
          <ErrorData errorText='Games Not Found ;-(' />
        </Container>
      </section>
    );
  }

  if (errorGames || error)
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
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
            setSearchGameName={setSearchGameName}
          />
          <ErrorData errorText='Error data games. Bad request.' />
        </Container>
      </section>
    );

  return (
    <section>
      <Container>
        {!loadingGamesQuery && (
          <Breadcrumbs
            sx={{ marginBottom: "10px", alignSelf: "start" }}
            separator='>'
            color='white'
            aria-label='breadcrumbs'
          >
            {breadcrumbs}
          </Breadcrumbs>
        )}

        {!loadingGamesQuery && (
          <SearchInput
            inputSearchForm={inputSearchForm}
            setInputSearchForm={setInputSearchForm}
            setSearchGameName={setSearchGameName}
          />
        )}

        <div className='flex flex-col items-center'>
          {!loadingGamesQuery ? (
            <>
              <Title name={"All Games"} />
              <div className='menu-block mb-[30px] flex self-start gap-[15px]'>
                <FilterButton
                  name='Sort by'
                  data={sortByButton}
                  setState={setOrdering}
                  label='Sort games'
                />

                {dataPlatforms && (
                  <FilterButton
                    name='Platforms'
                    data={dataPlatforms?.results}
                    setState={setPlatforms}
                    label='Choose platform'
                  />
                )}
              </div>
            </>
          ) : null}

          {loadingGamesQuery ||
          fetchingGetGames ||
          loadingPlatformsQuery ||
          isLoading ? (
            <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
          ) : (
            <>
              <GamesList dataGames={allGames} />

              {allGames && (
                <PaginationComponent
                  searchGameName={searchGameName}
                  pageQty={pageQty}
                  setNumPage={setNumPage}
                  numPage={numPage}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default GamesPage;

"use client";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { useGetGenresQuery } from "@/redux/api/genres.api";
import { PacmanLoader } from "react-spinners";
import BestGamesList from "./BestGamesList";
import PopularGenresList from "./PopularGenresList";
import ErrorData from "./ErrorData";

const GetDataWrapper = () => {
  const {
    isLoading: isLoadingGamesQuery,
    data: dataGames,
    error: errorGames,
  } = useGetGamesQuery(10);

  const {
    isLoading: isLoadingGenresQuery,
    data: dataGenres,
    error: errorGenres,
  } = useGetGenresQuery(5);

  if (errorGames || errorGenres) return <ErrorData errorText={"Data Error"} />;

  return (
    <>
      {isLoadingGamesQuery || isLoadingGenresQuery ? (
        <PacmanLoader className='mx-auto my-0 mt-[100px]' color='#ed5564' />
      ) : (
        <>
          <BestGamesList data={dataGames} />
          <PopularGenresList data={dataGenres} />
        </>
      )}
    </>
  );
};

export default GetDataWrapper;

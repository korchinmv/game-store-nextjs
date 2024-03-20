"use client";
import { useGetGamesQuery } from "@/redux/api/games.api";
import { useGetGenresQuery } from "@/redux/api/genres.api";
import { PacmanLoader } from "react-spinners";
import GamesList from "./GamesList";
import GenresList from "./GenresList";
import ErrorData from "./ErrorData";
import SubTitle from "./SubTitle";
import LinkMore from "./ui/LinkMore";

const GetDataWrapper = () => {
  const {
    isLoading: isLoadingGamesQuery,
    data: dataGames,
    error: errorGames,
  } = useGetGamesQuery({ quantity: 10, numberPage: 1 });

  const {
    isLoading: isLoadingGenresQuery,
    data: dataGenres,
    error: errorGenres,
  } = useGetGenresQuery(5);

  if (errorGames || errorGenres) return <ErrorData errorText={"Data Error"} />;

  return (
    <>
      {isLoadingGamesQuery || isLoadingGenresQuery ? (
        <PacmanLoader className="mx-auto my-0 mt-[100px]" color="#ed5564" />
      ) : (
        <>
          <section className="flex flex-col py-[15px] md:mb-[30px]">
            <>
              <SubTitle name="The best Games for you" />
              <LinkMore name={"More Games"} link={"/games"} />
              <GamesList dataGames={dataGames} />
            </>
          </section>

          <section className="flex flex-col py-[30px] md:mb-[30px]">
            <>
              <SubTitle name="Popular Genres" />
              <LinkMore name={"More Genres"} link={"/genres"} />
              <GenresList data={dataGenres} />
            </>
          </section>
        </>
      )}
    </>
  );
};

export default GetDataWrapper;

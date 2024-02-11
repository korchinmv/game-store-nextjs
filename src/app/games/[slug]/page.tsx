"use client";
import {
  useGetGameDataQuery,
  useGetGameDlcQuery,
  useGetGameScreenshotsQuery,
} from "@/redux/api/games.api";
import { ReactNode } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { Screenshot } from "@/types/Screenshot";
import { Genre } from "@/types/Genre";
import { Platform } from "@/types/Platform";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import Image from "next/image";
import TextWithMoreButton from "@/components/ui/TextWithMoreButton";
import BuyBlock from "@/components/ui/BuyBlock";
import Rating from "@/components/Rating";
import { Developer } from "@/types/Developer";
import SliderGame from "@/components/ui/SliderGame";

interface GamePageProps {
  params: { slug: "string" };
}

const GamePage = ({ params: { slug } }: GamePageProps): ReactNode => {
  const {
    isLoading: loadingGameData,
    data: dataGame,
    error: errorGame,
  } = useGetGameDataQuery(slug);
  const {
    isLoading: loadingScreenshots,
    data: dataScreenshots,
    error: errorScreenshots,
  } = useGetGameScreenshotsQuery(slug);
  const {
    isLoading: loadingGameDlc,
    data: dataGameDlc,
    error: errorGameDlc,
  } = useGetGameDlcQuery(slug);

  if (errorGame || errorScreenshots || errorGameDlc)
    return <ErrorData errorText="Error data game" />;
  console.log(dataGame);
  console.log(dataGameDlc);

  return (
    <section>
      <Container>
        {loadingGameData ? (
          <PacmanLoader className="mx-auto my-auto" color="#ed5564" />
        ) : (
          <div className="flex justify-between">
            <div className="screenshots mr-[40px] max-w-[600px] w-full shrink-0">
              {loadingScreenshots ? (
                <ClipLoader color="#ed5564" />
              ) : (
                <SliderGame screenshots={dataScreenshots.results} />
              )}
            </div>

            <div className="content max-w-full grow-0">
              <h1 className="text-[42px] uppercase mb-[20px] leading-none	">
                {dataGame.name}
              </h1>

              <div className="flex justify-between mb-[30px]">
                <BuyBlock
                  buttonText="Add to cart"
                  price={dataGame.playtime}
                  labelName={dataGame.name}
                  cssStyles="mr-[30px]"
                />

                <div className="rating border border-[--accent-color] p-[20px] w-full">
                  <h2 className="text-[24px] mb-[10px] text-center">
                    Game rating
                  </h2>

                  <ul className="flex justify-around items-stretch">
                    <li className="flex items-center mr-[10px]">
                      <span className="mr-[10px]">Metacritic:</span>
                      <Rating number={dataGame.metacritic} />
                    </li>
                    <li className="flex items-center">
                      <span className="mr-[10px]">Overall rating:</span>
                      <Rating number={dataGame.rating} />
                    </li>
                  </ul>
                </div>
              </div>

              <TextWithMoreButton text={dataGame.description_raw} />

              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="bg-[--accent-color] py-[10px] px-[20px]">
                      {dataGame.genres.length > 1 ? "Genres:" : "Genre:"}
                    </td>
                    <td className="bg-[--accent-color] py-[10px] px-[20px]">
                      {dataGame.genres.map((genre: Genre, index: number) => {
                        return (
                          <span key={genre.id}>
                            {genre.name}
                            {index < dataGame.genres.length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-[10px] px-[20px]">
                      {dataGame.platforms.length > 1
                        ? "Platforms:"
                        : "Platform:"}
                    </td>
                    <td className="py-[10px] px-[20px]">
                      {dataGame.platforms.map(
                        (obj: Platform, index: number) => {
                          return (
                            <span key={obj.platform.id}>
                              {obj.platform.name}
                              {index < dataGame.platforms.length - 1
                                ? ", "
                                : ""}
                            </span>
                          );
                        }
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[--accent-color] py-[10px] px-[20px]">
                      Release:
                    </td>
                    <td className="bg-[--accent-color] py-[10px] px-[20px]">
                      {dataGame.released.split("-").reverse().join(".")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-[10px] px-[20px]">Developers:</td>
                    <td className="py-[10px] px-[20px]">
                      {dataGame.developers.map(
                        (developer: Developer, index: number) => {
                          return (
                            <span key={developer.id}>
                              {developer.name}
                              {index < dataGame.developers.length - 1
                                ? ", "
                                : ""}
                            </span>
                          );
                        }
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default GamePage;

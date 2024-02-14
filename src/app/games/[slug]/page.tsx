"use client";
import {
  useGetGameDataQuery,
  useGetGameDlcQuery,
  useGetGameScreenshotsQuery,
} from "@/redux/api/games.api";
import { CSSProperties, ReactNode } from "react";
import { ClipLoader, PacmanLoader, PuffLoader } from "react-spinners";
import { Genre } from "@/types/Genre";
import { Platform } from "@/types/Platform";
import { Developer } from "@/types/Developer";
import { Game } from "@/types/Game";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import TextWithMoreButton from "@/components/ui/TextWithMoreButton";
import BuyBlock from "@/components/ui/BuyBlock";
import Rating from "@/components/Rating";
import SliderGame from "@/components/ui/SliderGame";
import SubTitle from "@/components/SubTitle";
import GameCard from "@/components/GameCard";
import Title from "@/components/Title";
import Link from "next/link";

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
    return <ErrorData errorText='Error data game' />;
  console.log(dataGame);
  console.log(dataGameDlc);

  const override: CSSProperties = {
    display: "block",
    margin: "80px auto 0 auto",
    borderColor: "#ed5564",
  };

  return (
    <section>
      <Container>
        {loadingGameData && loadingGameDlc ? (
          <PuffLoader cssOverride={override} color={"#ed5564"} />
        ) : (
          <>
            <div className='flex justify-between mb-[30px]'>
              <div className='screenshots mr-[40px] max-w-[600px] w-full shrink-0'>
                {loadingScreenshots ? (
                  <ClipLoader cssOverride={override} color='#ed5564' />
                ) : (
                  <SliderGame screenshots={dataScreenshots.results} />
                )}
              </div>

              <div className='content max-w-full grow-0'>
                <Title name={dataGame?.name} />

                <div className='flex justify-between mb-[30px]'>
                  <BuyBlock
                    buttonText='Add to cart'
                    price={dataGame?.playtime}
                    labelName={dataGame?.name}
                    cssStyles='mr-[30px]'
                  />
                  {dataGame?.metacritic && dataGame?.rating ? (
                    <>
                      <div className='rating border border-[--accent-color] p-[20px] w-full'>
                        <h2 className='text-[24px] mb-[10px] text-center'>
                          Game rating
                        </h2>

                        <ul className='flex justify-around items-stretch'>
                          {dataGame?.metacritic ? (
                            <li className='flex items-center mr-[10px]'>
                              <Rating
                                name={"Metacritic:"}
                                number={dataGame?.metacritic}
                              />
                            </li>
                          ) : null}
                          {dataGame?.rating ? (
                            <li className='flex items-center'>
                              <Rating
                                name={"Overall rating:"}
                                number={dataGame?.rating}
                              />
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </>
                  ) : null}
                </div>

                <TextWithMoreButton text={dataGame?.description_raw} />

                <table className='w-full'>
                  <tbody>
                    <tr>
                      <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                        {dataGame?.genres.length > 1 ? "Genres:" : "Genre:"}
                      </td>
                      <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                        {dataGame?.genres.map((genre: Genre, index: number) => {
                          return (
                            <Link
                              className='underline'
                              href={`/genres/${genre.slug}`}
                              key={genre.id}
                            >
                              {genre.name}
                              {index < dataGame.genres.length - 1 ? ", " : ""}
                            </Link>
                          );
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className='py-[10px] px-[20px]'>
                        {dataGame?.platforms.length > 1
                          ? "Platforms:"
                          : "Platform:"}
                      </td>
                      <td className='py-[10px] px-[20px]'>
                        {dataGame?.platforms.map(
                          (obj: Platform, index: number) => {
                            return (
                              <Link
                                className='underline'
                                href={`/platform/${obj.platform.slug}`}
                                key={obj.platform.id}
                              >
                                {obj.platform.name}
                                {index < dataGame.platforms.length - 1
                                  ? ", "
                                  : ""}
                              </Link>
                            );
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                        Release:
                      </td>
                      <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                        {dataGame?.released.split("-").reverse().join(".")}
                      </td>
                    </tr>
                    <tr>
                      <td className='py-[10px] px-[20px]'>Developers:</td>
                      <td className='py-[10px] px-[20px]'>
                        {dataGame?.developers.map(
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
                    <tr>
                      <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                        Website:
                      </td>
                      <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                        <a href={dataGame?.website} target='_blank'>
                          {dataGame?.website}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {dataGameDlc?.results.length > 0 ? (
              <SubTitle name={"DLC for this Game"} />
            ) : null}

            <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] mb-[20px]'>
              {dataGameDlc?.results.map((game: Game) => (
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
          </>
        )}
      </Container>
    </section>
  );
};

export default GamePage;

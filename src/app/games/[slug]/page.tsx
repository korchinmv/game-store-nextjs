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
import { Typography, Link as MuiLink } from "@mui/material";
import { trimString } from "@/utils/trimString";
import { Breadcrumbs } from "@mui/material";
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
    isFetching: fetchingScreenshots,
  } = useGetGameScreenshotsQuery(slug);

  const {
    isLoading: loadingGameDlc,
    data: dataGameDlc,
    error: errorGameDlc,
  } = useGetGameDlcQuery(slug);

  if (errorGame || errorScreenshots || errorGameDlc)
    return <ErrorData errorText='Error data game' />;

  const override: CSSProperties = {
    display: "block",
    margin: "80px auto 0 auto",
    borderColor: "#ed5564",
  };

  const breadcrumbs = [
    <MuiLink
      className='animation'
      underline='none'
      key='1'
      color='white'
      href='/'
    >
      Home
    </MuiLink>,
    <MuiLink
      className='animation'
      underline='none'
      key='2'
      color='white'
      href='/games'
    >
      Game Store
    </MuiLink>,
    <Typography key='3' color='white'>
      {dataGame?.name}
    </Typography>,
  ];

  return (
    <section>
      <Container>
        {loadingGameData && loadingGameDlc ? (
          <PacmanLoader cssOverride={override} color={"#ed5564"} />
        ) : (
          <>
            <Breadcrumbs
              sx={{ marginBottom: "20px" }}
              separator='>'
              color='white'
              aria-label='breadcrumbs'
            >
              {breadcrumbs}
            </Breadcrumbs>

            <div className='flex flex-col flex-col-reverse justify-between mb-[30px] lg:flex-row'>
              <div className='screenshots max-w-full lg:max-w-[400px] lg:mr-[40px] xl:max-w-[600px] w-full shrink-0'>
                {loadingScreenshots && fetchingScreenshots ? (
                  <ClipLoader cssOverride={override} color='#ed5564' />
                ) : (
                  <SliderGame screenshots={dataScreenshots.results} />
                )}
              </div>

              <div className='content max-w-full grow-0 mb-[30px] lg:mb-[0px]'>
                <Title name={dataGame?.name} />

                <div className='flex flex-col justify-between mb-[30px] sm:flex-row'>
                  <BuyBlock
                    buttonText='Add to cart'
                    price={dataGame?.playtime}
                    labelName={dataGame?.name}
                    cssStyles='mb-[20px] sm:mr-[30px] sm:mb-[0px]'
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

                <table className='w-full text-[14px] sm:text-[16px]'>
                  <tbody>
                    <tr>
                      <td className='bg-[--accent-color] py-[10px] px-[5px] sm:px-[20px]'>
                        {dataGame?.genres.length > 1 ? "Genres:" : "Genre:"}
                      </td>
                      <td className='bg-[--accent-color] px-[5px] sm:px-[20px]'>
                        {dataGame?.genres.map((genre: Genre, index: number) => {
                          return (
                            <Link
                              className='underline animation hover:text-[--bg-color]'
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
                      <td className='py-[10px] px-[5px] sm:px-[20px]'>
                        {dataGame?.platforms.length > 1
                          ? "Platforms:"
                          : "Platform:"}
                      </td>
                      <td className='py-[10px] px-[5px] sm:px-[20px]'>
                        {dataGame?.platforms.map(
                          (obj: Platform, index: number) => {
                            return (
                              <Link
                                className='underline animation'
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
                      <td className='bg-[--accent-color] py-[10px] px-[5px] sm:px-[20px]'>
                        Release:
                      </td>
                      <td className='bg-[--accent-color] py-[10px] px-[5px] sm:px-[20px]'>
                        {dataGame?.released.split("-").reverse().join(".")}
                      </td>
                    </tr>
                    <tr>
                      <td className='py-[10px] px-[10px] sm:px-[20px]'>
                        Developers:
                      </td>
                      <td className='py-[10px] px-[10px] sm:px-[20px]'>
                        {dataGame?.developers.map(
                          (developer: Developer, index: number) => {
                            return (
                              <span key={developer.id}>
                                {developer.name}
                                {index < dataGame.developers.length - 1
                                  ? ","
                                  : ""}
                              </span>
                            );
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className='bg-[--accent-color] py-[10px] px-[5px] sm:px-[20px]'>
                        Website:
                      </td>
                      <td className='bg-[--accent-color] py-[10px] px-[5px] sm:px-[20px]'>
                        <a
                          className='animation hover:text-[--bg-color]'
                          href={dataGame?.website}
                          target='_blank'
                        >
                          {trimString(dataGame?.website, 25)}
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

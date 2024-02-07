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

  return (
    <section>
      <Container>
        {loadingGameData ? (
          <PacmanLoader className='mx-auto my-auto' color='#ed5564' />
        ) : (
          <div className='flex justify-between'>
            <div className='screenshots mr-[50px] max-w-[600px] w-full shrink-0 flex flex-col justify-center items-center'>
              {loadingScreenshots ? (
                <ClipLoader color='#ed5564' />
              ) : (
                dataScreenshots.results.map((screen: Screenshot) => {
                  return (
                    <Image
                      className='w-full h-auto cursor-pointer'
                      src={screen.image}
                      alt={`${dataGame.name} picture`}
                      priority={true}
                      width='0'
                      height='0'
                      sizes='100vw'
                      key={screen.id}
                    />
                  );
                })
              )}
            </div>

            <div className='content max-w-[600px] mr-[50px	]'>
              <h1 className='text-[36px] uppercase mb-[20px]'>
                {dataGame.name}
              </h1>
              <TextWithMoreButton text={dataGame.description_raw} />

              <table className='w-full'>
                <tbody>
                  <tr>
                    <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                      {dataGame.genres.length > 1 ? "Genres:" : "Genre:"}
                    </td>
                    <td className='bg-[--accent-color] py-[10px] px-[20px]'>
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
                    <td className='py-[10px] px-[20px]'>
                      {dataGame.platforms.length > 1
                        ? "Platforms:"
                        : "Platform:"}
                    </td>
                    <td className='py-[10px] px-[20px]'>
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
                    <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                      Release:
                    </td>
                    <td className='bg-[--accent-color] py-[10px] px-[20px]'>
                      {dataGame.released.split("-").reverse().join(".")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='buy border p-[10px] self-start w-[300px]'>
              <span className='block'>{`Price: ${dataGame.playtime}$`}</span>
              <button aria-label={`Add to cart ${dataGame.name} game`}>
                Add to cart
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default GamePage;

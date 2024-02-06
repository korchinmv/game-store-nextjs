"use client";
import {
  useGetGameDataQuery,
  useGetGameScreenshotsQuery,
} from "@/redux/api/games.api";
import { ReactNode } from "react";
import { PacmanLoader } from "react-spinners";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import Image from "next/image";
import TextWithMoreButton from "@/components/ui/TextWithMoreButton";
import { Screenshot } from "@/types/Screenshot";
import Link from "next/link";
import { Genre, GenreGame } from "@/types/Genre";

interface GamePageProps {
  params: { slug: "string" };
}

// interface GenreOfTheGame extends GenreGame {
// 	UserId: string;
// }

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

  if (errorGame) return <ErrorData errorText='Error data game' />;
  console.log(dataGame);
  console.log(dataScreenshots);

  return (
    <section>
      <Container>
        {loadingGameData ? (
          <PacmanLoader className='mx-auto my-auto' color='#ed5564' />
        ) : (
          <div className='flex justify-between'>
            <div className='screenshots mr-[50px] max-w-[600px] w-full shrink-0'>
              {dataScreenshots.results.map((screen: Screenshot) => {
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
              })}
            </div>

            <div className='content max-w-[600px] mr-[50px	]'>
              <h1 className='text-[36px] uppercase mb-[20px]'>
                {dataGame.name}
              </h1>
              <TextWithMoreButton text={dataGame.description_raw} />

              <table className=' w-full'>
                <tbody>
                  <tr>
                    <td className='bg-[--accent-color] py-[15px] px-[20px]'>
                      {dataGame.genres.length > 1 ? "Genres" : "Genre"}
                    </td>
                    <td className='bg-[--accent-color] py-[15px] px-[20px]'>
                      {dataGame.genres.map((genre: Genre) => {
                        return <span key={genre.id}>{genre.name}</span>;
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className=' py-[15px] px-[20px]'>Ohio</td>
                    <td className=' py-[15px] px-[20px]'>Columbus</td>
                  </tr>
                  <tr>
                    <td className='bg-[--accent-color] py-[15px] px-[20px]'>
                      Michigan
                    </td>
                    <td className='bg-[--accent-color] py-[15px] px-[20px]'>
                      Detroit
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

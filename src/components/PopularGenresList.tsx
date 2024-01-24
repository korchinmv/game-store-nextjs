"use client";

import LinkMore from "./ui/LinkMore";
import { Children } from "@/types";
import { useGetGenresQuery } from "@/redux/api/genres.api";
import { Genre } from "@/types/Genre";
import { cropFunction } from "../utils/cropFunction";
import GenreCard from "./GenreCard";
import { PacmanLoader } from "react-spinners";

const PopularGenresList = ({ children }: Children) => {
  const { isLoading, data } = useGetGenresQuery("");
  console.log(data);

  return (
    <section className='flex flex-col py-[30px] md:mb-[30px]'>
      {children}

      <LinkMore name={"More genres"} link={"/genres"} />
      {isLoading ? (
        <PacmanLoader className='mx-auto my-0' color='#ed5564' />
      ) : (
        <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 xl:gap-[25px]'>
          {cropFunction(data.results, 0, 6).map((genre: Genre) => (
            <GenreCard
              key={genre.id}
              name={genre.name}
              bgImage={genre.image_background}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PopularGenresList;

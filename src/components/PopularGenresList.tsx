"use client";
import { Genre } from "@/types/Genre";
import LinkMore from "./ui/LinkMore";
import GenreCard from "./GenreCard";
import SubTitle from "./SubTitle";

interface PopularGenresListProps {
  data: any;
}

const PopularGenresList = ({ data }: PopularGenresListProps) => {
  return (
    <section className='flex flex-col py-[30px] md:mb-[30px]'>
      <>
        <SubTitle name='Popular Genres' />
        <LinkMore name={"More Genres"} link={"/genres"} />
        <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] w-full'>
          {data?.results.map((genre: Genre) => (
            <GenreCard
              key={genre.id}
              name={genre.name}
              slug={genre.slug}
              bgImage={genre.image_background}
              games={genre.games}
            />
          ))}
        </ul>
      </>
    </section>
  );
};

export default PopularGenresList;

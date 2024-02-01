"use client";
import { useGetGenresQuery } from "@/redux/api/genres.api";
import { Genre } from "@/types/Genre";
import GenreCard from "@/components/GenreCard";
import Title from "@/components/Title";

interface GenresPageProps {
  params: { slug: "string" };
}

const GamesPage = ({ params: { slug } }: GenresPageProps) => {
  const { isLoading, data, error } = useGetGenresQuery("");
	console.log(data);

  return (
    <section>
			<Title name=`${slug} genre`/>
      <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 xl:gap-[25px]'>
        {data.results.map((genre: Genre) => (
          <GenreCard
            key={genre.id}
            name={genre.name}
            bgImage={genre.image_background}
          />
        ))}
      </ul>
    </section>
  );
};

export default GamesPage;

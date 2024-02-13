"use client";
import { useGetGenresQuery } from "@/redux/api/genres.api";
import { Genre } from "@/types/Genre";
import { PacmanLoader } from "react-spinners";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import GenreCard from "@/components/GenreCard";
import Title from "@/components/SubTitle";

const GenresPage = () => {
  const { isLoading, data, error } = useGetGenresQuery(0);

  if (error) return <ErrorData errorText="Error data" />;

  return (
    <section className="flex flex-col py-[30px] md:mb-[30px]">
      <Container>
        <Title name="All genres" />

        {isLoading ? (
          <PacmanLoader className="mx-auto my-0 pt-[40px]" color="#ed5564" />
        ) : (
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 xl:gap-[25px] pt-[10px] md:pt-[40px]">
            {data.results.map((genre: Genre) => (
              <GenreCard
                key={genre.id}
                name={genre.name}
                slug={genre.slug}
                bgImage={genre.image_background}
                games={genre.games}
              />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};

export default GenresPage;

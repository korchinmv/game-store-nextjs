"use client";
import { useGetGenresQuery } from "@/redux/api/genres.api";
import { PacmanLoader } from "react-spinners";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Response } from "@/types/Response";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import GenreCard from "@/components/GenreCard";
import Title from "@/components/SubTitle";

const GenresPage = () => {
  const { isLoading, data, error } = useGetGenresQuery(0);

  const breadcrumbs = [
    <Link className='animation' underline='none' key='1' color='white' href='/'>
      Home
    </Link>,
    <Typography key='2' color='white'>
      Genres
    </Typography>,
  ];

  if (error) return <ErrorData errorText='Error data' />;

  return (
    <section className='flex flex-col py-[10px] md:mb-[30px]'>
      <Container>
        <Breadcrumbs
          sx={{ marginBottom: "10px", alignSelf: "start" }}
          separator='>'
          color='white'
          aria-label='breadcrumbs'
        >
          {breadcrumbs}
        </Breadcrumbs>

        <Title name='All Genres' />

        {isLoading ? (
          <PacmanLoader className='mx-auto my-0 pt-[40px]' color='#ed5564' />
        ) : (
          <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 xl:gap-[25px] pt-[10px] md:pt-[40px]'>
            {data.results.map((genre: Response) => (
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

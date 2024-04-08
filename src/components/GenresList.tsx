import { Response } from "@/types/Response";
import { ResponseGenresData } from "@/types/ResponseGenresData";
import GenreCard from "./GenreCard";

interface GenresListProps {
  dataGenres: ResponseGenresData;
}

const GenresList = ({ dataGenres }: GenresListProps) => {
  return (
    <ul className='grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-[25px] w-full'>
      {dataGenres?.results.map((genre: Response) => (
        <GenreCard
          key={genre.id}
          name={genre.name}
          slug={genre.slug}
          bgImage={genre.image_background}
          games={genre.games}
        />
      ))}
    </ul>
  );
};

export default GenresList;

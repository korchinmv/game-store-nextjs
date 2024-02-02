import { GenreGame } from "@/types/Genre";
import Link from "next/link";

interface GenreCardProps {
  name: string;
  slug: string;
  bgImage: string;
  games: GenreGame[];
}

const GenreCard = ({ name, slug, bgImage, games }: GenreCardProps) => {
  console.log(games);

  return (
    <li className='rounded-xl'>
      <article
        className='flex flex-col p-[20px] backdrop-brightness-200 bg-no-repeat bg-cover bg-top md:bg-center border-solid border-[2px] rounded-xl ease-out duration-300 hover:border-[--accent-color] min-h-[220px] md:min-h-[300px]'
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <Link
          className='animation outline-none mb-auto text-[--accent-color] text-[26px] block w-fit mx-auto hover:scale-110 underline underline-offset-[4px]'
          href={`/genres/${slug}`}
        >
          {name}
        </Link>
        <div>
          <h3 className='md:text-[22px]'>Best games in genre:</h3>
          <ul>
            {games?.slice(0, 3).map((game: GenreGame) => {
              return (
                <li key={game.id}>
                  <Link
                    className='animation hover:text-[--accent-color] text-[16px] md:text-[18px]'
                    href={`/games/${game.id}`}
                  >
                    {game.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </li>
  );
};
export default GenreCard;

import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface GameCardProps {
  name: string;
  price: number;
  rating: number;
  bgImage: string;
  id: number;
  slug: string;
}

const GameCard = ({ name, price, rating, bgImage, slug }: GameCardProps) => {
  return (
    <li>
      <article
        className='game-card bg-no-repeat bg-cover bg-top md:bg-center min-h-[170px] md:min-h-[300px] flex flex-col justify-between border-solid border-[2px] rounded-xl ease-out duration-300 hover:border-[--accent-color]'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='game-card__top flex justify-between p-3'>
          <div className='game-card__rating flex justify-between items-center'>
            {rating ? (
              <>
                <span className='mr-[5px] leading-none mt-[3px]'>{rating}</span>
                <FaStar color='yellow' size='18' />
              </>
            ) : null}
          </div>

          {price !== 0 ? (
            <button className='animation' aria-label='Add to cart'>
              <IoCartOutline size='25' />
            </button>
          ) : null}
        </div>
        <Link
          className='game-card__body block h-full outline-none grow'
          aria-label={`Go to game page ${slug}`}
          href={`/games/${slug}`}
        ></Link>
        <div className='game-card__bot flex justify-between items-center backdrop-blur-xl py-1 px-4 md:py-3 rounded-b-xl'>
          <h3 className='mr-[5px]'>{name}</h3>
          <span className='text-[20px] md:text-[25px]'>
            {price === 0 ? "" : price + "$"}
          </span>
        </div>
      </article>
    </li>
  );
};
export default GameCard;

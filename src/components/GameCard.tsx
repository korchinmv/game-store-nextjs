import { useState, useEffect } from "react";
import { favoritesGamesSelector } from "@/redux/features/favoritesGames/favoritesGamesSelector";
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLikeGame } from "@/redux/features/favoritesGames/favoritesGamesSlice";
import { Game } from "@/types/Game";
import Link from "next/link";

const noPicImagePath =
  "https://i.pinimg.com/originals/7e/1d/3b/7e1d3b6b9b0a1e48ff975850597cc70e.jpg";

interface GameProps {
  game: Game;
}

const GameCard = ({ game }: GameProps) => {
  const [likeBtnState, setLikeBtnState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const favoritesGamesList = useAppSelector(favoritesGamesSelector);

  useEffect(() => {
    if (
      favoritesGamesList?.results.some((favoriteGame) => favoriteGame === game)
    ) {
      setLikeBtnState(true);
    }
  }, [favoritesGamesList?.results, game]);

  const handleLikeBtnClick = () => {
    dispatch(toggleLikeGame(game));
    setLikeBtnState(() => !likeBtnState);
  };

  return (
    <li>
      <article
        className='game-card bg-no-repeat bg-cover bg-top md:bg-center min-h-[170px] md:min-h-[300px] flex flex-col justify-between border-solid border-[2px] rounded-xl ease-out duration-300 hover:border-[--accent-color]'
        style={{
          backgroundImage: `url(${
            game?.background_image ? game?.background_image : noPicImagePath
          })`,
        }}
      >
        <div className='game-card__top flex justify-between p-3'>
          <div className='game-card__rating flex justify-between items-center'>
            {game?.rating ? (
              <>
                <span className='mr-[5px] leading-none mt-[3px]'>
                  {game?.rating}
                </span>
                <FaStar color='yellow' size='18' />
              </>
            ) : null}
          </div>

          <div className='flex items-center'>
            <button
              className={`animation ${likeBtnState ? "like-active" : ""}`}
              aria-label='Add to favorites'
              onClick={() => {
                handleLikeBtnClick();
              }}
            >
              <GoHeartFill size='24' color={"inherit"} />
            </button>
            {game?.playtime === 0 || game?.playtime === undefined ? null : (
              <button className='animation' aria-label='Add to cart'>
                <IoCartOutline size='25' />
              </button>
            )}
          </div>
        </div>
        <Link
          className='game-card__body block h-full outline-none grow'
          aria-label={`Go to game page ${game?.slug}`}
          href={`/games/${game?.slug}`}
        ></Link>
        <div className='game-card__bot flex justify-between items-center backdrop-blur-xl py-1 px-4 md:py-3 rounded-b-xl'>
          <Link
            className='animation outline-none'
            aria-label={`Go to game page ${game?.slug}`}
            href={`/games/${game?.slug}`}
          >
            <h3 className='mr-[5px] w-fit'>{game?.name}</h3>
          </Link>

          <span className='text-[20px] md:text-[25px]'>
            {game?.playtime === 0 || game?.playtime === undefined
              ? ""
              : game?.playtime + "$"}
          </span>
        </div>
      </article>
    </li>
  );
};
export default GameCard;

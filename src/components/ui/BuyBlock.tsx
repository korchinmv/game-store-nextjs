import { FaCartArrowDown } from "react-icons/fa";
import { Game } from "@/types/Game";
import LikeButton from "./LikeButton";

interface BuyBlockProps {
  buttonText: string;
  price: number;
  labelName: string;
  css: string;
  game: Game;
}

const BuyBlock = ({
  buttonText,
  price,
  labelName,
  css,
  game,
}: BuyBlockProps) => {
  return (
    <div
      className={`buy border border-[--accent-color] p-[20px] w-full text-center flex flex-col justify-center ${css}`}
    >
      {price !== 0 ? (
        <>
          <span className='block text-[26px] mb-[5px]'>{`Price: ${price}$`}</span>
          <button
            className='text-[26px] mx-auto flex items-center font-bold uppercase hover:bg-[--accent-color] hover:text-[--white-color] transition-all duration-[0.3s] hover: bg-color-[--accent-color] py-[10px] px-[15px]'
            aria-label={`Add to cart ${labelName} game`}
          >
            {buttonText}
            <FaCartArrowDown className='ml-[10px] mb-[3px]' />
          </button>

          <LikeButton
            game={game}
            label='Add to favorite game list'
            heartSize='36'
            text={"Like"}
            css={"flex items-center justify-center"}
          />
        </>
      ) : (
        <span className='text-[24px] text-[--accent-color]'>
          Sorry. Out of stock
        </span>
      )}
    </div>
  );
};

export default BuyBlock;

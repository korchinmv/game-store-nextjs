import { FaCartArrowDown } from "react-icons/fa";

interface BuyBlockProps {
  buttonText: string;
  price: number;
  labelName: string;
  cssStyles: string;
}

const BuyBlock = ({
  buttonText,
  price,
  labelName,
  cssStyles,
}: BuyBlockProps) => {
  return (
    <div
      className={`buy border border-[--accent-color] p-[20px] max-w-[300px] w-full text-center ${cssStyles}`}
    >
      <span className='block text-[24px] mb-[5px]'>{`Price: ${price}$`}</span>
      <button
        className='text-[26px] mx-auto flex items-center font-bold uppercase hover:bg-[--accent-color] hover:text-[--white-color] transition-all duration-[0.3s] hover: bg-color-[--accent-color] py-[10px] px-[15px]'
        aria-label={`Add to cart ${labelName} game`}
      >
        {buttonText}
        <FaCartArrowDown className='ml-[10px] mb-[3px]' />
      </button>
    </div>
  );
};

export default BuyBlock;

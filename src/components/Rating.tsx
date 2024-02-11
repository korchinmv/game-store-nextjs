import { checkRatingForColor } from "../utils/checkRatingForColor";

interface RatingProps {
  number: number;
}

const Rating = ({ number }: RatingProps) => {
  return (
    <div
      className={`${checkRatingForColor(
        number
      )} w-[45px] h-[45px] border rounded flex justify-center items-center p-[5px]`}
    >
      {number}
    </div>
  );
};

export default Rating;

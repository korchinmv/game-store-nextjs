import { checkRatingForColor } from "../utils/checkRatingForColor";

interface RatingProps {
  number: number;
}

const Rating = ({ number }: RatingProps) => {
  return (
    <div
      className={`w-[45px] h-[45px] border rounded flex justify-center items-center ${checkRatingForColor(
        number
      )}`}
    >
      {number}
    </div>
  );
};

export default Rating;

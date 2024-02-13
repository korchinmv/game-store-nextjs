import { checkRatingForColor } from "../utils/checkRatingForColor";

interface RatingProps {
  number: number;
  name: string;
}

const Rating = ({ name, number }: RatingProps) => {
  const bgColor = checkRatingForColor(number);
  return number ? (
    <>
      <span className="mr-[5px] text-[14px]">{name}</span>
      <div
        className={
          " w-[45px] h-[45px] border rounded flex justify-center items-center p-[5px]"
        }
        style={{ backgroundColor: bgColor }}
      >
        {number}
      </div>
    </>
  ) : null;
};

export default Rating;

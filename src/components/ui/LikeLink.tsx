import { useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { ResponseGamesData } from "@/types/ResponseGamesData";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { useAppSelector } from "@/redux/hooks";
import { favoritesGamesSelector } from "@/redux/features/favoritesGames/favoritesGamesSelector";
import Link from "next/link";

interface LikeLinkProps {
  path: string;
  label: string;
  heartSize: string;
}

const LikeLink = ({ path, label, heartSize }: LikeLinkProps) => {
  const [countLikes, setCountLikes] = useState<number | null>(null);
  const favoritesGamesList = useAppSelector(favoritesGamesSelector);

  useEffect(() => {
    if (favoritesGamesList?.results.length > 0) {
      setCountLikes(favoritesGamesList?.results.length);
    }

    if (favoritesGamesList?.results.length === 0) {
      setCountLikes(0);
    }
  }, [favoritesGamesList?.results.length, countLikes]);

  return (
    <Link
      className={`animation ${
        countLikes ? "like-active" : ""
      } mr-[10px] relative`}
      aria-label={label}
      href={path}
    >
      <GoHeartFill size={heartSize} color={"inherit"} />
      {countLikes ? (
        <span className='text-[10px] absolute bottom-[5px] right-[0] block rounded-full bg-[--white-color] w-[15px] h-[15px] flex items-center justify-center'>
          {countLikes}
        </span>
      ) : null}
    </Link>
  );
};

export default LikeLink;

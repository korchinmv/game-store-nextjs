import { useState, useEffect } from "react";
import { toggleLikeGame } from "@/redux/features/favoritesGames/favoritesGamesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Game } from "@/types/Game";
import { GoHeartFill } from "react-icons/go";
import { favoritesGamesSelector } from "@/redux/features/favoritesGames/favoritesGamesSelector";

interface LikeButtonProps {
  game: Game;
  label: string;
  heartSize: string;
  text?: string;
  css?: string;
}

const LikeButton = ({ game, label, heartSize, text, css }: LikeButtonProps) => {
  const [likeBtnState, setLikeBtnState] = useState<boolean>(false);
  const favoritesGamesList = useAppSelector(favoritesGamesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      favoritesGamesList?.results.some(
        (favoriteGame) => favoriteGame.id === game?.id
      )
    ) {
      setLikeBtnState(true);
    }
  }, [game, favoritesGamesList]);

  const handleLikeBtnClick = () => {
    dispatch(toggleLikeGame(game));
    setLikeBtnState(() => !likeBtnState);
  };

  return (
    <div className={`like-button ${css}`}>
      {text ? (
        <span className="mr-[10px] text-[26px] font-bold uppercase">
          {text}
        </span>
      ) : null}

      <button
        className={`animation ${likeBtnState ? "like-active" : ""}`}
        aria-label={label}
        onClick={() => {
          handleLikeBtnClick();
        }}
      >
        <GoHeartFill size={heartSize} color={"inherit"} />
      </button>
    </div>
  );
};

export default LikeButton;

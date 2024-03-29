"use client";
import { FC, useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import { GoHeartFill } from "react-icons/go";
import { favoritesGamesSelector } from "@/redux/features/favoritesGames/favoritesGamesSelector";
import { ResponseGamesData } from "@/types/ResponseGamesData";
import { getLocalStorage } from "@/utils/getLocalStorage";
import Link from "next/link";
import Logo from "./ui/Logo";
import Cart from "./ui/Cart";
import BurgerButton from "./ui/BurgerButton";
import Container from "./Container";

const Header: FC = () => {
  const [likeBtnState, setLikeBtnState] = useState<boolean>(false);
  const favoritesGamesList = useAppSelector(favoritesGamesSelector);
  const pathname = usePathname();
  const storageFavoritesGames: ResponseGamesData =
    getLocalStorage("favoritesGames");

  const checkButtonLinkState = () => {
    if (storageFavoritesGames) {
      setLikeBtnState(true);
      return;
    }

    if (favoritesGamesList?.results.length > 0) {
      setLikeBtnState(true);
    } else {
      setLikeBtnState(false);
    }
  };

  useEffect(() => {
    checkButtonLinkState();
  }, []);

  return (
    <header className="py-[10px] mb-[30px] lg:mb-[60px] lg:py-[20px] bg-[--bg-dark-red] shadow-[--accent-color] shadow-[0px_3px_8px_0px]">
      <Container>
        <nav className="flex justify-between items-center">
          <Logo />
          <ul className="hidden md:flex	text-[20px]">
            <li className="mx-3">
              <Link
                className={
                  pathname === "/" ? "animation text-red-400" : "animation"
                }
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="mx-3">
              <Link
                className={
                  pathname === "/games" ? "animation text-red-400" : "animation"
                }
                id="store"
                href="/games"
              >
                Game Store
              </Link>
            </li>
            <li className="mx-3">
              <Link
                className={
                  pathname === "/favorites"
                    ? "animation text-red-400"
                    : "animation"
                }
                href="/favorites"
              >
                Favorites
              </Link>
            </li>
            <li className="mx-3">
              <Link
                className={
                  pathname === "/news" ? "animation text-red-400" : "animation"
                }
                href="/news"
              >
                News
              </Link>
            </li>
            <li className="mx-3">
              <Link
                className={
                  pathname === "/about" ? "animation text-red-400" : "animation"
                }
                href="/about"
              >
                About project
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Link
              className={`animation ${
                likeBtnState ? "like-active" : ""
              } mr-[10px] relative`}
              aria-label="Go to favorites games page"
              href="/favorites"
            >
              <GoHeartFill size="30" color={"inherit"} />

              {storageFavoritesGames.results.length === 0 ||
                (favoritesGamesList?.results.length !== 0 && (
                  <span className="text-[10px] absolute bottom-[5px] right-[0] block rounded-full bg-[--white-color] w-[15px] h-[15px] flex items-center justify-center">
                    {favoritesGamesList?.results.length !== 0
                      ? favoritesGamesList?.results.length
                      : null}
                  </span>
                ))}
            </Link>

            <Cart />

            <BurgerButton />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

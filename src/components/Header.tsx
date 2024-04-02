"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./ui/Logo";
import Cart from "./ui/Cart";
import BurgerButton from "./ui/BurgerButton";
import Container from "./Container";
import LikeLink from "./ui/LikeLink";

const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className='py-[10px] mb-[30px] lg:mb-[60px] lg:py-[20px] bg-[--bg-dark-red] shadow-[--accent-color] shadow-[0px_3px_8px_0px]'>
      <Container>
        <nav className='flex justify-between items-center'>
          <Logo />
          <ul className='hidden md:flex	text-[20px]'>
            <li className='mx-3'>
              <Link
                className={
                  pathname === "/" ? "animation text-red-400" : "animation"
                }
                href='/'
              >
                Home
              </Link>
            </li>
            <li className='mx-3'>
              <Link
                className={
                  pathname === "/games" ? "animation text-red-400" : "animation"
                }
                id='store'
                href='/games'
              >
                Game Store
              </Link>
            </li>
            <li className='mx-3'>
              <Link
                className={
                  pathname === "/favorites"
                    ? "animation text-red-400"
                    : "animation"
                }
                href='/favorites'
              >
                Favorites
              </Link>
            </li>
            <li className='mx-3'>
              <Link
                className={
                  pathname === "/cart" ? "animation text-red-400" : "animation"
                }
                href='/cart'
              >
                Cart
              </Link>
            </li>
          </ul>
          <div className='flex items-center justify-center'>
            <LikeLink
              path={"/favorites"}
              label={"Go to favorites games page"}
              heartSize={"30"}
            />

            <Cart />

            <BurgerButton />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

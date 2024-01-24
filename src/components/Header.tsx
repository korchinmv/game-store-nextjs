"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./ui/Logo";
import Cart from "./ui/Cart";
import BurgerButton from "./ui/BurgerButton";
import Container from "./Container";

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
                href='/games'
              >
                Game store
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
                  pathname === "/news" ? "animation text-red-400" : "animation"
                }
                href='/news'
              >
                News
              </Link>
            </li>
          </ul>
          <div className='flex items-center'>
            <Cart />
            <BurgerButton />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

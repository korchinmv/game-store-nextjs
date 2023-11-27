"use client";
import Link from "next/link";
import Logo from "./ui/Logo";
import Cart from "./ui/Cart";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className='py-3'>
      <div className='container mx-auto px-4'>
        <nav className='flex justify-between items-center'>
          <Logo />
          <ul className='flex'>
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
                Games store
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
          <Cart />
        </nav>
      </div>
    </header>
  );
};

export default Header;

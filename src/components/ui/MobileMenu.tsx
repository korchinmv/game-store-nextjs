"use client";
import { useAppSelector } from "@/redux/hooks";
import { toggleMenuSelector } from "@/redux/features/mobileMenu/toggleMenuSelector";
import CloseButton from "./CloseButton";
import MobileMenuLink from "./MobileMenuLink";

const MobileMenu = () => {
  const menuState = useAppSelector(toggleMenuSelector);

  return (
    <div
      className={`fixed bg-[#002639] w-[100%] h-[100vh] min-h-[250px] pt-[100px] overflow-hidden origin-left duration-500  ${
        menuState ? "translate-x-[0]" : "translate-x-[100%]"
      }`}
    >
      <ul className='mobile-menu flex flex-col items-center'>
        <MobileMenuLink name='Home' href='/' />
        <MobileMenuLink name='Game store' href='/games' />
        <MobileMenuLink name='Favorites' href='/favorites' />
        <MobileMenuLink name='News' href='/news' />
      </ul>

      <CloseButton />
    </div>
  );
};

export default MobileMenu;

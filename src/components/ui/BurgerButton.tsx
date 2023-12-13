"use client";
import { FC } from "react";
import { toggleState } from "@/redux/features/mobileMenu/toggleMenuSlice";
import { useAppDispatch } from "@/redux/hooks";

const BurgerButton: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className='animation burger space-y-2 h-[35px] md:hidden'
      onClick={() => dispatch(toggleState())}
    >
      <span className='block h-0.5 w-8 bg-white'></span>
      <span className='block h-0.5 w-8 bg-white'></span>
      <span className='block h-0.5 w-8 bg-white'></span>
    </button>
  );
};

export default BurgerButton;

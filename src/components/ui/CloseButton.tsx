"use client";
import { toggleState } from "@/redux/features/mobileMenu/toggleMenuSlice";
import { useAppDispatch } from "@/redux/hooks";

const CloseButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className='bg-gray-200 text-gray-700 font-bold py-2 px-4 absolute top-[40px] right-[40px]'
      onClick={() => dispatch(toggleState())}
    >
      X
    </button>
  );
};

export default CloseButton;

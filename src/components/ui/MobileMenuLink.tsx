"use client";
import { toggleState } from "@/redux/features/mobileMenu/toggleMenuSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";

interface Props {
  name: string;
  href: string;
}

const MobileMenuLink = ({ name, href }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <li
      className='border-b border-gray-400 my-8 uppercase'
      onClick={() => dispatch(toggleState())}
    >
      <Link href={href}>{name}</Link>
    </li>
  );
};

export default MobileMenuLink;

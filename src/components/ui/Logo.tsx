import logoPick from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <Link className='animation' href='/' aria-label='Back to home page'>
      <Image
        src={logoPick}
        priority
        alt='logo picture'
        width={50}
        height={50}
      />
    </Link>
  );
};

export default Logo;

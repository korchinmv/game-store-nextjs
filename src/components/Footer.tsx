"use client";
import { FC } from "react";

import Container from "./Container";

const Footer: FC = () => {
  return (
    <footer className='mt-auto bg-zinc-950 shadow-[--accent-color] shadow-[0px_0px_8px_3px]'>
      <Container>
        <p className='text-center text-[18px] md:text-[22px] py-[10px] md:py-[20px]'>
          Web-developer Korchin M.V. 2024 year
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

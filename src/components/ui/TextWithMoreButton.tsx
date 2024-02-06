"use client";
import { MouseEvent, useState } from "react";
import { trimString } from "../../utils/trimString";

interface TextWithMoreButtonProps {
  text: string;
}

const TextWithMoreButton = ({ text }: TextWithMoreButtonProps) => {
  const [fullText, setFulltext] = useState(false);
  let newString;

  if (text[0] === "<") {
    newString = text.substring(text.length - 4, 3);
  } else {
    newString = text;
  }

  const handleClick = (e: MouseEvent<HTMLSpanElement>): void => {
    setFulltext(!fullText);
  };

  return (
    <p className='mb-[15px] md:mb-[25px]'>
      <span> {fullText ? newString : trimString(text, 260)}</span>
      {!fullText ? (
        <span
          className='cursor-pointer transition bg-[--white-color] hover:bg-[--accent-color] text-[--bg-color] rounded-[5px] py-[1px] px-[5px]'
          onClick={handleClick}
        >
          read more
        </span>
      ) : (
        ""
      )}
    </p>
  );
};

export default TextWithMoreButton;

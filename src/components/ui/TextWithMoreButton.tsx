"use client";
import { MouseEvent, useState } from "react";
import { trimString } from "../../utils/trimString";

interface TextWithMoreButtonProps {
  text: string;
}

const TextWithMoreButton = ({ text }: TextWithMoreButtonProps) => {
  const [fullText, setFulltext] = useState(false);

  const checkString = (text: string) => {
    if (text) {
      let newString;

      if (text[0] === "<") {
        newString = text.substring(text.length - 4, 3);
      } else {
        newString = text;
      }

      return newString;
    }
  };

  const newString = checkString(text);

  const handleClick = (e: MouseEvent<HTMLSpanElement>): void => {
    setFulltext(!fullText);
  };

  return text?.length !== 0 ? (
    <p className='mb-[15px] md:mb-[25px]'>
      <span> {fullText ? newString : trimString(newString, 160)}</span>
      {!fullText ? (
        <button
          className='animation transition bg-[--white-color] hover:bg-[--accent-color] text-[--bg-color] hover:text-[--white-color] rounded-[5px] py-[1px] px-[5px]'
          onClick={handleClick}
        >
          read more
        </button>
      ) : (
        ""
      )}
    </p>
  ) : null;
};

export default TextWithMoreButton;

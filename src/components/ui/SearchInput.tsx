"use client";

import { CiSearch } from "react-icons/ci";
import { Dispatch, SetStateAction, useState } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";

const SearchInput = ({
  trigger,
  setNumPage,
  setSearchGameName,
}: {
  trigger: LazyGetTriggerType;
  setNumPage: Dispatch<SetStateAction<number>>;
  setSearchGameName: Dispatch<SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    trigger({ gameName: value, numberPage: 1 });
    setNumPage(1);
    setSearchGameName(value);
  };

  return (
    <form
      className='form w-full mb-[20px] relative'
      action='#'
      onSubmit={handleSubmit}
    >
      <input
        className='w-full py-[7px] pl-[15px] pr-[100px] bg-transparent text-[--white-color] outline-none border-[1px] border-[--grey-color] rounded-[4px] transition-all hover:border-[--accent-color] focus:border-[--accent-color]'
        placeholder='Search games...'
        value={value}
        onChange={handleInputChange}
      />
      <button
        className='p-[10px] flex items-center justify-center content-center bg-[--accent-color] w-[70px] rounded-r-[3px] h-full absolute right-0 top-0'
        aria-label='Button game search'
      >
        <CiSearch />
      </button>
    </form>
  );
};

export default SearchInput;

"use client";
import { useLazyGetSearchGamesQuery } from "@/redux/api/games.api";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(event.target.value);
  };

  const [trigger, { data, isLoading, error }] = useLazyGetSearchGamesQuery();
  console.log(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    trigger({ gameName: value });
    console.log(value);
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

"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLazyGetSearchGamesQuery } from "@/redux/api/games.api";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({
  setSearchGameName,
  inputSearchForm,
  setInputSearchForm,
}: {
  setSearchGameName: Dispatch<SetStateAction<string>>;
  inputSearchForm: string;
  setInputSearchForm: Dispatch<SetStateAction<string>>;
}) => {
  const [inputError, setInputError] = useState<boolean>(false);
  const [trigger, { data: searchDataGames }] = useLazyGetSearchGamesQuery();

  const isGamesPage = window.location.pathname === "/games";
  const router = useRouter();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputSearchForm(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!inputSearchForm) {
      sessionStorage.setItem(
        "searchInputValue",
        JSON.stringify(inputSearchForm)
      );
      return setInputError(true);
    }

    if (isGamesPage) {
      trigger({ gameName: inputSearchForm, numberPage: 1 });
    }

    if (inputSearchForm) {
      trigger({ gameName: inputSearchForm, numberPage: 1 });
      setSearchGameName(inputSearchForm);
      setInputError(false);
      sessionStorage.setItem("searchPageNumber", JSON.stringify(1));
    }
  };

  useEffect(() => {
    if (searchDataGames) {
      sessionStorage.setItem(
        "searchGamesList",
        JSON.stringify(searchDataGames)
      );

      sessionStorage.setItem(
        "searchInputValue",
        JSON.stringify(inputSearchForm)
      );
      router.push(`/games/search/${inputSearchForm}`);
    }
  }, [searchDataGames, inputSearchForm, router]);

  return (
    <form
      className='form w-full mb-[20px] relative'
      action='#'
      onSubmit={handleSubmit}
    >
      <input
        className='w-full py-[7px] pl-[15px] pr-[100px] bg-transparent text-[--white-color] outline-none border-[1px] border-[--grey-color] rounded-[4px] transition-all hover:border-[--accent-color] focus:border-[--accent-color] focus:bg-[--light-black]'
        placeholder='Search games...'
        value={inputSearchForm}
        onChange={handleInputChange}
        maxLength={30}
      />

      {inputError ? (
        <span className='text-[--accent-color] text-[14px] absolute left-0 bottom-[-25px]'>
          Write the name of the Game
        </span>
      ) : null}

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

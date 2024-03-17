"use client";
import { CiSearch } from "react-icons/ci";
import { Dispatch, SetStateAction, useState } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";
import { useRouter } from "next/navigation";

const SearchInput = ({
  setSearchGameName,
  inputSearchForm,
  setInputSearchForm,
  setSearchNumPage,
  trigger,
}: {
  setSearchGameName: Dispatch<SetStateAction<string>>;
  inputSearchForm: string;
  setInputSearchForm: Dispatch<SetStateAction<string>>;
  setSearchNumPage: Dispatch<SetStateAction<number>>;
  trigger: LazyGetTriggerType;
}) => {
  const [inputError, setInputError] = useState<boolean>(false);
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

    if (inputSearchForm) {
      trigger({ gameName: inputSearchForm, numberPage: 1 });
      setSearchGameName(inputSearchForm);
      setInputError(false);
      setSearchNumPage(1);
      sessionStorage.setItem("searchPageNumber", JSON.stringify(1));
    }

    sessionStorage.setItem("searchInputValue", JSON.stringify(inputSearchForm));
    router.push(`/games/search/${inputSearchForm}`);
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
